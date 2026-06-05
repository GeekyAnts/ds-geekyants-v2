"use client"

import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import type { CalendarProps } from './Calendar.types';

// ── Date helpers (pure, no side effects) ──────────────────────────────────────

/** Check if two dates represent the same calendar day */
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Strip time — return a new Date at midnight */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Get the number of days in a month */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Build a 6×7 grid of Date objects for a month view */
function buildCalendarGrid(year: number, month: number, firstDayOfWeek: 0 | 1): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  let startDay = firstOfMonth.getDay() - firstDayOfWeek;
  if (startDay < 0) startDay += 7;

  const gridStart = new Date(year, month, 1 - startDay);
  const weeks: Date[][] = [];

  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + d;
      week.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + dayOffset));
    }
    weeks.push(week);
  }
  return weeks;
}

/** Default English month names */
const DEFAULT_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Default English weekday abbreviations (Monday-first) */
const DEFAULT_WEEKDAY_NAMES_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DEFAULT_WEEKDAY_NAMES_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DEFAULT_WEEKDAY_FULL_MON = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DEFAULT_WEEKDAY_FULL_SUN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ── Hoisted static classes ────────────────────────────────────────────────────

const PANEL_BASE_CLASSES = [
  'bg-[var(--calendar-panel-bg)]',
  'border border-[var(--calendar-panel-border)]',
  'rounded-[var(--calendar-panel-radius)]',
  'shadow-[var(--calendar-panel-shadow)]',
  'px-[var(--calendar-panel-px)] py-[var(--calendar-panel-py)]',
  'min-w-[var(--calendar-panel-min-width)]',
].join(' ');

const HEADER_CLASSES = [
  'flex items-center justify-between',
  'gap-[var(--calendar-header-gap)]',
  'mb-[var(--calendar-header-gap)]',
].join(' ');

const WEEKDAY_HEADER_CLASSES = [
  'text-center text-label-sm',
  'text-[var(--calendar-weekday-text)]',
  'pb-[var(--calendar-day-gap)]',
].join(' ');

const DAY_BASE_CLASSES = [
  'inline-flex items-center justify-center',
  'w-[var(--calendar-day-size)] h-[var(--calendar-day-size)]',
  'rounded-[var(--calendar-day-radius)]',
  'text-body-sm',
  'transition-default',
  'focus-visible:outline-none focus-visible:focus-ring',
  'cursor-pointer select-none',
].join(' ');

// ── Component ─────────────────────────────────────────────────────────────────

