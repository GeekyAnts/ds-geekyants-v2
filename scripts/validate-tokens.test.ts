import { describe, it, expect } from 'vitest'
import {
  validateCssTokens,
  validateComponentTokenRefs,
  validateNoDuplicateDeclarations,
} from './validate-tokens'

// v2 is 2-tier: primitives → standard ShadCN semantics. There is no
// component-token tier, so the old component-tier passes (naming convention,
// cross-block component duplicates, "no primitives in TSX") are gone. These
// tests cover the surviving passes against v2-flavoured fixtures.

describe('validateCssTokens — primitive → semantic chain', () => {
  it('returns 0 broken refs when every var() resolves', () => {
    const css = `
      :root {
        --color-brand-900: #1a1a2e;
        --primary: var(--color-brand-900);
      }
      .btn { background: var(--primary); }
    `
    const { broken } = validateCssTokens(css)
    expect(broken).toHaveLength(0)
  })

  it('catches a var() reference to an undefined token', () => {
    const css = `.btn { color: var(--undefined-token); }`
    const { broken } = validateCssTokens(css)
    expect(broken).toHaveLength(1)
    expect(broken[0].name).toBe('undefined-token')
  })

  it('counts tokens defined inside @theme as defined', () => {
    // Primitives are canonical inside @theme {}; semantics alias them in :root.
    const css = `
      @theme {
        --color-accent-500: #6366f1;
      }
      :root {
        --accent: var(--color-accent-500);
      }
      .x { background: var(--accent); }
    `
    const { broken } = validateCssTokens(css)
    expect(broken).toHaveLength(0)
  })
})

describe('validateComponentTokenRefs — broken var() in v2 components', () => {
  it('detects a var() reference in a .tsx file that is missing from CSS', () => {
    const css = `:root { --ext-button-gamified-bg: var(--color-accent-500); }`
    const componentCode = `const cls = 'bg-[var(--ext-button-gamified-shadow)]'` // not defined
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Button/button-variants.ts', content: componentCode },
    ])
    expect(broken).toHaveLength(1)
    expect(broken[0].name).toBe('ext-button-gamified-shadow')
    expect(broken[0].file).toBe('Button/button-variants.ts')
  })

  it('passes when all component var() references exist in CSS', () => {
    const css = `:root { --ext-button-gamified-shadow: 0 4px 0 #000; }`
    const componentCode = `const cls = 'shadow-[var(--ext-button-gamified-shadow)]'`
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Button/button-variants.ts', content: componentCode },
    ])
    expect(broken).toHaveLength(0)
  })

  it('ignores Tailwind tw-* internals', () => {
    const css = `:root { --primary: var(--color-brand-900); }`
    const componentCode = `const cls = 'shadow-[var(--tw-ring-offset-shadow)]'`
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Foo.tsx', content: componentCode },
    ])
    expect(broken).toHaveLength(0)
  })

  it('ignores Radix runtime radix-* vars (set by Radix primitives at runtime)', () => {
    const css = `:root { --popover: var(--color-neutral-50); }`
    const componentCode = `const cls = 'origin-[var(--radix-popover-content-transform-origin)]'`
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Popover/Popover.tsx', content: componentCode },
    ])
    expect(broken).toHaveLength(0)
  })
})

describe('validateNoDuplicateDeclarations', () => {
  it('passes when every property is defined once', () => {
    const css = `
      :root {
        --primary: var(--color-brand-900);
        --background: var(--color-neutral-50);
      }
    `
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(0)
  })

  it('detects a property defined twice in the same block', () => {
    const css = `
      :root {
        --primary: var(--color-brand-900);
        --background: var(--color-neutral-50);
        --primary: var(--color-accent-500);
      }
    `
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(1)
    expect(dups[0].prop).toBe('--primary')
    expect(dups[0].firstValue).toBe('var(--color-brand-900)')
    expect(dups[0].dupValue).toBe('var(--color-accent-500)')
  })

  it('ignores a value re-defined in a separate dark theme block (not a duplicate)', () => {
    const css = `
      :root {
        --primary: var(--color-brand-900);
      }

      [data-theme="dark"], .dark {
        --primary: var(--color-accent-500);
      }
    `
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(0)
  })
})
