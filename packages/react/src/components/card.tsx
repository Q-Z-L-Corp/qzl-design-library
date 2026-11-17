import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for {@link Card}, in addition to div attributes. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Add the elevated card treatment.
   * @default true
   */
  elevated?: boolean;
}

/**
 * Renders a content container with optional elevated styling.
 *
 * @example
 * ```tsx
 * <Card><h2>Account</h2><p>Profile settings</p></Card>
 * ```
 */
export function Card({ className, elevated = true, ...props }: CardProps) {
  return (
    <div
      className={mergeClasses(
        'qzl-card',
        elevated && 'qzl-card--elevated',
        className
      )}
      {...props}
    />
  );
}
