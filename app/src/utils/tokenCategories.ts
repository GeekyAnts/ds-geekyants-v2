export type TokenCategory =
  | 'Color'
  | 'Spacing'
  | 'Layout'
  | 'Typography'
  | 'Motion'
  | 'Border'
  | 'Shadow'
  | 'Other'

export interface CategorizedTokens {
  category: TokenCategory
  tokens: Array<{ name: string; value: string }>
}

const CATEGORY_ORDER: TokenCategory[] = [
  'Color',
  'Layout',
  'Spacing',
  'Typography',
  'Border',
  'Shadow',
  'Motion',
  'Other',
]

// Suffix/keyword patterns matched against the segment AFTER the component prefix.
// Order matters — first match wins.
const RULES: Array<{ category: TokenCategory; patterns: RegExp[] }> = [
  {
    // Border must come before Color — border tokens often reference color vars
    category: 'Border',
    patterns: [
      /\b(border|outline|ring|divider|separator)\b/,
      /-(border|radius|rounded|ring|outline)(-|$)/,
    ],
  },
  {
    category: 'Color',
    patterns: [
      // explicit "color" keyword
      /\bcolor\b/,
      // bg / text / fill / stroke / placeholder / caret — always color roles
      /\b(bg|text|fill|stroke|placeholder|caret)\b/,
      // icon only when it's a color role: ends the token or is followed by a state/theme word
      // e.g. --btn-icon, --btn-icon-hover → Color
      // but NOT --alert-banner-icon-size-md → Layout
      /-icon(-?(color|hover|active|focus|disabled|selected|error|warning|success|info|default))?$/,
      // explicit state suffixes at the very end
      /-(default|hover|active|focus|disabled|selected|error|warning|success|info)$/,
    ],
  },
  {
    category: 'Typography',
    patterns: [
      /\b(font|text-size|line-height|letter-spacing|leading|tracking|weight|typeface|font-family|font-size|font-weight|whitespace)\b/,
      /-(weight|leading|tracking|family|line|letter|whitespace)(-|$)/,
      /\btypo\b/,
    ],
  },
  {
    category: 'Motion',
    patterns: [
      /\b(duration|easing|delay|transition|animation|motion|speed)\b/,
      /-(duration|easing|delay|speed)$/,
    ],
  },
  {
    category: 'Shadow',
    patterns: [
      /\b(shadow|elevation|blur|spread|drop-shadow)\b/,
      /-(shadow|elevation)$/,
    ],
  },
  {
    category: 'Spacing',
    patterns: [
      /\b(padding|margin|gap|spacing|gutter|inset|offset|indent)\b/,
      // end-of-token size suffixes like -px-sm, -py-md, -pb-lg, -gap-sm etc.
      /-(px|py|pt|pb|pl|pr|ps|pe|mx|my|mt|mb|ml|mr|ms|me|gap|spacing|gutter|indent)(-|$)/,
      /-(padding|margin|gap|gutter)(-|$)/,
    ],
  },
  {
    category: 'Layout',
    patterns: [
      /\b(width|height|min-width|max-width|min-height|max-height|flex|grid|columns|rows|z-index|z|layer|overflow|aspect)\b/,
      // icon-size, avatar-size, thumb-size, etc. — dimensional tokens, not color
      /-icon-size\b/,
      /-(width|height|min|max|w|h|cols|rows|z|flex|grid|aspect)(-|$)/,
      // standalone -size suffix (e.g. --spinner-size, --avatar-size-md)
      /-size(-|$)/,
    ],
  },
]

function getSegmentAfterPrefix(tokenName: string, componentPrefix: string): string {
  // e.g. "--accordion-trigger-bg" → strip "--accordion-" → "trigger-bg"
  const prefix = `--${componentPrefix}-`
  if (tokenName.startsWith(prefix)) {
    return tokenName.slice(prefix.length)
  }
  return tokenName
}

