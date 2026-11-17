import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** One label in a breadcrumb trail. */
export interface BreadcrumbItem {
  /** Text shown for this location. */
  label: string;
  /** Optional press action; ignored for the final (current) item. */
  onPress?: () => void;
}

/** Props for a wrapping breadcrumb trail. */
export interface BreadcrumbsProps {
  /** Breadcrumbs in display order; the final item is marked as current. */
  items: BreadcrumbItem[];
  /** Accessible label for the list. @default 'Breadcrumb' */
  label?: string;
  /** Palette used for current, linked, and separator text. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the list container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays a React Native breadcrumb list; non-current items are actionable only when they have an `onPress` callback.
 *
 * @example
 * <Breadcrumbs items={[{ label: 'Home', onPress: goHome }, { label: 'Library' }]} />
 */
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
