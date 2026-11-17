import React, { useId } from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactElement<{ 'aria-describedby'?: string }>;
}

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
