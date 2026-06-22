# CommandPalette

A Cmd/Ctrl+K **command palette** (VS Code / Linear style): pops open in a modal,
lets the user type to filter a list of actions, navigate results with the arrow
keys, and run one with Enter.

It is a **composition of two already-shipped v2 primitives** — nothing about
filtering, keyboard navigation, focus trapping, or dismissal is re-implemented:

| Concern | Provided by | Notes |
|---|---|---|
| Pop-open modal: focus trap, Escape, scroll lock, portal, `aria-modal` | **`Dialog`** (Radix `@radix-ui/react-dialog`) | via `components/v2/Dialog` |
| Listbox: type-to-filter, ↑/↓ nav, Enter-to-select, `aria-activedescendant` / `role` | **`Command`** (cmdk) | via `components/v2/Command` |
| Global Cmd/Ctrl+K shortcut + action wiring | **this component** | the only genuinely-new surface |

This is the ShadCN `CommandDialog` recipe, restyled onto geeklego's 2-tier
semantics (`bg-popover`, `text-muted-foreground`, `border-border`, …).

## Exports

- `CommandPalette` — batteries-included widget. Pass `actions`; it renders the
  input, groups, items, shortcuts, and empty state, and binds ⌘K by default.
- `CommandDialog` — the bare shell (a cmdk `Command` inside a `Dialog`) if you
  want to hand-author the rows yourself.

## Usage

```tsx
import { CommandPalette } from "@/components/v2/CommandPalette/CommandPalette";
import type { CommandAction } from "@/components/v2/CommandPalette/CommandPalette.types";
import { Plus, Settings } from "lucide-react";

const actions: CommandAction[] = [
  { id: "new", label: "New File", icon: <Plus />, shortcut: "⌘N", group: "Actions", run: () => createFile() },
  { id: "settings", label: "Settings", icon: <Settings />, group: "App", run: () => openSettings() },
];

// Uncontrolled — ⌘K / Ctrl+K opens it automatically:
<CommandPalette actions={actions} />
```

### Controlled (open from your own button too)

```tsx
const [open, setOpen] = useState(false);
<>
  <Button onClick={() => setOpen(true)}>Search…</Button>
  <CommandPalette actions={actions} open={open} onOpenChange={setOpen} />
</>
```

## Props (`CommandPaletteProps`)

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `actions` | `CommandAction[]` | — | Items to list. Bucketed by `action.group` (order preserved). |
| `open` / `onOpenChange` | `boolean` / `(open) => void` | uncontrolled | Controlled open state. Omit both to self-manage. |
| `hotkey` | `boolean \| string` | `true` (⌘/Ctrl+K) | `true`=⌘K, a lowercase letter=⌘/Ctrl+\<letter>, `false`=no global listener. |
| `placeholder` | `string` | `"Type a command or search…"` | Filter input placeholder. |
| `emptyText` | `string` | `"No results found."` | Shown when the filter matches nothing. |
| `title` / `description` | `string` | sensible defaults | Visually-hidden a11y labels for the dialog. |
| `contentProps` | `DialogContentProps` | — | Forwarded to the underlying `DialogContent` (sizing, etc.). |

`CommandAction`: `{ id, label, icon?, shortcut?, keywords?, group?, disabled?, run() }`.
`label` (plus `keywords`) is what cmdk filters against; `run()` fires on select
and the palette closes afterward.

## Keyboard

| Key | Action | Owned by |
|---|---|---|
| ⌘K / Ctrl+K (configurable) | Open/close the palette | this component |
| Typing | Filter actions | cmdk |
| ↑ / ↓ | Move the active item | cmdk |
| Enter | Run the active action | cmdk → `run()` |
| Esc / click-outside | Dismiss | Radix Dialog |

## Notes

- The dialog content is **portalled to `<body>`**, so in dark mode set
  `data-theme="dark"` **and** `.dark` on a real ancestor (or `documentElement`)
  for the portalled surface to re-theme. See the `DarkMode` story.
- No `--ext-*` tokens and no component tokens — styled entirely with standard
  semantic utilities, inherited from `Command` and `Dialog`.
