import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { EdInput, EdScrollArea } from '../../editor-ds/primitives'
import { getRecentlyEdited, subscribeToRecentlyEdited } from '../../state/recentlyEdited'
import { getAllPinned, subscribeToPinnedChanges } from '../../state/pinning'
import type { ClassifiedTokens } from '../../ia'
import type { RoutePath } from '../../routing'
import './NavRail.css'

interface NavRailProps {
  classification: ClassifiedTokens
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
    default: return false
  }
}

export function NavRail({
  classification,
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
      </EdScrollArea>
    </nav>
  )
}
