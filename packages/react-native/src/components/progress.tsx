import React from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { clamp } from '@qzl/core';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for a determinate or unset React Native progress indicator. */
export interface ProgressProps {
  /** Current progress value; omitted values render an empty bar without an accessibility `now`. */
  value?: number;
  /** Lower bound for clamping and the accessibility value. @default 0 */
  min?: number;
  /** Upper bound for clamping; must be greater than `min`. @default 100 */
  max?: number;
  /** Accessible label describing the progress task. */
  label: string;
  /** Palette used for the track and filled portion. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the outer progress track. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays clamped progress in a React Native view and exposes its range through accessibility values.
 *
 * @example
 * <Progress label="Upload" value={uploaded} max={total} />
 */
export function Progress({ value, min = 0, max = 100, label, theme = 'light', style }: ProgressProps) {
  if (max <= min) throw new RangeError('Progress max must be greater than min.');
  const colors = themes[theme];
  const percentage = value === undefined ? 0 : clamp(((value - min) / (max - min)) * 100, 0, 100);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min, max, now: value === undefined ? undefined : clamp(value, min, max) }}
      style={[{ height: 8, overflow: 'hidden', borderRadius: 999, backgroundColor: colors.primarySubtle }, style]}
    >
      <View style={{ width: `${percentage}%`, height: '100%', borderRadius: 999, backgroundColor: colors.primary }} />
    </View>
  );
}
