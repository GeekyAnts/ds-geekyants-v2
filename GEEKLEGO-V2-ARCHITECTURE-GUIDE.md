# GeekLego v2 — Architecture & Component-Building Guide

> A teaching document for the team. It explains **how** the `component-builder-v2` skill builds components and, more importantly, **why** the architecture is shaped this way.
>
> Everything here is grounded in the **actual code in this repo** — `components/v2/`, `design-system/v2/`, and the skill at `.claude/skills/component-builder-v2/`. Every component the skill references is present and verified (see [§0](#0-state-of-this-repo)).

---

## 0. State of this repo

The `component-builder-v2` skill's "read before every session" table points at `Button/`, `Dialog/`, `Popover/`, `Combobox/`, and `Command/` as shipped references. **All of them are present in this checkout**, alongside `Input/` and the shared `lib/`:

```
components/v2/
├── Button/        ← the canonical reference leaf (cva + cn + Slot, no Radix behavioral primitive)
├── Input/         ← a styled leaf that owns its own a11y (no Radix Input exists)
├── Dialog/        ← compound on @radix-ui/react-dialog
├── Popover/       ← compound on @radix-ui/react-popover
├── Combobox/      ← the Popover + cmdk recipe (composition)
├── Command/       ← the cmdk listbox leaf that Combobox composes
└── lib/
    └── cn.ts      ← the class-merge helper
```

So the **compound-on-Radix examples in this guide (Dialog/Combobox) are backed by real, type-checked, story-covered source** you can open and verify — not just described from the pattern doc. The whole set passes the verification pipeline: `tsc --noEmit` clean across `components/v2/`, ESLint 0 errors (one harmless `rules-of-hooks` warning in `Combobox.stories.tsx`), `validate-tokens` all green (276 tokens, chain intact), and `build:css` confirms the chain resolves end-to-end (`--color-brand-900: oklch(21% …)` → `--primary` → `bg-primary`, with dark selectors and the `--ext-*` gamified utility emitted).

The Radix packages (`@radix-ui/react-slot`, `-dialog`, `-popover`) and `cmdk` are all installed, so these components build and run as-is.

---

## 1. The big picture in one diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 1 — PRIMITIVES   design-system/v2/primitives.css                        │
│  geeklego's brand palette & scales. UNCHANGED. This is the "fork seam".       │
│  --color-brand-900: oklch(21% …)   --color-accent-500: oklch(70% …)           │
│  --radius-lg: 0.5rem   --font-size-16: 1rem   …                               │
└───────────────────────────────────┬───────────────────────────────────────────┘
                                     │  aliased by  (primitive → semantic)
┌───────────────────────────────────▼───────────────────────────────────────────┐
│  TIER 2 — SEMANTICS    design-system/v2/semantics.css                          │
│  Standard ShadCN/Tailwind vocabulary. ~20 tokens. The INTERFACE components use.│
│  --primary: var(--color-brand-900)   --destructive: var(--color-error-500)     │
│  --border --input --ring --background --muted --accent --card --popover …      │
│                                                                                 │
│  @theme inline { --color-primary: var(--primary); … }  ← registers utilities   │
└───────────────────────────────────┬───────────────────────────────────────────┘
                                     │  consumed as standard Tailwind utilities
┌───────────────────────────────────▼───────────────────────────────────────────┐
│  COMPONENTS    components/v2/<Name>/                                            │
│  cva variants + cn() + forwardRef + (Radix primitive if interactive)           │
│  className="bg-primary text-primary-foreground border-input ring-ring"         │
└─────────────────────────────────────────────────────────────────────────────┘

THEMES        a theme = a set of Tier-2 overrides  → .dark { --primary: … }
BRAND FORKS   re-point Tier-2 semantics at different primitives
CUSTOM        --ext-<component>-<variant>-*   (namespaced, OUTSIDE core semantics)
```

**The one sentence to memorize:** *Primitives are the brand, semantics are the contract, components are the expression — and you never skip a tier or hardcode a value.*

---

## 2. Overall component architecture — how a component is built start to finish

The skill (`.claude/skills/component-builder-v2/SKILL.md`) runs a **5-phase flow**. Atomic design survives only as a *composition discipline* (decompose → build leaves first → compose), **not** as folders. There are no atom/molecule/organism directories.

### Phase 0 — Decompose & check Radix first

1. **Decompose the request into a composition tree.** "A data table with a filter dropdown" = table + dropdown + button. Name the pieces; build leaves before the things that compose them (bottom-up).
2. **Extraction heuristic.** If a styled, interactive control could be reused in more than one place (a custom select, a toggle, a chip), give it its own folder under `components/v2/<Name>/` instead of inlining it. There are no tiers — just "is this worth its own file?"
3. **🔑 The single biggest decision: "Does Radix already provide this primitive?"** Before hand-rolling anything with a11y, keyboard nav, focus trapping, portals, escape-dismiss, click-outside, or `aria-activedescendant`, check `references/radix-primitive-map.md`. If Radix has it → **build on it**. This is what separates v2 from the old system.

### Phase 1 — Tokens (usually skipped)

Most components need **zero token work** — they consume standard semantics directly. You only touch `design-system/v2/` when:
- a genuinely new **core semantic** is justified (rare; document it as "geeklego extends ShadCN"), or
- a **brand-custom variant** exists (like Button's `gamified`) → add `--ext-*` tokens in their **separate block**.

### Phase 2 — Write the files

Per component, mirror the Button slice:

```
<ComponentName>/
├── <ComponentName>.tsx          ← implementation (forwardRef + cn + maybe Radix)
├── <ComponentName>.types.ts     ← Props (native attrs + VariantProps + asChild?)
├── <component-name>-variants.ts ← cva variants (omit only if no variants)
└── <ComponentName>.stories.tsx  ← Storybook stories
```

`README.md` only when the API/a11y genuinely warrants it. **No `mock-data.json`, no boilerplate README** — those were 3-tier requirements.

### Phase 3 — Stories

Mirror `Button.stories.tsx`. Import the v2 stylesheet so the slice is self-contained (`import "../../../design-system/v2/index.css";`). Cover Default, Variants, Sizes, each `--ext-*` variant, Disabled/states, `asChild`, and **DarkMode** (wrap in `<div data-theme="dark" className="dark max-w-2xl …">` — set **both** selectors).

### Phase 4 — Verify

| Check | Command | Confirms |
|---|---|---|
| Type-check | `npx tsc --noEmit` | Types are clean |
| Story build | scoped Storybook/Vite | The token chain resolves end-to-end |
| Lint + import discipline | `npm run lint` | No banned 3-tier imports |
| Token integrity | `npm run validate-tokens` | Chain intact + opacity guard |

**Role of each part:** Phase 0 is the *thinking* (where most value is). Phase 1 protects the token system from pollution. Phase 2 produces standard, predictable code. Phase 3 proves it themes. Phase 4 is the gate.

---

## 3. shadcn/ui & Radix UI integration

### The crucial clarification: **ShadCN is not a dependency**

ShadCN/ui is **not installed**. There is no `shadcn` package, no `components.json`, and the CLI is deliberately *not* wired in (it fights geeklego's token setup). What we use is the **ShadCN *pattern*** — `cva` variants + `cn()` + `forwardRef` + Radix primitives — hand-written off the recipe. (The hard rules even forbid naming ShadCN in shipped code.)

So when this guide says "from shadcn," it means **"follows the ShadCN pattern,"** not "imported from a package."

### What comes from where

| Layer | Source | In the code |
|---|---|---|
| **Behavior** (focus trap, keyboard, portal, ARIA state) | **Radix UI** | `@radix-ui/react-dialog`, `-popover`, `-slot`, … |
| **Pattern / structure** (cva + cn + forwardRef + variant API) | **ShadCN pattern** (hand-written) | `button-variants.ts`, `cn.ts`, the `forwardRef` shape |
| **Look** (which semantic class on which element) | **Your design system** | `bg-primary`, `border-input`, `ring-ring` |
| **Tokens** (what those classes resolve to) | **geeklego primitives + semantics** | `design-system/v2/*.css` |

### How they're imported

Real imports from `components/v2/Button/Button.tsx`:

```tsx
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";   // Radix — polymorphic rendering
import { cn } from "../lib/cn";                 // ShadCN-pattern helper (relative import)
import { buttonVariants } from "./button-variants"; // ShadCN-pattern cva
import type { ButtonProps } from "./Button.types";
```

Note: **imports between v2 files are always relative** (`../lib/cn`), never package paths (`@geeklego/ui/...`) — ESLint enforces this.

### How their APIs work together

- **Radix gives you parts and behavior.** A Radix `Dialog` exposes `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, etc. Root coordinates open state; Content traps focus and portals.
- **The ShadCN pattern wraps those parts** as named sub-component exports, adding **only the look** via `cn()` + semantic classes. Pass-through parts (Root/Trigger/Close) need no wrapper; styled parts (Content/Overlay/Title) get a thin `forwardRef` wrapper.
- **`cva` defines the variant API.** It turns props (`variant`, `size`) into class strings. `VariantProps<typeof buttonVariants>` derives the TypeScript prop types automatically, so the variant list and the type stay in sync.
- **`cn()` merges** the cva output with the consumer's `className`, last-wins, deduping conflicting Tailwind classes via `tailwind-merge`.

**Mental model:** *Radix owns the behavior and the context; you own the look.* Never override Radix's keyboard/focus behavior — restyle, don't rebuild.

---

## 4. Accessibility — what you inherit vs. what you implement

### What Radix hands you for free

When you build on a Radix primitive, you inherit (per `radix-primitive-map.md`):

| Primitive | You get for free |
|---|---|
| `Dialog` | Focus trap, escape dismiss, scroll lock, portal, `aria-modal`, labelled/described wiring |
| `Popover` | Positioning, click-outside, escape, portal, focus management |
| `Tooltip` | Hover/focus delay, positioning, `aria-describedby` |
| `DropdownMenu` | Roving tabindex, typeahead, submenus, `role=menu` |
| `Tabs` | Arrow-key nav, `aria-selected`, `aria-controls`, roving tabindex |
| `Select` | Listbox, typeahead, `aria-activedescendant`, portal |
| `Checkbox` / `RadioGroup` / `Switch` | Correct roles, keyboard, `aria-checked`, indeterminate |

This is exactly what the old 3-tier system hand-rolled in `components/utils/keyboard/` (`useFocusTrap`, `useEscapeDismiss`, `useClickOutside`, `useRovingTabindex`, `useSingleSelectGroup`). Those hooks were **deleted** in v2 because Radix + cmdk replace all of them. **Never reimplement them.**

### What you still implement manually

Radix gives you the *machinery*; you still supply the *content and intent*:

1. **Accessible names/text.** Radix wires `aria-labelledby` to a `Dialog.Title` — but **you** must render a meaningful Title. Same for `aria-describedby` → Description.
2. **`aria-label` on icon-only controls.** A `<Button size="icon">` with just an SVG has no text; you must pass `aria-label`.
3. **Validation/error semantics on non-Radix leaves.** See Input below — it sets `aria-invalid` itself because there's no Radix Input.
4. **Visible focus styling.** Radix manages *where* focus goes; **you** style the focus ring. Button's base does this:
   ```
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
   focus-visible:ring-offset-2 focus-visible:ring-offset-background
   ```
5. **Disabled affordances.** `disabled:pointer-events-none disabled:opacity-50` — the visual half of disabled; the native `disabled` attribute does the behavioral half.
6. **Color contrast.** The semantic token *pairs* (`--primary` / `--primary-foreground`) are designed to contrast, but if you invent a new pairing you own its contrast.
7. **Logical properties for RTL.** Use `end-4`, not `right-4`, on positioned parts.

### Concrete example — Input handles its own a11y because there's no Radix primitive

From `components/v2/Input/Input.tsx`:

```tsx
<input
  ref={ref}
  type={type}
  data-slot="input"
  aria-invalid={variant === "error" ? true : props["aria-invalid"]}   // ← manual
  className={cn(inputVariants({ variant, inputSize }), className)}
  {...props}
/>
```

A text field has no focus-trap/portal/keyboard surface, so it's a **leaf** — `cva` + `cn` + `forwardRef`, no Radix. But the *meaningful* a11y signal (`aria-invalid` when in the error variant) is wired by hand. **Rule of thumb:** if it traps focus, opens a layer, navigates with arrow keys, manages `aria-*` state, or portals → reach for Radix. If it's styled markup → hand-roll, and supply the ARIA yourself.

---

## 5. Styling architecture — how your design system layers onto base components without breaking behavior

### The layering, top to bottom

```
Consumer className (highest priority — last-wins via tailwind-merge)
        ▲
cn()  ──┤  merges + dedupes conflicting Tailwind classes
        ▼
cva variant output  (base classes + selected variant/size)
        │  classes are standard semantic utilities: bg-primary, border-input …
        ▼
@theme inline registration  (turns --primary into the bg-primary utility)
        │
:root semantic aliases  (--primary: var(--color-brand-900))
        │
@theme primitives  (--color-brand-900: oklch(21% …))
```

### Why styling never breaks behavior

This is the key insight of the ShadCN-on-Radix pattern: **you only ever add `className` to a Radix part — you never touch its event handlers, refs, or ARIA props.** Radix's Content keeps its focus trap whether you give it `bg-popover` or `bg-red-500`. The look and the behavior are on completely separate axes:

- **Behavior axis** = the Radix primitive (untouched).
- **Look axis** = `cn()` + semantic utility classes (all you add).

Because the variant classes are *standard semantic utilities* and `cn()` merges last-wins, a consumer can override any visual decision (`<Button className="rounded-full">`) without affecting behavior, and without specificity wars.

### The relationship between the five pieces

| Piece | Job | Analogy |
|---|---|---|
| **Radix primitive** | Behavior + ARIA + keyboard | The engine |
| **ShadCN pattern** (`cva`/`cn`/`forwardRef`) | Structure + variant API | The chassis |
| **Tailwind v4** | Compiles utilities; `@theme inline` registers semantics as real utilities | The transmission |
| **CVA** | Maps props → class strings, type-safe | The gearbox |
| **Design tokens** | What the classes actually resolve to | The fuel |

### Hard styling rules (from the skill)

- ✅ `className="bg-primary text-primary-foreground border-input"` — standard utilities.
- ✅ `hover:bg-primary/90` — slash-opacity for hover/press tints (compiles to `color-mix`).
- ✅ `disabled:opacity-50` — built-in opacity utility for fades.
- ✅ `shadow-[var(--ext-button-gamified-shadow)]` — bare `var()` arbitrary **only** where no registered utility exists.
  - ❌ `bg-[var(--primary)]` — unnecessary in v2; the utility `bg-primary` exists (this was a 3-tier workaround).
- ❌ `bg-[#6366f1]`, `h-[40px]` — bare arbitrary literals.
- ❌ inline `style` for anything that could be a class.
- ⚠️ **Never register an `--opacity-*` scale in `@theme`** — it makes Tailwind emit invalid `color-mix(… var(--opacity-90) …)` and colors silently fall back to transparent. `validate-tokens` enforces this.

---

## 6. Design tokens — how semantics are chosen and how states map

### How a semantic token is "applied" to an element

The decision is **role-based**, not color-based. You don't ask "what color is this?" — you ask "**what is this element's role?**" and pick the matching semantic pair:

| Element role | Semantic pair |
|---|---|
| Main filled action | `bg-primary` + `text-primary-foreground` |
| Secondary/muted action | `bg-secondary` + `text -secondary-foreground` |
| Dangerous action | `bg-destructive` + `text-destructive-foreground` |
| Surface / panel | `bg-card` + `text-card-foreground` |
| Floating layer (dialog/popover) | `bg-popover` + `text-popover-foreground` |
| Quiet background block | `bg-muted` + `text-muted-foreground` |
| Outline/edge | `border-border` or `border-input` |
| Focus ring | `ring-ring` |
| Page base | `bg-background` + `text-foreground` |

**The `-foreground` convention is the heart of it:** every surface token has a matching foreground token guaranteed to contrast with it. You always use them as a pair, so contrast is correct in light *and* dark automatically. When you write `bg-primary text-primary-foreground`, both flip together when the theme changes.

### How component states map to tokens

States are expressed as **utility variants on the same semantic token**, not as new tokens:

| State | Technique | Example (from Button) |
|---|---|---|
| **hover** | slash-opacity on the fill | `hover:bg-primary/90` |
| **active/press** | deeper slash-opacity | `active:bg-primary/80` |
| **focus** | the ring utilities | `focus-visible:ring-2 focus-visible:ring-ring` |
| **disabled** | built-in opacity + pointer | `disabled:opacity-50 disabled:pointer-events-none` |
| **error** | swap to the `--destructive` family | Input's `error` variant → `border-destructive focus-visible:ring-destructive` |
| **selected/active item** | `bg-accent` (in lists/menus) | `data-[selected=true]:bg-accent` |

The elegance: **states don't need their own tokens.** `hover` is just `--primary` at 90% — so it re-themes for free, because `--primary` re-themes. The error state reuses `--destructive`, so "error" looks right in dark mode without anyone defining a dark-error token.

### The chain rule (never skip, never hardcode)

```
--color-brand-900  →  --primary  →  bg-primary  →  rendered pixel
   (primitive)        (semantic)    (utility)
```

- Every semantic aliases a **primitive**, never a raw value: `--primary: var(--color-brand-900)`.
- Every `--ext-*` also aliases a primitive: `--ext-button-gamified-bg: var(--color-accent-500)`.
- Components reference **semantics only** — never a primitive directly, never a hex/px.

---

## 7. Token Editor — how it fits the workflow

The Token Editor is the **cockpit** in `app/` (run with `npm run dev`). It's a visual front-end over the exact same three CSS files components consume.

### What it reads and writes

It loads and saves `design-system/v2/{primitives.css, semantics.css, themes/dark.css}` through a **live inline Vite plugin in `vite.config.mts`** (not a standalone API — that detail matters if you go spelunking). Its data model is the flat `GeeklegoTokensV2` shape: `{ primitives, semantics: { light, dark }, ext }`.

### What happens when you change a token

This is the payoff of the whole architecture — **change propagation is automatic because of the chain**:

| You change… | Propagates automatically to… | Because |
|---|---|---|
| A **primitive** (`--color-brand-900`) | Every semantic that aliases it, every utility, every component | The semantic is `var(--color-brand-900)` — CSS resolves it live |
| A **semantic** (`--primary`) | Every component using `bg-primary`/`text-primary`/`ring-primary` etc., in light theme | `@theme inline` made those utilities resolve `var(--primary)` at runtime |
| A **dark override** (`.dark { --primary }`) | Every component, but only under `[data-theme="dark"]` / `.dark` | Dark theme is just a Tier-2 override block |

Because semantics are registered with **`@theme inline`**, theme overrides take effect **without a rebuild** — the utility literally contains `var(--primary)`, so flipping `--primary` re-paints everything live.

### Automatic vs. manual

- **Automatic:** any value change to a primitive, semantic, or theme override flows through the chain to every consuming component. No component edits needed. This is *the entire point* of being design-system-first.
- **Manual:** anything **structural**, not value-based:
  - Adding a **brand-new core semantic** (you must add it to both `:root` and `@theme inline`, then teach components to use it).
  - Adding/removing a **component variant** (that's a `cva` edit, not a token edit).
  - Adding a new **`--ext-*` token** (and the matching `@theme inline` registration + the `cva` variant that consumes it).
  - Rebuilding the **distributed CSS** (`npm run build:css`) for published consumers.

**Rule of thumb:** if the change is "this token should be a different value," the editor handles it and everything follows. If the change is "there should be a *new kind* of token or variant," that's a code edit.

---

## 8. Scaling — why ~20 semantic tokens is enough

This is the most counter-intuitive part, and the best thing to teach.

### Why so few tokens cover a whole library

1. **Tokens describe *roles*, not *components*.** There is no `--button-bg` or `--card-border`. There's `--primary`, `--border`, `--card`. A button, a chip, a badge, and a toggle all draw their fill from the *same* `--primary` because they all play the role "primary action surface." One token, dozens of consumers.

2. **The `-foreground` pairing doubles every surface for free.** 9 surface/foreground pairs already cover almost every contrast situation, in both themes.

3. **States are derived, not stored.** hover/active/disabled are *opacity transforms* on existing tokens (`bg-primary/90`), and error reuses `--destructive`. So you get ~5 states × every token without adding a single token.

4. **Variants are composition, not tokens.** Button has 7 variants (default, secondary, destructive, outline, ghost, link, gamified) — only `gamified` needed new tokens. The other 6 are just *different combinations of the same 20 semantics*.

5. **Themes are overrides, not new tokens.** Dark mode adds **zero** tokens — it re-points the existing 20.

> Do the math: ~20 semantics × (light + dark) × (5 states via opacity) × (free recombination into variants) = an enormous styled surface from a tiny, auditable vocabulary. A small token set is a *feature*: it's what makes the system themeable, forkable, and impossible to drift.

### How to keep building components without new tokens

- Reach for the existing role first. New button style? Recombine `bg-secondary`, `border-input`, `text-muted-foreground`.
- Need a state? Use opacity (`/90`, `/80`) or `data-[state]` variants on an existing token.
- Need "error/success-ish"? `--destructive` exists; for the others, see the decision rule below.

### When to reuse vs. create — the decision rule

```
Is there a semantic whose ROLE matches this element?
   └─ YES → use it. (almost always the answer)
   └─ NO  → Is this a one-off BRAND variant for a single component?
              └─ YES → add an --ext-<component>-<variant>-* token
              │         (separate block, chained to a primitive)
              └─ NO  → Is it a genuinely missing ROLE the whole system needs
                       (e.g. info/success status, chart data-series)?
                         └─ YES → extend the CORE semantic set deliberately,
                         │         document it as "geeklego extends ShadCN",
                         │         add to BOTH :root and @theme inline
                         └─ NO  → you don't need a new token. Recombine.
```

Two containment guarantees fall out of this:
- **`--ext-*` is for *brand variants*** (Button's `gamified`). It lives in its own block so it can never pollute the themeable core. A custom variant uses **only** its `--ext-*` utilities and **none** of the core semantics — that structural separation is the discipline. (Watch `--ext-*` count: it's a smell if it sprawls past a handful.)
- **New *core* semantics are rare and deliberate.** "geeklego extends ShadCN" is a documented decision, not an ad-hoc addition smuggled in via a component.

---

## 9. Worked examples

### 9a. Button — a leaf with variants, `asChild`, and one brand variant

**Why it's built this way:** A button is a native `<button>` with no focus-trap/portal/keyboard surface, so there's **no Radix behavioral primitive** — but it *does* need polymorphism (render as an `<a>` styled like a button), which is what Radix `Slot` provides. So: `cva` + `cn` + `forwardRef` + `Slot`.

**`button-variants.ts`** — the variant API (`cva`). Base classes are shared; variants are recombinations of semantics; `gamified` is the lone `--ext-*` consumer:

```ts
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
    "rounded-md text-sm font-medium select-none",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline:     "border border-input bg-background text-foreground hover:bg-muted hover:text-foreground",
        ghost:       "bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        link:        "bg-transparent text-primary underline-offset-4 hover:underline h-auto px-0",
        // custom variant — namespaced --ext-* tokens ONLY, none of the core semantics:
        gamified: [
          "bg-ext-button-gamified-bg text-ext-button-gamified-foreground font-semibold uppercase tracking-wide",
          "shadow-[var(--ext-button-gamified-shadow)]",
          "hover:bg-ext-button-gamified-bg-hover hover:-translate-y-0.5",
          "active:bg-ext-button-gamified-bg-active active:translate-y-0 active:shadow-none",
          "focus-visible:ring-ext-button-gamified-ring",
        ].join(" "),
      },
      size: { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-11 px-6 text-base", icon: "size-10 p-0" },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
```

Notice in the six **core** variants: every color is a semantic (`bg-primary`, `text-secondary-foreground`, `border-input`, `ring-ring`). Hover/active are slash-opacity on the same token. The `gamified` variant is structurally walled off in `--ext-*` utilities — it touches no core semantic.

**`Button.tsx`** — the implementation: `forwardRef`, `cn()` merge, `Slot` for `asChild`:

```tsx
"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { buttonVariants } from "./button-variants";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";   // ← Radix Slot enables polymorphism
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";
```

- **`forwardRef` + `displayName`** — plain, **not** `memo(forwardRef)` (that was a 3-tier rule, dropped).
- **`asChild`** swaps `<button>` for Radix `<Slot>`, which merges Button's props/className onto the child. `<Button asChild><a href="…">Link</a></Button>` renders a real `<a>` that looks like a button. This replaces the old `cloneElement`/`__slot` injection.
- **`cn()`** puts the consumer's `className` last → it wins any conflict.

**`Button.types.ts`** — native attrs + the cva variant props + `asChild`:

```ts
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
}
```

**How it all comes together when you render `<Button variant="destructive">Delete</Button>`:**
1. `cva` selects the `destructive` classes → `bg-destructive text-destructive-foreground hover:bg-destructive/90 …`
2. `cn()` merges them with base classes and any consumer `className`.
3. Tailwind's `bg-destructive` utility (registered via `@theme inline`) resolves to `var(--destructive)`.
4. `--destructive` aliases `var(--color-error-500)` = `oklch(63.683% 0.208 25.331)`.
5. In dark mode, `.dark` re-points `--destructive` to `--color-error-600` — same class, different pixel, **no rebuild**.

### 9b. Input — a leaf that owns its own a11y; the `error` variant reuses `--destructive`

**Why it's built this way:** there's no Radix Input primitive and a text field has no behavioral surface to delegate — so it's a pure leaf (`cva` + `cn` + `forwardRef`, no Radix). But it must signal validity, so it wires `aria-invalid` itself.

**`Input.tsx`:**

```tsx
"use client";
import { forwardRef } from "react";
import { cn } from "../lib/cn";
import { inputVariants } from "./input-variants";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      aria-invalid={variant === "error" ? true : props["aria-invalid"]}  // manual a11y
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";
```

**`input-variants.ts`** — the `error` variant is the lesson: it does **not** invent error tokens, it **reuses `--destructive`**, so it themes for free:

```ts
variants: {
  variant: {
    default: "border-input focus-visible:ring-ring",
    error:   "border-destructive focus-visible:ring-destructive text-foreground",  // reuse, don't invent
  },
  inputSize: {
    sm: "h-8 px-2.5 py-1 text-xs file:py-1",
    md: "h-10 px-3 py-2 text-sm file:py-1.5",
    lg: "h-11 px-4 py-2.5 text-base file:py-2",
  },
},
```

**`Input.types.ts`** — a subtle but instructive detail: the size **variant** is named `inputSize`, because the native `<input size>` HTML attribute (a number) would collide with a cva `size` variant. The types `Omit` the native `size` and re-add it explicitly:

```ts
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, InputVariantProps {
  size?: number;   // native input size attribute (visible char width)
}
```

This is the kind of judgment the skill exercises: don't let a variant name clobber a real HTML attribute.

### 9c. The compound-on-Radix pattern (Dialog) — the real shipped component

This is *the* pattern for anything interactive, and it's live in [components/v2/Dialog/Dialog.tsx](components/v2/Dialog/Dialog.tsx). The principle: **Radix owns behavior + context; you wrap each part and add the look.**

```tsx
<Dialog>                                        {/* Radix Root — provides open state */}
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>                               {/* Radix portals, focus-traps, escape/click-outside */}
    <DialogTitle>Delete project</DialogTitle>   {/* you render — Radix wires aria-labelledby */}
    <DialogDescription>This cannot be undone.</DialogDescription>
    <div className="mt-4 flex justify-end gap-2">
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <Button variant="destructive">Delete</Button>
    </div>
  </DialogContent>
</Dialog>
```

Everything the old 3-tier Modal hand-rolled is deleted:

| Old hand-rolled | v2 |
|---|---|
| `useFocusTrap` | Radix traps focus in `Content` |
| `useEscapeDismiss` | Radix closes on Escape |
| `useClickOutside` | Radix closes on outside click |
| `createContext` open state | `Dialog.Root` is the provider |
| `cloneElement` to wire trigger | `DialogTrigger asChild` |
| `--modal-bg` component tokens | `bg-popover border-border shadow-lg` |
| `aria-modal`/`aria-labelledby` | Radix wires it via Title/Description |

How the real `Dialog.tsx` is built (open it and you'll see exactly this): pass-through `Dialog`/`DialogTrigger`/`DialogClose`/`DialogPortal` re-exported straight from Radix (no look to add); `forwardRef`-wrapped styled parts (`DialogOverlay`, `DialogContent`, `DialogTitle`, `DialogDescription`) merging `cn(...semantic classes..., className)`; plain-function layout helpers (`DialogHeader`, `DialogFooter`); a `showClose` prop on `Content` that renders a styled Radix `Close` with an `aria-label`; open/close animation driven off Radix's `data-[state=open|closed]` attributes (no animation library); and logical positioning (`end-4`, not `right-4`) for RTL. It styles purely with semantics — `bg-popover`, `border-border`, `text-popover-foreground`, `text-muted-foreground`, `ring-ring` — and writes **zero** component tokens.

> **Combobox** (`components/v2/Combobox/`) is the next step up: it *composes* `Popover` + `Command` (the `cmdk` listbox) + a `Button` trigger via `asChild`. That's the "build leaves first, then compose" discipline from Phase 0 made concrete — Popover and Command are reusable leaves; Combobox is the composite that wires them together with an `options`/`value`/`onChange` API.

---

## 10. Hard rules cheat-sheet (for the team)

**Never:**
1. Hardcode a value, or reference a primitive directly from a component.
2. Write a component-token tier (`--button-*` blocks). v2 is 2-tier.
3. Reimplement focus trap / escape / click-outside / roving tabindex / portals when Radix provides it.
4. Use `memo(forwardRef)`, `cloneElement` injection, or `__slot` markers.
5. Create atom/molecule/organism folders or a catalog.
6. Edit/import/imitate the frozen 3-tier code (`components/{atoms,molecules,organisms}/`, `design-system/geeklego.css`) — it's deleted/frozen.
7. Use bare arbitrary literals (`bg-[#fff]`, `h-[40px]`) or inline `style` for class-able values.
8. Put `--ext-*` variants inside the core semantic block.
9. Invent core semantics casually — extend deliberately and document.
10. Use package import paths between v2 files — relative only.
11. Register an `--opacity-*` scale in `@theme`.

**Always:**
1. Read `components/v2/Button/` first.
2. Check the Radix map before building anything interactive.
3. Style with standard semantic utilities (`bg-primary`, `border-input`, `ring-ring`).
4. `cva` for variants, `cn()` to merge, plain `forwardRef` + `displayName`.
5. `asChild` + Radix `Slot` for polymorphism.
6. Write a DarkMode story (both `data-theme="dark"` and `.dark`).
7. Verify: `tsc --noEmit` + scoped Storybook build + `npm run lint` + `npm run validate-tokens`.

---

## 11. The "why" in one paragraph (your closing slide)

geeklego v2 is **design-system-first**: the token system is the single source of truth, and every component is just an expression of it. We collapsed three token tiers to two (primitives → semantics) so there's exactly one indirection: the brand lives in **primitives** (the fork seam), the **standard ShadCN semantic vocabulary** is the contract components consume, and there's no per-component token layer to drift. We adopted **standard ShadCN/Tailwind names** so the system is in every LLM's training set and paste-and-go. We build on **Radix** so accessibility, keyboard, and focus management are inherited, not re-implemented and re-bugged. The result: ~20 tokens theme an entire library in light and dark with zero rebuilds, components are predictable and forkable, and the Token Editor can re-skin everything by editing three CSS files — because the architecture guarantees the change flows all the way down the chain.

---

*Reference component: `components/v2/Button/` · Tokens: `design-system/v2/` · Skill: `.claude/skills/component-builder-v2/SKILL.md` · Authoritative rules: `CLAUDE.md`*
