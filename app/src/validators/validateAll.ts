import type { TokenGraph } from '../graph/build'
import type { GeeklegoTokens } from '../types'
import type { ValidatorResult } from './types'
import { checkBrokenReferences } from './brokenRefValidator'
import { checkCircularAliases } from './circularAliasValidator'
import { checkTypeMismatches } from './typeMismatchValidator'
import { checkContrast } from './contrastValidator'
import { checkOutOfScale } from './outOfScaleValidator'
import { checkDrift } from './driftValidator'

export interface ValidationSummary {
  blocks: ValidatorResult[]
  warnings: ValidatorResult[]
  notices: ValidatorResult[]
}

export function validateAll(
  tokens: GeeklegoTokens,
  graph: TokenGraph,
  stagedEdits: Map<string, string>
): ValidationSummary {
  const blocks: ValidatorResult[] = []
  const warnings: ValidatorResult[] = []
  const notices: ValidatorResult[] = []

  const allTokenNames = new Set<string>()

  graph.nodes.forEach((node, name) => {
    allTokenNames.add(name)
    if (node.dependsOn.length > 0) {
      const targetName = node.dependsOn[0]
      const value = stagedEdits.get(targetName)
      if (value) {
        allTokenNames.add(targetName)
      }
    }
  })

  const allTokenValues = new Map<string, string>()

  stagedEdits.forEach((stagedValue, name) => {
    allTokenValues.set(name, stagedValue)
  })

  // Check broken references and type mismatches
  graph.nodes.forEach((node, name) => {
    if (node.dependsOn.length === 0) return

    const targetName = node.dependsOn[0]
    const baseValue = allTokenValues.get(targetName) || ''

    const broken = checkBrokenReferences(name, baseValue, allTokenNames)
    broken.forEach(result => {
      if (result.severity === 'block') blocks.push(result)
      else if (result.severity === 'warn') warnings.push(result)
      else notices.push(result)
    })

    const mismatches = checkTypeMismatches(name, baseValue, graph)
    mismatches.forEach(result => {
      if (result.severity === 'block') blocks.push(result)
      else if (result.severity === 'warn') warnings.push(result)
      else notices.push(result)
    })
  })

  // Check circular aliases
  const circular = checkCircularAliases(graph)
  circular.forEach(result => {
    if (result.severity === 'block') blocks.push(result)
    else if (result.severity === 'warn') warnings.push(result)
    else notices.push(result)
  })

  // Check contrast (only for text tokens that reference var())
  graph.nodes.forEach((node, name) => {
    if (!name.startsWith('--color-text-') || node.dependsOn.length === 0) return

    const targetName = node.dependsOn[0]
    const value = allTokenValues.get(targetName) || ''

    if (value.includes('var(')) {
      const textContrasts = checkContrast(name, value, allTokenValues)
      textContrasts.forEach(result => {
        if (result.severity === 'block') blocks.push(result)
        else if (result.severity === 'warn') warnings.push(result)
        else notices.push(result)
      })
    }
  })

  // Check out of scale
  graph.nodes.forEach((node, tokenName) => {
    if (node.dependsOn.length === 0) return

    const targetName = node.dependsOn[0]
    const value = allTokenValues.get(targetName) || ''

    const scaleResults = checkOutOfScale(tokenName, value, tokens)
    scaleResults.forEach(result => {
      if (result.severity === 'block') blocks.push(result)
      else if (result.severity === 'warn') warnings.push(result)
      else notices.push(result)
    })
  })

  // Check drift
  const driftResults = checkDrift(tokens, stagedEdits)
  driftResults.forEach(result => {
    if (result.severity === 'block') blocks.push(result)
    else if (result.severity === 'warn') warnings.push(result)
    else notices.push(result)
  })

  return {
    blocks,
    warnings,
    notices,
  }
}
