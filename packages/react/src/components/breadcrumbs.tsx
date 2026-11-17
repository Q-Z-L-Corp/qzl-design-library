import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  label?: string;
}

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
