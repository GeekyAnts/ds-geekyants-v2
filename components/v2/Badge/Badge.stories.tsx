import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Check } from "lucide-react";
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
  args: { children: "Badge", variant: "default" },
};

/* ── Core variants — standard ShadCN semantics only ─────────────────────────── */
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

/* ── With icon ──────────────────────────────────────────────────────────────── */
export const WithIcon: Story = {
  render: () => (
    <Badge variant="secondary">
      <Check />
      Verified
    </Badge>
  ),
};

/* ── asChild — badge rendered as a link via Radix Slot ───────────────────────── */
export const AsChildLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="#top">Linkable badge</a>
    </Badge>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
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
          'Same badges under a dark theme. The wrapper sets both data-theme="dark" and .dark; only Tier-2 semantic vars are overridden.',
      },
    },
  },
};
