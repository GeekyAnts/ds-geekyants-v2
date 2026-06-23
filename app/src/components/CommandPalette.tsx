'use client'

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type KeyboardEvent,
} from 'react'
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react'
import './CommandPalette.css'
import { withPxAnnotation } from '../utils/colorUtils'

interface TokenEntry {
  name: string
  value: string
}

interface CommandPaletteProps {
  allTokens: TokenEntry[]
  onSelectToken: (tokenName: string) => void
  onClose: () => void
}

const ROW_HEIGHT = 44
const OVERSCAN_PX = 20
const MAX_LIST_HEIGHT = 420

function findUnusedTokens(tokens: TokenEntry[]): Set<string> {
  const referenced = new Set<string>()
  for (const t of tokens) {
    const refs = t.value.match(/var\(--[\w-]+\)/g)
    if (refs) {
      for (const ref of refs) {
        referenced.add(ref.slice(4, -1))
      }
    }
  }
  return new Set(tokens.filter((t) => !referenced.has(t.name)).map((t) => t.name))
}

function findBrokenTokens(tokens: TokenEntry[]): Set<string> {
  const names = new Set(tokens.map((t) => t.name))
  const broken = new Set<string>()
  for (const t of tokens) {
    const refs = t.value.match(/var\(--[\w-]+\)/g)
    if (refs) {
      for (const ref of refs) {
        if (!names.has(ref.slice(4, -1))) {
          broken.add(t.name)
          break
        }
      }
    }
  }
  return broken
}

function getTokenType(name: string): string {
  const m = name.match(/^--(\w+)-/)
  if (!m) return 'other'
  const prefix = m[1]
  if (['color'].includes(prefix)) return 'color'
  if (['spacing'].includes(prefix)) return 'spacing'
  if (['radius'].includes(prefix)) return 'radius'
  if (['shadow'].includes(prefix)) return 'shadow'
  if (['motion'].includes(prefix)) return 'motion'
  if (['border'].includes(prefix)) return 'border'
  if (['text', 'font', 'leading', 'tracking'].includes(prefix)) return 'typo'
  return prefix
}

function searchTokens(tokens: TokenEntry[], query: string): TokenEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  if (q === 'unused') {
    const unused = findUnusedTokens(tokens)
    return tokens.filter((t) => unused.has(t.name)).slice(0, 200)
  }

  if (q === 'broken') {
    const broken = findBrokenTokens(tokens)
    return tokens.filter((t) => broken.has(t.name)).slice(0, 200)
  }

  const usedByMatch = q.match(/^used by:(\w[\w-]*)/)
  if (usedByMatch) {
    const comp = usedByMatch[1].toLowerCase()
    return tokens
      .filter((t) => {
        const parts = t.name.replace(/^--/, '').split('-')
        return parts.some((p) => p === comp)
      })
      .slice(0, 200)
  }

  const hexMatch = q.match(/#[0-9a-f]{3,8}/i)
  const results: Array<{ token: TokenEntry; score: number }> = []

  for (const token of tokens) {
    const nameLower = token.name.toLowerCase()
    const valueLower = token.value.toLowerCase()
    let score = 0

    if (nameLower === q) {
      score = 100
    } else if (nameLower.startsWith(q)) {
      score = 80
    } else if (nameLower.includes(q)) {
      score = 60
    } else if (valueLower === q) {
      score = 50
    } else if (hexMatch && valueLower.includes(hexMatch[0].toLowerCase())) {
      score = 40
    } else if (valueLower.includes(q)) {
      score = 30
    } else {
      continue
    }

    results.push({ token, score })
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 200)
    .map((r) => r.token)
}

