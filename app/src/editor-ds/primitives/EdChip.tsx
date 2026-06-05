import React, { forwardRef, type HTMLAttributes } from 'react'
import { X } from 'lucide-react'

type EdChipVariant = 'default' | 'accent' | 'success' | 'info' | 'warning' | 'danger' | 'purple' | 'outline'

interface EdChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: EdChipVariant
  removable?: boolean
  onRemove?: () => void
  children: React.ReactNode
}

export const EdChip = forwardRef<HTMLSpanElement, EdChipProps>(function EdChip(
  { variant = 'default', removable, onRemove, children, className, ...props },
  ref,
) {
  const cls = ['ed-chip', variant !== 'default' ? `ed-chip--${variant}` : '', className || '']
    .filter(Boolean)
    .join(' ')

  return (
    <span ref={ref} className={cls} {...props}>
      {children}
      {removable && (
        <button
          type="button"
          className="ed-chip__remove"
          onClick={onRemove}
          aria-label="Remove"
        >
          <X size={10} aria-hidden="true" />
        </button>
      )}
    </span>
  )
})
