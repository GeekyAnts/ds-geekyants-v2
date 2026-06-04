import { EdChip } from '../../editor-ds/primitives/EdChip'
import { withPxAnnotation } from '../../utils/colorUtils'
import { categorizeTokens, type TokenCategory } from '../../utils/tokenCategories'

const CATEGORY_ICONS: Record<TokenCategory, string> = {
  Color: '🎨',
  Spacing: '↔',
  Layout: '⬜',
  Typography: 'T',
  Motion: '◎',
  Border: '⬡',
  Shadow: '◐',
  Other: '···',
}

interface VariantGroupProps {
  variantName: string
  tokens: Array<{ name: string; value: string }>
  componentPrefix: string
  onTokenClick?: (token: { name: string; value: string }) => void
  isExpanded?: boolean
  onToggle?: () => void
  selectedTokenName?: string | null
}

function VariantGroup({
  variantName,
  tokens,
  componentPrefix,
  onTokenClick,
  isExpanded = true,
  onToggle,
  selectedTokenName,
}: VariantGroupProps) {
  const categorized = categorizeTokens(tokens, componentPrefix)

  return (
    <div className="ed-component-variant-group">
      <div className="ed-component-variant-header">
        <EdChip variant="accent" onClick={onToggle} style={{ cursor: 'pointer' }}>
          {variantName}
        </EdChip>
        <h4 className="ed-component-variant-title">{variantName}</h4>
        <button
          className="ed-component-variant-toggle"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-label={`Toggle ${variantName} variant`}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="ed-component-token-list">
          {categorized.map(({ category, tokens: catTokens }) => (
            <div key={category} className="ed-token-category-group">
              <div className="ed-token-category-label">
                <span className="ed-token-category-icon" aria-hidden="true">
                  {CATEGORY_ICONS[category]}
                </span>
                {category}
                <span className="ed-token-category-count">{catTokens.length}</span>
              </div>
              {catTokens.map((token, idx) => {
                const isSelected = selectedTokenName === token.name
                return (
                  <div
                    key={`${token.name}-${idx}`}
                    className={`ed-component-token-row${isSelected ? ' ed-component-token-row--selected' : ''}`}
                    onClick={() => onTokenClick?.(token)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ed-component-token-name">{token.name}</div>
                    <div className="ed-component-token-value">{withPxAnnotation(token.value)}</div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VariantGroup
