import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "v2/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { children: "Active", variant: "default" },
};

/* ── Core variants — standard ShadCN semantics only ─────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  ),
};

/* ── In context — tagging statuses on a card ────────────────────────────────── */
export const OnACard: Story = {
  render: () => (
    <div className="w-72 rounded-lg border border-border bg-card p-4 text-card-foreground">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Deploy pipeline</h3>
        <Badge variant="default">Active</Badge>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Last run 3 minutes ago.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The intended use: a small pill tagging a status on a card.",
      },
    },
  },
};

/* ── asChild — status badge that also links, via Radix Slot ─────────────────── */
export const AsChildLink: Story = {
  render: () => (
    <Badge asChild variant="outline">
      <a href="#top">View details</a>
    </Badge>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">Active</Badge>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="outline">Archived</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same badges under a dark theme. The dark wrapper sets both data-theme="dark" and .dark; only Tier-2 semantic vars are overridden — components and primitives are untouched.',
      },
    },
  },
};
