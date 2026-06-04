import React, { forwardRef, type SelectHTMLAttributes } from 'react'

interface EdSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface EdSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  options: EdSelectOption[]
}

export const EdSelect = forwardRef<HTMLSelectElement, EdSelectProps>(function EdSelect(
  { label, error, hint, id, options, className, ...props },
  ref,
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const hasError = !!error
  const describedBy = hasError ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined

  return (
    <div className="ed-field">
      {label && <label htmlFor={selectId} className="ed-field__label">{label}</label>}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        className={['ed-select', className || ''].filter(Boolean).join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
        ))}
      </select>
      {error && <p id={`${selectId}-error`} className="ed-field__error" role="alert">{error}</p>}
      {!error && hint && <p id={`${selectId}-hint`} className="ed-field__hint">{hint}</p>}
    </div>
  )
})
