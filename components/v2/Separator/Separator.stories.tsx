import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "v2/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Separator>;

/* ── Default — horizontal ───────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">GeekLego</h4>
        <p className="text-sm text-muted-foreground">
          A design-system-first component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Tokens</span>
      </div>
    </div>
  ),
};

/* ── Horizontal ─────────────────────────────────────────────────────────────── */
export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4 text-sm">
      <p>Above the line</p>
      <Separator />
      <p>Below the line</p>
    </div>
  ),
};

/* ── Vertical ───────────────────────────────────────────────────────────────── */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>One</span>
      <Separator orientation="vertical" />
      <span>Two</span>
      <Separator orientation="vertical" />
      <span>Three</span>
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <div className="space-y-4 text-sm">
        <p>Above the line</p>
        <Separator />
        <p>Below the line</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A separator under a dark theme. The wrapper sets both data-theme="dark" and .dark; the line colour re-themes from the Tier-2 --border semantic.',
      },
    },
  },
};
