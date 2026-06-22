# Build Report — Tooltip (v2)

## Request
"A Tooltip component for the design system. Shows a small text label on hover/focus over any trigger element, positioned above by default. Make it accessible."

## Files created
Written flat into this `outputs/` dir; in the real repo they belong under `components/v2/Tooltip/`.

| File | Purpose |
|---|---|
| `Tooltip.tsx` | Implementation. Named sub-component exports (`TooltipProvider`, `Tooltip`, `TooltipTrigger` pass-through; `TooltipContent` styled via `forwardRef` + `cn`). |
| `Tooltip.types.ts` | `TooltipContentProps` = `ComponentPropsWithoutRef<typeof RadixTooltip.Content>`. |
| `Tooltip.stories.tsx` | Stories: Default, Sides, IconTrigger, LongLabel, DarkMode. Title `v2/Tooltip`, imports v2 CSS, wrapped in a `TooltipProvider` decorator. |
| `README.md` | Warranted — compound component with a **required** `TooltipProvider` wrapper and non-obvious a11y behavior. |
| `INSTALL_NOTES.txt` | Exact (un-run) install command. |

**No `tooltip-variants.ts`** — Tooltip has no enumerated variants (it is a single styled surface; `side` is a Radix prop, not a cva variant). The skill explicitly allows omitting the variants file when a component has no variants.

## Radix primitive used
**`@radix-ui/react-tooltip`** (`Tooltip`). Confirmed against `references/radix-primitive-map.md`: Tooltip → `@radix-ui/react-tooltip`, which provides hover/focus delay, positioning, `aria-describedby`, portal, and dismiss. This is exactly the surface the request needs (hover/focus open + accessibility), so it is hand-rolled-free per the Radix-first rule. Followed the compound-component shape from `composition-example.md` (Dialog/Popover pattern): Radix owns behavior + context, we restyle parts. No `createContext`, no focus/keyboard hooks, no `cloneElement`.

### Behavior wired to the request
- **Hover AND focus**: native to `RadixTooltip.Trigger` — no extra code.
- **Above by default**: `TooltipContent` defaults `side="top"` (overridable). An `Arrow` is included.
- **Accessible**: Radix sets `aria-describedby` on the trigger linking it to the content; opens on focus, dismisses on Escape/blur. README also instructs keeping an `aria-label` on icon-only triggers.

## Exact install command
```
pnpm add @radix-ui/react-tooltip
```
(Not run — `@radix-ui/react-tooltip` is not currently in `node_modules`. Recorded in `INSTALL_NOTES.txt`.)

## Semantic tokens used
Standard ShadCN/Tailwind semantics only — verified present in `design-system/v2/semantics.css`:
- `bg-popover` → `--popover`
- `text-popover-foreground` → `--popover-foreground`
- `border-border` → `--border`
- `rounded-md` → `--radius` (via `--radius-md`)
- `shadow-md`, `z-50`, `opacity`/`scale` via built-in utilities and `data-[state=…]` attrs
- `fill-popover` on the arrow (resolves the same `--popover` semantic)

No component-token tier. No `--ext-*` tokens (no brand-custom variant exists). **No changes to `design-system/v2/` were needed.**

## Key decisions
1. **Compound, Radix-backed** — matched the Dialog/Popover shape rather than hand-rolling. Pass-through exports for Provider/Root/Trigger; only `Content` is styled.
2. **`side="top"` default** baked into `TooltipContent` to satisfy "positioned above by default" while keeping all four sides available through the Radix prop.
3. **`TooltipProvider` exported and used in the story decorator** — Radix requires a provider ancestor; documented as required in the README so consumers don't hit the runtime error.
4. **No variants file / no README-by-reflex avoided** — README included only because the provider requirement + a11y notes genuinely warrant docs.
5. **DarkMode story** sets both `data-theme="dark"` and `.dark` with `max-w-2xl`, per the hard rule.
6. **Styling discipline** — only registered semantic utilities; the one `var()` arbitrary (`origin-[var(--radix-tooltip-content-transform-origin)]`) is a Radix-provided positioning var with no registered utility, which the skill permits.

## Verification (not runnable in this sandbox)
Files are not placed under the real `components/v2/`, so `tsc`/Storybook/lint were not executed here. In-repo the slice would be verified with `npx tsc --noEmit`, a scoped Storybook build, `npm run lint`, and `npm run validate-tokens` (token chain unaffected — no token files touched). Imports use relative paths (`../lib/cn`, `../Button/Button`); no old 3-tier imports; no `memo(forwardRef)`; no hand-rolled a11y.
