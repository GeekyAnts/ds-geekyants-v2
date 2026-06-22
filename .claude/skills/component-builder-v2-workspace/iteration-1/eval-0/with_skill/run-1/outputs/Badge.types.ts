import type { HTMLAttributes } from "react";
import type { BadgeVariantProps } from "./badge-variants";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {
  /**
   * Render as the child element instead of a <span>, merging props onto it
   * (Radix Slot). Use to tag a status with a link/button while keeping a single
   * source of styling: `<Badge asChild><a …/></Badge>`.
   */
  asChild?: boolean;
}
