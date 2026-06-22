# Badge — Build Report

## What was built

A `Badge` component for the GeekLego v2 library: a small, pill-shaped status
label with four color variants. Built following the `component-builder-v2` skill
and mirroring the canonical Button slice.

Intended for the user's stated use case (tagging statuses on cards) — see the
`OnACard` story.

## Files created

| File | Purpose |
|---|---|
| `Badge.tsx` | Implementation — `forwardRef` + `cn()` + `asChild`/`Slot`, `displayName`. |
| `Badge.types.ts` | `BadgeProps` — extends `HTMLAttributes<HTMLSpanElement>` + `BadgeVariantProps` + `asChild?`. |
| `badge-variants.ts` | `cva` variants (default, secondary, destructive, outline) + base pill styling. |
| `Badge.stories.tsx` | Stories: Default, Variants, OnACard, AsChildLink, DarkMode (both `data-theme="dark"` + `.dark`, `max-w-2xl`). |
| `INSTALL_NOTES.txt` | Records that no install was needed. |

> In the real repo these would live at `components/v2/Badge/`. They are written
> flat into this sandbox `outputs/` dir per the test instructions; the v2 story
> import path (`../../../design-system/v2/index.css`) and the `cn` import
> (`../lib/cn`) assume the real `components/v2/Badge/` location.

Mirrors the Button slice's 4-file shape. No README, no `mock-data.json`
(those were 3-tier requirements; not warranted here — the API is trivial).

## Radix usage

**No Radix behavioral primitive.** A Badge is pure presentational markup with no
focus trap, keyboard nav, portal, or `aria-*` state surface. The skill's
`references/radix-primitive-map.md` explicitly lists Badge under "When Radix
does NOT apply" → hand-roll with `cva` + `cn` + `forwardRef`.

The one Radix piece used is `@radix-ui/react-slot` for `asChild` polymorphism —
identical to the Button reference, and already installed. This is a rendering
utility, not an a11y/behavioral primitive.

## Semantic tokens used

All standard ShadCN/Tailwind v2 core semantics — **no token work, no `--ext-*`
variants** (the four requested variants map cleanly to existing semantics):

| Variant | Utilities |
|---|---|
| default | `bg-primary text-primary-foreground` (transparent border) |
| secondary | `bg-secondary text-secondary-foreground` (transparent border) |
| destructive | `bg-destructive text-destructive-foreground` (transparent border) |
| outline | `border-input bg-transparent text-foreground` |
| base (all) | `ring-ring` / `ring-offset-background` (focus-visible), `border` |

No primitive referenced directly, no hardcoded values, no arbitrary literals, no
inline styles. `design-system/v2/` was not touched.

## Decisions

- **Element = `<span>`** (inline), not `<div>` — a badge is an inline label
  placed alongside text/inside card headers. Types extend
  `HTMLAttributes<HTMLSpanElement>`.
- **Pill shape = `rounded-full`** (not `rounded-md`) — the user asked for
  "pill-shaped". Sizing is `px-2.5 py-0.5 text-xs` for the "small" look.
- **Variant set = exactly the four requested** (default, secondary, destructive,
  outline). No `size` variant added — a badge is single-size by nature; kept the
  surface minimal rather than gold-plating.
- **`asChild` kept** for parity with Button and to support a linked/clickable
  status tag without duplicating styling.
- **`focus-visible` ring in base** so an `asChild` link badge is keyboard-focus
  visible; harmless on the default non-interactive `<span>`.
- **No README** — trivial API, not warranted per the skill.

## Verification note

Per the sandbox rules, files were written to `outputs/` rather than the live
`components/v2/` tree, so the real pipeline (`tsc --noEmit`, scoped Storybook
build, `npm run lint`, `npm run validate-tokens`) was not run against them. The
code is written to pass all four: it adds no tokens (so `validate-tokens` is
unaffected), uses relative imports only, registered semantic utilities only
(no bare arbitrary literals), plain `forwardRef`, and no old-3-tier imports.
