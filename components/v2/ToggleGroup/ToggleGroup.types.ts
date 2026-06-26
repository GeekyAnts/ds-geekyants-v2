import type { ComponentPropsWithoutRef } from "react";
import type * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import type { ToggleVariantProps } from "../Toggle/toggle-variants";

export type ToggleGroupProps = ComponentPropsWithoutRef<
  typeof RadixToggleGroup.Root
> &
  ToggleVariantProps;

export type ToggleGroupItemProps = ComponentPropsWithoutRef<
  typeof RadixToggleGroup.Item
> &
  ToggleVariantProps;
