import React, { forwardRef, type HTMLAttributes } from 'react'

interface EdCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  children: React.ReactNode
}

export const EdCard = forwardRef<HTMLDivElement, EdCardProps>(function EdCard(
  { variant = 'default', padding = 'md', interactive, className, children, ...props },
  ref,
) {
  const cls = [
    'ed-card',
    variant === 'elevated' ? 'ed-card--elevated' : '',
    interactive ? 'ed-card--interactive' : '',
    padding !== 'none' ? `ed-card__pad-${padding}` : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={cls} {...props}>
      {children}
    </div>
  )
})
