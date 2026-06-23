interface DiffHunk {
  oldStart: number
  oldLines: number
  newStart: number
  newLines: number
  lines: Array<{ type: 'added' | 'removed' | 'context'; content: string }>
}

interface Props {
  hunks: DiffHunk[]
  originalLineCount?: number
  mergedLineCount?: number
}

export default function DiffView({ hunks, originalLineCount, mergedLineCount }: Props) {
  if (hunks.length === 0) return null

  return (
    <div className="diff-view">
      {(originalLineCount !== undefined || mergedLineCount !== undefined) && (
        <div className="diff-view-stats">
          {originalLineCount !== undefined && (
            <span className="diff-original-count">{originalLineCount} lines before</span>
          )}
          {mergedLineCount !== undefined && (
            <span className="diff-merged-count">{mergedLineCount} lines after</span>
          )}
        </div>
      )}
      {hunks.map((hunk, hunkIndex) => (
        <div key={hunkIndex} className="diff-hunk">
          <div className="diff-hunk-header">
            @@ -{hunk.oldStart},{hunk.oldLines} +{hunk.newStart},{hunk.newLines} @@
          </div>
          <div className="diff-lines" style={{ font: '12px/1.6 var(--ed-font-mono), monospace' }}>
            {hunk.lines.map((line, lineIndex) => (
              <div
                key={`${hunkIndex}-${lineIndex}`}
                className={`diff-line diff-${line.type}`}
              >
                <span className="diff-gutter">
                  {line.type === 'removed' ? (
                    <span className="diff-old-line">{hunk.oldStart + lineIndex}</span>
                  ) : line.type === 'added' ? (
                    <span className="diff-new-line">{hunk.newStart + lineIndex}</span>
                  ) : (
                    <span className="diff-context-line">
                      {hunk.oldStart + lineIndex - hunk.lines.filter(
                        (l, i) => l.type === 'added' && i < lineIndex
                      ).length}
                    </span>
                  )}
                </span>
                <span className="diff-indicator">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </span>
                <span className="diff-content">{line.content}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
