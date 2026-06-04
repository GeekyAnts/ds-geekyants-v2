import type { HTMLAttributes, InputHTMLAttributes, ReactNode, ButtonHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { InputVariant, InputSize } from '../../atoms/Input/Input.types';
import type { InputGroupI18nStrings } from '../../utils/i18n';

export type { InputVariant, InputSize };

// ── Addon alignment ──────────────────────────────────────────────────────────

/** Where the addon is positioned relative to the input control. */
export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

// ── Root InputGroup ──────────────────────────────────────────────────────────

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant — applied to the group container. Defaults to 'default'. */
  variant?: InputVariant;
  /** Height and typography scale. Defaults to 'md'. */
  size?: InputSize;
  /** Error state — shows error border on the group. */
  error?: boolean;
  /** Loading state — disables interaction. */
  loading?: boolean;
  /** Disables the entire group. */
  disabled?: boolean;
  /** Accessible label for the group element. */
  'aria-label'?: string;
  /** i18n strings for localizable content. */
  i18nStrings?: InputGroupI18nStrings;
  /** Composition children — InputGroup.Input, InputGroup.Addon, InputGroup.Button. */
  children?: ReactNode;
}

// ── InputGroup.Input slot ────────────────────────────────────────────────────

export interface InputGroupInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Additional class names for the input element. */
  className?: string;
}

// ── InputGroup.Addon slot ────────────────────────────────────────────────────

export interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {
  /** Where the addon is positioned relative to the input. Defaults to 'inline-start'. */
  align?: InputGroupAddonAlign;
  /** Additional class names for the addon element. */
  className?: string;
  /** Addon content — icon, text, kbd, or any decorative node. */
  children: ReactNode;
}

// ── InputGroup.Button slot ───────────────────────────────────────────────────

export interface InputGroupButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Button size. Defaults to 'md' to match the group. */
  size?: InputSize;
  /** Additional class names for the button element. */
  className?: string;
  /** Button content — text label or icon. */
  children: ReactNode;
}

// ── Compound component type ──────────────────────────────────────────────────

export interface InputGroupComponent extends ForwardRefExoticComponent<InputGroupProps & RefAttributes<HTMLDivElement>> {
  /** Input slot — wraps the Input atom in unstyled mode. */
  Input: ForwardRefExoticComponent<InputGroupInputProps & RefAttributes<HTMLInputElement>>;
  /** Addon slot — icon, text, or kbd with muted background and separator border. */
  Addon: ForwardRefExoticComponent<InputGroupAddonProps & RefAttributes<HTMLDivElement>>;
  /** Button slot — action button fused with the group boundary. */
  Button: ForwardRefExoticComponent<InputGroupButtonProps & RefAttributes<HTMLButtonElement>>;
}
