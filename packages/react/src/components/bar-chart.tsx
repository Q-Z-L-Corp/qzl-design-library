import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** One labeled numeric value rendered as a bar by {@link BarChart}. */
export interface BarChartDatum {
  /** Category label shown beside the bar. */
  label: string;
  /** Finite numeric value determining bar size and direction. */
  value: number;
  /** Optional CSS color applied to this datum's bar. */
  color?: string;
}

/** A category containing values keyed by the corresponding {@link BarChartSeries.key}. */
export interface BarChartMultiSeriesDatum {
  /** Category label shown beside the grouped or stacked bars. */
  label: string;
  /** Finite numeric values keyed by each declared series key. */
  values: Record<string, number>;
}

/** A labeled series used to render grouped or stacked bars. */
export interface BarChartSeries {
  /** Stable key used to read values from each multi-series datum. */
  key: string;
  /** Text identifying this series in the legend and data summary. */
  label: string;
  /** Optional CSS color for this series. */
  color?: string;
}

/** Props for {@link BarChart}, in addition to figure attributes. */
export interface BarChartProps extends React.HTMLAttributes<HTMLElement> {
  /** Category values. Use `value` for one series or `values` with `series` for multiple series. */
  data: Array<BarChartDatum | BarChartMultiSeriesDatum>;
  /** Series definitions for grouped or stacked data. Each datum must contain a value for every key. */
  series?: BarChartSeries[];
  /** Figure caption displayed above the chart. */
  title: string;
  /** Bar direction. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** How multiple series are arranged. Stacked values must be non-negative. @default 'grouped' */
  mode?: 'grouped' | 'stacked';
  /**
   * Formats each numeric value for display alongside its bar.
   * @param value Datum value.
   * @returns Text displayed for that value.
   * @default String
   */
  formatValue?: (value: number) => string;
}

const seriesColors = [
  'var(--qzl-primary)',
  'var(--qzl-accent)',
  'var(--qzl-success)',
  'var(--qzl-warning)',
  'var(--qzl-danger)'
];

/**
 * Renders horizontal or vertical bars, with grouped and stacked multi-series layouts.
 * The accessible data labels remain available alongside the visual bars.
 *
 * @example
 * ```tsx
 * <BarChart title="Monthly signups" data={[{ label: 'Jan', value: 24 }]} orientation="vertical" />
 * ```
 * @example
 * ```tsx
 * <BarChart
 *   title="Quarterly signups"
 *   data={[{ label: 'Q1', values: { organic: 24, referral: 12 } }]}
 *   series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]}
 *   mode="stacked"
 * />
 * ```
 */
