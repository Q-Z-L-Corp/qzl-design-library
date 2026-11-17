import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a press-to-reveal help message. */
export interface TooltipProps {
  /** Text exposed as the trigger's accessibility hint and shown when revealed. */
  content: string;
  /** Content displayed beside the help trigger. */
  children: React.ReactNode;
  /** Palette used for the help affordance and message. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Toggles a text help message from a React Native pressable control; it does not use a hover popup.
 *
 * @example
 * <Tooltip content="Use at least eight characters."><Text>Password</Text></Tooltip>
 */
export function Tooltip({ content, children, theme = 'light', style }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const colors = themes[theme];
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {children}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Show help"
          accessibilityHint={content}
          accessibilityState={{ expanded: visible }}
          onPress={() => setVisible(!visible)}
          hitSlop={8}
        >
          <Text style={{ color: colors.primary, fontWeight: '700' }}>?</Text>
        </Pressable>
      </View>
      {visible && <Text accessibilityLiveRegion="polite" style={{ marginTop: 6, color: colors.textMuted }}>{content}</Text>}
    </View>
  );
}
