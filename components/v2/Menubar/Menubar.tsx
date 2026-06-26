"use client";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import * as RadixMenubar from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../lib/cn";
import type {
  MenubarProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarShortcutProps,
} from "./Menubar.types";

/**
 * Menubar — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * A desktop-app-style menu bar (File / Edit / View …). Radix owns ALL behaviour
 * — moving focus between menus with arrow keys, roving tabindex, typeahead,
 * escape, click-outside, submenus, portal, and the role=menubar/menu/menuitem
 * ARIA wiring. We only supply the look via standard semantic utilities. `accent`
 * is the highlighted-item semantic; Radix moves DOM focus to the highlighted
 * item, so items use `focus:bg-accent`.
 */

/* Pass-through parts — Radix coordinates these. MenubarMenu is wrapped in a thin
   component (rather than a bare `= RadixMenubar.Menu` re-export) so its emitted
   .d.ts type is locally nameable: the raw Radix.Menu's inferred type references a
   deep pnpm `@radix-ui/react-context` path that the DTS rollup can't portably
   name (TS2742). The wrapper gives it a stable local signature. */
export const MenubarMenu = (
  props: ComponentProps<typeof RadixMenubar.Menu>,
) => <RadixMenubar.Menu {...props} />;
MenubarMenu.displayName = "MenubarMenu";
export const MenubarGroup = RadixMenubar.Group;
export const MenubarPortal = RadixMenubar.Portal;
export const MenubarSub = RadixMenubar.Sub;
export const MenubarRadioGroup = RadixMenubar.RadioGroup;

/* Root — the horizontal bar that holds the menu triggers. */
export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, ...props }, ref) => (
    <RadixMenubar.Root
      ref={ref}
      className={cn(
        "flex h-10 items-center gap-1 rounded-md border border-border bg-background p-1",
        className,
      )}
      {...props}
    />
  ),
);
Menubar.displayName = "Menubar";

/* Trigger — a top-level menu label; opens its menu on click/hover-when-open. */
export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, ...props }, ref) => (
    <RadixMenubar.Trigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
);
MenubarTrigger.displayName = "MenubarTrigger";

/* Content — portalled, focus-managed, escape-dismissable BY RADIX. */
export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
    <MenubarPortal>
      <RadixMenubar.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-48 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
          "origin-[var(--radix-menubar-content-transform-origin)]",
          "transition-all duration-150 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=open]:scale-100 data-[state=open]:opacity-100",
          "focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  ),
);
MenubarContent.displayName = "MenubarContent";

/* Item — Radix moves focus here on highlight, so the highlight is focus:bg-accent. */
export const MenubarItem = forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, inset, ...props }, ref) => (
    <RadixMenubar.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        inset && "ps-8",
        className,
      )}
      {...props}
    />
  ),
);
MenubarItem.displayName = "MenubarItem";

/* CheckboxItem — Radix owns the checked state; the indicator slots a check icon. */
export const MenubarCheckboxItem = forwardRef<
  HTMLDivElement,
  MenubarCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <RadixMenubar.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
      "transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute start-2 flex size-3.5 items-center justify-center">
      <RadixMenubar.ItemIndicator>
        <Check className="size-4" aria-hidden />
      </RadixMenubar.ItemIndicator>
    </span>
    {children}
  </RadixMenubar.CheckboxItem>
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

/* RadioItem — sibling RadioItems coordinate via MenubarRadioGroup. */
export const MenubarRadioItem = forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  ({ className, children, ...props }, ref) => (
    <RadixMenubar.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute start-2 flex size-3.5 items-center justify-center">
        <RadixMenubar.ItemIndicator>
          <Circle className="size-2 fill-current" aria-hidden />
        </RadixMenubar.ItemIndicator>
      </span>
      {children}
    </RadixMenubar.RadioItem>
  ),
);
MenubarRadioItem.displayName = "MenubarRadioItem";

/* Label — a non-interactive section heading. */
export const MenubarLabel = forwardRef<HTMLDivElement, MenubarLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <RadixMenubar.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        inset && "ps-8",
        className,
      )}
      {...props}
    />
  ),
);
MenubarLabel.displayName = "MenubarLabel";

/* Separator — Radix gives it role=separator. */
export const MenubarSeparator = forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <RadixMenubar.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  ),
);
MenubarSeparator.displayName = "MenubarSeparator";

/* SubTrigger — opens a submenu; the chevron points to the side it opens on. */
export const MenubarSubTrigger = forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => (
    <RadixMenubar.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        inset && "ps-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ms-auto size-4" aria-hidden />
    </RadixMenubar.SubTrigger>
  ),
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";

/* SubContent — the submenu surface. MUST be portalled: Radix renders SubContent
   inside the parent Content's DOM, and Content has overflow-hidden, so without a
   Portal the submenu is clipped by its parent. The Portal lifts it to <body>. */
export const MenubarSubContent = forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, ...props }, ref) => (
    <MenubarPortal>
      <RadixMenubar.SubContent
        ref={ref}
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
          "origin-[var(--radix-menubar-content-transform-origin)]",
          "transition-all duration-150 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=open]:scale-100 data-[state=open]:opacity-100",
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  ),
);
MenubarSubContent.displayName = "MenubarSubContent";

/* Shortcut — pure presentation; a trailing keyboard hint. */
export const MenubarShortcut = ({ className, ...props }: MenubarShortcutProps) => (
  <span
    className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)}
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";
