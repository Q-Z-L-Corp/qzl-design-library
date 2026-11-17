import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface DataTableColumn<Row> {
  key: string;
  header: string;
  render: (row: Row, index: number) => React.ReactNode;
  sortValue?: (row: Row) => string | number;
}

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string | number;
  caption: string;
  emptyMessage?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

interface SortState {
  columnKey: string;
  direction: 'ascending' | 'descending';
}

export function DataTable<Row>({ columns, rows, getRowKey, caption, emptyMessage = 'No results found.', theme = 'light', style }: DataTableProps<Row>) {
  const [sort, setSort] = useState<SortState | null>(null);
  const colors = themes[theme];
  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((item) => item.key === sort.columnKey);
    if (!column?.sortValue) return rows;
    const direction = sort.direction === 'ascending' ? 1 : -1;
    return rows
      .map((row, index) => ({ row, index, value: column.sortValue?.(row) }))
      .sort((a, b) => {
        const order = typeof a.value === 'number' && typeof b.value === 'number'
          ? a.value - b.value
          : String(a.value).localeCompare(String(b.value), undefined, { numeric: true, sensitivity: 'base' });
        return order === 0 ? a.index - b.index : order * direction;
      })
      .map(({ row }) => row);
  }, [columns, rows, sort]);

  function toggleSort(column: DataTableColumn<Row>) {
    if (!column.sortValue) return;
    setSort((current) => ({
      columnKey: column.key,
      direction: current?.columnKey === column.key && current.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  }

  return (
    <ScrollView horizontal style={style} accessibilityLabel={caption}>
      <View>
        <View accessibilityRole="header" style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceMuted }}>
          {columns.map((column) => (
            <Pressable
              key={column.key}
              accessibilityRole={column.sortValue ? 'button' : undefined}
              accessibilityLabel={column.sortValue ? `Sort by ${column.header}` : column.header}
              accessibilityState={{ selected: sort?.columnKey === column.key }}
              disabled={!column.sortValue}
              onPress={() => toggleSort(column)}
              style={{ minWidth: 120, minHeight: 44, justifyContent: 'center', paddingHorizontal: 12 }}
            >
              <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: '700' }}>
                {column.header}{sort?.columnKey === column.key ? (sort.direction === 'ascending' ? ' ↑' : ' ↓') : ''}
              </Text>
            </Pressable>
          ))}
        </View>
        {sortedRows.length === 0 ? (
          <Text style={{ padding: 12, color: colors.textMuted }}>{emptyMessage}</Text>
        ) : sortedRows.map((row, rowIndex) => (
          <View key={getRowKey(row, rowIndex)} accessibilityRole="listitem" style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.border }}>
            {columns.map((column) => {
              const content = column.render(row, rowIndex);
              return (
                <View key={column.key} style={{ minWidth: 120, minHeight: 44, justifyContent: 'center', paddingHorizontal: 12 }}>
                  {typeof content === 'string' || typeof content === 'number'
                    ? <Text style={{ color: colors.text }}>{content}</Text>
                    : content}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
