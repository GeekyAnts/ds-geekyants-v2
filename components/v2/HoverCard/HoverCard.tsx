"use client";
import { forwardRef } from "react";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { cn } from "../lib/cn";
import type { HoverCardContentProps } from "./HoverCard.types";

/**
 * HoverCard — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — the open-on-hover/focus intent with open/close
 * delays, the portal, the popper positioning, and the data-[state]/data-[side]
 * attributes. We supply only the look via standard semantic utilities
 * (bg-popover, text-popover-foreground, border-border …) and animate off the
 * data-state/data-side attributes — no animation library needed.
 *
 * Compound: <HoverCard><HoverCardTrigger/><HoverCardContent>…</HoverCardContent></HoverCard>
 */
export const HoverCard = RadixHoverCard.Root;
export const HoverCardTrigger = RadixHoverCard.Trigger;

export const HoverCardContent = forwardRef<
  React.ElementRef<typeof RadixHoverCard.Content>,
  HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <RadixHoverCard.Portal>
    <RadixHoverCard.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        "transition-all duration-150 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        className,
      )}
      {...props}
    />
  </RadixHoverCard.Portal>
));
HoverCardContent.displayName = "HoverCardContent";
