import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion, Button, Card, DataTable, FormField, getButtonClassName, Input, LinkButton, MarkdownEditor, Pagination, Progress, QrScanner, Tabs, Toast } from '../src/index';

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

  it('renders LinkButton as a semantic link with button styling', () => {
    render(<LinkButton href="/projects" variant="secondary">View projects</LinkButton>);
    const link = screen.getByRole('link', { name: 'View projects' });
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).toHaveClass('qzl-button', 'qzl-button--secondary');
  });

  it('renders LinkButton with a custom router component via renderAs', () => {
    function MockNextLink({ href, className, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
      return (
        <a href={href} className={className} data-router="next-link" {...props}>
          {children}
        </a>
      );
    }
    render(
      <LinkButton href="/dashboard" renderAs={MockNextLink} variant="ghost" size="lg">
        Dashboard
      </LinkButton>
    );
    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).toHaveAttribute('data-router', 'next-link');
    expect(link).toHaveClass('qzl-button', 'qzl-button--ghost', 'qzl-button--lg');
  });

  it('exports getButtonClassName to generate class names for custom links', () => {
    const className = getButtonClassName('nav-item', 'primary', 'sm', true);
    expect(className).toContain('qzl-button');
    expect(className).toContain('qzl-button--primary');
    expect(className).toContain('qzl-button--sm');
    expect(className).toContain('qzl-button--full');
    expect(className).toContain('nav-item');
  });

  it('supports a featured Card without changing the elevated default', () => {
    const { rerender } = render(<Card variant="featured" data-testid="featured-card" />);
    expect(screen.getByTestId('featured-card')).toHaveClass('qzl-card--featured', 'qzl-card--elevated');

    rerender(<Card variant="featured" elevated={false} data-testid="featured-card" />);
    expect(screen.getByTestId('featured-card')).toHaveClass('qzl-card--featured');
    expect(screen.getByTestId('featured-card')).not.toHaveClass('qzl-card--elevated');
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

  it('exposes tab IDs so panels can reference them with aria-labelledby', () => {
    const collected: Record<string, string> = {};
    render(
      <>
        <Tabs
          tabListId="main-tabs"
          items={[
            { value: 'a', label: 'Alpha', id: 'custom-tab-a' },
            { value: 'b', label: 'Beta' }
          ]}
          value="a"
          onValueChange={() => {}}
          panelId="alpha-panel"
          getTabId={(value, id) => { collected[value] = id; }}
        />
        <div id="alpha-panel" role="tabpanel" aria-labelledby="custom-tab-a">Alpha content</div>
      </>
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('id', 'main-tabs');
    expect(collected['a']).toBe('custom-tab-a');
    expect(collected['b']).toBeTruthy();
    expect(collected['b']).not.toBe('custom-tab-a');

    // Verify the id is actually on the DOM element and can be used with aria-labelledby
    const tabA = screen.getByRole('tab', { name: 'Alpha' });
    expect(tabA).toHaveAttribute('id', 'custom-tab-a');
    expect(tabA).toHaveAttribute('aria-controls', 'alpha-panel');
    expect(screen.getByRole('tabpanel', { name: 'Alpha' })).toHaveAttribute('aria-labelledby', tabA.id);

    const tabB = screen.getByRole('tab', { name: 'Beta' });
    expect(tabB).toHaveAttribute('id', collected['b']);
  });

  it('renders a data table loading skeleton state with aria-busy', () => {
    const columns = [
      { key: 'name', header: 'Name', render: (row: { name: string }) => row.name },
      { key: 'role', header: 'Role', render: (row: { name: string }) => 'User' }
    ];
    const { container } = render(
      <DataTable
        caption="Loading users"
        columns={columns}
        rows={[]}
        getRowKey={(_, i) => i}
        aria-busy={false}
        loading
        loadingRowCount={3}
      />
    );
    const table = screen.getByRole('table', { name: 'Loading users' });
    expect(table).toHaveAttribute('aria-busy', 'true');
    const loadingTbody = container.querySelector('tbody[aria-label="Loading"]');
    expect(loadingTbody).toBeInTheDocument();
    // 3 rows * 2 columns = 6 skeletons
    const skeletons = loadingTbody?.querySelectorAll('.qzl-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('renders a data table empty state message when rows are empty', () => {
    const columns = [
      { key: 'name', header: 'Name', render: (row: { name: string }) => row.name }
    ];
    render(
      <DataTable
        caption="Empty users"
        columns={columns}
        rows={[]}
        getRowKey={(_, i) => i}
        emptyMessage="No team members currently registered."
      />
    );
    expect(screen.getByText('No team members currently registered.')).toBeInTheDocument();
    const cell = screen.getByText('No team members currently registered.').closest('td');
    expect(cell).toHaveClass('qzl-data-table__empty');
  });

  it('renders responsive mobile labels on data table cells when configured', () => {
    const columns = [
      { key: 'title', header: 'Title', mobileLabel: 'Item Title', render: (row: { title: string; score: number }) => row.title },
      { key: 'score', header: 'Score', mobileLabel: 'Points', render: (row: { title: string; score: number }) => row.score }
    ];
    const { container } = render(
      <DataTable
        caption="Leaderboard"
        columns={columns}
        rows={[{ title: 'Champion', score: 100 }]}
        getRowKey={(row) => row.title}
        responsive
      />
    );
    const table = screen.getByRole('table', { name: 'Leaderboard' });
    expect(table).toHaveClass('qzl-data-table--responsive');
    const titleCell = container.querySelector('td[data-mobile-label="Item Title"]');
    const scoreCell = container.querySelector('td[data-mobile-label="Points"]');
    expect(titleCell).toBeInTheDocument();
    expect(scoreCell).toBeInTheDocument();
    expect(titleCell?.textContent).toContain('Item Title');
    expect(scoreCell?.textContent).toContain('Points');
  });
});
