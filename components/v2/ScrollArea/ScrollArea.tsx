"use client";
import { forwardRef } from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "../lib/cn";
import type { ScrollAreaProps, ScrollBarProps } from "./ScrollArea.types";

/**
 * ScrollArea — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the cross-browser custom-scrollbar behavior — it hides the native
 * scrollbar, renders a styled thumb/track, and keeps the keyboard/wheel/touch
 * scrolling native on the Viewport. We supply only the look via standard
 * semantic utilities (border for the thumb, transparent track).
 *
 * Compound: <ScrollArea>…content…<ScrollBar/></ScrollArea>. The vertical
 * ScrollBar is rendered by default; add `<ScrollBar orientation="horizontal"/>`
 * for horizontal overflow.
 */
export const ScrollArea = forwardRef<
  React.ElementRef<typeof RadixScrollArea.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <RadixScrollArea.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <RadixScrollArea.Viewport className="size-full rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {children}
    </RadixScrollArea.Viewport>
    <ScrollBar />
    <RadixScrollArea.Corner />
  </RadixScrollArea.Root>
));
ScrollArea.displayName = "ScrollArea";

/* ScrollBar — the styled track + thumb. Orientation drives the axis layout. */
export const ScrollBar = forwardRef<
  React.ElementRef<typeof RadixScrollArea.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <RadixScrollArea.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-px",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-px",
      className,
    )}
    {...props}
  >
    <RadixScrollArea.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </RadixScrollArea.ScrollAreaScrollbar>
));
ScrollBar.displayName = "ScrollBar";
