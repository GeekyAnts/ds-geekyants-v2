"use client";
import { forwardRef } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";
import type { TooltipContentProps } from "./Tooltip.types";

/**
 * Tooltip — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — hover/focus open with delay, positioning &
 * collision handling, dismiss-on-escape/blur/pointer-leave, the portal, and the
 * accessibility wiring (Trigger gets `aria-describedby` pointing at the styled
 * Content, which carries role="tooltip"). We only supply the look, via standard
 * semantic utilities (bg-popover, text-popover-foreground, border-border …).
 *
 * Accessible by construction: shows on hover AND keyboard focus, never traps
 * focus, and is announced to screen readers via aria-describedby.
 */

/* Pass-through parts — Radix coordinates its children, so no wrapper.
   Provider sets shared delay/skip config; wrap your app (or a subtree) once.
   Root/Trigger have no look to add. */
export const TooltipProvider = RadixTooltip.Provider;
export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

/* Content — portalled, positioned, and dismissable BY RADIX. Defaults to
   `side="top"` (positioned above the trigger by default, per the spec). We
   style + animate off its data-[state]/data-[side] attributes (no animation
   library needed) and render an arrow tinted to match the surface. */
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 6, children, ...props }, ref) => (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-xs select-none rounded-md border border-border bg-popover px-3 py-1.5",
          "text-xs font-medium text-popover-foreground shadow-md",
          "origin-[var(--radix-tooltip-content-transform-origin)]",
          "transition-all duration-150 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100",
          "data-[state=instant-open]:scale-100 data-[state=instant-open]:opacity-100",
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
