import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "v2/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "gamified",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { children: "Get started", variant: "default", size: "md" },
};

/* ── Core variants — standard ShadCN semantics only ─────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        +
      </Button>
    </div>
  ),
};

/* ── Custom variant (the --ext-* canary) ────────────────────────────────────── */
export const Gamified: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="gamified">Claim reward</Button>
      <Button variant="gamified" size="lg">
        Level up
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom variant styled exclusively from namespaced --ext-button-gamified-* tokens — no core semantic utilities. Proves brand variants stay contained.",
      },
    },
  },
};

/* ── Disabled ─────────────────────────────────────────────────────────────────*/
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Default</Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
      <Button variant="gamified" disabled>
        Gamified
      </Button>
    </div>
  ),
};

/* ── asChild — link rendered with button styling via Radix Slot ─────────────── */
export const AsChildLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#top">I am an anchor</a>
    </Button>
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
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="gamified">Claim reward</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same components under a dark theme. The dark wrapper sets both data-theme="dark" and .dark; only Tier-2 semantic vars are overridden — components and primitives are untouched.',
      },
    },
  },
};
