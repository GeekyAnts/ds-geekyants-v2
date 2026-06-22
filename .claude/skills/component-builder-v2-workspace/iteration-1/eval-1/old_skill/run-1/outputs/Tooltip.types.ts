import type { ComponentPropsWithoutRef } from "react";
import type * as RadixTooltip from "@radix-ui/react-tooltip";

/**
 * Extends the Radix Tooltip Content part — all side/align/collision/sideOffset
 * props pass through. `side` defaults to "top" in TooltipContent (positioned
 * above the trigger by default, per the design-system spec).
 */
export type TooltipContentProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Content
>;
