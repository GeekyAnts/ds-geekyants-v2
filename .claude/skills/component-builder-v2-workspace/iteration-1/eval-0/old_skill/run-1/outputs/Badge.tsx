"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { badgeVariants } from "./badge-variants";
import type { BadgeProps } from "./Badge.types";

/**
 * Badge — a small pill-shaped status label (ShadCN/Radix pattern on
 * geeklego's 2-tier token system).
 *
 * - Pure presentation: no a11y/keyboard/portal surface, so no Radix
 *   behavioral primitive — just cva + cn + forwardRef.
 * - Styled entirely with standard semantic utilities (bg-primary,
 *   bg-secondary, bg-destructive, border-input …). No --ext-* tokens needed.
 * - `asChild` delegates rendering to its child via Radix Slot (e.g. an <a>),
 *   keeping a single source of styling.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { badgeVariants };
