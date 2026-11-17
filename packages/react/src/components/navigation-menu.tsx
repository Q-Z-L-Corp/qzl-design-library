import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** One destination rendered in a {@link NavigationMenu}. */
export interface NavigationMenuItem {
  /** Link text or other visible label. */
  label: React.ReactNode;
  /** Link destination. */
  href: string;
  /** Marks this link as the current page for assistive technology. */
  current?: boolean;
}

/** Props for {@link NavigationMenu}, in addition to nav attributes. */
export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation links in display order. */
  items: NavigationMenuItem[];
  /** Accessible name for the navigation landmark. */
  label: string;
}

/**
 * Renders a labeled navigation landmark containing a list of links.
 *
 * @example
 * ```tsx
 * <NavigationMenu label="Account" items={[{ label: 'Profile', href: '/profile', current: true }]} />
 * ```
 */
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
