import type { ComponentPropsWithoutRef } from "react";
import type * as RadixContextMenu from "@radix-ui/react-context-menu";

/**
 * Props extend the matching Radix ContextMenu parts, so every native + Radix
 * prop flows through unchanged. The `inset` flag (item/label/subtrigger) adds
 * left padding to align with checkbox/radio rows. No variant axis — each part is
 * a thin styled wrapper; Radix owns the menu behavior.
 */
export interface ContextMenuItemProps
  extends ComponentPropsWithoutRef<typeof RadixContextMenu.Item> {
  inset?: boolean;
}

export type ContextMenuContentProps = ComponentPropsWithoutRef<
  typeof RadixContextMenu.Content
>;
export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof RadixContextMenu.CheckboxItem
>;
export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof RadixContextMenu.RadioItem
>;
export interface ContextMenuLabelProps
  extends ComponentPropsWithoutRef<typeof RadixContextMenu.Label> {
  inset?: boolean;
}
export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof RadixContextMenu.Separator
>;
export interface ContextMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof RadixContextMenu.SubTrigger> {
  inset?: boolean;
}
export type ContextMenuSubContentProps = ComponentPropsWithoutRef<
  typeof RadixContextMenu.SubContent
>;
export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
