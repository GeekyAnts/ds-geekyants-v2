"use client";
import { forwardRef } from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "../lib/cn";
import { buttonVariants } from "../Button/button-variants";
import type {
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
} from "./AlertDialog.types";

/**
 * AlertDialog — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A confirmation prompt: Radix owns ALL behavior — focus trap, escape, scroll
 * lock, portal, and the role="alertdialog" / aria-labelledby / aria-describedby
 * wiring (the last via Title/Description). Unlike Dialog it does NOT dismiss on
 * click-outside and has no close-X: the user must pick Action or Cancel. We only
 * supply the look via standard semantic utilities (bg-popover, border-border).
 * The Action/Cancel buttons reuse Button's buttonVariants so they match the
 * library's buttons exactly (Action = default, Cancel = outline).
 */

/* Pass-through parts — Radix.Root coordinates its children, so no wrapper. */
export const AlertDialog = RadixAlertDialog.Root;
export const AlertDialogTrigger = RadixAlertDialog.Trigger;
export const AlertDialogPortal = RadixAlertDialog.Portal;

/* Overlay — Radix handles the portal + open/closed state; we style + animate
   off its data-[state] attribute (no animation library needed). */
export const AlertDialogOverlay = forwardRef<
  HTMLDivElement,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm",
      "transition-opacity duration-200 ease-out",
      "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className,
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

/* Content — portalled, focus-trapped, escape-dismissable BY RADIX. */
export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <RadixAlertDialog.Content
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
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

/* Layout helpers — pure presentation, no Radix part to wrap. */
export const AlertDialogHeader = ({
  className,
  ...props
}: AlertDialogHeaderProps) => (
  <div
    className={cn("flex flex-col gap-1.5 text-center sm:text-start", className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/* Title / Description wrap the Radix parts so they wire aria-labelledby /
   aria-describedby onto Content automatically. */
export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none text-foreground", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

/* Action / Cancel — the required choice. Styled with Button's variants so they
   are visually identical to the library's buttons. */
export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";
