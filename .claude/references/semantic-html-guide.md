# Semantic HTML Guide — Geeklego

> Lookup reference for HTML element selection during component generation.
> Consult this in Phase 1, Step 2.5 (Semantic HTML Selection) before writing any code.

---

## Section A — Element Decision Table

Use the correct HTML element for each component purpose. Never use `<div>` when a semantic element exists.

### Interactive Controls

| Purpose | Element | Notes |
|---|---|---|
| User action (click) | `<button type="button">` | Native keyboard, focus, disabled support |
| Form submit | `<button type="submit">` | Inside `<form>`, triggers submit event |
| Navigation link | `<a href="...">` | Native navigation semantics, right-click context menu |
| Form text input | `<input type="text">` | Native form participation, validation |
| Password input | `<input type="password">` | Masked input with browser autofill |
| Email/URL/tel input | `<input type="email\|url\|tel">` | Mobile keyboard optimization |
| Number input | `<input type="number">` | Native increment/decrement |
| Multi-line text | `<textarea>` | Native resize behavior |
| Checkbox | `<input type="checkbox">` | Native checked/indeterminate state |
| Radio button | `<input type="radio">` | Native radio group behavior via `name` |
| Dropdown select | `<select>` + `<option>` | Native popup, keyboard navigation |
| Toggle/switch | `<button>` + `role="switch"` | No native switch element exists |
| Range slider | `<input type="range">` | Native thumb and track |
| File upload | `<input type="file">` | Native file picker |

### Content & Structure

| Purpose | Element | Notes |
|---|---|---|
| List of items (unordered) | `<ul>` + `<li>` | SR announces item count |
| Ordered sequence | `<ol>` + `<li>` | SR announces position |
| Key-value pairs | `<dl>` + `<dt>` + `<dd>` | Semantic definition list |
| Data table | `<table>` + `<thead>` + `<tbody>` + `<th>` + `<td>` | Native table semantics |
| Image with caption | `<figure>` + `<img>` + `<figcaption>` | Semantic image grouping |
| Standalone image | `<img alt="...">` | Always has descriptive `alt` |
| Decorative image | `<img alt="">` | Empty alt = decorative |
| Thematic break / separator | `<hr>` | Native separator semantics |
| Blockquote | `<blockquote>` + `<cite>` | Quoted content with attribution |
| Code block | `<pre>` + `<code>` | Preformatted code |
| Time/date | `<time datetime="...">` | Machine-readable date |

### Landmark Regions

| Purpose | Element | Notes |
|---|---|---|
| Page header | `<header>` | Implicit `banner` role when direct child of `<body>` |
| Page footer | `<footer>` | Implicit `contentinfo` role when direct child of `<body>` |
| Navigation region | `<nav>` + `aria-label` | Each `<nav>` must have a unique label |
| Sidebar | `<aside>` + `aria-label` | Complementary content |
| Main content | `<main>` | Only one per page |
| Thematic section | `<section>` + `aria-labelledby` | Only use when it has a heading |
| Self-contained content | `<article>` | Blog post, comment, card with full context |

### Non-Semantic (Correct Uses of `<div>` and `<span>`)

| Purpose | Element | Notes |
|---|---|---|
| Layout wrapper (flex/grid) | `<div>` | No semantic meaning needed |
| Card container (no link) | `<div>` | No "card" semantic exists |
| Badge / tag (decorative) | `<span>` | Inline, non-interactive |
| Icon wrapper | `<span>` | Always `aria-hidden="true"` if decorative |
| Form field wrapper | `<div>` | Structural grouping only |
| Progress indicator | `<div>` + `role="progressbar"` | No native element exists |
| Loading spinner | `<div>` + `role="status"` | Live region for SR announcement |
| Alert / toast | `<div>` + `role="alert"` | Assertive live region |
| Modal / dialog | `<dialog>` or `<div>` + `role="dialog"` | `<dialog>` preferred when focus trap is native |
| Tooltip | `<div>` + `role="tooltip"` | No native element exists |
| Tab interface | `<div role="tablist">` + `<button role="tab">` + `<div role="tabpanel">` | Composite widget |
| Accordion panel | `<div>` | Controlled by `<button>` trigger with `aria-expanded` |

---

## Section B — Link vs Button Decision Rule

```
Does the element navigate to a URL?
  YES → <a href="...">
    Does it look like a button? → Style with button classes, keep <a>
  NO  → Does it trigger an action, toggle, or disclosure?
    YES → <button type="button">
    NO  → Is it purely decorative/display?
      YES → <span> or <div>
```

