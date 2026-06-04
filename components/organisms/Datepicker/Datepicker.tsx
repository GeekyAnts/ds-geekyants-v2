"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { Label } from '../../atoms/Label/Label';
import { Calendar } from '../../molecules/Calendar/Calendar';
import { useFocusTrap } from '../../utils/keyboard/useFocusTrap';
import { useEscapeDismiss } from '../../utils/keyboard/useEscapeDismiss';
import { useClickOutside } from '../../utils/keyboard/useClickOutside';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import type { DatepickerProps } from './Datepicker.types';

// ── Date helpers (pure, no side effects) ──────────────────────────────────────

/** Format a Date as YYYY-MM-DD */
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Parse a YYYY-MM-DD string into a Date, or null if invalid */
function parseDate(str: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const [y, m, d] = str.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

/** Strip time — return a new Date at midnight */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// ── Hoisted static classes ────────────────────────────────────────────────────

const HINT_CLASSES = 'text-body-sm text-[var(--datepicker-hint-text)] clamp-description';
const ERROR_CLASSES = 'text-body-sm text-[var(--datepicker-error-text)] clamp-description';

const PANEL_BASE_CLASSES = [
  'absolute z-[var(--datepicker-panel-z)]',
  'top-full start-0 mt-[var(--spacing-component-xs)]',
  'transition-enter',
].join(' ');

// ── Component ─────────────────────────────────────────────────────────────────

export const Datepicker = memo(
  forwardRef<HTMLDivElement, DatepickerProps>(
    (
      {
        value: controlledValue,
        defaultValue,
        onChange,
        min,
        max,
        label,
        hint,
        error,
        size = 'md',
        variant = 'default',
        disabled = false,
        loading = false,
        placeholder = 'YYYY-MM-DD',
        firstDayOfWeek = 1,
        i18nStrings,
        wrapperClassName,
        id: idProp,
        className,
        ...rest
      },
      ref,
    ) => {
      const i18n = useComponentI18n('datepicker', i18nStrings);

      // ── IDs ──────────────────────────────────────────────────────────────
      const baseId = useId();
      const fieldId = idProp ?? baseId;
      const hintId = `${fieldId}-hint`;
      const errorId = `${fieldId}-error`;
      const panelId = `${fieldId}-calendar`;

      // ── Derived state ────────────────────────────────────────────────────
      const hasError = Boolean(error);
      const isDisabled = disabled || loading;
      const today = useMemo(() => startOfDay(new Date()), []);

      // ── Selected date (controlled / uncontrolled) ────────────────────────
      const isControlled = controlledValue !== undefined;
      const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(defaultValue ?? null);
      const selectedDate = isControlled ? controlledValue : uncontrolledValue;

      // ── Input text ───────────────────────────────────────────────────────
      const [inputText, setInputText] = useState(selectedDate ? formatDate(selectedDate) : '');

      // Sync input text when controlled value changes
      useEffect(() => {
        if (isControlled) {
          setInputText(controlledValue ? formatDate(controlledValue) : '');
        }
      }, [isControlled, controlledValue]);

      // ── Open state ───────────────────────────────────────────────────────
      const [isOpen, setIsOpen] = useState(false);

      // ── Displayed month ──────────────────────────────────────────────────
      const [displayMonth, setDisplayMonth] = useState(() => {
        const base = selectedDate ?? today;
        return { year: base.getFullYear(), month: base.getMonth() };
      });

      // ── Refs ─────────────────────────────────────────────────────────────
      const containerRef = useRef<HTMLDivElement>(null);
      const panelRef = useRef<HTMLDivElement>(null);
      const inputRef = useRef<HTMLInputElement>(null);

      // ── Handlers ─────────────────────────────────────────────────────────

      const handleCalendarChange = useCallback(
        (date: Date) => {
          if (!isControlled) setUncontrolledValue(date);
          setInputText(formatDate(date));
          onChange?.(date);
          setIsOpen(false);
          requestAnimationFrame(() => inputRef.current?.focus());
        },
        [isControlled, onChange],
      );

      const open = useCallback(() => {
        if (isDisabled) return;
        const base = selectedDate ?? today;
        setDisplayMonth({ year: base.getFullYear(), month: base.getMonth() });
        setIsOpen(true);
      }, [isDisabled, selectedDate, today]);

      const close = useCallback(() => {
        setIsOpen(false);
        requestAnimationFrame(() => inputRef.current?.focus());
      }, []);

      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const text = e.target.value;
          setInputText(text);
          const parsed = parseDate(text);
          if (parsed) {
            if (!isControlled) setUncontrolledValue(parsed);
            onChange?.(parsed);
            setDisplayMonth({ year: parsed.getFullYear(), month: parsed.getMonth() });
          } else if (text === '') {
            if (!isControlled) setUncontrolledValue(null);
            onChange?.(null);
          }
        },
        [isControlled, onChange],
      );

      const handleInputKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault();
            open();
          }
        },
        [isOpen, open],
      );

      const handleMonthChange = useCallback(
        (month: { year: number; month: number }) => {
          setDisplayMonth(month);
        },
        [],
      );

      // ── Keyboard / focus hooks ───────────────────────────────────────────
      useFocusTrap({ active: isOpen, containerRef: panelRef });
      useEscapeDismiss({ active: isOpen, onDismiss: close });
      useClickOutside({ active: isOpen, containerRef, onClickOutside: close });

      // ── aria-describedby ─────────────────────────────────────────────────
      const describedBy = useMemo(() => {
        const ids: string[] = [];
        if (hint && !hasError) ids.push(hintId);
        if (hasError) ids.push(errorId);
        return ids.length > 0 ? ids.join(' ') : undefined;
      }, [hint, hasError, hintId, errorId]);

      // ── Classes ──────────────────────────────────────────────────────────
      const wrapperClasses = useMemo(
        () => ['flex flex-col gap-[var(--datepicker-gap)] w-full', wrapperClassName].filter(Boolean).join(' '),
        [wrapperClassName],
      );

      const triggerRowClasses = 'flex items-end gap-[var(--datepicker-trigger-gap)]';

      const panelClasses = useMemo(
        () => [
          PANEL_BASE_CLASSES,
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible',
        ].join(' '),
        [isOpen],
      );

      const rootClasses = useMemo(
        () => ['relative', className].filter(Boolean).join(' '),
        [className],
      );

      // ── Render ───────────────────────────────────────────────────────────
      return (
        <div
          ref={(node) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={rootClasses}
          {...rest}
        >
          <div className={wrapperClasses}>
            {/* Label */}
            <Label
              htmlFor={fieldId}
              disabled={isDisabled}
              hasError={hasError}
              size={size === 'sm' ? 'sm' : 'md'}
            >
              {label}
            </Label>

            {/* Trigger row: Input + Calendar button */}
            <div className={triggerRowClasses}>
              <div className="content-flex">
                <Input
                  ref={inputRef}
                  type="text"
                  id={fieldId}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  size={size}
                  variant={variant}
                  error={hasError}
                  loading={loading}
                  disabled={disabled}
                  placeholder={placeholder}
                  aria-describedby={describedBy}
                  aria-haspopup="dialog"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  autoComplete="off"
                />
              </div>
              <Button
                variant="outline"
                size={size}
                disabled={isDisabled}
                onClick={open}
                iconOnly
                leftIcon={<CalendarIcon size={`var(--size-icon-${size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'})`} aria-hidden="true" />}
                aria-label={i18n.triggerLabel}
              >
                {i18n.triggerLabel}
              </Button>
            </div>

            {/* Hint text */}
            {hint && !hasError && (
              <p id={hintId} className={HINT_CLASSES}>
                {hint}
              </p>
            )}

            {/* Error message */}
            {hasError && (
              <p id={errorId} role="alert" className={ERROR_CLASSES}>
                {error}
              </p>
            )}
          </div>

          {/* Calendar panel */}
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
            className={panelClasses}
          >
            <Calendar
              value={selectedDate}
              displayMonth={displayMonth}
              onChange={handleCalendarChange}
              onMonthChange={handleMonthChange}
              min={min}
              max={max}
              firstDayOfWeek={firstDayOfWeek}
              i18nStrings={i18nStrings}
            />
          </div>
        </div>
      );
    },
  ),
);

Datepicker.displayName = 'Datepicker';
