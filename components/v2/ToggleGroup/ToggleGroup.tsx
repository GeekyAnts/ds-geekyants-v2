"use client";
import { createContext, forwardRef, useContext } from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "../lib/cn";
import { toggleVariants } from "../Toggle/toggle-variants";
import type { ToggleVariantProps } from "../Toggle/toggle-variants";
import type {
  ToggleGroupProps,
  ToggleGroupItemProps,
} from "./ToggleGroup.types";

/**
 * ToggleGroup — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — single- vs multiple-selection state, roving
 * tabindex, arrow-key navigation, and the data-[state=on|off] each item styles
 * off. We only supply the look, reusing the Toggle component's `toggleVariants`
 * so a standalone Toggle and a grouped item look identical.
 *
 * variant/size set on the Root cascade to every Item via a small context (the
 * ShadCN pattern), and an Item can still override per-instance.
 *
 * Compound: <ToggleGroup type="single"><ToggleGroupItem value="a">…</ToggleGroupItem></ToggleGroup>
 */
const ToggleGroupContext = createContext<ToggleVariantProps>({
  variant: "default",
  size: "md",
});

export const ToggleGroup = forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => (
  <RadixToggleGroup.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </RadixToggleGroup.Root>
));
ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, children, ...props }, ref) => {
  const ctx = useContext(ToggleGroupContext);
  return (
    <RadixToggleGroup.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: variant ?? ctx.variant,
          size: size ?? ctx.size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </RadixToggleGroup.Item>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
