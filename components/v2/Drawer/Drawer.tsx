"use client";
import { forwardRef } from "react";
import { Drawer as VaulDrawer } from "vaul";
import { cn } from "../lib/cn";
import type {
  DrawerProps,
  DrawerContentProps,
  DrawerOverlayProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerHeaderProps,
  DrawerFooterProps,
} from "./Drawer.types";

/**
 * Drawer — ShadCN pattern on geeklego's 2-tier token system, built on vaul
 * (category B). vaul owns the drag-to-dismiss sheet physics, snap points, scroll
 * lock, and the focus/escape behavior — Radix Dialog can't do the drag gesture.
 * We only supply the look via standard semantic utilities (bg-background,
 * border-border, bg-muted for the drag handle …). A bottom sheet by default.
 *
 * Compound: <Drawer><DrawerTrigger/><DrawerContent><DrawerHeader>
 *   <DrawerTitle/><DrawerDescription/></DrawerHeader>…<DrawerFooter/>
 * </DrawerContent></Drawer>
 */
export const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerProps) => (
  <VaulDrawer.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

/* Pass-through parts — vaul coordinates these. */
export const DrawerTrigger = VaulDrawer.Trigger;
export const DrawerPortal = VaulDrawer.Portal;
export const DrawerClose = VaulDrawer.Close;

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <VaulDrawer.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-foreground/50", className)}
      {...props}
    />
  ),
);
DrawerOverlay.displayName = "DrawerOverlay";

/* Content — the sheet itself. vaul sets data-vaul-drawer-direction on this node;
   we position + round + size the sheet per direction off that attribute, so the
   same component renders a top / bottom / left / right drawer correctly. The
   drag handle is shown only for the vertical (top/bottom) directions, where a
   horizontal pill reads as a grab affordance. vaul handles the drag-to-dismiss. */
export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <VaulDrawer.Content
        ref={ref}
        className={cn(
          "group/drawer fixed z-50 flex border border-border bg-background focus-visible:outline-none",
          // bottom (default): full-width strip pinned to the bottom edge
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:h-auto data-[vaul-drawer-direction=bottom]:flex-col data-[vaul-drawer-direction=bottom]:rounded-t-lg",
          // top: full-width strip pinned to the top edge
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:h-auto data-[vaul-drawer-direction=top]:flex-col data-[vaul-drawer-direction=top]:rounded-b-lg",
          // right: full-height panel pinned to the right edge
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:flex-col data-[vaul-drawer-direction=right]:rounded-l-lg data-[vaul-drawer-direction=right]:sm:max-w-sm",
          // left: full-height panel pinned to the left edge
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:flex-col data-[vaul-drawer-direction=left]:rounded-r-lg data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {/* Drag handle — only meaningful for the vertical (top/bottom) sheets;
            shown via the parent Content group's direction attribute. */}
        <div className="mx-auto mt-4 hidden h-2 w-24 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer:block group-data-[vaul-drawer-direction=top]/drawer:block" />
        {children}
      </VaulDrawer.Content>
    </DrawerPortal>
  ),
);
DrawerContent.displayName = "DrawerContent";

/* Layout helpers — pure presentation, no vaul part to wrap. */
export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-start", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

/* Title / Description wrap the vaul parts so they wire the dialog ARIA
   labelledby/describedby automatically. */
export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <VaulDrawer.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <VaulDrawer.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";
