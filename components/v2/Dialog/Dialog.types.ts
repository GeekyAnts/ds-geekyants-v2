import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type * as RadixDialog from "@radix-ui/react-dialog";
import type { DialogI18nStrings } from "../../utils/i18n/GeeklegoI18nProvider.types";

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
  /**
   * Per-instance i18n overrides for this dialog's system strings
   * (currently the close-button aria-label). Beats the GeeklegoI18nProvider
   * context, which beats the English default ("Close").
   */
  i18nStrings?: DialogI18nStrings;
}

export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Title
>;

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Description
>;

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
