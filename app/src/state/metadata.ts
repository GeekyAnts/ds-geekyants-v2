import { useState, useEffect, useCallback } from 'react'
import type { TokenMetadata, TokensMetadata, MetadataStagedChanges } from './metadata.types'
import {
  loadMetadata,
  loadStagedMetadataFromStorage,
  persistStagedMetadata,
  mergeMetadataWithStaged,
  computeCoverage,
} from './metadataLoader'

let onMetadataChangeCallbacks: (() => void)[] = []

export function subscribeToMetadataChanges(callback: () => void): () => void {
  onMetadataChangeCallbacks.push(callback)
  return () => {
    onMetadataChangeCallbacks = onMetadataChangeCallbacks.filter(cb => cb !== callback)
  }
}

function notifyMetadataChanges(): void {
  for (const callback of onMetadataChangeCallbacks) {
    callback()
  }
}

export function useMetadata(): {
  metadata: TokensMetadata
  stagedChanges: MetadataStagedChanges
  coverage: number
  setMetadataDescription: (tokenName: string, description: string) => void
  clearDescription: (tokenName: string) => void
} {
  const [metadata, setMetadata] = useState<TokensMetadata>(() => getDefaultMetadata())
  const [stagedChanges, setStagedChanges] = useState<MetadataStagedChanges>(() => loadStagedMetadataFromStorage())
  const [coverage, setCoverage] = useState(0)

  function getDefaultMetadata(): TokensMetadata {
    return {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      tokens: {},
    }
  }

  useEffect(() => {
    loadMetadata().then(initialMetadata => {
      setMetadata(initialMetadata)
      const totalTokens = Object.keys(initialMetadata.tokens).length
      setCoverage(computeCoverage(initialMetadata, totalTokens))
    })
  }, [])

  useEffect(() => {
    persistStagedMetadata(stagedChanges)
    notifyMetadataChanges()
  }, [stagedChanges])

  useEffect(() => {
    const merged = mergeMetadataWithStaged(metadata, stagedChanges)
    setCoverage(computeCoverage(merged, Object.keys(metadata.tokens).length))
  }, [stagedChanges, metadata])

  const setMetadataDescription = useCallback((tokenName: string, description: string) => {
    setStagedChanges(prev => ({
      ...prev,
      [tokenName]: {
        ...prev[tokenName],
        description,
      },
    }))
  }, [])

  const clearDescription = useCallback((tokenName: string) => {
    setStagedChanges(prev => {
      const next = { ...prev }
      delete next[tokenName]
      return next
    })
  }, [])

  return {
    metadata,
    stagedChanges,
    coverage,
    setMetadataDescription,
    clearDescription,
  }
}

export function getMergedMetadata(metadata: TokensMetadata, stagedChanges: MetadataStagedChanges): TokensMetadata {
  return mergeMetadataWithStaged(metadata, stagedChanges)
}

export function getMetadataForToken(
  tokenName: string,
  metadata: TokensMetadata,
  stagedChanges: MetadataStagedChanges
): TokenMetadata | undefined {
  const base = metadata.tokens[tokenName]
  const staged = stagedChanges[tokenName]
  
  if (!base && !staged) {
    return undefined
  }
  
  if (!base) {
    return staged
  }
  
  if (!staged) {
    return base
  }
  
  return {
    ...base,
    ...staged,
  }
}