function isColorValue(value: string): boolean {
  const v = value.trim().toLowerCase()
  return (
    v.startsWith('#') ||
    v.startsWith('rgb') ||
    v.startsWith('hsl') ||
    v.startsWith('oklch') ||
    v.startsWith('color(') ||
    v === 'transparent' ||
    v === 'currentcolor' ||
    v.startsWith('color-mix(') ||
    // var referencing a color token
    /var\(--color-/.test(v) ||
    /var\(--ed-color/.test(v)
  )
}

export function categorizeToken(
  token: { name: string; value: string },
  componentPrefix: string
): TokenCategory {
  const segment = getSegmentAfterPrefix(token.name, componentPrefix)
  const full = token.name

  for (const rule of RULES) {
    for (const pat of rule.patterns) {
      if (pat.test(segment) || pat.test(full)) {
        return rule.category
      }
    }
  }

  // Fallback: check if value looks like a color
  if (isColorValue(token.value)) {
    return 'Color'
  }

  return 'Other'
}

export function categorizeTokens(
  tokens: Array<{ name: string; value: string }>,
  componentPrefix: string
): CategorizedTokens[] {
  const buckets = new Map<TokenCategory, Array<{ name: string; value: string }>>()

  for (const token of tokens) {
    const cat = categorizeToken(token, componentPrefix)
    if (!buckets.has(cat)) buckets.set(cat, [])
    buckets.get(cat)!.push(token)
  }

  return CATEGORY_ORDER
    .filter((cat) => buckets.has(cat))
    .map((cat) => ({ category: cat, tokens: buckets.get(cat)! }))
}

// ── Variant-first grouping ────────────────────────────────────────────────────

export interface VariantGroup {
  variant: string
  categories: CategorizedTokens[]
  totalCount: number
}

// Known named variants across common components.
// Order matters: longer/more-specific names must come before shorter prefixes.
const KNOWN_VARIANTS = [
  // Sizes
  'xl', 'lg', 'md', 'sm', 'xs',
  // Semantic variants
  'primary', 'secondary', 'tertiary', 'ghost', 'outline', 'link',
  'destructive', 'danger', 'warning', 'success', 'info', 'error',
  'default', 'active', 'disabled', 'loading', 'selected', 'checked',
  // Component-specific
  'filled', 'tonal', 'elevated', 'text',
  'solid', 'soft', 'subtle', 'surface',
  'open', 'closed', 'expanded', 'collapsed',
  'on', 'off',
  'horizontal', 'vertical',
  'light', 'dark',
]

function extractVariant(tokenName: string, componentPrefix: string): string | null {
  const prefix = `--${componentPrefix}-`
  if (!tokenName.startsWith(prefix)) return null
  const rest = tokenName.slice(prefix.length) // e.g. "primary-bg-hover"
  const first = rest.split('-')[0]            // e.g. "primary"
  if (KNOWN_VARIANTS.includes(first)) return first
  return null
}

export function groupByVariant(
  tokens: Array<{ name: string; value: string }>,
  componentPrefix: string
): VariantGroup[] {
  // Partition tokens into named-variant buckets and a "Base" bucket
  const variantBuckets = new Map<string, Array<{ name: string; value: string }>>()
  const baseBucket: Array<{ name: string; value: string }> = []

  for (const token of tokens) {
    const variant = extractVariant(token.name, componentPrefix)
    if (variant) {
      if (!variantBuckets.has(variant)) variantBuckets.set(variant, [])
      variantBuckets.get(variant)!.push(token)
    } else {
      baseBucket.push(token)
    }
  }

  // Build ordered variant list — preserve the order variants first appear in the token list
  const variantOrder: string[] = []
  for (const token of tokens) {
    const v = extractVariant(token.name, componentPrefix)
    if (v && !variantOrder.includes(v)) variantOrder.push(v)
  }

  const groups: VariantGroup[] = []

  // Base tokens first (shared dimensions, typography, motion, etc.)
  if (baseBucket.length > 0) {
    const cats = categorizeTokens(baseBucket, componentPrefix)
    groups.push({ variant: 'Base', categories: cats, totalCount: baseBucket.length })
  }

  // Named variant groups in appearance order
  for (const variant of variantOrder) {
    const toks = variantBuckets.get(variant)!
    const cats = categorizeTokens(toks, componentPrefix)
    const label = variant.charAt(0).toUpperCase() + variant.slice(1)
    groups.push({ variant: label, categories: cats, totalCount: toks.length })
  }

  // If everything ended up in Base (no named variants found), return flat categorization
  if (groups.length === 1 && groups[0].variant === 'Base') {
    return groups
  }

  return groups
}
