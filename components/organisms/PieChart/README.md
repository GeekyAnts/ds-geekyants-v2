# PieChart

**Level:** Organism (L3)
**Folder:** `components/organisms/PieChart/`
**Dependencies:** `Button` (L1), `Select` (L1), `Divider` (L1), `Skeleton` (L1)

## Description

A data visualization card that displays a proportional pie or donut chart alongside a headline metric, period selector, date range labels, legend, and an optional description. Arc angles are computed as a percentage of the total across all series. Up to 7 series are supported before the colour palette cycles.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Card header title |
| `infoLabel` | `string` | `undefined` | Accessible label for the info icon button. Omit to hide the icon. |
| `metric` | `number \| string` | — | Primary metric value displayed in large type |
| `delta` | `number` | `undefined` | Change percentage. Positive — green, negative — red, zero — muted |
| `deltaLabel` | `string` | `'from last period'` | Context text shown next to the delta (e.g. "from last week") |
| `dateStart` | `string` | `undefined` | Start-of-range label, left-aligned below the metric |
| `dateEnd` | `string` | `undefined` | End-of-range label, right-aligned |
| `series` | `PieChartSeries[]` | `[]` | Data segments — order determines rendering order and color |
| `donut` | `boolean` | `false` | When true, renders a donut chart with a hollow center |
| `showLegend` | `boolean` | `true` | Show the colour legend below the chart |
| `period` | `string` | `'weekly'` | Selected period value (should match one of `periods` lowercased) |
| `periods` | `string[]` | `['Daily', 'Weekly', 'Monthly', 'Yearly']` | Options for the period selector. Pass `[]` to hide the selector. |
| `onPeriodChange` | `(period: string) => void` | `undefined` | Callback when the user selects a period |
| `description` | `string` | `undefined` | Descriptive text rendered below the divider |
| `loading` | `boolean` | `false` | When true, replaces the chart area with a shimmer skeleton |
| `className` | `string` | `undefined` | Additional Tailwind classes appended to the card root |
| `i18nStrings` | `PieChartI18nStrings` | `undefined` | Override localised strings for this instance |

### PieChartSeries

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Segment label (used for tooltips and ARIA) |
| `value` | `number` | Raw numeric value — arc angles are auto-calculated as % of total |

## Tokens Used

| Token | Resolves to | Used for |
|---|---|---|
| `--piechart-bg` | `--color-bg-secondary` | Card background |
| `--piechart-border` | `--color-border-default` | Card border |
| `--piechart-radius` | `--radius-component-xl` | Card corner radius |
| `--piechart-padding` | `--spacing-layout-xs` | Inner card padding |
| `--piechart-shadow` | `none` | Card elevation shadow |
| `--piechart-section-gap` | `--spacing-component-lg` | Vertical gap between sections |
| `--piechart-title-color` | `--color-text-primary` | Title text |
| `--piechart-icon-color` | `--color-text-tertiary` | Info icon |
| `--piechart-icon-color-hover` | `--color-text-secondary` | Info icon hover |
| `--piechart-metric-color` | `--color-text-primary` | Headline metric value |
| `--piechart-delta-positive-color` | `--color-status-success` | Positive delta percentage |
| `--piechart-delta-negative-color` | `--color-status-error` | Negative delta percentage |
| `--piechart-delta-context-color` | `--color-text-secondary` | Delta context text |
| `--piechart-date-color` | `--color-text-tertiary` | Date range labels |
| `--piechart-series-1–7` | `--color-data-series-1–7` | Arc fill colours |
| `--piechart-tooltip-bg` | `--color-surface-raised` | Tooltip background |
| `--piechart-tooltip-text` | `--color-text-primary` | Tooltip text |
| `--piechart-tooltip-shadow` | `--shadow-lg` | Tooltip elevation |
| `--piechart-tooltip-radius` | `--radius-component-md` | Tooltip corner radius |
| `--piechart-description-color` | `--color-text-secondary` | Description text |
| `--piechart-min-width` | `--content-min-width-md` | Minimum card width |
| `--piechart-loading-height` | `--size-component-2xl` | Skeleton placeholder height |

### Data series palette

| Token | Light / Brand | Dark |
|---|---|---|
| `--color-data-series-1` | `--color-brand-500` | same (no dark override) |
| `--color-data-series-2` | `--color-success-500` | same |
| `--color-data-series-3` | `--color-warning-500` | same |
| `--color-data-series-4` | `--color-accent-500` | same |
| `--color-data-series-5` | `--color-error-500` | same |
| `--color-data-series-6` | `--color-brand-300` | same |
| `--color-data-series-7` | `--color-neutral-400` | same |

## Variants

| Variant | Description |
|---|---|
| **Pie** (default) | Standard pie chart with solid wedges from center to outer radius |
| **Donut** | Pie chart with a hollow center — set `donut={true}` |

## States

| State | Description |
|---|---|
| Default | Renders the pie chart with all segments visible |
| Loading | Replaces the chart with a skeleton shimmer placeholder |
| Empty | No data — renders the header and metric only without chart content |
| Hover | Hovering a segment dims all other segments and shows a tooltip |

## Accessibility

- The SVG element carries `role="img"` with a descriptive `aria-label`
- A visually hidden `<table>` with `<caption>`, `<thead>`, `<tbody>`, and `<tfoot>` provides full data access to screen readers
- Each row in the hidden table contains the segment name, raw value, and percentage share
- The info button has `aria-label` and `title`
- The period selector has `aria-label`
- Tooltip uses `role="tooltip"` with `pointer-events-none`

## Usage

```tsx
import { PieChart } from './components/organisms/PieChart/PieChart';

<PieChart
  title="Revenue by Channel"
  infoLabel="Breakdown of total revenue by acquisition channel"
  metric="$246,890"
  delta={8.3}
  deltaLabel="from last quarter"
  dateStart="Q1 2026"
  dateEnd="Q2 2026"
  series={[
    { name: 'Direct', value: 86 },
    { name: 'Email', value: 52 },
    { name: 'Social', value: 45 },
    { name: 'Paid', value: 30 },
  ]}
  period="quarterly"
  onPeriodChange={(p) => console.log(p)}
  description="Direct sales continue to lead revenue, with email campaigns showing strong growth this quarter."
/>
```
