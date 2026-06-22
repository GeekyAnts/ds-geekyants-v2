import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type * as RadixDialog from "@radix-ui/react-dialog";

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (onOpenChange, forceMount, onEscapeKeyDown, etc.) flows through unchanged.
 * We only add what's genuinely ours (e.g. DialogContent's `showClose`).
 */

export type DialogOverlayProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Overlay
>;

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  /** Render the built-in top-right close button. Default true. */
  showClose?: boolean;
}

export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Title
>;

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Description
>;

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
