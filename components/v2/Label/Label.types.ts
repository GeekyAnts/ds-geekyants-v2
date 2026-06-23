import type { ComponentPropsWithoutRef } from "react";
import type * as RadixLabel from "@radix-ui/react-label";
import type { LabelVariantProps } from "./label-variants";

/**
 * Label props — the Radix Label part's props (which include native <label>
 * attributes like `htmlFor`) plus the cva variant axes.
 */
export interface LabelProps
  extends ComponentPropsWithoutRef<typeof RadixLabel.Root>,
    LabelVariantProps {}
