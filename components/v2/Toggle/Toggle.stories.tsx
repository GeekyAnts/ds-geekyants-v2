import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Underline } from "lucide-react";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "v2/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { variant: "default", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

/* ── Default ─────────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold />
    </Toggle>
  ),
};

/* ── With text ───────────────────────────────────────────────────────────────── */
export const WithText: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle italic" {...args}>
      <Italic />
      Italic
    </Toggle>
  ),
};

/* ── Variants ────────────────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle variant="default" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <Italic />
      </Toggle>
    </div>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle size="md" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle size="lg" aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  ),
};

/* ── Pressed (defaultPressed) + disabled ─────────────────────────────────────── */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle defaultPressed aria-label="Bold (on)">
        <Bold />
      </Toggle>
      <Toggle disabled aria-label="Italic (disabled)">
        <Italic />
      </Toggle>
    </div>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <div className="flex items-center gap-3">
        <Toggle defaultPressed aria-label="Bold">
          <Bold />
        </Toggle>
        <Toggle variant="outline" aria-label="Italic">
          <Italic />
        </Toggle>
      </div>
    </div>
  ),
};
