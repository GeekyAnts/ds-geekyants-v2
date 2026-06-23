import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { ChevronUp, ChevronDown, Check, ArrowDown } from 'lucide-react'
import type { TokenGraph } from '../../graph/build'
import type { TokenMetadata, MetadataStagedChanges } from '../../state/metadata.types'
import { useMetadata } from '../../state/metadata'
import { EdButton, EdScrollArea, EdEmptyState, EdColorPicker, EdInput } from '../../editor-ds/primitives'
import { isPinned, togglePin } from '../../state/pinning'
import { subscribeToPendingChanges, getAllStaged, getStagedValue, setDraft, unstage, getStagedNewTokens } from '../../state/staging'
import { withPxAnnotation } from '../../utils/colorUtils'
import type { GeeklegoTokensV2, TokenUsageMap } from '../../types'
import { UsedBy } from './UsedBy'
import { UsedInComponents } from './UsedInComponents'
import './Inspector.css'
import './UsedBy.css'

// In v2's 2-tier model, only PRIMITIVES are aliased by other tokens (a primitive →
// a semantic, e.g. --color-brand-900 → --primary). Semantics are the top token layer —
// nothing aliases them (they're consumed by components, shown in "Used in components").
// So the token→token "Used by" graph block is only meaningful for primitives; for
// semantics/ext it would always say "not used by any other tokens" — misleading noise.
const PRIMITIVE_TOKEN_PREFIXES = [
  '--color-', '--spacing-', '--radius-', '--font-', '--text-', '--leading-', '--tracking-',
  '--border-', '--shadow-', '--motion-', '--duration-', '--ease-', '--z-', '--z-index-',
  '--icon-size-', '--size-', '--opacity-', '--breakpoint-',
]
function isPrimitiveToken(tokenName: string): boolean {
  return PRIMITIVE_TOKEN_PREFIXES.some(p => tokenName.startsWith(p))
}

function deriveBreadcrumb(tokenName: string): string {
  if (tokenName.startsWith('--color-')) return 'Foundations / Color'
  if (tokenName.startsWith('--spacing-')) return 'Foundations / Spacing'
  if (tokenName.startsWith('--radius-')) return 'Foundations / Radius'
  if (tokenName.startsWith('--font-')) return 'Foundations / Fonts'
  if (tokenName.startsWith('--typography-')) return 'Semantic / Typography'
  if (tokenName.startsWith('--border-')) return 'Foundations / Borders'
  if (tokenName.startsWith('--opacity-')) return 'Foundations / Opacity'
  if (tokenName.startsWith('--z-')) return 'Foundations / Z-Index'
  if (tokenName.startsWith('--motion-')) return 'Foundations / Motion'
  if (tokenName.startsWith('--shadow-')) return 'Foundations / Shadows'
  return 'Tokens'
}

const SEMANTIC_PREFIXES = ['bg', 'text', 'border', 'action', 'status', 'state', 'data-series', 'surface', 'hue', 'alpha']

function isFoundationColorToken(tokenName: string): boolean {
  if (!tokenName.startsWith('--color-')) return false
  const rest = tokenName.slice('--color-'.length)
  return !SEMANTIC_PREFIXES.some(p => rest.startsWith(p + '-') || rest === p)
}

/** Extract the colour family name from a foundation token, e.g. "brand" from "--color-brand-50" */
// Mirrors PRIMITIVE_PREFIX in EditorShell.tsx and ContextPane.tsx —
// maps the JS primitive-object key to the CSS variable prefix.
const PRIMITIVE_PREFIX: Record<string, string> = {
  colors: 'color',
  fontFamily: 'font',
  fontSize: 'text',
  fontWeight: 'font-weight',
  lineHeight: 'leading',
  letterSpacing: 'tracking',
  spacing: 'spacing',
  radius: 'radius',
  borderWidth: 'border-width',
  opacity: 'opacity',
  zIndex: 'z-index',
  duration: 'duration',
  easing: 'ease',
  sizeScale: 'size',
  iconSize: 'icon-size',
  breakpoints: 'breakpoint',
}

