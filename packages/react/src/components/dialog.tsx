import React, { useEffect, useId, useRef } from 'react';
import { IconButton } from './icon-button.js';
import { mergeClasses } from '@qzl/core';

/** Props for the controlled HTML {@link Dialog}. */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDialogElement>, 'title'> {
  /** Whether the modal dialog should be open. */
  open: boolean;
  /**
   * Called when the dialog requests a state change, including close button, Escape, backdrop,
   * dialog close, and cancel interactions.
   * @param open Requested dialog state.
   */
  onOpenChange: (open: boolean) => void;
  /** Dialog heading, used as its accessible name. */
  title: string;
  /** Optional dialog description associated with the dialog. */
  description?: string;
  /**
   * HTML dialog close event handler, called after the component requests a closed state.
   * @param event HTML dialog close event.
   */
  onClose?: React.ReactEventHandler<HTMLDialogElement>;
  /**
   * HTML dialog cancel event handler, called after cancellation is prevented and close is requested.
   * @param event HTML dialog cancel event.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
}

/**
 * Renders a controlled modal dialog with a heading, optional description, and close control.
 *
 * @example
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen} title="Confirm" description="Continue?">
 *   <p>This action cannot be undone.</p>
 * </Dialog>
 * ```
 */
export function Dialog({ open, onOpenChange, title, description, className, children, onClick, onClose, onCancel, onKeyDown, ...props }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={mergeClasses('qzl-dialog', className)}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={(event) => {
        onOpenChange(false);
        onClose?.(event);
      }}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
        onCancel?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          onOpenChange(false);
        }
        onKeyDown?.(event);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
        onClick?.(event);
      }}
      {...props}
    >
      <header className="qzl-dialog__header">
        <div>
          <h2 id={titleId}>{title}</h2>
          {description && <p id={descriptionId}>{description}</p>}
        </div>
        <IconButton label="Close dialog" onClick={() => onOpenChange(false)}>×</IconButton>
      </header>
      <div className="qzl-dialog__content">{children}</div>
    </dialog>
  );
}
