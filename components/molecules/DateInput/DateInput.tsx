"use client"
import { forwardRef, memo, useId, useMemo } from 'react';
import { Input } from '../../atoms/Input/Input';
import { FormField } from '../FormField/FormField';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import type { DateInputProps } from './DateInput.types';

export const DateInput = memo(
  forwardRef<HTMLInputElement, DateInputProps>(
    (
      {
        label,
        hint,
        error,
        size = 'md',
        variant = 'default',
        loading = false,
        disabled,
        required,
        id: idProp,
        i18nStrings,
        className,
        wrapperClassName,
        ...rest
      },
      ref,
    ) => {
      const i18n = useComponentI18n('dateInput', i18nStrings);

      const generatedId = useId();
      const fieldId = idProp ?? generatedId;
      const hasError = Boolean(error);
      const resolvedPlaceholder = rest.placeholder ?? i18n.placeholder;

      const describedBy = useMemo(() => {
        const ids: string[] = [];
        if (hint && !hasError) ids.push(`${fieldId}-hint`);
        if (hasError) ids.push(`${fieldId}-error`);
        return ids.length > 0 ? ids.join(' ') : undefined;
      }, [hint, hasError, fieldId]);

      return (
        <FormField
          label={label}
          htmlFor={fieldId}
          hint={hint}
          error={error}
          required={required}
          disabled={disabled || loading}
          size={size === 'sm' ? 'sm' : 'md'}
          className={wrapperClassName}
        >
          <Input
            ref={ref}
            type="date"
            id={fieldId}
            size={size}
            variant={variant}
            error={hasError}
            loading={loading}
            disabled={disabled}
            required={required}
            placeholder={resolvedPlaceholder}
            aria-describedby={describedBy}
            className={className}
            {...rest}
          />
        </FormField>
      );
    },
  ),
);
DateInput.displayName = 'DateInput';
