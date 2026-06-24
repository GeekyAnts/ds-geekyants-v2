import { useEffect, useMemo, useRef, useState } from 'react'
import { EdInput } from '../../editor-ds/primitives/EdInput'
import { FONT_LOADER_EDIT_PREFIX } from '../../utils/exportFormatter'

/**
 * GoogleFontPicker — the value editor for a --font-{sans|mono|display} family token.
 *
 * Fetches the Google Fonts catalog from the dev API (/api/google-fonts; falls back to a
 * curated list when no API key is set), lets the user search + pick a family, and on select
 * stages BOTH:
 *   1. the family token   (--font-<slot>)  → the fallback stack, so components request it
 *   2. the loader          (--font-loader-<slot>) → a JSON {family,axes} that becomes the
 *                          @import in fonts.css, so the webfont actually LOADS.
 * A transient <link> previews the highlighted font in the editor chrome only (not the DS).
 * Free-text remains available via the family token's normal input when the user wants a
 * non-Google / system font — this picker is the Google path.
 */

interface GoogleFont {
  family: string
  category?: string
}

interface GoogleFontPickerProps {
  /** Family slot: 'sans' | 'mono' | 'display' (derived from the token name). */
  slot: string
  /** Current family token value, e.g. '"Inter", ui-sans-serif, system-ui, sans-serif'. */
  currentValue: string
  /** Stage an edit (tokenName, value) — used for BOTH the family token and the loader key. */
  onStageEdit: (tokenName: string, value: string) => void
}

/** Default css2 axis spec per slot — variable range so any weight a forker uses loads. */
const DEFAULT_AXES = 'wght@300..900'

/** Sensible fallback stack appended after the chosen family, by slot. */
const FALLBACK_STACK: Record<string, string> = {
  sans: 'ui-sans-serif, system-ui, sans-serif',
  mono: 'ui-monospace, monospace',
  display: 'ui-sans-serif, system-ui, sans-serif',
}

/** Extract the primary family name (first item, unquoted) from a font-family token value. */
function primaryFamily(value: string): string {
  const first = value.split(',')[0]?.trim() ?? ''
  return first.replace(/^["']|["']$/g, '')
}

export function GoogleFontPicker({ slot, currentValue, onStageEdit }: GoogleFontPickerProps) {
  const [fonts, setFonts] = useState<GoogleFont[]>([])
  const [source, setSource] = useState<'google' | 'fallback' | 'loading'>('loading')
  const [query, setQuery] = useState('')
  const previewLinkRef = useRef<HTMLLinkElement | null>(null)

  const current = primaryFamily(currentValue)

  useEffect(() => {
    let cancelled = false
    fetch('/api/google-fonts')
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return
        if (j.success && Array.isArray(j.fonts)) {
          setFonts(j.fonts)
          setSource(j.source === 'google' ? 'google' : 'fallback')
        } else {
          setSource('fallback')
        }
      })
      .catch(() => { if (!cancelled) setSource('fallback') })
    return () => { cancelled = true }
  }, [])

  // Clean up the transient preview <link> on unmount.
  useEffect(() => {
    return () => {
      if (previewLinkRef.current) {
        previewLinkRef.current.remove()
        previewLinkRef.current = null
      }
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q ? fonts.filter((f) => f.family.toLowerCase().includes(q)) : fonts
    return list.slice(0, 60) // cap the rendered list; search narrows the full catalog
  }, [fonts, query])

  /** Lazily load a font into the editor chrome so the list/preview shows real glyphs. */
  const ensurePreviewLoaded = (family: string) => {
    const slug = family.trim().replace(/\s+/g, '+')
    const href = `https://fonts.googleapis.com/css2?family=${slug}:${DEFAULT_AXES}&display=swap`
    if (previewLinkRef.current?.getAttribute('href') === href) return
    if (!previewLinkRef.current) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      document.head.appendChild(link)
      previewLinkRef.current = link
    }
    previewLinkRef.current.setAttribute('href', href)
  }

  const handlePick = (family: string) => {
    // 1. Family token: chosen family + its fallback stack.
    const stack = FALLBACK_STACK[slot] ?? 'sans-serif'
    onStageEdit(`--font-${slot}`, `"${family}", ${stack}`)
    // 2. Loader: JSON {family,axes} keyed by slot → becomes the @import in fonts.css.
    onStageEdit(
      `${FONT_LOADER_EDIT_PREFIX}${slot}`,
      JSON.stringify({ family, axes: DEFAULT_AXES }),
    )
  }

  return (
    <div className="ed-font-picker">
      <EdInput
        placeholder={source === 'loading' ? 'Loading fonts…' : 'Search Google Fonts…'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
        aria-label="Search Google Fonts"
      />
      {source === 'fallback' && (
        <p className="ed-font-picker__note">
          Showing a curated list. Set <code>GOOGLE_FONTS_API_KEY</code> for the full catalog.
        </p>
      )}
      <ul className="ed-font-picker__list" role="listbox" aria-label="Google Fonts">
        {filtered.map((f) => {
          const isCurrent = f.family === current
          return (
            <li key={f.family}>
              <button
                type="button"
                role="option"
                aria-selected={isCurrent}
                className={`ed-font-picker__item${isCurrent ? ' ed-font-picker__item--current' : ''}`}
                onMouseEnter={() => ensurePreviewLoaded(f.family)}
                onFocus={() => ensurePreviewLoaded(f.family)}
                onClick={() => handlePick(f.family)}
                style={{ fontFamily: `"${f.family}", ${FALLBACK_STACK[slot] ?? 'sans-serif'}` }}
              >
                <span className="ed-font-picker__family">{f.family}</span>
                {f.category && <span className="ed-font-picker__category">{f.category}</span>}
              </button>
            </li>
          )
        })}
        {source !== 'loading' && filtered.length === 0 && (
          <li className="ed-font-picker__empty">No fonts match “{query}”.</li>
        )}
      </ul>
    </div>
  )
}
