import { useState, useMemo } from 'react'
import { X, CheckCircle } from 'lucide-react'
import type { ValidatorResult } from '../validators/types'
import { EdButton, EdScrollArea, EdChip } from '../editor-ds/primitives'

interface HealthPanelProps {
  visible: boolean
  onToggle: () => void
  blocks: ValidatorResult[]
  warnings: ValidatorResult[]
  notices: ValidatorResult[]
  metadataCoverage?: number
}

export function HealthPanel({
  visible,
  onToggle,
  blocks,
  warnings,
  notices,
  metadataCoverage = 0,
}: HealthPanelProps) {
  const [expandedGroup, setExpandedGroup] = useState<'block' | 'warn' | 'notice' | null>('block')

  const totalIssues = useMemo(() => {
    return blocks.length + warnings.length + notices.length
  }, [blocks.length, warnings.length, notices.length])

  const toggleGroup = (group: 'block' | 'warn' | 'notice' | null) => {
    setExpandedGroup(expandedGroup === group ? null : group)
  }

  const handleFixIssue = (issue: ValidatorResult) => {
    console.log(`Fix issue: ${issue.tokenName} - ${issue.message}`)
  }

  if (!visible) return null

  return (
    <div
      className="ed-health-panel"
      role="dialog"
      aria-label="Health panel"
      aria-modal="true"
    >
      <div className="ed-health-panel__header">
        <h2 className="ed-health-panel__title">Health Check</h2>
        <button
          type="button"
          className="ed-health-panel__close-btn"
          onClick={onToggle}
          aria-label="Close health panel"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="ed-health-panel__summary">
        <div className={expandedGroup === 'block' ? 'ed-health-panel__summary-item ed-health-panel__summary-item--expanded' : 'ed-health-panel__summary-item'}>
          <button
            type="button"
            className="ed-health-panel__summary-toggle"
            onClick={() => toggleGroup('block')}
            aria-expanded={expandedGroup === 'block'}
          >
            <EdChip variant="danger">
              {blocks.length}
            </EdChip>
            <span>Blockers</span>
          </button>
          {expandedGroup === 'block' && (
            <div className="ed-health-panel__summary-count">
              {blocks.length > 0 && <span>Prevents changes from being exported</span>}
            </div>
          )}
        </div>

        <div className={expandedGroup === 'warn' ? 'ed-health-panel__summary-item ed-health-panel__summary-item--expanded' : 'ed-health-panel__summary-item'}>
          <button
            type="button"
            className="ed-health-panel__summary-toggle"
            onClick={() => toggleGroup('warn')}
            aria-expanded={expandedGroup === 'warn'}
          >
            <EdChip variant="warning">
              {warnings.length}
            </EdChip>
            <span>Warnings</span>
          </button>
          {expandedGroup === 'warn' && (
            <div className="ed-health-panel__summary-count">
              {warnings.length > 0 && <span>Should be reviewed before export</span>}
            </div>
          )}
        </div>

        <div className={expandedGroup === 'notice' ? 'ed-health-panel__summary-item ed-health-panel__summary-item--expanded' : 'ed-health-panel__summary-item'}>
          <button
            type="button"
            className="ed-health-panel__summary-toggle"
            onClick={() => toggleGroup('notice')}
            aria-expanded={expandedGroup === 'notice'}
          >
            <EdChip variant="default">
              {notices.length}
            </EdChip>
            <span>Notices</span>
          </button>
          {expandedGroup === 'notice' && (
            <div className="ed-health-panel__summary-count">
              {notices.length > 0 && <span>Informational messages</span>}
            </div>
          )}
        </div>
      </div>

      <div className="ed-health-panel__issues">
        {blocks.length > 0 && (
          <div className="ed-health-panel__issues-section">
            <h3 className="ed-health-panel__issues-title" style={{ color: '#f87171' }}>
              Blockers ({blocks.length})
            </h3>
            <EdScrollArea orientation="vertical" className="ed-health-panel__scroll">
              {blocks.map((issue, index) => (
                <div key={`block-${index}`} className="ed-health-panel__issue-item">
                  <div className="ed-health-panel__issue-content">
                    <strong className="ed-health-panel__issue-token">{issue.tokenName}</strong>
                    <span className="ed-health-panel__issue-message">{issue.message}</span>
                    {issue.details && (
                      <span className="ed-health-panel__issue-details">{issue.details}</span>
                    )}
                  </div>
                  <EdButton variant="secondary" size="sm" onClick={() => handleFixIssue(issue)}>
                    Fix
                  </EdButton>
                </div>
              ))}
            </EdScrollArea>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="ed-health-panel__issues-section">
            <h3 className="ed-health-panel__issues-title" style={{ color: '#fbbf24' }}>
              Warnings ({warnings.length})
            </h3>
            <EdScrollArea orientation="vertical" className="ed-health-panel__scroll">
              {warnings.map((issue, index) => (
                <div key={`warn-${index}`} className="ed-health-panel__issue-item">
                  <div className="ed-health-panel__issue-content">
                    <strong className="ed-health-panel__issue-token">{issue.tokenName}</strong>
                    <span className="ed-health-panel__issue-message">{issue.message}</span>
                    {issue.details && (
                      <span className="ed-health-panel__issue-details">{issue.details}</span>
                    )}
                  </div>
                  <EdButton variant="secondary" size="sm" onClick={() => handleFixIssue(issue)}>
                    Fix
                  </EdButton>
                </div>
              ))}
            </EdScrollArea>
          </div>
        )}

        {notices.length > 0 && (
          <div className="ed-health-panel__issues-section">
            <h3 className="ed-health-panel__issues-title" style={{ color: '#a3a3a3' }}>
              Notices ({notices.length})
            </h3>
            <EdScrollArea orientation="vertical" className="ed-health-panel__scroll">
              {notices.map((issue, index) => (
                <div key={`notice-${index}`} className="ed-health-panel__issue-item">
                  <div className="ed-health-panel__issue-content">
                    <strong className="ed-health-panel__issue-token">{issue.tokenName}</strong>
                    <span className="ed-health-panel__issue-message">{issue.message}</span>
                    {issue.details && (
                      <span className="ed-health-panel__issue-details">{issue.details}</span>
                    )}
                  </div>
                  <EdButton variant="secondary" size="sm" onClick={() => handleFixIssue(issue)}>
                    Fix
                  </EdButton>
                </div>
              ))}
            </EdScrollArea>
          </div>
        )}

        {totalIssues === 0 && (
          <div className="ed-health-panel__empty">
            <p className="ed-health-panel__empty-message"><CheckCircle size={14} aria-hidden="true" /> No issues found</p>
          </div>
        )}
      </div>

      <div className="ed-health-panel__footer">
        <div className="ed-health-panel__metadata-coverage">
          <span className="ed-health-panel__metadata-label">Metadata coverage:</span>
          <div className="ed-health-panel__coverage-bar">
            <div 
              className="ed-health-panel__coverage-fill" 
              style={{ width: `${metadataCoverage}%` }}
            />
          </div>
          <span className="ed-health-panel__metadata-value">{metadataCoverage}%</span>
        </div>
        <EdButton variant="primary" size="md" onClick={onToggle}>
          Close
        </EdButton>
      </div>
    </div>
  )
}
