import React, { useMemo, useState } from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Column definition used by the generic {@link DataTable}. */
export interface DataTableColumn<Row> {
  /** Stable identifier used for rendering and sort state. */
  key: string;
  /** Header content displayed for this column. */
  header: React.ReactNode;
  /**
   * Produces a cell's content.
   * @param row Data record for the current table row.
   * @param index Position of this row in the rendered (possibly sorted) rows.
   * @returns Content rendered in the cell.
   */
  render: (row: Row, index: number) => React.ReactNode;
  /**
   * Produces the sortable value for a row. Columns without this function are not interactive.
   * @param row Data record whose sort key is requested.
   * @returns String or number compared when sorting.
   */
  sortValue?: (row: Row) => string | number;
}

/** Props for a generic {@link DataTable}. */
export interface DataTableProps<Row> extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  /** Column definitions in display order. */
  columns: DataTableColumn<Row>[];
  /** Data records to render. */
  rows: Row[];
  /**
   * Produces the React key for each record.
   * @param row Record being rendered.
   * @param index Its position in the rendered (possibly sorted) rows.
   * @returns A key unique among the table's rows.
   */
  getRowKey: (row: Row, index: number) => React.Key;
  /** Visible table caption describing the data. */
  caption: string;
  /**
   * Cell content shown when `rows` is empty.
   * @default 'No results found.'
   */
  emptyMessage?: React.ReactNode;
}

interface SortState {
  columnKey: string;
  direction: 'ascending' | 'descending';
}

/**
 * Renders a table with optional client-side sorting for columns that define `sortValue`.
 *
 * @example
 * ```tsx
 * <DataTable caption="People" columns={columns} rows={people} getRowKey={(person) => person.id} />
 * ```
 */
export function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  caption,
  emptyMessage = 'No results found.',
  className,
  ...props
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<SortState | null>(null);
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
    <div className="qzl-data-table__scroll">
      <table className={mergeClasses('qzl-data-table', className)} {...props}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const direction = sort?.columnKey === column.key ? sort.direction : undefined;
              return (
                <th key={column.key} scope="col" aria-sort={direction}>
                  {column.sortValue ? (
                    <button type="button" onClick={() => toggleSort(column)}>{column.header}</button>
                  ) : column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr><td colSpan={Math.max(columns.length, 1)}>{emptyMessage}</td></tr>
          ) : sortedRows.map((row, rowIndex) => (
            <tr key={getRowKey(row, rowIndex)}>
              {columns.map((column) => <td key={column.key}>{column.render(row, rowIndex)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
