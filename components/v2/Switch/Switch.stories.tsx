import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Switch } from "./Switch";
import { Label } from "../Label/Label";

const meta: Meta<typeof Switch> = {
  title: "v2/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: { disabled: { control: "boolean" } },
};
export default meta;
type Story = StoryObj<typeof Switch>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { "aria-label": "Airplane mode" },
};

/* ── With label ────────────────────────────────────────────────────────────── */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
};

/* ── States — off / on / disabled ───────────────────────────────────────────── */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch id="st1" />
        <Label htmlFor="st1">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="st2" defaultChecked />
        <Label htmlFor="st2">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="st3" disabled />
        <Label htmlFor="st3">Disabled off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="st4" disabled defaultChecked />
        <Label htmlFor="st4">Disabled on</Label>
      </div>
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <div className="flex items-center gap-6">
        <Switch aria-label="Off" />
        <Switch defaultChecked aria-label="On" />
        <Switch disabled aria-label="Disabled" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Switches under a dark theme. The wrapper sets both data-theme="dark" and .dark; the track (primary / input) and the thumb (background) re-theme from Tier-2 semantics.',
      },
    },
  },
};
