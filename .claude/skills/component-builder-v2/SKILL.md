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

### Phase 0 — Decompose & pick the backbone

1. **Decompose the request into a composition tree.** A "data table with a filter dropdown" is a table + a dropdown + (maybe) a button — name the pieces and which composes which. Build leaves before the things that compose them (bottom-up). This is the heart of the skill; spend real thought here.

2. **Extraction heuristic.** If the UI contains a styled, interactive control that more than one place could reuse (a custom `<select>`, a toggle, a chip), make it its own component under `components/v2/<Name>/` rather than inlining it. Reusable primitive ≠ "atom" — there are no tiers, just "is this worth its own file?"

3. **🔑 The key v2 decision — pick the backbone (three-way, in order).** This is the single biggest judgment call the skill makes. Don't ask "Radix or hand-roll?" — that binary is wrong and dead-ends on Form, Carousel, Calendar, etc. Run `references/radix-primitive-map.md` and decide in this order; first match wins:

   1. **Does Radix provide the primitive?** (a11y, keyboard nav, focus trap, portals, escape/click-outside, `aria-activedescendant`, `data-state`) → **build on Radix** (Dialog, Popover, Tabs, Tooltip, Select, Dropdown, Checkbox, Switch, Accordion, …). It delivers focus trap, escape, click-outside, roving tabindex, and ARIA wiring natively — don't reimplement those.
   2. **Else, does ShadCN use a dedicated headless library for it?** → **build on that library** (the "category B" table in the map): **Form → react-hook-form** (`Controller` + `FormProvider` + a `useFormField` hook — *not* a manual `error`-boolean composer), Combobox/Command → `cmdk`, Carousel → `embla`, Calendar/DatePicker → `react-day-picker`, Drawer → `vaul`, Chart → `recharts`, Sonner, Resizable → `react-resizable-panels`. Still fully 2-tier: the lib owns behavior/state, you own styling. **This rung is the easy one to miss** — a component with a real state surface but no Radix primitive is *not* automatically "pure markup."
   3. **Else, is it just styled markup?** (Button, Badge, Card, Skeleton, Input…) → **hand-roll with `cva` + `cn` + `forwardRef`.**

   Install the backbone package per-component when you reach it (`pnpm add <pkg>`), not up front. (**Use pnpm for installs — never `npm install`.** This repo's `node_modules` is a pnpm tree; `npm install` crashes in npm's dedupe with `Cannot read properties of null (reading 'matches')`, and a `preinstall` guard now blocks npm/yarn outright. `npm run <script>` is still fine — only *installing packages* must go through pnpm.)

   When unsure which rung fits, say so and check the map before writing code. If you find yourself about to reimplement form validation, drag physics, date math, or list filtering by hand, stop — you've skipped rung 2.

### Phase 1 — Tokens (only if a genuine custom variant exists)

There is **no component-token tier**. Most components need zero token work — they consume standard semantics directly. Touch `design-system/v2/` only when:

