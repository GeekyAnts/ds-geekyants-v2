import type { HTMLAttributes } from 'react';
import type { PieChartI18nStrings } from '../../utils/i18n';

export interface PieChartSeries {
  /** Segment label shown in the legend and tooltip */
  name: string;
  /** Numeric value — arc angles are calculated as a percentage of the total */
  value: number;
}

export interface PieChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title displayed in the header */
  title: string;
  /** Accessible label for the info icon button. Omit to hide the icon. */
  infoLabel?: string;
  /** Primary numeric metric displayed prominently below the header. Omit to show chart only. */
  metric?: number | string;
  /** Change percentage (+2.1 = "+2.1%"). Positive — green, negative — red. */
  delta?: number;
  /** Context text shown next to the delta value (e.g. "from last week") */
  deltaLabel?: string;
  /** Start-of-range date label shown left-aligned below the metric */
  dateStart?: string;
  /** End-of-range date label shown right-aligned below the metric */
  dateEnd?: string;
  /** Data segments — order determines rendering order and color assignment */
  series: PieChartSeries[];
  /** When true, renders a donut chart with a hollow center. Defaults to false. */
  donut?: boolean;
  /** Show the colour legend below the chart. Defaults to true. */
  showLegend?: boolean;
  /** Currently selected period value (should match one of `periods` lowercased) */
  period?: string;
  /** Available period options shown in the selector dropdown */
  periods?: string[];
  /** Called when the user selects a different period */
  onPeriodChange?: (period: string) => void;
  /** Optional description text rendered below the divider */
  description?: string;
  /** When true, replaces the chart area with a shimmer skeleton placeholder. */
  loading?: boolean;
  /** Override localised strings for this instance. Context strings apply when omitted. */
  i18nStrings?: PieChartI18nStrings;
}
