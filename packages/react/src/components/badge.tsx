import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link Badge}, in addition to span attributes. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Color treatment for the badge.
   * @default 'primary'
   */
  variant?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
}

const variants = {
  primary: 'qzl-badge--primary',
  neutral: 'qzl-badge--neutral',
  success: 'qzl-badge--success',
  warning: 'qzl-badge--warning',
  danger: 'qzl-badge--danger'
};

/**
 * Renders a short status or category label.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Published</Badge>
 * ```
 */
export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return <span className={mergeClasses('qzl-badge', variants[variant], className)} {...props} />;
}
