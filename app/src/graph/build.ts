import type { GeeklegoTokens } from '../types.ts'

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

function collectAllTokenNames(tokens: GeeklegoTokens): Set<string> {
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

  const colorGroups = ['bg', 'surface', 'text', 'border', 'action', 'status', 'state'] as const
  for (const group of colorGroups) {
    if (tokens.semantics.light[group]) {
      for (const k of Object.keys(tokens.semantics.light[group])) {
        names.add(`--color-${group}-${k}`)
      }
    }
  }

  if (tokens.semantics.light.dataSeries) {
    for (const k of Object.keys(tokens.semantics.light.dataSeries)) {
      names.add(`--color-data-series-${k}`)
    }
  }

  if (tokens.semantics.light.shadows) {
    for (const k of Object.keys(tokens.semantics.light.shadows)) {
      names.add(`--shadow-${k}`)
    }
  }

  for (const k of Object.keys(tokens.semantics.light.spacingComponent)) {
    names.add(`--spacing-component-${k}`)
  }

  for (const k of Object.keys(tokens.semantics.light.spacingLayout)) {
    names.add(`--spacing-layout-${k}`)
  }

  for (const k of Object.keys(tokens.semantics.light.sizeComponent)) {
    names.add(`--size-component-${k}`)
  }

  for (const k of Object.keys(tokens.semantics.light.radiusComponent)) {
    names.add(`--radius-component-${k}`)
  }

  if (tokens.semantics.light.motion) {
    for (const k of Object.keys(tokens.semantics.light.motion.duration)) {
      names.add(`--duration-${k}`)
    }
    for (const k of Object.keys(tokens.semantics.light.motion.easing)) {
      names.add(`--ease-${k}`)
    }
  }

  if (tokens.semantics.light.typographySemantics) {
    for (const [style, properties] of Object.entries(tokens.semantics.light.typographySemantics)) {
      if (properties.size) names.add(`--typography-${style}-size`)
      if (properties.weight) names.add(`--typography-${style}-weight`)
      if (properties.leading) names.add(`--typography-${style}-leading`)
      if (properties.tracking) names.add(`--typography-${style}-tracking`)
    }
  }

  for (const k of Object.keys(tokens.semantics.light.layer)) {
    names.add(`--layer-${k}`)
  }

  for (const k of Object.keys(tokens.semantics.light.borders)) {
    names.add(`--border-${k}`)
  }

  if (tokens.semantics.light.contentFlexibility) {
    for (const k of Object.keys(tokens.semantics.light.contentFlexibility)) {
      names.add(`--content-${k}`)
    }
  }

  return names
}

export function buildTokenGraph(tokens: GeeklegoTokens): TokenGraph {
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

  const colorGroups = ['bg', 'surface', 'text', 'border', 'action', 'status', 'state'] as const
  for (const group of colorGroups) {
    if (tokens.semantics.light[group]) {
      for (const k of Object.keys(tokens.semantics.light[group])) {
        tokenValues.set(`--color-${group}-${k}`, tokens.semantics.light[group][k])
      }
    }
  }

  if (tokens.semantics.light.dataSeries) {
    for (const k of Object.keys(tokens.semantics.light.dataSeries)) {
      tokenValues.set(`--color-data-series-${k}`, tokens.semantics.light.dataSeries[k])
    }
  }

  if (tokens.semantics.light.shadows) {
    for (const k of Object.keys(tokens.semantics.light.shadows)) {
      tokenValues.set(`--shadow-${k}`, tokens.semantics.light.shadows[k])
    }
  }

  for (const k of Object.keys(tokens.semantics.light.spacingComponent)) {
    tokenValues.set(`--spacing-component-${k}`, tokens.semantics.light.spacingComponent[k])
  }

  for (const k of Object.keys(tokens.semantics.light.spacingLayout)) {
    tokenValues.set(`--spacing-layout-${k}`, tokens.semantics.light.spacingLayout[k])
  }

  for (const k of Object.keys(tokens.semantics.light.sizeComponent)) {
    tokenValues.set(`--size-component-${k}`, tokens.semantics.light.sizeComponent[k])
  }

  for (const k of Object.keys(tokens.semantics.light.radiusComponent)) {
    tokenValues.set(`--radius-component-${k}`, tokens.semantics.light.radiusComponent[k])
  }

  if (tokens.semantics.light.motion) {
    for (const k of Object.keys(tokens.semantics.light.motion.duration)) {
      tokenValues.set(`--duration-${k}`, tokens.semantics.light.motion.duration[k])
    }
    for (const k of Object.keys(tokens.semantics.light.motion.easing)) {
      tokenValues.set(`--ease-${k}`, tokens.semantics.light.motion.easing[k])
    }
  }

  if (tokens.semantics.light.typographySemantics) {
    for (const [style, properties] of Object.entries(tokens.semantics.light.typographySemantics)) {
      if (properties.size) tokenValues.set(`--typography-${style}-size`, properties.size)
      if (properties.weight) tokenValues.set(`--typography-${style}-weight`, properties.weight)
      if (properties.leading) tokenValues.set(`--typography-${style}-leading`, properties.leading)
      if (properties.tracking) tokenValues.set(`--typography-${style}-tracking`, properties.tracking)
    }
  }

  for (const k of Object.keys(tokens.semantics.light.layer)) {
    tokenValues.set(`--layer-${k}`, tokens.semantics.light.layer[k])
  }

  for (const k of Object.keys(tokens.semantics.light.borders)) {
    tokenValues.set(`--border-${k}`, tokens.semantics.light.borders[k])
  }

  if (tokens.semantics.light.contentFlexibility) {
    for (const k of Object.keys(tokens.semantics.light.contentFlexibility)) {
      tokenValues.set(`--content-${k}`, tokens.semantics.light.contentFlexibility[k])
    }
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
