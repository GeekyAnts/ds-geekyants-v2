import type { HTMLAttributes } from "react";
import type { TypographyVariantProps } from "./typography-variants";

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    TypographyVariantProps {
  /**
   * Render as the child element instead of the variant's default tag, merging
   * props onto it (Radix Slot). Use to keep the type style while changing the
   * element: `<Typography variant="h1" asChild><a href="…">…</a></Typography>`.
   */
  asChild?: boolean;
}
