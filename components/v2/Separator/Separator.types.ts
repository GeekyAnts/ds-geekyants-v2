import type { ComponentPropsWithoutRef } from "react";
import type * as RadixSeparator from "@radix-ui/react-separator";

/**
 * Props extend the Radix Separator.Root part, so `orientation`
 * ("horizontal" | "vertical") and `decorative` flow through unchanged.
 * No variant axis.
 */
export type SeparatorProps = ComponentPropsWithoutRef<
  typeof RadixSeparator.Root
>;