- **A genuinely new core semantic is justified** (e.g. status/info, chart data-series that ShadCN doesn't define). Add it to *both* the `:root` block and the `@theme inline` block of `semantics.css`, and treat it as "geeklego extends ShadCN" — document the addition. Don't invent core semantics casually. **`semantics.css` is the single source of truth — the Token Editor auto-absorbs any new core semantic (grouped under the standard "Status" category), so you do *not* edit `app/src/types.ts` / `V2_SEMANTIC_KEYS`.** After adding one, reload the cockpit (or click **Update DS** in the Export modal) to see it.
- **A brand-custom variant exists** (like Button's `gamified`). Add `--ext-<component>-<variant>-<property>` tokens to the **separate `--ext-*` block** of `semantics.css` (its own `:root` + `@theme inline`), each chained to a *primitive* (never a raw value). Override per-theme in `themes/dark.css` only if needed.
- **A genuinely new text size/weight/leading is needed** (rare — the existing scale covers `text-2xs…9xl`). Typography primitives use Tailwind's namespaces: `--text-*` (sizes → `text-*`), `--font-weight-*` (→ `font-medium` etc.), `--leading-*`, `--tracking-*`, `--font-sans/mono/display`. Add the new primitive to **`primitives.css`** (both the `@theme` block and the `:root` mirror) — the component then just uses the standard utility (`text-sm`), no semantic tier and no `--ext-*` needed. The Token Editor auto-absorbs it on reload / **Update DS** (the parser reads these prefixes from disk). Don't invent numbered names like `--font-size-14` — that scale is gone.

The token chain is always `primitive → semantic` (→ `--ext-*`). Never hardcode, never reference a primitive from a component.

### Phase 2 — Write the files

Mirror the Button slice. Per component, under `components/v2/<ComponentName>/`:

```
<ComponentName>.tsx          ← implementation
<ComponentName>.types.ts     ← Props (native attrs + VariantProps + asChild?)
<component-name>-variants.ts ← cva variants (omit when the component has no variants — see note)
<ComponentName>.stories.tsx  ← Storybook stories
```

**When to omit the variants file.** A `*-variants.ts` file only earns its place when the component has a real variant axis (Button's `variant`/`size`, Input's `variant`/`inputSize`). **Compound components built on a Radix behavioral primitive — Dialog, Popover, Accordion, DropdownMenu, Select — typically have *no* cva variants:** each sub-part is a thin styled wrapper whose classes are fixed, and per-instance differences come from consumer `className` (merged via `cn()`), not a cva axis. For these, skip the variants file entirely (the shipped Dialog/Accordion/Select do). A *composer* like FormField is the same — no variants, just layout + wiring. Don't invent a variants file to fill the slot; add one only when you actually have variants to express. (Leaf controls that aren't on a Radix primitive — Button, Input, Badge — are where variants usually live.)

Add a `README.md` only when the API/a11y genuinely warrants it (compound components, non-obvious keyboard behavior, a context constraint like FormField's "parts must live inside the root"). Do **not** generate boilerplate READMEs or `mock-data.json` by reflex — those were 3-tier requirements.

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

**Portalled components (Dialog, Popover, Select, DropdownMenu, Combobox — anything whose `Content` renders into `<body>`):** the dark wrapper `<div>` does NOT theme the portalled surface, because the portal escapes it. Flag the theme on the document root too — but do this with the shared **`withDarkPortalRoot`** decorator from [`components/v2/lib/dark-portal-decorator.tsx`](../../../components/v2/lib/dark-portal-decorator.tsx):

```tsx
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";
export const DarkMode: Story = {
  render: () => (/* wrap trigger in <div data-theme="dark" className="dark …"> as usual */),
  decorators: [withDarkPortalRoot],
};
```

**NEVER mutate `document.documentElement` (`setAttribute`/`classList.add`) inline in a decorator body or render function.** That runs the DOM write on *every* render; under Strict Mode + Radix re-renders (popper reposition, cmdk re-filter per keystroke) it forces a full-document style recalc on each interaction and freezes the Storybook renderer — and it leaks the `dark` flag onto every other story. `withDarkPortalRoot` does the toggle in a `useEffect` with cleanup (once per mount, restored on unmount), which is the only correct pattern. A render-time `document.*` mutation is a hard review failure.

**NEVER put a raw HTML tag in a `parameters.docs.description.story` (or `.component`) string.** Those strings are rendered as **markdown** on the autodocs page. A literal `<body>`, `<div>`, `<Dialog>`, etc. is parsed as a real HTML element and nested inside the description's `<p>` — invalid HTML (`<body> cannot be a child of <p>`) that triggers a React hydration error and **freezes the entire docs page** (and every interactive story on it). Always wrap tag/attribute references in inline code: write `` "…portalled to `<body>`, so it sets `data-theme=\"dark\"`…" `` — never `"…portalled to <body>…"`. Backtick-escaping renders correctly AND avoids the freeze. (Raw `<tag>` text inside JS `//` comments is fine — only the description *strings* reach the markdown renderer.)

### Phase 3.5 — Export from the package barrel (always)

**Every component you build must be re-exported from [`components/index.ts`](../../../components/index.ts) — this is not optional and not deferred.** That barrel is the package's public surface: `pnpm build` bundles only what it exports into `dist/index.js`, so a component that isn't in the barrel ships *nothing* to consumers (a forked/published design system can't `import { Thing } from "@scope/pkg"`). Building the files is only half the job; wiring the export is the other half.

After writing the component files, append its exports to `components/index.ts`:

```ts
// components/index.ts
export * from "./v2/Thing/Thing";            // the component (and, for compound components,
                                             // all its named sub-parts — DialogTrigger, etc.)
export type * from "./v2/Thing/Thing.types"; // the Props/types (so consumers get them too)
```

Rules:
- **`export *`** from the `.tsx` picks up the main export **and** every named sub-part of a compound component (e.g. `Dialog`, `DialogTrigger`, `DialogContent`) in one line — no need to list each.
- **`export type *`** from the `.types.ts` re-exports the Props interface and any other types.
- Add the lines under the v2-components section of the barrel, grouped with the other components, in a sensible (e.g. alphabetical) order.
- If the barrel still carries the legacy comment saying v2 components are "intentionally NOT re-exported," that note is now stale for any component you add — leave existing structure intact but add your exports regardless.

> If you skip this step, the component works in Storybook but is invisible to any app installing the package. Treat "added to the barrel" as part of the definition of done, alongside the four component files.

### Phase 4 — Verify

- `npx tsc --noEmit` — clean.
- **Barrel export present** — confirm `components/index.ts` re-exports the new component (and its types). Without this it won't ship in `dist/index.js`.
- Build the v2 story through Storybook/Vite to confirm the chain resolves (`--color-brand-900 → --primary → bg-primary`), `--ext-*` utilities emit, and the dark override fires for both selectors. **Storybook HMR gotcha:** Tailwind v4's content scan under the dev server doesn't reliably pick up classes in a *brand-new* file (a reload won't fix it) — if a just-written utility looks "missing," **restart Storybook** before assuming the code is wrong; `pnpm run build:css` / `pnpm run build-storybook` always emit it. (Also: v4 `rotate-180` sets CSS `rotate`, not `transform` — check `getComputedStyle(el).rotate`.)
- `pnpm run lint` — ESLint enforces v2 import discipline (the dependency rule, not folder tiers) and runs at `--max-warnings 0`, so any warning you introduce fails the gate. Keep the slice warning-clean.
- `pnpm run validate-tokens` — chain integrity + the opacity guard (fails if any `--opacity-*` is registered in `@theme`, or if `dist/geeklego.css` contains an invalid `color-mix(… var(--opacity-…))`). Framework runtime vars (`tw-*`, `radix-*`) are allowlisted, so a Radix var like `--radix-accordion-content-height` in a keyframe won't false-positive.
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
3b. Hand-roll a state engine ShadCN delegates to a library — form validation/state (use react-hook-form), command filtering (cmdk), carousel physics (embla), date math (react-day-picker), drag-sheet (vaul). See the category-B table in `references/radix-primitive-map.md`.
4. Use `memo(forwardRef)`, `cloneElement` injection, or `__slot` markers.
5. Create atom/molecule/organism folders, regenerate a catalog, or assign tier labels.
6. Edit, import from, or imitate the frozen 3-tier code or the old skill.
7. Use bare arbitrary literals (`bg-[#fff]`, `h-[40px]`) or inline `style` for class-able values.
8. Put `--ext-*` custom variants inside the core semantic block — they get their own separate block.
9. Invent new core semantic vocabulary casually — extend deliberately and document.
10. Use package import paths between v2 files — relative imports only.
11. Finish a component without re-exporting it from `components/index.ts` (Phase 3.5) — an unexported component ships nothing in `dist/index.js`.
