import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type * as RadixAlertDialog from "@radix-ui/react-alert-dialog";

/**
 * Props extend the matching Radix AlertDialog parts, so every native + Radix
 * prop (onOpenChange, onEscapeKeyDown, etc.) flows through unchanged. No variant
 * axis — each part is a thin styled wrapper; Radix owns the modal behavior.
 *
 * Note: an alert dialog deliberately has NO dismiss-on-click-outside and NO
 * close-X — it requires an explicit Action or Cancel choice (role=alertdialog).
 */
export type AlertDialogOverlayProps = ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Overlay
>;
export type AlertDialogContentProps = ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Content
>;
export type AlertDialogTitleProps = ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Title
>;
export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Description
>;
export type AlertDialogActionProps = ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Action
>;
export type AlertDialogCancelProps = ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Cancel
>;

export type AlertDialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;
