import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { componentToStoryId, getStoryUrl, getAvailableStories } from '../utils/storybook'

interface ComponentPreviewFrameProps {
  componentName: string
  level: string
  storyName: string
  theme: 'light' | 'dark'
  density: 'compact' | 'comfortable' | 'spacious'
  direction: 'ltr' | 'rtl'
  stagedTokens: Map<string, string>
}

const STORYBOOK_ORIGIN = 'http://localhost:6006'

function buildTokenOverrideCss(tokens: Map<string, string>): string {
  if (tokens.size === 0) return ''
  return `:root {\n${[...tokens].map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`
}

function ComponentPreviewFrame({
  componentName,
  level,
  storyName,
  theme,
  density,
  direction,
  stagedTokens,
}: ComponentPreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const availableStories = useMemo(() => getAvailableStories(componentName), [componentName])
  const hasPreview = availableStories.length > 0

  const storyUrl = useMemo(() => {
    if (!hasPreview) return null
    return getStoryUrl(componentToStoryId(componentName, level, storyName))
  }, [componentName, level, storyName, hasPreview])

  // Probe Storybook on mount and component changes.
  // An iframe pointed at a refused port fires onLoad (not onError) with the
  // browser's own error page, so we can't rely on iframe events alone.
  // fetch() to a refused port throws a TypeError ("Failed to fetch") regardless
  // of CORS mode, so we use that to detect offline state up-front.
  useEffect(() => {
    if (!hasPreview) return
    const controller = new AbortController()
    setIsLoaded(false)
    setIsError(false)
    fetch(`${STORYBOOK_ORIGIN}/`, { method: 'HEAD', mode: 'no-cors', signal: controller.signal })
      .then(() => { /* server is up — let the iframe load normally */ })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== 'AbortError') {
          setIsError(true)
        }
      })
    return () => controller.abort()
    // Re-probe when the component changes so switching away and back re-checks.
  }, [componentName, hasPreview])

  // Reset load state when the story URL changes (story tab switch)
  useEffect(() => {
    setIsLoaded(false)
  }, [storyUrl])

  const handleLoad = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    setIsLoaded(true)
    iframe.contentWindow.postMessage(
      { type: 'GEEKLEGO_ATTRIBUTES', theme, density, direction },
      STORYBOOK_ORIGIN
    )
    const css = buildTokenOverrideCss(stagedTokens)
    if (css) {
      iframe.contentWindow.postMessage(
        { type: 'GEEKLEGO_TOKEN_OVERRIDES', css },
        STORYBOOK_ORIGIN
      )
    }
  }, [theme, density, direction, stagedTokens])

  // Re-send attributes when theme/density/direction change after load
  useEffect(() => {
    if (!isLoaded || !iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage(
      { type: 'GEEKLEGO_ATTRIBUTES', theme, density, direction },
      STORYBOOK_ORIGIN
    )
  }, [theme, density, direction, isLoaded])

  // Re-inject staged token overrides whenever they change
  useEffect(() => {
    if (!isLoaded || !iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage(
      { type: 'GEEKLEGO_TOKEN_OVERRIDES', css: buildTokenOverrideCss(stagedTokens) },
      STORYBOOK_ORIGIN
    )
  }, [stagedTokens, isLoaded])

  if (!hasPreview) {
    return (
      <div className="ed-component-preview-no-story">
        <p>No Storybook preview available for <strong>{componentName}</strong>.</p>
      </div>
    )
  }

  return (
    <div className="ed-component-preview-frame">
      {isError && (
        <div className="ed-component-preview-offline">
          <p><strong>Component preview unavailable</strong></p>
          <p>Start Storybook to see live previews:</p>
          <code>npm run storybook</code>
          <a
            href={STORYBOOK_ORIGIN}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Storybook ↗
          </a>
        </div>
      )}
      {!isLoaded && !isError && (
        <div className="ed-component-preview-frame-loading" aria-live="polite" aria-busy="true">
          Loading preview…
        </div>
      )}
      {!isError && (
        <iframe
          ref={iframeRef}
          key={storyUrl}
          src={storyUrl ?? undefined}
          title={`${componentName} – ${storyName} story`}
          role="region"
          aria-label={`${componentName} component preview`}
          sandbox="allow-same-origin allow-scripts"
          onLoad={handleLoad}
          onError={() => setIsError(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.15s ease' }}
        />
      )}
    </div>
  )
}

export { ComponentPreviewFrame }
