import { useState, useEffect, useMemo, useCallback } from 'react'
import { RouterProvider, useRouter } from './routing'
import { Header } from './shell/Header'
import { NavRail } from './shell/NavRail'
import { ContextPane } from './shell/ContextPane'
import { Inspector } from './shell/Inspector'
import { PendingDrawer } from './shell/PendingDrawer'
import { CommandPalette } from './components/CommandPalette'
import ExportModal from './components/ExportModal'
import { PendingModal } from './components/PendingModal'
import './components/PendingModal.css'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'
import { OnboardingTour } from './components/OnboardingTour'
import { EdSkeleton } from './editor-ds/primitives'
import { getPendingCount, subscribeToPendingChanges, stage, getAllStaged, discardAll, getStagedNewTokens } from './state/staging'
import { generateMergedTokens } from './utils/exportFormatter'
import { parseComponentTokens, generateComponentTokensCss } from './utils/componentTokenParser'
import { buildTokenGraph, type TokenGraph } from './graph/build'
import { classifyTokens } from './ia'
import type { GeeklegoTokens, ComponentTokenGroup } from './types'
import './EditorShell.css'

interface TokenEntry {
  name: string
  value: string
}

// Maps a primitives top-level key to the CSS variable prefix used in geeklego.css.
// Mirrors emission rules in utils/cssGenerator.ts.
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

// Maps a semantics top-level key to the CSS variable prefix.
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

