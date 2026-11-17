import React, { useId, useState } from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for the controlled or uncontrolled {@link Accordion}. */
export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Content displayed in the accordion trigger. */
  title: React.ReactNode;
  /** Controls expanded state when provided. */
  open?: boolean;
  /**
   * Initial expanded state when `open` is not provided.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called whenever the trigger requests a new expanded state.
   * @param open Requested expanded state.
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Renders a disclosure control and its associated region.
 *
 * @example
 * ```tsx
 * <Accordion title="Details" defaultOpen={false}>Additional information.</Accordion>
 * ```
 */
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
