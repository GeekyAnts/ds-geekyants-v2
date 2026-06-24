import type { ComponentPropsWithoutRef } from "react";
import type * as RadixMenubar from "@radix-ui/react-menubar";

/**
 * Props extend the matching Radix Menubar parts, so every native + Radix prop
 * flows through unchanged. The `inset` flag (item/label/subtrigger) adds left
 * padding to align with checkbox/radio rows. No variant axis — each part is a
 * thin styled wrapper; Radix owns the menu behaviour.
 */
export type MenubarProps = ComponentPropsWithoutRef<typeof RadixMenubar.Root>;
export type MenubarTriggerProps = ComponentPropsWithoutRef<
  typeof RadixMenubar.Trigger
>;
export type MenubarContentProps = ComponentPropsWithoutRef<
  typeof RadixMenubar.Content
>;
export interface MenubarItemProps
  extends ComponentPropsWithoutRef<typeof RadixMenubar.Item> {
  inset?: boolean;
}
export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<
  typeof RadixMenubar.CheckboxItem
>;
export type MenubarRadioItemProps = ComponentPropsWithoutRef<
  typeof RadixMenubar.RadioItem
>;
export interface MenubarLabelProps
  extends ComponentPropsWithoutRef<typeof RadixMenubar.Label> {
  inset?: boolean;
}
export type MenubarSeparatorProps = ComponentPropsWithoutRef<
  typeof RadixMenubar.Separator
>;
export interface MenubarSubTriggerProps
  extends ComponentPropsWithoutRef<typeof RadixMenubar.SubTrigger> {
  inset?: boolean;
}
export type MenubarSubContentProps = ComponentPropsWithoutRef<
  typeof RadixMenubar.SubContent
>;
export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
