import React from 'react';
import { mergeClasses } from '@qzl/core';

/** One labeled numeric value rendered as a bar by {@link BarChart}. */
export interface BarChartDatum {
  /** Category label shown beside the bar. */
  label: string;
  /** Finite numeric value determining bar size and direction. */
  value: number;
  /** Optional CSS color applied to this datum's bar. */
  color?: string;
}

/** Props for {@link BarChart}, in addition to figure attributes. */
export interface BarChartProps extends React.HTMLAttributes<HTMLElement> {
  /** Figure caption displayed above the chart. */
  title: string;
  /** Values to render, one bar per datum. */
  data: BarChartDatum[];
  /**
   * Formats each numeric value for display alongside its bar.
   * @param value Datum value.
   * @returns Text displayed for that value.
   * @default String
   */
  formatValue?: (value: number) => string;
}

/**
 * Renders a figure containing a labeled bar for each finite value, including values below zero.
 *
 * @example
 * ```tsx
 * <BarChart title="Monthly signups" data={[{ label: 'Jan', value: 24 }]} />
 * ```
 */
export function BarChart({ title, data, formatValue = String, className, ...props }: BarChartProps) {
  if (data.some((datum) => !Number.isFinite(datum.value))) throw new RangeError('Bar chart values must be finite numbers.');
  const min = Math.min(0, ...data.map((datum) => datum.value));
  const max = Math.max(0, ...data.map((datum) => datum.value));
  const range = max - min;
  const baseline = range === 0 ? 0 : (0 - min) / range * 100;

  return (
    <figure className={mergeClasses('qzl-bar-chart', className)} {...props}>
      <figcaption>{title}</figcaption>
      <ol>
        {data.map((datum) => (
          <li key={datum.label}>
            <span className="qzl-bar-chart__label">{datum.label}</span>
            <span className="qzl-bar-chart__track" aria-hidden="true">
              <span
                className="qzl-bar-chart__bar"
                style={{
                  left: `${datum.value < 0 ? baseline - Math.abs(datum.value) / range * 100 : baseline}%`,
                  width: `${range === 0 ? 0 : Math.abs(datum.value) / range * 100}%`,
                  backgroundColor: datum.color
                }}
              />
            </span>
            <data value={datum.value}>{formatValue(datum.value)}</data>
          </li>
        ))}
      </ol>
    </figure>
  );
}
