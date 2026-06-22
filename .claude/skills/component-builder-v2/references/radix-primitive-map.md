# Radix primitive map — "Does Radix already provide this?"

The single most important v2 decision. Before hand-rolling any interactive component, check this table. If Radix provides the primitive, **build on it** — you inherit the focus trap, escape-to-dismiss, click-outside, roving tabindex / `aria-activedescendant`, portal rendering, and full ARIA wiring for free. Reimplementing those by hand is exactly what v2 deletes.

Install per-component when you reach it (`npm install @radix-ui/react-<name>`), not all up front — this is a deliberately lean throwaway-friendly repo. (Use npm — it's what's wired here, despite pnpm appearing in `engines`.)

## Lookup table

| You're building… | Use Radix primitive | Package | Radix gives you (don't re-roll) |
|---|---|---|---|
| Modal / Dialog | `Dialog` | `@radix-ui/react-dialog` | Focus trap, escape dismiss, scroll lock, portal, `aria-modal`, labelled/described wiring |
| Confirmation prompt | `AlertDialog` | `@radix-ui/react-alert-dialog` | Same as Dialog + required action focus, role=`alertdialog` |
| Popover / floating panel | `Popover` | `@radix-ui/react-popover` | Positioning, click-outside, escape, portal, focus management |
| Tooltip | `Tooltip` | `@radix-ui/react-tooltip` | Hover/focus delay, positioning, `aria-describedby`, dismiss |
| Dropdown menu / context menu | `DropdownMenu` | `@radix-ui/react-dropdown-menu` | Roving tabindex, typeahead, submenus, escape, `role=menu` |
| Tabs | `Tabs` | `@radix-ui/react-tabs` | Arrow-key nav, `aria-selected`, `aria-controls`, roving tabindex |
| Accordion / disclosure | `Accordion` / `Collapsible` | `@radix-ui/react-accordion` / `-collapsible` | `aria-expanded`, `aria-controls`, single/multi open, animation hooks |
| Select (custom-styled) | `Select` | `@radix-ui/react-select` | Listbox, typeahead, keyboard, `aria-activedescendant`, portal |
| Combobox / autocomplete | `Popover` + `cmdk` | `@radix-ui/react-popover` + `cmdk` | (ShadCN's Combobox recipe) filtered list, keyboard, `aria-activedescendant`. **Already shipped — read `components/v2/Combobox/` + `Command/` instead of rebuilding from scratch.** |
| Checkbox | `Checkbox` | `@radix-ui/react-checkbox` | Indeterminate state, `role`, keyboard, form integration |
| Radio group | `RadioGroup` | `@radix-ui/react-radio-group` | Roving tabindex, arrow-key nav, `aria-checked` |
| Switch / toggle | `Switch` | `@radix-ui/react-switch` | `role=switch`, keyboard, `aria-checked` |
| Toggle / toggle group | `Toggle` / `ToggleGroup` | `@radix-ui/react-toggle` / `-toggle-group` | Pressed state, roving tabindex |
| Slider | `Slider` | `@radix-ui/react-slider` | Keyboard, `aria-valuenow/min/max`, multi-thumb |
| Progress bar | `Progress` | `@radix-ui/react-progress` | `role=progressbar`, value wiring |
| Avatar (with fallback) | `Avatar` | `@radix-ui/react-avatar` | Image load/fallback state machine |
| Scrollable region | `ScrollArea` | `@radix-ui/react-scroll-area` | Custom scrollbar, keyboard scroll |
| Separator / divider | `Separator` | `@radix-ui/react-separator` | `role=separator`, orientation |
| Toast / notification | `Toast` | `@radix-ui/react-toast` | Live region, swipe/timeout dismiss, queue |
| Polymorphic `asChild` | `Slot` | `@radix-ui/react-slot` | Merge props onto child (already installed) |

## When Radix does NOT apply

Some components are pure presentation with no a11y/keyboard surface — build them by hand with `cva` + `cn` + `forwardRef`, no Radix needed:

- **Button** (the reference) — a native `<button>` + `Slot` for `asChild`. No Radix behavioral primitive.
- **Badge, Chip, Tag, Card, Skeleton, Spinner, Divider-as-decoration, Heading, Label, layout primitives (Stack)** — static; `cva` + `cn` only.
- **Anything that is just styled markup with no focus/keyboard/portal/ARIA-state needs.**

Rule of thumb: **if it traps focus, opens a layer, navigates with arrow keys, manages `aria-*` state, or portals — reach for Radix. If it's styled markup — hand-roll with `cva`/`cn`.**

## How to build on a Radix primitive

Wrap the Radix parts as named sub-component exports, styling each with `cn()` + semantic utilities. You add the *look* (semantic classes); Radix owns the *behavior*. Never override Radix's keyboard/focus behavior — restyle, don't rebuild. See `composition-example.md` for the full shape.
