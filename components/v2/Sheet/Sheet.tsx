"use client";
import { forwardRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { useComponentI18n } from "../../utils/i18n/useGeeklegoI18n";
import { sheetVariants } from "./sheet-variants";
import type {
  SheetOverlayProps,
  SheetContentProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetHeaderProps,
  SheetFooterProps,
} from "./Sheet.types";

/**
 * Sheet — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A Sheet IS a Radix Dialog rendered as an edge-anchored panel. Radix owns ALL
 * behavior — focus trap, escape-to-dismiss, click-outside, scroll lock, portal,
 * and the aria-modal / aria-labelledby / aria-describedby wiring (the last via
 * Title/Description). We only supply the look via standard semantic utilities
 * and the `side` slide-in transform (sheetVariants), animated off Radix's
 * data-[state] — no animation library needed.
 *
 * Compound: <Sheet><SheetTrigger/><SheetContent side="right"><SheetHeader>
 *   <SheetTitle/><SheetDescription/></SheetHeader>…<SheetFooter/></SheetContent></Sheet>
 */
export const Sheet = RadixDialog.Root;
export const SheetTrigger = RadixDialog.Trigger;
export const SheetClose = RadixDialog.Close;
export const SheetPortal = RadixDialog.Portal;

export const SheetOverlay = forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  SheetOverlayProps
>(({ className, ...props }, ref) => (
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
));
SheetOverlay.displayName = "SheetOverlay";

export const SheetContent = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  SheetContentProps
>(({ side, className, children, showClose = true, i18nStrings, ...props }, ref) => {
  // Resolve the close-button label: prop override → provider context → "Close".
  const t = useComponentI18n("dialog", i18nStrings);
  return (
    <SheetPortal>
      <SheetOverlay />
      <RadixDialog.Content
        ref={ref}
        className={cn(sheetVariants({ side }), "focus-visible:outline-none", className)}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            className={cn(
              "absolute end-4 top-4 rounded-sm text-muted-foreground opacity-70",
              "transition-opacity hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:pointer-events-none",
            )}
            aria-label={t.closeLabel}
          >
            <X className="size-4" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = "SheetContent";

/* Layout helpers — pure presentation, no Radix part to wrap. */
export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div
    className={cn("flex flex-col gap-1.5 text-center sm:text-start", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cn(
      "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

/* Title / Description wrap the Radix parts so they wire aria-labelledby /
   aria-describedby onto Content automatically. */
export const SheetTitle = forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export { sheetVariants };