function resolveTokenValue(
  tokenName: string,
  tokens: GeeklegoTokensV2
): string | null {
  const staged = getStagedValue(tokenName)
  if (staged !== undefined) return staged

  const prims = tokens.primitives as unknown as Record<string, unknown>
  for (const category of Object.keys(prims)) {
    const prefix = PRIMITIVE_PREFIX[category]
    if (!prefix) continue
    const vals = prims[category]
    if (!vals || typeof vals !== 'object') continue
    for (const [k, v] of Object.entries(vals as Record<string, unknown>)) {
      if (typeof v === 'string') {
        if (`--${prefix}-${k}` === tokenName) return v
      } else if (v && typeof v === 'object') {
        for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
          if (typeof v2 === 'string' && `--${prefix}-${k}-${k2}` === tokenName) {
            return v2
          }
        }
      }
    }
  }

  // Flat v2 semantics — CSS var for a key is `--<key>`
  const semanticKey = tokenName.replace(/^--/, '')
  const semanticVal = tokens.semantics.light[semanticKey]
  if (typeof semanticVal === 'string') return semanticVal

  // Fall back to tokens added via stageNewToken() (stored separately from getStagedValue)
  const stagedNew = getStagedNewTokens().get(tokenName)
  if (stagedNew) return stagedNew.value

  return null
}

function walkAliasChain(
  tokenName: string,
  graph: TokenGraph | null,
  tokens: GeeklegoTokensV2
): { name: string; value: string | null }[] {
  if (!graph) return [{ name: tokenName, value: resolveTokenValue(tokenName, tokens) }]

  const chain: { name: string; value: string | null }[] = []
  let current = tokenName
  const visited = new Set<string>()

  while (current && !visited.has(current)) {
    visited.add(current)
    const value = resolveTokenValue(current, tokens)
    chain.push({ name: current, value })
    
    const node = graph.nodes.get(current)
    if (node && node.dependsOn.length > 0) {
      current = node.dependsOn[0]
    } else {
      break
    }
  }

  return chain
}

// ─── Token alias picker ────────────────────────────────────────────────────────

/** Detect the broad "family" of a CSS var name so we can filter candidates */
function getTokenFamily(tokenName: string): string {
  if (tokenName.startsWith('--color-')) return 'color'
  if (tokenName.startsWith('--spacing-')) return 'spacing'
  if (tokenName.startsWith('--radius-')) return 'radius'
  if (tokenName.startsWith('--text-')) return 'font-size'
  if (tokenName.startsWith('--font-weight-')) return 'font-weight'
  if (tokenName.startsWith('--font-')) return 'font-family'
  if (tokenName.startsWith('--leading-')) return 'line-height'
  if (tokenName.startsWith('--tracking-')) return 'letter-spacing'
  if (tokenName.startsWith('--border-width-')) return 'border-width'
  if (tokenName.startsWith('--opacity-')) return 'opacity'
  if (tokenName.startsWith('--size-')) return 'size'
  if (tokenName.startsWith('--icon-size-')) return 'icon-size'
  if (tokenName.startsWith('--duration-')) return 'duration'
  if (tokenName.startsWith('--ease-')) return 'ease'
  if (tokenName.startsWith('--shadow-')) return 'shadow'
  return ''
}

/**
 * For a semantic token (already in the semantic tier), return the colour-family
 * of its current alias so we can scope the primitive pool.
 * e.g. "--color-action-primary" aliases "--color-brand-*" → return "brand"
 * Returns null when the alias isn't a primitive colour token.
 */
