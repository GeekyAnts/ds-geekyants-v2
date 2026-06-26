import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Label } from "./Label";
import { Input } from "../Input/Input";

const meta: Meta<typeof Label> = {
  title: "v2/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Label>;

/* ── Default — a standalone label ────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <Label htmlFor="email">Email address</Label>,
};

/* ── Associated with a control — clicking the label focuses the input ─────────── */
export const WithInput: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email-2">Email address</Label>
      <Input id="email-2" type="email" placeholder="you@example.com" />
    </div>
  ),
};

/* ── Peer-disabled — label dims when its peer control is disabled ─────────────── */
export const PeerDisabled: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Input id="email-3" type="email" placeholder="you@example.com" disabled className="peer" />
      <Label htmlFor="email-3">This label dims with its disabled peer</Label>
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ─────────── */
export const DarkMode: Story = {
  render: (): ReactElement => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground"
    >
      <div className="grid w-72 gap-2">
        <Label htmlFor="email-dark">Email address</Label>
        <Input id="email-dark" type="email" placeholder="you@example.com" />
      </div>
    </div>
  ),
};
