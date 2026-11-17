import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** One named line whose values align with the chart's labels. */
export interface LineChartSeries {
  /** Text identifying this line in the legend. */
  label: string;
  /** Finite numeric values, one for each chart label. */
  values: number[];
  /** Optional CSS color for the line and points. */
  color?: string;
}

/** Props for {@link LineChart}, in addition to figure attributes. */
export interface LineChartProps extends React.HTMLAttributes<HTMLElement> {
  /** Figure caption displayed above the chart. */
  title: string;
  /** Ordered category or time labels shared by every series. */
  labels: string[];
  /** One or more line series. Each series must contain one value per label. */
  series: LineChartSeries[];
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
 * Renders one or more time series with shared category labels and a readable data summary.
 *
 * @example
 * ```tsx
 * <LineChart
 *   title="Weekly visits"
 *   labels={['Mon', 'Tue', 'Wed']}
 *   series={[{ label: 'Visits', values: [120, 156, 142] }]}
 * />
 * ```
 */
export function LineChart({ title, labels, series, formatValue = String, className, ...props }: LineChartProps) {
  for (const item of series) {
    if (!item.label) throw new TypeError('Line chart series labels must not be empty.');
    if (item.values.length !== labels.length) throw new RangeError('Each line chart series must have one value per label.');
    if (item.values.some((value) => !Number.isFinite(value))) throw new RangeError('Line chart values must be finite numbers.');
  }
  if (new Set(series.map((item) => item.label)).size !== series.length) throw new TypeError('Line chart series labels must be unique.');

  const allValues = series.flatMap((item) => item.values);
  const min = Math.min(0, ...allValues);
  const max = Math.max(0, ...allValues);
  const range = max - min || 1;
  const x = (index: number) => labels.length <= 1
    ? (plot.left + viewWidth - plot.right) / 2
    : plot.left + index / (labels.length - 1) * (viewWidth - plot.left - plot.right);
  const y = (value: number) => plot.top + (max - value) / range * (viewHeight - plot.top - plot.bottom);

  return (
    <figure className={mergeClasses('qzl-chart', 'qzl-line-chart', className)} {...props}>
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
              const points = item.values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
              return (
                <g key={item.label}>
                  <polyline points={points} fill="none" stroke={item.color ?? seriesColors[seriesIndex % seriesColors.length]} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  {item.values.map((value, index) => <circle key={`${item.label}-${index}`} cx={x(index)} cy={y(value)} r="4" fill="var(--qzl-surface)" stroke={item.color ?? seriesColors[seriesIndex % seriesColors.length]} strokeWidth="2" />)}
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
