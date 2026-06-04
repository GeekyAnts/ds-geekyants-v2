"use client"
import { forwardRef, memo, useMemo, useCallback, useId } from 'react';
import type { RadioProps, RadioSize } from './Radio.types';
import { getErrorFieldProps } from '../../utils/accessibility/aria-helpers';

// ── Size map — indicator + dot dimensions via component tokens ─────────────
const sizeClasses: Record<RadioSize, { indicator: string; dot: string }> = {
  sm: {
    indicator: 'w-[var(--radio-size-sm)] h-[var(--radio-size-sm)]',
    dot: 'w-[var(--radio-dot-size-sm)] h-[var(--radio-dot-size-sm)]',
  },
  md: {
    indicator: 'w-[var(--radio-size-md)] h-[var(--radio-size-md)]',
    dot: 'w-[var(--radio-dot-size-md)] h-[var(--radio-dot-size-md)]',
  },
  lg: {
    indicator: 'w-[var(--radio-size-lg)] h-[var(--radio-size-lg)]',
    dot: 'w-[var(--radio-dot-size-lg)] h-[var(--radio-dot-size-lg)]',
  },
};

// ── Indicator state classes — each state uses a distinct visual strategy ───
export const Radio = memo(
  forwardRef<HTMLInputElement, RadioProps>(
    (
      {
        checked,
        defaultChecked: defaultCheckedProp,
        size = 'md',
        error = false,
        disabled = false,
        required = false,
        children,
        id: idProp,
        className,
        onChange,
        ...rest
      },
      ref,
    ) => {
      const generatedId = useId();
      const inputId = idProp ?? generatedId;

      const isControlled = checked !== undefined;

      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e);
        },
        [onChange],
      );

      const sz = sizeClasses[size];

      // Visual indicator circle — aria-hidden; screen readers use the native input.
      // Checked/disabled detection via CSS peer:* variants — no JS state needed.
      const indicatorClasses = useMemo(
        () =>
          [
            'flex items-center justify-center flex-shrink-0 pointer-events-none',
            'border rounded-[var(--radio-radius)]',
            'transition-default',
            'shadow-[var(--radio-shadow)]',
            'peer-focus-visible:focus-ring',
            sz.indicator,

            // Dot visibility: indicator acts as CSS proxy for the dot (peer sibling)
            '[&>*]:hidden peer-checked:[&>*]:block',

            // Unchecked state (default)
            'bg-[var(--radio-bg)] border-[var(--radio-border)]',
            'group-hover:bg-[var(--radio-bg-hover)] group-hover:border-[var(--radio-border-hover)]',
            'group-hover:shadow-[var(--radio-shadow-hover)] group-active:shadow-[var(--radio-shadow-active)]',

            // Checked state — via CSS peer:checked
            'peer-checked:bg-[var(--radio-bg-checked)] peer-checked:border-[var(--radio-border-checked)]',
            'peer-checked:group-hover:bg-[var(--radio-bg-checked-hover)] peer-checked:group-hover:border-[var(--radio-border-checked-hover)]',
            'peer-checked:group-hover:shadow-[var(--radio-shadow-hover)] peer-checked:group-active:shadow-[var(--radio-shadow-active)]',

            // Error overrides (only when not disabled — disabled takes precedence)
            ...(error && !disabled
              ? [
                  'border-[var(--radio-border-error)]',
                  'peer-checked:border-[var(--radio-border-error)]',
                ]
              : []),

            // Disabled override (final — wins over everything)
            ...(disabled
              ? [
                  'bg-[var(--radio-bg-disabled)] border-[var(--radio-border-disabled)]',
                  'cursor-not-allowed',
                ]
              : []),
          ]
            .filter(Boolean)
            .join(' '),
        [sz.indicator, disabled, error],
      );

      // Wrapper label — owns hover group and cursor
      const labelClasses = useMemo(
        () =>
          [
            'inline-flex items-center group gap-[var(--radio-gap)]',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            className,
          ]
            .filter(Boolean)
            .join(' '),
        [disabled, className],
      );

      // Label text — truncates to one line
      const labelTextClasses = useMemo(
        () =>
          [
            'text-body-md truncate-label',
            disabled
              ? 'text-[var(--radio-label-color-disabled)]'
              : 'text-[var(--radio-label-color)]',
          ].join(' '),
        [disabled],
      );

      return (
        <label htmlFor={inputId} className={labelClasses}>
          {/*
           * touch-target: expands hit area to ≥24 px (WCAG 2.5.8) via ::after
           * relative: anchors the transparent native input overlay
           */}
          <span className="relative flex-shrink-0 inline-flex touch-target">
            {/*
             * Native input: fully transparent overlay — provides radio semantics,
             * Arrow-key group navigation, and form participation.
             * Screen readers announce this element; the visual indicator is decorative.
             */}
            <input
              ref={ref}
              id={inputId}
              type="radio"
              checked={isControlled ? checked : undefined}
              defaultChecked={isControlled ? undefined : defaultCheckedProp}
              disabled={disabled}
              required={required}
              aria-required={required || undefined}
              {...getErrorFieldProps(error, `${inputId}-error`)}
              onChange={handleChange}
              readOnly={isControlled && onChange === undefined}
              className="peer absolute inset-0 w-full h-full opacity-0 m-0 cursor-[inherit]"
              {...rest}
            />

            {/* Custom visual indicator — decorative, hidden from assistive tech */}
            <span className={indicatorClasses} aria-hidden="true">
              <span
                className={[
                  'rounded-[var(--radio-radius)] flex-shrink-0',
                  sz.dot,
                  disabled
                    ? 'bg-[var(--radio-dot-disabled)]'
                    : 'bg-[var(--radio-dot)]',
                ].join(' ')}
              />
            </span>
          </span>

          {/* Label text slot */}
          {children != null && (
            <span className={labelTextClasses}>{children}</span>
          )}
        </label>
      );
    },
  ),
);
Radio.displayName = 'Radio';
