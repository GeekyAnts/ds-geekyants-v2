import React, { forwardRef, type ButtonHTMLAttributes } from 'react'

type EdIconButtonVariant = 'ghost' | 'secondary' | 'danger'
type EdIconButtonSize = 'sm' | 'md' | 'lg'

interface EdIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'variant' | 'size'> {
  variant?: EdIconButtonVariant
  size?: EdIconButtonSize
  icon: React.ReactNode
  'aria-label': string
  title?: string
}

export const EdIconButton = forwardRef<HTMLButtonElement, EdIconButtonProps>(function EdIconButton(
  { variant = 'ghost', size = 'md', icon, 'aria-label': ariaLabel, title, className, ...props },
  ref,
) {
  const cls = ['ed-icon-btn', `ed-icon-btn--${variant}`, size !== 'md' ? `ed-icon-btn--${size}` : '', className || '']
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} type="button" className={cls} aria-label={ariaLabel} title={title || ariaLabel} {...props}>
      <span aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span>
    </button>
  )
})
