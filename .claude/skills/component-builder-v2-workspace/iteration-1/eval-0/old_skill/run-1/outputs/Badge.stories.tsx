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

/* ── Variants — standard ShadCN semantics only ──────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

/* ── In context — tagging statuses on a card ────────────────────────────────── */
export const StatusTagsOnCard: Story = {
  render: () => (
    <div className="max-w-sm rounded-lg border border-border bg-card p-4 text-card-foreground">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Onboarding flow</h3>
        <Badge variant="default">Live</Badge>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        Multi-step signup with email verification.
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">Frontend</Badge>
        <Badge variant="secondary">QA</Badge>
        <Badge variant="destructive">Blocked</Badge>
        <Badge variant="outline">v2</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The primary use case: small pill-shaped labels tagging statuses on a card.",
      },
    },
  },
};

/* ── asChild — badge rendered as an anchor via Radix Slot ────────────────────── */
export const AsChildLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="#top">Linked badge</a>
    </Badge>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "asChild delegates rendering to the child element (here an <a>) while keeping the badge styling.",
      },
    },
  },
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
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
