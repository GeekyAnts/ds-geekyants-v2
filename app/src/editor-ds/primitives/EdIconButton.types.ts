import type { ButtonHTMLAttributes } from 'react'

export type EdIconButtonVariant = 'ghost' | 'secondary' | 'danger'
export type EdIconButtonSize = 'sm' | 'md' | 'lg'

export interface EdIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'variant' | 'size'> {
  variant?: EdIconButtonVariant
  size?: EdIconButtonSize
  icon: React.ReactNode
  'aria-label': string
  title?: string
}
