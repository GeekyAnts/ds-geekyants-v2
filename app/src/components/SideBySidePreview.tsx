import { ArrowRight } from 'lucide-react'

interface SideBySidePreviewProps {
  tokenName: string
  originalValue: string
  stagedValue: string
}

function SideBySidePreview({
  tokenName,
  originalValue,
  stagedValue,
}: SideBySidePreviewProps) {
  const isColor = tokenName.startsWith('--color-')

  if (isColor) {
    return (
      <div className="ed-side-by-side-preview ed-side-by-side-color-compare">
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Original</div>
          <div
            className="ed-swatch-compare"
            style={{ backgroundColor: originalValue }}
            title={originalValue}
            role="img"
            aria-label={`Original value: ${originalValue}`}
          />
          <div className="ed-value-label">{originalValue}</div>
        </div>
        <div
          className="ed-side-by-side-divider"
          aria-hidden="true"
          role="presentation"
        >
          <ArrowRight size={14} aria-hidden="true" />
</div>
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Staged</div>
          <div
            className="ed-swatch-compare"
            style={{ backgroundColor: stagedValue }}
            title={stagedValue}
            role="img"
            aria-label={`Staged value: ${stagedValue}`}
          />
          <div className="ed-value-label">{stagedValue}</div>
        </div>
      </div>
    )
  }

  const isSpacing = tokenName.startsWith('--spacing-')

  if (isSpacing) {
    const originalSize = parseFloat(originalValue.match(/([\d.]+)/)?.[1] || '4')
    const stagedSize = parseFloat(stagedValue.match(/([\d.]+)/)?.[1] || '4')
    const scale = Math.min(Math.max((stagedSize / originalSize) * 24, 8), 48)

    return (
      <div className="ed-side-by-side-preview ed-side-by-side-spacing-compare">
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Original</div>
          <div
            className="ed-spacing-compare-block"
            style={{ width: `${originalSize * 4}px`, height: `${originalSize * 4}px` }}
            title={originalValue}
            role="img"
            aria-label={`Original spacing: ${originalValue}`}
          />
          <div className="ed-value-label">{originalValue}</div>
        </div>
        <div
          className="ed-side-by-side-divider"
          aria-hidden="true"
          role="presentation"
        >
          <ArrowRight size={14} aria-hidden="true" />
</div>
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Staged</div>
          <div
            className="ed-spacing-compare-block"
            style={{ width: `${scale}px`, height: `${scale}px` }}
            title={stagedValue}
            role="img"
            aria-label={`Staged spacing: ${stagedValue}`}
          />
          <div className="ed-value-label">{stagedValue}</div>
        </div>
      </div>
    )
  }

  const isRadius = tokenName.startsWith('--radius-')

  if (isRadius) {
    const originalRadius = parseFloat(originalValue.match(/([\d.]+)/)?.[1] || '8')
    const stagedRadius = parseFloat(stagedValue.match(/([\d.]+)/)?.[1] || '8')

    return (
      <div className="ed-side-by-side-preview ed-side-by-side-radius-compare">
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Original</div>
          <div
            className="ed-radius-compare-shape"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: `${originalRadius}px`,
            }}
            title={originalValue}
            role="img"
            aria-label={`Original radius: ${originalRadius}px`}
          />
          <div className="ed-value-label">{originalValue}</div>
        </div>
        <div
          className="ed-side-by-side-divider"
          aria-hidden="true"
          role="presentation"
        >
          <ArrowRight size={14} aria-hidden="true" />
</div>
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Staged</div>
          <div
            className="ed-radius-compare-shape"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: `${stagedRadius}px`,
            }}
            title={stagedValue}
            role="img"
            aria-label={`Staged radius: ${stagedRadius}px`}
          />
          <div className="ed-value-label">{stagedValue}</div>
        </div>
      </div>
    )
  }

  const isFontSize = tokenName.startsWith('--text-') || tokenName.startsWith('--font-')

  if (isFontSize) {
    const originalSize = parseFloat(originalValue.match(/([\d.]+)/)?.[1] || '16')
    const stagedSize = parseFloat(stagedValue.match(/([\d.]+)/)?.[1] || '16')

    return (
      <div className="ed-side-by-side-preview ed-side-by-side-typography-compare">
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Original</div>
          <div
            className="ed-typography-compare-text"
            style={{ fontSize: `${originalSize}px` }}
            title={originalValue}
          >
            The quick brown fox
          </div>
          <div className="ed-value-label">{originalValue}</div>
        </div>
        <div
          className="ed-side-by-side-divider"
          aria-hidden="true"
          role="presentation"
        >
          <ArrowRight size={14} aria-hidden="true" />
</div>
        <div className="ed-side-by-side-column">
          <div className="ed-side-by-side-label">Staged</div>
          <div
            className="ed-typography-compare-text"
            style={{ fontSize: `${stagedSize}px` }}
            title={stagedValue}
          >
            The quick brown fox
          </div>
          <div className="ed-value-label">{stagedValue}</div>
        </div>
      </div>
    )
  }

  return null
}

export { SideBySidePreview }
