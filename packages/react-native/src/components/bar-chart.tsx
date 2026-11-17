import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** One labeled numeric value rendered as a bar by {@link BarChart}. */
export interface BarChartDatum {
  /** Text identifying this datum. */
  label: string;
  /** Finite numeric value; negative values extend from the zero baseline. */
  value: number;
  /** Optional bar fill color, overriding the selected theme's primary color. */
  color?: string;
}

/** A category containing values keyed by the corresponding {@link BarChartSeries.key}. */
export interface BarChartMultiSeriesDatum {
  /** Text identifying this category. */
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
  /** Optional bar fill color. */
  color?: string;
}

/** Props for a horizontal or vertical bar chart. */
export interface BarChartProps {
  /** Chart heading, also exposed as the container accessibility label. */
  title: string;
  /** Category values. Use `value` for one series or `values` with `series` for multiple series. */
  data: Array<BarChartDatum | BarChartMultiSeriesDatum>;
  /** Series definitions for grouped or stacked data. Each datum must contain a value for every key. */
  series?: BarChartSeries[];
  /** Bar direction. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** How multiple series are arranged. Stacked values must be non-negative. @default 'grouped' */
  mode?: 'grouped' | 'stacked';
  /**
   * Formats each numeric value for display.
   * @param value Numeric datum value to format.
   * @returns Formatted text.
   * @default String
   */
  formatValue?: (value: number) => string;
  /** Palette used for chart text, tracks, and default bars. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the chart container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders bars in React Native views, with horizontal or vertical, grouped or stacked layouts.
 * The category labels and values remain visible as text.
 *
 * @example
 * <BarChart title="Weekly signups" data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} />
 * @example
 * <BarChart title="Quarterly signups" data={[{ label: 'Q1', values: { organic: 24, referral: 12 } }]} series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]} mode="stacked" />
 */
export function BarChart({
  title,
  data,
  series,
  orientation = 'horizontal',
  mode = 'grouped',
  formatValue = String,
  theme = 'light',
  style
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

    if (!('value' in datum) || !Number.isFinite(datum.value)) throw new RangeError('Bar chart values must be finite numbers.');
    return [datum.value];
  });
  if (mode === 'stacked' && valuesByDatum.some((values) => values.some((value) => value < 0))) {
    throw new RangeError('Stacked bar chart values must be non-negative.');
  }

  const colors = themes[theme];
  const seriesColors = [colors.primary, colors.accent, colors.success, colors.warning, colors.danger];
  const allValues = valuesByDatum.flat();
  const min = Math.min(0, ...allValues);
  const max = Math.max(0, ...allValues);
  const range = max - min || 1;
  const baseline = (0 - min) / range * 100;
  const stackMax = Math.max(1, ...valuesByDatum.map((row) => row.reduce((sum, value) => sum + value, 0)));

  return (
    <View style={style}>
      <Text accessibilityRole="header" style={{ color: colors.text, fontWeight: '700', marginBottom: 10 }}>{title}</Text>
      {series && series.length > 1 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          {series.map((item, index) => (
            <View key={item.key} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View accessibilityElementsHidden style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.color ?? seriesColors[index % seriesColors.length] }} />
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>{item.label}</Text>
            </View>
          ))}
        </View>
      )}
      {data.length === 0 ? <Text style={{ color: colors.textMuted }}>No data to display.</Text> : orientation === 'horizontal' ? (
        <View style={{ gap: 12 }}>
          {data.map((datum, datumIndex) => {
            const datumValues = valuesByDatum[datumIndex];
            let stackedOffset = 0;
            return (
              <View key={`${datum.label}-${datumIndex}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ width: 76, color: colors.textMuted, fontSize: 12 }}>{datum.label}</Text>
                <View style={{ flex: 1, height: Math.max(12, 12 * datumValues.length), borderRadius: 99, backgroundColor: colors.primarySubtle, overflow: 'hidden', position: 'relative' }}>
                  {mode === 'grouped' && <View style={{ position: 'absolute', top: 0, bottom: 0, left: `${baseline}%`, width: 1, backgroundColor: colors.border }} />}
                  {datumValues.map((value, seriesIndex) => {
                    const chartDatum = datum as BarChartDatum;
                    const color = series?.[seriesIndex]?.color ?? (!series ? chartDatum.color : undefined) ?? seriesColors[seriesIndex % seriesColors.length];
                    const left = mode === 'stacked' ? stackedOffset / stackMax * 100 : value < 0 ? baseline - Math.abs(value) / range * 100 : baseline;
                    const width = mode === 'stacked' ? value / stackMax * 100 : Math.abs(value) / range * 100;
                    const top = mode === 'stacked' ? 0 : seriesIndex / datumValues.length * 100;
                    const height = mode === 'stacked' ? 100 : 100 / datumValues.length;
                    stackedOffset += value;
                    return <View key={chartSeries[seriesIndex].key} style={{ position: 'absolute', top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%`, backgroundColor: color }} />;
                  })}
                </View>
                <Text style={{ width: 88, color: colors.text, fontSize: 11, textAlign: 'right' }}>
                  {datumValues.map((value, index) => `${series && series.length > 1 ? `${chartSeries[index].label}: ` : ''}${formatValue(value)}`).join(' · ')}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, minHeight: 230 }}>
          {data.map((datum, datumIndex) => {
            const datumValues = valuesByDatum[datumIndex];
            let stackedOffset = 0;
            return (
              <View key={`${datum.label}-${datumIndex}`} style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                <View style={{ width: '100%', height: 170, borderRadius: 7, backgroundColor: colors.primarySubtle, overflow: 'hidden', position: 'relative' }}>
                  {mode === 'grouped' && <View style={{ position: 'absolute', top: `${max / range * 100}%`, left: 0, right: 0, height: 1, backgroundColor: colors.border }} />}
                  {datumValues.map((value, seriesIndex) => {
                    const chartDatum = datum as BarChartDatum;
                    const color = series?.[seriesIndex]?.color ?? (!series ? chartDatum.color : undefined) ?? seriesColors[seriesIndex % seriesColors.length];
                    const bottom = mode === 'stacked' ? stackedOffset / stackMax * 100 : 0;
                    const height = mode === 'stacked' ? value / stackMax * 100 : Math.abs(value) / range * 100;
                    const top = mode === 'stacked' ? undefined : value < 0 ? max / range * 100 : (max - value) / range * 100;
                    const left = mode === 'stacked' ? 0 : seriesIndex / datumValues.length * 100;
                    const width = mode === 'stacked' ? 100 : 100 / datumValues.length;
                    stackedOffset += value;
                    return <View key={chartSeries[seriesIndex].key} style={{ position: 'absolute', top: top === undefined ? undefined : `${top}%`, bottom: mode === 'stacked' ? `${bottom}%` : undefined, left: `${left}%`, width: `${width}%`, height: `${height}%`, backgroundColor: color }} />;
                  })}
                </View>
                <Text style={{ color: colors.textMuted, fontSize: 11, textAlign: 'center' }}>{datum.label}</Text>
                <Text style={{ color: colors.text, fontSize: 10, textAlign: 'center' }}>
                  {datumValues.map((value, index) => `${series && series.length > 1 ? `${chartSeries[index].label}: ` : ''}${formatValue(value)}`).join(' · ')}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
