#!/usr/bin/env node
/**
 * Geeklego Token Metadata Generator
 *
 * Reads design-system/geeklego.css and generates/updates
 * design-system/tokens.metadata.json with descriptions, categories,
 * types, and subcategories for every component token found.
 *
 * Usage:
 *   npm run generate-metadata
 *
 * Preserves existing metadata entries and only adds/updates
 * entries for tokens found in the CSS.
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cssPath = resolve(__dirname, '../design-system/geeklego.css')
const metadataPath = resolve(__dirname, '../design-system/tokens.metadata.json')

interface TokenInfo {
  name: string
  component: string
  value: string
}

function inferType(value: string): string {
  if (value.includes('color-') || value.includes('#') || value.includes('rgb') || value.includes('hsl')) return 'color'
  if (value.includes('spacing-') || value.includes('px') || value.includes('rem') || value.includes('em')) return 'spacing'
  if (value.includes('size-')) return 'size'
  if (value.includes('shadow')) return 'shadow'
  if (value.includes('radius')) return 'radius'
  if (value.includes('border') || value.includes('solid') || value.includes('dashed') || value.includes('dotted')) return 'border'
  if (value.includes('font-') || value.includes('line-height') || value.includes('letter-spacing')) return 'typography'
  if (value.includes('duration') || value.includes('ease')) return 'motion'
  if (value.includes('layer') || value.includes('z-index')) return 'layer'
  if (value.includes('opacity')) return 'opacity'
  return 'other'
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function displayName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

function inferState(tokenName: string, component: string): string {
  const suffix = tokenName.replace(`${component}-`, '')
  const statePatterns: Record<string, string> = {
    'hover': 'on hover',
    'active': 'when active/pressed',
    'focus': 'on focus',
    'disabled': 'when disabled',
    'error': 'in error state',
    'loading': 'in loading state',
    'selected': 'when selected',
    'checked': 'when checked',
    'indeterminate': 'when indeterminate',
  }
  for (const [key, desc] of Object.entries(statePatterns)) {
    if (suffix === key || suffix.endsWith(`-${key}`) || suffix.startsWith(`${key}-`)) {
      return desc
    }
  }
  return ''
}

function inferProperty(tokenName: string, component: string): string {
  const suffix = tokenName.replace(`${component}-`, '')
  const propertyPatterns: Record<string, string> = {
    'bg': 'Background color',
    'background': 'Background color',
    'text': 'Text color',
    'color': 'Text color',
    'border': 'Border',
    'radius': 'Border radius',
    'height': 'Height',
    'width': 'Width',
    'size': 'Size',
    'icon': 'Icon size',
    'icon-size': 'Icon size',
    'shadow': 'Shadow',
    'padding': 'Padding',
    'padding-inline': 'Inline padding',
    'padding-block': 'Block padding',
    'gap': 'Gap spacing',
    'spacing': 'Spacing',
    'duration': 'Animation duration',
    'easing': 'Animation easing',
    'opacity': 'Opacity',
    'font-size': 'Font size',
    'line-height': 'Line height',
    'min-width': 'Minimum width',
    'min-height': 'Minimum height',
    'offset': 'Offset',
    'z-index': 'Z-index',
  }
  for (const [key, desc] of Object.entries(propertyPatterns)) {
    if (suffix === key || suffix.startsWith(`${key}-`) || suffix.endsWith(`-${key}`)) {
      return desc
    }
  }
  return 'Property'
}

function findRelatedTokens(tokenName: string, component: string, allTokens: TokenInfo[]): string[] {
  const suffix = tokenName.replace(`${component}-`, '')
  const base = suffix.replace(/-(hover|active|focus|disabled|error|loading|selected|checked|sm|md|lg|xs|xl)$/, '')
  const related: string[] = []
  for (const t of allTokens) {
    if (t.name === tokenName || !t.name.startsWith(component)) continue
    const tSuffix = t.name.replace(`${component}-`, '')
    if (tSuffix.startsWith(base) || base.startsWith(tSuffix)) {
      related.push(`--${t.name}`)
    }
  }
  return related
}

function main() {
  const css = readFileSync(cssPath, 'utf-8')
  const lines = css.split('\n')

  const blockHeader = /\/\*\s+([\w\s]+?)\s+— generated \d{4}-\d{2}-\d{2}\s*\*\//
  const tokenDecl = /^\s*--([\w-]+)\s*:\s*(.*?)\s*;/

  const blocks: Array<{ name: string; tokens: TokenInfo[] }> = []
  let currentBlock: { name: string; tokens: TokenInfo[] } | null = null

  for (const line of lines) {
    const headerMatch = line.match(blockHeader)
    if (headerMatch) {
      if (currentBlock) blocks.push(currentBlock)
      const componentName = headerMatch[1].trim()
      currentBlock = {
        name: componentName.toLowerCase().replace(/\s+/g, '-'),
        tokens: [],
      }
      continue
    }
    if (currentBlock) {
      const tokenMatch = line.match(tokenDecl)
      if (tokenMatch) {
        currentBlock.tokens.push({
          name: tokenMatch[1],
          component: currentBlock.name,
          value: tokenMatch[2],
        })
      }
    }
  }
  if (currentBlock) blocks.push(currentBlock)

  // Read existing metadata to preserve hand-written descriptions
  let existing: Record<string, any> = {}
  try {
    existing = JSON.parse(readFileSync(metadataPath, 'utf-8')).tokens || {}
  } catch {
    // File doesn't exist or is invalid, start fresh
  }

  const merged: Record<string, any> = { ...existing }

  for (const block of blocks) {
    for (const token of block.tokens) {
      if (!merged[token.name]) {
        const componentDisplay = displayName(block.name)
        const stateDesc = inferState(token.name, block.name)
        const propertyDesc = inferProperty(token.name, block.name)
        const statePart = stateDesc ? ` ${stateDesc}` : ''
        merged[token.name] = {
          description: `${propertyDesc} for the ${componentDisplay} component${statePart}`,
          category: 'component',
          subcategory: componentDisplay,
          type: inferType(token.value),
        }
      } else {
        // Update type based on value if not already set
        if (!merged[token.name].type) {
          merged[token.name].type = inferType(token.value)
        }
        if (!merged[token.name].category) {
          merged[token.name].category = 'component'
        }
        if (!merged[token.name].subcategory) {
          merged[token.name].subcategory = displayName(block.name)
        }
      }
    }
  }

  const output = {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    tokens: merged,
  }

  writeFileSync(metadataPath, JSON.stringify(output, null, 2), 'utf-8')

  const newCount = Object.keys(merged).length - Object.keys(existing).length
  console.log(`✓ Metadata generated — ${Object.keys(merged).length} tokens (${newCount > 0 ? `+${newCount} new` : `${newCount === 0 ? 'all existing' : ''}`})`)
  console.log(`  File: ${metadataPath}`)
}

main()
