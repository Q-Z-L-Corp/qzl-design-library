import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface BarChartDatum {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  data: BarChartDatum[];
  formatValue?: (value: number) => string;
}

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
