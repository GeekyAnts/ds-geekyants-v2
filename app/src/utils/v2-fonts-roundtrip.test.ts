import { describe, it, expect } from 'vitest'
import { parseV2Fonts } from './cssParser'
import { generateV2Fonts } from './cssGenerator'
import type { FontLoader, GeeklegoTokensV2 } from '../types'

// Pins the fonts.css contract: the Google-Fonts loader list survives
// generate → parse → generate unchanged, and the empty list stays a valid header-only file.
// fonts.css is fully owned by the generator (no opaque content), so this is a pure round-trip.

function modelWith(fontLoaders: FontLoader[]): GeeklegoTokensV2 {
  return {
    primitives: {} as GeeklegoTokensV2['primitives'],
    semantics: { light: {}, dark: {} },
    ext: { rawBlock: '', darkOverride: '' },
    fontLoaders,
  }
}

describe('v2 fonts.css round-trip', () => {
  it('empty list → header-only file, no @import statement, parses back to []', () => {
    const css = generateV2Fonts(modelWith([]))
    // No actual @import STATEMENT (the header comment may mention the word "@import").
    expect(css).not.toContain('@import url(')
    expect(css).toContain('FONT LOADERS')
    expect(parseV2Fonts(css)).toEqual([])
  })

  it('a single loader with axes survives generate → parse', () => {
    const loaders: FontLoader[] = [{ family: 'Figtree', axes: 'wght@300..900', source: 'google' }]
    const css = generateV2Fonts(modelWith(loaders))
    expect(css).toContain(
      '@import url("https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&display=swap");',
    )
    expect(parseV2Fonts(css)).toEqual(loaders)
  })

  it('a multi-word family is slugged with + and restored on parse', () => {
    const loaders: FontLoader[] = [{ family: 'Plus Jakarta Sans', axes: 'wght@300..900', source: 'google' }]
    const css = generateV2Fonts(modelWith(loaders))
    expect(css).toContain('family=Plus+Jakarta+Sans:')
    expect(parseV2Fonts(css)).toEqual(loaders)
  })

  it('a loader without axes omits the :axes segment and round-trips', () => {
    const loaders: FontLoader[] = [{ family: 'Lora', source: 'google' }]
    const css = generateV2Fonts(modelWith(loaders))
    expect(css).toContain('family=Lora&display=swap')
    expect(css).not.toContain('family=Lora:')
    expect(parseV2Fonts(css)).toEqual(loaders)
  })

  it('two loaders survive generate → parse → generate stably', () => {
    const loaders: FontLoader[] = [
      { family: 'Figtree', axes: 'wght@300..900', source: 'google' },
      { family: 'JetBrains Mono', axes: 'wght@400..700', source: 'google' },
    ]
    const css1 = generateV2Fonts(modelWith(loaders))
    const parsed = parseV2Fonts(css1)
    expect(parsed).toEqual(loaders)
    const css2 = generateV2Fonts(modelWith(parsed))
    expect(css2).toEqual(css1) // byte-stable round-trip
  })
})
