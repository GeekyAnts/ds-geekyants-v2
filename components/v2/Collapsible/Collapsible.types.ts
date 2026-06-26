import type { ComponentPropsWithoutRef } from "react";
import type * as RadixCollapsible from "@radix-ui/react-collapsible";

/**
 * Props extend the matching Radix Collapsible parts, so every native + Radix
 * prop (open, defaultOpen, onOpenChange, disabled, etc.) flows through
 * unchanged. No variant axis — each part is a thin styled wrapper.
 */
export type CollapsibleProps = ComponentPropsWithoutRef<
  typeof RadixCollapsible.Root
>;
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof RadixCollapsible.Trigger
>;
export type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof RadixCollapsible.Content
>;
