"use client";
import { forwardRef } from "react";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { cn } from "../lib/cn";
import type {
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./Collapsible.types";

/**
 * Collapsible — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A single open/close disclosure. Radix owns the behavior — aria-expanded /
 * aria-controls wiring, keyboard toggle, and the
 * --radix-collapsible-content-height measurement that drives the open/close
 * animation. We only supply the look; the expand/collapse motion animates off
 * Radix's data-[state] attributes via the animate-collapsible-* utilities
 * registered in semantics.css (no animation library).
 *
 * Root + Trigger are pass-through; Content adds the height animation + overflow
 * clip. Per-instance look comes from consumer className (cn() merge).
 *
 * Compound: <Collapsible><CollapsibleTrigger/><CollapsibleContent/></Collapsible>
 */
export const Collapsible = RadixCollapsible.Root;

export const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof RadixCollapsible.Trigger>,
  CollapsibleTriggerProps
>(({ className, ...props }, ref) => (
  <RadixCollapsible.Trigger
    ref={ref}
    className={cn(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = forwardRef<
  React.ElementRef<typeof RadixCollapsible.Content>,
  CollapsibleContentProps
>(({ className, ...props }, ref) => (
  <RadixCollapsible.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
      className,
    )}
    {...props}
  />
));
CollapsibleContent.displayName = "CollapsibleContent";
