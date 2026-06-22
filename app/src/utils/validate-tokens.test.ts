import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { validateCssTokens } from '../../../scripts/validate-tokens'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dsRoot = resolve(__dirname, '../../../design-system/v2')

// The v2 design system is 2-tier and split across three files; the token chain
// (primitive → semantic) only resolves when they are validated together.
const css = [
  'primitives.css',
  'semantics.css',
  'themes/dark.css',
]
  .map((rel) => readFileSync(resolve(dsRoot, rel), 'utf-8'))
  .join('\n')

describe('validateCssTokens — v2 design system chain', () => {
  it('defines the core ShadCN semantic --primary', () => {
    expect(css).toMatch(/--primary\s*:/)
  })

  it('aliases --primary to a brand primitive (never a raw value)', () => {
    expect(css).toMatch(/--primary\s*:\s*var\(--color-/)
  })

  it('has no broken var() references across the v2 chain', () => {
    const { broken } = validateCssTokens(css)
    expect(broken).toHaveLength(0)
  })
})
