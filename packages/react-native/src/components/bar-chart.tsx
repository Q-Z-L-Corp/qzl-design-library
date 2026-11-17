import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** One labeled numeric value rendered as a horizontal bar. */
export interface BarChartDatum {
  /** Text identifying this datum. */
  label: string;
  /** Finite numeric value; negative values extend left of the zero baseline. */
  value: number;
  /** Optional bar fill color, overriding the selected theme's primary color. */
  color?: string;
}

/** Props for a simple labeled horizontal bar chart. */
export interface BarChartProps {
  /** Chart heading, also exposed as the container accessibility label. */
  title: string;
  /** Values to render in input order. Each value must be finite. */
  data: BarChartDatum[];
  /**
   * Formats each numeric value for display.
   * @param value Numeric datum value to format.
   * @default String
   */
  formatValue?: (value: number) => string;
  /** Palette used for chart text, tracks, and default bars. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the chart container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a bar chart in React Native views with a shared zero baseline.
 *
 * @example
 * <BarChart title="Weekly signups" data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} />
 */
export function BarChart({ title, data, formatValue = String, theme = 'light', style }: BarChartProps) {
  const colors = themes[theme];
  if (data.some((datum) => !Number.isFinite(datum.value))) throw new RangeError('Bar chart values must be finite numbers.');
  const min = Math.min(0, ...data.map((datum) => datum.value));
  const max = Math.max(0, ...data.map((datum) => datum.value));
  const range = max - min;
  const baseline = range === 0 ? 0 : (0 - min) / range * 100;

  return (
    <View accessibilityLabel={title} style={style}>
      <Text accessibilityRole="header" style={{ color: colors.text, fontWeight: '700', marginBottom: 10 }}>{title}</Text>
      {data.map((datum) => (
        <View key={datum.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Text style={{ width: 80, color: colors.textMuted, fontSize: 12 }}>{datum.label}</Text>
          <View style={{ flex: 1, height: 10, borderRadius: 99, backgroundColor: colors.primarySubtle, overflow: 'hidden', position: 'relative' }}>
            <View style={{ position: 'absolute', left: `${datum.value < 0 ? baseline - Math.abs(datum.value) / range * 100 : baseline}%`, width: `${range === 0 ? 0 : Math.abs(datum.value) / range * 100}%`, height: '100%', backgroundColor: datum.color ?? colors.primary }} />
          </View>
          <Text style={{ width: 48, color: colors.text, fontSize: 12, textAlign: 'right' }}>{formatValue(datum.value)}</Text>
        </View>
      ))}
    </View>
  );
}
