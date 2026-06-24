import type { ComponentPropsWithoutRef } from "react";
import type * as RadixToggle from "@radix-ui/react-toggle";
import type { ToggleVariantProps } from "./toggle-variants";

export interface ToggleProps
  extends ComponentPropsWithoutRef<typeof RadixToggle.Root>,
    ToggleVariantProps {}
