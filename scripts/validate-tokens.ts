#!/usr/bin/env node
/**
 * Geeklego Token Validator
 *
 * Reads design-system/geeklego.css and checks that every var(--name)
 * reference has a corresponding --name: declaration somewhere in the file.
 *
 * Usage:
 *   npm run validate-tokens
 *
 * Exits 0 if all references are valid, 1 if broken refs are found.
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'node:fs'
import { promisify } from 'node:util'
const globAsync = promisify(glob)

const __dirname = dirname(fileURLToPath(import.meta.url))
const cssPath = resolve(__dirname, '../design-system/geeklego.css')

export function validateCssTokens(css: string): {
  definedCount: number
  broken: Array<{ name: string; line: number }>
} {
  // Collect all defined token names (--name: declarations)
  const defined = new Set<string>()
  const defineRegex = /--([\w-]+)\s*:/g
  let match: RegExpExecArray | null
  while ((match = defineRegex.exec(css)) !== null) {
    defined.add(match[1])
  }

  // Collect all var(--name) references, report first occurrence of each broken one
  const broken: Array<{ name: string; line: number }> = []
  const reported = new Set<string>()
  const lines = css.split('\n')
  lines.forEach((line, i) => {
    const varRegex = /var\(--([\w-]+)\)/g
    let m: RegExpExecArray | null
    while ((m = varRegex.exec(line)) !== null) {
      const name = m[1]
      if (!defined.has(name) && !reported.has(name)) {
        broken.push({ name, line: i + 1 })
        reported.add(name)
      }
    }
  })

  return { definedCount: defined.size, broken }
}

export interface ComponentRef { filePath: string; content: string }
export interface BrokenComponentRef { name: string; file: string; line: number }

const TAILWIND_INTERNAL_PREFIXES = ['tw-']

const PRIMITIVE_TOKEN_PREFIXES = [
  'color-brand-', 'color-neutral-', 'color-success-', 'color-warning-',
  'color-error-', 'color-info-', 'color-slate-', 'color-gray-',
  'color-blue-', 'color-green-', 'color-red-', 'color-yellow-',
  'color-orange-', 'color-purple-', 'color-pink-', 'color-cyan-', 'color-teal-',
  'spacing-0', 'spacing-1', 'spacing-2', 'spacing-3', 'spacing-4',
  'spacing-5', 'spacing-6', 'spacing-7', 'spacing-8', 'spacing-9',
  'spacing-10', 'spacing-11', 'spacing-12', 'spacing-14', 'spacing-16',
  'spacing-20', 'spacing-24', 'spacing-28', 'spacing-30', 'spacing-32',
  'spacing-36', 'spacing-40', 'spacing-44', 'spacing-48', 'spacing-52',
  'spacing-56', 'spacing-60', 'spacing-64', 'spacing-72', 'spacing-80',
  'spacing-96',
  'font-size-', 'font-weight-', 'font-family-sans', 'font-family-mono',
  'line-height-', 'letter-spacing-',
]

function isPrimitiveRef(name: string): boolean {
  if (name.startsWith('spacing-')) {
    const rest = name.slice(8)
    return (/^-?$/.test(rest) || (/^component-/.test(rest) === false && /^layout-/.test(rest) === false && /^raw-/.test(rest) === false))
  }
  return PRIMITIVE_TOKEN_PREFIXES.some(prefix => name.startsWith(prefix))
}

// Known property prefixes that should NOT appear at the start of a component token name.
// Component tokens must start with the component name: --{component}-{property}-{scale}.
const MISPLACED_PREFIXES = ['size-', 'color-', 'spacing-', 'icon-', 'radius-', 'border-', 'shadow-', 'text-']

function pascalToKebab(str: string): string {
  return String(str).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Dynamic CSS custom props set via inline styles (e.g., style={{ '--var': value }})
// These should not appear in geeklego.css as they're computed at runtime
const INLINE_STYLE_VARS = new Set([
  'spectrum-hue-color',
  'track-bg',
  'swatch-value',
])

export function validateNoDuplicateDeclarations(css: string): Array<{ prop: string; firstLine: number; dupLine: number; firstValue: string; dupValue: string; selector: string }> {
  const duplicates: Array<{ prop: string; firstLine: number; dupLine: number; firstValue: string; dupValue: string; selector: string }> = []
  const lines = css.split('\n')

  let depth = 0
  let currentBlockProps: Record<string, { line: number; value: string }> = {}
  let currentSelector = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const opens = (line.match(/\{/g) || []).length
    const closes = (line.match(/\}/g) || []).length

    if (opens > 0 && depth === 0) {
      currentBlockProps = {}
      const trimmed = line.trim()
      const braceIndex = trimmed.indexOf('{')
      currentSelector = braceIndex > 0 ? trimmed.slice(0, braceIndex).trim() : trimmed
    }
    depth += opens

    if (depth >= 1) {
      const match = line.match(/^\s*(--[\w-]+)\s*:\s*(.*?)\s*;/)
      if (match) {
        const prop = match[1]
        const value = match[2]
        if (currentBlockProps[prop] !== undefined) {
          duplicates.push({
            prop,
            firstLine: currentBlockProps[prop].line + 1,
            dupLine: i + 1,
            firstValue: currentBlockProps[prop].value,
            dupValue: value,
            selector: currentSelector,
          })
        }
        currentBlockProps[prop] = { line: i, value }
      }
    }

    depth -= closes
    if (closes > 0 && depth === 0) {
      currentBlockProps = {}
    }
  }

  return duplicates
}

export function validateNoCrossBlockComponentDuplicates(css: string): Array<{ prop: string; componentName: string; blockA: { selector: string; line: number; value: string }; blockB: { selector: string; line: number; value: string } }> {
  const crossDups: Array<{ prop: string; componentName: string; blockA: { selector: string; line: number; value: string }; blockB: { selector: string; line: number; value: string } }> = []
  const lines = css.split('\n')

  const componentBlockRegex = /\/\*\s+([\w\s]+?)\s+— generated \d{4}-\d{2}-\d{2}\s*\*\//g
  const blocks: Array<{ name: string; startLine: number; endLine: number; selector: string; props: Record<string, { line: number; value: string }> }> = []

  let currentHeader: { name: string; startLine: number } | null = null
  let depth = 0
  let blockStart = -1
  let currentSelector = ''
  let currentProps: Record<string, { line: number; value: string }> = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const headerMatch = componentBlockRegex.exec(line)
    if (headerMatch) {
      if (currentHeader && depth === 0) {
        blocks.push({ ...currentHeader, endLine: i, selector: currentSelector, props: currentProps })
      }
      componentBlockRegex.lastIndex = 0
      const nameMatch = line.match(/\/\*\s+([\w\s]+?)\s+— generated/)
      if (nameMatch) {
        currentHeader = { name: nameMatch[1].trim(), startLine: i }
      }
    }

    if (currentHeader) {
      const opens = (line.match(/\{/g) || []).length
      const closes = (line.match(/\}/g) || []).length

      if (opens > 0 && depth === 0) {
        const trimmed = line.trim()
        const braceIndex = trimmed.indexOf('{')
        currentSelector = braceIndex > 0 ? trimmed.slice(0, braceIndex).trim() : trimmed
        currentProps = {}
      }
      depth += opens

      if (depth >= 1) {
        const match = line.match(/^\s*(--[\w-]+)\s*:\s*(.*?)\s*;/)
        if (match) {
          currentProps[match[1]] = { line: i, value: match[2] }
        }
      }

      depth -= closes
      if (closes > 0 && depth === 0) {
        blocks.push({ ...currentHeader, endLine: i, selector: currentSelector, props: currentProps })
        currentHeader = null
      }
    }
  }

  if (currentHeader && blocks.length > 0 && blocks[blocks.length - 1].name !== currentHeader.name) {
    blocks.push({ ...currentHeader, endLine: lines.length - 1, selector: currentSelector, props: currentProps })
  }

  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[i].name.toLowerCase() !== blocks[j].name.toLowerCase()) continue
      for (const [prop, aInfo] of Object.entries(blocks[i].props)) {
        if (prop in blocks[j].props) {
          crossDups.push({
            prop,
            componentName: blocks[i].name,
            blockA: { selector: blocks[i].selector, line: aInfo.line + 1, value: aInfo.value },
            blockB: { selector: blocks[j].selector, line: blocks[j].props[prop].line + 1, value: blocks[j].props[prop].value },
          })
        }
      }
    }
  }

  return crossDups
}

export function validateTokenNamingConvention(css: string): string[] {
  const warnings: string[] = []

  // Regex to extract component blocks with their contents
  // Matches: /* ComponentName — generated YYYY-MM-DD */ followed by tokens up to the next /* or end of file
  const componentBlockRegex = /\/\*\s+[\w\s]+ — generated \d{4}-\d{2}-\d{2}\s*\*\/([\s\S]*?)(?=\/\*|$)/g
  const blockNameRegex = /\/\*\s+([\w\s]+?)\s+— generated/

  let componentMatch: RegExpExecArray | null
  while ((componentMatch = componentBlockRegex.exec(css)) !== null) {
    const header = componentMatch[0]
    const blockContent = componentMatch[1]

    // Extract component name from block header
    const headerNameMatch = header.match(blockNameRegex)
    if (!headerNameMatch) continue

    // Now scan tokens ONLY within this component block
    const defineRegex = /--([\w-]+)\s*:/g
    let tokenMatch: RegExpExecArray | null
    while ((tokenMatch = defineRegex.exec(blockContent)) !== null) {
      const name = tokenMatch[1]

      // Skip inline style vars - they don't appear in CSS component blocks
      if (INLINE_STYLE_VARS.has(name)) continue

      // Skip legitimate patterns where the whole token IS a semantic concept, not a component
      const isLegitimateSemantic = /[a-z]+-(icon|component|layer)$/.test(name)
      if (isLegitimateSemantic) continue

      // Flag ANY token inside a component block that starts with a MISPLACED_PREFIX,
      // regardless of whether it ends with a size scale. This catches both
      // `--size-avatar-md` and `--color-picker-bg` patterns.
      for (const prefix of MISPLACED_PREFIXES) {
        if (name.startsWith(prefix)) {
          warnings.push(`  Naming violation: --${name} (property prefix '${prefix}' before component name — use --{component}-{property} ordering)`)
          break
        }
      }

      // Check cross-contamination: token prefix (kebab-case) must match block name
      const kebabBlockName = pascalToKebab(headerNameMatch[1])
      if (!name.startsWith(kebabBlockName + '-') && name !== kebabBlockName) {
        warnings.push(`  Cross-contamination: token --${name} inside '${headerNameMatch[1]}' block (expected --${kebabBlockName}-* prefix — belongs in its own block)`)
      }
    }
  }

  return warnings
}

export function validateComponentTokenRefs(
  css: string,
  componentFiles: ComponentRef[]
): { broken: BrokenComponentRef[] } {
  // Build the set of all defined token names from geeklego.css
  const defined = new Set<string>()
  const defineRegex = /--([\w-]+?)\s*?(?::|;)/g
  let m: RegExpExecArray | null
  while ((m = defineRegex.exec(css)) !== null) {
    defined.add(m[1])
  }

  const broken: BrokenComponentRef[] = []

  for (const { filePath, content } of componentFiles) {
    const lines = content.split('\n')
    // Track if we're inside a style={{ ... }} block
    let inStyleBlock = false
    
    lines.forEach((line, i) => {
      // Check if entering or inside a style block
      if (line.includes('style={{') || inStyleBlock) {
        inStyleBlock = true
        // Check if leaving style block
        if (line.includes('} as') || (line.includes('}') && line.trim().endsWith('}'))) {
          // Only end style block if this is closing the style prop, not just any }
          if (line.includes('} as') || line.match(/\}\s*(?=\s*[}>])/)) {
            inStyleBlock = false
          }
        }
      }
      
      const varRegex = /var\(--([\w-]+)\)/g
      let match: RegExpExecArray | null
      while ((match = varRegex.exec(line)) !== null) {
        const name = match[1]
        // Skip Tailwind internals
        if (TAILWIND_INTERNAL_PREFIXES.some(prefix => name.startsWith(prefix))) continue
        // Skip icon component tokens (e.g., --size-icon-sm) - used as react props to lucide-react
        if (/[a-z]+-(icon|component|layer)-(xs|sm|md|lg|xl|2xl|3xl)$/.test(name)) continue
        // Skip inline style CSS custom properties set dynamically via React inline styles
        if (INLINE_STYLE_VARS.has(name)) continue
        if (!defined.has(name)) {
          broken.push({ name, file: filePath, line: i + 1 })
        }
      }
    })
  }

  return { broken }
}
export function validateNoPrimitiveRefsInComponents(
  componentFiles: ComponentRef[]
): { violations: BrokenComponentRef[] } {
  const violations: BrokenComponentRef[] = []

  for (const { filePath, content } of componentFiles) {
    const lines = content.split('\n')
    lines.forEach((line, i) => {
      const varRegex = /var\(--([\w-]+)\)/g
      let match: RegExpExecArray | null
      while ((match = varRegex.exec(line)) !== null) {
        const name = match[1]
        if (isPrimitiveRef(name)) {
          violations.push({ name, file: filePath, line: i + 1 })
        }
      }
    })
  }

  return { violations }
}

export interface HardcodedViolation {
  file: string
  line: number
  value: string
}

export function validateNoHardcodedValuesInComponents(
  componentFiles: ComponentRef[]
): { violations: HardcodedViolation[] } {
  const violations: HardcodedViolation[] = []

  // After stripping var(), detect:
  // 1. Tailwind arbitrary values with hardcoded units: w-[40px], gap-[8rem]
  //    Note: [a-zA-Z] prefix avoids consuming digits that (\d+) should capture
  const BRACKET_PX = /\[[a-zA-Z\s\-\/]*(\d+)(px)[a-zA-Z\s\-\/]*\]/
  const BRACKET_REM = /\[[a-zA-Z\s\-\/]*(\d+(?:\.\d+)?)(rem)[a-zA-Z\s\-\/]*\]/
  const BRACKET_HEX = /\[[^\]]*#([0-9a-fA-F]{3,8})[^\]]*\]/

  // 2. Inline style string values: 'calc(TOKEN + 8px)', '2rem', '#6366f1'
  //    Catches hardcoded values not in a bracket context (e.g. inline style props)
  const INLINE_PX = /['"][^'"]*(\d+)(px)[^'"]*['"]/
  const INLINE_REM = /['"][^'"]*(\d+(?:\.\d+)?)(rem)[^'"]*['"]/
  const INLINE_HEX = /['"][^'"]*#([0-9a-fA-F]{3,8})[^'"]*['"]/

  for (const { filePath, content } of componentFiles) {
    const lines = content.split('\n')
    lines.forEach((line, i) => {
      const trimmed = line.trim()
      // Skip comment-only lines
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return

      // Strip var() refs to avoid false positives on legitimate token usage
      const stripped = line.replace(/var\(--[\w-]+\)/g, 'TOKEN')
      const seen = new Set<string>()

      // Check bracket-based patterns (Tailwind arbitrary values)
      const pxB = stripped.match(BRACKET_PX)
      if (pxB && pxB[1] !== '0') seen.add(pxB[1] + pxB[2])
      const remB = stripped.match(BRACKET_REM)
      if (remB) seen.add(remB[1] + remB[2])
      const hexB = stripped.match(BRACKET_HEX)
      if (hexB) seen.add('#' + hexB[1])

      // Check inline string values (may overlap with brackets in className)
      const pxS = stripped.match(INLINE_PX)
      if (pxS && pxS[1] !== '0') seen.add(pxS[1] + pxS[2])
      const remS = stripped.match(INLINE_REM)
      if (remS) seen.add(remS[1] + remS[2])
      const hexS = stripped.match(INLINE_HEX)
      if (hexS) seen.add('#' + hexS[1])

      for (const v of seen) {
        violations.push({ file: filePath, line: i + 1, value: v })
      }
    })
  }

  return { violations }
}

// Run when executed directly (ESM check for main module)
if (import.meta.url === `file://${process.argv[1]}`) {
async function main() {
  try {
    const css = readFileSync(cssPath, 'utf-8')
    const { definedCount, broken } = validateCssTokens(css)

    console.log('\nGeeklego Token Validator')
    console.log('─────────────────────────')
    console.log(`Defined tokens : ${definedCount}`)

    if (broken.length === 0) {
      console.log('✓  All token references are valid.\n')
    } else {
      console.log(`\n✕  ${broken.length} broken reference(s) found:\n`)
      broken.forEach(({ name, line }) => {
        console.log(`   var(--${name})   (first seen: line ${line})`)
      })
      console.log(
        '\nFix: update the component token block in design-system/geeklego.css\n' +
        'to reference the correct semantic token names.\n'
      )
      process.exit(1)
    }

    // Cross-file validation: scan all component .tsx files for var() references
    const componentGlob = resolve(__dirname, '../components/**/*.tsx')
    const componentFilePaths = (await globAsync(componentGlob)) as string[]

    const refs: ComponentRef[] = await Promise.all(
      componentFilePaths.map(async (fp: string) => ({
        filePath: fp.replace(resolve(__dirname, '..') + '/', ''),
        content: await readFileSync(fp, 'utf-8'),
      }))
    )

    const { broken: componentBroken } = validateComponentTokenRefs(css, refs)

    if (componentBroken.length > 0) {
      console.log(`\n✕  ${componentBroken.length} broken token reference(s) in component files:\n`)
      componentBroken.forEach(({ name, file, line }) => {
        console.log(`   var(--${name})   in ${file}:${line}`)
      })
      process.exit(1)
    } else {
      console.log('✓  All component var() references are valid.\n')
    }

    // Naming convention check (hard failure if violations found)
    const namingWarnings = validateTokenNamingConvention(css)
    if (namingWarnings.length > 0) {
      console.log(`\n✕  ${namingWarnings.length} naming convention violation(s) found:\n`)
      console.log('Component tokens must use --{component}-{property}-{scale} format.')
      console.log('Example correct:   --avatar-size-md')
      console.log('Example wrong:     --size-avatar-md\n')
      namingWarnings.forEach(w => console.log(w))
      process.exit(1)
    } else {
      console.log('\n✓  Naming convention check passed.\n')
    }

    // Within-block duplicate detection
    const duplicates = validateNoDuplicateDeclarations(css)
    if (duplicates.length > 0) {
      console.log(`\n✕  ${duplicates.length} duplicate declaration(s) found within component blocks:\n`)
      console.log('Each --component-property must be defined exactly once per CSS block.')
      console.log('The first (earlier) definition is dead code — only the last one is used.\n')
      for (const d of duplicates) {
        console.log(`   ${d.prop}`)
        console.log(`     Line ${d.firstLine}: "${d.firstValue}"`)
        console.log(`     Line ${d.dupLine}:  "${d.dupValue}"  ← wins (keep this)`)
      }
      console.log('\nFix: remove the earlier line(s) or run: node scripts/dedup-component-tokens.cjs')
      process.exit(1)
    } else {
      console.log('✓  No duplicate declarations found within blocks.\n')
    }

    // Cross-block duplicate detection — catches same property in multiple component blocks
    const crossDups = validateNoCrossBlockComponentDuplicates(css)
    if (crossDups.length > 0) {
      console.log(`\n✕  ${crossDups.length} cross-block duplicate token definition(s) found:\n`)
      console.log('A component token must be defined only once per component block.')
      console.log('Never create a separate [data-theme="dark"] block at the component level.\n')
      for (const d of crossDups) {
        console.log(`   --${d.prop}  (component: "${d.componentName}")`)
        console.log(`     Block 1 (${d.blockA.selector}): Line ${d.blockA.line} — "${d.blockA.value}"`)
        console.log(`     Block 2 (${d.blockB.selector}): Line ${d.blockB.line} — "${d.blockB.value}"`)
      }
      console.log('\nFix: merge the duplicate into a single :root, [data-theme="dark"] block.')
      console.log('If the value differs per theme, create the difference at the semantic level.\n')
      process.exit(1)
    } else {
      console.log('✓  No cross-block duplicate definitions found.\n')
    }
    // Pass 5: Primitive token reference check
    const { violations } = validateNoPrimitiveRefsInComponents(refs)
    if (violations.length > 0) {
      console.log(`\n\u2715  ${violations.length} primitive token reference(s) in component files (must use semantic/component tokens instead):`)
      console.log('   Token chain rule: primitive \u2192 semantic \u2192 component. Never skip a level.')
      violations.forEach(({ name, file, line }) => {
        console.log(`   var(--${name})   in ${file}:${line}`)
      })
      process.exit(1)
    } else {
      console.log('\u2713  No primitive token references in component files.\n')
    }

    // Pass 6: Hardcoded value detection
    const { violations: hardcodedViolations } = validateNoHardcodedValuesInComponents(refs)
    if (hardcodedViolations.length > 0) {
      console.log(`\n\u2715  ${hardcodedViolations.length} hardcoded value(s) in component files (must use tokens):`)
      console.log('   Every value must come from a token \u2014 never hardcode px, rem, or hex.\n')
      hardcodedViolations.forEach(({ file, line, value }) => {
        console.log(`   "${value}"   in ${file}:${line}`)
      })
      process.exit(1)
    } else {
      console.log('\u2713  No hardcoded px/rem/hex values in component files.\n')
    }
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

main()
}
