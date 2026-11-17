import React from 'react';
import NativeSlider from '@react-native-community/slider';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Slider({ label, value, onValueChange, onValueCommit, min = 0, max = 100, step = 1, theme = 'light', style }: SliderProps) {
  if (max <= min) throw new RangeError('Slider max must be greater than min.');
  const colors = themes[theme];

  return (
    <NativeSlider
      accessibilityLabel={label}
      minimumValue={min}
      maximumValue={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      onSlidingComplete={onValueCommit}
      minimumTrackTintColor={colors.primary}
      maximumTrackTintColor={colors.border}
      thumbTintColor={colors.primary}
      style={style}
    />
  );
}
