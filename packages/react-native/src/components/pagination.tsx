import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a controlled page selector. */
export interface PaginationProps {
  /** Current one-based page number. Must be within `1..pageCount`. */
  page: number;
  /** Total number of pages; must be a positive integer. */
  pageCount: number;
  /**
   * Called with the requested page number when an enabled page control is pressed.
   * @param page One-based target page number.
   */
  onPageChange: (page: number) => void;
  /** Accessible label announced by platform accessibility services. @default 'Pagination' */
  label?: string;
  /** Palette used for page controls. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the control list. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders previous/next controls and up to five nearby React Native buttons with selected and disabled accessibility states.
 *
 * @example
 * <Pagination page={page} pageCount={12} onPageChange={setPage} />
 */
export function Pagination({ page, pageCount, onPageChange, label = 'Pagination', theme = 'light', style }: PaginationProps) {
  if (!Number.isInteger(pageCount) || pageCount < 1) throw new RangeError('Pagination pageCount must be a positive integer.');
  if (!Number.isInteger(page) || page < 1 || page > pageCount) throw new RangeError('Pagination page must be within pageCount.');
  const colors = themes[theme];
  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  const pages = Array.from({ length: Math.min(pageCount, 5) }, (_, index) => start + index);

  function pageButton(target: number, title: string) {
    const selected = target === page;
    return (
      <Pressable
        key={title}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ selected, disabled: target < 1 || target > pageCount }}
        disabled={target < 1 || target > pageCount}
        onPress={() => onPageChange(target)}
        style={{ minWidth: 40, minHeight: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: selected ? colors.primary : colors.surface, borderWidth: 1, borderColor: selected ? colors.primary : colors.border }}
      >
        <Text style={{ color: selected ? colors.primaryForeground : colors.text }}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <View accessibilityRole="list" accessibilityLabel={label} style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
      {pageButton(page - 1, 'Previous page')}
      {pages.map((item) => pageButton(item, `Page ${item}`))}
      {pageButton(page + 1, 'Next page')}
    </View>
  );
}
