import { useState, useCallback } from 'react'
import { EdButton } from '../editor-ds/primitives/EdButton'
import { EdInput } from '../editor-ds/primitives/EdInput'
import { EdSelect } from '../editor-ds/primitives/EdSelect'
import './BulkOpsBar.css'

interface BulkOpsBarProps {
  selectedCount: number
  onBatchTransform: (type: 'multiply' | 'offset' | 'round', value: string) => void
  onBulkReAlias: (targetAlias: string) => void
  onBulkReset: () => void
  onClearSelection: () => void
}

const TRANSFORM_OPTIONS = [
  { value: 'multiply', label: 'Multiply' },
  { value: 'offset', label: 'Offset' },
  { value: 'round', label: 'Round' },
]

export function BulkOpsBar({
  selectedCount,
  onBatchTransform,
  onBulkReAlias,
  onBulkReset,
  onClearSelection,
}: BulkOpsBarProps) {
  const [showTransform, setShowTransform] = useState(false)
  const [showReAlias, setShowReAlias] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [transformType, setTransformType] = useState<'multiply' | 'offset' | 'round'>('multiply')
  const [transformValue, setTransformValue] = useState('')
  const [aliasValue, setAliasValue] = useState('')

  const disabled = selectedCount === 0

  const closeAll = useCallback(() => {
    setShowTransform(false)
    setShowReAlias(false)
    setShowConfirmReset(false)
  }, [])

  const handleApplyTransform = useCallback(() => {
    if (!transformValue) return
    onBatchTransform(transformType, transformValue)
    setShowTransform(false)
    setTransformValue('')
  }, [transformType, transformValue, onBatchTransform])

  const handleApplyReAlias = useCallback(() => {
    if (!aliasValue) return
    onBulkReAlias(aliasValue)
    setShowReAlias(false)
    setAliasValue('')
  }, [aliasValue, onBulkReAlias])

  const handleResetConfirm = useCallback(() => {
    onBulkReset()
    setShowConfirmReset(false)
  }, [onBulkReset])

  const handleClear = useCallback(() => {
    onClearSelection()
    closeAll()
  }, [onClearSelection, closeAll])

  const visible = selectedCount > 0

  return (
    <div className={`ed-bulk-ops-bar${visible ? ' ed-bulk-ops-bar--visible' : ''}`} aria-hidden={!visible}>
      <div className="ed-bulk-ops-bar-inner">
        <div className="ed-bulk-ops-bar-left">
          <span className="ed-bulk-ops-count">
            {selectedCount} selected
          </span>
        </div>

        <div className="ed-bulk-ops-bar-right">
          <div className="ed-bulk-ops-action">
            <EdButton
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={() => {
                setShowTransform(prev => !prev)
                setShowReAlias(false)
                setShowConfirmReset(false)
              }}
            >
              Batch transform
            </EdButton>
            {showTransform && (
              <div className="ed-bulk-ops-popover">
                <div className="ed-bulk-ops-popover-row">
                  <EdSelect
                    options={TRANSFORM_OPTIONS}
                    value={transformType}
                    onChange={e => setTransformType(e.target.value as 'multiply' | 'offset' | 'round')}
                  />
                </div>
                <div className="ed-bulk-ops-popover-row">
                  <EdInput
                    placeholder="Value"
                    value={transformValue}
                    onChange={e => setTransformValue(e.target.value)}
                  />
                </div>
                <div className="ed-bulk-ops-popover-row">
                  <EdButton variant="primary" size="sm" onClick={handleApplyTransform}>
                    Apply
                  </EdButton>
                </div>
              </div>
            )}
          </div>

          <div className="ed-bulk-ops-action">
            <EdButton
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={() => {
                setShowReAlias(prev => !prev)
                setShowTransform(false)
                setShowConfirmReset(false)
              }}
            >
              Re-alias
            </EdButton>
            {showReAlias && (
              <div className="ed-bulk-ops-popover">
                <EdInput
                  placeholder="Target alias"
                  value={aliasValue}
                  onChange={e => setAliasValue(e.target.value)}
                />
                <EdButton variant="primary" size="sm" onClick={handleApplyReAlias}>
                  Apply
                </EdButton>
              </div>
            )}
          </div>

          <div className="ed-bulk-ops-action">
            <EdButton
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={() => {
                setShowConfirmReset(prev => !prev)
                setShowTransform(false)
                setShowReAlias(false)
              }}
            >
              Reset to default
            </EdButton>
            {showConfirmReset && (
              <div className="ed-bulk-ops-confirm">
                <span className="ed-bulk-ops-confirm-text">
                  Reset {selectedCount} token{selectedCount > 1 ? 's' : ''} to default?
                </span>
                <div className="ed-bulk-ops-confirm-actions">
                  <EdButton variant="ghost" size="sm" onClick={() => setShowConfirmReset(false)}>
                    Cancel
                  </EdButton>
                  <EdButton variant="danger" size="sm" onClick={handleResetConfirm}>
                    Reset
                  </EdButton>
                </div>
              </div>
            )}
          </div>

          <EdButton
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={handleClear}
          >
            Clear selection
          </EdButton>
        </div>
      </div>
    </div>
  )
}
