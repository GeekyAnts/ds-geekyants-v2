import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
} from "react";
import type { sidebarMenuButtonVariants } from "./sidebar-variants";
import type { VariantProps } from "class-variance-authority";

/** Shared shape of the sidebar context (provided by SidebarProvider). */
export interface SidebarContextValue {
  /** Expanded/collapsed state on desktop. */
  state: "expanded" | "collapsed";
  /** Whether the (desktop) sidebar is open. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Whether the mobile (Sheet) sidebar is open. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** True when the viewport is below the mobile breakpoint. */
  isMobile: boolean;
  /** Toggle the appropriate sidebar for the current viewport. */
  toggleSidebar: () => void;
}

export interface SidebarProviderProps extends ComponentProps<"div"> {
  /** Controlled open state (desktop). */
  open?: boolean;
  /** Uncontrolled initial open state (desktop). Defaults to true. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SidebarProps extends ComponentProps<"div"> {
  /** Which edge the sidebar anchors to. */
  side?: "left" | "right";
  /** Visual treatment of the panel. */
  variant?: "sidebar" | "floating" | "inset";
  /**
   * How the sidebar collapses on desktop. Defaults to `icon` (shrinks to a
   * visible icon rail). `offcanvas` slides the whole panel off-screen; `none`
   * disables collapsing.
   */
  collapsible?: "offcanvas" | "icon" | "none";
}

export type SidebarHeaderProps = ComponentProps<"div">;
export type SidebarFooterProps = ComponentProps<"div">;
export type SidebarContentProps = ComponentProps<"div">;
export type SidebarGroupProps = ComponentProps<"div">;
export type SidebarGroupLabelProps = ComponentProps<"div">;
export type SidebarGroupContentProps = ComponentProps<"div">;
export type SidebarMenuProps = ComponentProps<"ul">;
export type SidebarMenuItemProps = ComponentProps<"li">;
export type SidebarMenuSubProps = ComponentProps<"ul">;

export type SidebarTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type SidebarMenuButtonVariantProps = VariantProps<
  typeof sidebarMenuButtonVariants
>;

export interface SidebarMenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SidebarMenuButtonVariantProps {
  /** Render as the child element (e.g. an <a> or a router Link). */
  asChild?: boolean;
  /** Highlight as the active page. */
  isActive?: boolean;
  /**
   * Tooltip shown when the sidebar is collapsed to icon mode. A plain string
   * label; pass nothing to disable. Hidden unless `collapsible="icon"` and
   * the sidebar is collapsed (or on mobile, where it's always hidden).
   */
  tooltip?: string;
}

export interface SidebarMenuSubButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isActive?: boolean;
  size?: "sm" | "md";
}

export type SidebarInsetProps = ComponentProps<"main">;
export type SidebarRailProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type SidebarSeparatorProps = ComponentProps<"div">;
