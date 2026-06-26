import type { ComponentPropsWithoutRef } from "react";
import type * as RadixScrollArea from "@radix-ui/react-scroll-area";

export type ScrollAreaProps = ComponentPropsWithoutRef<
  typeof RadixScrollArea.Root
>;

export type ScrollBarProps = ComponentPropsWithoutRef<
  typeof RadixScrollArea.ScrollAreaScrollbar
>;
