import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type { Drawer as VaulDrawer } from "vaul";

/**
 * Props extend the matching vaul Drawer parts. vaul owns the drag-to-dismiss
 * sheet physics, the snap points, scroll lock, and the focus/escape behavior;
 * we only restyle. No variant axis — each part is a thin styled wrapper. The
 * Root's `shouldScaleBackground` + `direction` props flow through.
 */
export type DrawerProps = ComponentPropsWithoutRef<typeof VaulDrawer.Root>;
export type DrawerContentProps = ComponentPropsWithoutRef<
  typeof VaulDrawer.Content
>;
export type DrawerOverlayProps = ComponentPropsWithoutRef<
  typeof VaulDrawer.Overlay
>;
export type DrawerTitleProps = ComponentPropsWithoutRef<
  typeof VaulDrawer.Title
>;
export type DrawerDescriptionProps = ComponentPropsWithoutRef<
  typeof VaulDrawer.Description
>;
export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;
