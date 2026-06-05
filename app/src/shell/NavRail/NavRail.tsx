import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { EdInput, EdScrollArea } from '../../editor-ds/primitives'
import { getRecentlyEdited, subscribeToRecentlyEdited } from '../../state/recentlyEdited'
import { getAllPinned, subscribeToPinnedChanges } from '../../state/pinning'
import type { ClassifiedTokens, KnownComponent } from '../../ia'
import type { ComponentTokenGroup } from '../../types'
import type { RoutePath } from '../../routing'
import './NavRail.css'

interface NavRailProps {
  classification: ClassifiedTokens
  componentGroups: ComponentTokenGroup[]
  currentRoute: RoutePath
  onNavigate: (route: RoutePath) => void
  onOpenCommandPalette?: () => void
}

function CollapsibleSection({
  label,
  defaultOpen = false,
  children,
}: {
  label: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="ed-nav-rail__section">
      <div
        className="ed-nav-rail__section-header"
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) } }}
      >
        <span className="ed-nav-rail__section-label">{label}</span>
        <span className="ed-nav-rail__section-chevron" aria-hidden="true">
          {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
      </div>
      {open && <div className="ed-nav-rail__section-items">{children}</div>}
    </div>
  )
}

function isRouteActive(route: RoutePath, target: RoutePath): boolean {
  if (route.type !== target.type) return false
  switch (route.type) {
    case 'foundations': return route.category === (target as { type: 'foundations'; category: string }).category
    case 'semantic': return route.category === (target as { type: 'semantic'; category: string }).category
    case 'components': return route.componentName === (target as { type: 'components'; componentName: string }).componentName
    default: return false
  }
}

export function NavRail({
  classification,
  componentGroups,
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
}: NavRailProps) {
  const [recentlyEdited, setRecentlyEdited] = useState<string[]>(() => getRecentlyEdited())
  const [pinned, setPinned] = useState<string[]>(() => getAllPinned())

  useEffect(() => {
    return subscribeToRecentlyEdited(() => setRecentlyEdited(getRecentlyEdited()))
  }, [])

  useEffect(() => {
    return subscribeToPinnedChanges(() => setPinned(getAllPinned()))
  }, [])

  return (
    <nav className="ed-nav-rail" aria-label="Token navigation">
      <div className="ed-nav-rail__search">
        <EdInput
          placeholder="Search tokens..."
          onFocus={onOpenCommandPalette}
          aria-label="Search tokens"
        />
      </div>

      <EdScrollArea orientation="vertical" className="ed-nav-rail__content">
        {recentlyEdited.length > 0 && (
          <CollapsibleSection label={`Recently edited (${recentlyEdited.length})`}>
            {recentlyEdited.slice(0, 8).map(tokenName => (
              <button
                key={tokenName}
                type="button"
                className="ed-nav-rail__item"
                onClick={() => onNavigate({ type: 'token', tokenName })}
              >
                <span className="ed-nav-rail__item-token">{tokenName}</span>
              </button>
            ))}
          </CollapsibleSection>
        )}

        {pinned.length > 0 && (
          <CollapsibleSection label={`Pinned (${pinned.length})`}>
            {pinned.slice(0, 10).map(tokenName => (
              <button
                key={tokenName}
                type="button"
                className="ed-nav-rail__item"
                onClick={() => onNavigate({ type: 'token', tokenName })}
              >
                <span className="ed-nav-rail__item-token">{tokenName}</span>
              </button>
            ))}
          </CollapsibleSection>
        )}

        {classification.foundations.length > 0 && (
          <CollapsibleSection label="FOUNDATIONS" defaultOpen>
            {classification.foundations.map(cat => (
              <button
                key={cat.key}
                type="button"
                className={`ed-nav-rail__item ${isRouteActive(currentRoute, { type: 'foundations', category: cat.subCategory }) ? 'ed-nav-rail__item--active' : ''}`}
                onClick={() => onNavigate({ type: 'foundations', category: cat.subCategory })}
              >
                <span>{cat.label}</span>
                {cat.tokens.length > 0 && <span className="ed-nav-rail__item-count">{cat.tokens.length}</span>}
              </button>
            ))}
          </CollapsibleSection>
        )}

        {classification.semantic.length > 0 && (
          <CollapsibleSection label="SEMANTIC" defaultOpen>
            {classification.semantic.map(cat => (
              <button
                key={cat.key}
                type="button"
                className={`ed-nav-rail__item ${isRouteActive(currentRoute, { type: 'semantic', category: cat.subCategory }) ? 'ed-nav-rail__item--active' : ''}`}
                onClick={() => onNavigate({ type: 'semantic', category: cat.subCategory })}
              >
                <span>{cat.label}</span>
                {cat.tokens.length > 0 && <span className="ed-nav-rail__item-count">{cat.tokens.length}</span>}
              </button>
            ))}
          </CollapsibleSection>
        )}

        {componentGroups.length > 0 && (
          <CollapsibleSection label="COMPONENTS" defaultOpen>
            {(['atom', 'molecule', 'organism', 'unknown'] as const).map(level => {
              const group = componentGroups.filter(g => g.level === level)
              if (group.length === 0) return null
              const label = level === 'atom' ? 'Atoms'
                : level === 'molecule' ? 'Molecules'
                : level === 'organism' ? 'Organisms'
                : 'Other'
              return (
                <CollapsibleSection key={level} label={label} defaultOpen={level !== 'unknown'}>
                  {group.map(g => (
                    <button
                      key={g.componentName}
                      type="button"
                      className={`ed-nav-rail__item ed-nav-rail__item--sub ${isRouteActive(currentRoute, { type: 'components', componentName: g.componentName as KnownComponent }) ? 'ed-nav-rail__item--active' : ''}`}
                      onClick={() => onNavigate({ type: 'components', componentName: g.componentName as KnownComponent })}
                    >
                      <span>{g.componentName.charAt(0).toUpperCase() + g.componentName.slice(1)}</span>
                    </button>
                  ))}
                </CollapsibleSection>
              )
            })}
          </CollapsibleSection>
        )}
      </EdScrollArea>
    </nav>
  )
}
