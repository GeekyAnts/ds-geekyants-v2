# InputGroup

A molecule that composes an input with addon elements — icons, text labels, or buttons — sharing a unified border and visual boundary. Uses a **composition API** with slot components.

## Description

`InputGroup` provides a flexible way to attach prefix or suffix decorations to a text input. The group container owns the border, background, radius, and hover/focus-within states. Child slot components handle their own visual treatment:

- **`InputGroup.Input`** — wraps the Input atom in unstyled mode; fills available space
- **`InputGroup.Addon`** — icon, text, or kbd with muted background and separator border
- **`InputGroup.Button`** — action button fused with the group boundary (radius clipped on inner edge)

Addons can be:
- **Decorative** — icon or short text label (e.g., `$`, `USD`, `+1`). Pass `aria-hidden="true"` on purely decorative content.
- **Interactive** — a `InputGroup.Button` used as a submit or action button.

---

## Composition API

```tsx
<InputGroup variant="default" size="md">
  <InputGroup.Addon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search…" />
  <InputGroup.Button variant="primary" size="xs">Go</InputGroup.Button>
</InputGroup>
```

### Slot Components

| Slot | Purpose | Key props |
|---|---|---|
| `InputGroup.Input` | Text input field | All `<input>` props (placeholder, type, value, onChange, etc.) |
| `InputGroup.Addon` | Icon, text, or kbd decoration | `align` — `'inline-start'` (default) \| `'inline-end'` \| `'block-start'` \| `'block-end'` |
| `InputGroup.Button` | Action button fused with group | `size` — `'sm'` \| `'md'` (default) \| `'lg'` |

### Addon Alignment

| `align` value | Visual position | Separator edge |
|---|---|---|
| `inline-start` | Before the input | Right edge of addon |
| `inline-end` | After the input | Left edge of addon |
| `block-start` | Above the input | Bottom edge of addon |
| `block-end` | Below the input | Top edge of addon |

---

## Props (InputGroup root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'filled' \| 'flushed' \| 'unstyled'` | `'default'` | Visual style applied to the group container. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and typography scale. |
| `error` | `boolean` | `false` | Error state — shows error border on the group. |
| `loading` | `boolean` | `false` | Loading state — disables interaction. |
| `disabled` | `boolean` | `false` | Disables the entire group. Mutes addon appearance. |
| `className` | `string` | — | Extra class names for the group wrapper. |
| `aria-label` | `string` | — | Accessible label for the `role="group"` element. |
| `children` | `ReactNode` | — | Composition children: InputGroup.Input, InputGroup.Addon, InputGroup.Button. |
| `i18nStrings` | `InputGroupI18nStrings` | — | Optional i18n strings for placeholder text. |

---

## Tokens Used

| Token | Purpose |
|---|---|
| `--input-group-radius` | Border radius of the group container |
| `--input-group-border` | Border colour at rest |
| `--input-group-border-hover` | Border colour on hover |
| `--input-group-border-focus` | Border colour on focus-within |
| `--input-group-border-error` | Border colour in error state |
| `--input-group-border-disabled` | Border colour when disabled |
| `--input-group-bg` | Background of the input area |
| `--input-group-bg-hover` | Background on hover |
| `--input-group-bg-disabled` | Background when disabled |
| `--input-group-addon-bg` | Addon element background (muted) |
| `--input-group-addon-bg-disabled` | Addon background when disabled |
| `--input-group-addon-border` | Separator border between addon and input |
| `--input-group-addon-text` | Addon text/icon colour |
| `--input-group-addon-text-disabled` | Addon text colour when disabled |
| `--input-group-addon-px-{sm\|md\|lg}` | Addon horizontal padding per size |
| `--input-group-button-border-inline` | Separator border between fused button and input |
| `--input-group-button-border-inline-hover` | Button separator border on hover |
| `--input-group-shadow` | Box shadow at rest (flat in light/dark) |
| `--input-group-shadow-hover` | Box shadow on hover (flat in light/dark) |

---

## Variants

| Variant | Visual strategy |
|---|---|
| `default` | Outlined container — visible border at rest, darkens on hover, switches to focus colour on focus-within |
| `filled` | Muted-background container — no visible border at rest; border appears on focus |
| `flushed` | Bottom-border only, no radius — editorial / minimal |
| `unstyled` | No border, no background — blank slate |

---

## Sizes

| Size | Height token | Typography |
|---|---|---|
| `sm` | `--input-height-sm` | `.text-body-sm` |
| `md` | `--input-height-md` | `.text-body-md` |
| `lg` | `--input-height-lg` | `.text-body-lg` |

