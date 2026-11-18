"use client";

import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Visual treatment applied to a {@link Button}. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
/** Supported button size presets. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for {@link Button}, in addition to HTML button attributes. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual treatment of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Preset size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Stretch the button to fill the width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Disable the button and show a busy indicator while an operation is pending.
   * @default false
   */
  loading?: boolean;
}

const base = 'qzl-button';

const sizes: Record<ButtonSize, string> = {
  sm: 'qzl-button--sm',
  md: 'qzl-button--md',
  lg: 'qzl-button--lg'
};

const variants: Record<ButtonVariant, string> = {
  primary: 'qzl-button--primary',
  secondary: 'qzl-button--secondary',
  ghost: 'qzl-button--ghost',
  danger: 'qzl-button--danger'
};

/**
 * Renders a styled HTML button with variant, size, and width options. Its `type`
 * defaults to `button`.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={save}>Save</Button>
 * ```
 */
export function Button({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  type = 'button',
  'aria-busy': ariaBusy,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? true : ariaBusy}
      className={mergeClasses(base, sizes[size], variants[variant], fullWidth && 'qzl-button--full', className)}
      {...props}
    >
      {loading && <span className="qzl-spinner qzl-spinner--sm qzl-button__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
