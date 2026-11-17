import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
}

const variants = {
  primary: 'qzl-badge--primary',
  neutral: 'qzl-badge--neutral',
  success: 'qzl-badge--success',
  warning: 'qzl-badge--warning',
  danger: 'qzl-badge--danger'
};

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return <span className={mergeClasses('qzl-badge', variants[variant], className)} {...props} />;
}
