import { describe, it, expect } from 'vitest'
import { parseV2Semantics, parseV2Dark } from './cssParser'
import { generateV2Semantics, generateV2Dark } from './cssGenerator'
import type { GeeklegoTokensV2 } from '../types'

// These tests pin the "semantics.css is canonical" contract: a core semantic that is NOT in
// the standard ShadCN set (V2_SEMANTIC_KEYS) must survive parse → generate → re-parse instead
// of being silently dropped. They also guard the denylist: an @theme inline `--color-*`
// registration must NOT be absorbed as a semantic, and the opaque --ext-* / trailing @theme
// blocks must pass through verbatim.

// A minimal but realistic semantics.css: standard keys, a NEW pair (--info/--info-foreground)
// inserted in the core :root, the @theme inline mirror, then the --ext-* block, then a
// trailing standalone @theme block (the accordion-animation case).
const SEMANTICS_CSS = `:root {
  --background:            var(--color-neutral-0);
  --foreground:            var(--color-neutral-900);
  --primary:               var(--color-brand-900);
  --primary-foreground:    var(--color-neutral-0);
  --info:                  var(--color-accent-500);
  --info-foreground:       var(--color-neutral-0);
  --radius:                var(--radius-lg);
}

@theme inline {
  --color-background:           var(--background);
  --color-primary:              var(--primary);
  --color-info:                 var(--info);
}

/* ---------------------------------------------------------------------------
   3 · CUSTOM VARIANTS — namespaced --ext-* tokens.
   --------------------------------------------------------------------------- */
:root {
  --ext-button-gamified-bg: var(--color-accent-500);
}

@theme inline {
  --color-ext-button-gamified-bg: var(--ext-button-gamified-bg);
}

@theme {
  --animate-accordion-down: accordion-down 0.2s ease-out;
  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
}
`

const DARK_CSS = `[data-theme="dark"],
.dark {
  --background:            var(--color-neutral-950);
  --primary:               var(--color-neutral-50);
  --info:                  var(--color-accent-400);
  --ext-button-gamified-shadow: 0 2px 0 0 var(--color-accent-800);
}
`

/** Build a minimal GeeklegoTokensV2 carrying only the fields the generators read. */
function modelFrom(
  light: GeeklegoTokensV2['semantics']['light'],
  extBlock: string,
  dark: GeeklegoTokensV2['semantics']['dark'],
  darkOverride: string,
): GeeklegoTokensV2 {
  return {
    primitives: {} as GeeklegoTokensV2['primitives'],
    semantics: { light, dark },
    ext: { rawBlock: extBlock, darkOverride },
  }
}

describe('v2 semantics round-trip — semantics.css is canonical', () => {
  it('absorbs a new core semantic (--info / --info-foreground) on parse', () => {
    const { light } = parseV2Semantics(SEMANTICS_CSS)
    expect(light['info']).toBe('var(--color-accent-500)')
    expect(light['info-foreground']).toBe('var(--color-neutral-0)')
    // standard keys still present
    expect(light['primary']).toBe('var(--color-brand-900)')
    expect(light['radius']).toBe('var(--radius-lg)')
  })

  it('does NOT absorb @theme inline --color-* registrations as semantics', () => {
    const { light } = parseV2Semantics(SEMANTICS_CSS)
    expect(light['color-info']).toBeUndefined()
    expect(light['color-primary']).toBeUndefined()
    expect(light['color-background']).toBeUndefined()
  })

  it('does NOT absorb --ext-* tokens into core semantics', () => {
    const { light, extBlock } = parseV2Semantics(SEMANTICS_CSS)
    expect(light['ext-button-gamified-bg']).toBeUndefined()
    // the --ext-* block (and the trailing @theme accordion block after it) is captured opaque
    expect(extBlock).toContain('--ext-button-gamified-bg')
    expect(extBlock).toContain('@keyframes accordion-down')
  })

  it('round-trips the new semantic through generate → re-parse (value preserved)', () => {
    const { light, extBlock } = parseV2Semantics(SEMANTICS_CSS)
    const { dark, darkOverride } = parseV2Dark(DARK_CSS)
    const out = generateV2Semantics(modelFrom(light, extBlock, dark, darkOverride))

    // --info appears in both the :root aliases and the @theme inline registration
    expect(out).toMatch(/--info:\s*var\(--color-accent-500\)/)
    expect(out).toMatch(/--color-info:\s*var\(--info\)/)

    // re-parse the generated file: the new semantic survives intact
    const { light: light2 } = parseV2Semantics(out)
    expect(light2['info']).toBe('var(--color-accent-500)')
    expect(light2['info-foreground']).toBe('var(--color-neutral-0)')
  })

  it('preserves the opaque --ext-* block and trailing @theme verbatim through generate', () => {
    const { light, extBlock } = parseV2Semantics(SEMANTICS_CSS)
    const out = generateV2Semantics(modelFrom(light, extBlock, {}, ''))
    expect(out).toContain('--ext-button-gamified-bg')
    expect(out).toContain('@keyframes accordion-down')
  })

  it('round-trips a new semantic dark override through generate → re-parse', () => {
    const { dark, darkOverride } = parseV2Dark(DARK_CSS)
    expect(dark['info']).toBe('var(--color-accent-400)')
    const out = generateV2Dark(modelFrom({}, '', dark, darkOverride))
    expect(out).toMatch(/--info:\s*var\(--color-accent-400\)/)
    // the ext dark override is still carried through verbatim
    expect(out).toContain('--ext-button-gamified-shadow')
    const { dark: dark2 } = parseV2Dark(out)
    expect(dark2['info']).toBe('var(--color-accent-400)')
  })
})
