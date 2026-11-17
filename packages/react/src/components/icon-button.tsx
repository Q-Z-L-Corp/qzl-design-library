import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link IconButton}, in addition to HTML button attributes. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name applied as the button's `aria-label`. */
  label: string;
  /**
   * Visual treatment of the button.
   * @default 'neutral'
   */
  variant?: 'neutral' | 'primary' | 'danger';
}

/**
 * Renders a button whose accessible name is supplied separately from its content.
 * Its HTML `type` defaults to `button`.
 *
 * @example
 * ```tsx
 * <IconButton label="Close" onClick={close}>×</IconButton>
 * ```
 */
export function IconButton({ label, variant = 'neutral', className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={mergeClasses('qzl-icon-button', `qzl-icon-button--${variant}`, className)}
      {...props}
    />
  );
}
