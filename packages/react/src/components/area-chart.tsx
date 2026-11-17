import React from 'react';
import { mergeClasses } from '@qzl/core';

/** One named area whose values align with the chart's labels. */
export interface AreaChartSeries {
  /** Text identifying this area in the legend. */
  label: string;
  /** Finite numeric values, one for each chart label. */
  values: number[];
  /** Optional CSS color for the area and its outline. */
  color?: string;
}

/** Props for {@link AreaChart}, in addition to figure attributes. */
export interface AreaChartProps extends React.HTMLAttributes<HTMLElement> {
  /** Figure caption displayed above the chart. */
  title: string;
  /** Ordered category or time labels shared by every series. */
  labels: string[];
  /** One or more area series. Each series must contain one value per label. */
  series: AreaChartSeries[];
  /** Stack non-negative series on top of one another. @default false */
  stacked?: boolean;
  /**
   * Formats values in the accessible data summary and axis.
   * @param value Numeric value to format.
   * @returns Formatted text.
   * @default String
   */
  formatValue?: (value: number) => string;
}

const viewWidth = 640;
const viewHeight = 250;
const plot = { left: 44, right: 12, top: 16, bottom: 40 };
const seriesColors = ['var(--qzl-primary)', 'var(--qzl-accent)', 'var(--qzl-success)', 'var(--qzl-warning)', 'var(--qzl-danger)'];

/**
 * Renders area series over shared labels. Use `stacked` for cumulative, non-negative values.
 *
 * @example
 * ```tsx
 * <AreaChart
 *   title="Cumulative weekly visits"
 *   labels={['Mon', 'Tue', 'Wed']}
 *   series={[{ label: 'Visits', values: [120, 156, 142] }]}
 * />
 * ```
 */
export function AreaChart({ title, labels, series, stacked = false, formatValue = String, className, ...props }: AreaChartProps) {
  for (const item of series) {
    if (!item.label) throw new TypeError('Area chart series labels must not be empty.');
    if (item.values.length !== labels.length) throw new RangeError('Each area chart series must have one value per label.');
    if (item.values.some((value) => !Number.isFinite(value))) throw new RangeError('Area chart values must be finite numbers.');
  }
  if (new Set(series.map((item) => item.label)).size !== series.length) throw new TypeError('Area chart series labels must be unique.');
  if (stacked && series.some((item) => item.values.some((value) => value < 0))) {
    throw new RangeError('Stacked area chart values must be non-negative.');
  }

  const cumulative: number[][] = [];
  series.forEach((item, seriesIndex) => {
    cumulative[seriesIndex] = item.values.map((value, index) => value + (stacked && seriesIndex > 0 ? cumulative[seriesIndex - 1][index] : 0));
  });
  const allValues = stacked ? cumulative.flat() : series.flatMap((item) => item.values);
  const min = stacked ? 0 : Math.min(0, ...allValues);
  const max = Math.max(0, ...allValues);
  const range = max - min || 1;
  const x = (index: number) => labels.length <= 1
    ? (plot.left + viewWidth - plot.right) / 2
    : plot.left + index / (labels.length - 1) * (viewWidth - plot.left - plot.right);
  const y = (value: number) => plot.top + (max - value) / range * (viewHeight - plot.top - plot.bottom);

  return (
    <figure className={mergeClasses('qzl-chart', 'qzl-area-chart', className)} {...props}>
      <figcaption>{title}</figcaption>
      {labels.length === 0 || series.length === 0 ? <p className="qzl-chart__empty">No data to display.</p> : (
        <>
          <div className="qzl-chart__legend">
            {series.map((item, index) => <span key={item.label}><i style={{ backgroundColor: item.color ?? seriesColors[index % seriesColors.length] }} />{item.label}</span>)}
          </div>
          <svg className="qzl-chart__svg" viewBox={`0 0 ${viewWidth} ${viewHeight}`} role="img" aria-label={title}>
            {[0, 1, 2, 3].map((step) => {
              const value = min + range * step / 3;
              const yPosition = y(value);
              return (
                <g key={step}>
                  <line x1={plot.left} x2={viewWidth - plot.right} y1={yPosition} y2={yPosition} stroke="var(--qzl-border)" />
                  <text x={plot.left - 8} y={yPosition + 4} textAnchor="end" fill="var(--qzl-text-soft)">{formatValue(value)}</text>
                </g>
              );
            })}
            {series.map((item, seriesIndex) => {
              const topValues = cumulative[seriesIndex];
              const bottomValues = stacked && seriesIndex > 0
                ? cumulative[seriesIndex - 1]
                : item.values.map(() => 0);
              const topPoints = topValues.map((value, index) => `${x(index)},${y(value)}`);
              const bottomPoints = bottomValues.map((value, index) => `${x(index)},${y(value)}`).reverse();
              const path = `M ${topPoints.join(' L ')} L ${bottomPoints.join(' L ')} Z`;
              const outline = topValues.map((value, index) => `${x(index)},${y(value)}`).join(' ');
              const color = item.color ?? seriesColors[seriesIndex % seriesColors.length];
              return (
                <g key={item.label}>
                  <path d={path} fill={color} fillOpacity="0.16" />
                  <polyline points={outline} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                </g>
              );
            })}
            {labels.map((label, index) => (
              <text key={`${label}-${index}`} x={x(index)} y={viewHeight - 10} textAnchor={index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle'} fill="var(--qzl-text-muted)">{label}</text>
            ))}
          </svg>
          <ol className="qzl-chart__data">
            {labels.map((label, index) => (
              <li key={`${label}-${index}`}>
                <strong>{label}</strong>
                <span>{series.map((item) => `${item.label}: ${formatValue(item.values[index])}`).join(' · ')}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </figure>
  );
}
