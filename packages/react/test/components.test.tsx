import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion, Button, DataTable, FormField, Input, MarkdownEditor, Pagination, Progress, QrScanner, Tabs, Toast } from '../src/index';

describe('interactive components', () => {
  it('uses a non-submit button by default and respects disabled state', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('type', 'button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    render(<Button disabled>Unavailable</Button>);
    expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  });

  it('disables a loading button, marks it busy, and keeps its accessible name', () => {
    render(<Button loading>Save changes</Button>);
    const button = screen.getByRole('button', { name: 'Save changes' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('links form labels, hints, and errors to the rendered control', () => {
    render(
      <FormField
        label="Email"
        required
        hint="Use your work address"
        error="Enter a valid address"
        control={<Input type="email" />}
      />
    );
    const input = screen.getByRole('textbox', { name: /email/i });
    const describedBy = input.getAttribute('aria-describedby')?.split(' ') ?? [];
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(describedBy).toHaveLength(2);
    expect(describedBy.map((id) => document.getElementById(id)?.textContent)).toEqual([
      'Use your work address',
      'Enter a valid address'
    ]);
  });

  it('supports rich and icon-only tab labels with explicit accessible names', () => {
    render(
      <Tabs
        items={[
          { value: 'profile', label: <><strong>Profile</strong> settings</> },
          { value: 'alerts', label: <span aria-hidden="true">●</span>, ariaLabel: 'Alerts' }
        ]}
        value="profile"
        onValueChange={() => {}}
      />
    );
    expect(screen.getByRole('tab', { name: 'Profile settings' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Alerts' })).toBeInTheDocument();
  });

  it('exposes an accordion panel through its expanded state and relationship', () => {
    render(<Accordion title="Details">More information</Accordion>);
    const trigger = screen.getByRole('button', { name: /details/i });
    const panelId = trigger.getAttribute('aria-controls');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panelId).toBeTruthy();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(panelId!)).toBeVisible();
  });

  it('sorts a table by numeric values in both directions', () => {
    const columns = [
      { key: 'name', header: 'Name', render: (row: { name: string; count: number }) => row.name },
      { key: 'count', header: 'Count', render: (row: { name: string; count: number }) => row.count, sortValue: (row: { name: string; count: number }) => row.count }
    ];
    render(
      <DataTable
        caption="Project counts"
        columns={columns}
        rows={[{ name: 'Ten', count: 10 }, { name: 'Two', count: 2 }]}
        getRowKey={(row) => row.name}
      />
    );
    const countHeading = screen.getByRole('columnheader', { name: 'Count' });
    fireEvent.click(within(countHeading).getByRole('button'));
    expect(countHeading).toHaveAttribute('aria-sort', 'ascending');
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Two');
    fireEvent.click(within(countHeading).getByRole('button'));
    expect(countHeading).toHaveAttribute('aria-sort', 'descending');
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Ten');
  });

  it('disables pagination at both ends and reports the current page', () => {
    const onPageChange = vi.fn();
    const { unmount } = render(<Pagination page={2} pageCount={3} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    unmount();
    render(<Pagination page={1} pageCount={1} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('announces progress values and rejects an invalid range', () => {
    render(<Progress label="Upload" value={140} />);
    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute('aria-valuenow', '100');
    expect(() => render(<Progress label="Upload" min={10} max={10} value={10} />)).toThrow(RangeError);
  });

  it('renders markdown as text nodes rather than interpreting embedded HTML', () => {
    render(<MarkdownEditor label="Notes" value={'# Title\n\n<script>alert(1)</script>'} onValueChange={() => {}} preview />);
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('<script>alert(1)</script>')).toBeInTheDocument();
    expect(document.querySelector('script')).toBeNull();
  });

  it('uses assertive alert semantics for error notifications', () => {
    render(<Toast title="Could not save" variant="danger" />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('reports unsupported camera scanning and waits for an explicit scan request', async () => {
    Object.defineProperty(globalThis, 'BarcodeDetector', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: undefined });
    const onScanError = vi.fn();
    render(<QrScanner onScan={vi.fn()} onScanError={onScanError} />);
    expect(onScanError).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Start camera scan' }));
    await waitFor(() => expect(onScanError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Camera access is not available in this browser.' })));
  });
});
