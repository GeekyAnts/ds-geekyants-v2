import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { badgeVariants } from "./badge-variants";
import type { BadgeProps } from "./Badge.types";

/**
 * Badge — ShadCN pattern on geeklego's 2-tier token system.
 *
 * A static inline status/label pill — no focus/keyboard/portal surface, so it's
 * styled markup (rung 3), hand-rolled with cva + cn. Styled entirely with
 * standard semantic utilities. `asChild` lets it render as a link or button via
 * Radix Slot while keeping a single source of styling.
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