export function CommandPalette({
  allTokens,
  onSelectToken,
  onClose,
}: CommandPaletteProps) {
  // Default to true: EditorShell controls visibility by conditionally mounting
  // this component, so mounting implies open.
  const [isOpen, setIsOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  const results = useMemo(() => searchTokens(allTokens, query), [allTokens, query])

  // ⌘K is handled at the EditorShell level (controls mounting); only listen
  // for "/" as a secondary trigger inside this palette.
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (
        !isOpenRef.current &&
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (e.target as HTMLElement).tagName,
        )
      ) {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setScrollTop(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  useEffect(() => {
    setScrollTop(0)
    setSelectedIndex(0)
  }, [query])

  const closePalette = useCallback(() => {
    setIsOpen(false)
    onClose()
  }, [onClose])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closePalette()
      }
    },
    [closePalette],
  )

  const handleSelect = useCallback(
    (tokenName: string) => {
      onSelectToken(tokenName)
      closePalette()
    },
    [onSelectToken, closePalette],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex].name)
        }
      }
    },
    [results, selectedIndex, handleSelect],
  )

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      setScrollTop(listRef.current.scrollTop)
    }
  }, [])

  useEffect(() => {
    if (!listRef.current || results.length === 0) return
    const selectedTop = selectedIndex * ROW_HEIGHT
    const selectedBottom = selectedTop + ROW_HEIGHT
    const viewTop = listRef.current.scrollTop
    const viewBottom = viewTop + MAX_LIST_HEIGHT

    if (selectedTop < viewTop) {
      listRef.current.scrollTop = selectedTop
    } else if (selectedBottom > viewBottom) {
      listRef.current.scrollTop = selectedBottom - MAX_LIST_HEIGHT
    }
  }, [selectedIndex, results.length])

  const totalHeight = results.length * ROW_HEIGHT
  const visibleStart = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT))
  const visibleEnd = Math.min(
    results.length,
    Math.ceil((scrollTop + MAX_LIST_HEIGHT) / ROW_HEIGHT),
  )
  const overscanCount = Math.ceil(OVERSCAN_PX / ROW_HEIGHT) + 1
  const renderStart = Math.max(0, visibleStart - overscanCount)
  const renderEnd = Math.min(results.length, visibleEnd + overscanCount)
  const visibleItems = results.slice(renderStart, renderEnd)

  if (!isOpen) return null

  return (
    <div
      className="ed-command-palette-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="ed-command-palette">
        <div className="ed-command-palette-header">
          <Search size={15} className="ed-command-palette-search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="ed-command-palette-input"
            placeholder="Search tokens, or try: unused, broken, used by:Button..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="cp-list"
            aria-activedescendant={
              results[selectedIndex] ? `cp-item-${selectedIndex}` : undefined
            }
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div
          ref={listRef}
          className="ed-command-palette-list"
          id="cp-list"
          role="listbox"
          onScroll={handleScroll}
          style={{ maxHeight: MAX_LIST_HEIGHT }}
        >
          {results.length === 0 && query.trim() !== '' && (
            <div className="ed-command-palette-empty">
              No tokens found for{' '}
              <span className="ed-command-palette-empty-query">{query}</span>
            </div>
          )}

          {results.length === 0 && query.trim() === '' && (
            <div className="ed-command-palette-empty">
              Type to search tokens, or try:{' '}
              <kbd className="ed-command-palette-kbd">unused</kbd>{' '}
              <kbd className="ed-command-palette-kbd">broken</kbd>{' '}
              <kbd className="ed-command-palette-kbd">used by:Button</kbd>
            </div>
          )}

          <div
            style={{
              height: totalHeight,
              position: 'relative',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${renderStart * ROW_HEIGHT}px)`,
                pointerEvents: 'auto',
              }}
            >
              {visibleItems.map((token, i) => {
                const actualIndex = renderStart + i
                const isSelected = actualIndex === selectedIndex
                return (
                  <div
                    key={token.name}
                    id={`cp-item-${actualIndex}`}
                    className={`ed-command-palette-item${isSelected ? ' ed-command-palette-item-selected' : ''}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(token.name)}
                    onMouseEnter={() => setSelectedIndex(actualIndex)}
                    style={{ height: ROW_HEIGHT }}
                  >
                    <div className="ed-command-palette-item-border" />
                    <div className="ed-command-palette-item-content">
                      <div className="ed-command-palette-item-name">
                        <span className="ed-font-mono ed-command-palette-token-name">
                          {token.name}
                        </span>
                        <span className="ed-command-palette-badge">
                          {getTokenType(token.name)}
                        </span>
                      </div>
                      <div className="ed-command-palette-item-value">
                        {withPxAnnotation(token.value)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="ed-command-palette-footer">
          <span className="ed-command-palette-footer-key"><ArrowUp size={10} /><ArrowDown size={10} /></span> Navigate{' '}
          <span aria-hidden="true">·</span>{' '}
          <span className="ed-command-palette-footer-key"><CornerDownLeft size={10} /></span> Select{' '}
          <span aria-hidden="true">·</span>{' '}
          <span className="ed-command-palette-footer-key">Esc</span> Close
        </div>
      </div>
    </div>
  )
}
