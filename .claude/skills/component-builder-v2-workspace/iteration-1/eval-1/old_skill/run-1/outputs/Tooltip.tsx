"use client";
import { forwardRef } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";
import type { TooltipContentProps } from "./Tooltip.types";

/**
 * Tooltip — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Radix owns the hover/focus open behavior, the open/close delay, positioning,
 * the portal, escape-to-dismiss, and the `aria-describedby` wiring that makes the
 * label accessible to screen readers and keyboard users. We only style Content
 * with standard semantic utilities.
 *
 * Defaults are tuned for the requested behavior:
 *  - shows on hover AND focus (Radix Trigger handles both natively),
 *  - positioned ABOVE the trigger by default (`side="top"` on Content).
 *
 * `TooltipProvider` wraps the app (or a subtree) once to share open/skip-delay
 * timing across tooltips; `Tooltip` / `TooltipTrigger` pass straight through.
 */
export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 6, children, ...props }, ref) => (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-xs rounded-md border border-border bg-popover px-3 py-1.5",
          "text-xs text-popover-foreground shadow-md select-none",
          "origin-[var(--radix-tooltip-content-transform-origin)]",
          "transition-all duration-150 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100",
          className,
        )}
        {...props}
      >
        {children}
        <RadixTooltip.Arrow className="fill-popover" width={11} height={5} />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  ),
);
TooltipContent.displayName = "TooltipContent";
