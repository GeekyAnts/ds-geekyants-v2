import type { HTMLAttributes } from 'react'

export type EdChipVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger'

export interface EdChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: EdChipVariant
  removable?: boolean
  onRemove?: () => void
  children: React.ReactNode
}
