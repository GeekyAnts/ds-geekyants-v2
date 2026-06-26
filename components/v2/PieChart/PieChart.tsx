"use client";
import { forwardRef } from "react";
import {
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart as RechartsPieChart,
} from "recharts";
import { cn } from "../lib/cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Card/Card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../Chart/Chart";
import type { PieChartProps } from "./PieChart.types";

/**
 * PieChart — ShadCN pattern on geeklego's 2-tier token system, built on recharts
 * (category B). Mirrors the ShadCN pie-chart blocks: a pre-composed Card with a
 * centered header (title/description), the pie/donut body, an optional legend or
 * on-slice labels, and an optional footer (trend line). recharts owns the
 * geometry; we own the look.
 *
 * The Card + Chart leaves do the work — this composes them:
 *   Card → CardHeader/Content/Footer  ·  ChartContainer (injects --color-<name>
 *   series vars + themes axis/grid)  ·  ChartTooltip/ChartTooltipContent  ·
 *   ChartLegend/ChartLegendContent.
 *
 * Center text uses a recharts SVG <Label content> positioned off the pie's
 * viewBox cx/cy (the ShadCN technique) — NOT a DOM overlay — so it scales and
 * stays centered with the chart. Slice fills read `var(--color-<name>)` injected
 * by ChartContainer; the one place a var() arbitrary is unavoidable (SVG paint
 * has no Tailwind className path), exactly as the base Chart does.
 */
export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      config,
      title,
      description,
      footer,
      innerRadius = 60,
      outerRadius,
      showLegend = false,
      showTooltip = true,
      showLabels = false,
      centerValue,
      centerLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const isDonut = innerRadius > 0;
    // ShadCN renders the center value as an SVG <Label> (big total + caption),
    // so it scales/centers with the chart. Only meaningful inside a donut hole.
    const renderCenterText = isDonut && centerValue != null;

    return (
      <Card ref={ref} className={cn("flex flex-col", className)} {...props}>
        {(title != null || description != null) && (
          <CardHeader className="items-center pb-0 text-center">
            {title != null && <CardTitle>{title}</CardTitle>}
            {description != null && (
              <CardDescription>{description}</CardDescription>
            )}
          </CardHeader>
        )}

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={config}
            className="mx-auto aspect-square max-h-64"
          >
            <RechartsPieChart>
              {showTooltip && (
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent config={config} hideLabel={isDonut} />}
                />
              )}
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                strokeWidth={5}
                stroke="var(--color-background)"
              >
                {data.map((datum) => (
                  <Cell key={datum.name} fill={`var(--color-${datum.name})`} />
                ))}
                {showLabels && (
                  <LabelList
                    dataKey="name"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value) => {
                      const key = String(value ?? "");
                      return (config[key]?.label as string) ?? key;
                    }}
                  />
                )}
                {renderCenterText && (
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {String(centerValue)}
                            </tspan>
                            {centerLabel != null && (
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy ?? 0) + 24}
                                className="fill-muted-foreground text-sm"
                              >
                                {String(centerLabel)}
                              </tspan>
                            )}
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                )}
              </Pie>
              {showLegend && (
                <ChartLegend
                  verticalAlign="bottom"
                  content={<ChartLegendContent nameKey="name" config={config} />}
                />
              )}
            </RechartsPieChart>
          </ChartContainer>
        </CardContent>

        {footer != null && (
          <CardFooter className="flex-col gap-2 pt-4 text-sm">{footer}</CardFooter>
        )}
      </Card>
    );
  },
);
PieChart.displayName = "PieChart";
