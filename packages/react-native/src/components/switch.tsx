import React from 'react';
import { Switch as NativeSwitch } from 'react-native';
import type { SwitchProps as NativeSwitchProps } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for the controlled React Native switch. */
export interface SwitchProps extends Omit<NativeSwitchProps, 'value' | 'onValueChange' | 'trackColor' | 'thumbColor'> {
  /** Whether the switch is on. */
  checked: boolean;
  /**
   * Called when the React Native switch changes state.
   * @param checked The new on/off state.
   */
  onCheckedChange: (checked: boolean) => void;
  /** Palette used for the track and thumb. @default 'light' */
  theme?: ThemeName;
}

/**
 * Wraps React Native's switch with a controlled checked value and themed colors.
 *
 * @example
 * <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
 */
export function Switch({ checked, onCheckedChange, theme = 'light', ...props }: SwitchProps) {
  const colors = themes[theme];

  return (
    <NativeSwitch
      value={checked}
      onValueChange={onCheckedChange}
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={colors.surface}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: props.disabled }}
      {...props}
    />
  );
}
