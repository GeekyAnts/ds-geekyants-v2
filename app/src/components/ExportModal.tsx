import { useState, useEffect } from 'react'
import { Check, ArrowDown, Download, Trash2, RotateCcw } from 'lucide-react'
import { createSnapshot, getAllSnapshots, deleteSnapshot, restoreSnapshot, downloadSnapshotAsJSON, type TokenSnapshot } from '../utils/snapshotManager'
import { getAllStaged, stage, unstage, discardAll, hasPendingChanges, getPendingCount, getStagedNewTokens } from '../state/staging'
import { generateOriginalCss, generateMergedCss, getDiffHunks } from '../utils/exportFormatter'
import type { ComponentTokenGroup } from '../types'
import DiffView from './DiffView'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: () => Promise<void>
  onRestoreDefault: () => Promise<void>
  tokens: any
  componentGroups?: ComponentTokenGroup[]
  validationSummary?: { blocks: any[]; warnings: any[]; notices: any[] }
  hasBlockers: boolean
}

type ModalStep = 'review' | 'validation' | 'diff' | 'export'

export default function ExportModal({ isOpen, onClose, onExport, onRestoreDefault, tokens, componentGroups, validationSummary, hasBlockers }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState<ModalStep>('review')
  const [isExporting, setIsExporting] = useState(false)
  const [hasExported, setHasExported] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [hasRestored, setHasRestored] = useState(false)
  const [restoreConfirm, setRestoreConfirm] = useState(false)
  const [diffHunks, setDiffHunks] = useState<any[]>([])
  const [selectedSnapshot, setSelectedSnapshot] = useState<TokenSnapshot | null>(null)
  const [allSnapshots, setAllSnapshots] = useState<TokenSnapshot[]>([])

  const stagedEdits = getAllStaged()
  const originalCss = hasPendingChanges() ? generateOriginalCss(tokens, componentGroups) : ''
  const mergedCss = hasPendingChanges() ? generateMergedCss(tokens, stagedEdits, getStagedNewTokens(), componentGroups) : ''

  useEffect(() => {
    if (isOpen && currentStep === 'diff') {
      setDiffHunks(getDiffHunks(originalCss, mergedCss))
    }
  }, [isOpen, currentStep, originalCss, mergedCss])

  useEffect(() => {
    if (isOpen) {
      setAllSnapshots(getAllSnapshots())
      setHasExported(false)
      setHasRestored(false)
      setRestoreConfirm(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const pendingCount = getPendingCount()
  const hasValidationIssues = hasBlockers ||
    (validationSummary && (validationSummary.warnings.length > 0 || validationSummary.notices.length > 0))

  const stepIndex = ['review', 'validation', 'diff', 'export'].indexOf(currentStep)

  function handleRestoreSnapshot(snapshot: TokenSnapshot) {
    setSelectedSnapshot(snapshot)
    const restored = restoreSnapshot(snapshot.id)
    if (restored) {
      for (const [tokenName, value] of Object.entries(restored.stagedEdits)) {
        stage(tokenName, value)
      }
    }
  }

  function handleDownloadSnapshot(snapshot: TokenSnapshot) {
    downloadSnapshotAsJSON(snapshot)
  }

  function handleDeleteSnapshot(id: string) {
    deleteSnapshot(id)
    setAllSnapshots(getAllSnapshots())
  }

  function handleNext() {
    if (currentStep === 'review') setCurrentStep('validation')
    else if (currentStep === 'validation') setCurrentStep('diff')
    else if (currentStep === 'diff') setCurrentStep('export')
  }

  function handleBack() {
    if (currentStep === 'validation') setCurrentStep('review')
    else if (currentStep === 'diff') setCurrentStep('validation')
    else if (currentStep === 'export') setCurrentStep('diff')
  }

  function handleCancel() {
    setCurrentStep('review')
    setIsExporting(false)
    setHasExported(false)
    setIsRestoring(false)
    setHasRestored(false)
    setRestoreConfirm(false)
    setSelectedSnapshot(null)
    onClose()
  }

  async function handleRestoreDefault() {
    if (!restoreConfirm) {
      setRestoreConfirm(true)
      return
    }
    setIsRestoring(true)
    try {
      await onRestoreDefault()
      setHasRestored(true)
      setRestoreConfirm(false)
    } catch {
      // error logged upstream
    } finally {
      setIsRestoring(false)
    }
  }

  async function handleExport() {
    setIsExporting(true)
    try {
      await onExport()
      setHasExported(true)
    } catch {
      // error already logged in handleExport in EditorShell
    } finally {
      setIsExporting(false)
    }
  }

  function createNewSnapshot() {
    const label = `Snapshot ${new Date().toLocaleString()}`
    createSnapshot(label, getAllStaged())
    setAllSnapshots(getAllSnapshots())
  }

  return (
    <div className="ed-export-modal-overlay">
      <div className="ed-export-modal-dialog">
        <div className="ed-export-modal-header">
          <h3>Export Changes</h3>
          <button onClick={handleCancel} className="ed-export-modal-close" aria-label="Close export modal">×</button>
        </div>

        <div className="ed-export-modal-stepper">
          {(['review', 'validation', 'diff', 'export'] as const).map((step, index) => (
            <div key={step} className="ed-export-step">
              <div
                className={`ed-export-step-indicator ${index <= stepIndex ? 'active' : ''} ${index === stepIndex ? 'current' : ''}`}
                onClick={() => setCurrentStep(step)}
              >
                {index + 1}
              </div>
              <span className="ed-export-step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
              {index < 3 && <div className="ed-export-step-connector" />}
            </div>
          ))}
        </div>

        <div className="ed-export-modal-content">
          {currentStep === 'review' && (
            <div className="ed-export-review">
              {pendingCount === 0 ? (
                <div className="ed-export-empty">
                  <div className="ed-export-empty-icon"><Check size={20} aria-hidden="true" /></div>
                  <p>No pending changes to export.</p>
                </div>
              ) : (
                <>
                  <div className="ed-export-pending-header">
                    <h4>{pendingCount} pending change{pendingCount > 1 ? 's' : ''}</h4>
                    <button className="gl-btn-ghost ed-export-reset-all" onClick={discardAll}>
                      Reset All
                    </button>
                  </div>
                  <div className="ed-export-pending-list">
                    {Array.from(stagedEdits.keys()).map((tokenName) => (
                      <div key={tokenName} className="ed-export-pending-item">
                        <span className="ed-export-token-name">{tokenName}</span>
                        <div className="ed-export-change-preview">
                          <span className="ed-export-old-value">→ {stagedEdits.get(tokenName) || '...'}</span>
                        </div>
                        <button className="ed-export-reset-btn" onClick={() => unstage(tokenName)}>
                          Unstage
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 'validation' && (
            <div className="ed-export-validation">
              <h4>Validation</h4>
              {hasBlockers ? (
                <div className="ed-export-blockers">
                  <div className="ed-export-severity-header">
                    <span className="ed-export-severity-badge ed-export-blocker">Blockers</span>
                  </div>
                  {validationSummary?.blocks.map((block, i) => (
                    <div key={`block-${i}`} className="ed-export-blocker-item">
                      {block.tokenName}: {block.message}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ed-export-validation-pass">
                  <div className="ed-export-check-icon"><Check size={20} aria-hidden="true" /></div>
                  <p>No blockers found.</p>
                </div>
              )}
              {validationSummary && validationSummary.warnings.length > 0 && (
                <div className="ed-export-warnings">
                  <div className="ed-export-severity-header">
                    <span className="ed-export-severity-badge ed-export-warning">Warnings</span>
                  </div>
                  {validationSummary.warnings.map((warning, i) => (
                    <div key={`warning-${i}`} className="ed-export-warning-item">
                      {warning.tokenName}: {warning.message}
                    </div>
                  ))}
                </div>
              )}
              {validationSummary && validationSummary.notices.length > 0 && (
                <div className="ed-export-notices">
                  <div className="ed-export-severity-header">
                    <span className="ed-export-severity-badge ed-export-notice">Notices</span>
                  </div>
                  {validationSummary.notices.map((notice, i) => (
                    <div key={`notice-${i}`} className="ed-export-notice-item">
                      {notice.tokenName}: {notice.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 'diff' && (
            <div className="ed-export-diff">
              <h4>Preview Merged CSS</h4>
              {diffHunks.length === 0 ? (
                <div className="ed-export-empty">
                  <div className="ed-export-empty-icon"><Check size={20} aria-hidden="true" /></div>
                  <p>No changes to show in diff.</p>
                </div>
              ) : (
                <DiffView
                  hunks={diffHunks}
                  originalLineCount={originalCss.split('\n').length}
                  mergedLineCount={mergedCss.split('\n').length}
                />
              )}
            </div>
          )}

          {currentStep === 'export' && (
            <div className="ed-export-final">
              <h4>Export</h4>
              {hasExported ? (
                <div className="ed-export-success">
                  <div className="ed-export-check-icon"><Check size={20} aria-hidden="true" /></div>
                  <p>Exported successfully! The CSS has been updated.</p>
                </div>
              ) : (
                <div className="ed-export-actions-panel">
                  <div className="ed-export-action-item">
                    <button className="ed-export-btn-primary" onClick={handleExport} disabled={hasBlockers || isExporting || isRestoring}>
                      {isExporting ? 'Exporting...' : 'Export to geeklego.css'}
                    </button>
                  </div>
                  {!hasBlockers && (
                    <div className="ed-export-action-item">
                      <button className="ed-export-btn-secondary" onClick={createNewSnapshot} disabled={isExporting || isRestoring}>
                        Save as Snapshot
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="ed-export-restore-section">
                <div className="ed-export-restore-header">
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Restore to Default</span>
                </div>
                {hasRestored ? (
                  <div className="ed-export-success ed-export-restore-success">
                    <div className="ed-export-check-icon"><Check size={16} aria-hidden="true" /></div>
                    <p>Restored to default successfully.</p>
                  </div>
                ) : (
                  <>
                    <p className="ed-export-restore-description">
                      Reset <code>geeklego.css</code> back to <code>geeklego.default.css</code>. All custom edits will be lost.
                    </p>
                    {restoreConfirm ? (
                      <div className="ed-export-restore-confirm">
                        <span className="ed-export-restore-confirm-label">Are you sure? This cannot be undone.</span>
                        <div className="ed-export-restore-confirm-actions">
                          <button
                            className="ed-export-btn-danger"
                            onClick={handleRestoreDefault}
                            disabled={isRestoring}
                          >
                            {isRestoring ? 'Restoring...' : 'Yes, restore'}
                          </button>
                          <button
                            className="ed-export-btn-back"
                            onClick={() => setRestoreConfirm(false)}
                            disabled={isRestoring}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="ed-export-btn-restore"
                        onClick={handleRestoreDefault}
                        disabled={isExporting || isRestoring}
                      >
                        Restore to Default
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="ed-export-snapshots">
                <h5>Snapshots ({allSnapshots.length})</h5>
                {allSnapshots.length === 0 ? (
                  <p className="ed-export-snapshots-empty">No snapshots saved.</p>
                ) : (
                  <div className="ed-export-snapshots-list">
                    {allSnapshots.map((snapshot) => (
                      <div key={snapshot.id} className="ed-export-snapshot-item" onClick={() => handleRestoreSnapshot(snapshot)}>
                        <span className="ed-export-snapshot-label">{snapshot.label}</span>
                        <div className="ed-export-snapshot-meta">
                          <span>{new Date(snapshot.timestamp).toLocaleDateString()}</span>
                          <span>{snapshot.tokenCount} tokens</span>
                        </div>
                        <div className="ed-export-snapshot-actions">
                          <button onClick={(e) => { e.stopPropagation(); handleDownloadSnapshot(snapshot) }} title="Download as JSON">
                            <Download size={13} aria-hidden="true" />
</button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteSnapshot(snapshot.id) }} title="Delete snapshot">
                            <Trash2 size={13} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="ed-export-modal-footer">
          {currentStep !== 'review' && (
            <button className="ed-export-btn-back" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep === 'review' && pendingCount > 0 && (
            <button className="ed-export-btn-next" onClick={handleNext}>
              Continue
            </button>
          )}
          {currentStep !== 'review' && currentStep !== 'export' && (
            <button className="ed-export-btn-next" onClick={handleNext}>
              {currentStep === 'diff' ? 'Review & Export' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
