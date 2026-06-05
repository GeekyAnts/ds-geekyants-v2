import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

export type EdButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type EdButtonSize = 'sm' | 'md' | 'lg'

export interface EdButtonBaseProps {
  variant?: EdButtonVariant
  size?: EdButtonSize
  disabled?: boolean
  loading?: boolean
}

export type EdButtonAsChildProps = EdButtonBaseProps & {
  as?: 'button'
  href?: never
  children: React.ReactNode
}

export type EdButtonAnchorProps = EdButtonBaseProps & {
  as: 'a'
  href: string
  children: React.ReactNode
  target?: string
  rel?: string
}

export type EdButtonProps = (EdButtonAsChildProps | EdButtonAnchorProps) & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' })
)
