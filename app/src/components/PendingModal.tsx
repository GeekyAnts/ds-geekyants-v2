import { useEffect, useCallback, useMemo } from 'react'
import { X, ArrowRight, RotateCcw } from 'lucide-react'
import { getAllStaged, unstage, discardAll, subscribeToPendingChanges, getStagedNewTokens, unstageNewToken } from '../state/staging'
import { withPxAnnotation } from '../utils/colorUtils'
import type { GeeklegoTokens, ComponentTokenGroup } from '../types'
import { useState } from 'react'

function buildOriginalMap(
  tokens: GeeklegoTokens,
  componentGroups: ComponentTokenGroup[]
): Map<string, string> {
  const map = new Map<string, string>()

  // Flatten all component tokens
  for (const group of componentGroups) {
    for (const section of group.sections) {
      for (const token of section.tokens) {
        map.set(token.name, token.value)
      }
    }
  }

  // Flatten primitives
  const PRIMITIVE_PREFIX: Record<string, string> = {
    colors: 'color', fontFamily: 'font-family', fontSize: 'font-size',
    fontWeight: 'font-weight', lineHeight: 'line-height', letterSpacing: 'letter-spacing',
    spacing: 'spacing', radius: 'radius', borderWidth: 'border-width',
    opacity: 'opacity', zIndex: 'z-index', duration: 'duration',
    easing: 'ease', sizeScale: 'size', iconSize: 'icon-size',
  }
  const prims = tokens.primitives as unknown as Record<string, unknown>
  for (const [cat, prefix] of Object.entries(PRIMITIVE_PREFIX)) {
    const data = prims[cat]
    if (!data || typeof data !== 'object') continue
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      if (typeof v === 'string') {
        map.set(`--${prefix}-${k}`, v)
      } else if (v && typeof v === 'object') {
        for (const [k2, v2] of Object.entries(v as Record<string, string>)) {
          map.set(`--${prefix}-${k}-${k2}`, v2)
        }
      }
    }
  }

  // Flatten semantics
  const SEMANTIC_PREFIX: Record<string, string> = {
    bg: 'color-bg', surface: 'color-surface', text: 'color-text',
    border: 'color-border', action: 'color-action', status: 'color-status',
    state: 'color-state', dataSeries: 'color-data-series', shadows: 'shadow',
    spacingComponent: 'spacing-component', spacingLayout: 'spacing-layout',
    sizeComponent: 'size-component', radiusComponent: 'radius-component',
    layer: 'layer', borders: 'border',
  }
  const sems = tokens.semantics?.light as unknown as Record<string, unknown> | undefined
  if (sems) {
    for (const [cat, prefix] of Object.entries(SEMANTIC_PREFIX)) {
      const data = sems[cat]
      if (!data || typeof data !== 'object') continue
      for (const [k, v] of Object.entries(data as Record<string, string>)) {
        map.set(`--${prefix}-${k}`, v)
      }
    }
  }

  return map
}

interface PendingModalProps {
  open: boolean
  onClose: () => void
  tokens: GeeklegoTokens
  componentGroups: ComponentTokenGroup[]
}

export function PendingModal({ open, onClose, tokens, componentGroups }: PendingModalProps) {
  const [pendingVersion, setPendingVersion] = useState(0)

  // Re-render when staging changes
  useEffect(() => {
    const unsub = subscribeToPendingChanges(() => setPendingVersion(n => n + 1))
    return unsub
  }, [])

  const originalMap = useMemo(
    () => buildOriginalMap(tokens, componentGroups),
    [tokens, componentGroups]
  )

  const changes = useMemo(() => {
    const staged = getAllStaged()
    const edits = [...staged.entries()].map(([name, newVal]) => ({
      name,
      original: originalMap.get(name) ?? '—',
      newVal,
      isNew: false,
    }))
    const newTokens = [...getStagedNewTokens().values()].map(t => ({
      name: t.cssName,
      original: '—',
      newVal: t.value,
      isNew: true,
    }))
    return [...newTokens, ...edits]
  }, [originalMap, pendingVersion])

  const handleUndoOne = useCallback((name: string, isNew: boolean) => {
    if (isNew) unstageNewToken(name)
    else unstage(name)
  }, [])

  const handleUndoAll = useCallback(() => {
    discardAll()
    onClose()
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="ed-pending-modal__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div
        className="ed-pending-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Pending token changes"
      >
        {/* Header */}
        <div className="ed-pending-modal__header">
          <div className="ed-pending-modal__title-row">
            <span className="ed-pending-modal__title">Pending Changes</span>
            <span className="ed-pending-modal__count">{changes.length}</span>
          </div>
          <button
            type="button"
            className="ed-pending-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="ed-pending-modal__body">
          {changes.length === 0 ? (
            <div className="ed-pending-modal__empty">No pending changes.</div>
          ) : (
            <div className="ed-pending-modal__list">
              {changes.map(({ name, original, newVal, isNew }) => (
                <div key={name} className="ed-pending-modal__item">
                  <div className="ed-pending-modal__item-info">
                    <span className="ed-pending-modal__token-name">
                      {isNew && (
                        <span className="ed-pending-modal__new-badge">NEW</span>
                      )}
                      {name}
                    </span>
                    <div className="ed-pending-modal__value-row">
                      <span className="ed-pending-modal__old">{withPxAnnotation(original)}</span>
                      <span className="ed-pending-modal__arrow"><ArrowRight size={11} aria-hidden="true" /></span>
                      <span className="ed-pending-modal__new">{withPxAnnotation(newVal)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ed-pending-modal__undo-btn"
                    onClick={() => handleUndoOne(name, isNew)}
                    aria-label={`Undo change to ${name}`}
                  >
                    <RotateCcw size={11} aria-hidden="true" /> Undo
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {changes.length > 0 && (
          <div className="ed-pending-modal__footer">
            <button
              type="button"
              className="ed-pending-modal__undo-all"
              onClick={handleUndoAll}
            >
              Undo all changes
            </button>
          </div>
        )}
      </div>
    </>
  )
}
