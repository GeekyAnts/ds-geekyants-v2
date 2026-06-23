import { useMemo } from 'react'
import { useRouter } from '../../routing'
import { CategoryPage } from '../../views'
import type { GeeklegoTokensV2 } from '../../types'
import type { RoutePath } from '../../routing'
import './ContextPane.css'

interface ContextPaneProps {
  tokens: GeeklegoTokensV2
  onSelectToken: (tokenName: string) => void
}

// Maps a primitives top-level key to the CSS variable prefix used in the v2 design system.
const PRIMITIVE_PREFIX: Record<string, string> = {
  colors: 'color',
  fontFamily: 'font',
  fontSize: 'text',
  fontWeight: 'font-weight',
  lineHeight: 'leading',
  letterSpacing: 'tracking',
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

function flattenTokens(tokens: GeeklegoTokensV2): { name: string; value: string }[] {
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

  // Flat v2 semantics — CSS var for a key is `--<key>`
  for (const [k, v] of Object.entries(tokens.semantics.light)) {
    entries.push({ name: `--${k}`, value: v })
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

export function ContextPane({ tokens, onSelectToken }: ContextPaneProps) {
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
