# Composition example — a compound component on a Radix primitive

This shows the v2 way to build a compound component (multiple coordinated parts + shared state) by **building on a Radix primitive** instead of hand-rolling context, focus trapping, and slot injection. Dialog is the canonical case; the same shape applies to Popover, Tabs, DropdownMenu, etc.

The principle: **Radix owns the behavior and the context; you own the look.** You wrap each Radix part as a named sub-component, styling it with `cn()` + standard semantic utilities. You do not write `createContext`, `useFocusTrap`, `useEscapeDismiss`, `useClickOutside`, or `cloneElement` — Radix's `Dialog.Root` already coordinates all of its children.

## Files

```
components/v2/Dialog/
├── Dialog.tsx          ← sub-components wrapping Radix Dialog parts
├── Dialog.types.ts     ← prop types (extend Radix component props)
└── Dialog.stories.tsx  ← stories (incl. DarkMode)
```

A `*-variants.ts` is optional here — Dialog's parts mostly take fixed semantic classes, not enumerated variants. Add one only if a part has real variants (e.g. content size).

## Dialog.tsx (shape)

```tsx
"use client";
import { forwardRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";

// Root / Trigger / Portal / Close pass straight through — Radix owns them.
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

// Overlay — styled with semantic utilities. Radix handles the portal + state.
export const DialogOverlay = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-foreground/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

// Content — portalled, focus-trapped, escape-dismissable BY RADIX. We only style.
export const DialogContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <DialogOverlay />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-lg rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
      <RadixDialog.Close
        className="absolute end-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label="Close"
      >
        <X className="size-4" />
      </RadixDialog.Close>
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DialogContent.displayName = "DialogContent";

// Title / Description wrap the Radix parts so they wire aria-labelledby / aria-describedby.
export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";
```

## Why this is the whole point of v2

Compare with the old 3-tier Modal: it hand-rolled `useFocusTrap`, `useEscapeDismiss`, `useClickOutside`, a `createContext` for open state, `cloneElement` to inject props into the trigger, and `--modal-*` component tokens. Every one of those is **deleted** here:

| Old hand-rolled mechanism | v2 |
|---|---|
| `useFocusTrap` | `RadixDialog` traps focus in `Content` |
| `useEscapeDismiss` | Radix closes on Escape |
| `useClickOutside` | Radix closes on overlay/outside click |
| `createContext` open state | `RadixDialog.Root` is the provider; Trigger/Content/Close consume it |
| `cloneElement` to wire the trigger | `RadixDialog.Trigger` (use `asChild` to render your own button) |
| `--modal-bg` / `--modal-shadow` component tokens | `bg-popover`, `border-border`, `shadow-lg` — standard semantics |
| `aria-modal` / `aria-labelledby` wiring | Radix wires it via `Title`/`Description` |

Usage stays paste-and-go and LLM-readable:

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete project</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
    <div className="mt-4 flex justify-end gap-2">
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <Button variant="destructive">Delete</Button>
    </div>
  </DialogContent>
</Dialog>
```

## Takeaways for any compound component

1. **Find the Radix primitive first** (`radix-primitive-map.md`). If it exists, you're restyling its parts, not rebuilding behavior.
2. **Each part = a named sub-component export** wrapping a Radix part, styled with `cn()` + semantic utilities. Pass-through parts (Root/Trigger/Close) need no wrapper.
3. **No `createContext`, no focus/keyboard hooks, no `cloneElement`** — Radix's Root coordinates its children.
4. **Style with semantics** (`bg-popover`, `border-border`, `text-muted-foreground`, `shadow-lg`); no component tokens.
5. **`asChild`** lets consumers pass their own `<Button>` as the trigger/close — keeps a single styling source.
6. Use logical properties for inset positioning (`end-4`, not `right-4`) so RTL works.
