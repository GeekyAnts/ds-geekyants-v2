# Geeklego Component Variants Reference

> Industry-standard variants for all common component types.
> Derived from consensus across Material UI, Radix UI, Chakra UI, and Ant Design.
> The inline SKILL.md covers Button, Input, Badge, Card, Avatar, Modal, Alert.
> This file covers all remaining component types.

---

## Atoms

### Checkbox
- **Element:** `<input type="checkbox">`
- **Variants:** default, indeterminate
- **Sizes:** sm (16px), md (20px), lg (24px)
- **States:** unchecked, checked, indeterminate, disabled, error
- **Notes:** Native `checkbox` role. `aria-checked="mixed"` for indeterminate.

### Radio
- **Element:** `<input type="radio">`
- **Variants:** default
- **Sizes:** sm (16px), md (20px), lg (24px)
- **States:** unselected, selected, disabled, error
- **Notes:** Native `radio` role. Group via `<fieldset>` + `<legend>`, not `role="radiogroup"`.

### Switch / Toggle
- **Element:** `<button>` + `role="switch"`
- **Variants:** default
- **Sizes:** sm, md, lg
- **States:** off, on, disabled
- **Notes:** `aria-checked` for on/off state.

### Spinner
- **Element:** `<div>` + `role="status"`
- **Variants:** default, inverse
- **Sizes:** xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
- **Notes:** `aria-label="Loading"`, respect `prefers-reduced-motion`.

### ProgressBar
- **Element:** `<div>` + `role="progressbar"`
- **Variants:** default, success, warning, error, striped, striped-animated
- **Sizes:** xs (2px), sm (4px), md (8px), lg (12px)
- **Notes:** `aria-valuenow/min/max`.

### Divider
- **Element:** `<hr>` + `role="separator"`
- **Variants:** horizontal, vertical
- **Styles:** solid, dashed, dotted
- **Notes:** Explicit role for `aria-orientation`. Uses `--border-divider` token.

### Tag / Chip
- **Element:** `<span>` (removable: inner `<button>` for close)
- **Variants:** solid, soft, outline
- **Colors:** default, success, warning, error, info
- **Sizes:** sm, md, lg
- **Notes:** Removable variant has close button. Selectable uses `aria-selected`.

### Icon (wrapper)
- **Element:** `<span>` + `aria-hidden="true"`
- **Sizes:** xs (12px), sm (16px), md (20px), lg (24px), xl (32px), 2xl (48px)
- **Notes:** Always decorative by default. Uses `--size-icon-{size}` tokens.

### Text (typography atom)
- **Element:** Polymorphic via `as` prop (defaults to `<p>`)
- **Variants:** all typography classes (display, heading, body, label, caption, etc.)
- **Notes:** Accepts `as` prop for semantic HTML element.

### IndicatorDot / StatusDot
- **Element:** `<span>`
- **Variants:** online, offline, away, busy
- **Sizes:** xs (6px), sm (8px), md (10px)
- **Colors:** success (online), neutral (offline), warning (away), error (busy)

### Skeleton
- **Element:** `<div>`
- **Variants:** text, circle, rectangle, avatar
- **Notes:** Uses `.skeleton` utility class. Theme-aware.

---

## Molecules

### Card
- **Element:** `<div>` (no semantic "card" element)
- **Variants:** elevated (shadow-lg), outlined, filled (bg-secondary), ghost
- **Pattern:** Card, Card.Header, Card.Body, Card.Footer

### SearchBar
- **Element:** `<div>` containing `<input type="search">`
- **Variants:** default, filled
- **Sizes:** sm, md, lg
- **States:** default, focused, loading, with-results, disabled

### FormField
- **Element:** `<div>` containing `<label>` + control + `<p>` (helper/error)
- **Variants:** default, horizontal
- **States:** default, error, success, loading
- **Notes:** Wraps Label + Input + helper text + error message. Uses `aria-describedby` for hint/error.

### Tooltip
- **Element:** `<div>` + `role="tooltip"`
- **Variants:** dark (default), light
- **Positions:** top, bottom, left, right, top-start, top-end, bottom-start, bottom-end
- **Notes:** `z-index: --layer-popover`.
- **Keyboard:** `useEscapeDismiss`. Escape dismisses tooltip.

### Pagination
- **Element:** `<nav aria-label="Pagination">` + `<ul>` + `<li>`
- **Variants:** default, minimal, dots
- **Sizes:** sm, md, lg
- **Notes:** `aria-current="page"` on active page.

