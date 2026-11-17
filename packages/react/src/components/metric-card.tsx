import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Direction used to style and describe a metric's change. */
export type MetricTrend = 'positive' | 'negative' | 'neutral';

/** Props for {@link MetricCard}, in addition to article attributes. */
export interface MetricCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Short name for the metric. */
  label: string;
  /** Preformatted value or number displayed as the primary figure. */
  value: string | number;
  /** Optional change text, such as `+8.2%`. */
  change?: string;
  /** Direction of the change; the text remains available independently of color. @default 'neutral' */
  trend?: MetricTrend;
  /** Context for the change, such as `vs. previous 30 days`. */
  comparison?: string;
  /** Optional supporting text below the value. */
  description?: string;
}

/**
 * Presents a key metric with optional change, comparison period, and supporting context.
 *
 * @example
 * ```tsx
 * <MetricCard label="Monthly visits" value="24,815" change="+8.2%" trend="positive" comparison="vs. previous 30 days" />
 * ```
 */
export function MetricCard({
  label,
  value,
  change,
  trend = 'neutral',
  comparison,
  description,
  className,
  ...props
}: MetricCardProps) {
  return (
    <article className={mergeClasses('qzl-metric-card', className)} {...props}>
      <h2 className="qzl-metric-card__label">{label}</h2>
      <p className="qzl-metric-card__value">{value}</p>
      {(change || comparison) && (
        <p className={`qzl-metric-card__change qzl-metric-card__change--${trend}`}>
          {change && <span>{change}</span>}
          {comparison && <span>{comparison}</span>}
        </p>
      )}
      {description && <p className="qzl-metric-card__description">{description}</p>}
    </article>
  );
}
