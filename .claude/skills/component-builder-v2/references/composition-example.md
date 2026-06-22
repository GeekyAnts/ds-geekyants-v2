# Composition example — a compound component on a Radix primitive

This explains the v2 way to build a compound component (multiple coordinated parts + shared state) by **building on a Radix primitive** instead of hand-rolling context, focus trapping, and slot injection. Dialog is the canonical case; the same shape applies to Popover, Tabs, DropdownMenu, etc.

The principle: **Radix owns the behavior and the context; you own the look.** You wrap each Radix part as a named sub-component, styling it with `cn()` + standard semantic utilities. You do not write `createContext`, `useFocusTrap`, `useEscapeDismiss`, `useClickOutside`, or `cloneElement` — Radix's `Dialog.Root` already coordinates all of its children.

## Read the real shipped component, not a synthesized one

The canonical worked example now lives in the repo: **[`components/v2/Dialog/`](../../../components/v2/Dialog/)** (and **`components/v2/Popover/`** for a lighter-weight floating-layer case). Read those files directly — they're the live, type-checked, story-covered version of everything below, and they can't drift from reality the way a copy-pasted snippet in this doc would.

What to notice when you read `Dialog.tsx`:

- **Pass-through parts** (`Root`, `Trigger`, `Close`) are re-exported straight from Radix — no wrapper, because they have no look to add.
- **Styled parts** (`Overlay`, `Content`, `Title`, `Description`) are `forwardRef` sub-components that wrap the matching `RadixDialog.*` part, typed as `React.ComponentPropsWithoutRef<typeof RadixDialog.Part>`, and merge `cn(...semantic classes..., className)`.
- **`Content` is portalled, focus-trapped, and escape/click-outside dismissable by Radix** — the wrapper only adds positioning + `bg-popover border-border shadow-lg` and a styled `Close`.
- A `*-variants.ts` is **optional** for compounds — Dialog's parts mostly take fixed semantic classes, not enumerated variants. Add one only if a part has real variants (e.g. content size).

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
