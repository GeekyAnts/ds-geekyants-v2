'use client'

import React, { useState, useRef, useCallback, useEffect, type ReactNode } from 'react'

interface EdSplitProps {
  children: [ReactNode, ReactNode]
  initialSize?: number
  minSize?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
  gutterClassName?: string
}

export const EdSplit = ({
  children,
  initialSize = 50,
  minSize = 20,
  orientation = 'horizontal',
  className,
  gutterClassName,
}: EdSplitProps) => {
  const [sizes, setSizes] = useState<[number, number]>([initialSize, 100 - initialSize])
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSizes = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    let newSizes: [number, number]
    if (orientation === 'horizontal') {
      const size = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, minSize), 100 - minSize)
      newSizes = [size, 100 - size]
    } else {
      const size = Math.min(Math.max(((clientY - rect.top) / rect.height) * 100, minSize), 100 - minSize)
      newSizes = [size, 100 - size]
    }
    setSizes(newSizes)
  }, [orientation, minSize])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const handleMouseMove = (e: MouseEvent) => {
      updateSizes(e.clientX, e.clientY)
    }
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) updateSizes(touch.clientX, touch.clientY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, updateSizes])

  const gutterClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <div style={{ flex: `${sizes[0]} 1 0%` }}>{children[0]}</div>
      <div
        className={`ed-surface ${gutterClassName}`}
        style={{
          width: orientation === 'horizontal' ? '4px' : undefined,
          height: orientation === 'vertical' ? '4px' : undefined,
          cursor: orientation === 'horizontal' ? 'col-resize' : 'row-resize',
          flexShrink: 0,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={gutterClickHandler}
        role="separator"
        aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        tabIndex={0}
      />
      <div style={{ flex: `${sizes[1]} 1 0%` }}>{children[1]}</div>
    </div>
  )
}
