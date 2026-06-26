import type { HTMLAttributes } from "react";
import type { BadgeVariantProps } from "./badge-variants";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {
  /**
   * Render as the child element instead of a <span>, merging props onto it
   * (Radix Slot). Use for a badge that is itself a link: `<Badge asChild><a …/></Badge>`.
   */
  asChild?: boolean;
}
