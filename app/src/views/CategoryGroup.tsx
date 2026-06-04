import { useState, useRef, useEffect, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'
import { stage, getStagedValue } from '../state/staging'
import { generateOklchScale, withPxAnnotation } from '../utils/colorUtils'
import { EdCard } from '../editor-ds/primitives/EdCard'
import { EdColorPicker } from '../editor-ds/primitives/EdColorPicker'

/** Resolve a CSS value to a concrete color using staged edits then the in-memory
 *  token map. Never reads from getComputedStyle which would pick up the editor's
 *  data-theme="dark" override and return the wrong colour. */
function resolveDisplayColor(value: string, tokenMap: Map<string, string>, depth = 0): string {
  if (depth > 5) return value
  if (value.startsWith('var(')) {
    const varMatch = value.match(/var\((--[\w-]+)\)/)
    if (varMatch) {
      const varName = varMatch[1]
      const staged = getStagedValue(varName)
      if (staged) return resolveDisplayColor(staged, tokenMap, depth + 1)
      const inMemory = tokenMap.get(varName)
      if (inMemory) return resolveDisplayColor(inMemory, tokenMap, depth + 1)
    }
  }
  return value
}

function renderTokenValue(token: { name: string; value: string }, category: string, tokenMap: Map<string, string>) {
  const isColor = category === 'color' || token.name.startsWith('--color-') || token.name.startsWith('--shadow-')
  if (isColor) {
    const displayColor = resolveDisplayColor(token.value, tokenMap)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start', flexShrink: 0 }}>
        <div
          style={{
            width: '20px', height: '20px', borderRadius: '4px',
            backgroundColor: displayColor, border: '1px solid var(--ed-border)', flexShrink: 0,
          }}
          title={displayColor}
        />
        <span className="ed-token-value">{withPxAnnotation(token.value)}</span>
      </div>
    )
  }
  return <span className="ed-token-value">{withPxAnnotation(token.value)}</span>
}

// ── Base color popover ─────────────────────────────────────────────────────────

interface BaseColorPickerProps {
  colorFamily: string
  base500Token: { name: string; value: string } | undefined
  tokenMap: Map<string, string>
}

