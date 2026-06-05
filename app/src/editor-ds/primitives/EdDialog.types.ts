import type { ReactNode } from 'react'

export type EdDialogSize = 'sm' | 'md' | 'lg' | 'xl'

export interface EdDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: EdDialogSize
}
