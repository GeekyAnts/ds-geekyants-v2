import React, { useState, useMemo } from 'react'
import { Palette, ArrowLeftRight, LayoutTemplate, Type, Timer, Square, Blend, MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react'
import { EdCard } from '../../editor-ds/primitives/EdCard'
import { ComponentPreview } from '../../components/ComponentPreview'
import { groupByVariant, type TokenCategory } from '../../utils/tokenCategories'
import './ComponentPage.css'

interface ComponentPageProps {
  componentName: string
  level: string
  tokens: Array<{ name: string; value: string }>
  onSelectToken?: (tokenName: string) => void
}

function componentToPrefix(name: string): string {
  return name
    .replace(/([A-Z])/g, (m, l, offset) => (offset === 0 ? l : `-${l}`))
    .toLowerCase()
}

const CATEGORY_ICONS: Record<TokenCategory, React.ReactNode> = {
  Color:      <Palette size={12} />,
  Spacing:    <ArrowLeftRight size={12} />,
  Layout:     <LayoutTemplate size={12} />,
  Typography: <Type size={12} />,
  Motion:     <Timer size={12} />,
  Border:     <Square size={12} />,
  Shadow:     <Blend size={12} />,
  Other:      <MoreHorizontal size={12} />,
}

// Pill colours for variant badges
const VARIANT_COLORS: Record<string, { bg: string; text: string }> = {
  Primary:     { bg: 'var(--ed-accent)', text: '#fff' },
  Secondary:   { bg: 'var(--ed-surface-elevated)', text: 'var(--ed-text-primary)' },
  Ghost:       { bg: 'transparent', text: 'var(--ed-text-secondary)' },
  Destructive: { bg: 'rgba(231,76,60,0.12)', text: '#e74c3c' },
  Danger:      { bg: 'rgba(231,76,60,0.12)', text: '#e74c3c' },
  Success:     { bg: 'rgba(39,174,96,0.12)', text: '#27ae60' },
  Warning:     { bg: 'rgba(230,126,34,0.12)', text: '#e67e22' },
  Info:        { bg: 'rgba(52,152,219,0.12)', text: '#3498db' },
  Error:       { bg: 'rgba(231,76,60,0.12)', text: '#e74c3c' },
  Link:        { bg: 'rgba(94,106,210,0.12)', text: 'var(--ed-accent)' },
  Outline:     { bg: 'transparent', text: 'var(--ed-text-secondary)' },
}

function variantPillStyle(variant: string): React.CSSProperties {
  const c = VARIANT_COLORS[variant] ?? { bg: 'var(--ed-surface-elevated)', text: 'var(--ed-text-secondary)' }
  return {
    display: 'inline-block',
    padding: '1px 8px',
    borderRadius: '99px',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    background: c.bg,
    color: c.text,
    border: c.bg === 'transparent' ? '1px solid var(--ed-border)' : 'none',
  }
}

function ComponentPage({ componentName, level, tokens, onSelectToken }: ComponentPageProps) {
  const componentPrefix = componentToPrefix(componentName)
  const [selectedTokenName, setSelectedTokenName] = useState<string | null>(null)

  const originalTokensMap = useMemo(() => {
    const map = new Map<string, string>()
    tokens.forEach((t) => map.set(t.name, t.value))
    return map
  }, [tokens])

  const variantGroups = useMemo(() => groupByVariant(tokens, componentPrefix), [tokens, componentPrefix])

  const [activeVariant, setActiveVariant] = useState<string>(() => variantGroups[0]?.variant ?? 'Base')

  // Keep activeVariant valid when component changes
  const activeGroup = variantGroups.find((g) => g.variant === activeVariant) ?? variantGroups[0]

  const initialExpandedCats = useMemo(() => {
    const s = new Set<string>()
    variantGroups.forEach((g) => g.categories.forEach((c) => s.add(`${g.variant}::${c.category}`)))
    return s
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [expandedCats, setExpandedCats] = useState<Set<string>>(initialExpandedCats)

  const handleTokenClick = (token: { name: string; value: string }) => {
    setSelectedTokenName(token.name)
    onSelectToken?.(token.name)
  }

  const toggleCat = (key: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const singleTab = variantGroups.length === 1

  return (
    <div className="ed-component-page">
      <EdCard className="ed-component-preview">
        <ComponentPreview
          tokens={originalTokensMap}
          originalTokens={originalTokensMap}
          componentName={componentName}
          level={level}
        />
      </EdCard>

      <EdCard style={{ '--ed-card-padding': '0' } as React.CSSProperties}>
        <div className="ed-comptok-header">
          <span className="ed-comptok-title">{componentName} Tokens</span>
          <span className="ed-comptok-count">{tokens.length}</span>
        </div>

        {variantGroups.length === 0 ? (
          <div className="ed-comptok-empty">No tokens found for {componentName}</div>
        ) : (
          <>
            {!singleTab && (
              <div className="ed-comptok-tabs" role="tablist" aria-label="Token variants">
                {variantGroups.map(({ variant, totalCount }) => (
                  <button
                    key={variant}
                    role="tab"
                    aria-selected={variant === activeGroup?.variant}
                    className={`ed-comptok-tab${variant === activeGroup?.variant ? ' ed-comptok-tab--active' : ''}`}
                    onClick={() => setActiveVariant(variant)}
                  >
                    <span className="ed-comptok-tab-label">{variant}</span>
                    <span className="ed-comptok-tab-count">{totalCount}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="ed-comptok-table" role={!singleTab ? 'tabpanel' : undefined}>
              {activeGroup?.categories.map(({ category, tokens: catTokens }) => {
                const catKey = `${activeGroup.variant}::${category}`
                const catOpen = expandedCats.has(catKey)
                return (
                  <div key={catKey} className="ed-comptok-category">
                    <button
                      className="ed-comptok-category-header"
                      onClick={() => toggleCat(catKey)}
                      aria-expanded={catOpen}
                    >
                      <span className="ed-comptok-category-icon" aria-hidden="true">
                        {CATEGORY_ICONS[category]}
                      </span>
                      <span className="ed-comptok-category-name">{category}</span>
                      <span className="ed-comptok-category-count">{catTokens.length}</span>
                      <span className="ed-comptok-category-chevron">
                        {catOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </span>
                    </button>

                    {catOpen && (
                      <div className="ed-comptok-token-list">
                        {catTokens.map((token, idx) => {
                          const isSelected = selectedTokenName === token.name
                          return (
                            <div
                              key={`${token.name}-${idx}`}
                              className={`ed-comptok-row${isSelected ? ' ed-comptok-row--selected' : ''}`}
                              onClick={() => handleTokenClick(token)}
                            >
                              <span className="ed-comptok-row-name">{token.name}</span>
                              <span className="ed-comptok-row-value">{token.value}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </EdCard>
    </div>
  )
}

export default ComponentPage
