import type { InputHTMLAttributes } from 'react'

export interface EdInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  placeholder?: string
}
