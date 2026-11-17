import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

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
