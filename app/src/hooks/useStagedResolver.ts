import { useEffect, useState, useCallback, useMemo } from 'react'
import { getStagedValue, getAllStaged } from '../state/staging'

export function useStagedResolver(originalTokens: Map<string, string>) {
  const [stagedMap, setStagedMap] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    function updateStagedMap() {
      const map = getAllStaged()
      setStagedMap(new Map(map))
    }

    updateStagedMap()

    const storageHandler = () => {
      updateStagedMap()
    }

    window.addEventListener('storage', storageHandler)
    return () => window.removeEventListener('storage', storageHandler)
  }, [])

  const resolve = useCallback(
    (tokenName: string, defaultValue: string): string => {
      return stagedMap.get(tokenName) || defaultValue
    },
    [stagedMap]
  )

  const getOriginal = useCallback(
    (tokenName: string): string => {
      return originalTokens.get(tokenName) || ''
    },
    [originalTokens]
  )

  const getStagedOrOriginal = useCallback(
    (tokenName: string): string => {
      return stagedMap.get(tokenName) || originalTokens.get(tokenName) || ''
    },
    [stagedMap, originalTokens]
  )

  const isStaged = useCallback(
    (tokenName: string): boolean => {
      return stagedMap.has(tokenName)
    },
    [stagedMap]
  )

  return { resolve, getOriginal, getStagedOrOriginal, isStaged }
}
