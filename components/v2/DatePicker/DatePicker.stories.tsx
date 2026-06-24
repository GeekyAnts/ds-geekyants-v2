import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";

const meta: Meta<typeof DatePicker> = {
  title: "v2/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

/* ── Default (uncontrolled) ───────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <DatePicker />,
};

/* ── Pre-selected ─────────────────────────────────────────────────────────── */
export const PreSelected: Story = {
  render: () => <DatePicker defaultValue={new Date(2026, 5, 24)} />,
};

/* ── Controlled (echoes the selected value) ───────────────────────────────── */
function ControlledPicker() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="flex flex-col gap-2">
      <DatePicker value={date} onChange={setDate} />
      <span className="text-sm text-muted-foreground">
        {date ? date.toISOString().slice(0, 10) : "nothing selected"}
      </span>
    </div>
  );
}
export const Controlled: Story = {
  render: () => <ControlledPicker />,
};

/* ── Disabled ─────────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  render: () => <DatePicker disabled defaultValue={new Date(2026, 5, 24)} />,
};

/* ── Dark theme — portalled surface themed via the document root ──────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <DatePicker defaultValue={new Date(2026, 5, 24)} />
    </div>
  ),
  decorators: [withDarkPortalRoot],
  parameters: {
    docs: {
      description: {
        story:
          'The calendar popover is portalled to `<body>`, so the dark theme must also be flagged on the document root — `withDarkPortalRoot` does that in a `useEffect`. The trigger themes from the wrapping `<div>`; the portalled calendar themes from the root.',
      },
    },
  },
};