function getAliasedColorFamily(currentAlias: string | null): string | null {
  if (!currentAlias) return null
  // primitive colours follow --color-{family}-{shade}
  const m = currentAlias.match(/^--color-([a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*?)-\d+$/)
  return m ? m[1] : null
}

function flattenPrimitiveTokens(tokens: GeeklegoTokensV2): { name: string; value: string }[] {
  const result: { name: string; value: string }[] = []
  const prims = tokens.primitives as unknown as Record<string, unknown>
  for (const category of Object.keys(prims)) {
    const prefix = PRIMITIVE_PREFIX[category]
    if (!prefix) continue
    const vals = prims[category]
    if (!vals || typeof vals !== 'object') continue
    for (const [k, v] of Object.entries(vals as Record<string, unknown>)) {
      if (typeof v === 'string') {
        const name = `--${prefix}-${k}`
        result.push({ name, value: getStagedValue(name) ?? v })
      } else if (typeof v === 'number') {
        const name = `--${prefix}-${k}`
        result.push({ name, value: getStagedValue(name) ?? String(v) })
      } else if (v && typeof v === 'object') {
        for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
          if (typeof v2 === 'string') {
            const name = `--${prefix}-${k}-${k2}`
            result.push({ name, value: getStagedValue(name) ?? v2 })
          } else if (typeof v2 === 'number') {
            const name = `--${prefix}-${k}-${k2}`
            result.push({ name, value: getStagedValue(name) ?? String(v2) })
          }
        }
      }
    }
  }
  // Include tokens added via stageNewToken()
  for (const [, newToken] of getStagedNewTokens()) {
    const { kind } = newToken.treePath
    if (kind === 'primitiveColor' || kind === 'primitiveFlat') {
      result.push({ name: newToken.cssName, value: newToken.value })
    }
  }
  // Include brand-new primitive color tokens staged via stage() (e.g. new palettes from NewPaletteDialog)
  const existingNames = new Set(result.map(t => t.name))
  for (const [name, value] of getAllStaged()) {
    if (!existingNames.has(name) && /^--color-[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*-\d+$/.test(name)) {
      result.push({ name, value })
    }
  }
  return result
}

function flattenSemanticTokens(tokens: GeeklegoTokensV2): { name: string; value: string }[] {
  const result: { name: string; value: string }[] = []
  // Flat v2 semantics — CSS var for a key is `--<key>`
  for (const [k, v] of Object.entries(tokens.semantics.light)) {
    const name = `--${k}`
    result.push({ name, value: getStagedValue(name) ?? v })
  }
  // Include newly staged semantic tokens
  for (const [, newToken] of getStagedNewTokens()) {
    if (newToken.treePath.kind === 'semanticFlat') {
      result.push({ name: newToken.cssName, value: newToken.value })
    }
  }
  return result
}

function resolveDisplayColor(
  value: string,
  tokenMap: Map<string, string>,
  depth = 0
): string {
  if (depth > 5) return value
  if (value.startsWith('var(')) {
    const m = value.match(/var\((--[\w-]+)\)/)
    if (m) {
      const varName = m[1]
      // Staged edit takes priority (already reflects user changes)
      const staged = getStagedValue(varName)
      if (staged) return resolveDisplayColor(staged, tokenMap, depth + 1)
      // Then our in-memory token data (uses light-mode values, unaffected by data-theme="dark" on <html>)
      const inMemory = tokenMap.get(varName)
      if (inMemory) return resolveDisplayColor(inMemory, tokenMap, depth + 1)
    }
  }
  return value
}

interface TokenAliasPickerProps {
  currentValue: string           // e.g. "var(--color-neutral-0)"
  tokenName: string              // the token being edited
  tokens: GeeklegoTokensV2
  onChange: (newValue: string) => void
}

function TokenAliasPicker({ currentValue, tokenName, tokens, onChange }: TokenAliasPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [stagedVersion, setStagedVersion] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Re-flatten whenever staged changes are committed so the dropdown reflects new values
  useEffect(() => subscribeToPendingChanges(() => setStagedVersion(v => v + 1)), [])

  // The var name currently aliased, e.g. "--color-neutral-0"
  const currentAlias = currentValue.match(/^var\((--[\w-]+)\)$/)?.[1] ?? null

  // Broad family — used to detect color vs non-color for swatch rendering and
  // to scope primitive candidates for semantic (non-component) tokens.
  const family = getTokenFamily(currentAlias ?? tokenName)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allPrimitives = useMemo(() => flattenPrimitiveTokens(tokens), [tokens, stagedVersion])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allSemantics = useMemo(() => flattenSemanticTokens(tokens), [tokens, stagedVersion])

  // Flat name→value lookup used by resolveDisplayColor — avoids getComputedStyle
  // which reads dark-theme overrides from the editor's <html data-theme="dark">
  const tokenMap = useMemo(() => {
    const m = new Map<string, string>()
    for (const t of allPrimitives) m.set(t.name, t.value)
    for (const t of allSemantics) m.set(t.name, t.value)
    return m
  }, [allPrimitives, allSemantics])

  // ── Candidate pool (before search filter) ───────────────────────────────────
  // Rules:
  //  • Semantic token   → primitives in same family; if colour, same palette family
  //  • Unknown token    → all primitives
  // When the user is actively typing a search query we always search the full
  // pool so they can escape the scope and find any token they want.
  const scopedPool = useMemo(() => {
    // Semantic → primitives
    if (family === 'color') {
      // Scope to the same palette family as the current alias.
      // e.g. "--color-action-primary" currently aliases "--color-brand-500"
      // → show brand palette by default. Falls back to all color primitives.
      const aliasedFamily = getAliasedColorFamily(currentAlias)
      if (aliasedFamily) {
        return allPrimitives.filter(t => t.name.startsWith(`--color-${aliasedFamily}-`))
      }
      return allPrimitives.filter(t => getTokenFamily(t.name) === 'color')
    }
    if (family) {
      return allPrimitives.filter(t => getTokenFamily(t.name) === family)
    }
    return allPrimitives
  }, [allPrimitives, family, currentAlias])

  // Full pool for search escape-hatch
  const fullPool = useMemo(
    () => allPrimitives,
    [allPrimitives]
  )

  const candidates = useMemo(() => {
    if (!search.trim()) return scopedPool
    // Non-empty search: search across the full pool so users can escape the scope
    const q = search.toLowerCase()
    return fullPool.filter(t => t.name.includes(q) || t.value.toLowerCase().includes(q))
  }, [scopedPool, fullPool, search])

  const isColor = family === 'color'

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 30)
  }, [open])

  const handleSelect = (token: { name: string; value: string }) => {
    onChange(`var(${token.name})`)
    setOpen(false)
    setSearch('')
  }

  return (
    <div className="ed-alias-picker" ref={containerRef}>
      {/* Trigger button — shows current alias */}
      <button
        type="button"
        className="ed-alias-picker__trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="ed-alias-picker__trigger-left">
          {isColor && currentAlias && (
            <span
              className="ed-alias-picker__swatch"
              style={{ background: resolveDisplayColor(currentValue, tokenMap) }}
            />
          )}
          <span className="ed-alias-picker__trigger-value">{currentAlias ?? currentValue}</span>
        </span>
        <span className="ed-alias-picker__trigger-icon" aria-hidden="true">
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </span>
      </button>

      {open && (
        <div className="ed-alias-picker__dropdown" role="listbox">
          {/* Search */}
          <div className="ed-alias-picker__search-wrap">
            <input
              ref={searchRef}
              className="ed-alias-picker__search"
              placeholder={
                search.trim()
                  ? `${candidates.length} of ${fullPool.length} tokens`
                  : scopedPool.length < fullPool.length
                    ? `${scopedPool.length} relevant tokens — type to search all`
                    : `Search ${scopedPool.length} tokens…`
              }
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search tokens"
            />
          </div>

          {/* Token list */}
          <div className="ed-alias-picker__list">
            {candidates.length === 0 && (
              <div className="ed-alias-picker__empty">No matching tokens</div>
            )}
            {candidates.map(token => {
              const isSelected = currentAlias === token.name
              const displayVal = isColor ? resolveDisplayColor(token.value, tokenMap) : withPxAnnotation(token.value)
              return (
                <button
                  key={token.name}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`ed-alias-picker__option${isSelected ? ' ed-alias-picker__option--selected' : ''}`}
                  onClick={() => handleSelect(token)}
                >
                  <span className="ed-alias-picker__option-left">
                    {isColor && (
                      <span
                        className="ed-alias-picker__swatch"
                        style={{ background: displayVal }}
                      />
                    )}
                    <span className="ed-alias-picker__option-name">{token.name}</span>
                  </span>
                  <span className="ed-alias-picker__option-value">
                    {isColor ? token.value : displayVal}
                  </span>
                  {isSelected && <span className="ed-alias-picker__check" aria-hidden="true"><Check size={11} /></span>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

interface InspectorTokenDescriptionProps {
  tokenName: string
  tokenMetadata?: TokenMetadata
  stagedChanges: MetadataStagedChanges
  onDescriptionChange: (tokenName: string, description: string) => void
  onDescriptionClear: (tokenName: string) => void
}

function InspectorTokenDescription({
  tokenName,
  tokenMetadata,
  stagedChanges,
  onDescriptionChange,
  onDescriptionClear: _onDescriptionClear,
}: InspectorTokenDescriptionProps) {
  const description = tokenMetadata?.description ?? ''
  const [isOpen, setIsOpen] = useState(false)
  const [tempValue, setTempValue] = useState(description)

  const effectiveDescription = (stagedChanges[tokenName]?.description ?? description) || ''

  const handleSave = () => {
    if (tempValue.trim() !== description) {
      onDescriptionChange(tokenName, tempValue.trim())
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempValue(effectiveDescription)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <div className="ed-inspector__description-preview">
        {effectiveDescription ? (
          <p className="ed-inspector__description-text">{effectiveDescription}</p>
        ) : (
          <div className="ed-inspector__edit-desc-btn" onClick={() => setIsOpen(true)}>
            <span className="ed-inspector__edit-desc-text">Add description</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="ed-inspector__description-editor">
      <EdInput
        value={tempValue}
        onChange={e => setTempValue(e.target.value)}
        placeholder="Describe this token's purpose and usage..."
        className="ed-inspector__description-input"
        autoFocus
      />
      <div className="ed-inspector__description-actions">
        <EdButton variant="primary" size="sm" onClick={handleSave}>
          Save
        </EdButton>
        <EdButton variant="secondary" size="sm" onClick={handleCancel}>
          Cancel
        </EdButton>
      </div>
    </div>
  )
}

export function PinButton({ tokenName }: { tokenName: string }) {
  const pinned = isPinned(tokenName)
  return (
    <button
      type="button"
      onClick={() => togglePin(tokenName)}
      aria-label={pinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
      title={pinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 6px',
        borderRadius: '4px',
        color: pinned ? 'var(--ed-accent)' : 'var(--ed-text-muted)',
        fontSize: '13px',
        lineHeight: 1,
        transition: 'color 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {pinned ? '⦿' : '○'}
    </button>
  )
}

// ─── Typography Style Inspector ───────────────────────────────────────────────

const TYPO_PROPS = [
  { key: 'size',     label: 'Size',        prop: 'font-size' },
  { key: 'weight',   label: 'Weight',      prop: 'font-weight' },
  { key: 'leading',  label: 'Line Height', prop: 'line-height' },
  { key: 'tracking', label: 'Tracking',    prop: 'letter-spacing' },
] as const

/** Extract typography style name from any --typography-{style}-{prop} token */
function extractTypoStyle(tokenName: string): string | null {
  const m = tokenName.match(/^--typography-(.+)-(size|weight|leading|tracking)$/)
  return m ? m[1] : null
}

interface TypoPropertyRowProps {
  tokenName: string
  label: string
  prop: string
  tokens: GeeklegoTokensV2
  onStageEdit: (name: string, value: string) => void
}

function TypoPropertyRow({ tokenName, label, prop, tokens, onStageEdit }: TypoPropertyRowProps) {
  const [localDraft, setLocalDraft] = useState<string | null>(null)
  const [, forceUpdate] = useState(0)

  useEffect(() => subscribeToPendingChanges(() => forceUpdate(n => n + 1)), [])
  useEffect(() => {
    setLocalDraft(null)
    setDraft(tokenName, null)
  }, [tokenName])

  const stagedValue = getStagedValue(tokenName)
  const resolvedValue = resolveTokenValue(tokenName, tokens)
  const committed = stagedValue ?? resolvedValue ?? ''
  const display = localDraft ?? committed
  const isDirty = localDraft !== null && localDraft !== committed
  const isStaged = stagedValue !== undefined

  const remHint = (() => {
    const m = display.trim().match(/^([\d.]+)rem$/)
    return m ? `= ${Math.round(parseFloat(m[1]) * 16)}px` : undefined
  })()

  const updateDraft = (v: string | null) => {
    setLocalDraft(v)
    setDraft(tokenName, v)
  }

  const handleSave = () => {
    if (localDraft !== null) { onStageEdit(tokenName, localDraft); updateDraft(null) }
  }
  const handleCancel = () => updateDraft(null)
  const handleUndo = () => { unstage(tokenName); updateDraft(null) }

  return (
    <div className="ed-typo-prop-row">
      <div className="ed-typo-prop-row__header">
        <span className="ed-typo-prop-row__label">{label}</span>
        <span className="ed-typo-prop-row__css-prop">{prop}</span>
        {isStaged && !isDirty && (
          <span className="ed-typo-prop-row__staged-dot" title="Staged" />
        )}
      </div>
      <div className="ed-typo-prop-row__token-name">{tokenName}</div>
      <div className="ed-typo-prop-row__editor">
        {display.trim().startsWith('var(') ? (
          <TokenAliasPicker
            currentValue={display}
            tokenName={tokenName}
            tokens={tokens}
            onChange={v => updateDraft(v)}
          />
        ) : (
          <div className="ed-inspector__value-input-wrap">
            <input
              value={display}
              onChange={e => updateDraft(e.target.value)}
              className={`ed-input ed-inspector__value-input${remHint ? ' ed-inspector__value-input--has-badge' : ''}`}
              spellCheck={false}
            />
            {remHint && <span className="ed-inspector__px-badge">{remHint}</span>}
          </div>
        )}
      </div>
      {isDirty && (
        <div className="ed-typo-prop-row__actions">
          <EdButton variant="primary" size="sm" onClick={handleSave}>Save</EdButton>
          <EdButton variant="secondary" size="sm" onClick={handleCancel}>Cancel</EdButton>
        </div>
      )}
      {isStaged && !isDirty && (
        <div className="ed-typo-prop-row__actions">
          <EdButton variant="secondary" size="sm" onClick={handleUndo}>Undo</EdButton>
        </div>
      )}
    </div>
  )
}

interface TypographyStyleInspectorProps {
  styleName: string
  tokens: GeeklegoTokensV2
  onStageEdit: (name: string, value: string) => void
}

function TypographyStyleInspector({ styleName, tokens, onStageEdit }: TypographyStyleInspectorProps) {
  return (
    <EdScrollArea className="ed-inspector">
      <div className="ed-inspector__body">
        <div className="ed-inspector__editor-header">
          <h1 className="ed-inspector__editor-title">Editor</h1>
          <p className="ed-inspector__editor-subtitle">Edit your tokens</p>
        </div>

        <div className="ed-inspector__header">
          <h2 className="ed-inspector__name">.text-{styleName}</h2>
          <span className="ed-inspector__breadcrumb">Semantic / Typography</span>
        </div>

        <div className="ed-inspector__section">
          <h3 className="ed-inspector__section-title">Semantic Tokens</h3>
          <div className="ed-typo-props">
            {TYPO_PROPS.map(({ key, label, prop }) => (
              <TypoPropertyRow
                key={key}
                tokenName={`--typography-${styleName}-${key}`}
                label={label}
                prop={prop}
                tokens={tokens}
                onStageEdit={onStageEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </EdScrollArea>
  )
}

interface InspectorProps {
  selectedTokenName: string | null
  tokens: GeeklegoTokensV2
  graph: TokenGraph | null
  usage: TokenUsageMap
  onRescanUsage: () => void
  onStageEdit: (tokenName: string, newValue: string) => void
  onClose?: () => void
}

export function Inspector({
  selectedTokenName,
  tokens,
  graph,
  usage,
  onRescanUsage,
  onStageEdit,
  onClose: _onClose,
}: InspectorProps) {
  const { metadata, stagedChanges: metadataStagedChanges, setMetadataDescription, clearDescription } = useMetadata()
  const [, forceUpdate] = useState(0)
  const [draftValue, setDraftValue] = useState<string | null>(null)

  useEffect(() => {
    return subscribeToPendingChanges(() => forceUpdate(n => n + 1))
  }, [])

  // Reset draft whenever the selected token changes
  useEffect(() => {
    setDraftValue(null)
  }, [selectedTokenName])

  // All useCallbacks must be unconditional — before any early return
  const handleSave = useCallback(() => {
    if (draftValue !== null && selectedTokenName !== null) {
      onStageEdit(selectedTokenName, draftValue)
      setDraftValue(null)
    }
  }, [draftValue, selectedTokenName, onStageEdit])

  const handleCancel = useCallback(() => {
    setDraftValue(null)
  }, [])

  const handleUndo = useCallback(() => {
    if (selectedTokenName !== null) {
      unstage(selectedTokenName)
      setDraftValue(null)
    }
  }, [selectedTokenName])

  if (selectedTokenName === null) {
    return (
      <div className="ed-inspector ed-inspector--empty">
        <div className="ed-inspector__empty-state">
          <EdEmptyState
            title="Select a token to inspect"
            description="Click on any token in the editor to view its details, edit its value, and see where it's used."
          />
        </div>
      </div>
    )
  }

  // Typography semantic tokens → dedicated multi-property inspector
  const typoStyle = extractTypoStyle(selectedTokenName)
  if (typoStyle) {
    return (
      <TypographyStyleInspector
        styleName={typoStyle}
        tokens={tokens}
        onStageEdit={onStageEdit}
      />
    )
  }

  const tokenMetadata = metadata.tokens[selectedTokenName]
  const breadcrumb = deriveBreadcrumb(selectedTokenName)
  const staged = getAllStaged()
  const stagedValue = getStagedValue(selectedTokenName)
  const resolvedValue = resolveTokenValue(selectedTokenName, tokens)

  const aliasChain = walkAliasChain(selectedTokenName, graph, tokens)

  // What's currently persisted (staged or original)
  const committedValue = stagedValue ?? resolvedValue ?? ''
  // What's shown in the editor (draft takes priority)
  const displayValue = draftValue ?? committedValue

  const isDirty = draftValue !== null && draftValue !== committedValue
  const isStaged = stagedValue !== undefined

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftValue(e.target.value)
  }

  const remToPxHint = (() => {
    const val = displayValue.trim()
    const match = val.match(/^([\d.]+)rem$/)
    if (!match) return undefined
    const px = Math.round(parseFloat(match[1]) * 16)
    return `= ${px}px`
  })()

  return (
    <EdScrollArea className="ed-inspector">
      <div className="ed-inspector__body">
        <div className="ed-inspector__editor-header">
          <h1 className="ed-inspector__editor-title">Editor</h1>
          <p className="ed-inspector__editor-subtitle">Edit your tokens</p>
        </div>

        <div className="ed-inspector__header">
          <h2 className="ed-inspector__name">{selectedTokenName}</h2>
          <span className="ed-inspector__breadcrumb">{breadcrumb}</span>
        </div>

        <div className="ed-inspector__section">
          <h3 className="ed-inspector__section-title">Value</h3>
          <div className="ed-inspector__value-editor">
            {isFoundationColorToken(selectedTokenName) ? (
              <EdColorPicker
                value={displayValue || '#000000'}
                onChange={(color) => setDraftValue(color)}
              />
            ) : displayValue.trim().startsWith('var(') ? (
              <TokenAliasPicker
                currentValue={displayValue}
                tokenName={selectedTokenName}
                tokens={tokens}
                onChange={(v) => setDraftValue(v)}
              />
            ) : (
              <div className="ed-inspector__value-input-wrap">
                <input
                  value={displayValue}
                  onChange={handleValueChange}
                  className={`ed-input ed-inspector__value-input${remToPxHint ? ' ed-inspector__value-input--has-badge' : ''}`}
                  spellCheck={false}
                />
                {remToPxHint && (
                  <span className="ed-inspector__px-badge">{remToPxHint}</span>
                )}
              </div>
            )}
          </div>

        </div>

        {aliasChain.length > 1 && (
          <div className="ed-inspector__section">
            <h3 className="ed-inspector__section-title">Alias Chain</h3>
            <div className="ed-inspector__alias-chain">
              {aliasChain.map((link, i) => (
                <div key={link.name}>
                  {i > 0 && <div className="ed-inspector__alias-arrow"><ArrowDown size={12} /></div>}
                  <div className="ed-inspector__alias-item">
                    <span>{link.name}</span>
                    {link.value != null && <span>{withPxAnnotation(link.value)}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <InspectorTokenDescription
          tokenName={selectedTokenName}
          tokenMetadata={tokenMetadata}
          stagedChanges={metadataStagedChanges}
          onDescriptionChange={setMetadataDescription}
          onDescriptionClear={clearDescription}
        />

        <div className="ed-inspector__section">
          <h3 className="ed-inspector__section-title">References</h3>
          {/* Token→token "Used by" only applies to primitives (semantics are the top token
              layer — nothing aliases them). Show it just for primitives; everything gets the
              component-usage block below. */}
          {graph && isPrimitiveToken(selectedTokenName) && (
            <UsedBy
              tokenName={selectedTokenName}
              graph={graph}
              stagedValues={staged}
            />
          )}
          <UsedInComponents
            tokenName={selectedTokenName}
            usage={usage}
            onRescan={onRescanUsage}
          />
        </div>

        <div className="ed-inspector__value-actions">
          <EdButton
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={!isDirty}
          >
            Save
          </EdButton>
          <EdButton
            variant="secondary"
            size="sm"
            onClick={handleCancel}
            disabled={!isDirty}
          >
            Cancel
          </EdButton>
          {isStaged && !isDirty && (
            <EdButton
              variant="secondary"
              size="sm"
              onClick={handleUndo}
            >
              Undo
            </EdButton>
          )}
        </div>
      </div>
    </EdScrollArea>
  )
}
