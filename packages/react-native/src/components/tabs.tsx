import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Tabs({ items, value, onValueChange, theme = 'light', style }: TabsProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="tablist" style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, padding: 4, borderRadius: 12, backgroundColor: colors.surfaceMuted }, style]}>
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <Pressable
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onValueChange(item.value)}
            style={{ minHeight: 40, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 9, backgroundColor: selected ? colors.surface : 'transparent' }}
          >
            <Text style={{ color: selected ? colors.text : colors.textMuted, fontWeight: selected ? '600' : '500' }}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
