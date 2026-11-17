import React from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { clamp } from '@qzl/core';
import { themes, type ThemeName } from '@qzl/tokens';

export interface ProgressProps {
  value?: number;
  min?: number;
  max?: number;
  label: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

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
