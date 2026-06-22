export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Selectable options. */
  options: ComboboxOption[];
  /** Controlled selected value. */
  value?: string;
  /** Fires with the new value (or "" when the selected item is toggled off). */
  onChange?: (value: string) => void;
  /** Trigger text shown when nothing is selected. */
  placeholder?: string;
  /** Placeholder inside the filter input. */
  searchPlaceholder?: string;
  /** Message when the filter matches nothing. */
  emptyText?: string;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Width utility for the trigger + panel (they share a width). Default w-64. */
  className?: string;
}
