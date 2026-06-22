# Build Report — CommandPalette (Cmd+K command palette)

## What the user asked for
A VS Code / Linear-style command palette: pops open, type-to-filter a list of
actions, navigate results with arrow keys.

## Files created
All written flat into this `outputs/` directory; source uses relative imports as
if the component lived at `components/v2/CommandPalette/`.

| File | Purpose |
|---|---|
| `CommandPalette.tsx` | `CommandDialog` (Command-in-Dialog) + `useCommandPalette` global-hotkey hook + Command part re-exports |
| `CommandPalette.types.ts` | Prop types extending the reused Dialog/Command part types; `UseCommandPaletteOptions`; a `CommandAction` convenience type |
| `CommandPalette.stories.tsx` | Stories: Default (live Cmd+K hotkey), Controlled, EmptyState, DarkMode |
| `README.md` | Compound-component docs — justified by the non-obvious global-hotkey keyboard behavior |
| `INSTALL_NOTES.txt` | No new install required; exact fallback command noted |
| `BUILD_REPORT.md` | This file |

No `*-variants.ts` — the palette has no enumerated `cva` variants; it is pure
composition. (The skill explicitly allows omitting the variants file when there
are no variants.)

## Did I reuse the existing Command / Combobox components? — YES (the core decision)

I **discovered and read** `components/v2/Command/`, `components/v2/Dialog/`,
`components/v2/Combobox/`, and `components/v2/Popover/` before writing anything,
plus the skill's `radix-primitive-map.md` and `composition-example.md`.

Decomposition (Phase 0 of the skill): a Cmd+K palette = **Command nested inside a
Dialog** — the standard ShadCN "CommandDialog" recipe. Both leaves already exist:

- **`Command` (cmdk) — REUSED verbatim.** It already owns *exactly* the two
  things the user asked for: **type-to-filter** and **arrow-key navigation**,
  plus the `role="listbox"/"option"`, `aria-activedescendant` / `aria-selected`
  active-descendant tracking, and the empty state. I import `Command`,
  `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`,
  `CommandSeparator` from `../Command/Command` and re-export them.
- **`Dialog` (Radix) — REUSED verbatim.** It already owns the **pop-open**
  surface: focus trap, escape-to-dismiss, click-outside, scroll lock, portal,
  and `aria-modal` wiring. I import `Dialog`, `DialogContent`, `DialogTitle`,
  `DialogDescription` from `../Dialog/Dialog`.
- **`Combobox` — read but NOT composed.** It is `Popover` + `Command` (an inline
  filter dropdown), the wrong container for a centered modal palette. But it
  confirmed the exact composition idiom I followed (Command driven by controlled
  open state, `onSelect` closing the layer). The Combobox stories also gave the
  portal-aware DarkMode decorator pattern I reused.

**I did NOT build keyboard-nav or filtering from scratch.** Arrow-key navigation
and type-to-filter are 100% cmdk via the reused `Command`. Focus trap / escape /
click-outside / portal are 100% Radix via the reused `Dialog`. This is precisely
what the skill's Radix-first rule and "build leaves first, compose upward"
discipline call for — nothing in `utils/keyboard` style was re-rolled.

## The only hand-rolled code, and why it's allowed
`useCommandPalette` — a small `useEffect` that listens for **Cmd+K / Ctrl+K** on
`document` and toggles open state. This is *not* an a11y / keyboard-navigation /
focus surface (those all stay with Radix + cmdk); it is a **global open-trigger**,
for which Radix provides no primitive. The `radix-primitive-map.md` has no entry
for "global document hotkey", so hand-rolling this tiny effect is correct, not a
regression. It also returns controlled open state via a local
controllable-state helper (no extra dependency).

## Radix / library primitives involved
- `@radix-ui/react-dialog` — via reused `components/v2/Dialog` (pop-open layer).
- `cmdk` — via reused `components/v2/Command` (filter + arrow-key listbox).
- `@radix-ui/react-slot` — transitively (Dialog/Button `asChild`).
- `lucide-react` — story icons only.

## Install command
**None needed** — `@radix-ui/react-dialog ^1.1.17` and `cmdk ^1.1.1` are already
in `package.json` (required by the reused Dialog and Command). Fallback if they
were absent: `npm install cmdk @radix-ui/react-dialog` (see INSTALL_NOTES.txt).

## Tokens
No token work. Phase 1 was skipped deliberately: the palette consumes only
standard ShadCN semantics inherited from the reused parts (`bg-popover`,
`text-popover-foreground`, `border-border`, `data-[selected=true]:bg-accent`,
`text-muted-foreground`). No new core semantic invented, no `--ext-*` variant,
no component-token tier. `design-system/v2/semantics.css` was read to confirm
those semantics exist; it was not modified (sandbox rule + nothing to add).

## Key decisions
1. **Compose, don't rebuild** — Command-in-Dialog (ShadCN CommandDialog recipe)
   over reimplementing a listbox or modal.
2. **`showClose={false}` + `p-0 gap-0` on `DialogContent`** — a palette is a
   chromeless, edge-to-edge surface (input flush to top, list below), unlike a
   normal padded dialog.
3. **Visually-hidden `DialogTitle`/`DialogDescription` (`sr-only`)** — keeps the
   palette chromeless while still satisfying Radix's required `aria-labelledby` /
   `aria-describedby` wiring (a Dialog without a Title warns and is inaccessible).
4. **Controlled/uncontrolled `useCommandPalette`** — works with or without
   externally supplied `open`/`onOpenChange`; default key is `k`, overridable.
5. **DarkMode story uses the portal-aware decorator** (sets both `data-theme` and
   `.dark` on `documentElement`) because the Dialog/Command surface portals to
   `<body>` — copied from the Combobox story's proven pattern.

## Compliance with v2 hard rules
- ✅ No component-token tier; no primitive referenced directly from a component.
- ✅ `forwardRef` + `displayName` (plain, not `memo(forwardRef)`).
- ✅ `cn()` used for class merging; relative imports only between v2 files.
- ✅ No hand-rolled focus trap / escape / click-outside / roving tabindex / portal
   (all from Radix/cmdk via reused components).
- ✅ Standard semantic utilities only; no hardcoded hex/px, no bare arbitrary
   literals, no inline style for class-able values.
- ✅ DarkMode story sets both `data-theme="dark"` and `.dark`, with `max-w-2xl`.
- ✅ ShadCN never named in shipped code/docs.

## Verification note (sandbox-limited)
Per the test rules I did not place the files under the real `components/v2/` tree,
so I did not run `tsc --noEmit` / Storybook / `npm run lint` / `validate-tokens`
against them (they'd fail to resolve `../Dialog/Dialog` etc. from this sandbox
path). The files are written to compile cleanly once dropped into
`components/v2/CommandPalette/`: imports match the exact named exports of the
reused `Dialog`, `Command`, `Button`, and `lib/cn` files I read; prop types
extend the reused part prop types; no new tokens are required. Token chain is
untouched, so `validate-tokens` would remain green.
