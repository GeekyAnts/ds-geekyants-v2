import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { TrendingUp } from "lucide-react";
import { PieChart } from "./PieChart";
import type { ChartConfig } from "../Chart/Chart.types";

const meta: Meta<typeof PieChart> = {
  title: "v2/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof PieChart>;

const data = [
  { name: "chrome", value: 275 },
  { name: "safari", value: 200 },
  { name: "firefox", value: 287 },
  { name: "edge", value: 173 },
  { name: "other", value: 190 },
];

// Series colors reference the chart semantics — slices re-theme for free.
const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "var(--color-chart-5)" },
};

const total = data.reduce((sum, d) => sum + d.value, 0);

const trendFooter = (
  <>
    <div className="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUp className="size-4" />
    </div>
    <div className="leading-none text-muted-foreground">
      Showing total visitors for the last 6 months
    </div>
  </>
);

/* ── Donut with text — the canonical ShadCN variant ──────────────────────────── */
export const DonutWithText: Story = {
  render: () => (
    <PieChart
      className="w-80"
      title="Pie Chart - Donut with Text"
      description="January – June 2024"
      data={data}
      config={config}
      centerValue={total.toLocaleString()}
      centerLabel="Visitors"
      footer={trendFooter}
    />
  ),
};

/* ── Donut with legend ───────────────────────────────────────────────────────── */
export const WithLegend: Story = {
  render: () => (
    <PieChart
      className="w-80"
      title="Pie Chart - Legend"
      description="January – June 2024"
      data={data}
      config={config}
      showLegend
    />
  ),
};

/* ── Full pie with on-slice labels ───────────────────────────────────────────── */
export const WithLabels: Story = {
  render: () => (
    <PieChart
      className="w-80"
      title="Pie Chart - Label"
      description="January – June 2024"
      data={data}
      config={config}
      innerRadius={0}
      showLabels
      footer={trendFooter}
    />
  ),
};

/* ── Simple — no header/footer, donut + tooltip only ─────────────────────────── */
export const Simple: Story = {
  render: () => <PieChart className="w-72" data={data} config={config} />,
};

/* ── Dark theme — slices re-theme to lighter primitive steps ─────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <PieChart
        className="w-80"
        title="Pie Chart - Donut with Text"
        description="January – June 2024"
        data={data}
        config={config}
        centerValue={total.toLocaleString()}
        centerLabel="Visitors"
        footer={trendFooter}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'PieChart under a dark theme. The wrapper sets both `data-theme="dark"` and `.dark`; the Card surface, header/footer text and slice colors all re-theme from the standard card/foreground/muted and `--chart-1..5` semantics. The slice stroke reads `var(--color-background)` so the gaps match the dark surface. PieChart is not portalled, so a plain dark wrapper is sufficient.',
      },
    },
  },
};
