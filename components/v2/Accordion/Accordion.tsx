"use client";
import { forwardRef } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import type {
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./Accordion.types";

/**
 * Accordion — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — single/multiple open, `collapsible`, the
 * aria-expanded / aria-controls wiring, keyboard nav (arrows/Home/End), and the
 * --radix-accordion-content-height measurement that drives the open/close
 * animation. We only supply the look, via standard semantic utilities
 * (border-border, text-foreground, text-muted-foreground, ring-ring …).
 *
 * Styling note: no component-token tier and no --ext-* tokens — disclosure is
 * plain ShadCN vocabulary. The expand/collapse motion animates off Radix's
 * data-[state] attributes + the height CSS var, so no animation library.
 */

/* Root — coordinates its items; pass-through, no wrapper needed. */
export const Accordion = RadixAccordion.Root;

/* Item — a bordered row. Radix supplies the open/closed state attributes. */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <RadixAccordion.Item
      ref={ref}
      className={cn("border-b border-border", className)}
      {...props}
    />
  ),
);
AccordionItem.displayName = "AccordionItem";

/* Trigger — must be wrapped in Radix.Header to land the heading role.
   The chevron rotates off data-[state=open] (Radix sets it). */
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-4 py-4 text-start text-sm font-medium text-foreground",
        "transition-colors hover:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
        aria-hidden
      />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

/* Content — Radix measures the panel into --radix-accordion-content-height,
   which the animation keyframes consume so the height transitions cleanly. */
export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-muted-foreground",
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";
