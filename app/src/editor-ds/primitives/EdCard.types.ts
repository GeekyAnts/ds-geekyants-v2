import type { HTMLAttributes } from 'react'

export type EdCardVariant = 'default' | 'elevated'
export type EdCardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface EdCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: EdCardVariant
  padding?: EdCardPadding
  children: React.ReactNode
}
