// ─── Route Definitions & Path Helpers ─────────────────────────────────────────

import type { KnownComponent } from '../ia/classify.types.ts'

// ─── Route Types ──────────────────────────────────────────────────────────────

export type RoutePath =
  | { type: 'foundations'; category: string }
  | { type: 'semantic'; category: string }
  | { type: 'components'; componentName: KnownComponent }
  | { type: 'token'; tokenName: string }
  | { type: 'home' }

// ─── Path Constants ───────────────────────────────────────────────────────────

export const ROUTES = {
  // Section routes
  foundations: '/foundations',
  semantic: '/semantic',
  components: '/components',

  // Home
  home: '/',
} as const

// ─── Route Pattern Matching ───────────────────────────────────────────────────

const FOUNDATIONS_CATEGORY_PATTERN = /^\/foundations\/([a-zA-Z0-9_-]+)$/
const SEMANTIC_CATEGORY_PATTERN = /^\/semantic\/([a-zA-Z0-9_-]+)$/
const COMPONENTS_PATTERN = /^\/components\/([a-zA-Z0-9_-]+)$/
const TOKEN_PATTERN = /^\/token\/(.+)$/

// ─── Path Helpers ─────────────────────────────────────────────────────────────

/**
 * Build a hash-based route path
 */
export function buildRoute(path: RoutePath): string {
  switch (path.type) {
    case 'home':
      return '#/'
    case 'foundations':
      return `#/foundations/${path.category}`
    case 'semantic':
      return `#/semantic/${path.category}`
    case 'components':
      return `#/components/${path.componentName}`
    case 'token':
      return `#/token/${encodeURIComponent(path.tokenName)}`
  }
}

/**
 * Parse a hash route into a typed RoutePath
 */
export function parseRoute(hash: string): RoutePath {
  // Strip the leading '#' but preserve the leading '/' so patterns match.
  const cleanHash = hash.replace(/^#/, '')

  if (cleanHash === '' || cleanHash === '/') {
    return { type: 'home' }
  }

  // Match foundations category
  const foundationsMatch = cleanHash.match(FOUNDATIONS_CATEGORY_PATTERN)
  if (foundationsMatch) {
    return { type: 'foundations', category: foundationsMatch[1] }
  }

  // Match semantic category
  const semanticMatch = cleanHash.match(SEMANTIC_CATEGORY_PATTERN)
  if (semanticMatch) {
    return { type: 'semantic', category: semanticMatch[1] }
  }

  // Match components
  const componentsMatch = cleanHash.match(COMPONENTS_PATTERN)
  if (componentsMatch) {
    return { type: 'components', componentName: componentsMatch[1] as KnownComponent }
  }

  // Match individual token
  const tokenMatch = cleanHash.match(TOKEN_PATTERN)
  if (tokenMatch) {
    return { type: 'token', tokenName: decodeURIComponent(tokenMatch[1]) }
  }

  // Default fallback
  return { type: 'home' }
}

/**
 * Get the current route from window.location.hash
 */
export function getCurrentRoute(): RoutePath {
  return parseRoute(window.location.hash)
}

/**
 * Navigate to a route (updates history)
 */
export function navigate(route: RoutePath): void {
  window.location.hash = buildRoute(route)
}

/**
 * Navigate without adding to history (for programmatic navigation)
 */
export function replaceRoute(route: RoutePath): void {
  window.history.replaceState(null, '', buildRoute(route))
}

// ─── Route Components Resolver ────────────────────────────────────────────────

/**
 * Component exports for routes (lazy-loaded)
 * This is populated dynamically to avoid circular imports
 */
export interface RouteComponents {
  FoundationsCategoryPage: React.ComponentType<{ category: string }>
  SemanticCategoryPage: React.ComponentType<{ category: string }>
  ComponentPage: React.ComponentType<{ componentName: KnownComponent }>
  TokenPage: React.ComponentType<{ tokenName: string }>
  HomePage: React.ComponentType
}

export const routeComponents: Partial<RouteComponents> = {}

/**
 * Register route component
 */
export function registerRouteComponent<T extends keyof RouteComponents>(
  key: T,
  component: RouteComponents[T]
): void {
  routeComponents[key] = component as any
}

/**
 * Get route component by key (throws if not registered)
 */
export function getRouteComponent<T extends keyof RouteComponents>(
  key: T
): RouteComponents[T] {
  const component = routeComponents[key]
  if (!component) {
    throw new Error(`Route component ${key} not registered`)
  }
  return component
}

// ─── Navigation Helpers ───────────────────────────────────────────────────────

/**
 * Build URL for foundations category
 */
export function foundationsUrl(category: string): string {
  return buildRoute({ type: 'foundations', category })
}

/**
 * Build URL for semantic category
 */
export function semanticUrl(category: string): string {
  return buildRoute({ type: 'semantic', category })
}

/**
 * Build URL for component page
 */
export function componentUrl(componentName: KnownComponent): string {
  return buildRoute({ type: 'components', componentName })
}

/**
 * Build URL for individual token
 */
export function tokenUrl(tokenName: string): string {
  return buildRoute({ type: 'token', tokenName })
}

