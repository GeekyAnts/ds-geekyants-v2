export interface ComponentToken {
  name: string
  value: string
  component: string
}

export function extractVariantName(tokenName: string, componentName: string): string {
  const regex = new RegExp(`--${componentName}-(.+?)(?:-|$)`, 'i')
  const match = tokenName.match(regex)

  if (match && match[1]) {
    const segment = match[1]
    if (!segment.includes('-') && !segment.includes('_')) {
      return segment.charAt(0).toUpperCase() + segment.slice(1)
    }
  }

  return 'Base'
}

export function getVariantGroupKey(tokenName: string, componentName: string): string {
  const variant = extractVariantName(tokenName, componentName)
  const match = tokenName.match(new RegExp(`--${componentName}-[^-]+-(.+)$`, 'i'))
  return match ? `${variant}.${match[1]}` : `${variant}.base`
}

export function groupTokensByVariant(
  tokens: ComponentToken[],
  componentName: string
): Record<string, ComponentToken[]> {
  const groups: Record<string, ComponentToken[]> = {}

  tokens.forEach((token) => {
    const variant = extractVariantName(token.name, componentName)
    const variantKey = variant === 'Base' ? 'Base' : variant

    if (!groups[variantKey]) {
      groups[variantKey] = []
    }
    groups[variantKey].push(token)
  })

  const sortedGroups: Record<string, ComponentToken[]> = {}
  const priority = ['Base', 'Primary', 'Secondary', 'Danger', 'Success', 'Warning']

  priority.forEach((p) => {
    if (groups[p]) {
      sortedGroups[p] = groups[p]
    }
  })

  Object.keys(groups).forEach((k) => {
    if (!sortedGroups[k]) {
      sortedGroups[k] = groups[k]
    }
  })

  return sortedGroups
}
