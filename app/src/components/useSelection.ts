import { useState, useCallback, useEffect } from 'react'

interface SelectionState {
  selected: Set<string>
  isSelected: (tokenName: string) => boolean
  select: (tokenName: string) => void
  deselect: (tokenName: string) => void
  toggle: (tokenName: string) => void
  selectAll: () => void
  deselectAll: () => void
  selectRange: (from: string, to: string, orderedList: string[]) => void
  selectedCount: number
  isAllSelected: boolean
  selectionMode: boolean
  setSelectionMode: (active: boolean) => void
  setAllTokens: (tokens: string[]) => void
}

export function useSelection(initialTokens?: string[]): SelectionState {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [allTokenNames, setAllTokens] = useState<string[]>(initialTokens ?? [])
  const [selectionMode, setSelectionMode] = useState(false)

  useEffect(() => {
    if (initialTokens) {
      setAllTokens(initialTokens)
    }
  }, [initialTokens])

  const isSelected = useCallback(
    (tokenName: string) => selected.has(tokenName),
    [selected],
  )

  const select = useCallback((tokenName: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.add(tokenName)
      return next
    })
  }, [])

  const deselect = useCallback((tokenName: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.delete(tokenName)
      return next
    })
  }, [])

  const toggle = useCallback((tokenName: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(tokenName)) next.delete(tokenName)
      else next.add(tokenName)
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    setSelected(new Set(allTokenNames))
  }, [allTokenNames])

  const deselectAll = useCallback(() => {
    setSelected(new Set())
  }, [])

  const selectRange = useCallback(
    (from: string, to: string, orderedList: string[]) => {
      const fromIdx = orderedList.indexOf(from)
      const toIdx = orderedList.indexOf(to)
      if (fromIdx === -1 || toIdx === -1) return
      const start = Math.min(fromIdx, toIdx)
      const end = Math.max(fromIdx, toIdx)
      const range = orderedList.slice(start, end + 1)
      setSelected(prev => {
        const next = new Set(prev)
        for (const item of range) next.add(item)
        return next
      })
    },
    [],
  )

  const selectedCount = selected.size
  const isAllSelected =
    allTokenNames.length > 0 && selected.size === allTokenNames.length

  return {
    selected,
    isSelected,
    select,
    deselect,
    toggle,
    selectAll,
    deselectAll,
    selectRange,
    selectedCount,
    isAllSelected,
    selectionMode,
    setSelectionMode,
    setAllTokens,
  }
}
