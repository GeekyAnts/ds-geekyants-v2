"use client";
import { forwardRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { useComponentI18n } from "../../utils/i18n/useGeeklegoI18n";
import type {
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogHeaderProps,
  DialogFooterProps,
} from "./Dialog.types";

/**
 * Dialog — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — focus trap, escape-to-dismiss, click-outside,
 * scroll lock, portal, and the aria-modal / aria-labelledby / aria-describedby
 * wiring (the last via Title/Description). We only supply the look, via standard
 * semantic utilities (bg-popover, border-border, text-muted-foreground …).
 *
 * This is the Step-4 validation that Radix earns its place: the old 3-tier Modal
 * hand-rolled useFocusTrap / useEscapeDismiss / useClickOutside / a createContext
 * for open state / cloneElement trigger injection / --modal-* component tokens.
 * None of that is reimplemented here.
 */

/* Pass-through parts — Radix.Root coordinates its children, so no wrapper. */
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
export const DialogPortal = RadixDialog.Portal;

/* Overlay — Radix handles the portal + open/closed state; we style + animate
   off its data-[state] attribute (no animation library needed). */
export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm",
        "transition-opacity duration-200 ease-out",
        "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className,
      )}
      {...props}
    />
  ),
);
DialogOverlay.displayName = "DialogOverlay";

/* Content — portalled, focus-trapped, escape-dismissable BY RADIX.
   `showClose` lets a consumer suppress the built-in close affordance. */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, showClose = true, i18nStrings, ...props }, ref) => {
    // Resolve the close-button label: prop override → provider context → "Close".
    const t = useComponentI18n("dialog", i18nStrings);
    return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4",
          "rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg",
          "transition-all duration-200 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=open]:scale-100 data-[state=open]:opacity-100",
          "focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            className={cn(
              "absolute end-4 top-4 rounded-sm text-muted-foreground opacity-70",
              "transition-opacity hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
              "disabled:pointer-events-none",
            )}
            aria-label={t.closeLabel}
          >
            <X className="size-4" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </DialogPortal>
    );
  },
);
DialogContent.displayName = "DialogContent";

/* Layout helpers — pure presentation, no Radix part to wrap. */
export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={cn("flex flex-col gap-1.5 text-center sm:text-start", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/* Title / Description wrap the Radix parts so they wire aria-labelledby /
   aria-describedby onto Content automatically. */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
