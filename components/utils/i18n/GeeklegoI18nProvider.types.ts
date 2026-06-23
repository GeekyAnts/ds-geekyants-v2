/**
 * Type definitions for Geeklego i18n infrastructure.
 *
 * Architecture: library-agnostic, prop-first with context fallback.
 * Resolution order (most specific wins):
 *   hardcoded English default ← context strings ← i18nStrings prop
 *
 * Consumers wire their own i18n tool (react-intl, i18next, etc.) into
 * GeeklegoI18nProvider. No i18n library is bundled with Geeklego.
 *
 * v2 scope (2026-06-23): pruned to the shipped v2 component set. The shipped
 * components are thin Radix wrappers, so most have no system-generated strings
 * (Radix owns the ARIA). Only components that emit their own English text need
 * an interface here. As new v2 components ship with system strings, add their
 * interface + a key on GeeklegoI18nStrings + a DEFAULT_STRINGS entry, and wire
 * them via the useComponentI18n hook (see Dialog for the reference pattern).
 */

// ── Per-component string dictionaries ──────────────────────────────────────
// Only components with system-generated strings need an i18nStrings type.
// Content strings passed by the consumer (children, title, label) are not here.

export interface LabelI18nStrings {
  /** SR-only text appended when required=true. Default: "(required)" */
  required?: string;
  /** Visible text appended when optional=true. Default: "(Optional)" */
  optional?: string;
}

export interface DialogI18nStrings {
  /** aria-label for the close (×) button. Default: "Close" */
  closeLabel?: string;
}

export interface PopoverI18nStrings {
  /** aria-label for the close (×) button when a header close is rendered. Default: "Close" */
  closeLabel?: string;
}

export interface DropdownMenuI18nStrings {
  /** aria-label for the menu panel when no menuLabel prop is provided. Default: "Menu" */
  defaultMenuLabel?: string;
}

export interface ComboboxI18nStrings {
  /** aria-label for the clear (×) button. Default: "Clear" */
  clearLabel?: string;
  /** aria-label for the listbox panel. Default: "Options" */
  listboxLabel?: string;
  /** Text shown when no options match the query. Default: "No results" */
  noResultsMessage?: string;
  /** Text shown in the panel during async option loading. Default: "Loading options…" */
  loadingMessage?: string;
}

export interface CommandI18nStrings {
  /** Text shown when no command matches the query. Default: "No results found." */
  emptyMessage?: string;
}

export interface AccordionI18nStrings {
  /** SR-only hint appended to trigger text when item is collapsed. Default: "Expand" */
  expandLabel?: string;
  /** SR-only hint appended to trigger text when item is expanded. Default: "Collapse" */
  collapseLabel?: string;
}

export interface SelectI18nStrings {
  /** Placeholder text shown when no option is selected. Default: "Select…" */
  placeholder?: string;
}

// ── Top-level composite dictionary ─────────────────────────────────────────
// Keyed by camelCase component name — consumers pass partial overrides.

export interface GeeklegoI18nStrings {
  label?: LabelI18nStrings;
  dialog?: DialogI18nStrings;
  popover?: PopoverI18nStrings;
  dropdownMenu?: DropdownMenuI18nStrings;
  combobox?: ComboboxI18nStrings;
  command?: CommandI18nStrings;
  accordion?: AccordionI18nStrings;
  select?: SelectI18nStrings;
}

// ── Formatters ─────────────────────────────────────────────────────────────

export interface GeeklegoFormatters {
  /**
   * Format a number for metric display.
   * Default: built-in component formatter — not set here.
   */
  formatNumber?: (value: number, options?: Intl.NumberFormatOptions) => string;
  /**
   * Format a number as a percentage string (e.g. "42.1%").
   * Default: `${value.toFixed(1)}%`
   */
  formatPercent?: (value: number, fractionDigits?: number) => string;
  /**
   * Format a Date or ISO string for display.
   * Default: Intl.DateTimeFormat with browser locale.
   */
  formatDate?: (value: Date | string, options?: Intl.DateTimeFormatOptions) => string;
}

// ── Context value ──────────────────────────────────────────────────────────

export interface GeeklegoI18nContextValue {
  strings: GeeklegoI18nStrings;
  formatters: GeeklegoFormatters;
  /** BCP 47 locale tag, e.g. "en-US", "ar", "de". Defaults to navigator.language. */
  locale?: string;
}

// ── Default strings (module-scope constant — never recreated per render) ───
// These are the English fallbacks used when no i18n provider is present.

export const DEFAULT_STRINGS: GeeklegoI18nStrings = {
  label: {
    required: '(required)',
    optional: '(Optional)',
  },
  dialog: {
    closeLabel: 'Close',
  },
  popover: {
    closeLabel: 'Close',
  },
  dropdownMenu: {
    defaultMenuLabel: 'Menu',
  },
  combobox: {
    clearLabel: 'Clear',
    listboxLabel: 'Options',
    noResultsMessage: 'No results',
    loadingMessage: 'Loading options…',
  },
  command: {
    emptyMessage: 'No results found.',
  },
  accordion: {
    expandLabel: 'Expand',
    collapseLabel: 'Collapse',
  },
  select: {
    placeholder: 'Select…',
  },
};

// ── Default formatters (module-scope constant — never recreated per render) ─

export const DEFAULT_FORMATTERS: GeeklegoFormatters = {
  formatPercent: (value, fractionDigits = 1) => `${value.toFixed(fractionDigits)}%`,
  formatDate: (value, options) => {
    const date = value instanceof Date ? value : new Date(value as string);
    return new Intl.DateTimeFormat(undefined, options).format(date);
  },
  // formatNumber intentionally omitted — components use their own built-in formatter
  // and only swap to this when explicitly provided via context.
};
