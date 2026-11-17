import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  theme = 'light',
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const colors = themes[theme];
  const isDisabled = disabled || loading;
  const primary = variant === 'primary';
  const danger = variant === 'danger';
  const foreground = primary ? colors.primaryForeground : danger ? '#ffffff' : variant === 'ghost' ? colors.primary : colors.text;
  const background = primary ? colors.primary : danger ? colors.danger : variant === 'ghost' ? 'transparent' : colors.surface;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          minHeight: size === 'sm' ? 36 : size === 'lg' ? 48 : 44,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: size === 'sm' ? 12 : size === 'lg' ? 20 : 16,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: colors.border,
          borderRadius: 12,
          backgroundColor: background,
          opacity: isDisabled ? 0.5 : pressed ? 0.84 : 1
        },
        style
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={foreground} />
      ) : (
        <Text style={[{ color: foreground, fontSize: size === 'sm' ? 13 : size === 'lg' ? 15 : 14, fontWeight: '600' }, textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
