import type { ComponentPropsWithoutRef } from "react";
import type * as RadixPopover from "@radix-ui/react-popover";

/** Extends the Radix Content part — all align/side/collision props pass through. */
export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof RadixPopover.Content
>;
