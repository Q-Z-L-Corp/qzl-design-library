import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Visual treatment applied to a {@link Card}. */
export type CardVariant = 'default' | 'featured';

/** Props for {@link Card}, in addition to div attributes. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual treatment applied to the card.
   * @default 'default'
   */
  variant?: CardVariant;
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
 * <Card variant="featured"><h2>Account</h2><p>Profile settings</p></Card>
 * ```
 */
export function Card({ className, variant = 'default', elevated = true, ...props }: CardProps) {
  return (
    <div
      className={mergeClasses(
        'qzl-card',
        variant === 'featured' && 'qzl-card--featured',
        elevated && 'qzl-card--elevated',
        className
      )}
      {...props}
    />
  );
}
