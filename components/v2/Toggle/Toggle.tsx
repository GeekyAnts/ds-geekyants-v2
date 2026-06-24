"use client";
import { forwardRef } from "react";
import * as RadixToggle from "@radix-ui/react-toggle";
import { cn } from "../lib/cn";
import { toggleVariants } from "./toggle-variants";
import type { ToggleProps } from "./Toggle.types";

/**
 * Toggle — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * A standalone two-state pressable (bold / italic / mute …). Radix owns the
 * pressed-state behavior — aria-pressed, keyboard toggle, and the
 * data-[state=on|off] attribute the `toggleVariants` style off. We supply only
 * the look via standard semantic utilities.
 */
export const Toggle = forwardRef<
  React.ElementRef<typeof RadixToggle.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <RadixToggle.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));
Toggle.displayName = "Toggle";

export { toggleVariants };
