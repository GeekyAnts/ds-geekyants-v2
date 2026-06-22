"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { buttonVariants } from "./button-variants";
import type { ButtonProps } from "./Button.types";

/**
 * Button — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * - Styled entirely with standard semantic utilities (bg-primary, …); the only
 *   non-standard surface is the namespaced `gamified` variant (--ext-* tokens).
 * - `asChild` delegates rendering to its child via Radix Slot (e.g. an <a>),
 *   keeping a single source of styling.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