export const Calendar = memo(
  forwardRef<HTMLDivElement, CalendarProps>(
    (
      {
        value: selectedDate,
        displayMonth: controlledDisplayMonth,
        onChange,
        onMonthChange,
        min,
        max,
        firstDayOfWeek = 1,
        i18nStrings,
        className,
        ...rest
      },
      ref,
    ) => {
      const i18n = useComponentI18n('calendar', i18nStrings);

      // ── Display month (controlled or internal) ──────────────────────────
      const today = useMemo(() => startOfDay(new Date()), []);
      const [internalMonth, setInternalMonth] = useState(() => {
        const base = selectedDate ?? today;
        return { year: base.getFullYear(), month: base.getMonth() };
      });

      const displayMonth = controlledDisplayMonth ?? internalMonth;

      // ── Focused date in grid (for keyboard navigation) ──────────────────
      const [focusedDate, setFocusedDate] = useState<Date>(() => selectedDate ?? today);

      // ── i18n strings ─────────────────────────────────────────────────────
      const monthNames: string[] = i18n.monthNames ?? DEFAULT_MONTH_NAMES;
      const weekdayAbbr = firstDayOfWeek === 1
        ? (i18n.weekdayNamesShort ?? DEFAULT_WEEKDAY_NAMES_MON)
        : (i18n.weekdayNamesShort ?? DEFAULT_WEEKDAY_NAMES_SUN);
      const weekdayFull = firstDayOfWeek === 1
        ? (i18n.weekdayNames ?? DEFAULT_WEEKDAY_FULL_MON)
        : (i18n.weekdayNames ?? DEFAULT_WEEKDAY_FULL_SUN);

      // ── Calendar grid data ───────────────────────────────────────────────
      const weeks = useMemo(
        () => buildCalendarGrid(displayMonth.year, displayMonth.month, firstDayOfWeek),
        [displayMonth.year, displayMonth.month, firstDayOfWeek],
      );

      // ── Min/max helpers ──────────────────────────────────────────────────
      const minDay = useMemo(() => (min ? startOfDay(min) : null), [min]);
      const maxDay = useMemo(() => (max ? startOfDay(max) : null), [max]);

      const isDayDisabled = useCallback(
        (date: Date) => {
          if (minDay && date < minDay) return true;
          if (maxDay && date > maxDay) return true;
          return false;
        },
        [minDay, maxDay],
      );

      // ── Handlers ─────────────────────────────────────────────────────────

      const selectDate = useCallback(
        (date: Date) => {
          onChange?.(date);
        },
        [onChange],
      );

      const goToPrevMonth = useCallback(() => {
        const next = displayMonth.month - 1;
        const newMonth = next < 0
          ? { year: displayMonth.year - 1, month: 11 }
          : { year: displayMonth.year, month: next };
        if (controlledDisplayMonth) {
          onMonthChange?.(newMonth);
        } else {
          setInternalMonth(newMonth);
        }
      }, [displayMonth, controlledDisplayMonth, onMonthChange]);

      const goToNextMonth = useCallback(() => {
        const next = displayMonth.month + 1;
        const newMonth = next > 11
          ? { year: displayMonth.year + 1, month: 0 }
          : { year: displayMonth.year, month: next };
        if (controlledDisplayMonth) {
          onMonthChange?.(newMonth);
        } else {
          setInternalMonth(newMonth);
        }
      }, [displayMonth, controlledDisplayMonth, onMonthChange]);

      // ── Grid keyboard navigation ────────────────────────────────────────
      const navigateFocus = useCallback(
        (date: Date) => {
          setFocusedDate(date);
        },
        [],
      );

      const handleGridKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
          const fd = focusedDate;
          let next: Date | null = null;

          switch (e.key) {
            case 'ArrowLeft':
              next = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() - 1);
              break;
            case 'ArrowRight':
              next = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 1);
              break;
            case 'ArrowUp':
              next = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() - 7);
              break;
            case 'ArrowDown':
              next = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 7);
              break;
            case 'Home':
              next = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() - ((fd.getDay() - firstDayOfWeek + 7) % 7));
              break;
            case 'End':
              next = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + ((6 - (fd.getDay() - firstDayOfWeek + 7) % 7)));
              break;
            case 'PageUp':
              if (e.shiftKey) {
                next = new Date(fd.getFullYear() - 1, fd.getMonth(), Math.min(fd.getDate(), daysInMonth(fd.getFullYear() - 1, fd.getMonth())));
              } else {
                const prevMonth = fd.getMonth() - 1;
                const prevYear = prevMonth < 0 ? fd.getFullYear() - 1 : fd.getFullYear();
                const pm = (prevMonth + 12) % 12;
                next = new Date(prevYear, pm, Math.min(fd.getDate(), daysInMonth(prevYear, pm)));
              }
              break;
            case 'PageDown':
              if (e.shiftKey) {
                next = new Date(fd.getFullYear() + 1, fd.getMonth(), Math.min(fd.getDate(), daysInMonth(fd.getFullYear() + 1, fd.getMonth())));
              } else {
                const nextMonth = fd.getMonth() + 1;
                const nextYear = nextMonth > 11 ? fd.getFullYear() + 1 : fd.getFullYear();
                const nm = nextMonth % 12;
                next = new Date(nextYear, nm, Math.min(fd.getDate(), daysInMonth(nextYear, nm)));
              }
              break;
            case 'Enter':
            case ' ':
              e.preventDefault();
              if (!isDayDisabled(fd)) {
                selectDate(fd);
              }
              return;
            default:
              return;
          }

          if (next) {
            e.preventDefault();
            if (!isDayDisabled(next)) {
              navigateFocus(next);
            }
          }
        },
        [focusedDate, firstDayOfWeek, isDayDisabled, navigateFocus, selectDate],
      );

      // ── Classes ──────────────────────────────────────────────────────────
      const rootClasses = useMemo(
        () => [PANEL_BASE_CLASSES, className].filter(Boolean).join(' '),
        [className],
      );

      const monthYearLabel = `${monthNames[displayMonth.month]} ${displayMonth.year}`;

      // ── Render ───────────────────────────────────────────────────────────
      return (
        <div ref={ref} className={rootClasses} {...rest}>
          {/* Calendar header — month/year navigation */}
          <div className={HEADER_CLASSES}>
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              leftIcon={<ChevronLeft size="var(--size-icon-sm)" aria-hidden="true" />}
              onClick={goToPrevMonth}
            >
              {i18n.prevMonthLabel}
            </Button>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="text-body-md font-semibold text-[var(--calendar-header-text)] text-center content-flex truncate-label"
            >
              {monthYearLabel}
            </div>

            <Button
              variant="ghost"
              size="sm"
              iconOnly
              leftIcon={<ChevronRight size="var(--size-icon-sm)" aria-hidden="true" />}
              onClick={goToNextMonth}
            >
              {i18n.nextMonthLabel}
            </Button>
          </div>

          {/* Calendar grid */}
          <table
            role="grid"
            aria-label={`${monthNames[displayMonth.month]} ${displayMonth.year}`}
            className="w-full border-collapse"
            onKeyDown={handleGridKeyDown}
          >
            <thead>
              <tr>
                {weekdayAbbr.map((day, idx) => (
                  <th
                    key={day}
                    scope="col"
                    abbr={weekdayFull[idx]}
                    className={WEEKDAY_HEADER_CLASSES}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={`week-${week[0].getTime()}`}>
                  {week.map((day) => {
                    const isCurrentMonth = day.getMonth() === displayMonth.month;
                    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                    const isToday = isSameDay(day, today);
                    const dayDisabled = isDayDisabled(day) || !isCurrentMonth;
                    const isFocused = isSameDay(day, focusedDate);

                    const dayClasses = [
                      DAY_BASE_CLASSES,
                      !isCurrentMonth
                        ? 'text-[var(--calendar-day-text-outside)] pointer-events-none'
                        : dayDisabled
                          ? 'text-[var(--calendar-day-text-disabled)] cursor-not-allowed pointer-events-none'
                          : isSelected
                            ? 'bg-[var(--calendar-day-bg-selected)] text-[var(--calendar-day-text-selected)] font-semibold'
                            : [
                                'text-[var(--calendar-day-text)]',
                                'hover:bg-[var(--calendar-day-bg-hover)]',
                                'active:bg-[var(--calendar-day-bg-active)]',
                              ].join(' '),
                      isToday && !isSelected ? 'border border-[var(--calendar-day-border-today)] font-semibold' : '',
                    ].filter(Boolean).join(' ');

                    return (
                      <td key={day.getTime()} className="text-center p-0">
                        <button
                          type="button"
                          tabIndex={isFocused ? 0 : -1}
                          disabled={dayDisabled}
                          aria-disabled={dayDisabled || undefined}
                          aria-selected={isSelected || undefined}
                          aria-current={isToday ? 'date' : undefined}
                          aria-label={`${day.getDate()} ${monthNames[day.getMonth()]} ${day.getFullYear()}${isToday ? `, ${i18n.todayLabel}` : ''}`}
                          className={dayClasses}
                          onClick={() => {
                            if (!dayDisabled && isCurrentMonth) selectDate(day);
                          }}
                        >
                          {day.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  ),
);

Calendar.displayName = 'Calendar';
