import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Describes a table column and the functions used to render or sort its cells. */
export interface DataTableColumn<Row> {
  /** Stable identifier used for React keys and sort state. */
  key: string;
  /** Text shown in the column header. */
  header: string;
  /**
   * Renders a cell for a row in the current display order.
   * @param row Data item displayed in the cell.
   * @param index Zero-based index of the row in the displayed sequence.
   */
  render: (row: Row, index: number) => React.ReactNode;
  /**
   * Returns a comparable value for sorting; omitting it makes the header non-sortable.
   * @param row Data item whose sort value is requested.
   */
  sortValue?: (row: Row) => string | number;
}

/** Props for a horizontally scrollable, locally sortable React Native table. */
export interface DataTableProps<Row> {
  /** Column definitions in display order. */
  columns: DataTableColumn<Row>[];
  /** Row data in the original order; sorting does not mutate this array. */
  rows: Row[];
  /**
   * Supplies a stable key for each row.
   * @param row Row data for which to create a key.
   * @param index Zero-based index in the current displayed sequence.
   */
  getRowKey: (row: Row, index: number) => string | number;
  /** Accessible label for the horizontal scroll container. */
  caption: string;
  /** Text shown when there are no rows. @default 'No results found.' */
  emptyMessage?: string;
  /** Palette used for table text, borders, and header surface. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the horizontal scroll view. */
  style?: StyleProp<ViewStyle>;
}

interface SortState {
  columnKey: string;
  direction: 'ascending' | 'descending';
}

/**
 * Renders a horizontally scrollable table with stable local sorting for sortable columns.
 *
 * @example
 * <DataTable
 *   caption="People"
 *   columns={[{ key: 'name', header: 'Name', render: (row) => row.name, sortValue: (row) => row.name }]}
 *   rows={[{ name: 'Ada' }]}
 *   getRowKey={(row) => row.name}
 * />
 */
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
