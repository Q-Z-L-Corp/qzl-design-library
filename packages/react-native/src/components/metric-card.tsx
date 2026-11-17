import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Direction used to style and describe a metric's change. */
export type MetricTrend = 'positive' | 'negative' | 'neutral';

/** Props for {@link MetricCard}. */
export interface MetricCardProps {
  /** Short name for the metric. */
  label: string;
  /** Preformatted value or number displayed as the primary figure. */
  value: string | number;
  /** Optional change text, such as `+8.2%`. */
  change?: string;
  /** Direction of the change; the text remains available independently of color. @default 'neutral' */
  trend?: MetricTrend;
  /** Context for the change, such as `vs. previous 30 days`. */
  comparison?: string;
  /** Optional supporting text below the value. */
  description?: string;
  /** Palette used for the card text and status color. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the card container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Presents a key metric with optional change, comparison period, and supporting context.
 *
 * @example
 * <MetricCard label="Monthly visits" value="24,815" change="+8.2%" trend="positive" comparison="vs. previous 30 days" />
 */
export function MetricCard({ label, value, change, trend = 'neutral', comparison, description, theme = 'light', style }: MetricCardProps) {
  const colors = themes[theme];
  const trendColor = trend === 'positive' ? colors.success : trend === 'negative' ? colors.danger : colors.textMuted;

  return (
    <View accessibilityLabel={`${label}: ${value}${change ? `, ${change}` : ''}${comparison ? `, ${comparison}` : ''}`} style={[{ gap: 6, padding: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface }, style]}>
      <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>{label}</Text>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{value}</Text>
      {(change || comparison) && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {change && <Text style={{ color: trendColor, fontSize: 12, fontWeight: '600' }}>{change}</Text>}
          {comparison && <Text style={{ color: colors.textMuted, fontSize: 12 }}>{comparison}</Text>}
        </View>
      )}
      {description && <Text style={{ color: colors.textMuted, fontSize: 12, lineHeight: 18 }}>{description}</Text>}
    </View>
  );
}
