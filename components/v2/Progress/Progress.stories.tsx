import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "v2/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

/* ── Default ─────────────────────────────────────────────────────────────────── */
export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
};

/* ── Across the range ────────────────────────────────────────────────────────── */
export const Steps: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {[0, 25, 50, 75, 100].map((v) => (
        <Progress key={v} value={v} />
      ))}
    </div>
  ),
};

/* ── Indeterminate — value omitted (data-state="indeterminate") ──────────────── */
export const Indeterminate: Story = {
  render: () => (
    <div className="w-80">
      <Progress aria-label="Loading" />
    </div>
  ),
};

/* A real component so hooks are valid (render functions are not components). */
function AnimatedProgress() {
  const [value, setValue] = useState(13);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 11)), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-80">
      <Progress value={value} />
    </div>
  );
}

/* ── Animated — a live-updating loader ───────────────────────────────────────── */
export const Animated: Story = {
  render: () => <AnimatedProgress />,
};

/* ── Custom size via className ────────────────────────────────────────────────── */
export const CustomSize: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Progress value={40} className="h-1" />
      <Progress value={40} className="h-4" />
    </div>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <div className="flex w-80 flex-col gap-4">
        <Progress value={30} />
        <Progress value={70} />
        <Progress aria-label="Loading" />
      </div>
    </div>
  ),
};
