import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./Command";
import { Calendar, Settings, Smile, User } from "lucide-react";

const meta: Meta<typeof Command> = {
  title: "v2/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Command>;

/* ── Default — a bordered, filterable command list ───────────────────────────── */
export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile />
            Search emoji
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            Profile
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/* ── Empty state — cmdk renders CommandEmpty when nothing matches the query ───── */
export const EmptyState: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Try searching 'xyz'…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search emoji</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "cmdk owns the filtering — type a query that matches nothing and the CommandEmpty fallback renders automatically.",
      },
    },
  },
};

/* ── Disabled items — data-disabled is mapped to a muted, non-interactive look ── */
export const WithDisabled: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Available action</CommandItem>
          <CommandItem disabled>Disabled action</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ─────────── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Command className="w-80 rounded-lg border border-border shadow-md">
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              Calendar
            </CommandItem>
            <CommandItem>
              <Smile />
              Search emoji
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Settings />
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
