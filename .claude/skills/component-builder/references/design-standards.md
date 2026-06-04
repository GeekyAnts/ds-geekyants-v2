# Design Standards — Component Quality Reference

> This is the most important section in the skill. Architectural correctness is necessary but insufficient. A component that follows every token rule but *looks* like AI-generated boilerplate has failed. Components must feel intentionally designed — not just structurally valid.

## Shadow Elevation Rule — Theme-Aware Depth

Shadows communicate layering — they should only appear when an element genuinely floats above the page. The rule differs by theme:

**Light mode & Dark mode — flat UI, contextual shadows only:**

| Element | Shadow | Why |
|---|---|---|
| Static/resting component (Button, Card, Input, Item) | `none` | Flat surfaces sit in the page, not above it |
| Overlay that opens on interaction (dropdown panel, tooltip, popover) | `--shadow-lg` | Floats above the page — shadow communicates this |
| Modal or dialog | `--shadow-xl` | Highest priority layer — demands the strongest shadow |

Never add shadow to a resting component in light or dark mode. Only the floating layer gets shadow.

## Spacing Has Rhythm

Inside a component, spacing follows the **component scale** (`--spacing-component-xs` through `xl`). Between components in a layout, spacing follows the **layout scale** (`--spacing-layout-xs` through `xl`).

The internal rhythm should be tighter than the external rhythm. A card's internal padding (`--spacing-component-lg` = 16px) should be noticeably less than the gap between cards in a grid (`--spacing-layout-sm` = 24px). If internal and external spacing are the same, the UI feels flat — nothing has hierarchy.

## Variants Must Be Visually Distinct at a Glance

If a user squints at your variants and can't tell `secondary` from `ghost`, the design has failed. Use **different types** of visual treatment for each variant — not just color shifts:

| Variant type | Visual approach | Example treatment |
|---|---|---|
| **Primary** | Filled background + high contrast text (light/dark flat) | Demands attention — this is the main action |
| **Secondary** | Filled but muted background, no shadow | Supports the primary without competing |
| **Outline** | Transparent background + visible border | Visible but lightweight — secondary emphasis |
| **Ghost** | Transparent everything, color appears only on hover | Hides until needed — tertiary emphasis |
| **Destructive** | Filled with error color (light/dark flat) | Signals danger — impossible to miss |
| **Link** | No background, no border, underline on hover | Inline text action — blends with prose |

Each variant should use a *fundamentally different strategy* to communicate its importance level.

## Transitions Must Feel Alive

Every state change must be animated. Instant snapping between states feels broken.

| Timing need | Class/token | Duration | When to use |
|---|---|---|---|
| Hover/active micro-moments | `--duration-interaction` | 100ms | Pressing a button, toggling a switch |
| State change (bg, border, shadow) | `.transition-default` | 200ms ease-out | Most hover/focus transitions |
| Component entry (modals, dropdowns) | `.transition-enter` | 300ms ease-out | Mount animations |

**Critical rule: hover states should change at least two properties.** In light/dark mode: Background AND border, or color AND opacity — not shadow (static elements have no shadow). A single-property change feels flat and lifeless.

## How Each State Should Feel

| State | Visual treatment | Required properties |
|---|---|---|
| **Default** | Resting appearance. Flat (no shadow) in light/dark. | — |
| **Hover** | Background shifts one step deeper + border tint change (light/dark). | `cursor-pointer`, two-property change |
| **Focus-visible** | Focus ring appears. No other change beyond the ring. | `focus-visible:outline-none focus-visible:focus-ring` |
| **Active/Pressed** | Background darkens beyond hover. | — |
| **Disabled** | Muted background + text. No shadow. No hover/active response. | `cursor-not-allowed`, `pointer-events-none`, `aria-disabled` |
| **Loading** | Spinner replaces content. Same dimensions — no layout shift. | `aria-busy="true"`, same `width`/`height` |
| **Error** | Border or background shifts to error color. Use `--component-border-error` or `--component-bg-error` token — never hardcode a color. Error text uses `--component-text-error` aliasing `--color-text-error`. | `aria-invalid="true"`, `aria-describedby` pointing to the error message element |

## Dark Mode Color Rules — Enforced on Every Component

Before assigning any color token in a dark mode override block, apply this table:

| Category | Light mode | Dark mode | Rule |
|---|---|---|---|
| Action primary bg | brand-500 | brand-400 | Lighter shade reads on dark surfaces |
| Text on filled bg | neutral-0 (white) | neutral-950 (near-black) | brand-400 is a light color — dark text required for contrast |
| Selected state bg | brand-50 (pale tint) | brand-950 (dark tint) | Muted dark container, never opaque brand fill |
| Hover overlay | neutral-50 | neutral-800 | One subtle step from surface |
| Pressed overlay | neutral-100 | neutral-700 | Deeper than hover |
| Status subtle bg | color-50 | color-900 | Pale tints are near-white on dark bg — broken |
| Shadow opacity | 6–14% | 40–70% | Dark surfaces absorb light, low-opacity shadows vanish |
| Data series colors | -500 shade | -400 shade | One step lighter for dark bg visibility |

