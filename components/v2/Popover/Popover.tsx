"use client";
import { forwardRef } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "../lib/cn";
import type { PopoverContentProps } from "./Popover.types";

/**
 * Popover — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Radix owns positioning, click-outside, escape-to-dismiss, focus management,
 * and the portal. We only style Content with standard semantic utilities.
 * Reusable on its own; also the floating surface that Combobox composes.
 */
export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md",
          "origin-[var(--radix-popover-content-transform-origin)]",
          "transition-all duration-150 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=open]:scale-100 data-[state=open]:opacity-100",
          "focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    </RadixPopover.Portal>
  ),
);
PopoverContent.displayName = "PopoverContent";
