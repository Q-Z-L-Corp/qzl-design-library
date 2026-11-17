import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** One tab label and value. */
export interface TabItem {
  /** Value emitted when the tab is pressed. */
  value: string;
  /** Visible text and tab content. */
  label: string;
}

/** Props for a controlled React Native tab list. */
export interface TabsProps {
  /** Tabs rendered in input order. */
  items: TabItem[];
  /** Value of the selected tab. */
  value: string;
  /**
   * Called with the value of the pressed tab.
   * @param value Value belonging to the selected tab.
   */
  onValueChange: (value: string) => void;
  /** Palette used for selected and unselected tabs. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the tab-list container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders React Native pressable tabs and exposes the selected state to accessibility services.
 *
 * @example
 * <Tabs items={[{ value: 'details', label: 'Details' }]} value={tab} onValueChange={setTab} />
 */
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
