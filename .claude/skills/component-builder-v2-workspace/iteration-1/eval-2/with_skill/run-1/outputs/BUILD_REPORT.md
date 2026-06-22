# BUILD REPORT — CommandPalette (Cmd+K)

## What was requested
A VS Code / Linear-style command palette: pops open, type to filter a list of
actions, navigate results with arrow keys, run with Enter.

## Files created (in this outputs/ dir, flat)
| File | Purpose |
|---|---|
| `CommandPalette.tsx` | Implementation — `CommandPalette` widget + `CommandDialog` shell + `useCommandHotkey`. |
| `CommandPalette.types.ts` | `CommandAction`, `CommandPaletteProps`, `CommandDialogProps`. |
| `CommandPalette.stories.tsx` | Stories: Default, ControlledWithButton, CustomHotkey, CustomEmpty, DarkMode. |
| `README.md` | Compound + non-obvious global-keyboard behavior → README warranted (per skill Phase 2). |
| `INSTALL_NOTES.txt` | Install status / exact command. |
| `BUILD_REPORT.md` | This file. |

No `*-variants.ts` was written — this is a compound on shipped primitives with
no enumerated `cva` variants (same as Dialog). The skill explicitly allows
skipping the variants file in that case.

## Did I reuse the existing components? YES — this is a pure composition.
I **read** all the relevant shipped files before writing anything:
- `components/v2/Command/Command.tsx` + `.types.ts`
- `components/v2/Combobox/Combobox.tsx` + `.types.ts` + `.stories.tsx`
- `components/v2/Dialog/Dialog.tsx` + `.types.ts`
- `components/v2/Button/Button.tsx`/`.stories.tsx`, `components/v2/lib/cn.ts`
- both skill references (`radix-primitive-map.md`, `composition-example.md`)

I **composed** them rather than rebuilding:
- **`Command` (cmdk)** — imported `Command`, `CommandInput`, `CommandList`,
  `CommandEmpty`, `CommandGroup`, `CommandItem` directly. cmdk owns the
  **type-to-filter and arrow-key navigation** the user asked for, plus
  `aria-activedescendant`/`role`/`aria-selected`. **None of it was rebuilt.**
- **`Dialog` (Radix)** — imported `Dialog` + `DialogContent` for the pop-open
  modal. Radix owns the focus trap, Escape-to-dismiss, click-outside, scroll
  lock, and portal. **None of it was rebuilt.**

The Combobox is the in-repo precedent for "Popover + Command"; the command
palette is the sibling recipe "Dialog + Command" (ShadCN's `CommandDialog`). I
followed the same wiring style as Combobox (controlled/uncontrolled state,
`onSelect` closing the layer).

### What I wrote from scratch (the only genuinely-new surface)
1. **`useCommandHotkey`** — the global Cmd/Ctrl+K (configurable) `keydown`
   listener that toggles open. No Radix/cmdk primitive provides a *global* page
   hotkey, so this is legitimately new. It is ~12 lines and adds/removes one
   `document` listener.
2. **Action model + grouping** — `CommandAction` interface and a `useMemo` that
   buckets actions by `group` (first-seen order preserved), mapping each row's
   `onSelect` to `action.run()` then closing.
3. **`CommandDialog`** — a thin shell (cmdk `Command` inside `DialogContent`)
   with `sr-only` Radix `Title`/`Description` so a11y labelling is wired without
   visible chrome.

I did **not** hand-roll filtering, arrow-key nav, focus trap, escape,
click-outside, or aria-activedescendant — all inherited (Radix-first rule honored).

## Radix / library primitives involved
- `@radix-ui/react-dialog` (via the shipped `Dialog`) — modal behavior.
- `@radix-ui/react-dialog`'s `Title`/`Description` used directly for `sr-only` labels.
- `cmdk` (via the shipped `Command`) — the filterable arrow-key listbox.
- `lucide-react` — icons (stories only).
- `cn()` from `components/v2/lib/cn.ts` — class merge.

## Tokens
**Zero token work.** No new core semantics, no `--ext-*` block, no component
tokens. Styling is 100% inherited standard semantic utilities from `Command`
and `Dialog` (`bg-popover`, `text-muted-foreground`, `border-border`, etc.).
The one bit of local styling — the shortcut `<kbd>` — uses `text-muted-foreground`.

## Install command
**Nothing to install** — `cmdk@^1.1.1`, `@radix-ui/react-dialog@^1.1.17`, and
`lucide-react` are all already in `package.json`. If they were absent, the exact
command (npm is what's wired) would be:
`npm install cmdk @radix-ui/react-dialog`

## Verification
Files were copied into a temporary `components/v2/CommandPalette/` dir, verified,
then **deleted** (the real `components/v2/` is untouched, as required):
- `npx tsc --noEmit` — **no CommandPalette errors**; total error count stayed at
  the known pre-existing baseline (18, all storybook-only per repo memory) → no
  regression.
- `npx eslint components/v2/CommandPalette/` — **0 errors, 0 warnings** (v2
  import discipline passes; relative imports only).
- Verified against the real cmdk type defs that `CommandItem.keywords` and
  `CommandGroup.heading` (+ the heading-or-value requirement) are valid.

## Key decisions
1. **Dialog, not Popover.** A command palette is a centered modal overlay (VS
   Code / Linear), so it pops open via `Dialog`. Combobox uses `Popover` because
   it's anchored to a trigger; this is the modal sibling.
2. **Two exports.** `CommandPalette` (batteries-included: pass `actions`) for the
   common case, and `CommandDialog` (bare shell) for full control — mirrors
   ShadCN.
3. **Controlled + uncontrolled** open state (matches Combobox's pattern), so it
   can be driven by the ⌘K hotkey, a button, or app state simultaneously.
4. **Configurable hotkey** (`hotkey`: `true`=⌘K, a letter=⌘/Ctrl+letter,
   `false`=off) since multiple palettes or a custom binding are common.
5. **`showClose={false}` + `p-0`** on `DialogContent` so the palette is pure
   input+list with no close-X chrome, matching the reference UX.
6. **README written** (allowed by the skill for compounds with non-obvious
   keyboard behavior) to document the ⌘K binding and the keyboard table.

## Sandbox note
Per the task rules, files are written flat in this `outputs/` dir. In the real
repo they belong at `components/v2/CommandPalette/` (the imports
`../Dialog/Dialog`, `../Command/Command`, `../lib/cn`, and the stories'
`../../../design-system/v2/index.css` are written for that real location, which
is where they were temporarily placed and verified).
