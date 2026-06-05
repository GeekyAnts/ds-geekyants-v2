# Toggle

A pressable button with a persistent pressed/unpressed state, communicated via `aria-pressed`. Use Toggle for formatting controls, view-mode switches, toolbar actions, and any UI element that can be "on" or "off" without representing a system-level setting.

> **Toggle vs Switch** — `Toggle` (`<button aria-pressed>`) communicates a UI state choice (e.g. "bold is active"). `Switch` (`<button role="switch" aria-checked>`) communicates an on/off system setting (e.g. "notifications enabled"). When in doubt: if flipping it changes the app's mode or formatting, use Toggle. If it enables/disables a feature, use Switch.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state. Omit for uncontrolled mode. |
| `defaultChecked` | `boolean` | `false` | Initial state in uncontrolled mode. |
| `onChange` | `(checked: boolean) => void` | — | Called with the new boolean whenever the state changes. |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Visual treatment strategy. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and typography scale. |
| `disabled` | `boolean` | `false` | Disables interaction and visual response. |
| `children` | `ReactNode` | — | Button content — text, icon, or both. |
| `aria-label` | `string` | — | **Required for icon-only usage** — provides the accessible name. |
| `className` | `string` | — | Additional Tailwind classes (merged last). |

All other native `<button>` attributes are forwarded (except `onClick` — use `onChange`).

---

## Tokens Used

All tokens are defined in `design-system/geeklego.css` under the `/* Toggle */` block.

| Token | Value | Purpose |
|---|---|---|
| `--toggle-radius` | `--radius-component-md` | Border radius |
| `--toggle-gap` | `--spacing-component-xs` | Gap between icon and label |
| `--toggle-height-{sm\|md\|lg}` | component size scale | Height per size |
| `--toggle-px-{sm\|md\|lg}` | component spacing scale | Horizontal padding per size |
| `--toggle-default-bg` | `--color-action-secondary` | Default variant resting bg |
| `--toggle-default-bg-pressed` | `--color-state-selected` | Default variant pressed bg |
| `--toggle-default-text-pressed` | `--color-text-primary` | Default variant pressed text |
| `--toggle-outline-border` | `--color-border-default` | Outline variant resting border |
| `--toggle-outline-border-pressed` | `--color-border-default` | Outline variant pressed border |
| `--toggle-ghost-bg` | `transparent` | Ghost variant resting bg (invisible) |
| `--toggle-ghost-bg-pressed` | `--color-state-selected` | Ghost variant pressed bg |
| `--toggle-bg-disabled` | `--color-action-disabled` | Disabled state bg (all variants) |
| `--toggle-text-disabled` | `--color-text-disabled` | Disabled state text (all variants) |
| `--toggle-shadow` | `none` | Resting shadow |
| `--toggle-shadow-hover` | `none` | Hover shadow |
| `--toggle-shadow-pressed` | `none` / `--shadow-inset-sm` | Pressed shadow |

---

## Variants

### `default`
Muted filled background at rest (`--color-action-secondary`). On hover: background deepens + border appears (two-property change). When pressed: background shifts to `--color-state-selected`, text becomes primary colour, border becomes default colour. Signals a moderate emphasis toggle — common for toolbar and filter contexts.

### `outline`
Transparent background with a persistent visible border (`--color-border-default`). On hover: background appears + border strengthens. When pressed: brand-tinted background + default border + primary text. The border's permanence signals this is an interactive element even at rest — suitable for button groups and segmented controls.

### `ghost`
Completely invisible at rest — no background, no border, secondary text. On hover: background appears (`--color-action-secondary`). When pressed: brand-tinted background + primary text. Use for toolbars and density-sensitive layouts where buttons should hide until needed.

---

## Sizes

| Size | Height | Padding | Typography |
|---|---|---|---|
| `sm` | `--size-component-sm` (32px) | `--spacing-component-sm` | `text-button-sm` |
| `md` | `--size-component-md` (40px) | `--spacing-component-md` | `text-button-md` |
| `lg` | `--size-component-lg` (48px) | `--spacing-component-lg` | `text-button-lg` |

Icon-only toggles are square — each size sets `min-w` equal to its height.

---

## States

| State | Visual treatment |
|---|---|
| **Unpressed** | Resting variant appearance |
| **Unpressed hover** | Bg deepens + border/text shift (two properties always) |
| **Pressed** | Brand-tinted bg + primary text/border; inset shadow when applicable |
| **Pressed hover** | Pressed bg deepens slightly (`--color-state-highlight`) |
| **Focus-visible** | Focus ring via `.focus-ring` — no other visual change |
| **Disabled** | `--toggle-bg-disabled` bg, `--toggle-text-disabled` text, no shadow, `pointer-events-none` |

---

## Usage

### Uncontrolled (internal state)
```tsx
<Toggle defaultChecked={false} onChange={(checked) => console.log(checked)}>
  Bold
</Toggle>
```

### Controlled
```tsx
const [isBold, setIsBold] = useState(false);

<Toggle checked={isBold} onChange={setIsBold} variant="outline">
  Bold
</Toggle>
```

### Icon-only (aria-label required)
```tsx
<Toggle aria-label="Bold" variant="ghost">
  <span aria-hidden="true">
    <Bold size="var(--size-icon-sm)" />
  </span>
</Toggle>
```

### Icon + text
```tsx
<Toggle variant="outline">
  <span aria-hidden="true">
    <Grid2x2 size="var(--size-icon-sm)" />
  </span>
  Grid view
</Toggle>
```

### Toolbar group
```tsx
<div role="toolbar" aria-label="Text formatting">
  <Toggle aria-label="Bold" checked={bold} onChange={setBold} variant="ghost">
    <span aria-hidden="true"><Bold size="var(--size-icon-sm)" /></span>
  </Toggle>
  <Toggle aria-label="Italic" checked={italic} onChange={setItalic} variant="ghost">
    <span aria-hidden="true"><Italic size="var(--size-icon-sm)" /></span>
  </Toggle>
</div>
```

---

## Accessibility

### Semantic element
`<button type="button">` — native button semantics: keyboard-focusable, activatable with Space/Enter, correct implicit role.

### ARIA attributes

| Attribute | Value | Purpose |
|---|---|---|
| `aria-pressed` | `true \| false` | Communicates checked state to assistive technology. Screen readers announce "Bold, toggle button, checked" or "not checked". |
| `aria-disabled` | `true` (when disabled) | Redundant with native `disabled` — ensures AT announces the state even on styled elements. |
| `aria-label` | required for icon-only | Provides accessible name when children contain no visible text. |

### Keyboard interaction

| Key | Action |
|---|---|
| `Tab` | Move focus to the toggle |
| `Shift+Tab` | Move focus away from the toggle |
| `Space` | Toggle the checked state |
| `Enter` | Toggle the checked state |

### Screen reader announcement
When focused: **"[label], toggle button, [checked/not checked]"**
After activation: state re-announced — **"[label], toggle button, checked"** or **"not checked"**.

### Decorative icons
All icons inside Toggle must be wrapped with `aria-hidden="true"` to prevent double-announcement. The accessible name must come from either the text children or an `aria-label` prop on the button.

### Non-colour state cue
Checked state always changes **both** a background/fill property **and** a border or text colour — never colour alone. This satisfies WCAG 1.4.1 (Use of Color).

### Touch target
All sizes meet WCAG 2.5.8 (24×24px minimum). `sm` height is 32px; `md` is 40px; `lg` is 48px.

---

## Schema.org
Toggle button has no Schema.org entity mapping. The `schema` prop is not applicable.