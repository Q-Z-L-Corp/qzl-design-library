import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a themed status notification with an optional dismiss action. */
export interface ToastProps {
  /** Short notification heading. */
  title: string;
  /** Optional supporting message. */
  description?: string;
  /** Semantic color treatment and platform announcement behavior. @default 'info' */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Optional action shown as a dismiss button. */
  onDismiss?: () => void;
  /** Palette used for text, border, and surface. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the notification container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a status message; danger uses an alert role and assertive live region.
 *
 * @example
 * <Toast title="Saved" description="Your changes are up to date." variant="success" />
 */
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
