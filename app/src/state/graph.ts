import type { TokenGraph } from '../graph/build'

const graphCacheKey = 'geeklego.editor.graph.cache.v1'

let cachedGraph: TokenGraph | null = null

export function buildAndCacheGraph(graph: TokenGraph): void {
  cachedGraph = graph
  try {
    const nodesArray: Array<{ token: string; dependsOn: string[]; dependents: string[] }> = []
    for (const [token, node] of graph.nodes) {
      nodesArray.push({
        token,
        dependsOn: node.dependsOn,
        dependents: node.dependents,
      })
    }
    localStorage.setItem(graphCacheKey, JSON.stringify(nodesArray))
  } catch {
    // Ignore storage errors
  }
}

export function getGraph(): TokenGraph | null {
  return cachedGraph
}

export function invalidateAndRebuild(): void {
  cachedGraph = null
  try {
    localStorage.removeItem(graphCacheKey)
  } catch {
    // Ignore storage errors
  }
}

export function loadCachedGraph(): TokenGraph | null {
  try {
    const stored = localStorage.getItem(graphCacheKey)
    if (stored) {
      const parsed: Array<{ token: string; dependsOn: string[]; dependents: string[] }> = JSON.parse(stored)
      const nodes = new Map<string, { dependsOn: string[]; dependents: string[] }>()
      for (const item of parsed) {
        nodes.set(item.token, { dependsOn: item.dependsOn, dependents: item.dependents })
      }
      return { nodes }
    }
  } catch {
    // Ignore parse errors
  }
  return null
}
