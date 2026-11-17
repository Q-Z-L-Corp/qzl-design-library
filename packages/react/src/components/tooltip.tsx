import React, { useId } from 'react';

/** Props for {@link Tooltip}; children must be one React element that accepts `aria-describedby`. */
export interface TooltipProps {
  /** Text rendered in the tooltip content. */
  content: string;
  /** Single trigger element; existing `aria-describedby` ids are preserved. */
  children: React.ReactElement<{ 'aria-describedby'?: string }>;
}

/**
 * Associates a child element with descriptive tooltip content via `aria-describedby`.
 *
 * @example
 * ```tsx
 * <Tooltip content="Opens in a new window"><button>Help</button></Tooltip>
 * ```
 */
export function Tooltip({ content, children }: TooltipProps) {
  const tooltipId = useId();
  const describedBy = children.props['aria-describedby'];
  const trigger = React.cloneElement(children, {
    'aria-describedby': describedBy ? `${describedBy} ${tooltipId}` : tooltipId
  });

  return (
    <span className="qzl-tooltip">
      {trigger}
      <span className="qzl-tooltip__content" id={tooltipId} role="tooltip">{content}</span>
    </span>
  );
}
