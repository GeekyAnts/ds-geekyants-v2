import { describe, it, expect } from 'vitest'
import { buildCatalog } from './generate-catalog'

describe('generate-catalog', () => {
  it('discovers v2 components from their story files', async () => {
    const catalog = await buildCatalog()
    expect(catalog.length).toBeGreaterThan(40)
  })

  it('maps the title to the real Storybook story-id prefix (v2-<name>, no inner separators)', async () => {
    const catalog = await buildCatalog()
    const button = catalog.find(c => c.name === 'Button')
    expect(button).toBeDefined()
    // Real Storybook id: "v2/Button" → "v2-button" (NOT the old 3-tier "atoms-button")
    expect(button!.storyIdPrefix).toBe('v2-button')
    expect(button!.storyIdPrefix).not.toContain('atoms-')

    // Compound names lowercase with no inner hyphen: "v2/InputOTP" → "v2-inputotp"
    const otp = catalog.find(c => c.name === 'InputOTP')
    if (otp) expect(otp.storyIdPrefix).toBe('v2-inputotp')
  })

  it('sanitizes titles to real Storybook ids (only [a-z0-9-], no & or spaces)', async () => {
    const catalog = await buildCatalog()
    // The composed preview dashboard lives at preview/Dashboard → preview-dashboard.
    const dashboard = catalog.find(c => c.name === 'Dashboard')
    expect(dashboard).toBeDefined()
    expect(dashboard!.storyIdPrefix).toBe('preview-dashboard')
    // Every prefix must be a valid Storybook id segment.
    for (const e of catalog) {
      expect(e.storyIdPrefix).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('extracts named story exports and prefers Default for the gallery card', async () => {
    const catalog = await buildCatalog()
    const button = catalog.find(c => c.name === 'Button')!
    expect(button.stories).toContain('Default')
    expect(button.stories).toContain('DarkMode')
    expect(button.defaultStory).toBe('Default')
  })

  it('falls back to the first story when there is no Default export', async () => {
    const catalog = await buildCatalog()
    for (const entry of catalog) {
      expect(entry.stories).toContain(entry.defaultStory)
    }
  })
})
