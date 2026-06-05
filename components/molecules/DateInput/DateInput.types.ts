import type { InputHTMLAttributes } from 'react';
import type { InputVariant, InputSize } from '../../atoms/Input/Input.types';
import type { DateInputI18nStrings } from '../../utils/i18n';

export type { InputVariant, InputSize };
export type { DateInputI18nStrings };

export interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text for the field. Required for accessibility. */
  label: string;
  /** Hint/helper text shown below the input when no error is present. */
  hint?: string;
  /**
   * Validation error message. When set, switches the input to its error state
   * and replaces the hint text. Announced immediately via `role="alert"`.
   */
  error?: string;
  /** Height and typography scale. Defaults to 'md'. */
  size?: InputSize;
  /** Visual style variant. Defaults to 'default'. */
  variant?: InputVariant;
  /** Shows loading spinner and disables interaction. */
  loading?: boolean;
  /**
   * Additional class names applied to the outer wrapper `<div>`.
   * Use this to control width or layout placement of the entire field group.
   */
  wrapperClassName?: string;
  /**
   * `id` for the underlying `<input>`. Auto-generated when omitted.
   * The generated label is linked via `htmlFor` automatically.
   */
  id?: string;
  /** Optional i18n strings for placeholder and error messages. */
  i18nStrings?: DateInputI18nStrings;
}
