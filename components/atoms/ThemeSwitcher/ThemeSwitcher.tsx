"use client"
import { forwardRef, memo, useMemo } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';
import { useSingleSelectGroup } from '../../utils/keyboard/useSingleSelectGroup';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import type {
  ThemeSwitcherProps,
  ThemeSwitcherOption,
  ThemeSwitcherSize,
  ThemeMode,
} from './ThemeSwitcher.types';

/**
 * sizeMap keys are static strings so Tailwind v4 JIT scanner can detect them.
 * icon: CSS selector targets the SVG via [&>svg] — this uses CSS width/height
 * which DO support CSS variables (unlike SVG presentation attributes).
 */
const sizeMap: Record<ThemeSwitcherSize, { button: string; icon: string }> = {
  sm: {
    button: 'w-[var(--theme-switcher-item-size-sm)] h-[var(--theme-switcher-item-size-sm)]',
    icon:   '[&>svg]:w-[var(--theme-switcher-item-icon-sm)] [&>svg]:h-[var(--theme-switcher-item-icon-sm)]',
  },
  md: {
    button: 'w-[var(--theme-switcher-item-size-md)] h-[var(--theme-switcher-item-size-md)]',
    icon:   '[&>svg]:w-[var(--theme-switcher-item-icon-md)] [&>svg]:h-[var(--theme-switcher-item-icon-md)]',
  },
  lg: {
    button: 'w-[var(--theme-switcher-item-size-lg)] h-[var(--theme-switcher-item-size-lg)]',
    icon:   '[&>svg]:w-[var(--theme-switcher-item-icon-lg)] [&>svg]:h-[var(--theme-switcher-item-icon-lg)]',
  },
};

const baseItemClasses = [
  'flex items-center justify-center shrink-0',
  'transition-default',
  'focus-visible:outline-none focus-visible:focus-ring',
  'cursor-pointer select-none',
].join(' ');

const unpressedClasses = [
  'rounded-[var(--theme-switcher-item-radius)]',
  'bg-[var(--theme-switcher-item-bg)]',
  'text-[var(--theme-switcher-item-icon)]',
  'shadow-[var(--theme-switcher-item-shadow)]',
  'hover:bg-[var(--theme-switcher-item-bg-hover)]',
  'hover:text-[var(--theme-switcher-item-icon-pressed)]',
].join(' ');

const pressedClasses = [
  'rounded-[var(--theme-switcher-item-radius-pressed)]',
  'bg-[var(--theme-switcher-item-bg-pressed)]',
  'border border-[var(--theme-switcher-item-border-pressed)]',
  'text-[var(--theme-switcher-item-icon-pressed)]',
  'shadow-[var(--theme-switcher-item-shadow-pressed)]',
].join(' ');

// ── Internal item component ───────────────────────────────────────────────────

interface ThemeSwitcherItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  option: ThemeSwitcherOption;
  isPressed: boolean;
  size: ThemeSwitcherSize;
}

const ThemeSwitcherItem = memo(
  forwardRef<HTMLButtonElement, ThemeSwitcherItemProps>(
    ({ option, isPressed, size, ...props }, ref) => {
      const itemClasses = useMemo(
        () => [baseItemClasses, sizeMap[size].button, isPressed ? pressedClasses : unpressedClasses].join(' '),
        [size, isPressed],
      );

      return (
        <button
          ref={ref}
          type="button"
          className={itemClasses}
          {...props}
        >
          {/* Icon sized via CSS [&>svg] — CSS props support CSS vars, SVG attrs do not */}
          <span
            aria-hidden="true"
            className={`flex items-center justify-center ${sizeMap[size].icon}`}
          >
            {option.icon}
          </span>
        </button>
      );
    },
  ),
);
ThemeSwitcherItem.displayName = 'ThemeSwitcherItem';

// ── ThemeSwitcher ─────────────────────────────────────────────────────────────

export const ThemeSwitcher = memo(
  forwardRef<HTMLDivElement, ThemeSwitcherProps>(
    (
      {
        value,
        defaultValue = 'system',
        onChange,
        options: optionsProp,
        size = 'md',
        i18nStrings,
        className,
        ...rest
      },
      ref,
    ) => {
      const i18n = useComponentI18n('themeSwitcher', i18nStrings);
      const defaultOptions = useMemo(() => [
        { value: 'system' as const, label: i18n.systemLabel!, icon: <Monitor /> },
        { value: 'light' as const,  label: i18n.lightLabel!,   icon: <Sun /> },
        { value: 'dark' as const,   label: i18n.darkLabel!,    icon: <Moon /> },
      ], [i18n]);
      const options = optionsProp ?? defaultOptions;

      const { containerProps, getSegmentProps, selectedValue } = useSingleSelectGroup<ThemeMode>({
        options,
        value,
        defaultValue,
        onChange,
      });

      const containerClasses = useMemo(
        () =>
          [
            'inline-flex items-center overflow-hidden',
            'rounded-[var(--theme-switcher-radius)]',
            'bg-[var(--theme-switcher-bg)]',
            'border border-[var(--theme-switcher-border)]',
            'p-[var(--theme-switcher-padding)]',
            'gap-[var(--theme-switcher-gap)]',
            className,
          ]
            .filter(Boolean)
            .join(' '),
        [className],
      );

      return (
        <div
          ref={ref}
          aria-label={i18n.groupLabel}
          className={containerClasses}
          {...containerProps}
          {...rest}
        >
          {options.map((option, index) => (
            <ThemeSwitcherItem
              key={option.value}
              option={option}
              isPressed={option.value === selectedValue}
              size={size}
              aria-label={option.label}
              {...getSegmentProps(index)}
            />
          ))}
        </div>
      );
    },
  ),
);

ThemeSwitcher.displayName = 'ThemeSwitcher';
