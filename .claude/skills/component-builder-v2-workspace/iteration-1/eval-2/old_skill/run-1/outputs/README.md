# CommandPalette (v2)

A VS Code / Linear-style **Cmd+K command palette**: a modal that pops open, lets
you type to filter a list of actions, and navigate results with arrow keys.

It is a **composition of existing v2 components**, not a new primitive:

| Concern | Provided by | Reused from |
|---|---|---|
| Pop-open layer: focus trap, escape-to-dismiss, click-outside, scroll lock, portal, `aria-modal` | `@radix-ui/react-dialog` | `components/v2/Dialog` |
| Listbox engine: type-to-filter, **arrow-key navigation**, `aria-activedescendant` / `aria-selected`, empty state | `cmdk` | `components/v2/Command` |
| Global **Cmd+K / Ctrl+K** hotkey to open | `useCommandPalette` (this file) | new — the only hand-rolled bit |

Filtering and arrow-key navigation are **not reimplemented** — they come from
cmdk via the reused `Command`. The focus trap / escape / portal come from Radix
via the reused `Dialog`. The only new code is the `CommandDialog` wrapper (the
ShadCN "CommandDialog" recipe: Command nested in a Dialog) and the global hotkey
hook, which Radix has no primitive for.

## Usage

```tsx
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  useCommandPalette,
} from "../CommandPalette/CommandPalette";

function App() {
  // global Cmd+K / Ctrl+K listener; returns controlled open state.
  const { open, setOpen } = useCommandPalette();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem value="new-file" onSelect={() => { /* … */ setOpen(false); }}>
            New file
          </CommandItem>
          <CommandItem value="settings" onSelect={() => setOpen(false)}>
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
```

## Keyboard behavior

| Key | Behavior | Owner |
|---|---|---|
| **Cmd+K / Ctrl+K** | Toggle the palette open/closed | `useCommandPalette` (this file) |
| Type | Filter the action list | cmdk |
| **Up / Down arrows** | Move the active item | cmdk |
| Enter | Run the active item (`onSelect`) | cmdk |
| Escape | Close the palette | Radix Dialog |
| Click outside | Close the palette | Radix Dialog |
| Tab | Focus stays trapped inside | Radix Dialog |

## API

### `<CommandDialog>`
Extends styled `DialogContent` props. Notable additions:

- `open?`, `onOpenChange?` — controlled open state (hoisted to `Dialog.Root`).
- `title?`, `description?` — visually-hidden accessible labels for the surface
  (default "Command palette" / "Search for a command to run."). They wire
  `aria-labelledby` / `aria-describedby` onto the Dialog content so the chromeless
  palette is still announced.
- `commandProps?` — props forwarded to the inner cmdk `Command` (e.g. `filter`,
  `shouldFilter`, `loop`).
- `children` — the palette body (`CommandInput` + `CommandList` + groups/items).

### `useCommandPalette(options?)`
Returns `{ open, setOpen }`. Options: `open`, `onOpenChange` (to control it
externally), `enabled` (default `true`), `key` (default `"k"`).

## Tokens

No new tokens. Styling uses only **standard semantic utilities** inherited from
the reused Dialog/Command parts (`bg-popover`, `text-popover-foreground`,
`border-border`, `data-[selected=true]:bg-accent`, `text-muted-foreground`).
No `--ext-*` variant, no component-token tier.

## Files

```
CommandPalette/
├── CommandPalette.tsx          ← CommandDialog wrapper + useCommandPalette hook
├── CommandPalette.types.ts     ← prop types (extend Dialog/Command part types)
├── CommandPalette.stories.tsx  ← stories (Default w/ hotkey, Controlled, Empty, DarkMode)
└── README.md                   ← this file
```

No `*-variants.ts`: the palette has no enumerated `cva` variants — it is pure
composition over reused parts.
