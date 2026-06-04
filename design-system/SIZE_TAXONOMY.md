# Size Taxonomy

Defines the 5 standard size scales for Geeklego components and the rule for selecting one.

## The 5 Scales

| Scale | Values | Rule | Current Components |
|-------|--------|------|--------------------|
| **Micro** | `sm, md` | Decorative/status indicators where even 3 sizes would be excessive. Use when a component is inherently small (badges, labels, tags) or is a compact notification (skip link, alert banner, toast). | Badge, Label, Tag, AlertBanner, Toast, FormField |
| **Standard** | `sm, md, lg` | **Default scale.** Use for interactive controls, form inputs, navigation elements, and content blocks that need a small/medium/large differentiation for different contexts. When in doubt, use this scale. | Input, Select, Textarea, Checkbox, Radio, Toggle, Switch, Slider, Rating, Link, List, Item, Quote, Chip, ColorSwatch, EmptyState, TreeItem, BreadcrumbItem, ThemeSwitcher, SkeletonText, Combobox, SearchBar, FileUpload, StatCard, ProductCard, TreeView, Stepper, Pagination, Navbar, Accordion, Tabs, ColorPicker, DataTable, Footer, SidebarMenuButton, InputGroup, NumberInput, DateInput, Datepicker, Breadcrumb, FieldsetGap, FormGap, SegmentedControl |
| **Extended** | `xs, sm, md, lg, xl` | High-prominence interactive elements that may appear in both extremely compact contexts (toolbar, inline) and expansive contexts (hero section, full-page). Use for primary actions, loading indicators, and progress displays. | Button, Spinner, ProgressIndicator, ProgressBar |
| **Avatar** | `xs, sm, md, lg, xl, 2xl` | Elements tied to people/photos. Use when the component represents a person, face, or circular visual that needs the full spectrum from tiny inline (comment avatars) to hero/landing page size (profile hero). | Avatar, SkeletonCircle |
| **Overlay** | `sm, md, lg, xl, full` | Container overlays measured by screen percentage. Use for modal dialogs, drawers, and other overlay containers where the largest size is "fill the entire screen." | Modal, Drawer, Carousel |

## Selection Rule

When adding a `size` prop to a new component, use this decision tree:

```
Is the component a person/photo element (Avatar, SkeletonCircle)?
  → Use Avatar scale (xs → 2xl)

Is the component a container overlay or full-screen toggle?
  → Use Overlay scale (sm → full)

Is the component a primary action, loading indicator, or progress display?
  → Use Extended scale (xs → xl)

Is the component a decorative/status element (badge, label, tag, notification)?
  → Use Micro scale (sm, md)

Otherwise (interactive controls, form inputs, navigation, content blocks):
  → Use Standard scale (sm, md, lg) — this is the default
```

## CSS Token Pattern

The semantic size tokens live at `--size-component-*` in `geeklego.css`:

| Token | Value |
|---|---|
| `--size-component-xs` | `var(--spacing-6)` — 24px |
| `--size-component-sm` | `var(--spacing-8)` — 32px |
| `--size-component-md` | `var(--spacing-10)` — 40px |
| `--size-component-lg` | `var(--spacing-12)` — 48px |
| `--size-component-xl` | `var(--spacing-14)` — 56px |
| `--size-component-2xl` | `var(--spacing-16)` — 64px |

Component tokens should alias `--size-component-*` (for height/diameter) or `--size-fixed-*` (for custom values like track thickness). Never reference primitives directly.

## Exceptions

Components that genuinely do not fit any of the 5 scales must be documented here with justification:

- **Heading** — uses `h1`–`h5` (semantic heading levels, not visual size)
- **Stack** — uses `gap` values `none, xs, sm, md, lg, xl` (spacing, not sizing)
