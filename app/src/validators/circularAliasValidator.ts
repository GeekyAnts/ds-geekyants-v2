import type { TokenGraph } from '../graph/build'
import type { ValidatorResult } from './types'

export function checkCircularAliases(
  graph: TokenGraph
): ValidatorResult[] {
  const results: ValidatorResult[] = []
  const visitedGlobal = new Set<string>()
  const maxDepth = 10

  function detectCycle(
    start: string,
    current: string,
    path: string[],
    visitedInPath: Set<string>
  ): void {
    if (path.length >= maxDepth) {
      return
    }

    const node = graph.nodes.get(current)
    if (!node) {
      return
    }

    for (const dep of node.dependsOn) {
      if (dep === start) {
        const cyclePath = [...path, dep]
        let cycleStr = cyclePath.join(' → ')
        if (cycleStr.length > 100) {
          cycleStr = `${cyclePath.slice(0, 5).join(' → ')} → ... → ${cyclePath[cyclePath.length - 1]}`
        }
        results.push({
          tokenName: start,
          severity: 'block',
          category: 'circular-alias',
          message: `Circular alias: ${cycleStr}`,
        })
        return
      }

      if (!visitedInPath.has(dep)) {
        visitedInPath.add(dep)
        detectCycle(start, dep, [...path, dep], visitedInPath)
      }
    }
  }

  graph.nodes.forEach((_, tokenName) => {
    if (!visitedGlobal.has(tokenName)) {
      const visitedInPath = new Set<string>()
      visitedInPath.add(tokenName)
      detectCycle(tokenName, tokenName, [tokenName], visitedInPath)
      visitedGlobal.add(tokenName)
    }
  })

  return results
}
