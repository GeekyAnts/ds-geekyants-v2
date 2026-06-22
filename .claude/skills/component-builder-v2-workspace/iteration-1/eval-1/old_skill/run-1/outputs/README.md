# Tooltip

A small text label that appears on **hover and focus** over any trigger element, positioned **above by default**. Built on the Radix Tooltip primitive — Radix owns the accessibility (`aria-describedby` wiring, focus/hover open, escape dismiss), the open/close delay, positioning, collision handling, and the portal. We only supply the look via standard semantic utilities.

## Parts

| Export | Wraps | Role |
|---|---|---|
| `TooltipProvider` | `Radix Tooltip.Provider` | Shares open/skip-delay timing. **Required** — wrap your app (or a subtree) once. |
| `Tooltip` | `Radix Tooltip.Root` | Pairs one trigger with one content. Pass-through. |
| `TooltipTrigger` | `Radix Tooltip.Trigger` | The hover/focus target. Use `asChild` to render your own element. |
| `TooltipContent` | `Radix Tooltip.Content` | The styled label surface. `side` defaults to `"top"`. |

## Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/v2/Tooltip/Tooltip";
import { Button } from "@/components/v2/Button/Button";

// Wrap once, high in the tree:
<TooltipProvider delayDuration={200}>
  {/* …app… */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Settings">⚙</Button>
    </TooltipTrigger>
    <TooltipContent>Settings</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Accessibility

- The label is exposed to assistive tech via Radix's `aria-describedby` on the trigger — screen-reader users hear it when the trigger is focused.
- Opens on **both** pointer hover and keyboard focus; dismisses on Escape and blur. None of this is hand-rolled — it is Radix behavior.
- A tooltip is supplementary. Don't put essential-only information (or interactive controls) inside it. For an icon-only trigger, still give the trigger its own `aria-label` (the tooltip text and the accessible name are different surfaces).

## Notes

- `side` (`"top" | "right" | "bottom" | "left"`), `sideOffset`, `align`, and all other Radix `Content` props pass straight through `TooltipContent`.
- Styled with standard semantics only: `bg-popover`, `text-popover-foreground`, `border-border`, `rounded-md`, `shadow-md`. No component tokens, no `--ext-*` — Tooltip needs no custom variant.
- Re-themes live in dark mode because the semantics resolve at runtime via `@theme inline`.
