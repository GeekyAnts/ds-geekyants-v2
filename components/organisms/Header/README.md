# Header

Page-level banner landmark (`<header>`) with compound slots for brand, navigation, and actions. Supports multiple visual variants and positioning modes. Manages responsive mobile menu state internally.

---

## Usage

```tsx
import { Header } from '../../organisms/Header/Header';
import { NavItem } from '../../atoms/NavItem/NavItem';
import { Button } from '../../atoms/Button/Button';

<Header>
  <Header.Brand href="/">
    <Logo />
    <span className="truncate-label text-heading-h5">Site Name</span>
  </Header.Brand>

  <Header.Nav>
    <NavItem href="/" label="Home" isActive />
    <NavItem href="/about" label="About" />
  </Header.Nav>

  <Header.Actions>
    <Button variant="primary" size="sm">Get started</Button>
  </Header.Actions>
</Header>
```

---

## Props

### `<Header>` (root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Compound slot children — Brand, Nav, Actions |
| `variant` | `'default' \| 'transparent' \| 'floating'` | `'default'` | Visual style |
| `position` | `'sticky' \| 'static' \| 'fixed'` | `'sticky'` | Positioning mode |
| `schema` | `boolean` | `false` | Opt-in Schema.org WPHeader Microdata |
| `loading` | `boolean` | `false` | Show skeleton placeholders in nav |
| `i18nStrings` | `HeaderI18nStrings` | — | Override localised strings |
| `...rest` | `HTMLAttributes<HTMLElement>` | — | Forwarded to `<header>` |

### `<Header.Brand>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Logo image, wordmark text, or both |
| `href` | `string` | `'/'` | URL the brand link navigates to. Sanitised via `sanitizeHref()` |
| `...rest` | `AnchorHTMLAttributes<HTMLAnchorElement>` | — | Forwarded to `<a>` |

### `<Header.Nav>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Navigation items — typically `<NavItem>` atoms |
| `...rest` | `HTMLAttributes<HTMLElement>` | — | Forwarded to the desktop `<nav>` element |

### `<Header.Actions>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Action elements — typically `<Button>` and/or `<Avatar>` |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | Forwarded to the wrapping `<div>` |

### `HeaderI18nStrings`

| Key | Default | Description |
|---|---|---|
| `navLabel` | `'Primary'` | `aria-label` for the primary `<nav>` landmark |
| `mobileNavLabel` | `'Navigation'` | `aria-label` for the mobile panel region |
| `openMenuLabel` | `'Open menu'` | Accessible label for mobile toggle when closed |
| `closeMenuLabel` | `'Close menu'` | Accessible label for mobile toggle when open |

---

## Compound Components

Header uses the compound component pattern. Each slot is a named static property on the root:

| Component | Element | Purpose |
|---|---|---|
| `Header.Brand` | `<a>` | Navigable brand identity — logo + wordmark |
| `Header.Nav` | `<nav>` | Primary navigation. Renders desktop nav + mobile panel |
| `Header.Actions` | `<div>` | CTA buttons, icon buttons, avatar |

Internal only (not exported as standalone):

| Component | Purpose |
|---|---|
| `MobileToggle` | Hamburger / X button. Only renders on `< md` viewports |

---

## Variants

| Variant | Visual style | Use case |
|---|---|---|
| `default` | Surface bg, bottom border | Standard site header |
| `transparent` | No bg, no border | Hero sections, branded backgrounds |
| `floating` | Overlay bg, subtle border, shadow | Fixed headers that float above content |

---

## Positions

| Position | Behaviour |
|---|---|
| `sticky` (default) | Sticks to top on scroll, stays in document flow |
| `static` | Normal document flow, no positioning |
| `fixed` | Fixed to viewport top, removed from document flow |

---

## Tokens Used

All tokens are defined in `design-system/geeklego.css` under the `/* Header */` block.

| Token | Value (default) | Description |
|---|---|---|
| `--header-height` | `var(--size-component-2xl)` | Fixed height of the header bar |
| `--header-px` | `var(--spacing-layout-sm)` | Horizontal padding |
| `--header-gap` | `var(--spacing-component-md)` | Gap between direct children |
| `--header-nav-gap` | `var(--spacing-component-xs)` | Gap between nav items |
| `--header-actions-gap` | `var(--spacing-component-sm)` | Gap between action elements |
| `--header-bg` | `var(--color-surface-default)` | Header background |
| `--header-shadow` | `none` | Header elevation |
| `--header-border-color` | `var(--color-border-default)` | Bottom border |
| `--header-brand-text-color` | `var(--color-text-primary)` | Brand link text |
| `--header-brand-text-color-hover` | `var(--color-action-primary)` | Brand link hover text |
| `--header-brand-gap` | `var(--spacing-component-sm)` | Gap between logo and wordmark |
| `--header-mobile-panel-bg` | `var(--color-surface-default)` | Mobile panel background |
| `--header-mobile-panel-border` | `var(--color-border-default)` | Mobile panel bottom border |
| `--header-mobile-panel-shadow` | `var(--shadow-lg)` | Mobile panel elevation |
| `--header-mobile-panel-px` | `var(--spacing-layout-sm)` | Mobile panel horizontal padding |
| `--header-mobile-panel-py` | `var(--spacing-component-lg)` | Mobile panel vertical padding |
| `--header-brand-name-overflow` | `var(--content-overflow-label)` | Brand name overflow |
| `--header-brand-name-whitespace` | `var(--content-whitespace-label)` | Brand name whitespace |
| `--header-brand-name-text-overflow` | `var(--content-text-overflow-label)` | Brand name text overflow |
| `--header-min-width` | `var(--content-min-width-md)` | Minimum content width |

