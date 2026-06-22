---
name: component-builder-v2
description: >
  Generate production-grade React components for the GeekLego **v2** design
  system — a 2-tier token model (primitives → standard ShadCN/Tailwind
  semantics) with components built on ShadCN's pattern (cva variants + cn() +
  forwardRef + Radix UI primitives). Use this skill whenever the user asks to
  build, create, scaffold, add, wire up, or generate any UI component, control,
  or compound widget in this repo — even if they don't say "component". Triggers
  on: "build a Button", "create a Card", "add a Dialog", "make a modal", "I need
  a combobox", "build a dropdown", "scaffold a form field", "add a tabs
  component", "I want a tooltip", "build the header", or any request to add a UI
  element to the library, including implementing a Figma/design spec. This is the
  v2 skill for the 2-tier ShadCN/Radix architecture under `components/v2/` and
  `design-system/v2/`. Do NOT use the old `component-builder` skill (3-tier,
  component-token blocks, atom/molecule/organism folders) — it generates the
  wrong architecture for this repo.
---

# GeekLego Component Builder (v2 — 2-tier ShadCN/Radix)

You generate v2 components: the ShadCN pattern (`cva` + `cn` + `forwardRef` + Radix primitives), styled with **standard semantic Tailwind utilities** (`bg-primary text-primary-foreground`), on geeklego's primitive palette. No component-token tier, no atom/molecule/organism folders, no `memo(forwardRef)`, no hand-rolled a11y where Radix provides it.

## Read before every session

| File | Why |
|---|---|
| [`CLAUDE.md`](../../../CLAUDE.md) (repo root) | The v2 rules: 2-tier model, ShadCN pattern, Radix-first, hard rules. Authoritative. |
| [`components/v2/Button/`](../../../components/v2/Button/) | **The canonical reference for a simple component.** Mirror its shape exactly: `Button.tsx`, `button-variants.ts`, `Button.types.ts`, `Button.stories.tsx`, and `components/v2/lib/cn.ts`. |
| [`components/v2/Dialog/`](../../../components/v2/Dialog/), [`Popover/`](../../../components/v2/Popover/) | **The shipped references for a compound component built on a Radix primitive.** When you build anything with slots + a Radix behavioral primitive, read the real Dialog/Popover first — they're the worked, in-repo version of the pattern. |
| [`components/v2/Combobox/`](../../../components/v2/Combobox/), [`Command/`](../../../components/v2/Command/) | The shipped reference for the trickiest recipe — `Popover` + `cmdk`. Read these when building a combobox/autocomplete/command-palette. |
| [`design-system/v2/semantics.css`](../../../design-system/v2/semantics.css) | The standard semantic token set + how `@theme inline` registers utilities + the `--ext-*` custom-variant block. Know what semantics exist before styling. |
| `references/radix-primitive-map.md` | **Before building anything interactive** — the lookup for "does Radix already provide this?" |
| `references/composition-example.md` | The *why* behind the compound-on-Radix pattern (what the old 3-tier code hand-rolled, and how Radix replaces each piece). Read alongside the real Dialog above. |

**Hard boundary:** never read, edit, import from, or imitate the old 3-tier code (`components/{atoms,molecules,organisms}/`, `design-system/geeklego.css`, the old `component-builder` skill). It's frozen. v2 lives only under `components/v2/` and `design-system/v2/`.

---

## The generation flow

Atomic design survives here as a **composition discipline**, not a taxonomy. Plan the tree, build leaves first, compose upward. The phases:

### Phase 0 — Decompose & check Radix first

1. **Decompose the request into a composition tree.** A "data table with a filter dropdown" is a table + a dropdown + (maybe) a button — name the pieces and which composes which. Build leaves before the things that compose them (bottom-up). This is the heart of the skill; spend real thought here.

2. **Extraction heuristic.** If the UI contains a styled, interactive control that more than one place could reuse (a custom `<select>`, a toggle, a chip), make it its own component under `components/v2/<Name>/` rather than inlining it. Reusable primitive ≠ "atom" — there are no tiers, just "is this worth its own file?"

