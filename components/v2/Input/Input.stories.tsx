import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "v2/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { placeholder: "you@example.com", variant: "default", inputSize: "md" },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
};

/* ── Variants — standard ShadCN semantics only ──────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input variant="default" placeholder="Default" defaultValue="Looks good" />
      <Input variant="error" placeholder="Error" defaultValue="Invalid email" />
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  ),
};

/* ── Types ──────────────────────────────────────────────────────────────────── */
export const Types: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" defaultValue="secret" />
      <Input type="number" placeholder="Quantity" />
      <Input type="search" placeholder="Search…" />
      <Input type="file" />
    </div>
  ),
};

/* ── Disabled / read-only ─────────────────────────────────────────────────────*/
export const Disabled: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="Disabled with value" disabled />
      <Input defaultValue="Read-only value" readOnly />
    </div>
  ),
};

/* ── With a label (composition) ───────────────────────────────────────────────*/
export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label htmlFor="email" className="text-sm font-medium text-foreground">
        Email
      </label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">
        We'll never share your email.
      </p>
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground"
    >
      <div className="flex w-80 flex-col gap-3">
        <Input variant="default" placeholder="Default" />
        <Input variant="error" defaultValue="Invalid email" />
        <Input placeholder="Disabled" disabled />
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
