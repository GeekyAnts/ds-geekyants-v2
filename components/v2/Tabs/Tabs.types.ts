import type { ComponentPropsWithoutRef } from "react";
import type * as RadixTabs from "@radix-ui/react-tabs";

/**
 * Each prop type extends its Radix Tabs part, so all native + Radix props
 * (value, defaultValue, onValueChange, orientation, dir on Root; value on
 * Trigger/Content; disabled on Trigger) flow through unchanged. No variant axis.
 */
export type TabsProps = ComponentPropsWithoutRef<typeof RadixTabs.Root>;
export type TabsListProps = ComponentPropsWithoutRef<typeof RadixTabs.List>;
export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof RadixTabs.Trigger
>;
export type TabsContentProps = ComponentPropsWithoutRef<
  typeof RadixTabs.Content
>;