function flattenTokens(tokens: GeeklegoTokens): TokenEntry[] {
  const entries: TokenEntry[] = []

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
        // Nested (e.g. colors.neutral.500 → --color-neutral-500)
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

// classifyTokens patterns expect names without the leading "--", and semantic
// categories match on bare prefixes (surface-, content-, interactive-, status-,
// layout-) — not the color-surface-* form used in geeklego.css. Map accordingly.
const SEMANTIC_CLASSIFIER_PREFIX: Record<string, string> = {
  bg: 'background',
  surface: 'surface',
  text: 'content',
  border: 'border',
  action: 'interactive',
  status: 'status',
  state: 'state',
  dataSeries: 'data-series',
  shadows: 'shadow',
  spacingComponent: 'spacing-component',
  spacingLayout: 'layout-spacing',
  sizeComponent: 'layout-size',
  radiusComponent: 'radius-component',
  layer: 'layout-layer',
  borders: 'border-width',
  typographySemantics: 'typography',
}

function collectTokenNames(tokens: GeeklegoTokens): string[] {
  const names: string[] = []
  const prims = tokens.primitives as unknown as Record<string, unknown>
  for (const category of Object.keys(prims)) {
    const prefix = PRIMITIVE_PREFIX[category]
    if (!prefix) continue
    const values = prims[category]
    if (!values || typeof values !== 'object') continue
    for (const [k, v] of Object.entries(values as Record<string, unknown>)) {
      if (typeof v === 'string') {
        names.push(`${prefix}-${k}`)
      } else if (v && typeof v === 'object') {
        for (const k2 of Object.keys(v as Record<string, unknown>)) {
          if (typeof (v as Record<string, unknown>)[k2] === 'string') {
            names.push(`${prefix}-${k}-${k2}`)
          }
        }
      }
    }
  }

  const semantics = tokens.semantics?.light as unknown as Record<string, unknown> | undefined
  if (semantics) {
    for (const group of Object.keys(semantics)) {
      const prefix = SEMANTIC_CLASSIFIER_PREFIX[group]
      if (!prefix) continue
      const values = semantics[group]
      if (!values || typeof values !== 'object') continue
      for (const [k, v] of Object.entries(values as Record<string, unknown>)) {
        if (typeof v === 'string') {
          names.push(`${prefix}-${k}`)
        } else if (v && typeof v === 'object') {
          // Two-level nesting (e.g. typographySemantics["display-hero"]["size"] → typography-display-hero-size)
          for (const k2 of Object.keys(v as Record<string, unknown>)) {
            if (typeof (v as Record<string, unknown>)[k2] === 'string') {
              names.push(`${prefix}-${k}-${k2}`)
            }
          }
        }
      }
    }
  }
  return names
}

function EditorShellContent() {
  const { route, navigate } = useRouter()

  const [tokens, setTokens] = useState<GeeklegoTokens | null>(null)
  const [componentGroups, setComponentGroups] = useState<ComponentTokenGroup[]>([])
  const [selectedTokenName, setSelectedTokenName] = useState<string | null>(null)
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('dark')
  const [commandOpen, setCommandOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [pendingDrawerOpen, setPendingDrawerOpen] = useState(false)
  const [pendingModalOpen, setPendingModalOpen] = useState(false)
  const [pendingCount, setPendingCount] = useState(() => getPendingCount())
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('geeklego.editor.onboarding.completed')
  })

  // Load tokens from disk
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [tokenRes, componentRes] = await Promise.all([
          fetch('/api/load-tokens'),
          fetch('/api/component-tokens'),
        ])
        const tokenData = await tokenRes.json()
        const componentData = await componentRes.json()
        if (!cancelled) {
          if (tokenData.success && tokenData.tokens) {
            setTokens(tokenData.tokens)
          }
          if (componentData.success && componentData.css) {
            const groups = parseComponentTokens(componentData.css)
            setComponentGroups(groups || [])
          }
        }
      } catch {
        if (!cancelled) setTokens(null)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // HMR listener for token updates
  useEffect(() => {
    const hot = import.meta.hot
    if (hot) {
      const handler = () => {
        Promise.all([
          fetch('/api/load-tokens').then(r => r.json()),
          fetch('/api/component-tokens').then(r => r.json()),
        ]).then(([tokenData, componentData]) => {
          if (tokenData.success && tokenData.tokens) setTokens(tokenData.tokens)
          if (componentData.success && componentData.css) {
            const groups = parseComponentTokens(componentData.css)
            setComponentGroups(groups || [])
          }
        })
      }
      hot.on('geeklego:tokens-updated', handler)
      return () => { hot.off('geeklego:tokens-updated', handler) }
    }
  }, [])

  // Subscribe to pending changes
  useEffect(() => {
    return subscribeToPendingChanges(() => setPendingCount(getPendingCount()))
  }, [])

  // Keyboard shortcuts — ⌘K, ⌘E, ?
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault()
        setCommandOpen(o => !o)
        return
      }
      if (e.metaKey && e.key === 'e') {
        e.preventDefault()
        setExportOpen(o => !o)
        return
      }
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          e.preventDefault()
          setShowKeyboardShortcuts(prev => !prev)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Derived data
  const graph: TokenGraph | null = useMemo(() => {
    if (!tokens) return null
    return buildTokenGraph(tokens)
  }, [tokens])

  const classification = useMemo(() => {
    if (!tokens) return null
    const tokenNames = collectTokenNames(tokens)
    return classifyTokens(tokenNames)
  }, [tokens])

  const allTokenEntries = useMemo(() => {
    if (!tokens) return []
    const base = flattenTokens(tokens)
    for (const [, newToken] of getStagedNewTokens()) {
      base.push({ name: newToken.cssName, value: newToken.value })
    }
    return base
  }, [tokens])

  const handleStageEdit = useCallback((tokenName: string, newValue: string) => {
    stage(tokenName, newValue)
  }, [])

  const handleRestoreDefault = useCallback(async () => {
    const res = await fetch('/api/restore-default', { method: 'POST' })
    const json = await res.json()
    if (!json.success) throw new Error(json.error ?? 'Restore failed')

    discardAll()

    const [loadRes, reloadCompRes] = await Promise.all([
      fetch('/api/load-tokens'),
      fetch('/api/component-tokens'),
    ])
    const loadJson = await loadRes.json()
    const reloadCompJson = await reloadCompRes.json()
    if (loadJson.success) setTokens(loadJson.tokens)
    if (reloadCompJson.success) setComponentGroups(parseComponentTokens(reloadCompJson.css))

    // Rebuild dist/geeklego.css for consuming packages
    fetch('/api/sync-build', { method: 'POST' }).catch(err => {
      console.warn('Post-restore CSS build failed:', err)
    })
  }, [])

  const handleExport = useCallback(async () => {
    if (!tokens) return
    const staged = getAllStaged()

    // Apply staged edits to component groups
    const mergedComponentGroups = componentGroups.map(group => ({
      ...group,
      sections: group.sections.map(section => ({
        ...section,
        tokens: section.tokens.map(token => {
          const sv = staged.get(token.name)
          return sv !== undefined ? { ...token, value: sv } : token
        }),
      })),
    }))

    // Apply staged edits + new tokens to primitives/semantics tokens
    const mergedTokens = generateMergedTokens(tokens, staged, getStagedNewTokens())

    try {
      // Save primitives + semantics
      const primRes = await fetch('/api/save-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedTokens),
      })
      const primJson = await primRes.json()
      if (!primJson.success) throw new Error(primJson.error ?? 'Save tokens failed')

      // Save component tokens (only if there are any component groups)
      if (mergedComponentGroups.length > 0) {
        const compCss = generateComponentTokensCss(mergedComponentGroups)
        const compRes = await fetch('/api/save-component-tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: compCss,
        })
        const compJson = await compRes.json()
        if (!compJson.success) throw new Error(compJson.error ?? 'Save component tokens failed')
      }

      discardAll()

      // Commit any staged metadata changes to tokens.metadata.json
      try {
        const stored = localStorage.getItem('geeklego.editor.metadata.v1')
        if (stored) {
          const stagedChanges = JSON.parse(stored)
          if (Object.keys(stagedChanges).length > 0) {
            const metaRes = await fetch('/api/merge-metadata', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ stagedChanges }),
            })
            if (metaRes.ok) {
              localStorage.removeItem('geeklego.editor.metadata.v1')
            }
          }
        }
      } catch (metaErr) {
        console.error('Metadata commit failed:', metaErr)
      }

      // Reload tokens from the freshly written CSS
      const [loadRes, reloadCompRes] = await Promise.all([
        fetch('/api/load-tokens'),
        fetch('/api/component-tokens'),
      ])
      const loadJson = await loadRes.json()
      const reloadCompJson = await reloadCompRes.json()
      if (loadJson.success) setTokens(loadJson.tokens)
      if (reloadCompJson.success) setComponentGroups(parseComponentTokens(reloadCompJson.css))

      // Rebuild dist/geeklego.css for consuming packages
      fetch('/api/sync-build', { method: 'POST' }).catch(err => {
        console.warn('Post-export CSS build failed:', err)
      })
    } catch (err) {
      console.error('Export failed:', err)
      throw err
    }
  }, [tokens, componentGroups])

  const handleSelectToken = useCallback((tokenName: string) => {
    setSelectedTokenName(tokenName)
  }, [])

  if (!tokens) {
    return (
      <div className="ed-shell ed-shell--loading">
        <EdSkeleton width="100%" height="100vh" />
      </div>
    )
  }

  return (
    <div className="ed-shell">
      <Header
        pendingCount={pendingCount}
        onOpenCommandPalette={() => setCommandOpen(true)}
        onOpenExport={() => setExportOpen(true)}
        onOpenPending={() => setPendingModalOpen(true)}
        previewTheme={previewTheme}
        onTogglePreviewTheme={() => setPreviewTheme(t => t === 'dark' ? 'light' : 'dark')}
      />

      {classification && (
        <NavRail
          classification={classification}
          componentGroups={componentGroups}
          currentRoute={route}
          onNavigate={navigate}
          onOpenCommandPalette={() => setCommandOpen(true)}
        />
      )}

      <ContextPane
        tokens={tokens}
        componentGroups={componentGroups}
        onSelectToken={handleSelectToken}
      />

      <Inspector
        selectedTokenName={selectedTokenName}
        tokens={tokens}
        componentGroups={componentGroups}
        graph={graph}
        onStageEdit={handleStageEdit}
        onClose={() => setSelectedTokenName(null)}
      />

      <PendingDrawer
        visible={pendingDrawerOpen}
        onToggle={() => setPendingDrawerOpen(o => !o)}
        pendingCount={pendingCount}
        tokens={tokens}
        componentGroups={componentGroups}
        onOpenExport={() => setExportOpen(true)}
      />

      {commandOpen && (
        <CommandPalette
          allTokens={allTokenEntries}
          onSelectToken={handleSelectToken}
          onClose={() => setCommandOpen(false)}
        />
      )}

      <PendingModal
        open={pendingModalOpen}
        onClose={() => setPendingModalOpen(false)}
        tokens={tokens}
        componentGroups={componentGroups}
      />

      {exportOpen && (
        <ExportModal
          isOpen={exportOpen}
          onClose={() => setExportOpen(false)}
          onExport={handleExport}
          onRestoreDefault={handleRestoreDefault}
          tokens={tokens}
          componentGroups={componentGroups}
          hasBlockers={false}
        />
      )}

      {showKeyboardShortcuts && (
        <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />
      )}

      {showOnboarding && (
        <OnboardingTour
          isOpen={showOnboarding}
          onClose={() => {
            setShowOnboarding(false)
            localStorage.setItem('geeklego.editor.onboarding.completed', 'true')
          }}
          onComplete={() => {
            setShowOnboarding(false)
            localStorage.setItem('geeklego.editor.onboarding.completed', 'true')
          }}
        />
      )}
    </div>
  )
}

export default function EditorShell() {
  return (
    <RouterProvider>
      <EditorShellContent />
    </RouterProvider>
  )
}
