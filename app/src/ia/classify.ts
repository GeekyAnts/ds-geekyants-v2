// ─── IA Classification Layer ──────────────────────────────────────────────────
// Pure functions to classify tokens from cssParser output into IA sections

import { componentCatalog } from '../../../components/catalog'
import type { 
  ClassifiedTokens, 
  ClassifiedCategory, 
  NavigationNode, 
  NavigationStructure,
  KnownComponent,
  IATopLevel,
  FoundationsSubCategory,
  SemanticSubCategory 
} from './classify.types.ts'
import type { TokenMetadata } from '../state/metadata.types'

// ─── Known Component List (camelCase for token matching) ────────────────────
// Derived from the canonical catalog.ts — adding a component there
// automatically makes the Token Editor recognize its tokens.

function toCamel(pascal: string): string {
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

const KNOWN_COMPONENTS: KnownComponent[] = [
  ...componentCatalog.atoms.map(toCamel),
  ...componentCatalog.molecules.map(toCamel),
  ...componentCatalog.organisms.map(toCamel),
]

// ─── Foundations Category Definitions ─────────────────────────────────────────

function getFoundationsCategories(): { 
  pattern: RegExp; 
  categoryId: FoundationsSubCategory; 
  label: string; 
  icon?: string 
}[] {
  return [
    { pattern: /^color-/, categoryId: 'color', label: 'Colors', icon: 'Palette' },
    { pattern: /^spacing-/, categoryId: 'spacing', label: 'Spacing', icon: 'Ruler' },
    { pattern: /^radius-/, categoryId: 'radius', label: 'Radius', icon: 'Box' },
    { pattern: /^font-/, categoryId: 'typography', label: 'Fonts', icon: 'Type' },
    { pattern: /^shadow-/, categoryId: 'shadow', label: 'Shadows', icon: 'Layers' },
    { pattern: /^motion-/, categoryId: 'motion', label: 'Motion', icon: 'Zap' },
    { pattern: /^z-/, categoryId: 'zIndex', label: 'Z-Index', icon: 'Layers' },
    { pattern: /^border-/, categoryId: 'border', label: 'Borders', icon: 'Frame' },
  ]
}

// ─── Semantic Category Definitions ────────────────────────────────────────────

function getSemanticCategories(): { 
  pattern: RegExp; 
  categoryId: SemanticSubCategory; 
  label: string; 
  icon?: string 
}[] {
  return [
    { pattern: /^surface-/, categoryId: 'surface', label: 'Surfaces', icon: 'Layout' },
    { pattern: /^content-/, categoryId: 'content', label: 'Content', icon: 'AlignLeft' },
    { pattern: /^interactive-/, categoryId: 'interactive', label: 'Interactive', icon: 'Zap' },
    { pattern: /^status-/, categoryId: 'status', label: 'Status', icon: 'CircleAlert' },
    { pattern: /^layout-/, categoryId: 'layout', label: 'Layout', icon: 'Maximize2' },
    { pattern: /^typography-/, categoryId: 'typography-semantic', label: 'Typography', icon: 'Type' },
  ]
}

// ─── Classification Functions ─────────────────────────────────────────────────

function getMetadataCategory(tokenName: string, metadata?: TokenMetadata): { categoryId: string; label: string; icon?: string; topLevel: string } | null {
  if (metadata?.category) {
    const level = metadata.category === 'foundations' ? 'foundations' : metadata.category === 'semantic' ? 'semantic' : metadata.category === 'components' ? 'components' : null
    if (level) {
      return {
        categoryId: metadata.category,
        label: metadata.category.charAt(0).toUpperCase() + metadata.category.slice(1),
        topLevel: level,
      }
    }
  }
  return null
}

/**
 * Classify a single token into its IA category
 */
function classifyToken(tokenName: string, tokenMetadata?: TokenMetadata): ClassifiedCategory | null {
  const metadataOverride = getMetadataCategory(tokenName, tokenMetadata)
  
  if (metadataOverride) {
    const pattern = metadataOverride.categoryId === 'foundations' ? /^.*$/ : 
                    metadataOverride.categoryId === 'semantic' ? /^.*$/ : /^.*$/
    
    if (pattern.test(tokenName)) {
      return {
        key: `${metadataOverride.topLevel}/${metadataOverride.categoryId}`,
        label: metadataOverride.label,
        categoryName: metadataOverride.label,
        topLevel: metadataOverride.topLevel as IATopLevel,
        subCategory: metadataOverride.categoryId as FoundationsSubCategory | SemanticSubCategory | 'component',
        tokens: [tokenName],
      }
    }
  }

  const foundations = getFoundationsCategories()
  for (const { pattern, categoryId, label, icon } of foundations) {
    if (pattern.test(tokenName)) {
      return {
        key: `foundations/${categoryId}`,
        label: label,
        categoryName: label,
        topLevel: 'foundations',
        subCategory: categoryId,
        tokens: [tokenName],
        icon: icon,
      }
    }
  }

  const semantic = getSemanticCategories()
  for (const { pattern, categoryId, label, icon } of semantic) {
    if (pattern.test(tokenName)) {
      return {
        key: `semantic/${categoryId}`,
        label: label,
        categoryName: label,
        topLevel: 'semantic',
        subCategory: categoryId,
        tokens: [tokenName],
        icon: icon,
      }
    }
  }

  for (const componentName of KNOWN_COMPONENTS) {
    const componentPattern = new RegExp(`^${componentName}-`)
    if (componentPattern.test(tokenName)) {
      return {
        key: `components/${componentName}`,
        label: componentName,
        categoryName: componentName,
        topLevel: 'components',
        subCategory: 'component',
        tokens: [tokenName],
        componentName: componentName,
      }
    }
  }

  return null
}

/**
 * Classify all tokens and group them by category
 */
export function classifyTokens(
  tokenNames: string[],
  tokenMetadataMap: Map<string, TokenMetadata> = new Map()
): ClassifiedTokens {
  const categoryMap = new Map<string, ClassifiedCategory>()
  const uncategorized: string[] = []
  const discoveredComponents = new Set<KnownComponent>()

  for (const tokenName of tokenNames) {
    const metadata = tokenMetadataMap.get(tokenName)
    const classification = classifyToken(tokenName, metadata)
    
    if (!classification) {
      uncategorized.push(tokenName)
      continue
    }

    if (!categoryMap.has(classification.key)) {
      categoryMap.set(classification.key, {
        ...classification,
        tokens: [],
      })
    }
    categoryMap.get(classification.key)!.tokens.push(tokenName)

    if (
      classification.topLevel === 'components' &&
      classification.componentName
    ) {
      discoveredComponents.add(classification.componentName)
    }
  }

  return {
    foundations: Array.from(categoryMap.values()).filter(c => c.topLevel === 'foundations'),
    semantic: Array.from(categoryMap.values()).filter(c => c.topLevel === 'semantic'),
    components: Array.from(categoryMap.values()).filter(c => c.topLevel === 'components'),
    uncategorized,
    componentNames: Array.from(discoveredComponents) as KnownComponent[],
  }
}

/**
 * Generate navigation structure from classified tokens
 */
export function generateNavigationStructure(classified: ClassifiedTokens): NavigationStructure {
  const sections: NavigationNode[] = [
    {
      id: 'foundations',
      label: 'Foundations',
      type: 'section',
      tokenCount: foundationalCount(classified.foundations),
      children: classified.foundations.map(cat => ({
        id: `foundations-${cat.key}`,
        label: cat.label,
        type: 'category',
        parentId: 'foundations',
        subCategory: cat.subCategory,
        icon: cat.icon,
        tokenCount: cat.tokens.length,
      })),
    },
    {
      id: 'semantic',
      label: 'Semantic',
      type: 'section',
      tokenCount: semanticCount(classified.semantic),
      children: classified.semantic.map(cat => ({
        id: `semantic-${cat.key}`,
        label: cat.label,
        type: 'category',
        parentId: 'semantic',
        subCategory: cat.subCategory,
        icon: cat.icon,
        tokenCount: cat.tokens.length,
      })),
    },
    {
      id: 'components',
      label: 'Components',
      type: 'section',
      tokenCount: componentCount(classified.components),
      children: classified.components.map(cat => ({
        id: `components-${cat.key}`,
        label: cat.label,
        type: 'category',
        parentId: 'components',
        subCategory: 'component',
        tokenCount: cat.tokens.length,
      })),
    },
  ]

  return { sections }
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function foundationalCount(categories: ClassifiedCategory[]): number {
  return categories.reduce((sum, cat) => sum + cat.tokens.length, 0)
}

function semanticCount(categories: ClassifiedCategory[]): number {
  return categories.reduce((sum, cat) => sum + cat.tokens.length, 0)
}

function componentCount(categories: ClassifiedCategory[]): number {
  return categories.reduce((sum, cat) => sum + cat.tokens.length, 0)
}

// ─── Utility Functions ────────────────────────────────────────────────────────

/**
 * Extract component name from a token if it's a component token
 */
export function getComponentNameFromToken(tokenName: string): KnownComponent | undefined {
  for (const componentName of KNOWN_COMPONENTS) {
    const pattern = new RegExp(`^${componentName}-`)
    if (pattern.test(tokenName)) {
      return componentName
    }
  }
  return undefined
}

/**
 * Check if a token belongs to a specific category
 */
export function getTokenCategory(
  tokenName: string
): { topLevel: string; subCategory: string; categoryName: string } | null {
  const classification = classifyToken(tokenName)
  if (!classification) return null
  
  return {
    topLevel: classification.topLevel,
    subCategory: classification.subCategory,
    categoryName: classification.categoryName,
  }
}

/**
 * Get list of all known component names
 */
export function getKnownComponents(): readonly KnownComponent[] {
  return [...KNOWN_COMPONENTS]
}

