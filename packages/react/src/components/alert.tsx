import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link Alert}, in addition to div attributes. */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Color treatment communicating the alert category.
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

const variants = {
  info: 'qzl-alert--info',
  success: 'qzl-alert--success',
  warning: 'qzl-alert--warning',
  danger: 'qzl-alert--danger'
};

/**
 * Renders a styled alert container; supply its contents and semantics as needed.
 *
 * @example
 * ```tsx
 * <Alert variant="warning">Changes have not been saved.</Alert>
 * ```
 */
export function Alert({ className, variant = 'info', ...props }: AlertProps) {
  return <div className={mergeClasses('qzl-alert', variants[variant], className)} {...props} />;
}
