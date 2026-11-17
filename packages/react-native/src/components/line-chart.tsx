import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Line as SvgLine, Polyline, Text as SvgText } from 'react-native-svg';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** One named line whose values align with the chart's labels. */
export interface LineChartSeries {
  /** Text identifying this line in the legend. */
  label: string;
  /** Finite numeric values, one for each chart label. */
  values: number[];
  /** Optional line and point color. */
  color?: string;
}

/** Props for {@link LineChart}. */
export interface LineChartProps {
  /** Chart heading. */
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
  /** Palette used for chart text, grid lines, and default series colors. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the chart container. */
  style?: StyleProp<ViewStyle>;
}

const viewWidth = 360;
const viewHeight = 220;
const plot = { left: 40, right: 8, top: 12, bottom: 34 };

/**
 * Renders one or more time series with React Native SVG and a readable text data summary.
 *
 * @example
 * <LineChart title="Weekly visits" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [120, 156, 142] }]} />
 */
export function LineChart({ title, labels, series, formatValue = String, theme = 'light', style }: LineChartProps) {
  for (const item of series) {
    if (!item.label) throw new TypeError('Line chart series labels must not be empty.');
    if (item.values.length !== labels.length) throw new RangeError('Each line chart series must have one value per label.');
    if (item.values.some((value) => !Number.isFinite(value))) throw new RangeError('Line chart values must be finite numbers.');
  }
  if (new Set(series.map((item) => item.label)).size !== series.length) throw new TypeError('Line chart series labels must be unique.');

  const colors = themes[theme];
  const seriesColors = [colors.primary, colors.accent, colors.success, colors.warning, colors.danger];
  const allValues = series.flatMap((item) => item.values);
  const min = Math.min(0, ...allValues);
  const max = Math.max(0, ...allValues);
  const range = max - min || 1;
  const x = (index: number) => labels.length <= 1
    ? (plot.left + viewWidth - plot.right) / 2
    : plot.left + index / (labels.length - 1) * (viewWidth - plot.left - plot.right);
  const y = (value: number) => plot.top + (max - value) / range * (viewHeight - plot.top - plot.bottom);

  return (
    <View style={style}>
      <Text accessibilityRole="header" style={{ color: colors.text, fontWeight: '700', marginBottom: 10 }}>{title}</Text>
      {labels.length === 0 || series.length === 0 ? <Text style={{ color: colors.textMuted }}>No data to display.</Text> : (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
            {series.map((item, index) => (
              <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <View accessibilityElementsHidden style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.color ?? seriesColors[index % seriesColors.length] }} />
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>{item.label}</Text>
              </View>
            ))}
          </View>
          <Svg width="100%" height={viewHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
            {[0, 1, 2, 3].map((step) => {
              const value = min + range * step / 3;
              const yPosition = y(value);
              return (
                <React.Fragment key={step}>
                  <SvgLine x1={plot.left} x2={viewWidth - plot.right} y1={yPosition} y2={yPosition} stroke={colors.border} />
                  <SvgText x={plot.left - 7} y={yPosition + 4} textAnchor="end" fill={colors.textSoft} fontSize={9}>{formatValue(value)}</SvgText>
                </React.Fragment>
              );
            })}
            {series.map((item, seriesIndex) => {
              const points = item.values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
              const color = item.color ?? seriesColors[seriesIndex % seriesColors.length];
              return (
                <React.Fragment key={item.label}>
                  <Polyline points={points} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
                  {item.values.map((value, index) => <Circle key={`${item.label}-${index}`} cx={x(index)} cy={y(value)} r={3.5} fill={colors.surface} stroke={color} strokeWidth={2} />)}
                </React.Fragment>
              );
            })}
            {labels.map((label, index) => (
              <SvgText key={`${label}-${index}`} x={x(index)} y={viewHeight - 8} textAnchor={index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle'} fill={colors.textMuted} fontSize={9}>{label}</SvgText>
            ))}
          </Svg>
          <View style={{ gap: 5, marginTop: 4 }}>
            {labels.map((label, index) => (
              <View key={`${label}-${index}`} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <Text style={{ color: colors.textMuted, fontSize: 11 }}>{label}</Text>
                <Text style={{ color: colors.text, fontSize: 11, textAlign: 'right', flexShrink: 1 }}>{series.map((item) => `${item.label}: ${formatValue(item.values[index])}`).join(' · ')}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
