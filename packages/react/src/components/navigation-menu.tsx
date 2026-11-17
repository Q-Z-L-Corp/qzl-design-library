import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface NavigationMenuItem {
  label: React.ReactNode;
  href: string;
  current?: boolean;
}

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationMenuItem[];
  label: string;
}

export function NavigationMenu({ items, label, className, ...props }: NavigationMenuProps) {
  return (
    <nav aria-label={label} className={mergeClasses('qzl-navigation-menu', className)} {...props}>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={item.current ? 'page' : undefined}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
