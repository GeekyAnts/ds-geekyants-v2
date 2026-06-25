"use client";
import { forwardRef } from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "../lib/cn";
import type {
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
  ChartConfig,
} from "./Chart.types";

/**
 * Chart — ShadCN pattern on geeklego's 2-tier token system, built on recharts
 * (category B). recharts owns the charting; we own the look. Colors come from
 * the chart data-series semantics (--color-chart-1…5, a documented geeklego
 * extension of the standard set in semantics.css). recharts paints SVG fill/
 * stroke from `var()` strings — the one place a var() arbitrary is unavoidable,
 * since SVG paint has no Tailwind className path.
 *
 * ChartContainer injects each config series' color as a `--color-<key>` CSS var
 * on its root (via inline style — the legitimate runtime-dynamic-custom-property
 * exception), so a chart element can reference `var(--color-<seriesKey>)`.
 *
 * Compound: <ChartContainer config><BarChart>…<Tooltip content={<ChartTooltipContent/>}/></BarChart></ChartContainer>
 */

/** Build the `--color-<key>` style map from a chart config. */
function configToColorVars(config: ChartConfig): React.CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, series] of Object.entries(config)) {
    if (series.color) vars[`--color-${key}`] = series.color;
  }
  return vars as React.CSSProperties;
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, style, ...props }, ref) => (
    <div
      ref={ref}
      data-chart
      className={cn(
        "flex aspect-video justify-center text-xs",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line]:stroke-border/50",
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
        "[&_.recharts-radial-bar-background-sector]:fill-muted",
        "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
        "[&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className,
      )}
      style={{ ...configToColorVars(config), ...style }}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  ),
);
ChartContainer.displayName = "ChartContainer";

/** Re-export recharts' Tooltip as ChartTooltip (use with ChartTooltipContent). */
export const ChartTooltip = Tooltip;

/**
 * ChartTooltipContent — a themed tooltip body. Pass as `content` to ChartTooltip:
 * `<ChartTooltip content={<ChartTooltipContent />} />`.
 */
export const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    { active, payload, label, hideIndicator, hideLabel, config, className },
    ref,
  ) => {
    // recharts clones the tooltip `content` with its own internal props
    // (coordinate, accessibilityLayer, viewBox, …); consume only our own props
    // plus className so none of those leak onto the DOM <div>.
    if (!active || !payload?.length) return null;
    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-32 gap-1.5 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md",
          className,
        )}
      >
        {!hideLabel && label != null && (
          <div className="font-medium">{label}</div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            const key = String(item.name ?? item.dataKey ?? i);
            const seriesLabel = config?.[key]?.label ?? item.name ?? item.dataKey;
            return (
              <div
                key={item.dataKey ?? i}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-1.5">
                  {!hideIndicator && (
                    <span
                      className="size-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  <span className="text-muted-foreground">{seriesLabel}</span>
                </div>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

/** Re-export recharts' Legend as ChartLegend (use with ChartLegendContent). */
export const ChartLegend = Legend;

/**
 * ChartLegendContent — a themed legend row. Pass as `content` to ChartLegend:
 * `<ChartLegend content={<ChartLegendContent nameKey="browser" config={…} />} />`.
 * Each item reads its label from `config` (keyed by `nameKey`) and its swatch
 * from the recharts-computed `color`.
 */
export const ChartLegendContent = forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ payload, nameKey, config, hideIcon, className }, ref) => {
  // Note: recharts clones the `content` element with its own internal props
  // (chartWidth, chartHeight, margin, layout, align, …), so we deliberately do
  // NOT spread the rest onto the DOM — that's what leaked `chartHeight` to the
  // <div> and tripped React's unknown-prop warning. We consume only our own
  // props plus className.
  if (!payload?.length) return null;
  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center justify-center gap-4", className)}
    >
      {payload.map((item, i) => {
        const raw = nameKey
          ? (item.payload?.[nameKey] as string | undefined)
          : item.value;
        const key = String(raw ?? item.value ?? i);
        const seriesLabel = config?.[key]?.label ?? key;
        return (
          <div
            key={key}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            {!hideIcon && (
              <span
                className="size-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            {seriesLabel}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";
