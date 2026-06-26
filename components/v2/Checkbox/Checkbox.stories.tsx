import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label/Label";

const meta: Meta<typeof Checkbox> = {
  title: "v2/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: { disabled: { control: "boolean" } },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { "aria-label": "Accept" },
};

/* ── With label ──────────────────────────────────────────────────────────────*/
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

/* ── States — unchecked / checked / indeterminate / disabled ──────────────── */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Checkbox id="s1" />
        <Label htmlFor="s1">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s2" defaultChecked />
        <Label htmlFor="s2">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s3" checked="indeterminate" />
        <Label htmlFor="s3">Mixed</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="s4" disabled />
        <Label htmlFor="s4">Disabled</Label>
      </div>
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <div className="flex items-center gap-6">
        <Checkbox aria-label="Off" />
        <Checkbox defaultChecked aria-label="On" />
        <Checkbox checked="indeterminate" aria-label="Mixed" />
        <Checkbox disabled aria-label="Disabled" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Checkboxes under a dark theme. The wrapper sets both data-theme="dark" and .dark; the input border and checked primary fill re-theme from Tier-2 semantics.',
      },
    },
  },
};
