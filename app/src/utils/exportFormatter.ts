import { structuredPatch } from 'diff'
import type { GeeklegoTokensV2 } from '../types'
import { generateGeeklegoV2 } from './cssGenerator'
import type { StagedNewToken } from '../state/staging'

/** Concatenate the three v2 file strings into one combined CSS string for diffing/export. */
function combineV2Css(tokens: GeeklegoTokensV2): string {
  const { primitives, semantics, dark } = generateGeeklegoV2(tokens)
  return [primitives, semantics, dark].join('\n\n')
}

/**
 * Generate the original CSS from the base tokens (v2: primitives + flat semantics + dark).
 */
export function generateOriginalCss(tokens: GeeklegoTokensV2): string {
  return combineV2Css(tokens)
}

function applyNewTokenToTree(modifiedTokens: GeeklegoTokensV2, newToken: StagedNewToken): void {
  const { treePath, value } = newToken
  const sem = modifiedTokens.semantics.light
  const prims = modifiedTokens.primitives as unknown as Record<string, Record<string, unknown>>

  switch (treePath.kind) {
    case 'primitiveColor':
      if (!modifiedTokens.primitives.colors[treePath.family]) {
        modifiedTokens.primitives.colors[treePath.family] = {}
      }
      modifiedTokens.primitives.colors[treePath.family][treePath.shade] = value
      break
    case 'primitiveFlat': {
      const cat = treePath.category
      if (!prims[cat]) break
      const numericCats = ['fontWeight', 'opacity', 'zIndex']
      if (numericCats.includes(cat)) {
        const num = cat === 'opacity' ? parseFloat(value) : parseInt(value, 10)
        prims[cat][treePath.key] = isNaN(num) ? value : num
      } else {
        prims[cat][treePath.key] = value
      }
      break
    }
    case 'semanticColorGroup':
    case 'semanticFlat':
      // v2 flat semantics: the staged new semantic is keyed directly by its bare key.
      sem[treePath.key] = value
      break
  }
}

/**
 * Apply staged edits onto a cloned tokens object and return it.
 * Used both for generating merged CSS and for POSTing to /api/save-tokens.
 */
export function generateMergedTokens(
  tokens: GeeklegoTokensV2,
  stagedEdits: Map<string, string>,
  stagedNewTokens?: ReadonlyMap<string, StagedNewToken>
): GeeklegoTokensV2 {
  if (stagedEdits.size === 0 && (!stagedNewTokens || stagedNewTokens.size === 0)) return structuredClone(tokens)

  const modifiedTokens = structuredClone(tokens)

  for (const [tokenName, stagedValue] of stagedEdits) {
    const parts = tokenName.replace(/^--/, '').split('-')
    if (parts.length < 2) continue

    // v2 flat semantics: a staged edit keyed by the CSS name `--<semanticKey>` maps
    // directly onto modifiedTokens.semantics.light[semanticKey]. Match these first.
    const semanticKey = tokenName.replace(/^--/, '')
    if (semanticKey in modifiedTokens.semantics.light) {
      modifiedTokens.semantics.light[semanticKey] = stagedValue
      continue
    }

    if (tokenName.startsWith('--color-')) {
      const colorName = parts.slice(1).join('-')
      // Primitive color: --color-brand-500 → primitives.colors.brand['500']
      for (const [family, shades] of Object.entries(modifiedTokens.primitives.colors)) {
        if (colorName.startsWith(family + '-')) {
          const shade = colorName.slice(family.length + 1)
          if (shade in shades) {
            modifiedTokens.primitives.colors[family][shade] = stagedValue
          }
          break
        }
      }
    } else if (tokenName.startsWith('--text-') || tokenName.startsWith('--font-weight-') ||
               tokenName.startsWith('--font-') ||
               tokenName.startsWith('--leading-') || tokenName.startsWith('--tracking-')) {
      // Tailwind typography namespaces. --font-weight-* checked BEFORE bare --font-* (family).
      if (tokenName.startsWith('--text-')) {
        const key = parts.slice(1).join('-')
        if (key in modifiedTokens.primitives.fontSize) {
          modifiedTokens.primitives.fontSize[key] = stagedValue
        }
      } else if (tokenName.startsWith('--font-weight-')) {
        const key = parts.slice(2).join('-')
        if (key in modifiedTokens.primitives.fontWeight) {
          modifiedTokens.primitives.fontWeight[key] = parseInt(stagedValue, 10) || 0
        }
      } else if (tokenName.startsWith('--font-')) {
        const key = parts.slice(1).join('-')
        if (key in modifiedTokens.primitives.fontFamily) {
          modifiedTokens.primitives.fontFamily[key] = stagedValue
        }
      } else if (tokenName.startsWith('--leading-')) {
        const key = parts.slice(1).join('-')
        if (key in modifiedTokens.primitives.lineHeight) {
          modifiedTokens.primitives.lineHeight[key] = stagedValue
        }
      } else if (tokenName.startsWith('--tracking-')) {
        const key = parts.slice(1).join('-')
        if (key in modifiedTokens.primitives.letterSpacing) {
          modifiedTokens.primitives.letterSpacing[key] = stagedValue
        }
      }
    } else if (tokenName.startsWith('--duration-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.primitives.duration) {
        modifiedTokens.primitives.duration[key] = stagedValue
      }
    } else if (tokenName.startsWith('--ease-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.primitives.easing) {
        modifiedTokens.primitives.easing[key] = stagedValue
      }
    } else if (tokenName.startsWith('--z-index-')) {
      const key = parts.slice(2).join('-')
      if (key in modifiedTokens.primitives.zIndex) {
        modifiedTokens.primitives.zIndex[key] = parseInt(stagedValue, 10) || 0
      }
    } else if (tokenName.startsWith('--opacity-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.primitives.opacity) {
        modifiedTokens.primitives.opacity[key] = parseFloat(stagedValue) || 0
      }
    } else if (tokenName.startsWith('--spacing-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.primitives.spacing) {
        modifiedTokens.primitives.spacing[key] = stagedValue
      }
    } else if (tokenName.startsWith('--radius-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.primitives.radius) {
        modifiedTokens.primitives.radius[key] = stagedValue
      }
    } else if (tokenName.startsWith('--size-icon-') || tokenName.startsWith('--size-')) {
      const key = parts.slice(parts[1] === 'icon' ? 3 : 1).join('-')
      if (key in modifiedTokens.primitives.sizeScale) {
        modifiedTokens.primitives.sizeScale[key] = stagedValue
      }
    } else if (tokenName.startsWith('--icon-size-')) {
      const key = parts.slice(2).join('-')
      if (key in modifiedTokens.primitives.iconSize) {
        modifiedTokens.primitives.iconSize[key] = stagedValue
      }
    }
  }

  if (stagedNewTokens) {
    for (const [, newToken] of stagedNewTokens) {
      applyNewTokenToTree(modifiedTokens, newToken)
    }
  }

  return modifiedTokens
}

