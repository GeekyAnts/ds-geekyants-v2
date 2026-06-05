import { useMemo } from 'react'
import type { TokenGraph } from '../../graph/build'
import { EdChip } from '../../editor-ds/primitives'

interface UsedByProps {
  tokenName: string
  graph: TokenGraph | null
  stagedValues?: Map<string, string>
  onShowDependencyTree?: (tokenName: string) => void
}

export function UsedBy({ tokenName, graph, stagedValues, onShowDependencyTree }: UsedByProps) {
  const usedByInfo = useMemo(() => {
    if (!graph) return null

    const dependents = graph.nodes.get(tokenName)
    if (!dependents || dependents.dependents.length === 0) {
      return { count: 0, list: [], categories: { semantic: 0, component: 0 } }
    }

    const components = dependents.dependents.filter((dep: string) =>
      dep.startsWith('--') && !dep.startsWith('--color-') &&
      !dep.startsWith('--spacing-') && !dep.startsWith('--radius-') &&
      !dep.startsWith('--font-') && !dep.startsWith('--border-')
    )

    const sematics = dependents.dependents.filter((dep: string) =>
      dep.startsWith('--color-') || dep.startsWith('--spacing-') || dep.startsWith('--radius-')
    )

    const categoryCounts = {
      semantic: sematics.length,
      component: components.length,
    }

    const allList = [...dependents.dependents].slice(0, 5)

    return {
      count: dependents.dependents.length,
      list: allList,
      categories: categoryCounts,
    }
  }, [graph, tokenName])

  if (!usedByInfo) {
    return null
  }

  if (usedByInfo.count === 0) {
    return (
      <div className="ed-used-by">
        <p className="ed-used-by__empty">
          This token is not used by any other tokens.
        </p>
      </div>
    )
  }

  return (
    <div className="ed-used-by">
      <div className="ed-used-by__header">
        <h4 className="ed-used-by__title">Used By</h4>
        {onShowDependencyTree && (
          <button
            type="button"
            className="ed-used-by__view-tree-btn"
            onClick={() => onShowDependencyTree(tokenName)}
          >
            View dependency tree
          </button>
        )}
      </div>

      <div className="ed-used-by__summary">
        <p className="ed-used-by__summary-text">
          Used by <strong>{usedByInfo.count}</strong> {usedByInfo.count === 1 ? 'token' : 'tokens'}:
        </p>
        <div className="ed-used-by__tokens">
          {usedByInfo.list.map(token => (
            <EdChip key={token} variant="default" className="ed-used-by__token-chip">
              {token}
            </EdChip>
          ))}
          {usedByInfo.count > usedByInfo.list.length && (
            <EdChip variant="default" className="ed-used-by__more-chip">
              +{usedByInfo.count - usedByInfo.list.length} more
            </EdChip>
          )}
        </div>
      </div>

      {usedByInfo.categories.semantic > 0 && (
        <div className="ed-used-by__category">
          <span className="ed-used-by__category-label">Semantic tokens:</span>
          <span className="ed-used-by__category-count">{usedByInfo.categories.semantic}</span>
        </div>
      )}

      {usedByInfo.categories.component > 0 && (
        <div className="ed-used-by__category">
          <span className="ed-used-by__category-label">Component tokens:</span>
          <span className="ed-used-by__category-count">{usedByInfo.categories.component}</span>
        </div>
      )}
    </div>
  )
}
