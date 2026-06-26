"use client";
import { forwardRef } from "react";
import * as RadixSeparator from "@radix-ui/react-separator";
import { cn } from "../lib/cn";
import type { SeparatorProps } from "./Separator.types";

/**
 * Separator — ShadCN/Radix pattern on geeklego's 2-tier tokens.
 *
 * Radix owns the semantics: a decorative separator is hidden from the
 * accessibility tree, a non-decorative one gets role="separator" + the right
 * aria-orientation. We only supply the look (a 1px border-coloured line) via
 * standard semantic utilities. Orientation flips width/height off the prop.
 *
 * No variant axis — orientation is a Radix prop, not a cva variant.
 */
export const Separator = forwardRef<
  React.ElementRef<typeof RadixSeparator.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <RadixSeparator.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";
