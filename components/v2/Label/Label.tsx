"use client";
import { forwardRef } from "react";
import * as RadixLabel from "@radix-ui/react-label";
import { cn } from "../lib/cn";
import { labelVariants } from "./label-variants";
import type { LabelProps } from "./Label.types";

/**
 * Label — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Wraps @radix-ui/react-label, which adds the one piece a bare <label> lacks:
 * it forwards clicks/focus to the associated control even when that control is
 * a non-native widget (e.g. our Radix Select trigger). We only supply the look
 * via standard semantic utilities. Reusable on its own; FormField composes it.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <RadixLabel.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { labelVariants };
