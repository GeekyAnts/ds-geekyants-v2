import type { ComponentPropsWithoutRef } from "react";
import type * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (onSelect, onOpenChange, sideOffset, checked, value, etc.) flows through
 * unchanged. We only add what's genuinely ours (`inset` on items/labels).
 */

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
>;

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> {
  /** Indent the item to align with sibling items that carry a leading icon/check. */
  inset?: boolean;
}

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.CheckboxItem
>;

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.RadioItem
>;

export interface DropdownMenuLabelProps
  extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label> {
  /** Indent the label to align with inset items. */
  inset?: boolean;
}

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Separator
>;

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger> {
  /** Indent the sub-trigger to align with inset items. */
  inset?: boolean;
}

export type DropdownMenuSubContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubContent
>;

export type DropdownMenuShortcutProps =
  React.HTMLAttributes<HTMLSpanElement>;
