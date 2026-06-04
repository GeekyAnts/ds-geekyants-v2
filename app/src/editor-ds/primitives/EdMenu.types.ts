import type { ReactNode } from 'react'

export interface EdMenuItem {
  id: string
  label: string
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
}

export interface EdMenuProps {
  trigger: ReactNode
  items: EdMenuItem[]
  position?: 'bottom-left' | 'bottom-right'
}