**Hard rules:**
- Never put `onClick` on a `<div>` or `<span>`. If it's clickable, it's `<a>` or `<button>`.
- Never use `role="button"` on a `<div>` when `<button>` exists.
- Never use `role="link"` on a `<span>` when `<a>` exists.
- A link that looks like a button is still `<a>` — style it, don't change the element.
- A button that navigates (SPA router) is still `<a>` if it changes the URL.

---

## Section C — Heading Hierarchy Rules

| Component level | Default heading | Notes |
|---|---|---|
| Template (L4) | `<h1>` | Only one per page. Templates own `<h1>`. |
| Organism (L3) | `<h2>` | Page sections: Header, Sidebar, Modal title |
| Sub-section in organism | `<h3>` | Sidebar group labels, Accordion panel titles |
| Molecule (L2) | `<h3>` or `<h4>` | Card title, FormField legend |
| Atom (L1) | None | Atoms rarely render headings |

**Rules:**
- Never skip heading levels within a component (no `<h2>` → `<h4>`).
- Components that render headings should accept a `headingLevel` prop (type: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`) defaulting to the contextually appropriate level. This lets consumers override when nesting components.
- Typography class (`.text-heading-h1`) is independent of the HTML heading element. You can use `<h3 className="text-heading-h2">` when visual size and semantic level differ.
- Sidebar group labels use `<h3>`. Accordion section titles use `<h3>`.

---

## Section D — Form Structure Patterns

### Label Association

Every `<input>`, `<textarea>`, and `<select>` must have an associated `<label>`:

```tsx
// Pattern 1 — explicit association (preferred)
<label htmlFor={fieldId}>Email</label>
<input id={fieldId} type="email" />

// Pattern 2 — wrapping label
<label>
  Email
  <input type="email" />
</label>
```

### Control Grouping

Related controls use `<fieldset>` + `<legend>`:

```tsx
<fieldset>
  <legend>Shipping address</legend>
  {/* Address fields here */}
</fieldset>

<fieldset>
  <legend>Payment method</legend>
  {/* Radio buttons here */}
</fieldset>
```

### Error & Helper Text

```tsx
<label htmlFor={fieldId}>Email</label>
<input
  id={fieldId}
  type="email"
  aria-describedby={`${fieldId}-hint ${fieldId}-error`}
  aria-invalid={hasError}
  aria-required={required}
/>
<p id={`${fieldId}-hint`}>We'll never share your email.</p>
{hasError && <p id={`${fieldId}-error`} role="alert">Please enter a valid email.</p>}
```

**Rules:**
- `aria-describedby` supports space-separated IDs — combine hint + error.
- `aria-required="true"` on required fields, plus a visual indicator on the `<label>`.
- `aria-invalid="true"` only when validation has run and failed — not on initial render.
- Error messages use `role="alert"` for immediate SR announcement.
- Use `useId()` for all generated IDs.

---

## Section E — Table Semantics

For the DataTable component (L3 Organism):

```tsx
<table>
  <caption>Monthly sales data</caption>  {/* or aria-label on <table> */}
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">Name</th>
      <th scope="col" aria-sort="none">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>  {/* row header, if applicable */}
      <td>$12,000</td>
    </tr>
  </tbody>
</table>
```

**Rules:**
- Always use native `<table>` — never a CSS grid of `<div>` for tabular data.
- `<th scope="col">` for column headers, `<th scope="row">` for row headers.
- `<caption>` or `aria-label` on `<table>` provides an accessible name.
- Sortable columns: `aria-sort="ascending"`, `"descending"`, or `"none"` on the `<th>`.
- `<thead>` and `<tbody>` are always present, even for simple tables.
- Loading state: render skeleton `<td>` elements inside real `<tr>` — never replace the `<table>`.

---

## Section F — Landmark Stacking Rules

| Rule | Detail |
|---|---|
| Max one `<main>` per page | Templates own `<main>`. Organisms never render `<main>`. |
| Multiple `<nav>` | Each must have a unique `aria-label` (e.g., "Primary navigation", "Sidebar navigation", "Breadcrumb"). |
| Multiple `<aside>` | Each must have a unique `aria-label` (e.g., "Sidebar", "Related articles"). |
| `<header>` / `<footer>` scoping | When direct children of `<body>`, they are page-level landmarks. When nested inside `<article>` or `<section>`, they scope to that parent (not page-level landmarks). |
| Landmark nesting | `<nav>` inside `<aside>` is valid — both landmarks are announced. |
| Sidebar pattern | `<aside aria-label="Sidebar">` → `<nav aria-label="Sidebar navigation">` inside it. Two distinct landmarks. |

---

## Section G — ARIA Role Redundancy Rules

**Never add a redundant `role` that matches the element's implicit role:**

| Element | Implicit role | Redundant (don't add) |
|---|---|---|
| `<button>` | `button` | `role="button"` |
| `<a href>` | `link` | `role="link"` |
| `<nav>` | `navigation` | `role="navigation"` |
| `<main>` | `main` | `role="main"` |
| `<aside>` | `complementary` | `role="complementary"` |
| `<header>` (page-level) | `banner` | `role="banner"` |
| `<footer>` (page-level) | `contentinfo` | `role="contentinfo"` |
| `<ul>` / `<ol>` | `list` | `role="list"` |
| `<li>` | `listitem` | `role="listitem"` |
| `<table>` | `table` | `role="table"` |
| `<input type="checkbox">` | `checkbox` | `role="checkbox"` |
| `<input type="radio">` | `radio` | `role="radio"` |
| `<select>` | `combobox` / `listbox` | `role="combobox"` |
| `<hr>` | `separator` | — (keep explicit `role="separator"` for clarity with `aria-orientation`) |

**When to add `role`:**
- The element has no native role: `<div role="dialog">`, `<div role="alert">`, `<button role="switch">`
- You are overriding the default semantic: `<li role="treeitem">` (only inside a `role="tree"` container)
- Custom widget patterns: `<div role="tablist">`, `<button role="tab">`, `<div role="tabpanel">`

**Tree pattern rule:** `role="treeitem"` is only valid inside a `role="tree"` container. A `role="group"` on `<ul>` overwrites the native `list` role. Never use tree roles for flat navigation lists — use plain `<ul>` + `<li>`.

---

## Quick Lookup — Geeklego Components

| Component | Level | Semantic Element | Role (if needed) |
|---|---|---|---|
| Button | L1 Atom | `<button>` | — (native) |
| Input | L1 Atom | `<input>` | — (native) |
| Textarea | L1 Atom | `<textarea>` | — (native) |
| Checkbox | L1 Atom | `<input type="checkbox">` | — (native) |
| Radio | L1 Atom | `<input type="radio">` | — (native) |
| Switch / Toggle | L1 Atom | `<button>` | `role="switch"` |
| Badge | L1 Atom | `<span>` | — |
| Tag / Chip | L1 Atom | `<span>` | — (removable: close button is `<button>`) |
| Avatar | L1 Atom | `<span>` | `role="img"` (non-image variants) |
| Spinner | L1 Atom | `<div>` | `role="status"` |
| ProgressBar | L1 Atom | `<div>` | `role="progressbar"` |
| Divider | L1 Atom | `<hr>` | `role="separator"` (explicit for `aria-orientation`) |
| Label | L1 Atom | `<label>` | — (native) |
| NavItem | L1 Atom | `<li>` containing `<a>` or `<button>` | — (native list semantics) |
| BreadcrumbItem | L1 Atom | `<li>` containing `<a>` or `<span>` | — |
| Card | L2 Molecule | `<div>` | — |
| SearchBar | L2 Molecule | `<div>` containing `<input>` | — |
| FormField | L2 Molecule | `<div>` containing `<label>` + control | — |
| Pagination | L2 Molecule | `<nav aria-label="Pagination">` | — |
| Breadcrumb | L2 Molecule | `<nav aria-label="Breadcrumb">` + `<ol>` | — |
| Tooltip | L2 Molecule | `<div>` | `role="tooltip"` |
| Navbar | L2 Molecule | `<nav aria-label="...">` | — |
| Header | L3 Organism | `<header>` | — (page-level landmark) |
| Footer | L3 Organism | `<footer>` | — (page-level landmark) |
| Sidebar | L3 Organism | `<aside>` containing `<nav>` | — |
| Modal | L3 Organism | `<dialog>` or `<div role="dialog">` | `role="dialog"`, `aria-modal="true"` |
| Accordion | L3 Organism | `<div>` with `<button>` triggers + `<div>` panels | — (disclosure pattern) |
| Tabs | L3 Organism | `<div role="tablist">` + `<button role="tab">` + `<div role="tabpanel">` | Composite widget |
| DataTable | L3 Organism | `<table>` + `<thead>` + `<tbody>` | — (native table) |
| HeroSection | L3 Organism | `<section aria-label="...">` | — |
| DashboardLayout | L4 Template | `<main>` wrapping page content | — |
| AuthLayout | L4 Template | `<main>` wrapping auth form | — |
| LandingLayout | L4 Template | `<main>` wrapping page sections | — |
