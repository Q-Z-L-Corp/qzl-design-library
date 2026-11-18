"use client";

import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link Toast}, in addition to div attributes. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short notification heading. */
  title: string;
  /** Optional explanatory content shown below the heading. */
  description?: React.ReactNode;
  /**
   * Notification category, which also determines its live-region urgency.
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** When supplied, renders a dismiss button that invokes this callback. */
  onDismiss?: () => void;
}

/**
 * Renders a live notification and an optional dismiss control.
 *
 * @example
 * ```tsx
 * <Toast title="Saved" description="Your changes are up to date." onDismiss={dismiss} />
 * ```
 */
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
