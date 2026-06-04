import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface EdInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  icon?: ReactNode
}

export const EdInput = forwardRef<HTMLInputElement, EdInputProps>(function EdInput(
  { label, error, hint, icon, id, className, ...props },
  ref,
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const hasError = !!error
  const describedBy = hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

  const inputNode = (
    <input
      ref={ref}
      id={inputId}
      aria-invalid={hasError ? 'true' : undefined}
      aria-describedby={describedBy}
      className={['ed-input', className || ''].filter(Boolean).join(' ')}
      {...props}
    />
  )

  return (
    <div className="ed-field">
      {label && <label htmlFor={inputId} className="ed-field__label">{label}</label>}
      {icon ? (
        <div className="ed-input-wrap">
          <span className="ed-input-wrap__icon">{icon}</span>
          {inputNode}
        </div>
      ) : (
        inputNode
      )}
      {error && <p id={`${inputId}-error`} className="ed-field__error" role="alert">{error}</p>}
      {!error && hint && <p id={`${inputId}-hint`} className="ed-field__hint">{hint}</p>}
    </div>
  )
})
