import type { HTMLAttributes } from "react";
import type { BadgeVariantProps } from "./badge-variants";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {
  /**
   * Render as the child element instead of a <span>, merging props onto it
   * (Radix Slot). Use to make a badge an <a> or to badge an arbitrary element:
   * `<Badge asChild><a href="…">New</a></Badge>`.
   */
  asChild?: boolean;
}
