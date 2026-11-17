import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface NavigationMenuItem {
  label: string;
  onPress: () => void;
  current?: boolean;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  label: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function NavigationMenu({ items, label, theme = 'light', style }: NavigationMenuProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="list" accessibilityLabel={label} style={style}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          accessibilityRole="button"
          accessibilityState={{ selected: item.current }}
          onPress={item.onPress}
          style={({ pressed }) => ({
            minHeight: 44,
            justifyContent: 'center',
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: item.current ? colors.primarySubtle : 'transparent',
            opacity: pressed ? 0.75 : 1
          })}
        >
          <Text style={{ color: item.current ? colors.primary : colors.text, fontWeight: item.current ? '600' : '400' }}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
