"use client"
import { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Select } from '../../atoms/Select/Select';
import { Divider } from '../../atoms/Divider/Divider';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import type { PieChartProps, PieChartSeries } from './PieChart.types';
import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n';
import { getLoadingProps } from '../../utils/accessibility/aria-helpers';

/* ═══════════════════════════════════════════════════════════════════════════
   SVG geometry constants
   ═══════════════════════════════════════════════════════════════════════════ */

const CX = 120;
const CY = 120;
const R_OUTER = 100;
const R_INNER = 60;
const TAU = Math.PI * 2;

/** Series CSS variable references for SVG fills */
const SERIES_VARS = [
  'var(--piechart-series-1)',
  'var(--piechart-series-2)',
  'var(--piechart-series-3)',
  'var(--piechart-series-4)',
  'var(--piechart-series-5)',
  'var(--piechart-series-6)',
  'var(--piechart-series-7)',
];

/** Series Tailwind bg classes for the legend swatches */
const SERIES_BG = [
  'bg-[var(--piechart-series-1)]',
  'bg-[var(--piechart-series-2)]',
  'bg-[var(--piechart-series-3)]',
  'bg-[var(--piechart-series-4)]',
  'bg-[var(--piechart-series-5)]',
  'bg-[var(--piechart-series-6)]',
  'bg-[var(--piechart-series-7)]',
];

/* ═══════════════════════════════════════════════════════════════════════════
   Arc path computation
   ═══════════════════════════════════════════════════════════════════════════ */

interface ArcSegment {
  path: string;
  startAngle: number;
  endAngle: number;
}

