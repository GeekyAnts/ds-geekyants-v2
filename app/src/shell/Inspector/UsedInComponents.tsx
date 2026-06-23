import { useMemo } from 'react'
import { RefreshCw } from 'lucide-react'
import type { TokenUsageMap, UsageHit } from '../../types'
import './UsedInComponents.css'

interface UsedInComponentsProps {
  tokenName: string
  usage: TokenUsageMap
  onRescan: () => void
}

/**
 * "Used in components" — the truth-to-source half of the References panel. Lists the real
 * component source files (and lines) where the selected token is used, from the on-disk scan
 * (scripts/scan-token-usage.ts). Complements <UsedBy> (token→token aliasing from the graph).
 *  - kind 'var'     → a direct var(--token) reference (high confidence).
 *  - kind 'utility' → a Tailwind utility class inferred to map to the token.
 */
export function UsedInComponents({ tokenName, usage, onRescan }: UsedInComponentsProps) {
  const grouped = useMemo(() => {
    const hits = usage[tokenName] ?? []
    const byFile = new Map<string, UsageHit[]>()
    for (const hit of hits) {
      const list = byFile.get(hit.file)
      if (list) list.push(hit)
      else byFile.set(hit.file, [hit])
    }
    // Sort hits within each file by line; sort files alphabetically.
    const files = [...byFile.entries()]
      .map(([file, fileHits]) => ({
        file,
        hits: [...fileHits].sort((a, b) => a.line - b.line),
      }))
      .sort((a, b) => a.file.localeCompare(b.file))
    return { total: hits.length, files }
  }, [usage, tokenName])

  return (
    <div className="ed-used-in">
      <div className="ed-used-in__header">
        <h4 className="ed-used-in__title">Used in components</h4>
        <button
          type="button"
          className="ed-used-in__rescan-btn"
          onClick={onRescan}
          title="Re-scan component source files for token usage"
        >
          <RefreshCw size={12} aria-hidden="true" />
          Rescan
        </button>
      </div>

      {grouped.total === 0 ? (
        <p className="ed-used-in__empty">Not used in any component files.</p>
      ) : (
        <>
          <p className="ed-used-in__summary">
            Used in <strong>{grouped.total}</strong> {grouped.total === 1 ? 'place' : 'places'} across{' '}
            <strong>{grouped.files.length}</strong> {grouped.files.length === 1 ? 'file' : 'files'}:
          </p>
          <ul className="ed-used-in__files">
            {grouped.files.map(({ file, hits }) => (
              <li key={file} className="ed-used-in__file">
                <div className="ed-used-in__file-name">{file}</div>
                <ul className="ed-used-in__hits">
                  {hits.map((hit) => (
                    <li key={`${hit.line}-${hit.kind}`} className="ed-used-in__hit">
                      <span className="ed-used-in__line">L{hit.line}</span>
                      <span
                        className={`ed-used-in__kind ed-used-in__kind--${hit.kind}`}
                        title={hit.kind === 'var' ? 'Direct var(--token) reference' : 'Tailwind utility class'}
                      >
                        {hit.kind === 'var' ? 'var' : 'class'}
                      </span>
                      <code className="ed-used-in__snippet">{hit.snippet}</code>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