/**
 * Generate the merged CSS by applying staged edits on top of the original tokens.
 */
export function generateMergedCss(
  tokens: GeeklegoTokensV2,
  stagedEdits: Map<string, string>,
  stagedNewTokens?: ReadonlyMap<string, StagedNewToken>
): string {
  return combineV2Css(generateMergedTokens(tokens, stagedEdits, stagedNewTokens))
}

/**
 * Generate a unified diff string between original and merged CSS.
 */
export function generateCssDiff(
  original: string,
  merged: string,
  fileName: string = 'geeklego.css'
) {
  return structuredPatch(fileName, fileName, original, merged, undefined, undefined, {
    context: 3,
  })
}

/**
 * Format a structured patch into a human-readable diff string.
 */
export function formatDiff(patch: ReturnType<typeof generateCssDiff>): string {
  if (patch.hunks.length === 0) return ''

  const lines: string[] = []
  for (const hunk of patch.hunks) {
    lines.push(`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`)
    for (const line of hunk.lines) {
      if (line.startsWith('-')) {
        lines.push(`< ${line.slice(1)}`)
      } else if (line.startsWith('+')) {
        lines.push(`> ${line.slice(1)}`)
      } else {
        lines.push(`  ${line.slice(1)}`)
      }
    }
    lines.push('')
  }
  return lines.join('\n')
}

/**
 * Generate a unified diff with structured hunks for rendering.
 */
export function getDiffHunks(
  original: string,
  merged: string
): Array<{
  oldStart: number
  oldLines: number
  newStart: number
  newLines: number
  lines: Array<{ type: 'added' | 'removed' | 'context'; content: string }>
}> {
  const patch = generateCssDiff(original, merged)
  return patch.hunks.map((hunk) => ({
    oldStart: hunk.oldStart,
    oldLines: hunk.oldLines,
    newStart: hunk.newStart,
    newLines: hunk.newLines,
    lines: hunk.lines.map((line) => {
      if (line.startsWith('-')) {
        return { type: 'removed' as const, content: line.slice(1) }
      } else if (line.startsWith('+')) {
        return { type: 'added' as const, content: line.slice(1) }
      } else {
        return { type: 'context' as const, content: line.slice(1) }
      }
    }),
  }))
}
