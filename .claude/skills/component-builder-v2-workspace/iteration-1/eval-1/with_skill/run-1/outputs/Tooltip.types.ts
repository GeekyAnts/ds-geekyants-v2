import type { ComponentPropsWithoutRef } from "react";
import type * as RadixTooltip from "@radix-ui/react-tooltip";

/**
 * Props extend the matching Radix part, so every native + Radix prop
 * (side, align, sideOffset, collisionPadding, onEscapeKeyDown, forceMount, …)
 * flows through unchanged. TooltipContent defaults `side` to "top" so the label
 * sits above the trigger out of the box.
 */
export type TooltipContentProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Content
>;
