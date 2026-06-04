import type { TokenEntry } from '../types'
import { InlinePreview } from '../components/InlinePreview'
import { withPxAnnotation } from '../utils/colorUtils'

interface TokenRowProps {
  token: TokenEntry
  scaleView?: boolean
  scaleCategory?: string
  onClick?: (token: TokenEntry) => void
  stagedValue?: string
  selected?: boolean
  onToggleSelect?: () => void
  selectionMode?: boolean
}

function TokenRow({ token, scaleView, scaleCategory, onClick, stagedValue, selected, onToggleSelect, selectionMode }: TokenRowProps) {
  const handleClick = () => {
    if (selectionMode) return
    onClick?.(token)
  }

  return (
    <div
      className="ed-token-row"
      onClick={handleClick}
      style={{
        cursor: selectionMode ? 'default' : onClick ? 'pointer' : 'default',
      }}
    >
      {selectionMode && (
        <div
          className="ed-token-row-checkbox"
          onClick={(e) => { e.stopPropagation(); onToggleSelect?.() }}
          style={{ padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <input
            type="checkbox"
            checked={!!selected}
            onChange={() => onToggleSelect?.()}
            style={{ accentColor: 'var(--ed-accent)', cursor: 'pointer' }}
          />
        </div>
      )}
      <InlinePreview tokenName={token.name} value={token.value} stagedValue={stagedValue} size="sm" />
      <div className="ed-token-row-content">
        <div className="ed-token-name">{token.name}</div>
        <div className="ed-token-value">{withPxAnnotation(stagedValue || token.value)}</div>
      </div>
    </div>
  )
}

export default TokenRow

