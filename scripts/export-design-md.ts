#!/usr/bin/env node
/**
 * Geeklego design.md Exporter (v2 — IR → human-readable Markdown)
 *
 * Reads the W3C DTCG JSON IR at dist/ir/tokens.json (produced by `npm run export-ir`)
 * and emits a human-readable token reference to dist/ir/design-system.md.
 *
 * DESIGN-SYSTEM-AS-CONTRACT: this exporter deliberately consumes the IR file — it does
 * NOT re-parse design-system/v2/*.css. That is the whole point of the IR-as-contract from
 * MULTI-TARGET-ARCHITECTURE.md: every downstream target (design.md, RN, Flutter, Figma)
 * reads the one versioned IR rather than re-deriving the token model. If design.md can be
 * generated from the IR alone, the IR is a sufficient contract.
 *
 * Usage:
 *   npm run export-ir            →  writes dist/ir/tokens.json   (run first — prerequisite)
 *   npm run export-design-md     →  writes dist/ir/design-system.md
 *
 * ─── Document structure ────────────────────────────────────────────────────────────────
 *
 *  • Header — title + a traceability stamp lifted from the IR's
 *    $extensions["com.geeklego.ir"] (version / source / format / modes), so the doc is
 *    pinned to the exact IR it was generated from.
 *
 *  • Primitives (Tier 1) — one GitHub-flavored table per top-level primitive group
 *    (color, spacing, radius, …). Columns: Token · Type · Value. Primitives are leaves,
 *    so they have no alias column. The color group is nested by family (color.brand.900);
 *    the dotted name is shown in full.
 *
 *  • Semantics (Tier 2) — a single table under the `semantic` group. Columns:
 *    Token · Type · Alias · Light · Dark. Alias is the DTCG reference ({color.brand.900});
 *    Light is the resolved literal; Dark is the resolved literal from the modes extension
 *    (blank when the token has no dark override).
 *
 *  • Custom Variants (ext) — a single table under the `ext` group, same columns as
 *    semantics. The one composite (shadow) ext token has no alias, so its Light/Dark show
 *    the literal value.
 *
 * ─── Determinism ───────────────────────────────────────────────────────────────────────
 *
 *  The IR is already emitted with deterministic (numeric-aware sorted) keys, so this
 *  exporter walks it in document order without re-sorting and writes a trailing newline.
 *  There is NO timestamp / Date.now() — running twice produces byte-identical output.
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── File locations (IR in, design.md out — same dir) ──────────────────────────────────
const IR_FILE = resolve(__dirname, '../dist/ir/tokens.json')
const OUT_DIR = resolve(__dirname, '../dist/ir')
const OUT_FILE = resolve(OUT_DIR, 'design-system.md')

const EXT_RESOLVED = 'com.geeklego.resolved'
const EXT_MODES = 'com.geeklego.modes'
const EXT_IR = 'com.geeklego.ir'

// ═══════════════════════════════════════════════════════════════════════════════════════
//  IR shape (the parts we read — mirrors export-ir.ts output)
// ═══════════════════════════════════════════════════════════════════════════════════════

interface IrToken {
  $type: string
  $value: string | number
  $extensions?: {
    [EXT_RESOLVED]?: string | number
    [EXT_MODES]?: { dark?: { $value: string | number; [EXT_RESOLVED]?: string | number } }
    [key: string]: unknown
  }
}
type IrNode = IrToken | IrGroup
interface IrGroup { [segment: string]: IrNode }

interface IrStamp {
  version?: string
  source?: string
  format?: string
  modes?: string[]
}

// Top-level keys that are NOT primitive groups (handled separately).
const NON_PRIMITIVE_KEYS = new Set(['$extensions', 'semantic', 'ext'])

// ═══════════════════════════════════════════════════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════════════════════════════════════════════════

function isToken(node: IrNode): node is IrToken {
  return node != null && typeof node === 'object' && '$value' in node && '$type' in node
}

/** Escape pipes/backticks so a value renders inside a GitHub table cell without breaking it. */
function cell(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return ''
  return String(value).replace(/\|/g, '\\|')
}

/** Render a value as inline code, or empty string when absent. */
function code(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return ''
  return '`' + cell(value) + '`'
}

