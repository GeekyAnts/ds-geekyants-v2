import type { TokenEntry } from '../types'

interface ScaleViewProps {
  category: string
  tokens: TokenEntry[]
}

const getSortByLightness = () => {
  return (a: TokenEntry, b: TokenEntry) => {
    const alpha = (hex: string) => {
      if (!hex.startsWith('#') || hex.length !== 7) return 0
      const val = parseInt(hex.slice(5, 7), 16)
      return val / 255
    }
    const lum = (hex: string) => {
      if (!hex.startsWith('#') || hex.length !== 7) return 0.5
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const alphaA = alpha(a.value)
    const alphaB = alpha(b.value)
    if (alphaA !== 0 && alphaB !== 0) {
      return alphaB - alphaA
    }
    return lum(b.value) - lum(a.value)
  }
}

const getNumericSort = () => {
  const extractNumeric = (value: string): number => {
    if (value.startsWith('--')) {
      const parts = value.replace('--', '').split('-')
      const last = parts[parts.length - 1]
      const parsed = parseInt(last, 10)
      if (!isNaN(parsed)) return parsed
    }
    const match = value.match(/([\d.]+)(px|rem|ms|s)?/)
    if (match) return parseFloat(match[1])
    return 0
  }
  return (a: TokenEntry, b: TokenEntry) => extractNumeric(a.value) - extractNumeric(b.value)
}

function ScaleView({ category, tokens }: ScaleViewProps) {
  const isColorScale = category.includes('color') && !category.includes('surface')
  const isSpacingScale = category.includes('spacing')
  const isRadiusScale = category.includes('radius')
  const isFontSizeScale =
    category.includes('font-size') ||
    category.includes('line-height') ||
    category.includes('letter-spacing')

  let displayTokens = [...tokens]
  let shouldSort = false

  if (isColorScale) {
    displayTokens.sort(getSortByLightness())
    shouldSort = true
  } else if (isSpacingScale || isRadiusScale || isFontSizeScale) {
    displayTokens.sort(getNumericSort())
    shouldSort = true
  }

  if (isColorScale) {
    return (
      <div className="ed-scale-view">
        {displayTokens.map((token) => {
          const displayValue = token.value.startsWith('#')
            ? token.value
            : token.value.replace('var(', '').replace(')', '')

          return (
            <div
              className="ed-scale-row"
              style={{
                '--ed-scale-row-height': '32px',
              } as React.CSSProperties}
            >
              <div className="ed-scale-swatch" style={{ backgroundColor: displayValue }} />
              <div className="ed-scale-label">
                <span className="ed-scale-name">{token.name}</span>
                <span className="ed-scale-value">{displayValue}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (isSpacingScale) {
    return (
      <div className="ed-scale-view">
        {displayTokens.map((token) => {
          const numericValue = token.value.match(/([\d.]+)(px|rem)?/)?.[1] || token.value
          const size = Math.min(Math.max(parseFloat(numericValue) || 0, 2), 96)

          return (
            <div className="ed-scale-row">
              <div
                className="ed-scale-visual"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: 'var(--ed-surface-elevated)',
                  border: '1px solid var(--ed-border)',
                }}
              />
              <div className="ed-scale-label">
                <span className="ed-scale-name">{token.name}</span>
                <span className="ed-scale-value">{token.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (isRadiusScale) {
    return (
      <div className="ed-scale-view">
        {displayTokens.map((token) => {
          const numericValue = token.value.match(/([\d.]+)(px)?/)?.[1] || token.value
          const radius = parseFloat(numericValue) || 8

          return (
            <div className="ed-scale-row">
              <div
                className="ed-scale-visual"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: `${radius}px`,
                  backgroundColor: 'var(--ed-surface-elevated)',
                  border: '1px solid var(--ed-border)',
                }}
              />
              <div className="ed-scale-label">
                <span className="ed-scale-name">{token.name}</span>
                <span className="ed-scale-value">{token.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (isFontSizeScale) {
    return (
      <div className="ed-scale-view">
        {displayTokens.map((token) => {
          const numericValue = token.value.match(/([\d.]+)(px|rem|em)?/)?.[1] || token.value
          const size = parseFloat(numericValue) || 16
          const cssSize = token.value.includes('rem')
            ? `${size}rem`
            : token.value.includes('em')
              ? `${size}em`
              : `${size}px`

          return (
            <div
              className="ed-scale-row"
              style={{
                '--ed-scale-row-height': `${Math.max(size * 1.5, 32)}px`,
              } as React.CSSProperties}
            >
              <div
                className="ed-scale-visual"
                style={{
                  fontSize: cssSize,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="ed-scale-label">
                <span className="ed-scale-name">{token.name}</span>
                <span className="ed-scale-value">{token.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}

export default ScaleView
