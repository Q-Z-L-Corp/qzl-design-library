import React from 'react';
import { mergeClasses } from '@qzl/core';

/** One non-negative slice in a {@link DonutChart}. */
export interface DonutChartDatum {
  /** Category label shown in the legend. */
  label: string;
  /** Finite, non-negative value contributing to the total. */
  value: number;
  /** Optional CSS color for this slice. */
  color?: string;
}

/** Props for {@link DonutChart}, in addition to figure attributes. */
export interface DonutChartProps extends React.HTMLAttributes<HTMLElement> {
  /** Figure caption displayed above the chart. */
  title: string;
  /** Values to render as proportional slices. */
  data: DonutChartDatum[];
  /** Optional label shown inside the ring above its total. */
  centerLabel?: string;
  /**
   * Formats slice values and the center total.
   * @param value Numeric slice or total.
   * @returns Formatted text.
   * @default String
   */
  formatValue?: (value: number) => string;
}

const radius = 68;
const circumference = 2 * Math.PI * radius;
const seriesColors = ['var(--qzl-primary)', 'var(--qzl-accent)', 'var(--qzl-success)', 'var(--qzl-warning)', 'var(--qzl-danger)'];

/**
 * Shows proportional category values as a donut, with a labeled total and text legend.
 *
 * @example
 * ```tsx
 * <DonutChart title="Visitors by device" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} centerLabel="Visitors" />
 * ```
 */
export function DonutChart({ title, data, centerLabel, formatValue = String, className, ...props }: DonutChartProps) {
  if (data.some((datum) => !Number.isFinite(datum.value) || datum.value < 0)) {
    throw new RangeError('Donut chart values must be finite non-negative numbers.');
  }
  const total = data.reduce((sum, datum) => sum + datum.value, 0);
  let offset = 0;

  return (
    <figure className={mergeClasses('qzl-chart', 'qzl-donut-chart', className)} {...props}>
      <figcaption>{title}</figcaption>
      {data.length === 0 ? <p className="qzl-chart__empty">No data to display.</p> : (
        <div className="qzl-donut-chart__layout">
          <div className="qzl-donut-chart__graphic">
            <svg viewBox="0 0 180 180" role="img" aria-label={`${title}: ${data.map((datum) => `${datum.label} ${formatValue(datum.value)}`).join(', ')}`}>
              <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--qzl-primary-subtle)" strokeWidth="24" />
              {data.map((datum, index) => {
                const length = total === 0 ? 0 : datum.value / total * circumference;
                const dashOffset = offset;
                offset += length;
                return (
                  <circle
                    key={`${datum.label}-${index}`}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={datum.color ?? seriesColors[index % seriesColors.length]}
                    strokeWidth="24"
                    strokeDasharray={`${length} ${circumference}`}
                    strokeDashoffset={-dashOffset}
                    transform="rotate(-90 90 90)"
                  />
                );
              })}
            </svg>
            <div className="qzl-donut-chart__center">
              {centerLabel && <span>{centerLabel}</span>}
              <strong>{formatValue(total)}</strong>
            </div>
          </div>
          <ul className="qzl-donut-chart__legend">
            {data.map((datum, index) => (
              <li key={`${datum.label}-${index}`}>
                <span><i style={{ backgroundColor: datum.color ?? seriesColors[index % seriesColors.length] }} />{datum.label}</span>
                <strong>{formatValue(datum.value)}{total > 0 ? ` · ${Math.round(datum.value / total * 100)}%` : ''}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}
