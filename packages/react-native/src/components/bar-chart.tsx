import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface BarChartDatum {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  title: string;
  data: BarChartDatum[];
  formatValue?: (value: number) => string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

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