/** A friendly title for a primitive group key (color → Color, fontFamily → Font Family). */
function groupTitle(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

/**
 * Walk a primitive group recursively, collecting [dottedName, token] in document order.
 * (The IR is pre-sorted, so document order IS the deterministic order.)
 */
function collectTokens(node: IrNode, prefix: string, out: Array<[string, IrToken]>): void {
  if (isToken(node)) {
    out.push([prefix, node])
    return
  }
  for (const key of Object.keys(node)) {
    const next = prefix ? `${prefix}.${key}` : key
    collectTokens(node[key], next, out)
  }
}

/** Resolved literal for a token (com.geeklego.resolved), falling back to its raw $value. */
function resolved(token: IrToken): string {
  const r = token.$extensions?.[EXT_RESOLVED]
  return String(r ?? token.$value)
}

/** The dark resolved literal, or '' when the token has no dark override. */
function darkResolved(token: IrToken): string {
  const dark = token.$extensions?.[EXT_MODES]?.dark
  if (!dark) return ''
  return String(dark[EXT_RESOLVED] ?? dark.$value)
}

/** The DTCG alias reference ({color.brand.900}) when $value is one, else ''. */
function alias(token: IrToken): string {
  return typeof token.$value === 'string' && /^\{.+\}$/.test(token.$value) ? token.$value : ''
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//  Section renderers
// ═══════════════════════════════════════════════════════════════════════════════════════

function renderHeader(stamp: IrStamp): string {
  const lines: string[] = []
  lines.push('# GeekLego v2 — Design System Tokens')
  lines.push('')
  lines.push(
    'Human-readable reference for the GeekLego v2 token system ' +
    '(2-tier: primitives → standard ShadCN/Tailwind semantics, plus `--ext-*` custom variants).',
  )
  lines.push('')
  lines.push(
    '> Generated from the W3C DTCG IR (`dist/ir/tokens.json`) — **not** re-parsed from CSS. ' +
    'Regenerate with `npm run export-ir && npm run export-design-md`.',
  )
  lines.push('')
  lines.push('| IR field | Value |')
  lines.push('| --- | --- |')
  lines.push(`| Version | ${code(stamp.version)} |`)
  lines.push(`| Source | ${code(stamp.source)} |`)
  lines.push(`| Format | ${code(stamp.format)} |`)
  lines.push(`| Modes | ${code((stamp.modes ?? []).join(', '))} |`)
  lines.push('')
  return lines.join('\n')
}

/** Primitives: one table per top-level group. Columns: Token · Type · Value. */
function renderPrimitives(doc: IrGroup): string {
  const lines: string[] = []
  lines.push('## Primitives (Tier 1)')
  lines.push('')
  lines.push(
    "GeekLego's brand palette and scales. Primitives are leaves — they hold resolved " +
    'literals and alias nothing.',
  )
  lines.push('')

  // Document order is already deterministic (IR keys are numeric-aware sorted).
  const groupKeys = Object.keys(doc).filter((k) => !NON_PRIMITIVE_KEYS.has(k))

  for (const key of groupKeys) {
    const group = doc[key]
    if (isToken(group)) continue // defensive: top-level primitives are always groups
    const rows: Array<[string, IrToken]> = []
    collectTokens(group, key, rows)
    if (rows.length === 0) continue

    lines.push(`### ${groupTitle(key)}`)
    lines.push('')
    lines.push('| Token | Type | Value |')
    lines.push('| --- | --- | --- |')
    for (const [name, token] of rows) {
      lines.push(`| ${code(name)} | ${cell(token.$type)} | ${code(resolved(token))} |`)
    }
    lines.push('')
  }
  return lines.join('\n')
}

/**
 * Semantics / ext: a single table with alias + light + dark columns.
 * Used for both the `semantic` and `ext` groups (same token shape).
 */
function renderAliasTable(
  group: IrGroup,
  groupName: string,
  heading: string,
  blurb: string,
): string {
  const lines: string[] = []
  lines.push(heading)
  lines.push('')
  lines.push(blurb)
  lines.push('')

  const rows: Array<[string, IrToken]> = []
  collectTokens(group, groupName, rows)

  lines.push('| Token | Type | Alias | Light | Dark |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const [name, token] of rows) {
    lines.push(
      `| ${code(name)} | ${cell(token.$type)} | ${code(alias(token))} ` +
      `| ${code(resolved(token))} | ${code(darkResolved(token))} |`,
    )
  }
  lines.push('')
  return lines.join('\n')
}

// ═══════════════════════════════════════════════════════════════════════════════════════
//  Main
// ═══════════════════════════════════════════════════════════════════════════════════════

function buildMarkdown(doc: IrGroup): string {
  const stamp = ((doc.$extensions as Record<string, unknown> | undefined)?.[EXT_IR] ??
    {}) as IrStamp

  const sections: string[] = []
  sections.push(renderHeader(stamp))
  sections.push(renderPrimitives(doc))

  if (doc.semantic && !isToken(doc.semantic)) {
    sections.push(
      renderAliasTable(
        doc.semantic,
        'semantic',
        '## Semantics (Tier 2)',
        'Standard ShadCN/Tailwind semantic vocabulary. Each semantic aliases a primitive; ' +
          'the **Light** and **Dark** columns show the resolved literal in each theme ' +
          '(Dark is blank when the token is not re-themed).',
      ),
    )
  }

  if (doc.ext && !isToken(doc.ext)) {
    sections.push(
      renderAliasTable(
        doc.ext,
        'ext',
        '## Custom Variants (`--ext-*`)',
        'Namespaced brand-variant tokens, kept separate from the core semantic set. ' +
          'Each aliases a primitive (the composite shadow token carries a literal value).',
      ),
    )
  }

  // Join sections with a single blank line; ensure exactly one trailing newline.
  return sections.join('\n').replace(/\n+$/, '') + '\n'
}

function main(): void {
  if (!existsSync(IR_FILE)) {
    console.error(
      'Error: IR file not found at dist/ir/tokens.json.\n' +
        '       design.md is generated FROM the IR. Run the IR exporter first:\n\n' +
        '         npm run export-ir\n',
    )
    process.exit(1)
  }

  const doc = JSON.parse(readFileSync(IR_FILE, 'utf-8')) as IrGroup
  const md = buildMarkdown(doc)

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_FILE, md, 'utf-8')

  // Count token rows for the console summary.
  const all: Array<[string, IrToken]> = []
  for (const key of Object.keys(doc)) {
    if (key === '$extensions') continue
    collectTokens(doc[key], key, all)
  }

  console.log('\nGeeklego design.md Exporter (v2 — IR → Markdown)')
  console.log('────────────────────────────────────────────────')
  const stamp = ((doc.$extensions as Record<string, unknown> | undefined)?.[EXT_IR] ??
    {}) as IrStamp
  console.log(`IR version     : ${stamp.version ?? '?'}  (source: ${stamp.source ?? '?'})`)
  console.log(`Tokens listed  : ${all.length}`)
  console.log(`Output         : ${OUT_FILE.replace(resolve(__dirname, '..') + '/', '')}`)
  console.log('✓  design.md written.\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main()
  } catch (err) {
    console.error('Error:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}