Variant tokens are applied via CSS class rules (`.header-variant-transparent`, `.header-variant-floating`) that override `--header-bg`, `--header-border-color`, and `--header-shadow` via the CSS cascade.

NavItem tokens are overridden for the header context via the `.header-nav-context` CSS class rule, which sets `--navitem-text`, `--navitem-bg-hover`, `--navitem-bg-active`, `--navitem-radius`, `--navitem-padding-x`, `--navitem-height`, and `--navitem-gap`.

---

## Responsive Behaviour

| Viewport | Layout |
|---|---|
| `< md` (< 768px) | Brand · Actions · MobileToggle. Nav hidden. Toggle opens mobile panel below bar with smooth opacity/transform transition. |
| `≥ md` (≥ 768px) | Brand · Nav (flex-1, horizontal) · Actions. MobileToggle hidden. |

The mobile panel is positioned `absolute inset-x-0 top-[var(--header-height)]` relative to the `<header>` element.

---

## States

| State | Description |
|---|---|
| Default | Mobile panel closed. Header sticky at top of viewport. |
| Mobile menu open | Panel slides in below bar with smooth transition. Toggle icon switches Menu — X. |
| Mobile menu closed | Dismissed by toggle click, Escape key, or click outside `<header>`. |
| Loading | Nav items replaced by skeleton placeholders; `aria-busy="true"` on `<header>`. |

---

## Accessibility

### Semantic Element

`<header>` — announces as `"banner"` landmark to screen readers when it is a direct descendant of `<body>`. If nested, use `role="banner"` explicitly.

### ARIA Attributes

| Attribute | Element | Value | Description |
|---|---|---|---|
| `aria-label` | `<nav>` (desktop) | `i18n.navLabel` (default: `"Primary"`) | Distinguishes nav landmark |
| `aria-hidden` | `<nav>` (mobile) | `true` when closed | Hides from AT when not visible |
| `aria-expanded` | Mobile toggle `<button>` | `true` / `false` | Communicates panel state |
| `aria-controls` | Mobile toggle `<button>` | mobile nav `id` | Links toggle to its panel |
| `id` | Mobile nav `<nav>` | Generated via `useId()` | Target for `aria-controls` |
| `aria-busy` | `<header>` | `true` | Set during loading state |

### Keyboard Interaction

| Key | Behaviour |
|---|---|
| `Tab` | Moves focus through brand link, nav items, action buttons, mobile toggle |
| `Enter` / `Space` | Activates focused link or button |
| `Escape` | Closes mobile menu if open (via `useEscapeDismiss`) |
| Click outside | Closes mobile menu if open (via `useClickOutside`) |

### Screen Reader Announcements

- `<header>` — `"banner"` landmark
- `<nav aria-label="Primary">` — `"Primary navigation"` landmark
- Mobile toggle — `"Open menu, button"` / `"Close menu, expanded, button"`
- Brand link — `"[brand name], link"`
- `NavItem` with `isActive` — `"[label], current page, link"`

### Focus Management

Mobile menu opens and closes without moving focus from the toggle button. Tab order naturally flows into the mobile panel when it is visible.

---

## Schema.org

When `schema={true}`, the `<header>` element receives Schema.org Microdata:

```html
<header itemscope itemtype="https://schema.org/WPHeader">
```

Maps to the [WPHeader](https://schema.org/WPHeader) type. Pass `schema` to child `<NavItem>` elements separately.

---

## Internationalisation

All system-generated strings are resolved via `useComponentI18n('header', i18nStrings)`.

```tsx
<Header
  i18nStrings={{
    navLabel: 'Hauptnavigation',
    mobileNavLabel: 'Navigation',
    openMenuLabel: 'Menü öffnen',
    closeMenuLabel: 'Menü schließen',
  }}
>
  …
</Header>
```

---

## Examples

### Minimal — brand + CTA

```tsx
<Header>
  <Header.Brand href="/"><Logo /></Header.Brand>
  <Header.Actions>
    <Button variant="primary" size="sm">Get started</Button>
  </Header.Actions>
</Header>
```

### App shell — icon actions + avatar

```tsx
<Header>
  <Header.Brand href="/"><Logo /></Header.Brand>
  <Header.Nav>
    <NavItem href="/" label="Dashboard" isActive />
    <NavItem href="/settings" label="Settings" />
  </Header.Nav>
  <Header.Actions>
    <Button variant="ghost" size="sm" iconOnly leftIcon={<Bell size="var(--size-icon-md)" aria-hidden="true" />}>
      Notifications
    </Button>
    <Avatar variant="initials" initials="JD" size="sm" aria-label="User menu" />
  </Header.Actions>
</Header>
```

### Transparent on branded background

```tsx
<div className="bg-[var(--color-surface-brand)]">
  <Header variant="transparent">
    <Header.Brand href="/"><Logo /></Header.Brand>
    <Header.Nav>…</Header.Nav>
    <Header.Actions>…</Header.Actions>
  </Header>
</div>
```

### Fixed floating header

```tsx
<Header variant="floating" position="fixed">
  <Header.Brand href="/"><Logo /></Header.Brand>
  <Header.Nav>…</Header.Nav>
  <Header.Actions>…</Header.Actions>
</Header>
```

### Dark mode

```tsx
<div data-theme="dark">
  <Header>…</Header>
</div>
```