Addon padding scales with size via `--input-group-addon-px-{size}`.

---

## States

| State | Visual treatment |
|---|---|
| Default | Resting border and muted addon background |
| Hover | Border deepens; background shifts one step |
| Focus-within | Border switches to focus colour |
| Error | Border locked to error colour in all states |
| Disabled | Muted border and muted addon bg; no hover/focus response; `cursor-not-allowed` |
| Loading | Spinner replaces inner content (via inner Input); group stays same size |

---

## Accessibility

**Semantic element:** `<div role="group">` wrapping a native `<input>` (via `Input` atom)

| Attribute | Applied to | Notes |
|---|---|---|
| `role="group"` | Group `<div>` | Groups the label, input, and addons as one logical unit |
| `aria-label` | Group `<div>` | Recommended when no visible `<label>` is present |
| `aria-disabled` | Group `<div>` | Set when `disabled` or `loading` is true |
| `aria-invalid` | Inner `<input>` | Set by the inner Input atom when `error={true}` |
| `aria-busy` | Inner `<input>` | Set by the inner Input atom when `loading={true}` |
| `aria-describedby` | `...rest` → inner `<input>` | Pass to connect a hint/error message element |

**Decorative addons** — icon or text-label addons that are purely decorative should have `aria-hidden="true"` applied to their content:

```tsx
<InputGroup.Addon align="inline-start">
  <Search size="var(--size-icon-sm)" aria-hidden="true" />
</InputGroup.Addon>
```

**Semantic addons** — text prefixes with meaning (e.g., `+1` country code) should be read by screen readers. Omit `aria-hidden`:

```tsx
<InputGroup.Addon align="inline-start">
  <span>+1</span>
</InputGroup.Addon>
```

**Interactive button suffix** — `InputGroup.Button` retains its own accessible name and keyboard behaviour:

```tsx
<InputGroup.Button variant="primary" size="xs">Subscribe</InputGroup.Button>
```

**Icon-only button suffix** — provide `aria-label` on the button:

```tsx
<InputGroup.Button variant="ghost" size="xs" aria-label="Copy to clipboard">
  <Copy size="var(--size-icon-sm)" aria-hidden="true" />
</InputGroup.Button>
```

### Keyboard Interaction

| Key | Behaviour |
|---|---|
| `Tab` | Moves focus to the inner input (addons are not focusable unless they contain interactive elements) |
| Standard input keys | Character input, selection, deletion |
| `Tab` (with button suffix) | Continues to the Button in the suffix slot |
| `Enter` / `Space` | Activates the focused button |

---

## Usage

```tsx
import { InputGroup } from '@geeklego/ui/components/molecules/InputGroup';
import { Search, Mail, Copy } from 'lucide-react';

// Icon prefix
<InputGroup aria-label="Search">
  <InputGroup.Addon align="inline-start">
    <Search size="var(--size-icon-sm)" aria-hidden="true" />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search…" />
</InputGroup>

// Text prefix + suffix (currency input)
<InputGroup aria-label="Amount in USD">
  <InputGroup.Addon align="inline-start">
    <span aria-hidden="true">$</span>
  </InputGroup.Addon>
  <InputGroup.Input placeholder="0.00" type="number" />
  <InputGroup.Addon align="inline-end">
    <span aria-hidden="true">USD</span>
  </InputGroup.Addon>
</InputGroup>

// Button suffix (CTA)
<InputGroup aria-label="Newsletter signup">
  <InputGroup.Addon align="inline-start">
    <Mail size="var(--size-icon-sm)" aria-hidden="true" />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="your@email.com" type="email" />
  <InputGroup.Button>Subscribe</InputGroup.Button>
</InputGroup>

// Icon-only button suffix (copy action)
<InputGroup aria-label="Copy link">
  <InputGroup.Input placeholder="https://example.com" />
  <InputGroup.Button aria-label="Copy link">
    <Copy size="var(--size-icon-sm)" aria-hidden="true" />
  </InputGroup.Button>
</InputGroup>

// Error state
<InputGroup aria-label="Email" error aria-describedby="email-error">
  <InputGroup.Addon align="inline-start">
    <Mail size="var(--size-icon-sm)" aria-hidden="true" />
  </InputGroup.Addon>
  <InputGroup.Input type="email" placeholder="you@example.com" />
</InputGroup>
<span id="email-error">Enter a valid email address.</span>

// Filled variant, large size
<InputGroup variant="filled" size="lg" aria-label="Documentation search">
  <InputGroup.Addon align="inline-start">
    <Search size="var(--size-icon-md)" aria-hidden="true" />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search docs…" />
</InputGroup>
```
