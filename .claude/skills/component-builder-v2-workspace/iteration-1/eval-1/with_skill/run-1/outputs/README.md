# Tooltip

A small text label shown on hover **and** keyboard focus over a trigger element,
positioned **above by default**. Built on `@radix-ui/react-tooltip`, so it is
accessible by construction.

## Why Radix

Radix `Tooltip` provides everything a tooltip needs and that you must not
hand-roll: hover/focus open with a shared delay, positioning + collision
flipping, dismiss on escape/blur/pointer-leave, portal rendering, and the
accessibility wiring (`aria-describedby` from trigger → content, `role="tooltip"`
on the content). We only add the look with standard semantic utilities.

## Parts

| Export | Wraps | Notes |
|---|---|---|
| `TooltipProvider` | `Tooltip.Provider` | Required ancestor. Sets shared `delayDuration` / `skipDelayDuration`. Mount **once** near your app root. |
| `Tooltip` | `Tooltip.Root` | One per trigger; pass-through. |
| `TooltipTrigger` | `Tooltip.Trigger` | Use `asChild` to wrap your own focusable element (e.g. a `Button`). |
| `TooltipContent` | `Tooltip.Content` | Styled bubble + arrow. Defaults `side="top"`, `sideOffset={6}`. |

## Usage

```tsx
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/v2/Tooltip/Tooltip";
import { Button } from "@/components/v2/Button/Button";

// Mount the provider once (e.g. in your root layout):
<TooltipProvider delayDuration={200}>
  {/* …app… */}
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Settings">
        <Settings />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Settings</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Accessibility notes

- **Trigger must be focusable.** Use `asChild` to wrap a real interactive
  element (button/link). A non-focusable element (e.g. a bare `<span>`) will not
  open on keyboard focus and breaks the a11y contract.
- For **icon-only triggers**, still give the trigger an `aria-label` — the
  tooltip is supplementary, not the accessible name, and it isn't read when the
  control is reached via the screen-reader rotor.
- **Don't put essential or interactive content in a tooltip.** It's hover/focus
  ephemeral and not reachable by pointer on touch devices. Use a Popover/Dialog
  for anything the user must act on.

## Positioning

`side` accepts `"top" | "right" | "bottom" | "left"` (default `"top"`); `align`
and `sideOffset` pass through to Radix. Radix flips the side automatically on
collision with the viewport edge.
