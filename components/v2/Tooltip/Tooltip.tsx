"use client";
import { forwardRef } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";
import type { TooltipContentProps } from "./Tooltip.types";

/**
 * Tooltip — ShadCN/Radix compound on geeklego's 2-tier tokens.
 *
 * Radix owns the behavior — hover/focus open delay, positioning, the portal,
 * aria-describedby wiring, and escape/pointer dismissal. We only style Content
 * with standard semantic utilities. Content is PORTALLED to <body>, so dark
 * stories use the withDarkPortalRoot decorator.
 *
 * Parts: TooltipProvider · Tooltip (Root) · TooltipTrigger · TooltipContent.
 * Wrap the app (or the story) in a single TooltipProvider so the open/close
 * delays are shared — the ShadCN convention.
 */
export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixTooltip.Portal>
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md",
        "origin-[var(--radix-tooltip-content-transform-origin)]",
        "transition-all duration-150 ease-out",
        "data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100",
        "data-[state=instant-open]:scale-100 data-[state=instant-open]:opacity-100",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        className,
      )}
      {...props}
    />
  </RadixTooltip.Portal>
));
TooltipContent.displayName = "TooltipContent";