function buildPieArcs(series: PieChartSeries[], donut: boolean): ArcSegment[] {
  const total = series.reduce((s, v) => s + v.value, 0);
  if (total <= 0) return [];

  const r1 = R_OUTER;
  const r2 = donut ? R_INNER : 0;

  let currentAngle = -TAU / 4; // start at 12 o'clock

  return series.map((s) => {
    const sweep = (s.value / total) * TAU;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;

    const x1 = CX + r1 * Math.cos(startAngle);
    const y1 = CY + r1 * Math.sin(startAngle);
    const x2 = CX + r1 * Math.cos(endAngle);
    const y2 = CY + r1 * Math.sin(endAngle);
    const largeArc = sweep > Math.PI ? 1 : 0;

    let path: string;
    if (donut) {
      const ix1 = CX + r2 * Math.cos(endAngle);
      const iy1 = CY + r2 * Math.sin(endAngle);
      const ix2 = CX + r2 * Math.cos(startAngle);
      const iy2 = CY + r2 * Math.sin(startAngle);
      path = [
        `M ${x1} ${y1}`,
        `A ${r1} ${r1} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${ix1} ${iy1}`,
        `A ${r2} ${r2} 0 ${largeArc} 0 ${ix2} ${iy2}`,
        'Z',
      ].join(' ');
    } else {
      path = [
        `M ${CX} ${CY}`,
        `L ${x1} ${y1}`,
        `A ${r1} ${r1} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');
    }

    return { path, startAngle, endAngle };
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════════════════ */

export const PieChart = memo(forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      title,
      infoLabel,
      metric,
      delta,
      deltaLabel: deltaLabelProp,
      dateStart,
      dateEnd,
      series = [],
      donut = false,
      showLegend = true,
      period = 'weekly',
      periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'],
      onPeriodChange,
      description,
      loading = false,
      className,
      i18nStrings,
      ...rest
    },
    ref,
  ) => {
    const i18n = useComponentI18n('pieChart', i18nStrings);
    const deltaLabel = deltaLabelProp ?? i18n.deltaLabel;

    const total = useMemo(() => series.reduce((sum, s) => sum + s.value, 0), [series]);
    const isDeltaPositive = delta !== undefined && delta > 0;
    const isDeltaNegative = delta !== undefined && delta < 0;

    const periodOptions = useMemo(
      () => periods.map((p) => ({ value: p.toLowerCase(), label: p })),
      [periods],
    );

    /* ── Arc geometry ───────────────────────────────────────────────────────── */
    const arcs = useMemo(() => buildPieArcs(series, donut), [series, donut]);

    /* ── Hover state ────────────────────────────────────────────────────────── */
    const svgRef = useRef<SVGSVGElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleSegmentEnter = useCallback(
      (index: number) => setHoveredIndex(index),
      [],
    );
    const handleSegmentLeave = useCallback(() => setHoveredIndex(null), []);
    const handleSvgLeave = useCallback(() => setHoveredIndex(null), []);

    /* ── Compute tooltip position ───────────────────────────────────────────── */
    const tooltipData = useMemo(() => {
      if (hoveredIndex === null || series.length === 0) return null;
      const s = series[hoveredIndex];
      return {
        name: s.name,
        value: s.value,
        pct: total > 0 ? ((s.value / total) * 100).toFixed(1) : '0',
      };
    }, [hoveredIndex, series, total]);

    return (
      <div
        ref={ref}
        // CSS custom property injection — passes min-width override to .card-shell
        style={{ '--card-shell-min-width': 'var(--piechart-min-width)' } as React.CSSProperties}
        className={[
          'card-shell',
          'flex flex-col gap-[var(--piechart-section-gap)]',
          'rounded-[var(--piechart-radius)]',
          'border border-[var(--piechart-border)]',
          'bg-[var(--piechart-bg)]',
          'p-[var(--piechart-padding)]',
          'shadow-[var(--piechart-shadow)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...getLoadingProps(loading)}
        {...rest}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="card-header-row">
          <div className="card-header-title">
            <h3 className="text-heading-h4 text-[var(--piechart-title-color)] truncate-label">{title}</h3>

            {infoLabel && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                leftIcon={<Info />}
                title={infoLabel}
                className="text-[var(--piechart-icon-color)] hover:text-[var(--piechart-icon-color-hover)]"
              >
                {infoLabel}
              </Button>
            )}
          </div>

          {periodOptions.length > 0 && (
            <Select
              options={periodOptions}
              value={period}
              onChange={onPeriodChange}
              variant="default"
              size="sm"
              aria-label={i18n.periodSelectorLabel}
              className="flex-shrink-0 w-[8rem]"
            />
          )}
        </div>

        {/* ── Metric + delta ──────────────────────────────────────────────── */}
        {metric !== undefined && (
          <div className="card-metric-row">
            <span className="text-display-md text-[var(--piechart-metric-color)]">{metric}</span>

            {delta !== undefined && (
              <div className="flex items-center gap-[var(--spacing-component-xs)]">
                <span
                  className={[
                    'text-body-sm-semibold',
                    isDeltaPositive && 'text-[var(--piechart-delta-positive-color)]',
                    isDeltaNegative && 'text-[var(--piechart-delta-negative-color)]',
                    !isDeltaPositive && !isDeltaNegative && 'text-[var(--piechart-delta-context-color)]',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {isDeltaPositive ? '+' : ''}
                  {delta}%
                </span>
                {deltaLabel && (
                  <span className="text-body-sm text-[var(--piechart-delta-context-color)] truncate-label">
                    {deltaLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Date range ──────────────────────────────────────────────────── */}
        {(dateStart || dateEnd) && (
          <div className="flex items-center justify-between">
            {dateStart && (
              <span className="text-body-sm text-[var(--piechart-date-color)]">{dateStart}</span>
            )}
            {dateEnd && dateEnd !== dateStart && (
              <span className="text-body-sm text-[var(--piechart-date-color)]">{dateEnd}</span>
            )}
          </div>
        )}

        {/* ── Chart area / Loading ─────────────────────────────────────────── */}
        {loading ? (
          <Skeleton
            variant="box"
            height="var(--piechart-loading-height)"
            aria-label="Loading chart data"
          />
        ) : (
          <>
            {/* ── SVG pie ────────────────────────────────────────────────── */}
            <div className="relative w-full flex justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 240 240"
                width="100%"
                role="img"
                aria-label={i18n.chartLabel?.(title)}
                className="overflow-visible max-w-[280px]"
                onMouseLeave={handleSvgLeave}
              >
                {arcs.map((arc, i) => (
                  <path
                    key={series[i]?.name ?? i}
                    d={arc.path}
                    fill={SERIES_VARS[i % SERIES_VARS.length]}
                    opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1}
                    className="transition-default cursor-default"
                    onMouseEnter={() => handleSegmentEnter(i)}
                    onMouseLeave={handleSegmentLeave}
                  />
                ))}
              </svg>

              {/* ── Tooltip overlay ──────────────────────────────────────── */}
              {hoveredIndex !== null && tooltipData && (
                <div
                  role="tooltip"
                  className={[
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'pointer-events-none',
                    'px-[var(--spacing-component-md)] py-[var(--spacing-component-sm)]',
                    'rounded-[var(--piechart-tooltip-radius)]',
                    'bg-[var(--piechart-tooltip-bg)]',
                    'shadow-[var(--piechart-tooltip-shadow)]',
                    'border border-[var(--piechart-tooltip-border)]',
                    'text-[var(--piechart-tooltip-text)]',
                    'whitespace-nowrap',
                    'z-[var(--layer-popover)]',
                  ].join(' ')}
                >
                  <div className="text-body-sm-semibold text-center">{tooltipData.name}</div>
                  <div className="text-body-xs text-[var(--piechart-date-color)] text-center">
                    {tooltipData.pct}%
                  </div>
                </div>
              )}
            </div>

            {/* ── Legend ─────────────────────────────────────────────────── */}
            {showLegend && series.length > 0 && total > 0 && (
              <div
                className="flex flex-wrap justify-center gap-x-[var(--spacing-component-lg)] gap-y-[var(--spacing-component-xs)]"
                aria-label={i18n.legendLabel}
              >
                {series.map((s, i) => {
                  const bgClass = SERIES_BG[i % SERIES_BG.length];
                  return (
                    <div
                      key={s.name}
                      className="flex items-center gap-[var(--spacing-component-xs)]"
                    >
                      <span
                        className={`${bgClass} w-[var(--size-icon-xs)] h-[var(--size-icon-xs)] rounded-[var(--radius-component-sm)] shrink-0`}
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-[var(--piechart-date-color)] content-nowrap">
                        {s.name}
                      </span>
                      <span className="text-body-sm-semibold text-[var(--piechart-metric-color)]">
                        {((s.value / total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Visually hidden data table — screen reader alternative ──── */}
            <table className="sr-only">
              <caption>{i18n.tableCaption?.(title)}</caption>
              <thead>
                <tr>
                  <th scope="col">{i18n.columnSegment}</th>
                  <th scope="col">{i18n.columnValue}</th>
                  <th scope="col">{i18n.columnShare}</th>
                </tr>
              </thead>
              <tbody>
                {series.map((s) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td>{s.value}</td>
                    <td>{total > 0 ? `${((s.value / total) * 100).toFixed(1)}%` : '0%'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">{i18n.totalLabel}</th>
                  <td>{total}</td>
                  <td>100%</td>
                </tr>
              </tfoot>
            </table>
          </>
        )}

        {/* ── Divider + description ──────────────────────────────────────── */}
        {description && (
          <>
            <Divider />
            <p className="text-body-sm text-[var(--piechart-description-color)]">{description}</p>
          </>
        )}
      </div>
    );
  },
));
PieChart.displayName = 'PieChart';
