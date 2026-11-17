import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  onDismiss?: () => void;
}

export function Toast({ title, description, variant = 'info', onDismiss, className, ...props }: ToastProps) {
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      aria-live={variant === 'danger' ? 'assertive' : 'polite'}
      className={mergeClasses('qzl-toast', `qzl-toast--${variant}`, className)}
      {...props}
    >
      <div>
        <strong>{title}</strong>
        {description && <div className="qzl-toast__description">{description}</div>}
      </div>
      {onDismiss && <button type="button" className="qzl-toast__dismiss" onClick={onDismiss} aria-label="Dismiss notification">×</button>}
    </div>
  );
}
