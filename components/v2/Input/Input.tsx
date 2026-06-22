"use client";
import { forwardRef } from "react";
import { cn } from "../lib/cn";
import { inputVariants } from "./input-variants";
import type { InputProps } from "./Input.types";

/**
 * Input — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * A styled native <input>; there is no Radix Input primitive and a text field
 * has no a11y/keyboard/portal surface to delegate, so this is a leaf component.
 * Styled entirely with standard semantic utilities (border-input, bg-background,
 * ring-ring …); the `error` variant reuses --destructive, so it themes for free.
 *
 * No `asChild`: <input> is a void element with no children to slot into.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        aria-invalid={variant === "error" ? true : props["aria-invalid"]}
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { inputVariants };
