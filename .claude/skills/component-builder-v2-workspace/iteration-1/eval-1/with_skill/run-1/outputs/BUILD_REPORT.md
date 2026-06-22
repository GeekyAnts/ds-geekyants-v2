# Build Report — Tooltip (GeekLego v2)

## What was built

An accessible **Tooltip** compound component following the v2 ShadCN/Radix
pattern. Shows a small text label on hover **and** keyboard focus over any
trigger element, positioned **above by default** (`side="top"`).

## Files created

| File | Purpose |
|---|---|
| `Tooltip.tsx` | Implementation. Re-exports Radix pass-through parts (`TooltipProvider`, `Tooltip`, `TooltipTrigger`) and a styled `TooltipContent` (`forwardRef` + `cn` + semantic utilities + arrow). |
| `Tooltip.types.ts` | `TooltipContentProps` = `ComponentPropsWithoutRef<typeof RadixTooltip.Content>` — all Radix/native props pass through. |
| `Tooltip.stories.tsx` | Stories: Default, Sides, IconTrigger, LongText, DarkMode. Title `v2/Tooltip`; imports `design-system/v2/index.css`. |
| `README.md` | Compound-component + a11y docs (justified: the Provider requirement and trigger-must-be-focusable rule are non-obvious). |
| `INSTALL_NOTES.txt` | Exact install command. |

**No `tooltip-variants.ts`** — `TooltipContent` has fixed semantic classes and no
enumerated variants, matching shipped Popover/Dialog (which ship without a
variants file). No custom `--ext-*` variant requested, so none added.

## Radix primitive used

**`@radix-ui/react-tooltip`** — chosen per `references/radix-primitive-map.md`
("Tooltip → `Tooltip` → `@radix-ui/react-tooltip`"). It provides, and we did NOT
re-roll: hover/focus open with shared delay, positioning + collision flipping,
dismiss on escape/blur/pointer-leave, the portal, and the a11y wiring
(`aria-describedby` trigger→content, `role="tooltip"`). This satisfies the "make
it accessible" requirement by construction — accessibility is delegated to Radix,
not hand-built.

Followed the ShadCN convention of exporting `TooltipProvider` from this module
(Radix requires one provider ancestor for shared delay config); documented in the
README and used in every story.

## Exact install command

```
npm install @radix-ui/react-tooltip
```

(npm, per the skill — not actually run in this sandbox.)

## Semantic tokens used (all standard, zero custom vocabulary)

- `bg-popover`, `text-popover-foreground` — the tooltip surface (matches
  Popover/Dialog floating surfaces).
- `border-border` — 1px outline.
- `shadow-md`, `rounded-md` — elevation + radius (radius derives from `--radius`).
- `fill-popover` — the Radix `Arrow` fill, tinted to the surface color.
- `bg-background` — DarkMode story wrapper only.

All resolve through the chain `primitive → semantic → utility` via
`@theme inline`, so the dark theme re-themes live with no rebuild.

## Key decisions

1. **Compound, not single-element** — mirrored Popover/Dialog: pass-through parts
   re-exported raw, only `Content` wrapped/styled.
2. **`side="top"` + `sideOffset={6}` defaults** — meets "above by default" while
   leaving `side`/`align` overridable.
3. **Open/close animation via `data-[state]`/transform-origin custom prop** — no
   animation library, same technique as Popover/Dialog.
4. **Arrow added** — small UX polish pointing to the trigger; tinted with the
   registered `fill-popover` utility (no arbitrary literal).
5. **`asChild` triggers in all examples** — keeps Button as the single styling
   source and guarantees a focusable trigger (the a11y contract).
6. **README written** (allowed by the skill for compounds with non-obvious a11y):
   the Provider-once rule and focusable-trigger requirement warrant docs.

## Compliance check (v2 hard rules)

- No component-token tier written. ✅
- No hardcoded values / no primitive referenced from the component. ✅
- No bare arbitrary literals (only the documented `var(--radix-…transform-origin)`
  and Radix-supplied `var()`, which is the sanctioned exception). ✅
- Radix-first: focus/escape/portal/positioning/ARIA all delegated to Radix. ✅
- Plain `forwardRef` + `displayName`, `cn()` merge, `asChild` via Radix. ✅
- Relative imports only; no old 3-tier imports. ✅
- DarkMode story sets both `data-theme="dark"` and `.dark`, with `max-w-2xl`. ✅

## Verification note

These files were written to the sandbox outputs directory (not `components/v2/`),
so `tsc`/Storybook/lint were not run against the live tree per the task's
constraints. The component mirrors the type-checked, story-covered Popover/Dialog
shape exactly; the only new dependency is `@radix-ui/react-tooltip` (install
command above).
