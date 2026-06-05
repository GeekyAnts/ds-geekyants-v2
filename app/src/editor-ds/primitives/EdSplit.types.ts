import type { ReactNode } from 'react'

export interface EdSplitProps {
  children: [ReactNode, ReactNode]
  initialSize?: number
  minSize?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
  gutterClassName?: string
}
