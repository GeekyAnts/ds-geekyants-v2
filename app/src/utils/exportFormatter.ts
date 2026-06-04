import { structuredPatch } from 'diff'
import type { GeeklegoTokens, ComponentTokenGroup } from '../types'
import { generateCss } from './cssGenerator'
import { generateComponentTokensCss } from './componentTokenParser'
import type { StagedNewToken } from '../state/staging'

/**
 * Generate the original CSS from the base tokens (primitives/semantics + component tokens).
 */
export function generateOriginalCss(tokens: GeeklegoTokens, componentGroups?: ComponentTokenGroup[]): string {
  const base = generateCss(tokens)
  if (!componentGroups || componentGroups.length === 0) return base
  return base + '\n\n' + generateComponentTokensCss(componentGroups)
}

function applyNewTokenToTree(modifiedTokens: GeeklegoTokens, newToken: StagedNewToken): void {
  const { treePath, value } = newToken
  const sem = modifiedTokens.semantics.light as unknown as Record<string, Record<string, unknown>>
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
      if (!sem[treePath.group]) break
      ;(sem[treePath.group] as Record<string, string>)[treePath.key] = value
      break
    case 'semanticFlat':
      if (!sem[treePath.group]) break
      ;(sem[treePath.group] as Record<string, string>)[treePath.key] = value
      break
  }
}

/**
 * Apply staged edits onto a cloned tokens object and return it.
 * Used both for generating merged CSS and for POSTing to /api/save-tokens.
 */
export function generateMergedTokens(
  tokens: GeeklegoTokens,
  stagedEdits: Map<string, string>,
  stagedNewTokens?: ReadonlyMap<string, StagedNewToken>
): GeeklegoTokens {
  if (stagedEdits.size === 0 && (!stagedNewTokens || stagedNewTokens.size === 0)) return structuredClone(tokens)

  const modifiedTokens = structuredClone(tokens)

  for (const [tokenName, stagedValue] of stagedEdits) {
    const parts = tokenName.replace(/^--/, '').split('-')
    if (parts.length < 2) continue

    if (tokenName.startsWith('--color-')) {
      const colorName = parts.slice(1).join('-')
      const isSemanticColor =
        tokenName.startsWith('--color-bg-') ||
        tokenName.startsWith('--color-surface-') ||
        tokenName.startsWith('--color-text-') ||
        tokenName.startsWith('--color-border-') ||
        tokenName.startsWith('--color-action-') ||
        tokenName.startsWith('--color-status-') ||
        tokenName.startsWith('--color-state-') ||
        tokenName.startsWith('--color-data-series-')

      if (isSemanticColor) {
        // --color-action-primary → semantics.light.action.primary
        // --color-data-series-1 → semantics.light.dataSeries['1']
        const semanticMap = modifiedTokens.semantics.light as any
        if (tokenName.startsWith('--color-data-series-')) {
          const key = parts.slice(2).join('-')
          if (semanticMap.dataSeries && key in semanticMap.dataSeries) {
            semanticMap.dataSeries[key] = stagedValue
          }
        } else {
          const semanticPrefix = parts[1] // bg, surface, text, border, action, status, state
          const semanticSuffix = parts.slice(2).join('-')
          if (semanticMap[semanticPrefix] && semanticMap[semanticPrefix][semanticSuffix] !== undefined) {
            semanticMap[semanticPrefix][semanticSuffix] = stagedValue
          }
        }
      } else {
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
      }
    } else if (tokenName.startsWith('--spacing-component-')) {
      const key = parts.slice(3).join('-')
      if (key in modifiedTokens.semantics.light.spacingComponent) {
        modifiedTokens.semantics.light.spacingComponent[key] = stagedValue
      }
    } else if (tokenName.startsWith('--spacing-layout-')) {
      const key = parts.slice(3).join('-')
      if (key in modifiedTokens.semantics.light.spacingLayout) {
        modifiedTokens.semantics.light.spacingLayout[key] = stagedValue
      }
    } else if (tokenName.startsWith('--radius-component-')) {
      const key = parts.slice(3).join('-')
      if (key in modifiedTokens.semantics.light.radiusComponent) {
        modifiedTokens.semantics.light.radiusComponent[key] = stagedValue
      }
    } else if (tokenName.startsWith('--layer-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.semantics.light.layer) {
        modifiedTokens.semantics.light.layer[key] = stagedValue
      }
    } else if (tokenName.startsWith('--border-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.semantics.light.borders) {
        modifiedTokens.semantics.light.borders[key] = stagedValue
      }
    } else if (tokenName.startsWith('--font-size-') || tokenName.startsWith('--font-weight-') ||
               tokenName.startsWith('--line-height-') || tokenName.startsWith('--letter-spacing-')) {
      if (tokenName.startsWith('--font-size-')) {
        const key = parts.slice(2).join('-')
        if (key in modifiedTokens.primitives.fontSize) {
          modifiedTokens.primitives.fontSize[key] = stagedValue
        }
      } else if (tokenName.startsWith('--font-weight-')) {
        const key = parts.slice(2).join('-')
        if (key in modifiedTokens.primitives.fontWeight) {
          modifiedTokens.primitives.fontWeight[key] = parseInt(stagedValue, 10) || 0
        }
      } else if (tokenName.startsWith('--line-height-')) {
        const key = parts.slice(2).join('-')
        if (key in modifiedTokens.primitives.lineHeight) {
          modifiedTokens.primitives.lineHeight[key] = stagedValue
        }
      } else if (tokenName.startsWith('--letter-spacing-')) {
        const key = parts.slice(2).join('-')
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
    } else if (tokenName.startsWith('--shadow-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.semantics.light.shadows) {
        modifiedTokens.semantics.light.shadows[key] = stagedValue
      }
    } else if (tokenName.startsWith('--content-')) {
      const key = parts.slice(1).join('-')
      if (key in modifiedTokens.semantics.light.contentFlexibility) {
        modifiedTokens.semantics.light.contentFlexibility[key] = stagedValue
      }
    } else if (tokenName.startsWith('--size-component-')) {
      const key = parts.slice(3).join('-')
      if (key in modifiedTokens.semantics.light.sizeComponent) {
        modifiedTokens.semantics.light.sizeComponent[key] = stagedValue
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
 * Includes component tokens with staged edits applied so the diff reflects component changes.
 */
export function generateMergedCss(
  tokens: GeeklegoTokens,
  stagedEdits: Map<string, string>,
  stagedNewTokens?: ReadonlyMap<string, StagedNewToken>,
  componentGroups?: ComponentTokenGroup[]
): string {
  const base = generateCss(generateMergedTokens(tokens, stagedEdits, stagedNewTokens))
  if (!componentGroups || componentGroups.length === 0) return base
  const mergedGroups = componentGroups.map(group => ({
    ...group,
    sections: group.sections.map(section => ({
      ...section,
      tokens: section.tokens.map(token => {
        const sv = stagedEdits.get(token.name)
        return sv !== undefined ? { ...token, value: sv } : token
      }),
    })),
  }))
  return base + '\n\n' + generateComponentTokensCss(mergedGroups)
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