3. **🔑 The key v2 decision — "Does Radix already provide this primitive?"** Before hand-rolling anything with a11y, keyboard navigation, focus trapping, portals, dismiss-on-escape, click-outside, or `aria-activedescendant`, check `references/radix-primitive-map.md`. If Radix has it (Dialog, Popover, Tabs, Tooltip, Select, Dropdown, Checkbox, Switch, …), **build on the Radix primitive** — it delivers the focus trap, escape, click-outside, roving tabindex, and ARIA wiring natively. Do not reimplement those. Install the Radix package per-component (`npm install @radix-ui/react-<name>`) when you reach it, not up front. (The repo lists both npm and pnpm in `engines`, but npm is what's wired in practice — use npm.)

   This is the single biggest judgment call the skill makes. When unsure whether a Radix primitive fits, say so and check the map before writing code.

### Phase 1 — Tokens (only if a genuine custom variant exists)

There is **no component-token tier**. Most components need zero token work — they consume standard semantics directly. Touch `design-system/v2/` only when:

- **A genuinely new core semantic is justified** (e.g. status/info, chart data-series that ShadCN doesn't define). Add it to *both* the `:root` block and the `@theme inline` block of `semantics.css`, and treat it as "geeklego extends ShadCN" — document the addition. Don't invent core semantics casually.
- **A brand-custom variant exists** (like Button's `gamified`). Add `--ext-<component>-<variant>-<property>` tokens to the **separate `--ext-*` block** of `semantics.css` (its own `:root` + `@theme inline`), each chained to a *primitive* (never a raw value). Override per-theme in `themes/dark.css` only if needed.

The token chain is always `primitive → semantic` (→ `--ext-*`). Never hardcode, never reference a primitive from a component.

### Phase 2 — Write the files

Mirror the Button slice. Per component, under `components/v2/<ComponentName>/`:

```
<ComponentName>.tsx          ← implementation
<ComponentName>.types.ts     ← Props (native attrs + VariantProps + asChild?)
<component-name>-variants.ts ← cva variants (skip only if the component has no variants)
<ComponentName>.stories.tsx  ← Storybook stories
```

Add a `README.md` only when the API/a11y genuinely warrants it (compound components, non-obvious keyboard behavior). Do **not** generate boilerplate READMEs or `mock-data.json` by reflex — those were 3-tier requirements.

**The component pattern** (see `Button.tsx`):

```tsx
"use client";                          // when it uses hooks/refs/interactivity
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";   // for asChild polymorphism
import { cn } from "../lib/cn";
import { thingVariants } from "./thing-variants";
import type { ThingProps } from "./Thing.types";

export const Thing = forwardRef<HTMLButtonElement, ThingProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(thingVariants({ variant, size }), className)} {...props} />;
  },
);
Thing.displayName = "Thing";
```

Rules baked into that pattern:
- **`forwardRef` + `displayName`** — plain, **not** `memo(forwardRef)` (that was 3-tier; dropped).
- **`cva`** for variants in a separate `*-variants.ts` file; variant classes are standard semantic utilities.
- **`cn()`** (`clsx` + `tailwind-merge`, from `components/v2/lib/cn.ts`) merges variants with consumer `className` last-wins.
- **`asChild` + Radix `Slot`** for polymorphic rendering (a link styled as a button) — replaces hand-rolled `cloneElement`/`__slot` injection.
- **Types** extend the native element attributes + `VariantProps<typeof thingVariants>` + `asChild?`.

**Styling — standard semantic utilities only:**
```tsx
className="bg-primary text-primary-foreground border-input ring-ring rounded-md"
```
Because semantics are registered as real utilities via `@theme inline`, write `bg-primary`, **not** `bg-[var(--primary)]`. Custom variants use only their `--ext-*` utilities (`bg-ext-button-gamified-bg`) and none of the core semantics — that structural separation keeps the themeable layer clean. Bare `var()` arbitraries (`shadow-[var(--ext-…)]`) only where no registered utility exists. Never hardcode hex/px, never bare arbitrary literals (`bg-[#fff]`, `h-[40px]`), never inline `style` for a value that could be a class.

**Match the semantic to its ShadCN role, not just its name.** Standard semantics carry ShadCN names but alias geeklego's *brand* primitives, so a token's value can drift from the role its name implies (e.g. `--accent` should read as a quiet hovered/selected-item highlight, not a loud fill). Pick the semantic whose standard role fits the element — `accent` for hovered/active list & menu items, `muted` for subtle backgrounds, `secondary` for low-emphasis actions, `destructive` for danger. If the only role-appropriate semantic *looks* wrong when you render it (e.g. the list highlight comes out vivid), that's a token-config issue to flag (the semantic is mis-aliased in `semantics.css`) — fix it at the token, don't paper over it with a different semantic in the component and don't reach for an `--ext-*` token. `--ext-*` is only for genuinely brand-custom looks (like Button's loud `gamified`), never a workaround for a mis-tuned core semantic.

**Hover/active tints — use slash-opacity (`hover:bg-primary/90`).** This is the standard ShadCN way to dim a fill on hover/press; it compiles to `color-mix(in oklab, var(--primary) 90%, transparent)`. For element opacity (disabled, fades) use the built-in `opacity-NN` utility (`disabled:opacity-50`). **Never register an `--opacity-*` scale in `@theme`** — doing so makes Tailwind emit `color-mix(… var(--opacity-90) …)` (an invalid unitless value) and the color silently falls back to transparent. The opacity scale lives in `:root` only. `npm run validate-tokens` enforces this.

**Compound components** (slots + context): use the ShadCN sub-component-export pattern — separate named exports (`Dialog`, `DialogTrigger`, `DialogContent`), each typically wrapping a Radix primitive part. Prefer the Radix primitive's built-in context over a hand-rolled `createContext`. See `references/composition-example.md`.

### Phase 3 — Stories

Mirror `Button.stories.tsx`. Import the v2 stylesheet so the slice is self-contained:
`import "../../../design-system/v2/index.css";`. Cover: Default, Variants (core/standard only), Sizes, each custom `--ext-*` variant, Disabled/states, `asChild` (if applicable), and **DarkMode** — wrap in `<div data-theme="dark" className="dark max-w-2xl …">` (set *both* selectors; keep `max-w-2xl`). Title is `v2/<Name>`.

### Phase 4 — Verify

- `npx tsc --noEmit` — clean.
- Build the v2 story through Storybook/Vite to confirm the chain resolves (`--color-brand-900 → --primary → bg-primary`), `--ext-*` utilities emit, and the dark override fires for both selectors. (Full-repo `storybook build` has a pre-existing unrelated failure on `stories/Configure.mdx` — verify v2 with a scoped config.)
- `npm run lint` — ESLint also enforces v2 import discipline (the dependency rule, not folder tiers).
- `npm run validate-tokens` — chain integrity + the opacity guard (fails if any `--opacity-*` is registered in `@theme`, or if `dist/geeklego.css` contains an invalid `color-mix(… var(--opacity-…))`).
- Confirm: no component-token block written, no primitive referenced directly, no old-3-tier import, no `memo(forwardRef)`, no hand-rolled a11y that Radix would provide.

---

## What changed from the old skill (so you don't regress)

| Old 3-tier behavior | v2 |
|---|---|
| Write a `--component-*` token block first, validate twice | **No component tokens.** Consume standard semantics; `--ext-*` only for brand variants. |
| `memo(forwardRef(...))` mandatory | Plain `forwardRef` + `displayName`. |
| `var(--token)` arbitrary-value classes | Standard utilities (`bg-primary`) via `@theme inline`. |
| atom/molecule/organism folders + `catalog.ts` + tier labels | Flat `components/v2/<Name>/`. No catalog. Import discipline = ESLint. |
| Hand-rolled focus trap / escape / click-outside / roving tabindex (`utils/keyboard`) | Radix primitives provide these. Radix-first. |
| `cloneElement` injection, `__slot` markers | Radix `Slot` / `asChild` and Radix context. |
| Fixed 5-file set incl. README + mock-data.json | 4 files (TSX/types/variants/stories); README only when warranted. |
| `clsx`/`cva`/`cn` banned | `cva` + `cn` are the **required** pattern. |

## Never do

1. Write a component-token tier (`--button-*`-style blocks). v2 is 2-tier.
2. Hardcode a value, or reference a primitive directly from a component.
3. Reimplement focus trap / escape / click-outside / roving tabindex / portals when Radix provides the primitive.
4. Use `memo(forwardRef)`, `cloneElement` injection, or `__slot` markers.
5. Create atom/molecule/organism folders, regenerate a catalog, or assign tier labels.
6. Edit, import from, or imitate the frozen 3-tier code or the old skill.
7. Use bare arbitrary literals (`bg-[#fff]`, `h-[40px]`) or inline `style` for class-able values.
8. Put `--ext-*` custom variants inside the core semantic block — they get their own separate block.
9. Invent new core semantic vocabulary casually — extend deliberately and document.
10. Use package import paths between v2 files — relative imports only.
