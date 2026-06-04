import type { HTMLAttributes } from 'react';
import type { CalendarI18nStrings } from '../../utils/i18n';

export type { CalendarI18nStrings };

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'min' | 'max'> {
  /** Currently selected date (controlled). */
  value?: Date | null;
  /** Month/year to display. Defaults to current month. */
  displayMonth?: { year: number; month: number };
  /** Fired when the user selects a date. */
  onChange?: (date: Date) => void;
  /** Fired when the user navigates to a different month. */
  onMonthChange?: (month: { year: number; month: number }) => void;
  /** Earliest selectable date. Days before this are disabled. */
  min?: Date;
  /** Latest selectable date. Days after this are disabled. */
  max?: Date;
  /** First day of week: 0 = Sunday, 1 = Monday. Defaults to 1. */
  firstDayOfWeek?: 0 | 1;
  /** Internationalisation strings for system-generated text. */
  i18nStrings?: CalendarI18nStrings;
}
