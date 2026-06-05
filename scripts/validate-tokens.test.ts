import { describe, it, expect } from 'vitest'
import { validateCssTokens, validateComponentTokenRefs, validateTokenNamingConvention, validateNoDuplicateDeclarations } from './validate-tokens'

describe('validateCssTokens (existing)', () => {
  it('returns 0 broken refs for a self-consistent CSS file', () => {
    const css = `:root { --my-token: red; } .foo { color: var(--my-token); }`
    const { broken } = validateCssTokens(css)
    expect(broken).toHaveLength(0)
  })

  it('catches a var() reference to an undefined token', () => {
    const css = `.foo { color: var(--undefined-token); }`
    const { broken } = validateCssTokens(css)
    expect(broken[0].name).toBe('undefined-token')
  })
})

describe('validateComponentTokenRefs (new)', () => {
  it('detects a var() reference in a .tsx file that is missing from CSS', () => {
    const css = `:root { --avatar-size-md: 2rem; }`
    const componentCode = `const cls = 'w-[var(--size-avatar-md)]'` // wrong prefix order
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Avatar.tsx', content: componentCode }
    ])
    expect(broken).toHaveLength(1)
    expect(broken[0].name).toBe('size-avatar-md')
    expect(broken[0].file).toBe('Avatar.tsx')
  })

  it('passes when all component var() references exist in CSS', () => {
    const css = `:root { --avatar-size-md: 2rem; }`
    const componentCode = `const cls = 'w-[var(--avatar-size-md)]'`
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Avatar.tsx', content: componentCode }
    ])
    expect(broken).toHaveLength(0)
  })

  it('ignores Tailwind built-in variables (not --gl- or design system tokens)', () => {
    const css = `:root { --avatar-size-md: 2rem; }`
    // tw-* and spacing-* builtins from Tailwind internals should not be flagged
    const componentCode = `const cls = 'w-[var(--tw-ring-offset-shadow)] w-[var(--avatar-size-md)]'`
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'Foo.tsx', content: componentCode }
    ])
    expect(broken).toHaveLength(0)
  })
})

describe('validateTokenNamingConvention', () => {
  it('flags tokens where a known property prefix precedes the component name', () => {
    const css = `
/* ─── GENERATED COMPONENT TOKENS ─── */

/* Avatar — generated 2026-03-16 */
:root,
[data-theme="dark"] {
  --size-avatar-md: 2rem;
  --avatar-size-md: 2rem;
}
`
    const warnings = validateTokenNamingConvention(css)
    expect(warnings.some(w => w.includes('--size-avatar-md'))).toBe(true)
    expect(warnings.some(w => w.includes('--avatar-size-md'))).toBe(false)
  })

  it('does not flag semantic tokens that are valid (non-component tokens)', () => {
    const css = `
      :root {
        --color-action-primary: #6366f1;
        --color-text-secondary: #666;
      }
    `
    const warnings = validateTokenNamingConvention(css)
    expect(warnings.filter(w => w.includes('--color-action-primary'))).toHaveLength(0)
    expect(warnings.filter(w => w.includes('--color-text-secondary'))).toHaveLength(0)
    // Note: these are in :root, not in a component block, so never flagged
    // The validator only checks inside /* ComponentName — generated */ blocks
  })

  it('does not flag tokens without size-scale suffixes', () => {
    const css = `
      :root {
        --bg-primary: #fff;
        --border-color-hover: #ccc;
      }
    `
    const warnings = validateTokenNamingConvention(css)
    expect(warnings).toHaveLength(0)
  })

  it('does not flag semantic tokens outside component blocks, even if they look like property-first naming', () => {
    // This test documents the false-positive bug: --size-control-indicator-sm is a
    // legitimate semantic token (not a component token), so should NOT be flagged
    // as a naming violation just because it starts with a property prefix and ends with a size scale.
    const css = `
      :root {
        --size-control-indicator-sm: 0.75rem;
        --size-icon-sm: 1rem;
        --color-text-secondary: #666;
      }
    `
    const warnings = validateTokenNamingConvention(css)
    expect(warnings.filter(w => w.includes('--size-control-indicator-sm'))).toHaveLength(0)
    expect(warnings.filter(w => w.includes('--size-icon-sm'))).toHaveLength(0)
    expect(warnings.filter(w => w.includes('--color-text-secondary'))).toHaveLength(0)
  })

  it('flags misplaced property prefix tokens ONLY inside component blocks', () => {
    // This tests that the validator correctly identifies violations only
    // within component blocks (marked with /* ComponentName — generated YYYY-MM-DD */),
    // not in generic :root semantic token sections.
    const css = `
      /* TreeItem — generated 2026-03-16 */
      :root,
      [data-theme="dark"] {
        --tree-item-icon-color: var(--color-text-secondary);
        --size-icon-sm: 1rem;
      }
    `
    const warnings = validateTokenNamingConvention(css)
    // --tree-item-icon-color is inside component block with correct naming: component-first
    expect(warnings.filter(w => w.includes('--tree-item-icon-color'))).toHaveLength(0)
    // --size-icon-sm is inside a component block — starts with MISPLACED_PREFIX 'size-'
    expect(warnings.some(w => w.includes('--size-icon-sm'))).toBe(true)
  })

  it('flags tokens inside component blocks even without size-scale suffix (stricter check)', () => {
    // The validator now flags ANY token starting with a MISPLACED_PREFIX inside
    // a component block, not just those ending with -xs/sm/md/lg/xl/2xl/3xl.
    // This catches patterns like --color-picker-bg or --color-swatch-border.
    const css = `
      /* Swatch — generated 2026-04-04 */
      :root,
      [data-theme="dark"] {
        --swatch-size-sm: var(--size-component-sm);
        --color-swatch-border: var(--color-border-subtle);
      }
    `
    const warnings = validateTokenNamingConvention(css)
    // --swatch-size-sm is correct (component-first naming)
    expect(warnings.filter(w => w.includes('--swatch-size-sm'))).toHaveLength(0)
    // --color-swatch-border starts with MISPLACED_PREFIX 'color-' → flagged
    expect(warnings.some(w => w.includes('--color-swatch-border'))).toBe(true)
  })

  it('detects cross-contamination — tokens for one component embedded inside another block', () => {
    const css = `
/* ─── GENERATED COMPONENT TOKENS ─── */

/* Switch — generated 2026-03-23 */
:root,
[data-theme="dark"] {
  --switch-track-bg: var(--color-bg-tertiary);
  --toggle-radius: var(--radius-component-md);
  --switch-thumb-bg: var(--color-control-thumb);
}
`
    const warnings = validateTokenNamingConvention(css)
    const cross = warnings.filter(w => w.includes('Cross-contamination'))
    expect(cross).toHaveLength(1)
    expect(cross[0]).toContain('--toggle-radius')
    expect(cross[0]).toContain('Switch')
    expect(cross[0]).toContain('toggle')
  })

  it('passes when all tokens match their block name', () => {
    const css = `
/* Avatar — generated 2026-03-16 */
:root,
[data-theme="dark"] {
  --avatar-size-md: 2rem;
  --avatar-bg: var(--color-bg-secondary);
}

/* Badge — generated 2026-03-17 */
:root,
[data-theme="dark"] {
  --badge-bg: var(--color-action-primary);
  --badge-text: var(--color-text-inverse);
}
`
    const warnings = validateTokenNamingConvention(css)
    const cross = warnings.filter(w => w.includes('Cross-contamination'))
    expect(cross).toHaveLength(0)
  })
})

