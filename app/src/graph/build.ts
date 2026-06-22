import type { GeeklegoTokensV2 } from '../types.ts'

export interface TokenNode {
  dependsOn: string[]
  dependents: string[]
}

export interface TokenGraph {
  nodes: Map<string, TokenNode>
}

export interface DependencyResult {
  tokenName: string
  dependsOn: string[]
  dependents: string[]
}

const VAR_REF = /var\(--([\w-]+)/g

function extractVarReferences(value: string): string[] {
  const refs: string[] = []
  let match: RegExpExecArray | null
  VAR_REF.lastIndex = 0
  while ((match = VAR_REF.exec(value)) !== null) {
    refs.push(`--${match[1]}`)
  }
  return [...new Set(refs)]
}

function collectAllTokenNames(tokens: GeeklegoTokensV2): Set<string> {
  const names = new Set<string>()

  for (const [family, shades] of Object.entries(tokens.primitives.colors)) {
    for (const shade of Object.keys(shades)) {
      names.add(`--color-${family}-${shade}`)
    }
  }

  const primitiveKeys = [
    'fontSize', 'fontFamily', 'lineHeight', 'letterSpacing', 'fontWeight',
    'spacing', 'radius', 'borderWidth', 'opacity', 'zIndex', 'duration',
    'easing', 'sizeScale', 'iconSize', 'contentFlexibility', 'colorShadowNeutral',
    'breakpoints'
  ] as const

  for (const key of primitiveKeys) {
    const data = tokens.primitives[key]
    if (data && typeof data === 'object') {
      for (const k of Object.keys(data)) {
        if (key === 'contentFlexibility' || key === 'colorShadowNeutral' || key === 'breakpoints') {
          names.add(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-${k}`)
        } else {
          names.add(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-${k}`)
        }
      }
    }
  }

  // v2 flat semantics: each key maps to the CSS variable `--<key>`.
  for (const k of Object.keys(tokens.semantics.light)) {
    names.add(`--${k}`)
  }

  return names
}

export function buildTokenGraph(tokens: GeeklegoTokensV2): TokenGraph {
  const allNames = collectAllTokenNames(tokens)

  const tokenValues = new Map<string, string>()

  for (const [family, shades] of Object.entries(tokens.primitives.colors)) {
    for (const shade of Object.keys(shades)) {
      tokenValues.set(`--color-${family}-${shade}`, shades[shade])
    }
  }

  const primitiveKeys = [
    'fontSize', 'fontFamily', 'lineHeight', 'letterSpacing', 'fontWeight',
    'spacing', 'radius', 'borderWidth', 'opacity', 'zIndex', 'duration',
    'easing', 'sizeScale', 'iconSize', 'contentFlexibility', 'colorShadowNeutral',
    'breakpoints'
  ] as const

  for (const key of primitiveKeys) {
    const data = tokens.primitives[key]
    if (data && typeof data === 'object') {
      for (const k of Object.keys(data)) {
        const value = (data as Record<string, unknown>)[k] as string
        if (value) {
          if (key === 'contentFlexibility' || key === 'colorShadowNeutral' || key === 'breakpoints') {
            tokenValues.set(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-${k}`, value)
          } else {
            tokenValues.set(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-${k}`, value)
          }
        }
      }
    }
  }

  // v2 flat semantics: each key maps to the CSS variable `--<key>`.
  for (const [k, v] of Object.entries(tokens.semantics.light)) {
    tokenValues.set(`--${k}`, v)
  }

  const nodes = new Map<string, TokenNode>()

  allNames.forEach(tokenName => {
    nodes.set(tokenName, { dependsOn: [], dependents: [] })
  })

  tokenValues.forEach((value, tokenName) => {
    const tokenNode = nodes.get(tokenName)
    if (!tokenNode) return

    const refs = extractVarReferences(value)
    tokenNode.dependsOn = []

    refs.forEach(ref => {
      if (tokenValues.has(ref)) {
        tokenNode.dependsOn.push(ref)
        const dependentNode = nodes.get(ref)
        if (dependentNode) {
          if (!dependentNode.dependents.includes(tokenName)) {
            dependentNode.dependents.push(tokenName)
          }
        }
      }
    })
  })

  return {
    nodes,
  }
}
