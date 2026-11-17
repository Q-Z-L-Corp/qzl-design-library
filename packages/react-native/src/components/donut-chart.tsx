import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** One non-negative slice in a {@link DonutChart}. */
export interface DonutChartDatum {
  /** Category label shown in the legend. */
  label: string;
  /** Finite, non-negative value contributing to the total. */
  value: number;
  /** Optional slice color. */
  color?: string;
}

/** Props for {@link DonutChart}. */
export interface DonutChartProps {
  /** Chart heading. */
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
  /** Palette used for chart text and default slice colors. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the chart container. */
  style?: StyleProp<ViewStyle>;
}

const radius = 68;
const circumference = 2 * Math.PI * radius;

/**
 * Shows proportional category values as a React Native SVG donut with a text legend.
 *
 * @example
 * <DonutChart title="Visitors by device" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} centerLabel="Visitors" />
 */
export function DonutChart({ title, data, centerLabel, formatValue = String, theme = 'light', style }: DonutChartProps) {
  if (data.some((datum) => !Number.isFinite(datum.value) || datum.value < 0)) {
    throw new RangeError('Donut chart values must be finite non-negative numbers.');
  }
  const colors = themes[theme];
  const seriesColors = [colors.primary, colors.accent, colors.success, colors.warning, colors.danger];
  const total = data.reduce((sum, datum) => sum + datum.value, 0);
  let offset = 0;

  return (
    <View style={style}>
      <Text accessibilityRole="header" style={{ color: colors.text, fontWeight: '700', marginBottom: 10 }}>{title}</Text>
      {data.length === 0 ? <Text style={{ color: colors.textMuted }}>No data to display.</Text> : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}>
          <View style={{ width: 180, height: 180, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={180} height={180} viewBox="0 0 180 180" accessible={false}>
              <Circle cx={90} cy={90} r={radius} fill="none" stroke={colors.primarySubtle} strokeWidth={24} />
              {data.map((datum, index) => {
                const length = total === 0 ? 0 : datum.value / total * circumference;
                const dashOffset = offset;
                offset += length;
                return (
                  <Circle
                    key={`${datum.label}-${index}`}
                    cx={90}
                    cy={90}
                    r={radius}
                    fill="none"
                    stroke={datum.color ?? seriesColors[index % seriesColors.length]}
                    strokeWidth={24}
                    strokeDasharray={`${length} ${circumference}`}
                    strokeDashoffset={-dashOffset}
                    transform="rotate(-90 90 90)"
                  />
                );
              })}
            </Svg>
            <View pointerEvents="none" style={{ position: 'absolute', alignItems: 'center' }}>
              {centerLabel && <Text style={{ color: colors.textMuted, fontSize: 11 }}>{centerLabel}</Text>}
              <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>{formatValue(total)}</Text>
            </View>
          </View>
          <View style={{ flex: 1, minWidth: 140, gap: 9 }}>
            {data.map((datum, index) => (
              <View key={`${datum.label}-${index}`} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, flexShrink: 1 }}>
                  <View accessibilityElementsHidden style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: datum.color ?? seriesColors[index % seriesColors.length] }} />
                  <Text style={{ color: colors.textMuted, fontSize: 12, flexShrink: 1 }}>{datum.label}</Text>
                </View>
                <Text style={{ color: colors.text, fontSize: 12 }}>{formatValue(datum.value)}{total > 0 ? ` · ${Math.round(datum.value / total * 100)}%` : ''}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
