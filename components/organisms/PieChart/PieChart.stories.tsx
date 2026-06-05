import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Organisms/PieChart',
  component: PieChart,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    infoLabel: { control: 'text' },
    metric: { control: 'text' },
    delta: { control: 'number' },
    deltaLabel: { control: 'text' },
    dateStart: { control: 'text' },
    dateEnd: { control: 'text' },
    description: { control: 'text' },
    donut: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    period: { control: 'select', options: ['daily', 'weekly', 'monthly', 'yearly', 'quarterly'] },
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const SALES_SERIES = [
  { name: 'Direct', value: 86 },
  { name: 'Email', value: 52 },
  { name: 'Social', value: 45 },
  { name: 'Paid', value: 30 },
  { name: 'Affiliate', value: 20 },
  { name: 'Organic', value: 8 },
  { name: 'Other', value: 5 },
];

// ── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Revenue by Channel',
    infoLabel: 'Breakdown of total revenue by acquisition channel',
    metric: '$246,890',
    delta: 8.3,
    deltaLabel: 'from last quarter',
    dateStart: 'Q1 2026',
    dateEnd: 'Q2 2026',
    series: SALES_SERIES,
    period: 'quarterly',
    description:
      'Direct sales continue to lead revenue, with email campaigns showing strong growth this quarter.',
  },
};

// ── Variants — pie vs donut ─────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">Pie chart</p>
        <PieChart
          title="Standard Pie"
          series={SALES_SERIES}
          showLegend
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">Donut chart</p>
        <PieChart
          title="Donut"
          series={SALES_SERIES}
          donut
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">No legend</p>
        <PieChart
          title="Minimal"
          series={[{ name: 'Mobile', value: 60 }, { name: 'Desktop', value: 40 }]}
          showLegend={false}
          periods={[]}
        />
      </div>
    </div>
  ),
};

// ── Sizes — few vs many segments ────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">2 segments</p>
        <PieChart
          title="Binary Split"
          metric="100%"
          series={[
            { name: 'Enabled', value: 73 },
            { name: 'Disabled', value: 27 },
          ]}
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">4 segments</p>
        <PieChart
          title="Budget Allocation"
          metric="$12.5M"
          series={[
            { name: 'R&D', value: 45 },
            { name: 'Sales', value: 25 },
            { name: 'Marketing', value: 18 },
            { name: 'Operations', value: 12 },
          ]}
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">7 segments (donut)</p>
        <PieChart
          title="All Channels"
          metric="246"
          series={SALES_SERIES}
          donut
          periods={[]}
        />
      </div>
    </div>
  ),
};

// ── States — loading, empty, single segment, no legend ─────────────────────

export const States: Story = {
  name: 'States',
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">Loading</p>
        <PieChart
          title="Loading"
          series={SALES_SERIES}
          loading
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">Empty (no data)</p>
        <PieChart
          title="No Data"
          series={[]}
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">Single segment</p>
        <PieChart
          title="All or Nothing"
          metric="100"
          series={[{ name: 'Total', value: 100 }]}
          periods={[]}
        />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-2">Negative delta</p>
        <PieChart
          title="Market Share"
          metric="22%"
          delta={-3.1}
          deltaLabel="from last year"
          series={[
            { name: 'Us', value: 22 },
            { name: 'Competitor A', value: 35 },
            { name: 'Competitor B', value: 28 },
            { name: 'Competitor C', value: 15 },
          ]}
          periods={[]}
        />
      </div>
    </div>
  ),
};

// ── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="max-w-2xl p-8 bg-[var(--color-bg-primary)] rounded-[var(--radius-component-xl)]"
    >
      <PieChart
        title="Revenue by Channel"
        infoLabel="Breakdown of total revenue by acquisition channel"
        metric="$246,890"
        delta={8.3}
        deltaLabel="from last quarter"
        dateStart="Q1 2026"
        dateEnd="Q2 2026"
        series={SALES_SERIES}
        period="quarterly"
        description="Direct sales continue to lead revenue, with email campaigns showing strong growth this quarter."
      />
    </div>
  ),
};

// ── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    title: 'Revenue by Channel',
    infoLabel: 'Breakdown of total revenue by acquisition channel',
    metric: '$246,890',
    delta: 8.3,
    deltaLabel: 'from last quarter',
    dateStart: 'Q1 2026',
    dateEnd: 'Q2 2026',
    series: SALES_SERIES,
    donut: false,
    showLegend: true,
    period: 'quarterly',
    description: 'Adjust all controls below to explore the component.',
  },
};

// ── Mobile ──────────────────────────────────────────────────────────────────

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  render: () => (
    <div className="p-2">
      <PieChart
        title="Revenue by Channel"
        infoLabel="Breakdown of total revenue by acquisition channel"
        metric="$246,890"
        delta={8.3}
        deltaLabel="from last quarter"
        dateStart="Q1 2026"
        dateEnd="Q2 2026"
        series={SALES_SERIES}
        period="quarterly"
        description="Direct sales continue to lead revenue, with email campaigns showing strong growth this quarter."
      />
    </div>
  ),
};

// ── Accessibility ───────────────────────────────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
  name: 'Accessibility',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-component-lg)] p-[var(--spacing-layout-xs)] max-w-2xl">
      <PieChart
        title="Revenue by Channel"
        infoLabel="Distribution of revenue by acquisition channel"
        metric="$246,890"
        delta={8.3}
        deltaLabel="from last quarter"
        dateStart="Q1 2026"
        dateEnd="Q2 2026"
        series={SALES_SERIES}
        period="quarterly"
        description="Direct sales continue to lead revenue, with email campaigns showing strong growth this quarter."
      />
    </div>
  ),
};
