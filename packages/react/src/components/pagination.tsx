import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export function Pagination({ page, pageCount, onPageChange, label = 'Pagination', className, ...props }: PaginationProps) {
  if (!Number.isInteger(pageCount) || pageCount < 1) throw new RangeError('Pagination pageCount must be a positive integer.');
  if (!Number.isInteger(page) || page < 1 || page > pageCount) throw new RangeError('Pagination page must be within pageCount.');

  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  const visiblePages = Array.from({ length: Math.min(pageCount, 5) }, (_, index) => start + index);

  return (
    <nav aria-label={label} className={mergeClasses('qzl-pagination', className)} {...props}>
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Previous page">‹</button>
      {visiblePages[0] > 1 && <span aria-hidden="true">…</span>}
      {visiblePages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPageChange(item)}
          aria-current={page === item ? 'page' : undefined}
          aria-label={`Page ${item}`}
        >
          {item}
        </button>
      ))}
      {visiblePages[visiblePages.length - 1] < pageCount && <span aria-hidden="true">…</span>}
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page === pageCount} aria-label="Next page">›</button>
    </nav>
  );
}
