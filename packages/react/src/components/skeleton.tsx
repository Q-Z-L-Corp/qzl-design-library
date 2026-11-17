import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for {@link Skeleton}, in addition to div attributes. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Render a circular placeholder instead of the default shape.
   * @default false
   */
  circle?: boolean;
}

/**
 * Renders a decorative loading placeholder hidden from assistive technology.
 *
 * @example
 * ```tsx
 * <Skeleton circle style={{ width: 40, height: 40 }} />
 * ```
 */
export function Skeleton({ className, circle = false, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={mergeClasses('qzl-skeleton', circle && 'qzl-skeleton--circle', className)}
      {...props}
    />
  );
}
