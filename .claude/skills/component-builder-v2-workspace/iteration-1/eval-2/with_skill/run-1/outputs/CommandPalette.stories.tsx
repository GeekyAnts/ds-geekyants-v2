import { useState } from "react";
import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Calculator,
  Calendar,
  CreditCard,
  FileText,
  Moon,
  Plus,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { Button } from "../Button/Button";
import { CommandPalette } from "./CommandPalette";
import type { CommandAction } from "./CommandPalette.types";

/* A logger keeps the stories side-effect-visible without external state. */
const log = (label: string) => () =>
  console.log(`[CommandPalette] ran: ${label}`);

const actions: CommandAction[] = [
  { id: "new-file", label: "New File", icon: <Plus />, shortcut: "⌘N", group: "Actions", run: log("New File") },
  { id: "open", label: "Open File…", icon: <FileText />, shortcut: "⌘O", group: "Actions", run: log("Open File") },
  { id: "calendar", label: "Open Calendar", icon: <Calendar />, group: "Actions", keywords: ["schedule", "agenda"], run: log("Calendar") },
  { id: "calculator", label: "Open Calculator", icon: <Calculator />, group: "Actions", disabled: true, run: log("Calculator") },
  { id: "emoji", label: "Insert Emoji", icon: <Smile />, group: "Actions", run: log("Emoji") },
  { id: "profile", label: "Profile", icon: <User />, shortcut: "⌘P", group: "Settings", run: log("Profile") },
  { id: "billing", label: "Billing", icon: <CreditCard />, shortcut: "⌘B", group: "Settings", run: log("Billing") },
  { id: "theme", label: "Toggle Theme", icon: <Moon />, group: "Settings", keywords: ["dark", "light"], run: log("Theme") },
  { id: "settings", label: "Settings", icon: <Settings />, shortcut: "⌘,", group: "Settings", run: log("Settings") },
];

const meta: Meta<typeof CommandPalette> = {
  title: "v2/CommandPalette",
  component: CommandPalette,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

/* ── Default — press ⌘K / Ctrl+K to open, type to filter, ↑↓ + Enter to run ──── */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <CommandPalette actions={actions} />
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">
          ⌘K
        </kbd>{" "}
        (or <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">Ctrl K</kbd>) to open.
      </p>
    </div>
  ),
};

/* ── Controlled — open from a button as well as the hotkey ───────────────────── */
export const ControlledWithButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <Button onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandPalette actions={actions} open={open} onOpenChange={setOpen} />
        <p className="text-sm text-muted-foreground">
          Open via the button or ⌘K — both drive the same controlled state.
        </p>
      </div>
    );
  },
};

/* ── Custom hotkey — bind ⌘J instead of ⌘K ──────────────────────────────────── */
export const CustomHotkey: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <CommandPalette actions={actions} hotkey="j" />
      <p className="text-sm text-muted-foreground">
        This instance opens with{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">
          ⌘J
        </kbd>
        .
      </p>
    </div>
  ),
};

/* ── Empty state — filter that matches nothing shows emptyText ───────────────── */
export const CustomEmpty: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <CommandPalette
        actions={actions}
        placeholder="Try typing 'zzz'…"
        emptyText="No matching commands."
      />
      <p className="text-sm text-muted-foreground">Press ⌘K, then type “zzz”.</p>
    </div>
  ),
};

/* ── Dark theme — the dialog is portalled, so flag .dark on documentElement ──── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8 text-center"
    >
      <CommandPalette actions={actions} />
      <p className="mt-3 text-sm text-muted-foreground">
        Press ⌘K — the portalled palette surface re-themes from the same Tier-2
        overrides.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The Dialog content is portalled to <body>, so this story also sets data-theme="dark" and .dark on documentElement (decorator) so the portalled palette surface re-themes from the same Tier-2 semantic overrides.',
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
