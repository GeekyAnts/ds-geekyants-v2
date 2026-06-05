import type { FormHTMLAttributes, FormEvent, ReactNode } from 'react';

export type FormGap = 'sm' | 'md' | 'lg';
export type FormLabelPosition = 'top' | 'left';
export type FormActionsAlign = 'start' | 'center' | 'end' | 'between';
export type FormActionsGap = 'sm' | 'md';

// ── i18n ─────────────────────────────────────────────────────────────────────

export interface FormI18nStrings {
  /** Accessible label for the form. Default: "Form" */
  label?: string;
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /**
   * Called when the form is submitted. Receives the native `FormEvent`.
   * Call `e.preventDefault()` to take control of submission.
   */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /**
   * Signals an async submission is in progress. Sets `aria-busy="true"` on the
   * `<form>` element so assistive technologies announce the busy state.
   * Consumer is responsible for disabling controls during loading
   * (e.g. wrap fields in `<Fieldset disabled={loading}>`).
   */
  loading?: boolean;
  /** Vertical spacing between fields and the actions row. Defaults to `'md'`. */
  gap?: FormGap;
  /**
   * Disables the browser's built-in constraint validation UI. Set to `false`
   * only if relying entirely on browser-native validation. Defaults to `true`.
   */
  noValidate?: boolean;
  /** i18n strings for localization */
  i18nStrings?: FormI18nStrings;
  children: ReactNode;
}

// FormFieldProps re-exported from the canonical molecule
export type { FormFieldProps } from '../../molecules/FormField/FormField.types';
export type { FormFieldLabelPosition } from '../../molecules/FormField/FormField.types';

export interface FormActionsProps {
  /**
   * Horizontal alignment of action buttons within the row.
   * Defaults to `'end'` (right-aligned) — the conventional placement for primary actions.
   */
  align?: FormActionsAlign;
  /** Horizontal gap between buttons. Defaults to `'md'`. */
  gap?: FormActionsGap;
  /**
   * Renders a top border above the actions row. Use when the form is long and
   * a visual separator helps indicate the end of fields.
   */
  separator?: boolean;
  /** Action buttons (Button atoms, icon buttons, etc.). */
  children: ReactNode;
  /** Additional class names applied to the actions wrapper. */
  className?: string;
}