describe('validateNoDuplicateDeclarations', () => {
  it('passes when every property is defined once', () => {
    const css = `
/* Input — generated 2026-03-20 */
:root,
[data-theme="dark"] {
  --input-bg: var(--color-bg-primary);
  --input-text: var(--color-text-primary);
}
`
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(0)
  })

  it('detects a property defined twice in the same block', () => {
    const css = `
/* Input — generated 2026-03-20 */
:root,
[data-theme="dark"] {
  --input-bg: var(--color-bg-primary);
  --input-text: var(--color-text-primary);
  --input-bg: var(--color-bg-secondary);
}
`
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(1)
    expect(dups[0].prop).toBe('--input-bg')
    expect(dups[0].firstValue).toBe('var(--color-bg-primary)')
    expect(dups[0].dupValue).toBe('var(--color-bg-secondary)')
  })

  it('ignores separate [data-theme="dark"] override blocks (not duplicates)', () => {
    const css = `
/* InputGroup — generated 2026-05-21 */
:root {
  --input-group-bg: var(--color-bg-primary);
}

[data-theme="dark"] {
  --input-group-bg: var(--color-bg-secondary);
}
`
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(0)
  })

  it('detects duplicates in multiple component blocks independently', () => {
    const css = `
/* Input — generated 2026-03-20 */
:root,
[data-theme="dark"] {
  --input-bg: var(--color-bg-primary);
  --input-bg: var(--color-bg-secondary);
}

/* AreaChart — generated 2026-03-18 */
:root,
[data-theme="dark"] {
  --areachart-bg: var(--color-surface-raised);
}
`
    const dups = validateNoDuplicateDeclarations(css)
    expect(dups).toHaveLength(1)
    expect(dups[0].prop).toBe('--input-bg')
  })
})

describe('TreeItem token reference (test for issue)', () => {
  it('passes when all TreeItem token references exist in CSS', () => {
    // This tests that TreeItem.tsx:187 uses --tree-item-icon-color-disabled
    const css = `
      :root {
        --tree-item-icon-color: var(--color-text-secondary);
        --tree-item-icon-color-selected: var(--color-action-primary);
        --tree-item-icon-color-disabled: var(--color-text-disabled);
      }
    `
    const componentCode = `
      isSelected
        ? 'text-[var(--tree-item-icon-color-selected)]'
        : isDisabled
        ? 'text-[var(--tree-item-icon-color-disabled)]'
        : 'text-[var(--tree-item-icon-color)]'
    `
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'TreeItem.tsx', content: componentCode }
    ])
    expect(broken).toHaveLength(0)
  })

  it('catches when TreeItem references missing --tree-item-icon-color-disabled', () => {
    // This tests that we catch the bug when TreeItem uses wrong token
    const css = `
      :root {
        --tree-item-icon-color: var(--color-text-secondary);
        --tree-item-icon-color-selected: var(--color-action-primary);
        /* --tree-item-icon-color-disabled is missing */
      }
    `
    const componentCode = `
      isSelected
        ? 'text-[var(--tree-item-icon-color-selected)]'
        : isDisabled
        ? 'text-[var(--tree-item-icon-color-disabled)]'
        : 'text-[var(--tree-item-icon-color)]'
    `
    const { broken } = validateComponentTokenRefs(css, [
      { filePath: 'TreeItem.tsx', content: componentCode }
    ])
    expect(broken).toHaveLength(1)
    expect(broken[0].name).toBe('tree-item-icon-color-disabled')
  })
})
