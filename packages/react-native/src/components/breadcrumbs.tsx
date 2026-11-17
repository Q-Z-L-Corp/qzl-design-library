import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  label?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Breadcrumbs({ items, label = 'Breadcrumb', theme = 'light', style }: BreadcrumbsProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="list" accessibilityLabel={label} style={[{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }, style]}>
      {items.map((item, index) => {
        const current = index === items.length - 1;
        const content = (
          <Text style={{ color: current ? colors.text : colors.primary, fontSize: 14, fontWeight: current ? '600' : '500' }}>
            {item.label}
          </Text>
        );
        return (
          <View key={`${index}-${item.label}`} style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.onPress && !current ? (
              <Pressable accessibilityRole="link" onPress={item.onPress}>{content}</Pressable>
            ) : (
              <View accessibilityState={{ selected: current }}>{content}</View>
            )}
            {index < items.length - 1 && <Text accessibilityElementsHidden style={{ color: colors.textMuted, marginHorizontal: 8 }}>/</Text>}
          </View>
        );
      })}
    </View>
  );
}
