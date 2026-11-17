import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** One entry in a {@link Breadcrumbs} trail. */
export interface BreadcrumbItem {
  /** Visible breadcrumb label. */
  label: React.ReactNode;
  /** Destination for a non-current breadcrumb. */
  href?: string;
  /** Mark this entry as the current page; if omitted, the final item is current. */
  current?: boolean;
}

/** Props for {@link Breadcrumbs}, in addition to nav attributes. */
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb entries in trail order. */
  items: BreadcrumbItem[];
  /**
   * Accessible name of the navigation landmark.
   * @default 'Breadcrumb'
   */
  label?: string;
}

/**
 * Renders an ordered breadcrumb trail; the final item is current unless overridden.
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />
 * ```
 */
export function Breadcrumbs({ items, label = 'Breadcrumb', className, ...props }: BreadcrumbsProps) {
  return (
    <nav aria-label={label} className={mergeClasses('qzl-breadcrumbs', className)} {...props}>
      <ol>
        {items.map((item, index) => {
          const current = item.current ?? index === items.length - 1;
          return (
            <li key={`${index}-${String(item.label)}`}>
              {item.href && !current ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span aria-current={current ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
