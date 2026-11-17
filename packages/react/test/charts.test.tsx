import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AreaChart, BarChart, DonutChart, LineChart, MetricCard } from '../src/index';

describe('data display components', () => {
  it('renders legacy bars and grouped or stacked multi-series layouts', () => {
    const { container } = render(
      <>
        <BarChart title="Weekly visits" data={[{ label: 'Mon', value: 12 }]} />
        <BarChart
          title="Channel signups"
          orientation="vertical"
          mode="stacked"
          data={[{ label: 'Mon', values: { organic: 12, referral: 4 } }]}
          series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]}
        />
      </>
    );

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Organic: 12')).toBeInTheDocument();
    expect(screen.getByText('Referral: 4')).toBeInTheDocument();
    expect(container.querySelector('.qzl-bar-chart--vertical.qzl-bar-chart--stacked')).toBeInTheDocument();
    expect(() => render(
      <BarChart
        title="Invalid totals"
        mode="stacked"
        data={[{ label: 'Mon', values: { organic: -1 } }]}
        series={[{ key: 'organic', label: 'Organic' }]}
      />
    )).toThrow(RangeError);
  });

  it('plots aligned line and area series and rejects mismatched or invalid series', () => {
    render(
      <>
        <LineChart title="Visits" labels={['Mon', 'Tue']} series={[{ label: 'Organic', values: [12, 18] }]} />
        <AreaChart title="Sources" labels={['Mon', 'Tue']} stacked series={[{ label: 'Direct', values: [4, 6] }, { label: 'Organic', values: [8, 12] }]} />
      </>
    );

    expect(screen.getByRole('img', { name: 'Visits' })).toBeInTheDocument();
    expect(screen.getByText('Organic: 18')).toBeInTheDocument();
    expect(screen.getByText('Direct: 4 · Organic: 8')).toBeInTheDocument();
    expect(() => render(<LineChart title="Invalid series" labels={['Mon']} series={[{ label: 'Visits', values: [1, 2] }]} />)).toThrow(RangeError);
    expect(() => render(<AreaChart title="Invalid stack" labels={['Mon']} stacked series={[{ label: 'Visits', values: [-1] }]} />)).toThrow(RangeError);
  });

  it('shows donut proportions and metric context while rejecting negative slices', () => {
    render(
      <>
        <DonutChart title="Visitors by device" centerLabel="Visitors" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} />
        <MetricCard label="Monthly visits" value="24,815" change="+8.2%" trend="positive" comparison="vs. previous 30 days" />
      </>
    );

    expect(screen.getByRole('img', { name: /Visitors by device/ })).toBeInTheDocument();
    expect(screen.getByText('64 · 64%')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Monthly visits' })).toBeInTheDocument();
    expect(screen.getByText('+8.2%')).toBeInTheDocument();
    expect(screen.getByText('vs. previous 30 days')).toBeInTheDocument();
    expect(() => render(<DonutChart title="Invalid split" data={[{ label: 'Desktop', value: -1 }]} />)).toThrow(RangeError);
  });
});