### Breadcrumb
- **Element:** `<nav aria-label="Breadcrumb">` + `<ol>` + `<li>`
- **Variants:** default (chevron), slash
- **Sizes:** sm, md
- **Notes:** Last item `aria-current="page"`.

### InputGroup
- **Element:** `<div>` containing `<input>` + addon `<span>`
- **Variants:** with-left-addon, with-right-addon, with-both-addons, with-icon

### Navbar
- **Element:** `<nav aria-label="Primary navigation">`
- **Variants:** default, transparent, blur-backdrop
- **Positions:** top (sticky), inline

---

## Organisms

### Modal / Dialog
- **Element:** `<dialog>` or `<div>` + `role="dialog"`, `aria-modal="true"`
- **Sizes:** sm, md, lg, xl, full
- **Variants:** default, sheet (bottom drawer), alert (destructive confirmation)
- **Notes:** Focus trap, Escape closes. `z-index: --layer-dialog`.
- **Keyboard:** `useFocusTrap` + `useEscapeDismiss`. Tab/Shift+Tab cycle within dialog. Escape closes. Focus returns to trigger on close.

### Accordion
- **Element:** `<div>` with `<button>` triggers + `<div>` panels (disclosure pattern)
- **Variants:** default (bordered), flush, filled
- **Types:** single, multiple
- **Notes:** `aria-expanded` on triggers. Icon rotates 180° with `transition-default`.
- **Keyboard:** `useRovingTabindex` (vertical) on accordion headers. Enter/Space toggles panel. Home/End for first/last header.

### Tabs
- **Element:** `<div role="tablist">` + `<button role="tab">` + `<div role="tabpanel">`
- **Variants:** line, enclosed, soft, solid
- **Orientations:** horizontal, vertical
- **Sizes:** sm, md, lg
- **Notes:** Arrow key navigation. `aria-selected` on active tab.
- **Keyboard:** `useRovingTabindex` (horizontal or vertical based on orientation). ArrowLeft/Right (horizontal) or ArrowUp/Down (vertical) to switch tabs. Home/End for first/last. Tab moves out of tablist to tabpanel.

### Sidebar / NavigationDrawer
- **Element:** `<aside aria-label="Sidebar">` containing `<nav aria-label="Sidebar navigation">`
- **Variants:** default, compact (icon-only), overlay (mobile)
- **Notes:** `z-index: --layer-sticky`.
- **Keyboard:** `useRovingTabindex` (vertical) for nav items within the nav. `useEscapeDismiss` for responsive overlay. `useFocusTrap` when in responsive overlay mode.

### DataTable
- **Element:** `<table>` + `<thead>` + `<tbody>` + `<th scope="col">` + `<td>`
- **Variants:** default, striped, bordered, compact
- **Notes:** `aria-sort` on sortable headers. `<caption>` or `aria-label` on `<table>`. Skeleton rows for loading.
- **Keyboard:** Arrow keys for cell navigation (if interactive cells). Tab moves between interactive elements within a row. Enter to activate sortable headers.

### Header
- **Element:** `<header>` (page-level landmark)
- **Variants:** default, transparent, sticky
- **Notes:** `z-index: --layer-sticky`. No redundant `role="banner"` — native element provides it.

### HeroSection
- **Element:** `<section aria-label="...">`
- **Variants:** centered, split, fullscreen
- **Notes:** Display typography, Button atom for CTA.

---

## States All Components Must Handle

| State | Tailwind selector | Token |
|---|---|---|
| Default | *(base)* | component tokens |
| Hover | `hover:` | `-hover` suffix |
| Focus-visible | `focus-visible:focus-ring` | `--color-border-focus-visible` |
| Active | `active:` | `-active` suffix |
| Disabled | `disabled:` | `--color-action-disabled`, `--color-text-disabled` |
| Loading | `data-loading="true"` | `.skeleton` class |
| Error | `aria-invalid="true"` | `--color-border-error`, `--color-status-error` |
| Selected | `aria-selected="true"` | `--color-state-selected` |

---

## Size Mapping Guide

| Size | Height token | Typography |
|---|---|---|
| `xs` | `--size-component-xs` (24px) | `.text-button-xs` |
| `sm` | `--size-component-sm` (32px) | `.text-button-sm` |
| `md` | `--size-component-md` (40px) | `.text-button-md` |
| `lg` | `--size-component-lg` (48px) | `.text-button-lg` |
| `xl` | `--size-component-xl` (56px) | `.text-button-xl` |
