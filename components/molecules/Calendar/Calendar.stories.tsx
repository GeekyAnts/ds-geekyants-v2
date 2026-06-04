import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// ── 1. Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    value: new Date(2026, 4, 15),
  },
};

// ── 2. Variants (controlled vs uncontrolled) ────────────────────────────────

export const Variants: Story = {
  render: () => {
    const Controlled = () => {
      const [date, setDate] = useState<Date | null>(new Date(2026, 4, 15));
      return (
        <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
          <Calendar
            value={date}
            onChange={setDate}
          />
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Selected: {date ? date.toISOString().slice(0, 10) : 'None'}
          </p>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
        <Calendar value={new Date(2026, 4, 15)} />
        <Calendar />
        <Controlled />
      </div>
    );
  },
};

// ── 3. Sizes (first day of week) ────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
      <Calendar value={new Date(2026, 4, 15)} firstDayOfWeek={1} />
      <Calendar value={new Date(2026, 4, 15)} firstDayOfWeek={0} />
    </div>
  ),
};

// ── 4. States ───────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
      <Calendar value={new Date(2026, 4, 15)} />
      <Calendar
        value={new Date(2026, 4, 15)}
        min={new Date(2026, 4, 10)}
        max={new Date(2026, 4, 20)}
      />
      <Calendar
        displayMonth={{ year: 2026, month: 3 }}
        value={new Date(2026, 3, 15)}
      />
    </div>
  ),
};

// ── 5. DarkMode ─────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-primary p-[var(--spacing-layout-md)] rounded-[var(--radius-component-lg)] max-w-2xl">
      <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
        <Calendar value={new Date(2026, 4, 15)} />
        <Calendar
          value={new Date(2026, 4, 15)}
          min={new Date(2026, 4, 10)}
          max={new Date(2026, 4, 20)}
        />
      </div>
    </div>
  ),
};

// ── 6. Playground ───────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    value: new Date(2026, 4, 15),
    firstDayOfWeek: 1,
  },
  argTypes: {
    firstDayOfWeek: { control: 'radio', options: [0, 1] },
    value: { control: 'date' },
  },
};

// ── 7. Mobile ───────────────────────────────────────────────────────────────

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  render: () => (
    <div className="w-full">
      <Calendar value={new Date(2026, 4, 15)} />
    </div>
  ),
};

// ── 8. Accessibility ────────────────────────────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
  render: () => {
    const ControlledExample = () => {
      const [date, setDate] = useState<Date | null>(new Date(2026, 4, 15));
      return (
        <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
          <Calendar
            value={date}
            onChange={setDate}
            aria-label="Select appointment date"
          />
          <Calendar
            displayMonth={{ year: 2026, month: 0 }}
            value={new Date(2026, 0, 15)}
            min={new Date(2026, 0, 1)}
            max={new Date(2026, 11, 31)}
            aria-label="Select date within 2026"
          />
          <Calendar
            displayMonth={{ year: 2026, month: 5 }}
            value={new Date(2026, 5, 15)}
            firstDayOfWeek={0}
            aria-label="Calendar with Sunday start"
          />
        </div>
      );
    };
    return <ControlledExample />;
  },
};
