import { useState } from "react";
import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Calculator,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  Smile,
  User,
} from "lucide-react";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Button } from "../Button/Button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  useCommandPalette,
} from "./CommandPalette";

const meta: Meta<typeof CommandDialog> = {
  title: "v2/CommandPalette",
  component: CommandDialog,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CommandDialog>;

/* A small kbd hint, styled with semantic utilities. */
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="ms-auto text-xs tracking-widest text-muted-foreground">
      {children}
    </kbd>
  );
}

/* The shared palette body — reused across stories. */
function PaletteBody() {
  return (
    <>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <Calendar />
            <span>Open calendar</span>
          </CommandItem>
          <CommandItem value="emoji">
            <Smile />
            <span>Search emoji</span>
          </CommandItem>
          <CommandItem value="calculator" disabled>
            <Calculator />
            <span>Calculator (unavailable)</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <User />
            <span>Profile</span>
            <Kbd>⌘P</Kbd>
          </CommandItem>
          <CommandItem value="billing">
            <CreditCard />
            <span>Billing</span>
            <Kbd>⌘B</Kbd>
          </CommandItem>
          <CommandItem value="settings">
            <Settings />
            <span>Settings</span>
            <Kbd>⌘S</Kbd>
          </CommandItem>
          <CommandItem value="docs">
            <FileText />
            <span>Documentation</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

/* ── Default — toggle with the global Cmd+K / Ctrl+K hotkey ─────────────────── */
export const Default: Story = {
  render: () => {
    // useCommandPalette wires the global Cmd+K / Ctrl+K listener for us.
    const { open, setOpen } = useCommandPalette();
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-foreground">
            ⌘ K
          </kbd>{" "}
          (or click) to open the palette.
        </p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <PaletteBody />
        </CommandDialog>
      </div>
    );
  },
};

/* ── Controlled — plain open state with an explicit trigger button ──────────── */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <PaletteBody />
        </CommandDialog>
      </>
    );
  },
};

/* ── Empty state — search that matches nothing shows CommandEmpty ───────────── */
export const EmptyState: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Try typing 'zzzzz'…" />
          <CommandList>
            <CommandEmpty>No matching commands.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem value="new-file">New file</CommandItem>
              <CommandItem value="new-window">New window</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

/* ── Dark theme — the Dialog/Command surface is portalled to <body>, so flag
   both data-theme="dark" and .dark on the documentElement so the portalled
   palette re-themes from the same Tier-2 semantic overrides. ───────────────── */
export const DarkMode: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <PaletteBody />
        </CommandDialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Dialog + Command surface is portalled to <body>, so this story also sets data-theme="dark" and .dark on the documentElement (decorator) so the portalled palette re-themes from the same Tier-2 semantic overrides.',
      },
    },
  },
  decorators: [
    (StoryFn: () => ReactElement) => {
      const root = document.documentElement;
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      return <StoryFn />;
    },
  ],
};