export function BarChart({
  title,
  data,
  series,
  orientation = 'horizontal',
  mode = 'grouped',
  formatValue = String,
  className,
  ...props
}: BarChartProps) {
  if (series && series.length === 0) throw new RangeError('Bar chart series must contain at least one series.');
  if (series && (series.some((item) => !item.key || !item.label) || new Set(series.map((item) => item.key)).size !== series.length)) {
    throw new TypeError('Bar chart series require unique, non-empty keys and labels.');
  }

  const chartSeries = series ?? [{ key: 'value', label: 'Value' }];
  const valuesByDatum = data.map((datum) => {
    if (series) {
      if (!('values' in datum)) throw new TypeError('Multi-series bar chart data must provide values keyed by series.');
      return chartSeries.map(({ key }) => {
        const value = datum.values[key];
        if (!Number.isFinite(value)) throw new RangeError(`Bar chart value for "${key}" must be a finite number.`);
        return value;
      });
    }

    if (!('value' in datum) || !Number.isFinite(datum.value)) {
      throw new RangeError('Bar chart values must be finite numbers.');
    }
    return [datum.value];
  });

  if (mode === 'stacked' && valuesByDatum.some((values) => values.some((value) => value < 0))) {
    throw new RangeError('Stacked bar chart values must be non-negative.');
  }

  const values = valuesByDatum.flat();
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const range = max - min || 1;
  const baseline = (0 - min) / range * 100;
  const stackMax = Math.max(1, ...valuesByDatum.map((row) => row.reduce((sum, value) => sum + value, 0)));

  return (
    <figure className={mergeClasses('qzl-bar-chart', `qzl-bar-chart--${orientation}`, `qzl-bar-chart--${mode}`, className)} {...props}>
      <figcaption>{title}</figcaption>
      {series && series.length > 1 && (
        <ul className="qzl-bar-chart__legend">
          {series.map((item, index) => (
            <li key={item.key}><span style={{ backgroundColor: item.color ?? seriesColors[index % seriesColors.length] }} />{item.label}</li>
          ))}
        </ul>
      )}
      {data.length === 0 ? <p className="qzl-bar-chart__empty">No data to display.</p> : (
        <ol className="qzl-bar-chart__list">
          {data.map((datum, datumIndex) => {
            const datumValues = valuesByDatum[datumIndex];
            let stackedOffset = 0;
            return (
              <li className="qzl-bar-chart__item" key={`${datum.label}-${datumIndex}`}>
                <span className="qzl-bar-chart__label">{datum.label}</span>
                <span
                  className={`qzl-bar-chart__track qzl-bar-chart__track--${orientation}`}
                  style={orientation === 'horizontal' ? { height: `${Math.max(12, 12 * datumValues.length)}px` } : undefined}
                  aria-hidden="true"
                >
                  {(mode === 'stacked' ? [datumValues] : datumValues.map((value) => [value])).flatMap((barValues, groupIndex) => {
                    const valueIndex = mode === 'stacked' ? groupIndex : 0;
                    const value = barValues[valueIndex];
                    const chartDatum = datum as BarChartDatum;
                    const color = series?.[groupIndex]?.color
                      ?? (!series ? chartDatum.color : undefined)
                      ?? seriesColors[groupIndex % seriesColors.length];
                    const stackedLeft = stackedOffset / stackMax * 100;
                    const stackedWidth = value / stackMax * 100;
                    stackedOffset += value;
                    const isStacked = mode === 'stacked';
                    const size = isStacked
                      ? orientation === 'horizontal' ? { left: `${stackedLeft}%`, width: `${stackedWidth}%` } : { bottom: `${stackedLeft}%`, height: `${stackedWidth}%` }
                      : orientation === 'horizontal'
                        ? { left: `${value < 0 ? baseline - Math.abs(value) / range * 100 : baseline}%`, width: `${Math.abs(value) / range * 100}%` }
                        : { top: `${value < 0 ? max / range * 100 : (max - value) / range * 100}%`, height: `${Math.abs(value) / range * 100}%`, left: `${groupIndex / datumValues.length * 100}%`, width: `${100 / datumValues.length}%` };
                    return (
                      <span
                        key={`${datum.label}-${groupIndex}`}
                        className="qzl-bar-chart__bar"
                        style={{
                          ...size,
                          ...(mode === 'stacked'
                            ? orientation === 'horizontal' ? { top: '0%', height: '100%' } : { left: '0%', width: '100%' }
                            : {}),
                          ...(mode === 'grouped' && orientation === 'horizontal'
                            ? { top: `${groupIndex / datumValues.length * 100}%`, height: `${100 / datumValues.length}%` }
                            : {}),
                          backgroundColor: color
                        }}
                      />
                    );
                  })}
                  {mode === 'grouped' && <span className={`qzl-bar-chart__baseline qzl-bar-chart__baseline--${orientation}`} style={orientation === 'horizontal' ? { left: `${baseline}%` } : { top: `${max / range * 100}%` }} />}
                </span>
                <span className="qzl-bar-chart__values">
                  {datumValues.map((value, seriesIndex) => (
                    <span key={chartSeries[seriesIndex].key}>
                      {series && series.length > 1 ? `${chartSeries[seriesIndex].label}: ` : ''}
                      {formatValue(value)}
                    </span>
                  ))}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </figure>
  );
}
