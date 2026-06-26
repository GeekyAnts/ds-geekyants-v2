import type { ComponentPropsWithoutRef } from "react";
import type * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";

/**
 * Props extend the matching Radix NavigationMenu parts, so every native + Radix
 * prop flows through unchanged. The Root carries a `viewport` toggle so a
 * consumer can opt out of the shared animated viewport. No variant axis.
 */
export interface NavigationMenuProps
  extends ComponentPropsWithoutRef<typeof RadixNavigationMenu.Root> {
  /** Render the shared animated viewport that hosts open content. Default true. */
  viewport?: boolean;
}
export type NavigationMenuListProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.List
>;
export type NavigationMenuItemProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.Item
>;
export type NavigationMenuTriggerProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.Trigger
>;
export type NavigationMenuContentProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.Content
>;
export type NavigationMenuLinkProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.Link
>;
export type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.Indicator
>;
export type NavigationMenuViewportProps = ComponentPropsWithoutRef<
  typeof RadixNavigationMenu.Viewport
>;
