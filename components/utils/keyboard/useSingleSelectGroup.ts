"use client";

import { useCallback, useRef, useState } from 'react';
import { useRovingTabindex } from './useRovingTabindex';
import type { UseSingleSelectGroupOptions, SingleSelectGroupReturn } from './useSingleSelectGroup.types';

/**
 * Composes controlled/uncontrolled state management with roving tabindex
 * for single-select button groups (segmented controls, theme switchers, toggle groups).
 *
 * Eliminates the ~20-line boilerplate that was duplicated between ThemeSwitcher
 * and SegmentedControl (controlled/uncontrolled branching, useRovingTabindex
 * wiring, buttonRefs array, ref callback factory, onActiveIndexChange + focus).
 */
export function useSingleSelectGroup<T extends string>({
  options,
  value,
  defaultValue,
  onChange,
}: UseSingleSelectGroupOptions<T>): SingleSelectGroupReturn<T> {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const selectedValue: T = isControlled ? value! : internalValue;

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentIndex = options.findIndex((o) => o.value === selectedValue);

  const handleActiveIndexChange = useCallback(
    (index: number) => {
      const option = options[index];
      if (option && !option.disabled) {
        if (!isControlled) {
          setInternalValue(option.value);
        }
        onChange?.(option.value);
        buttonRefs.current[index]?.focus();
      }
    },
    [options, isControlled, onChange],
  );

  const { handleKeyDown, getItemProps } = useRovingTabindex({
    itemCount: options.length,
    activeIndex: currentIndex,
    orientation: 'horizontal',
    isItemDisabled: useCallback(
      (i: number) => !!options[i]?.disabled,
      [options],
    ),
    onActiveIndexChange: handleActiveIndexChange,
  });

  const containerProps = {
    role: 'group' as const,
    onKeyDown: handleKeyDown,
  };

  const getSegmentProps = useCallback(
    (index: number) => {
      const option = options[index];
      const isPressed = option?.value === selectedValue;
      const { tabIndex } = getItemProps(index);

      return {
        ref: (el: HTMLButtonElement | null) => {
          buttonRefs.current[index] = el;
        },
        tabIndex,
        'aria-pressed': isPressed,
        onClick: () => {
          if (option && !option.disabled) {
            if (!isControlled) {
              setInternalValue(option.value);
            }
            onChange?.(option.value);
            buttonRefs.current[index]?.focus();
          }
        },
      };
    },
    [options, selectedValue, getItemProps, isControlled, onChange],
  );

  return { containerProps, getSegmentProps, selectedValue };
}
