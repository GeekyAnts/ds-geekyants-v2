import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type * as RadixDialog from "@radix-ui/react-dialog";
import type { DialogI18nStrings } from "../../utils/i18n/GeeklegoI18nProvider.types";
import type { SheetVariantProps } from "./sheet-variants";

/**
 * Sheet props extend the matching Radix Dialog part, so every native + Radix
 * prop (onOpenChange, onEscapeKeyDown, forceMount …) flows through unchanged.
 * Sheet IS a Radix Dialog positioned as an edge panel — we only add the `side`
 * axis and the built-in close affordance.
 */

export type SheetOverlayProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Overlay
>;

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    SheetVariantProps {
  /** Render the built-in top-right close button. Default true. */
  showClose?: boolean;
  /**
   * Per-instance i18n override for the close-button aria-label. Beats the
   * GeeklegoI18nProvider context, which beats the English default ("Close").
   */
  i18nStrings?: DialogI18nStrings;
}

export type SheetTitleProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Title
>;

export type SheetDescriptionProps = ComponentPropsWithoutRef<
  typeof RadixDialog.Description
>;

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;
export type SheetFooterProps = HTMLAttributes<HTMLDivElement>;
