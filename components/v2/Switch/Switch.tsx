"use client";
import { forwardRef } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "../lib/cn";
import type { SwitchProps } from "./Switch.types";

/**
 * Switch — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the behavior — role="switch", keyboard toggle, aria-checked,
 * and form integration. We supply only the look via standard semantic
 * utilities: the track fills with `primary` when checked and `input` when
 * off, and the thumb (a `background` circle) slides between the two ends
 * off Radix's data-state attribute.
 *
 * No variant axis — size via consumer className.
 */
export const Switch = forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0",
        "transition-transform",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </RadixSwitch.Root>
));
Switch.displayName = "Switch";
