"use client";
import { forwardRef } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../lib/cn";
import type { CheckboxProps } from "./Checkbox.types";

/**
 * Checkbox — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the behavior — keyboard toggle, the role/aria-checked wiring, the
 * indeterminate tri-state, and form integration. We only supply the look via
 * standard semantic utilities (border-input, bg-primary, text-primary-foreground,
 * ring-ring). The Indicator renders a check (checked) or a minus (indeterminate),
 * switching off Radix's data-state attribute.
 *
 * No variant axis — size comes from consumer className (defaults to size-4).
 */
export const Checkbox = forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      "group peer size-4 shrink-0 rounded-sm border border-input bg-background",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {/* Radix only mounts the Indicator when checked or indeterminate; the
          `group` is on Root, so we show the right glyph for each state off its
          data-state attribute — works for controlled AND uncontrolled. */}
      <Check className="size-3.5 group-data-[state=indeterminate]:hidden" />
      <Minus className="hidden size-3.5 group-data-[state=indeterminate]:block" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));
Checkbox.displayName = "Checkbox";
