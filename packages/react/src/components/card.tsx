import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

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
