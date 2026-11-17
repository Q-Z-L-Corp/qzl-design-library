import React from 'react';
import NativeSlider from '@react-native-community/slider';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a controlled community slider. */
export interface SliderProps {
  /** Accessible label for the slider. */
  label: string;
  /** Current slider position. */
  value: number;
  /**
   * Called while the slider position changes.
   * @param value Current numeric slider value.
   */
  onValueChange: (value: number) => void;
  /**
   * Called when the slider interaction is completed.
   * @param value Final numeric slider value.
   */
  onValueCommit?: (value: number) => void;
  /** Minimum value; must be less than `max`. @default 0 */
  min?: number;
  /** Maximum value; must be greater than `min`. @default 100 */
  max?: number;
  /** Slider increment. @default 1 */
  step?: number;
  /** Palette used for the track and thumb. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the community slider. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Wraps `@react-native-community/slider`, forwarding value changes and completion callbacks.
 *
 * @example
 * <Slider label="Volume" value={volume} onValueChange={setVolume} onValueCommit={saveVolume} />
 */
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
