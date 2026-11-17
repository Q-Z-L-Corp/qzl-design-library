import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  circle?: boolean;
}

export function Skeleton({ className, circle = false, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={mergeClasses('qzl-skeleton', circle && 'qzl-skeleton--circle', className)}
      {...props}
    />
  );
}
