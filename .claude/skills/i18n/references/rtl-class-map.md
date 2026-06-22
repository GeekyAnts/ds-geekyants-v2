# RTL Class Map — Logical Property Substitution Table

Tailwind v4 ships full logical property support. Use logical equivalents so Geeklego components automatically mirror in RTL layouts (e.g. Arabic, Hebrew) when `dir="rtl"` is set on `<html>`.

> **v2 note.** Use the **standard logical utilities** (`ps-3`, `pe-4`, `ms-auto`, `start-0`), not
> `ps-[var(--token)]` arbitraries — v2 styles with registered utilities. The `[var(--token)]`
> forms below are stale-3-tier illustration; read the physical→logical mapping, write the
> standard-utility form. The "Component Status" table is a historical record of the old library
> (most listed components were deleted in the 2-tier cut).

---

## Padding

| Physical (avoid) | Logical (use) | CSS property | Notes |
|---|---|---|---|
| `pl-*` / `pl-[var(--token)]` | `ps-*` / `ps-[var(--token)]` | `padding-inline-start` | Content indent, left side at rest |
| `pr-*` / `pr-[var(--token)]` | `pe-*` / `pe-[var(--token)]` | `padding-inline-end` | Content indent, right side at rest |
| `px-*` | `px-*` | ✅ Exempt — symmetric | `padding-left` + `padding-right` equally, no flip needed |
| `py-*` | `py-*` | ✅ Exempt — block axis | Not directional |
| `p-*` | `p-*` | ✅ Exempt — all sides | Not directional |

## Margin

| Physical (avoid) | Logical (use) | CSS property |
|---|---|---|
| `ml-*` / `ml-[var(--token)]` | `ms-*` / `ms-[var(--token)]` | `margin-inline-start` |
| `mr-*` / `mr-[var(--token)]` | `me-*` / `me-[var(--token)]` | `margin-inline-end` |
| `ml-auto` | `ms-auto` | `margin-inline-start: auto` |
| `mr-auto` | `me-auto` | `margin-inline-end: auto` |
| `mx-*` | `mx-*` | ✅ Exempt — symmetric |
| `my-*` | `my-*` | ✅ Exempt — block axis |

## Inset (absolute positioning)

| Physical (avoid) | Logical (use) | CSS property | Notes |
|---|---|---|---|
| `left-[var(--token)]` | `start-[var(--token)]` | `inset-inline-start` | Icon positioning, anchor offsets |
| `right-[var(--token)]` | `end-[var(--token)]` | `inset-inline-end` | Icon positioning, anchor offsets |
| `left-0` | `left-0` | ✅ Often exempt | Overlay anchors (tooltip, dropdown) — flip happens with trigger |
| `right-0` | `right-0` | ✅ Often exempt | Overlay anchors (tooltip, dropdown) |
| `inset-0` | `inset-0` | ✅ Exempt — all sides | Full-coverage overlays |
| `inset-y-0` | `inset-y-0` | ✅ Exempt — block axis | Vertical centering |

---

## Rule: When to Convert vs. When to Leave Physical

**Convert to logical when:**
- The offset reflects content layout (icon inside input, indent of list item, gap between label and control)
- The value mirrors in RTL (e.g. icon should move from left→right in Arabic)

**Leave physical when:**
- The position is symmetric (`px-*`, `mx-*`, `inset-0`)
- The element is a full-screen/parent-filling overlay (`inset-0`, `inset-y-0`)
- The element anchors to a trigger that already mirrors (`left-0 top-full` on a dropdown)
- It is a block-axis offset (`pt-*`, `pb-*`, `mt-*`, `mb-*`, `top-*`, `bottom-*`)

---

## Component Status

| Component | Physical classes found | Converted? |
|---|---|---|
| `Input` | `pl-*`, `pr-*`, `left-*`, `right-*` in `sizeMap` | ✅ Done |
| `Textarea` | `right-*` on spinner | Pending |
| `NavItem` | `ml-*` (subitem indent), `pl-*` (icon gap) | Pending |
| `List` | `pl-*` (bullet indent) | Pending |
| `TreeItem` | `ml-auto` (expand chevron) | Pending |
| `Select` | `pr-*` (chevron offset) | Pending |
| `Item` | `pl-*` / `pr-*` (icon padding) | Pending |

---

## Switch Thumb — Special Case

The Switch component uses `translate-x-*` to animate the thumb. In RTL, the thumb should translate in the opposite direction (`-translate-x-*`). This is a CSS logic concern, not a padding/margin concern.

**Recommended approach:** Use the `rtl:` variant alongside the LTR class (e.g.
`translate-x-5 rtl:-translate-x-5`) so the thumb mirrors direction. Document in the Switch README
under Accessibility > RTL.

This is intentionally deferred and noted here for tracking.

---

## Tailwind v4 Compatibility Note

All logical property utilities (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`) are standard
Tailwind v4 utilities:

```
ps-3    →   padding-inline-start: <spacing-3>
start-0 →   inset-inline-start: 0
```

No `@supports` guard needed — `padding-inline-start` is baseline-supported in all modern browsers.
