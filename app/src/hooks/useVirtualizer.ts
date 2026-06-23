import { useState, useRef, useCallback, useMemo } from 'react'

interface UseVirtualizerOptions<T> {
  items: T[]
  itemHeight: number
  overscan?: number
  containerHeight?: number
}

interface UseVirtualizerReturn<T> {
  visibleItems: T[]
  offsetY: number
  totalHeight: number
  containerRef: React.RefObject<HTMLDivElement | null>
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void
}

export function useVirtualizer<T>({
  items,
  itemHeight,
  overscan = 5,
  containerHeight: initialContainerHeight = 600,
}: UseVirtualizerOptions<T>): UseVirtualizerReturn<T> {
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, _setContainerHeight] = useState(initialContainerHeight)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      setScrollTop(e.currentTarget.scrollTop)
      rafRef.current = null
    })
  }, [])

  const totalHeight = items.length * itemHeight

  const { visibleItems, offsetY } = useMemo(() => {
    if (items.length === 0) return { visibleItems: [], offsetY: 0 }

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    )

    return {
      visibleItems: items.slice(startIndex, endIndex),
      offsetY: startIndex * itemHeight,
    }
  }, [items, scrollTop, containerHeight, itemHeight, overscan])

  return { visibleItems, offsetY, totalHeight, containerRef, onScroll }
}
