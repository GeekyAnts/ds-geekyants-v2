import React, { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type EdButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger' | 'strong'
type EdButtonSize = 'sm' | 'md' | 'lg'

interface EdButtonBaseProps {
  variant?: EdButtonVariant
  size?: EdButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

type EdButtonAsButton = EdButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
    href?: never
    children: React.ReactNode
  }

type EdButtonAsAnchor = EdButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
    children: React.ReactNode
  }

type EdButtonProps = EdButtonAsButton | EdButtonAsAnchor

function classes(variant: EdButtonVariant, size: EdButtonSize, fullWidth: boolean | undefined, extra?: string) {
  return [
    'ed-btn',
    `ed-btn--${variant}`,
    `ed-btn--${size}`,
    fullWidth ? 'ed-btn--block' : '',
    extra || '',
  ]
    .filter(Boolean)
    .join(' ')
}

export const EdButton = forwardRef<HTMLButtonElement, EdButtonProps>(function EdButton(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    disabled,
    loading,
    fullWidth,
    children,
    className,
    ...rest
  } = props as EdButtonAsButton

  const cls = classes(variant, size, fullWidth, className)

  if ((props as EdButtonAsAnchor).as === 'a') {
    const { href, target, rel, ...anchorRest } = rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        aria-disabled={disabled || loading ? 'true' : undefined}
        {...anchorRest}
      >
        {loading ? <Spinner /> : null}
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cls}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  )
})

function Spinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: '1.5px solid currentColor',
        borderTopColor: 'transparent',
        animation: 'ed-spin 0.7s linear infinite',
      }}
    />
  )
}
