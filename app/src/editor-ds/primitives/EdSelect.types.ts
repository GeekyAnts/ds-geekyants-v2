import type { SelectHTMLAttributes } from 'react'

export interface EdSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface EdSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  options: EdSelectOption[]
}