function BaseColorPicker({ colorFamily, base500Token, tokenMap }: BaseColorPickerProps) {
  const [open, setOpen] = useState(false)
  const [pickerColor, setPickerColor] = useState('#000000')
  const anchorRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Initialise picker colour from staged or original 500 value
  const getBase500Hex = useCallback((): string => {
    const staged = getStagedValue(`--color-${colorFamily}-500`)
    const raw = staged ?? base500Token?.value ?? '#000000'
    return resolveDisplayColor(raw, tokenMap)
  }, [colorFamily, base500Token, tokenMap])

  const handleOpen = () => {
    setPickerColor(getBase500Hex())
    setOpen(true)
  }

  const handleDone = () => {
    stage(`--color-${colorFamily}-500`, pickerColor)
    setOpen(false)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const currentSwatchColor = resolveDisplayColor(
    getStagedValue(`--color-${colorFamily}-500`) ?? base500Token?.value ?? '#000000',
    tokenMap
  )

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px' }}>
      <button
        ref={anchorRef}
        onClick={handleOpen}
        title="Set base color (500 shade) for palette regeneration"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '3px 8px 3px 4px', background: 'var(--ed-surface)',
          border: '1px solid var(--ed-border)', borderRadius: 'var(--ed-radius-button)',
          color: 'var(--ed-text-secondary)', fontSize: '11px', cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-accent)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-border)' }}
      >
        <div
          style={{
            width: '16px', height: '16px', borderRadius: '3px',
            backgroundColor: currentSwatchColor, border: '1px solid var(--ed-border)', flexShrink: 0,
          }}
        />
        Base color
      </button>

      {open && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 200,
            background: 'var(--ed-surface-elevated)', border: '1px solid var(--ed-border)',
            borderRadius: '10px', padding: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            width: '240px',
          }}
        >
          <div style={{ marginBottom: '8px', fontSize: '11px', color: 'var(--ed-text-muted)', fontWeight: 500 }}>
            Base color · 500 shade
          </div>
          <EdColorPicker value={pickerColor} onChange={setPickerColor} />
          <button
            onClick={handleDone}
            style={{
              marginTop: '10px', width: '100%', padding: '7px 0',
              background: 'var(--ed-accent)', border: 'none', borderRadius: 'var(--ed-radius-button)',
              color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}

// ── Group header controls ──────────────────────────────────────────────────────

interface PaletteControlsProps {
  colorFamily: string
  tokens: Array<{ name: string; value: string }>
  tokenMap: Map<string, string>
}

function PaletteControls({ colorFamily, tokens, tokenMap }: PaletteControlsProps) {
  const base500Token = tokens.find(t => t.name === `--color-${colorFamily}-500`)

  const handleRegen = () => {
    const staged = getStagedValue(`--color-${colorFamily}-500`)
    const base500Value = staged ?? base500Token?.value
    if (!base500Value) return
    const resolved = resolveDisplayColor(base500Value, tokenMap)
    const shades = generateOklchScale(resolved)
    for (const [shade, hex] of Object.entries(shades)) {
      stage(`--color-${colorFamily}-${shade}`, hex)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <BaseColorPicker colorFamily={colorFamily} base500Token={base500Token} tokenMap={tokenMap} />
      <button
        onClick={handleRegen}
        title={`Regenerate palette from the base color`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '3px 8px', background: 'transparent',
          border: '1px solid var(--ed-border)', borderRadius: 'var(--ed-radius-button)',
          color: 'var(--ed-text-muted)', fontSize: '11px', cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ed-accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-accent)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ed-text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--ed-border)' }}
      >
        <RefreshCw size={11} aria-hidden="true" />
        Regen palette
      </button>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

interface GroupProps {
  groupName: string
  tokens: Array<{ name: string; value: string }>
  scaleView?: boolean
  category: string
  onTokenClick?: (token: { name: string; value: string }) => void
  selected?: Set<string>
  onToggleSelect?: (tokenName: string) => void
  selectionMode?: boolean
  colorFamily?: string
  tokenMap?: Map<string, string>
  onAddToken?: () => void
}

function CategoryGroup({ groupName, tokens, scaleView, category, onTokenClick, selected, onToggleSelect, selectionMode, colorFamily, tokenMap = new Map(), onAddToken }: GroupProps) {
  const handleRowClick = (token: { name: string; value: string }) => {
    onTokenClick?.(token)
  }

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
      <h3 className="ed-group-title" style={{ margin: 0 }}>{groupName}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {colorFamily && <PaletteControls colorFamily={colorFamily} tokens={tokens} tokenMap={tokenMap} />}
        {onAddToken && !colorFamily && (
          <button
            onClick={onAddToken}
            title="Add token to this group"
            aria-label={`Add token to ${groupName}`}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '22px', height: '22px', padding: 0,
              background: 'transparent', border: '1px solid var(--ed-border)',
              borderRadius: '4px', color: 'var(--ed-text-muted)',
              fontSize: '14px', lineHeight: 1, cursor: 'pointer',
              transition: 'all 0.15s ease', flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--ed-accent)'
              el.style.borderColor = 'var(--ed-accent)'
              el.style.background = 'var(--ed-accent-tint)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--ed-text-muted)'
              el.style.borderColor = 'var(--ed-border)'
              el.style.background = 'transparent'
            }}
          >
            +
          </button>
        )}
      </div>
    </div>
  )

  if (scaleView) {
    return (
      <div className="ed-category-group">
        {header}
        {tokens.map((token, idx) => (
          <div
            key={idx}
            className="ed-token-row"
            onClick={() => handleRowClick(token)}
          >
            <span className="ed-token-name">{token.name}</span>
            {renderTokenValue(token, category, tokenMap)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <EdCard className="ed-category-group" style={{ '--ed-card-padding': '16px 16px 12px 16px' } as React.CSSProperties}>
      {header}
      <div className="ed-token-list">
        {tokens.map((token, idx) => (
          <div
            key={idx}
            className="ed-token-row"
            onClick={() => handleRowClick(token)}
          >
            {selectionMode && (
              <input
                type="checkbox"
                checked={selected?.has(token.name) ?? false}
                onChange={() => onToggleSelect?.(token.name)}
                onClick={e => e.stopPropagation()}
                style={{ accentColor: 'var(--ed-accent)', marginRight: '8px', cursor: 'pointer' }}
              />
            )}
            <span className="ed-token-name">{token.name}</span>
            {renderTokenValue(token, category, tokenMap)}
          </div>
        ))}
      </div>
    </EdCard>
  )
}

export default CategoryGroup
