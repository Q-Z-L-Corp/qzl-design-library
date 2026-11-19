import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for the themed React Native pressable button. */
export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Button text; replaced by an activity indicator while loading. */
  title: string;
  /** Visual treatment of the button. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Preset control height and text size. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Shows an activity indicator and disables pressing. @default false */
  loading?: boolean;
  /** Palette used for button colors. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the pressable. */
  style?: StyleProp<ViewStyle>;
  /** Additional style applied to the title. */
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Renders a React Native pressable button with disabled and busy accessibility states.
 *
 * @example
 * <Button title="Save changes" onPress={saveChanges} />
 */
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
  const foreground = primary ? colors.primaryForeground : danger ? colors.dangerForeground : variant === 'ghost' ? colors.primary : colors.text;
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
