import type { ComponentPropsWithoutRef } from "react";
import type * as RadixSelect from "@radix-ui/react-select";

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (value, onValueChange, position, side, disabled, etc.) flows through
 * unchanged. We add only what's genuinely ours (`inset` on the label).
 */

export type SelectTriggerProps = ComponentPropsWithoutRef<
  typeof RadixSelect.Trigger
>;

export type SelectContentProps = ComponentPropsWithoutRef<
  typeof RadixSelect.Content
>;

export interface SelectLabelProps
  extends ComponentPropsWithoutRef<typeof RadixSelect.Label> {
  /** Indent the label to align with items (which carry a leading check slot). */
  inset?: boolean;
}

export type SelectItemProps = ComponentPropsWithoutRef<
  typeof RadixSelect.Item
>;

export type SelectSeparatorProps = ComponentPropsWithoutRef<
  typeof RadixSelect.Separator
>;

export type SelectScrollUpButtonProps = ComponentPropsWithoutRef<
  typeof RadixSelect.ScrollUpButton
>;

export type SelectScrollDownButtonProps = ComponentPropsWithoutRef<
  typeof RadixSelect.ScrollDownButton
>;
