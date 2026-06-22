---
name: state-handling
description: >
  Implement and audit visual state handling for Geeklego components.
  Use this skill whenever the user asks about component states, loading placeholders,
  skeleton/spinner usage, disabled states, error states, or visual feedback patterns.
  Also trigger proactively when building or auditing any interactive component or data
  organism — every component that holds, fetches, or accepts user input needs a state plan.
  Trigger on phrases like: "add loading state", "skeleton placeholder", "disabled button",
  "error state", "loading spinner", "visual states", "state handling", "loading=true",
  "show a skeleton", "aria-busy", "aria-disabled", "aria-invalid", "selected state",
  "active state", or any request to add/fix component feedback behaviour.
---

# Geeklego — Component State Handling (v2)

Visual states make components feel alive and trustworthy. A component without a loading state
leaves users wondering if something is broken. A disabled state without proper ARIA leaves screen
reader users confused. This skill ensures every component handles visual state correctly —
consistently, accessibly, and in alignment with the design system.

> **v2 architecture (read `CLAUDE.md` first).** State styling uses **standard semantic Tailwind
> utilities** (`bg-muted`, `text-muted-foreground`, `text-destructive`, `ring-ring`) — registered
> via `@theme inline` in `design-system/v2/semantics.css`. There is **no component-token tier**:
> never add `--{component}-*` blocks and never use `bg-[var(--token)]` arbitraries for a value that
> has a registered utility. No atom/molecule/organism folders — components are flat under
> `components/v2/<Name>/`. Prefer Radix primitives (`data-[state=…]`, `data-disabled`) for stateful
> a11y wiring before reaching for `aria-helpers`. Reference component: `components/v2/Button/`.

---

## State Type Decision Matrix

| Situation | State to add | Key prop | ARIA attribute |
|---|---|---|---|
| Data is being fetched | **loading** | `loading?: boolean` | `aria-busy="true"` |
| User cannot interact | **disabled** | `disabled?: boolean` | `aria-disabled="true"` |
| Validation failed | **error** | `error?: string` | `aria-invalid="true"` + `aria-describedby` |
| Item is chosen / current | **selected / active** | `selected?` / `isActive?` | `aria-selected` / `aria-current="page"` |

---

## Loading State

### When to use Skeleton vs Spinner

| Signal | Use Skeleton | Use Spinner |
|---|---|---|
| Layout is unknown / content placeholder | ✓ | |
| Chart, list, card content loading | ✓ | |
| Button action in progress | | ✓ |
| Inline page indicator (no layout shift) | | ✓ |
| Full section / organism content | ✓ | |

### Skeleton pattern (organisms and section-level components)

```tsx
// 1. Declare the prop in types
loading?: boolean;

// 2. Spread aria-busy on the root element
{...getLoadingProps(loading)}

// 3. Replace the data area with Skeleton when loading
{loading ? (
  <Skeleton
    className="h-40 w-full rounded-md"
    aria-label="Loading chart data"
  />
) : data.length > 0 ? (
  /* normal render */
) : (
  /* empty state */
)}
```

Size the skeleton with standard utilities (`h-40 w-full rounded-md`) so it matches the
target area's dimensions. No component-token height var.

### Spinner pattern (buttons and inline atoms)

```tsx
// Button loading — content hidden, skeleton preserves dimensions
{loading ? (
  <span className="absolute inset-0 flex items-center justify-center">
    <Spinner size="sm" variant="inverse" />
  </span>
) : null}
<span className={loading ? 'invisible' : ''}>
  {children}
</span>
```

### Sizing

No loading tokens. Size the skeleton with standard utilities (`h-40`, `w-full`, `rounded-md`)
so it matches the dimensions of the content it replaces — no layout shift on resolve.

### ARIA rule

- `aria-busy="true"` goes on the outermost element of the component being loaded.
- The `<Skeleton>` already sets `aria-busy` and `role="status"` internally — do not double-set.
- Use `getLoadingProps(loading)` from `components/utils/accessibility/aria-helpers.ts` and spread it on the root.

---

## Disabled State

For a native form element, prefer the standard ShadCN/Tailwind disabled-state utilities
in the `cva` base (the Button reference uses exactly these):

```ts
// In the cva base string (button-variants.ts reference)
"disabled:pointer-events-none disabled:opacity-50"
```

