import type { HTMLAttributes, ReactNode } from "react";
import type { ChartConfig } from "../Chart/Chart.types";

/** One pie slice. `name` keys into `config` for color + label; `value` sizes it. */
export interface PieChartDatum {
  name: string;
  value: number;
  [key: string]: unknown;
}

export interface PieChartProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Slice data — each datum's `name` keys into `config` for color + label. */
  data: PieChartDatum[];
  /**
   * Series config keyed by datum `name`: { label, color }. Colors should be a
   * chart semantic (`var(--color-chart-1)` … `-5`) so slices re-theme for free.
   */
  config: ChartConfig;

  /** Card header title. Omit to render no header. */
  title?: ReactNode;
  /** Card header description (e.g. a date range). */
  description?: ReactNode;
  /** Card footer content (e.g. a trend line). Omit to render no footer. */
  footer?: ReactNode;

  /** Donut hole radius (px). 0 = a full pie. Default 60 (donut). */
  innerRadius?: number;
  /** Outer radius of the pie (px). */
  outerRadius?: number;
  /** Show the themed legend below the chart. */
  showLegend?: boolean;
  /** Show the themed tooltip on hover. */
  showTooltip?: boolean;
  /** Render slice-name labels on the slices (a LabelList in the background fill). */
  showLabels?: boolean;
  /**
   * Big centered total rendered as an SVG label in the donut hole (ShadCN
   * "donut with text" pattern). Ignored when innerRadius is 0.
   */
  centerValue?: string | number;
  /** Caption under `centerValue` (e.g. "Visitors"). */
  centerLabel?: string | number;
}
