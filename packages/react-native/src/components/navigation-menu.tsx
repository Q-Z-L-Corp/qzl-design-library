import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** One selectable entry in a navigation menu. */
export interface NavigationMenuItem {
  /** Visible title and button text. */
  label: string;
  /** Action invoked when the entry is pressed. */
  onPress: () => void;
  /** Marks this entry as selected in accessibility state and styling. */
  current?: boolean;
}

/** Props for a labeled list of navigation actions. */
export interface NavigationMenuProps {
  /** Entries rendered in order. */
  items: NavigationMenuItem[];
  /** Accessible label for the list. */
  label: string;
  /** Palette used for selected and unselected entries. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the list container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders navigation choices as React Native pressable rows; this component does not perform routing.
 *
 * @example
 * <NavigationMenu label="Settings" items={[{ label: 'Profile', current: true, onPress: showProfile }]} />
 */
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
