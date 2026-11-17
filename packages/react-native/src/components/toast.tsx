import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface ToastProps {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  onDismiss?: () => void;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Toast({ title, description, variant = 'info', onDismiss, theme = 'light', style }: ToastProps) {
  const colors = themes[theme];
  const palette = {
    info: { color: colors.primary, background: colors.primarySubtle, border: colors.primaryBorder },
    success: { color: colors.success, background: colors.successSubtle, border: colors.successBorder },
    warning: { color: colors.warning, background: colors.warningSubtle, border: colors.warningBorder },
    danger: { color: colors.danger, background: colors.dangerSubtle, border: colors.dangerBorder }
  }[variant];

  return (
    <View
      accessibilityRole={variant === 'danger' ? 'alert' : 'text'}
      accessibilityLiveRegion={variant === 'danger' ? 'assertive' : 'polite'}
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.background }, style]}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: palette.color, fontWeight: '700' }}>{title}</Text>
        {description && <Text style={{ color: colors.text, marginTop: 3 }}>{description}</Text>}
      </View>
      {onDismiss && (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss notification" onPress={onDismiss} hitSlop={8}>
          <Text style={{ color: colors.textMuted, fontSize: 20 }}>×</Text>
        </Pressable>
      )}
    </View>
  );
}
