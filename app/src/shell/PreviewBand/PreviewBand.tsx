import { useEffect, useState } from 'react'
import { ComponentPreviewFrame } from '../../components/ComponentPreviewFrame'
import { getPreviewSets } from '../../utils/storybook'
import { subscribeToPendingChanges, getAllStaged } from '../../state/staging'
import { usePreviewTheme, setPreviewTheme } from '../../state/previewTheme'
import './PreviewBand.css'

/**
 * The persistent live-component preview docked at the top of the center pane.
 *
 * It renders ONE composed dashboard — the `preview/Dashboard` story
 * (`preview-dashboard--default`) authored in `components/v2/_preview/` — in a
 * single full-width iframe. The dashboard packs many REAL v2 components into one
 * masonry surface (no per-component boxes), and re-themes as a whole when tokens
 * are staged (via the postMessage bridge in ComponentPreviewFrame + the listener
 * in `.storybook/preview.ts`). Shown on every module, not a separate tab.
 *
 * Theme: the Light|Dark control writes the shared `previewTheme` store, which
 * the Inspector's Value tab also drives — so editing dark tokens auto-flips the
 * preview to dark, and this control overrides it.
 */
function PreviewBand() {
  const theme = usePreviewTheme()
  // One composed dashboard (the first preview/* story) fills the band.
  const dashboard = getPreviewSets()[0]
  const [stagedTokens, setStagedTokens] = useState<Map<string, string>>(getAllStaged)

  useEffect(() => {
    return subscribeToPendingChanges(() => {
      setStagedTokens(new Map(getAllStaged()))
    })
  }, [])

  return (
    <div className="ed-preview-band">
      <div className="ed-preview-band__bar">
        <span className="ed-preview-band__label">Live Preview</span>
        <div className="ed-preview-band__theme" role="group" aria-label="Preview theme">
          <button
            type="button"
            className={`ed-preview-band__seg ${theme === 'light' ? 'is-active' : ''}`}
            aria-pressed={theme === 'light'}
            onClick={() => setPreviewTheme('light')}
          >
            Light
          </button>
          <button
            type="button"
            className={`ed-preview-band__seg ${theme === 'dark' ? 'is-active' : ''}`}
            aria-pressed={theme === 'dark'}
            onClick={() => setPreviewTheme('dark')}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="ed-preview-band__frame">
        {dashboard ? (
          <ComponentPreviewFrame
            componentName={dashboard.name}
            level="v2"
            storyName={dashboard.defaultStory}
            theme={theme}
            density="comfortable"
            direction="ltr"
            stagedTokens={stagedTokens}
          />
        ) : (
          <div className="ed-preview-band__missing">
            No preview dashboard found. Add a <code>preview/*</code> story.
          </div>
        )}
      </div>
    </div>
  )
}

export { PreviewBand }
