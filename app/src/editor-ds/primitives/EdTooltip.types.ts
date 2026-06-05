import type { ReactNode } from 'react'

export type EdTooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface EdTooltipProps {
  content: ReactNode
  children: ReactNode
  position?: EdTooltipPosition
  delay?: number
}
