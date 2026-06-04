import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { HeaderI18nStrings } from '../../utils/i18n';

export type HeaderVariant = 'default' | 'transparent' | 'floating';
export type HeaderPosition = 'sticky' | 'static' | 'fixed';

export interface HeaderBrandProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /**
   * URL the brand link navigates to. Sanitized via `sanitizeHref()`.
   * Defaults to '/' when omitted.
   */
  href?: string;
}

export interface HeaderNavProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export interface HeaderActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Visual style. Defaults to 'default'. */
  variant?: HeaderVariant;
  /** Positioning mode. Defaults to 'sticky'. */
  position?: HeaderPosition;
  schema?: boolean;
  i18nStrings?: HeaderI18nStrings;
  loading?: boolean;
}

export interface HeaderComposite {
  Brand: React.ForwardRefExoticComponent<HeaderBrandProps & React.RefAttributes<HTMLAnchorElement>>;
  Nav: React.ForwardRefExoticComponent<HeaderNavProps & React.RefAttributes<HTMLElement>>;
  Actions: React.ForwardRefExoticComponent<HeaderActionsProps & React.RefAttributes<HTMLDivElement>>;
}
