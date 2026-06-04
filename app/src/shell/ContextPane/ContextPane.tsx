import { useMemo } from 'react'
import { useRouter } from '../../routing'
import { CategoryPage, ComponentPage } from '../../views'
import type { GeeklegoTokens, ComponentTokenGroup } from '../../types'
import type { RoutePath } from '../../routing'
import type { KnownComponent } from '../../ia'
import './ContextPane.css'

interface ContextPaneProps {
  tokens: GeeklegoTokens
  componentGroups: ComponentTokenGroup[]
  onSelectToken: (tokenName: string) => void
}

// Maps a primitives top-level key to the CSS variable prefix used in geeklego.css.
const PRIMITIVE_PREFIX: Record<string, string> = {
  colors: 'color',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  lineHeight: 'line-height',
  letterSpacing: 'letter-spacing',
  spacing: 'spacing',
  radius: 'radius',
  borderWidth: 'border-width',
  opacity: 'opacity',
  zIndex: 'z-index',
  duration: 'duration',
  easing: 'ease',
  sizeScale: 'size',
  iconSize: 'icon-size',
  breakpoints: 'breakpoint',
}

const SEMANTIC_PREFIX: Record<string, string> = {
  bg: 'color-bg',
  surface: 'color-surface',
  text: 'color-text',
  border: 'color-border',
  action: 'color-action',
  status: 'color-status',
  state: 'color-state',
  dataSeries: 'color-data-series',
  shadows: 'shadow',
  spacingComponent: 'spacing-component',
  spacingLayout: 'spacing-layout',
  sizeComponent: 'size-component',
  radiusComponent: 'radius-component',
  layer: 'layer',
  borders: 'border',
  typographySemantics: 'typography',
}

function flattenTokens(tokens: GeeklegoTokens): { name: string; value: string }[] {
  const entries: { name: string; value: string }[] = []

  const prims = tokens.primitives as unknown as Record<string, unknown>
  for (const category of Object.keys(prims)) {
    const prefix = PRIMITIVE_PREFIX[category]
    if (!prefix) continue
    const values = prims[category]
    if (!values || typeof values !== 'object') continue
    for (const [k, v] of Object.entries(values as Record<string, unknown>)) {
      if (typeof v === 'string') {
        entries.push({ name: `--${prefix}-${k}`, value: v })
      } else if (v && typeof v === 'object') {
        for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
          if (typeof v2 === 'string') {
            entries.push({ name: `--${prefix}-${k}-${k2}`, value: v2 })
          }
        }
      }
    }
  }

  const semantics = tokens.semantics?.light as unknown as Record<string, unknown> | undefined
  if (semantics) {
    for (const group of Object.keys(semantics)) {
      const prefix = SEMANTIC_PREFIX[group]
      if (!prefix) continue
      const values = semantics[group]
      if (!values || typeof values !== 'object') continue
      for (const [k, v] of Object.entries(values as Record<string, unknown>)) {
        if (typeof v === 'string') {
          entries.push({ name: `--${prefix}-${k}`, value: v })
        } else if (v && typeof v === 'object') {
          // Two-level nesting (e.g. typographySemantics["display-hero"]["size"] → --typography-display-hero-size)
          for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
            if (typeof v2 === 'string') {
              entries.push({ name: `--${prefix}-${k}-${k2}`, value: v2 })
            }
          }
        }
      }
    }
  }

  return entries
}

function getComponentTokens(
  componentName: string,
  componentGroups: ComponentTokenGroup[]
): { name: string; value: string }[] {
  const group = componentGroups.find(g => g.componentName === componentName)
  if (!group) return []
  const entries: { name: string; value: string }[] = []
  for (const section of group.sections) {
    for (const token of section.tokens) {
      entries.push({ name: token.name, value: token.value })
    }
  }
  return entries
}

function HomePage({ onNavigate }: { onNavigate: (route: RoutePath) => void }) {
  return (
    <div className="ed-context-pane__home">
      <h1 className="ed-context-pane__home-title">Token Editor</h1>
      <p className="ed-context-pane__home-subtitle">
        Select a category to start editing design tokens
      </p>
      <div className="ed-context-pane__tiles">
        <button
          type="button"
          className="ed-context-pane__tile"
          onClick={() => onNavigate({ type: 'foundations', category: 'color' })}
        >
          <span className="ed-context-pane__tile-title">Foundations</span>
          <p className="ed-context-pane__tile-desc">Color, spacing, typography, shadows, motion</p>
        </button>
        <button
          type="button"
          className="ed-context-pane__tile"
          onClick={() => onNavigate({ type: 'semantic', category: 'surface' })}
        >
          <span className="ed-context-pane__tile-title">Semantic</span>
          <p className="ed-context-pane__tile-desc">Surface, content, interactive, status, layout</p>
        </button>
        <button
          type="button"
          className="ed-context-pane__tile"
          onClick={() => onNavigate({ type: 'components', componentName: 'button' as KnownComponent })}
        >
          <span className="ed-context-pane__tile-title">Components</span>
          <p className="ed-context-pane__tile-desc">Component-specific token overrides</p>
        </button>
      </div>
    </div>
  )
}

function TokenFocusView({ tokenName }: { tokenName: string }) {
  return (
    <div className="ed-context-pane__token-focus">
      <h2>{tokenName}</h2>
      <p>Select this token in the navigation or editor to view and edit its value in the Inspector panel on the right.</p>
    </div>
  )
}

export function ContextPane({ tokens, componentGroups, onSelectToken }: ContextPaneProps) {
  const { route, navigate } = useRouter()

  const allTokenEntries = useMemo(() => flattenTokens(tokens), [tokens])

  const handleTokenClick = (token: { name: string; value: string }) => {
    onSelectToken(token.name)
  }

  switch (route.type) {
    case 'home':
      return (
        <main className="ed-context-pane">
          <HomePage onNavigate={navigate} />
        </main>
      )
    case 'foundations':
    case 'semantic':
      return (
        <main className="ed-context-pane">
          <CategoryPage
            category={route.category}
            tokens={allTokenEntries}
            geeklegoTokens={tokens}
            onTokenClick={handleTokenClick}
          />
        </main>
      )
    case 'components': {
      const componentLevel = componentGroups.find(
        (g) => g.componentName === route.componentName
      )?.level ?? 'unknown'
      return (
        <main className="ed-context-pane">
          <ComponentPage
            componentName={route.componentName}
            level={componentLevel}
            tokens={getComponentTokens(route.componentName, componentGroups)}
            onSelectToken={onSelectToken}
          />
        </main>
      )
    }
    case 'token':
      return (
        <main className="ed-context-pane">
          <TokenFocusView tokenName={route.tokenName} />
        </main>
      )
    default:
      return (
        <main className="ed-context-pane">
          <HomePage onNavigate={navigate} />
        </main>
      )
  }
}
