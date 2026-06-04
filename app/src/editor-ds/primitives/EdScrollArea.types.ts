import type { ReactNode } from 'react'

export type EdScrollAreaType = 'scrollable' | 'hover' | 'native'
export type EdScrollAreaOrientation = 'horizontal' | 'vertical'

export interface EdScrollAreaProps {
  children: ReactNode
  className?: string
  type?: EdScrollAreaType
  orientation?: EdScrollAreaOrientation
}
