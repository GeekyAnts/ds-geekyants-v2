import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import type { ResponsiveContainer } from "recharts";

/**
 * Chart config — maps each data series key to a label + color. Colors should be
 * one of the chart semantics (`var(--color-chart-1)` … `-5`), so series re-theme
 * for free. ChartContainer injects these as `--color-<key>` CSS vars on its root
 * so recharts SVG fill/stroke can read them.
 */
export interface ChartSeriesConfig {
  label?: ReactNode;
  /** A chart semantic, e.g. "var(--color-chart-1)". Chains to a primitive. */
  color?: string;
}

export type ChartConfig = Record<string, ChartSeriesConfig>;

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  /** A single recharts chart element (BarChart, LineChart, …). */
  children: ComponentProps<typeof ResponsiveContainer>["children"];
}

export interface ChartTooltipContentProps
  extends HTMLAttributes<HTMLDivElement> {
  /** recharts passes these when used as a Tooltip `content`. */
  active?: boolean;
  payload?: Array<{
    name?: string;
    dataKey?: string | number;
    value?: number | string;
    color?: string;
    payload?: Record<string, unknown>;
  }>;
  label?: ReactNode;
  /** Hide the leading color swatch. */
  hideIndicator?: boolean;
  /** Hide the top label row (e.g. donut/pie tooltips that show only the value). */
  hideLabel?: boolean;
  /** Look up the per-item label from this chart config (keyed by name/dataKey). */
  config?: ChartConfig;
}

export interface ChartLegendContentProps extends HTMLAttributes<HTMLDivElement> {
  /** recharts passes its computed legend payload here. */
  payload?: Array<{
    value?: string;
    color?: string;
    dataKey?: string | number;
    payload?: Record<string, unknown>;
  }>;
  /** Field on each payload item that keys into `config` for the label. */
  nameKey?: string;
  /** Chart config supplying human-readable labels per series key. */
  config?: ChartConfig;
  /** Hide the leading color swatch. */
  hideIcon?: boolean;
}
