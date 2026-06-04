import type { TokensMetadata, MetadataStagedChanges } from '../state/metadata.types'

const METADATA_FILE = '/design-system/tokens.metadata.json'
const STORAGE_KEY = 'geeklego.editor.metadata.v1'

let cachedMetadata: TokensMetadata | null = null
let cachedStagedChanges: MetadataStagedChanges | null = null

export async function commitStagedMetadata(stagedChanges: MetadataStagedChanges): Promise<boolean> {
  try {
    const res = await fetch('/api/merge-metadata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stagedChanges }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function loadMetadata(): Promise<TokensMetadata> {
  if (cachedMetadata) {
    return cachedMetadata
  }

  try {
    const res = await fetch(METADATA_FILE)
    if (!res.ok) {
      return getDefaultMetadata()
    }
    const data = await res.json() as TokensMetadata
    cachedMetadata = normalizeMetadata(data)
    return cachedMetadata
  } catch {
    return getDefaultMetadata()
  }
}

export function loadStagedMetadataFromStorage(): MetadataStagedChanges {
  if (cachedStagedChanges) {
    return cachedStagedChanges
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as MetadataStagedChanges
      cachedStagedChanges = parsed
      return parsed
    }
  } catch {
    // Ignore parse errors
  }

  return {}
}

export function persistStagedMetadata(changes: MetadataStagedChanges): void {
  cachedStagedChanges = changes
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(changes))
  } catch {
    // Ignore storage errors
  }
}

export function getDefaultMetadata(): TokensMetadata {
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    tokens: {},
  }
}

export function normalizeMetadata(raw: TokensMetadata): TokensMetadata {
  const normalized = {
    ...raw,
    tokens: { ...raw.tokens },
  }

  for (const [tokenName, meta] of Object.entries(normalized.tokens)) {
    normalized.tokens[tokenName] = {
      description: meta.description ?? undefined,
      category: meta.category ?? undefined,
      subcategory: meta.subcategory ?? undefined,
      type: meta.type ?? undefined,
      previewAs: meta.previewAs ?? undefined,
      tags: meta.tags ?? [],
      relatedTokens: meta.relatedTokens ?? [],
      deprecated: meta.deprecated ?? false,
      deprecatedBy: meta.deprecatedBy ?? undefined,
    }
  }

  return normalized
}

export function computeCoverage(metadata: TokensMetadata, totalTokens: number): number {
  if (totalTokens === 0) return 0
  const tokensWithDescriptions = Object.values(metadata.tokens).filter(
    t => t.description && t.description.length > 0
  ).length
  return Math.round((tokensWithDescriptions / totalTokens) * 100)
}

export function mergeMetadataWithStaged(
  metadata: TokensMetadata,
  stagedChanges: MetadataStagedChanges
): TokensMetadata {
  const merged = {
    ...metadata,
    tokens: { ...metadata.tokens },
  }

  for (const [tokenName, changes] of Object.entries(stagedChanges)) {
    if (!merged.tokens[tokenName]) {
      merged.tokens[tokenName] = {}
    }
    merged.tokens[tokenName] = {
      ...merged.tokens[tokenName],
      ...changes,
    }
  }

  return merged
}
