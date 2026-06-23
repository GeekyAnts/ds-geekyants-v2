import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { buildUtilityResolver, collectKnownTokenNames, scanTokenUsage } from './scan-token-usage'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')

// A representative known-token set covering semantics, ext, radius, and one spacing primitive.
const KNOWN = new Set<string>([
  'primary', 'primary-foreground',
  'secondary', 'input', 'ring', 'accent', 'background',
  'radius',
  'ext-button-gamified-bg', 'ext-button-gamified-shadow',
  'spacing-4',
  // Tailwind typography namespaces — the utility class IS the token name.
  'text-sm', 'text-base', 'leading-tight', 'tracking-wide', 'font-sans', 'font-mono',
  'font-weight-medium', 'font-weight-semibold',
])

describe('buildUtilityResolver — utility → token (exact-containment)', () => {
  const resolve = buildUtilityResolver(KNOWN)

  it('maps simple color utilities', () => {
    expect(resolve('bg-primary')).toBe('--primary')
    expect(resolve('text-primary-foreground')).toBe('--primary-foreground')
    expect(resolve('border-input')).toBe('--input')
    expect(resolve('ring-ring')).toBe('--ring')
  })

  it('strips variant prefixes and opacity', () => {
    expect(resolve('hover:bg-primary/90')).toBe('--primary')
    expect(resolve('focus-visible:ring-ring')).toBe('--ring')
    expect(resolve('data-[state=open]:bg-accent')).toBe('--accent')
    expect(resolve('dark:text-primary-foreground')).toBe('--primary-foreground')
  })

  it('prefers the longest valid prefix (ring-offset- over ring-)', () => {
    expect(resolve('focus-visible:ring-offset-background')).toBe('--background')
  })

  it('maps radius rounded-* to --radius', () => {
    expect(resolve('rounded-md')).toBe('--radius')
    expect(resolve('rounded')).toBe('--radius')
    expect(resolve('rounded-full')).toBe('--radius')
  })

  it('maps ext utilities', () => {
    expect(resolve('bg-ext-button-gamified-bg')).toBe('--ext-button-gamified-bg')
    expect(resolve('hover:bg-ext-button-gamified-bg')).toBe('--ext-button-gamified-bg')
  })

  it('maps spacing primitives only when the exact token exists', () => {
    expect(resolve('p-4')).toBe('--spacing-4')
    expect(resolve('gap-4')).toBe('--spacing-4')
    expect(resolve('p-99')).toBeNull()   // --spacing-99 not known
    expect(resolve('h-auto')).toBeNull() // --spacing-auto not known
  })

  it('maps typography utilities (text-/leading-/tracking-/font-) to their token', () => {
    expect(resolve('text-sm')).toBe('--text-sm')
    expect(resolve('text-base')).toBe('--text-base')
    expect(resolve('leading-tight')).toBe('--leading-tight')
    expect(resolve('tracking-wide')).toBe('--tracking-wide')
    expect(resolve('font-sans')).toBe('--font-sans')
    // Tailwind weight utilities map font-<name> → --font-weight-<name>
    expect(resolve('font-medium')).toBe('--font-weight-medium')
    expect(resolve('font-semibold')).toBe('--font-weight-semibold')
    expect(resolve('hover:text-sm')).toBe('--text-sm')
    // unknown sizes don't resolve
    expect(resolve('text-7xl')).toBeNull()
    expect(resolve('leading-none')).toBeNull()
  })

  it('keeps color text utilities resolving to color, not typography', () => {
    // text-primary is a COLOR (--primary), not a font-size — color pass wins.
    expect(resolve('text-primary')).toBe('--primary')
    expect(resolve('text-primary-foreground')).toBe('--primary-foreground')
  })

  it('returns null for non-token utilities', () => {
    expect(resolve('bg-nonexistent')).toBeNull()
    expect(resolve('flex')).toBeNull()
    expect(resolve('items-center')).toBeNull()
    expect(resolve('uppercase')).toBeNull()
  })
})

describe('collectKnownTokenNames', () => {
  it('extracts defined token names from CSS', () => {
    const css = ':root { --primary: var(--color-brand-900); --info: var(--color-accent-500); }'
    const known = collectKnownTokenNames(css)
    expect(known.has('primary')).toBe(true)
    expect(known.has('info')).toBe(true)
  })
})

describe('scanTokenUsage — over the real components/v2', () => {
  it('finds --primary and --ext-button-gamified-bg in the Button slice', async () => {
    const css = [
      'design-system/v2/primitives.css',
      'design-system/v2/semantics.css',
      'design-system/v2/themes/dark.css',
    ]
      .map((rel) => readFileSync(resolve(repoRoot, rel), 'utf-8'))
      .join('\n')

    const usage = await scanTokenUsage({
      css,
      componentsDir: resolve(repoRoot, 'components/v2'),
      repoRoot,
    })

    const primaryFiles = (usage['--primary'] ?? []).map((h) => h.file)
    expect(primaryFiles.some((f) => f.includes('Button'))).toBe(true)

    const gamifiedFiles = (usage['--ext-button-gamified-bg'] ?? []).map((h) => h.file)
    expect(gamifiedFiles.some((f) => f.includes('Button'))).toBe(true)

    // The var() form is captured with kind 'var'.
    const shadowHits = usage['--ext-button-gamified-shadow'] ?? []
    expect(shadowHits.some((h) => h.kind === 'var')).toBe(true)
  })
})
