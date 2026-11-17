import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  BottomSheet,
  Carousel,
  Divider,
  FileUploadInput,
  HelperText,
  Indicator,
  Pips,
  Popover,
  SegmentedButtons,
  SelectCard,
  SideSheet,
  StarRating,
  SteppedProgressBar,
  Stepper,
  Tag,
  Typography
} from '../src/index';

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.open = true;
    }
  });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    }
  });
});

describe('reference catalog extensions', () => {
  it('renders semantic text, status, divider, helper, and removable tag primitives', () => {
    const onRemove = vi.fn();
    render(
      <>
        <Divider />
        <HelperText error>Choose a workspace name.</HelperText>
        <Indicator status="success" label="All systems operational" />
        <Tag onRemove={onRemove}>Draft</Tag>
        <Typography variant="heading-2">Account settings</Typography>
      </>
    );

    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Choose a workspace name.');
    expect(screen.getByRole('status')).toHaveTextContent('All systems operational');
    fireEvent.click(screen.getByRole('button', { name: 'Remove tag' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', { name: 'Account settings', level: 2 })).toBeInTheDocument();
  });

  it('changes carousel, pips, segmented selection, cards, and ratings', () => {
    const onCarouselChange = vi.fn();
    const onSegmentChange = vi.fn();
    const onCardChange = vi.fn();
    const onRatingChange = vi.fn();
    render(
      <>
        <Carousel slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>]} onIndexChange={onCarouselChange} />
        <Pips count={3} index={0} label="Choose page" onIndexChange={onCarouselChange} />
        <SegmentedButtons label="Display density" options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value="comfortable" onValueChange={onSegmentChange} />
        <SelectCard label="Workspace plan" options={[{ value: 'team', title: 'Team', description: 'For collaboration' }]} value="" onValueChange={onCardChange} />
        <StarRating label="Satisfaction" value={3} onValueChange={onRatingChange} />
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    fireEvent.click(screen.getByRole('button', { name: 'Choose page 3' }));
    fireEvent.click(screen.getByRole('button', { name: 'Compact' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Team. For collaboration' }));
    fireEvent.click(screen.getByRole('button', { name: '5 of 5 stars' }));

    expect(screen.getByText('Slide two')).toBeInTheDocument();
    expect(onCarouselChange).toHaveBeenCalledWith(1);
    expect(onCarouselChange).toHaveBeenCalledWith(2);
    expect(onSegmentChange).toHaveBeenCalledWith('compact');
    expect(onCardChange).toHaveBeenCalledWith('team');
    expect(onRatingChange).toHaveBeenCalledWith(5);
  });

  it('supports step progress, back/continue actions, a popover, and file selection', () => {
    const onStepChange = vi.fn();
    const onFilesSelected = vi.fn();
    render(
      <>
        <SteppedProgressBar label="Setup progress" activeStep={1} steps={[{ label: 'Profile' }, { label: 'Security' }]} />
        <Stepper label="Setup" activeStep={1} steps={[{ label: 'Profile' }, { label: 'Security' }, { label: 'Review' }]} onStepChange={onStepChange} />
        <Popover trigger="Learn more"><p>Details stay close to the control.</p></Popover>
        <FileUploadInput label="Attach documents" onFilesSelected={onFilesSelected} accept=".pdf" multiple helperText="PDF files only." />
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Learn more' }));
    fireEvent.click(screen.getByRole('button', { name: 'Attach documents' }));
    const fileInput = screen.getByLabelText('Attach documents') as HTMLInputElement;
    const file = new File(['report'], 'report.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onStepChange).toHaveBeenCalledWith(2);
    expect(screen.getByText('Details stay close to the control.')).toBeInTheDocument();
    expect(onFilesSelected).toHaveBeenCalledWith(expect.objectContaining({ 0: file, length: 1 }));
    expect(screen.getAllByRole('list', { name: 'Setup progress' })).toHaveLength(2);
  });

  it('provides bottom and side sheets with accessible dialog semantics', () => {
    const { container } = render(
      <>
        <BottomSheet open onOpenChange={() => {}} title="Share link">Sheet content</BottomSheet>
        <SideSheet open={false} onOpenChange={() => {}} title="Settings">Side content</SideSheet>
      </>
    );

    expect(screen.getByRole('dialog', { name: 'Share link' })).toHaveClass('qzl-sheet--bottom');
    expect(container.querySelector('dialog.qzl-sheet--side')).not.toHaveAttribute('open');
  });
});
