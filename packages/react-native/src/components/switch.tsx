import React from 'react';
import { Switch as NativeSwitch } from 'react-native';
import type { SwitchProps as NativeSwitchProps } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface SwitchProps extends Omit<NativeSwitchProps, 'value' | 'onValueChange' | 'trackColor' | 'thumbColor'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  theme?: ThemeName;
}

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
