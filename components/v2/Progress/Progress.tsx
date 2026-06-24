"use client";
import { forwardRef } from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "../lib/cn";
import type { ProgressProps } from "./Progress.types";

/**
 * Progress — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the accessibility surface — role="progressbar", aria-valuenow /
 * aria-valuemax, and the data-state (complete / loading / indeterminate). We
 * supply only the look via standard semantic utilities: a `secondary` track
 * with a `primary` fill that we slide in with a translateX off the value.
 *
 * No variant axis — width/height come from consumer className.
 */
export const Progress = forwardRef<
  React.ElementRef<typeof RadixProgress.Root>,
  ProgressProps
>(({ className, value, max = 100, ...props }, ref) => {
  // Translate the fill off-screen by the remaining fraction (ShadCN pattern).
  // `value == null` → indeterminate; leave the fill parked at 0 so the bar reads
  // empty rather than implying a known amount.
  const pct =
    value == null ? 0 : Math.min(Math.max(value, 0), max) / max * 100;
  return (
    <RadixProgress.Root
      ref={ref}
      value={value}
      max={max}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
      {...props}
    >
      <RadixProgress.Indicator
        className="size-full flex-1 rounded-full bg-primary transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${100 - pct}%)` }}
      />
    </RadixProgress.Root>
  );
});
Progress.displayName = "Progress";
