"use client";
import { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/cn";
import type {
  SelectTriggerProps,
  SelectContentProps,
  SelectLabelProps,
  SelectItemProps,
  SelectSeparatorProps,
  SelectScrollUpButtonProps,
  SelectScrollDownButtonProps,
} from "./Select.types";

/**
 * Select — ShadCN/Radix compound component on geeklego's 2-tier tokens.
 *
 * Radix owns ALL behavior — the listbox, typeahead, arrow-key nav,
 * aria-activedescendant, escape/click-outside dismiss, portal, scroll buttons,
 * and the role=listbox / option ARIA wiring. We only supply the look, via
 * standard semantic utilities (border-input, bg-popover, focus:bg-accent …).
 *
 * Styling note: no component-token tier and no --ext-* tokens — a select is
 * plain ShadCN vocabulary. The trigger reuses the same border-input / ring-ring
 * affordances as Input so the two controls match in a FormField.
 */

/* Pass-through parts — Radix.Root coordinates its children. */
export const Select = RadixSelect.Root;
export const SelectGroup = RadixSelect.Group;
export const SelectValue = RadixSelect.Value;

/* Trigger — the closed control; mirrors Input's border/ring affordances. */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <RadixSelect.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
        "shadow-xs transition-colors duration-150 ease-out",
        "placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <RadixSelect.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  ),
);
SelectTrigger.displayName = "SelectTrigger";

/* Scroll buttons — Radix shows these only when the list overflows. */
export const SelectScrollUpButton = forwardRef<
  HTMLDivElement,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <RadixSelect.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className,
    )}
    {...props}
  >
    <ChevronUp className="size-4" aria-hidden />
  </RadixSelect.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

export const SelectScrollDownButton = forwardRef<
  HTMLDivElement,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <RadixSelect.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className,
    )}
    {...props}
  >
    <ChevronDown className="size-4" aria-hidden />
  </RadixSelect.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

/* Content — portalled, positioned, dismissable BY RADIX. Animates off
   data-[state] + data-[side]. `position="popper"` is the common default. */
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <RadixSelect.Portal>
      <RadixSelect.Content
        ref={ref}
        position={position}
        className={cn(
          "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
          "origin-[var(--radix-select-content-transform-origin)]",
          "transition-all duration-150 ease-out",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          "data-[state=open]:scale-100 data-[state=open]:opacity-100",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <RadixSelect.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </RadixSelect.Viewport>
        <SelectScrollDownButton />
      </RadixSelect.Content>
    </RadixSelect.Portal>
  ),
);
SelectContent.displayName = "SelectContent";

/* Label — a non-interactive group heading. */
export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <RadixSelect.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        inset && "ps-8",
        className,
      )}
      {...props}
    />
  ),
);
SelectLabel.displayName = "SelectLabel";

/* Item — Radix moves focus here on highlight, so the highlight is focus:bg-accent. */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <RadixSelect.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none",
        "transition-colors focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute start-2 flex size-3.5 items-center justify-center">
        <RadixSelect.ItemIndicator>
          <Check className="size-4" aria-hidden />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  ),
);
SelectItem.displayName = "SelectItem";

/* Separator — Radix gives it role=separator. */
export const SelectSeparator = forwardRef<
  HTMLDivElement,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";