```tsx
// Types
disabled?: boolean;

// Component — pass the native disabled attr; the cva base styles it via disabled:* utilities
const isDisabled = disabled || loading;

<button disabled={isDisabled} className={cn(thingVariants({ variant, size }), className)}>
```

For a Radix-based or non-`<button>` element that can't use the native `disabled` attribute,
style off Radix's `data-disabled` / `aria-disabled` with state variants:

```tsx
// ARIA — Radix primitives expose data-disabled natively; only reach for getDisabledProps()
// from components/utils/accessibility/aria-helpers.ts when no Radix primitive applies.
className={cn(
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
)}
```

No component-token disabled vars. The standard `opacity-50` muting is the v2 convention
(it re-themes for free); use semantic utilities (`bg-muted`, `text-muted-foreground`) only
when a variant needs an explicit muted fill rather than reduced opacity.

---

## Error State

Always provide a secondary cue beyond color (icon, border + text, or both).

```tsx
// Types
error?: string;

// ARIA — use getErrorFieldProps() from components/utils/accessibility/aria-helpers.ts
const errorId = useId();
{...getErrorFieldProps(!!error, errorId)}

// Error styling uses the standard `destructive` semantic on the field + message:
//   input:  aria-invalid:border-destructive aria-invalid:ring-destructive
//   message:
{error && (
  <span id={errorId} className="flex items-center gap-1.5 text-sm text-destructive">
    <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
    {error}
  </span>
)}
```

### Token usage

No component-token error vars. Use the standard `destructive` semantic
(`text-destructive`, `border-destructive`, `ring-destructive`) — it is in the v2
semantic set and re-themes in dark mode automatically.

---

## Selected / Active State

```tsx
// Types
selected?: boolean;   // for list items, options, chips
isActive?: boolean;   // for nav items

// CSS classes — standard semantics (no component tokens). For a Radix primitive,
// prefer its data-state hook: data-[state=active]:bg-accent, data-[state=checked]:…
className={cn(
  selected && 'bg-accent text-accent-foreground',
)}

// ARIA
aria-selected={selected || undefined}
// OR for navigation:
aria-current={isActive ? 'page' : undefined}
```

---

## Audit Checklist — By Component Kind

(There are no atom/molecule/organism tiers in v2 — these are functional groupings only.)

### Interactive controls (Button, Input, Select, Checkbox, Radio, Switch, Toggle)
- [ ] `disabled` prop → visual (`disabled:opacity-50` / `data-[disabled]`) + ARIA
- [ ] `loading` prop if async (Button, Submit)
- [ ] `error` prop for form controls (`aria-invalid` + `text-destructive`)
- [ ] `selected`/`checked` for choice controls (prefer Radix `data-[state=checked]`)

### Display elements (Avatar, Badge, Chip, Tag, Spinner, Skeleton)
- [ ] `loading` for Avatar (shimmer circle)
- [ ] No disabled needed for purely decorative elements

### Composite / section components (Card, SearchBar, FormField, Pagination, Breadcrumb)
- [ ] `loading` prop → Skeleton placeholder for content area
- [ ] Pass `disabled`/`error` down to constituent controls

### Data / overlay components (Sidebar, charts, DataTable, Dialog, Accordion)
- [ ] `loading` prop → Skeleton box at the content area's size
- [ ] `error` state for data-fetch failure (inline error or alert)

---

## Rules

1. **No component-token tier and no `bg-[var(--…)]` arbitraries.** Style state with standard
   semantic utilities (`bg-muted`, `text-destructive`, `ring-ring`) and `disabled:`/`data-[state=…]`
   variants. Size skeletons with standard sizing utilities — no `--{component}-loading-*` vars.
2. **Never double-set `aria-busy`** — it belongs on the root; `<Skeleton>` sets its own.
3. **Never use color alone** for error — pair with icon or text label.
4. **Never render a spinner and a skeleton simultaneously** on the same component.
5. **Prefer Radix state hooks** (`data-[state=…]`, `data-disabled`) over hand-wiring ARIA;
   reach for `getLoadingProps()`/`getDisabledProps()`/`getErrorFieldProps()` from
   `components/utils/accessibility/aria-helpers.ts` only when no Radix primitive provides it.
6. **Preserve layout dimensions during loading** — skeleton must match the target area's size.

---

## Reference

Full code examples → `.claude/skills/state-handling/references/patterns.md`
v2 reference component (canonical disabled-state styling) → `components/v2/Button/`
