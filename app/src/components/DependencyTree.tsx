import { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import type { TokenGraph } from '../graph/build'
import { EdButton, EdScrollArea, EdChip } from '../editor-ds/primitives'

interface DependencyNode {
  token: string
  children: DependencyNode[]
  depth: number
}

interface DependencyTreeProps {
  visible: boolean
  onClose: () => void
  sourceToken: string
  targetToken: string
  graph: TokenGraph | null
}

function buildDependencyTree(
  token: string,
  graph: TokenGraph,
  maxDepth: number = 8,
  visited: Set<string> = new Set(),
  currentDepth: number = 0
): DependencyNode | null {
  if (currentDepth >= maxDepth) {
    return null
  }

  if (visited.has(token)) {
    return null
  }

  const node = graph.nodes.get(token)
  if (!node || node.dependsOn.length === 0) {
    return null
  }

  visited.add(token)

  const children: DependencyNode[] = []
  for (const dep of node.dependsOn) {
    const childNode = buildDependencyTree(dep, graph, maxDepth, new Set(visited), currentDepth + 1)
    if (childNode) {
      children.push(childNode)
    }
  }

  return {
    token,
    children,
    depth: currentDepth,
  }
}

function findPath(
  start: string,
  end: string,
  graph: TokenGraph,
  path: string[] = []
): string[] | null {
  if (start === end) {
    return [...path, start]
  }

  const visited = new Set<string>()
  const queue: Array<{ token: string; currentPath: string[] }> = [
    { token: start, currentPath: [start] },
  ]

  while (queue.length > 0) {
    const { token, currentPath } = queue.shift()!
    if (visited.has(token)) continue
    visited.add(token)

    const node = graph.nodes.get(token)
    if (!node) continue

    for (const dep of node.dependsOn) {
      if (dep === end) {
        return [...currentPath, dep]
      }
      if (!visited.has(dep)) {
        queue.push({ token: dep, currentPath: [...currentPath, dep] })
      }
    }
  }

  return null
}

function DependencyTreeNode({
  node,
  isHighlighted,
  pathSet,
  onTokenClick,
}: {
  node: DependencyNode
  isHighlighted: boolean
  pathSet: Set<string>
  onTokenClick: (token: string) => void
}) {
  const [expanded, setExpanded] = useState(true)

  const handleClick = () => {
    onTokenClick(node.token)
  }

  return (
    <div className="ed-dependency-tree__node" style={{ marginLeft: node.depth * 16 }}>
      <div
        className={`ed-dependency-tree__node-header ${isHighlighted ? 'ed-dependency-tree__node-header--highlighted' : ''}`}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <button
          type="button"
          className="ed-dependency-tree__toggle-btn"
          onClick={e => {
            e.stopPropagation()
            setExpanded(!expanded)
          }}
          aria-expanded={expanded}
          aria-label={`Toggle ${node.token}`}
        >
          {node.children.length > 0 ? (expanded ? '▾' : '▸') : '•'}
        </button>
        <EdChip variant={isHighlighted ? 'accent' : 'default'}>
          {node.token}
        </EdChip>
      </div>
      {expanded && node.children.length > 0 && (
        <div className="ed-dependency-tree__children">
          {node.children.map(child => (
            <DependencyTreeNode
              key={child.token}
              node={child}
              isHighlighted={pathSet.has(child.token)}
              pathSet={pathSet}
              onTokenClick={onTokenClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function DependencyTree({ visible, onClose, sourceToken, targetToken, graph }: DependencyTreeProps) {
  // Hooks must run unconditionally and in the same order on every render, so
  // they precede the visibility/graph early-return below (Rules of Hooks).
  // graph may be null here; the memos guard for it and the early return still
  // skips rendering when it's absent.
  const treeData = useMemo(() => {
    return graph ? buildDependencyTree(sourceToken, graph) : null
  }, [sourceToken, graph])

  const path = useMemo(() => {
    return graph ? findPath(sourceToken, targetToken, graph) || [] : []
  }, [sourceToken, targetToken, graph])

  const pathSet = useMemo(() => new Set(path), [path])

  const handleTokenClick = (token: string) => {
    console.log('Token clicked:', token)
  }

  if (!visible || !graph || !treeData) return null

  return (
    <div
      className="ed-dependency-tree"
      role="dialog"
      aria-label="Dependency tree"
      aria-modal="true"
    >
      <div className="ed-dependency-tree__header">
        <h2 className="ed-dependency-tree__title">Dependency Tree</h2>
        <button
          type="button"
          className="ed-dependency-tree__close-btn"
          onClick={onClose}
          aria-label="Close dependency tree"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="ed-dependency-tree__info">
        <p>
          Showing dependency chain from <strong>{sourceToken}</strong> to <strong>{targetToken}</strong>
        </p>
        {path.length > 0 && (
          <p className="ed-dependency-tree__path">
            Path: {path.slice(0, 6).join(' → ')}
            {path.length > 6 && ' → ...'}
          </p>
        )}
      </div>

      <div className="ed-dependency-tree__content">
        {treeData ? (
          <EdScrollArea orientation="vertical" className="ed-dependency-tree__scroll">
            <DependencyTreeNode
              node={treeData}
              isHighlighted={pathSet.has(treeData.token)}
              pathSet={pathSet}
              onTokenClick={handleTokenClick}
            />
          </EdScrollArea>
        ) : (
          <div className="ed-dependency-tree__empty">
            <p>No dependency chain found.</p>
          </div>
        )}
      </div>

      <div className="ed-dependency-tree__footer">
        <EdButton variant="primary" size="md" onClick={onClose}>
          Close
        </EdButton>
      </div>
    </div>
  )
}
