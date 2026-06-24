import type { ComponentPropsWithoutRef } from "react";
import type * as RadixTooltip from "@radix-ui/react-tooltip";

/**
 * TooltipContent props extend the Radix Tooltip.Content part, so positioning
 * props (side, align, sideOffset, alignOffset, avoidCollisions) flow through
 * unchanged. The other parts (Provider/Root/Trigger) are re-exported as-is.
 * No variant axis.
 */
export type TooltipContentProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Content
>;
