"use client"
import { forwardRef, memo, useCallback, useMemo, type FormEvent } from 'react';
import type {
  FormProps,
  FormActionsProps,
  FormGap,
  FormActionsAlign,
  FormActionsGap,
} from './Form.types';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import { FormField } from '../../molecules/FormField/FormField';

// ── Hoisted static strings — no prop deps ────────────────────────────────────

const gapClasses: Record<FormGap, string> = {
  sm: 'gap-[var(--form-gap-sm)]',
  md: 'gap-[var(--form-gap-md)]',
  lg: 'gap-[var(--form-gap-lg)]',
};

const actionsAlignClasses: Record<FormActionsAlign, string> = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
};

const actionsGapClasses: Record<FormActionsGap, string> = {
  sm: 'gap-[var(--form-actions-gap-sm)]',
  md: 'gap-[var(--form-actions-gap-md)]',
};

// ─────────────────────────────────────────────────────────────────────────────
// Form.Actions — internal compound slot
// ─────────────────────────────────────────────────────────────────────────────

const FormActionsInternal = memo<FormActionsProps>(
  ({
    align = 'end',
    gap = 'md',
    separator = false,
    children,
    className,
  }) => {
    const classes = useMemo(
      () =>
        [
          'flex flex-wrap items-center',
          actionsAlignClasses[align],
          actionsGapClasses[gap],
          separator
            ? 'border-t border-[var(--form-actions-border)] pt-[var(--form-actions-pt)]'
            : 'pt-[var(--form-actions-pt)]',
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [align, gap, separator, className],
    );

    return <div className={classes}>{children}</div>;
  },
);
FormActionsInternal.displayName = 'Form.Actions';

// ─────────────────────────────────────────────────────────────────────────────
// Form (root) — <form> element
// ─────────────────────────────────────────────────────────────────────────────

const FormBase = memo(forwardRef<HTMLFormElement, FormProps>(
  ({
    onSubmit,
    loading = false,
    gap = 'md',
    noValidate = true,
    className,
    i18nStrings,
    children,
    ...rest
  }, ref) => {
    const i18n = useComponentI18n('form', i18nStrings);

    const handleSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        onSubmit?.(e);
      },
      [onSubmit],
    );

    const classes = useMemo(
      () =>
        [
          'flex flex-col w-full min-w-[var(--form-min-width)] perf-contain-content',
          gapClasses[gap],
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [gap, className],
    );

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        noValidate={noValidate}
        aria-label={i18n.label}
        {...(loading && { 'aria-busy': true })}
        className={classes}
        {...rest}
      >
        {children}
      </form>
    );
  },
));
FormBase.displayName = 'Form';

// ── Attach compound slots as static properties ───────────────────────────────

export const Form = Object.assign(FormBase, {
  Field:   FormField,
  Actions: FormActionsInternal,
});

// Named exports for compound slots (enables tree-shaking and direct import)
export { FormField, FormActionsInternal as FormActions };
