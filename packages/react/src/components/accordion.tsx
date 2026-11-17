import React, { useId, useState } from 'react';
import { mergeClasses } from '@qzl/core';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Accordion({
  title,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const triggerId = useId();
  const panelId = useId();
  const expanded = open ?? uncontrolledOpen;

  function toggle() {
    const nextOpen = !expanded;
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <div className={mergeClasses('qzl-accordion', className)} {...props}>
      <h3 className="qzl-accordion__heading">
        <button
          id={triggerId}
          type="button"
          className="qzl-accordion__trigger"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={toggle}
        >
          {title}
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded} className="qzl-accordion__panel">
        {children}
      </div>
    </div>
  );
}
