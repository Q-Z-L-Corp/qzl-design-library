import React, { useEffect, useId, useRef } from 'react';
import { IconButton } from './icon-button.js';
import { mergeClasses } from '@qzl/core';

export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDialogElement>, 'title'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  onClose?: React.ReactEventHandler<HTMLDialogElement>;
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
}

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
