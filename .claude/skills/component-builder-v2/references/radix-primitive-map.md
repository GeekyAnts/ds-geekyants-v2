# Radix primitive map — "Does Radix already provide this?"

The single most important v2 decision. Before hand-rolling any interactive component, check this table. If Radix provides the primitive, **build on it** — you inherit the focus trap, escape-to-dismiss, click-outside, roving tabindex / `aria-activedescendant`, portal rendering, and full ARIA wiring for free. Reimplementing those by hand is exactly what v2 deletes.

Install per-component when you reach it (`pnpm add @radix-ui/react-<name>`), not all up front — this is a deliberately lean throwaway-friendly repo. (**Use pnpm — never `npm install`.** This repo's `node_modules` is a pnpm tree, and `npm install` crashes in npm's dedupe; a `preinstall` guard blocks it. `npm run <script>` still works — only installs must use pnpm.)

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

## When Radix does NOT apply — but a headless library does (category B)

**Radix is not the only headless backbone.** Some components have a real behavior/state surface (form state, drag physics, date math, command filtering) that Radix has **no primitive for** — but ShadCN does not hand-roll these either. It builds them on a purpose-built headless library, then styles the result with semantic utilities exactly as it does Radix parts. **Do not force these into "pure markup" and reinvent the state engine** — that is the #1 way this skill regresses (it's what produced the deleted manual-`error`-prop FormField).

These are still fully 2-tier: the library owns *behavior + state*, you own *styling* (standard semantics, `cva`/`cn`/`forwardRef`, no component-token tier). Same philosophy as Radix — the headless layer just isn't Radix.

| You're building… | Backbone library | Package | Why not Radix |
|---|---|---|---|
| **Form** (validation, field state) | **react-hook-form** | `react-hook-form` | Radix has no form-state engine. ShadCN Form = `FormProvider` + `Controller` + a `useFormField` hook reading RHF's `getFieldState`/`formState`. Compound: `Form`, `FormField` (render-prop over `Controller`), `FormItem`, `FormLabel`, `FormControl` (Radix `Slot`), `FormDescription`, `FormMessage`. **Not** a manual `error`-boolean composer. |
| Combobox / autocomplete / command palette | **cmdk** (+ Radix `Popover`) | `cmdk` + `@radix-ui/react-popover` | No Radix command primitive. **Already shipped — read `components/v2/Combobox/` + `Command/`.** |
| Carousel | **embla-carousel** | `embla-carousel-react` | No Radix carousel; embla owns drag/snap physics. |
| Calendar / Date Picker | **react-day-picker** | `react-day-picker` | No Radix calendar; owns date math + keyboard grid. |
| Drawer / bottom sheet | **vaul** | `vaul` | Radix `Dialog` can't do drag-to-dismiss sheet gestures. |
| Chart | **recharts** | `recharts` | No Radix charting. |
| Toast (ShadCN's newer default) | **sonner** | `sonner` | Alternative to Radix `Toast`; queue + imperative API. |
| Resizable panels | **react-resizable-panels** | `react-resizable-panels` | No Radix primitive; owns panel-size persistence + drag. |

Install per-component when you reach it (`pnpm add <lib>`), same as Radix packages — never up front, never `npm install`.

## When neither applies — pure presentation (category C)

Some components are pure presentation with no a11y/keyboard/state surface — build them by hand with `cva` + `cn` + `forwardRef`, no Radix and no headless lib needed:

- **Button** (the reference) — a native `<button>` + `Slot` for `asChild`. No Radix behavioral primitive.
- **Badge, Chip, Tag, Card, Skeleton, Spinner, Divider-as-decoration, Heading, Label, layout primitives (Stack)** — static; `cva` + `cn` only.
- **Anything that is just styled markup with no focus/keyboard/portal/ARIA-state/data-state needs.**

## The decision — three-way, not two-way

Run these in order; the first match wins:

1. **Does Radix provide the primitive?** (focus trap, opens a layer, arrow-key nav, manages `aria-*` state, portals — see the lookup table above) → **build on Radix.**
2. **Else, does ShadCN use a dedicated headless library for it?** (form state, carousel, calendar, drawer, chart, command-menu, resizable — see the category-B table) → **build on that library**, styled with semantics. Still 2-tier; still no component-token tier.
3. **Else, is it just styled markup?** → **hand-roll with `cva` + `cn` + `forwardRef`.**

The trap to avoid: a component with a real state/behavior surface but **no Radix primitive** is **not** automatically category C. Check category B before hand-rolling — if you find yourself about to reimplement form validation, drag physics, date math, or list filtering, you've missed a backbone library and are building the wrong thing.

## How to build on a Radix primitive

Wrap the Radix parts as named sub-component exports, styling each with `cn()` + semantic utilities. You add the *look* (semantic classes); Radix owns the *behavior*. Never override Radix's keyboard/focus behavior — restyle, don't rebuild. See `composition-example.md` for the full shape.

**Menu submenus must be portalled.** When building a menu primitive (`DropdownMenu`, `ContextMenu`, `Menubar`), the `Content` has `overflow-hidden` and Radix renders `SubContent` inside `Content`'s DOM — so wrap `SubContent` in the matching `*Portal` or it gets clipped by the parent and appears cut off. This is separate from (and in addition to) the root `Content` portal.
