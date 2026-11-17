import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AreaChart, BarChart, DonutChart, LineChart, MetricCard } from '@qzlcorp/react-native';

describe('React Native data display components', () => {
  it('renders chart labels, values, and metric comparisons', () => {
    render(
      <>
        <BarChart
          title="Weekly signups"
          orientation="vertical"
          data={[{ label: 'Mon', values: { organic: 12, referral: 4 } }]}
          series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]}
        />
        <LineChart title="Visits" labels={['Mon', 'Tue']} series={[{ label: 'Organic', values: [12, 18] }]} />
        <AreaChart title="Sources" labels={['Mon', 'Tue']} stacked series={[{ label: 'Direct', values: [4, 6] }, { label: 'Organic', values: [8, 12] }]} />
        <DonutChart title="Visitors by device" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} />
        <MetricCard label="Monthly visits" value="24,815" change="+8.2%" comparison="vs. previous 30 days" />
      </>
    );

    expect(screen.getByText('Organic: 18')).toBeOnTheScreen();
    expect(screen.getByText('Direct: 4 · Organic: 8')).toBeOnTheScreen();
    expect(screen.getByText('Desktop')).toBeOnTheScreen();
    expect(screen.getByText('24,815')).toBeOnTheScreen();
    expect(screen.getByText('vs. previous 30 days')).toBeOnTheScreen();
  });

  it('rejects invalid stacked bars and negative donut values', () => {
    expect(() => render(
      <BarChart title="Invalid stack" mode="stacked" data={[{ label: 'Mon', values: { organic: -1 } }]} series={[{ key: 'organic', label: 'Organic' }]} />
    )).toThrow(RangeError);
    expect(() => render(<DonutChart title="Invalid split" data={[{ label: 'Desktop', value: -1 }]} />)).toThrow(RangeError);
  });
});
