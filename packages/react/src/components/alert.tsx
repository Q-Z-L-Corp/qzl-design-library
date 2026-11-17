import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

const variants = {
  info: 'qzl-alert--info',
  success: 'qzl-alert--success',
  warning: 'qzl-alert--warning',
  danger: 'qzl-alert--danger'
};

export function Alert({ className, variant = 'info', ...props }: AlertProps) {
  return <div className={mergeClasses('qzl-alert', variants[variant], className)} {...props} />;
}
