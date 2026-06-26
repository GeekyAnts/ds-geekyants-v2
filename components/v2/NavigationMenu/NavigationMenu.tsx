"use client";
import { forwardRef } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { navigationMenuTriggerStyle } from "./navigation-menu-variants";
import type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuIndicatorProps,
  NavigationMenuViewportProps,
} from "./NavigationMenu.types";

/**
 * NavigationMenu — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A site-nav primitive with dropdown panels. Radix owns ALL behaviour — the
 * open/close intent with pointer + keyboard, focus management, the shared
 * viewport that morphs between panels, the position indicator (arrow), and the
 * role/aria wiring. We only supply the look via standard semantic utilities
 * (bg-popover panels, accent highlights) and animate off the data-[state]/
 * data-[motion] attributes.
 *
 * Compound: <NavigationMenu><NavigationMenuList><NavigationMenuItem>
 *   <NavigationMenuTrigger/><NavigationMenuContent/></NavigationMenuItem>
 * </NavigationMenuList></NavigationMenu>. The Root renders a shared Viewport by
 * default (set `viewport={false}` to render content in place instead).
 */
export const NavigationMenu = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.Root>,
  NavigationMenuProps
>(({ className, children, viewport = true, ...props }, ref) => (
  <RadixNavigationMenu.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    {viewport && <NavigationMenuViewport />}
  </RadixNavigationMenu.Root>
));
NavigationMenu.displayName = "NavigationMenu";

/* Pass-through parts. */
export const NavigationMenuItem = RadixNavigationMenu.Item;

export const NavigationMenuList = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <RadixNavigationMenu.List
    ref={ref}
    className={cn("flex flex-1 list-none items-center justify-center gap-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

/* Trigger — adopts the shared trigger style + a rotating chevron on open. */
export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <RadixNavigationMenu.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-px size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
      aria-hidden
    />
  </RadixNavigationMenu.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/* Content — the dropdown panel. Animates in/out off data-[motion] (which side
   the active menu is relative to the previous one) so the shared viewport slides. */
export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <RadixNavigationMenu.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full p-4 md:absolute md:w-auto",
      "transition-opacity duration-200 ease-out",
      "data-[motion=from-start]:opacity-0 data-[motion=from-end]:opacity-0",
      "data-[motion=to-start]:opacity-0 data-[motion=to-end]:opacity-0",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

/* Link — adopts the active state; reuse navigationMenuTriggerStyle for nav-bar
   style links, or style inline for list-panel rows. */
export const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.Link>,
  NavigationMenuLinkProps
>(({ className, ...props }, ref) => (
  <RadixNavigationMenu.Link
    ref={ref}
    className={cn(
      "block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors",
      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

/* Indicator — the little arrow that tracks the active trigger. */
export const NavigationMenuIndicator = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <RadixNavigationMenu.Indicator
    ref={ref}
    className={cn(
      "top-full z-10 flex h-2 items-end justify-center overflow-hidden",
      "transition-opacity duration-200 data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100",
      className,
    )}
    {...props}
  >
    <div className="relative top-1 size-2 rotate-45 rounded-tl-sm border-l border-t border-border bg-popover" />
  </RadixNavigationMenu.Indicator>
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

/* Viewport — the shared animated container that hosts the open Content. Sized to
   the active panel via Radix's --radix-navigation-menu-viewport-* runtime vars. */
export const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof RadixNavigationMenu.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <RadixNavigationMenu.Viewport
      ref={ref}
      className={cn(
        "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
        "transition-all duration-200 ease-out",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export { navigationMenuTriggerStyle };
