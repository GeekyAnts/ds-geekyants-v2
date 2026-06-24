/**
 * DatePicker is a COMPOSITION (the ShadCN recipe), not a new primitive: our
 * Button (trigger) + Popover (positioning/dismiss/portal) + Calendar
 * (react-day-picker date grid). It wires only the selected-date state and the
 * trigger label; every behavioral piece comes from an already-shipped component.
 */
export interface DatePickerProps {
  /** Controlled selected date. Omit (with onChange) for uncontrolled use. */
  value?: Date;
  /** Called when a day is selected (or cleared). */
  onChange?: (date: Date | undefined) => void;
  /** Initial date when uncontrolled. */
  defaultValue?: Date;
  /** Trigger placeholder shown when no date is selected. */
  placeholder?: string;
  /** Disable the trigger. */
  disabled?: boolean;
  /** Locale passed to the trigger's date formatting. */
  locale?: string;
  /** Extra classes for the trigger button. */
  className?: string;
}
