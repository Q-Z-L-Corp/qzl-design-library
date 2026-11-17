import React from 'react';
import { mergeClasses } from '@qzl/core';

/** One action rendered in a {@link DropdownMenu}. */
export interface DropdownMenuItem {
  /** Visible action label. */
  label: React.ReactNode;
  /** Called when the enabled menu action is selected; the containing details element is then closed. */
  onSelect: () => void;
  /** Disables the action button. */
  disabled?: boolean;
}

/** Props for the HTML details-based {@link DropdownMenu}. */
export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLDetailsElement>, 'title'> {
  /** Visible summary that opens and closes the menu. */
  label: string;
  /** Actions displayed while the details element is open. */
  items: DropdownMenuItem[];
}

/**
 * Renders an HTML disclosure menu; selecting an enabled item invokes its callback and closes it.
 *
 * @example
 * ```tsx
 * <DropdownMenu label="Actions" items={[{ label: 'Refresh', onSelect: refresh }]} />
 * ```
 */
export function DropdownMenu({ label, items, className, ...props }: DropdownMenuProps) {
  return (
    <details className={mergeClasses('qzl-dropdown-menu', className)} {...props}>
      <summary>{label}</summary>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <button type="button" disabled={item.disabled} onClick={(event) => {
              item.onSelect();
              const details = event.currentTarget.closest('details');
              if (details) details.open = false;
            }}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
