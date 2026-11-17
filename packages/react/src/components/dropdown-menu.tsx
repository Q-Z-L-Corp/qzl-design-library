import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface DropdownMenuItem {
  label: React.ReactNode;
  onSelect: () => void;
  disabled?: boolean;
}

export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLDetailsElement>, 'title'> {
  label: string;
  items: DropdownMenuItem[];
}

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
