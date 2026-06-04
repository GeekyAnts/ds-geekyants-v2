// ─── Storybook Story URL Mapping ─────────────────────────────────────────────
// Maps token editor component names (camelCase) to Storybook story URLs.
// Component lists are derived from catalog.ts (single source of truth).

import { componentCatalog } from '../../../components/catalog'

function toCamel(pascal: string): string {
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

export type StoryLevel = 'atom' | 'molecule' | 'organism'

export const DEFAULT_STORIES = ['Default', 'Variants', 'Sizes', 'States', 'DarkMode'] as const
export type StoryName = (typeof DEFAULT_STORIES)[number]

// ─── Per-component story overrides ──────────────────────────────────────────
// Only components whose tabs differ from DEFAULT_STORIES need an entry here.
// Keys are camelCase component names.
const STORY_OVERRIDES: Readonly<Record<string, readonly string[]>> = {
  // Atoms
  chatBubble:      ['Default', 'Variants', 'MessageThread', 'States', 'DarkMode'],
  chatMessage:     ['Default', 'Variants', 'Thread',        'States', 'DarkMode'],
  heading:         ['Default', 'Levels',   'Sizes',         'Colors', 'DarkMode'],
  slider:          ['Default', 'Sizes',    'States',        'Range',  'DarkMode'],
  typingIndicator: ['Default', 'WithName', 'InContext',     'States', 'DarkMode'],
  // Molecules
  alertBanner:     ['Default', 'Variants', 'Appearances',   'States', 'DarkMode'],
  popover:         ['Default', 'Placements', 'ContentVariants', 'States', 'DarkMode'],
  toast:           ['Default', 'Variants', 'Appearances',   'States', 'DarkMode'],
  tooltip:         ['Default', 'Placements', 'ContentTypes', 'States', 'DarkMode'],
  // Organisms
  barChart:        ['Default', 'SeriesColors', 'PositiveDelta', 'States', 'DarkMode'],
  drawer:          ['Default', 'Placements', 'Sizes',        'States', 'DarkMode'],
  footer:          ['Default', 'Sizes', 'Loading', 'DarkMode', 'Accessibility'],
  sidebar:         ['Default', 'CollapsedIconRail', 'CollapsibleOffcanvas', 'States', 'DarkMode'],
}

// Component Sets — derived from the canonical catalog.ts
const ATOM_COMPONENTS = new Set(componentCatalog.atoms.map(toCamel))
const MOLECULE_COMPONENTS = new Set(componentCatalog.molecules.map(toCamel))
const ORGANISM_COMPONENTS = new Set(componentCatalog.organisms.map(toCamel))

export const COMPONENT_LEVEL_MAP: Readonly<Record<string, StoryLevel>> = (() => {
  const map: Record<string, StoryLevel> = {}
  for (const name of ATOM_COMPONENTS) map[name] = 'atom'
  for (const name of MOLECULE_COMPONENTS) map[name] = 'molecule'
  for (const name of ORGANISM_COMPONENTS) map[name] = 'organism'
  return map
})()

const TIER_LABEL: Record<StoryLevel, string> = {
  atom: 'Atoms',
  molecule: 'Molecules',
  organism: 'Organisms',
}

/** Converts PascalCase/camelCase story name to Storybook kebab-case ID segment.
 *  'DarkMode' → 'dark-mode', 'Default' → 'default', 'Sizes' → 'sizes'
 */
function toStorySegment(storyName: string): string {
  return storyName
    .replace(/([A-Z])/g, (m, l, offset) => (offset > 0 ? '-' : '') + l.toLowerCase())
    .toLowerCase()
}

/**
 * Converts componentName + level + storyName to a Storybook story ID.
 *
 * Storybook generates IDs by lowercasing the full title string (no word separators inserted).
 *   'button'    + 'atom'     + 'Default'  → 'atoms-button--default'
 *   'emptyState'+ 'atom'     + 'DarkMode' → 'atoms-emptystate--darkmode'
 *   'areaChart' + 'organism' + 'Variants' → 'organisms-areachart--variants'
 *
 * Accepts both camelCase and PascalCase componentName.
 */
export function componentToStoryId(
  componentName: string,
  level: string,
  storyName: string
): string {
  const camel = toCamel(componentName)
  const resolvedLevel = (level in TIER_LABEL ? level : COMPONENT_LEVEL_MAP[camel]) as StoryLevel | undefined
  const tier = resolvedLevel ? TIER_LABEL[resolvedLevel] : 'Atoms'
  const pascalName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  // Storybook lowercases "Atoms/EmptyState" → "atoms-emptystate", no hyphen between word boundaries
  const storyId = `${tier.toLowerCase()}-${pascalName.toLowerCase()}--${toStorySegment(storyName)}`
  return storyId
}

/**
 * Returns the full Storybook iframe URL for a given story ID.
 */
export function getStoryUrl(storyId: string, port = 6006): string {
  return `http://localhost:${port}/iframe.html?id=${storyId}&viewMode=story`
}

/**
 * Returns the list of story names available in the story picker for a component.
 * Returns an empty array for components not in COMPONENT_LEVEL_MAP (triggers no-preview state).
 * Accepts both camelCase and PascalCase componentName.
 * Uses per-component overrides from STORY_OVERRIDES when the component deviates from defaults.
 */
export function getAvailableStories(componentName: string): readonly string[] {
  const camel = toCamel(componentName)
  if (!(camel in COMPONENT_LEVEL_MAP)) return []
  return STORY_OVERRIDES[camel] ?? DEFAULT_STORIES
}

/**
 * Returns true if the component has Storybook stories available.
 * Accepts both camelCase and PascalCase componentName.
 */
export function hasStorybookStory(componentName: string): boolean {
  return toCamel(componentName) in COMPONENT_LEVEL_MAP
}
