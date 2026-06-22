const INLINE_PREVIEW_SIZE = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
} as const

export interface InlinePreviewProps {
  tokenName: string
  value: string
  stagedValue?: string
  size?: 'sm' | 'md'
}

export function InlinePreview({
  tokenName,
  value,
  stagedValue,
  size = 'md',
}: InlinePreviewProps) {
  const displayValue = stagedValue || value
  const { width, height } = INLINE_PREVIEW_SIZE[size]

  const isColor = tokenName.startsWith('--color-') && !tokenName.startsWith('--color-surface-')
  const isSpacing = tokenName.startsWith('--spacing-')
  const isRadius = tokenName.startsWith('--radius-')
  const isFontSize =
    tokenName.includes('font-size') ||
    tokenName.startsWith('--font-') ||
    tokenName.startsWith('--line-height-')

  if (isColor) {
    const hexValue =
      displayValue.startsWith('#') ||
      displayValue.startsWith('rgb') ||
      displayValue.startsWith('hsl') ||
      displayValue.startsWith('oklch')
        ? displayValue
        : displayValue.replace('var(', '').replace(')', '#808080')

    return (
      <div
        className="ed-inline-preview ed-inline-preview-swatch"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: hexValue,
          borderRadius: 'var(--ed-radius-button)',
          border: '1px solid var(--ed-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
        title={stagedValue ? `${tokenName}: ${displayValue} (staged)` : `${tokenName}: ${displayValue}`}
      />
    )
  }

  if (isSpacing) {
    const match = displayValue.match(/([\d.]+)(px|rem|em)?/)
    const numericValue = match ? parseFloat(match[1]) : 4
    const visualSize = Math.min(Math.max(numericValue, 2), 48)

    return (
      <div
        className="ed-inline-preview ed-inline-preview-spacing"
        style={{
          width: `${visualSize}px`,
          height: `${visualSize}px`,
          backgroundColor: 'var(--ed-surface-elevated)',
          border: `1px solid var(--ed-border)`,
          borderRadius: 'var(--ed-radius-button)',
        }}
        title={stagedValue ? `${tokenName}: ${displayValue} (staged)` : `${tokenName}: ${displayValue}`}
      >
        <div
          role="presentation"
          aria-hidden="true"
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--ed-accent)',
            marginTop: 'auto',
          }}
        />
      </div>
    )
  }

  if (isRadius) {
    const match = displayValue.match(/([\d.]+)(px)?/)
    const radius = match ? Math.min(parseFloat(match[1]), 24) : 8

    return (
      <div
        className="ed-inline-preview ed-inline-preview-radius"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: 'var(--ed-surface-elevated)',
          border: '1px solid var(--ed-border)',
          borderRadius: `${radius}px`,
        }}
        title={stagedValue ? `${tokenName}: ${displayValue} (staged)` : `${tokenName}: ${displayValue}`}
      />
    )
  }

  if (isFontSize) {
    return (
      <div
        className="ed-inline-preview ed-inline-preview-typography"
        style={{
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: `${width}px`,
          height: `${height}px`,
          backgroundColor: 'var(--ed-surface-elevated)',
          border: '1px solid var(--ed-border)',
          borderRadius: 'var(--ed-radius-button)',
        }}
        title={stagedValue ? `${tokenName}: ${displayValue} (staged)` : `${tokenName}: ${displayValue}`}
      >
        <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ed-text-primary)' }}>Aa</span>
      </div>
    )
  }

  return null
}
