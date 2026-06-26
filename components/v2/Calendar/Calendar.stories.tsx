import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "v2/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Calendar>;

const frame = "rounded-md border border-border bg-card text-card-foreground";

/* Small wrapper components so hooks live in real components (rules-of-hooks). */
function SingleCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 5, 24));
  return (
    <Calendar mode="single" selected={selected} onSelect={setSelected} className={frame} />
  );
}

function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 5, 10),
    to: new Date(2026, 5, 16),
  });
  return (
    <Calendar mode="range" selected={range} onSelect={setRange} className={frame} />
  );
}

function WeekdaysDisabledCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={{ dayOfWeek: [0, 6] }}
      className={frame}
    />
  );
}

/* ── Default — single date ────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <SingleCalendar />,
};

/* ── Range selection ──────────────────────────────────────────────────────── */
export const Range: Story = {
  render: () => <RangeCalendar />,
};

/* ── Disabled days (weekends) ─────────────────────────────────────────────── */
export const DisabledDays: Story = {
  render: () => <WeekdaysDisabledCalendar />,
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <SingleCalendar />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Calendar under a dark theme. The wrapper sets both data-theme="dark" and .dark; the card surface, selected primary day, today accent, and muted outside days re-theme from Tier-2 semantics. Not portalled, so no document-root toggle is needed.',
      },
    },
  },
};