**Contrast check rule:** If the background token resolves to a shade 700–950,
text must be neutral-0 to neutral-100. If background resolves to a shade 50–400
(a light color used as bg), text must be neutral-900 to neutral-950.
Never place light text on a light background or dark text on a dark background.

## Loading States Preserve Dimensions

A loading button stays the same size and shape — only the text is replaced by a spinner. The spinner inherits `currentColor` and uses the matching icon size token for the component's size. The component must not jump, resize, or reflow during loading.

## Inline Style Policy — When `style` Prop Is Acceptable

**The rule:** Never use `style` prop for CSS property values (color, background, width, height, border, shadow, transition, etc.). Use `className` with Tailwind arbitrary values (`bg-[var(--token)]`, `min-w-[var(--token)]`).

**Four acceptable exceptions** — all other uses must be eliminated:

1. **CSS custom property injection** — Bind a runtime-computed value to a `--var`, then consume it via `className`:
   ```tsx
   // ✓ Acceptable — style only sets the CSS var; visual rendering comes from className
   <div
     style={{ '--slider-fill-pct': `${pct}%` } as React.CSSProperties}
     className="bg-[var(--slider-fill-pct)]"
   />
   ```
   The `style` object must contain ONLY `--custom-prop` keys, never `background`, `color`, etc. Add a comment explaining why the value is dynamic.
   **Never** set a CSS var that is already defined in the component's token block — those cascade from `geeklego.css` naturally.

2. **Consumer `style` prop passthrough** — A wrapper component may forward a consumer-supplied `style` for layout overrides:
   ```tsx
   // ✓ Acceptable — consumer escape hatch
   style={style as React.CSSProperties}
   ```
   Document with a comment.

3. **SVG presentation attributes** — Use camelCase React props directly, never `style`:
   ```tsx
   // ✓ Correct
   <stop stopColor={seriesColor} stopOpacity={0.25} />
   // ❌ Wrong
   <stop style={{ stopColor: seriesColor }} />
   ```

4. **Dynamic data-driven positioning** — Runtime geometry or data values (tooltip `left` from `getBoundingClientRect()`, thumb `top` from pointer tracking, `flexGrow` from data ratio). Always pair with a comment.

**Compound CSS values (multi-layer gradients, compound borders):** When a visual property combines multiple tokens in a way Tailwind arbitrary values cannot express, add a CSS utility class to `geeklego.css` in the utility classes section (before `GENERATED COMPONENT TOKENS`), then reference it via `className`:
```css
.color-picker-thumb-ring { border: var(--picker-thumb-border-width) solid var(--picker-thumb-border); }
```

**Rule of thumb:** If the `style` prop value is `var(--something)`, it should be a className. If it's a genuinely dynamic value (user color, mouse position, data value), use the CSS var injection pattern: set `--custom-prop` via style, read it via `var(--custom-prop)` in className.

## Standardized Prop Naming — Mandatory Conventions

Prop names must be consistent across all components. The following table lists the canonical prop name for each concept and the pattern it follows. Every new component must use these — never invent a new name for an existing concept.

| Concept | Canonical Prop | Type | Used by | Example |
|---|---|---|---|---|
| **Binary on/off state** | `checked` | `boolean` | Switch, Toggle, Checkbox, Radio | `checked={true}` / `onChange={handleChange}` |
| **Change handler** | `onChange` | `(value: T) => void` | All interactive controls | `onChange={(checked) => setState(checked)}` |
| **Uncontrolled initial state** | `defaultChecked` | `boolean` | Switch, Toggle, Checkbox, Radio | `defaultChecked={false}` |
| **Loading / busy state** | `loading` | `boolean` | ALL components with async behavior | `loading={isFetching}` |
| **Error message (wrapper)** | `error` | `string` | FormField, Fieldset, DateInput, SearchBar, FileUpload | `error="Required field"` |
| **Error visual state (atom)** | `error` | `boolean` | Input, Select, Textarea, Checkbox, Radio | `error={!!fieldError}` |
| **Active navigation item** | `isActive` | `boolean` | NavItem, BreadcrumbItem, Sidebar, Navbar | `isActive={route === currentPath}` |
| **Disabled interaction** | `disabled` | `boolean` | All interactive components | `disabled={!isValid}` |

**Rationale for key choices:**

- `checked` (not `pressed`/`selected`): Used for all binary on/off toggles regardless of internal ARIA role. Toggle uses `aria-pressed` internally but exposes `checked`/`onChange` externally. This matches React Aria conventions and gives consumers a single consistent API for all binary controls.

- `loading` (not `isLoading`): Simpler, more common in modern React (React 19 patterns, shadcn/ui, Radix). 18 out of 30 components already use `loading` — this is the majority convention.

- `error: string` (not `errorMessage`): Unified prop for both message display and boolean truthiness. Atoms that only need visual state without a message use `error: boolean`. The two forms are distinguished by type, not by name — never use both on the same component.

- `isActive` (not `current`/`active`): Consistent with `getNavigationItemProps()` helper and matches the `is*` boolean prefix convention used across `isSelected`, `isDisabled`, etc. BreadcrumbItem uses `isActive` like all other navigation items.

**Validation:** After generating a new component, run `rg 'isLoading|errorMessage|pressed|onPressedChange' packages/geeklego/components/[level]/[ComponentName]/` to confirm none of the deprecated prop names appear.
