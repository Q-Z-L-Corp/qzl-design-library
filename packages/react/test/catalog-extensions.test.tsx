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

  it('clears an interactive star rating to zero only when enabled', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(<StarRating value={4} allowClear />);
    expect(screen.queryByRole('button', { name: 'Clear rating' })).not.toBeInTheDocument();

    rerender(<StarRating value={4} onValueChange={onValueChange} />);
    expect(screen.queryByRole('button', { name: 'Clear rating' })).not.toBeInTheDocument();

    rerender(<StarRating value={4} onValueChange={onValueChange} allowClear />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear rating' }));
    expect(onValueChange).toHaveBeenCalledWith(0);

    rerender(<StarRating value={0} onValueChange={onValueChange} allowClear />);
    expect(screen.queryByRole('button', { name: 'Clear rating' })).not.toBeInTheDocument();
  });

  it('configures carousel navigation, indicators, looping, and custom controls', () => {
    const { rerender, container } = render(
      <Carousel
        className="custom-carousel"
        defaultIndex={1}
        loop
        navigation="arrows"
        navigationPlacement="overlay"
        pagination="progress"
        slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>]}
      />
    );

    expect(container.querySelector('.qzl-carousel')).toHaveClass('custom-carousel');
    expect(container.querySelector('.qzl-carousel__slide')).toHaveClass('qzl-carousel__slide--overlay');
    expect(container.querySelector('.qzl-carousel__slide-content')).toHaveClass('qzl-carousel__slide-content--overlay-arrows');
    expect(container.querySelector('.qzl-carousel__overlay-controls')).toHaveClass('qzl-carousel__overlay-controls--arrows');
    expect(screen.getByRole('progressbar', { name: 'Slide progress' })).toHaveAttribute('aria-valuenow', '2');
    expect(screen.getByRole('button', { name: 'Previous slide' })).toHaveTextContent('‹');
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText('Slide one')).toBeInTheDocument();

    rerender(
      <Carousel
        navigation="arrows"
        pagination="dots"
        renderNavigation={({ next }) => <button type="button" onClick={next}>Custom next</button>}
        renderPagination={({ goTo, slideCount }) => <button type="button" onClick={() => goTo(slideCount - 1)}>Custom last</button>}
        slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>, <p key="three">Slide three</p>]}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Custom next' }));
    expect(screen.getByText('Slide two')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Custom last' }));
    expect(screen.getByText('Slide three')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Previous slide' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Choose slide 1' })).not.toBeInTheDocument();
  });

  it('reserves slide content space for built-in text controls in overlay placement', () => {
    const { container } = render(
      <Carousel
        navigation="text"
        navigationPlacement="overlay"
        slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>]}
      />
    );

    expect(container.querySelector('.qzl-carousel__slide-content')).toHaveClass('qzl-carousel__slide-content--overlay-text');
    expect(container.querySelector('.qzl-carousel__overlay-controls')).toHaveClass('qzl-carousel__overlay-controls--text');
  });

  it('uses custom labels for built-in carousel navigation text and accessible names', () => {
    const { rerender } = render(
      <Carousel
        previousLabel="Back"
        nextLabel="Continue"
        slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>]}
      />
    );

    expect(screen.getByRole('button', { name: 'Back' })).toHaveTextContent('Back');
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveTextContent('Continue');

    rerender(
      <Carousel
        navigation="arrows"
        previousLabel="Go back"
        nextLabel="Go forward"
        slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>]}
      />
    );

    expect(screen.getByRole('button', { name: 'Go back' })).toHaveTextContent('‹');
    expect(screen.getByRole('button', { name: 'Go forward' })).toHaveTextContent('›');
  });

  it('rejects invalid custom slide indexes while keeping unavailable boundary actions safe', () => {
    let goTo: ((index: number) => void) | undefined;
    let previous: (() => void) | undefined;
    render(
      <Carousel
        renderNavigation={(controls) => {
          goTo = controls.goTo;
          previous = controls.previous;
          return null;
        }}
        slides={[<p key="one">Slide one</p>, <p key="two">Slide two</p>]}
      />
    );

    expect(() => goTo?.(2)).toThrow(RangeError);
    expect(() => previous?.()).not.toThrow();
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

  it('uses custom labels for Stepper navigation controls', () => {
    const onStepChange = vi.fn();
    render(
      <Stepper
        steps={[{ label: 'Profile' }, { label: 'Security' }, { label: 'Review' }]}
        activeStep={1}
        onStepChange={onStepChange}
        backLabel="Previous"
        continueLabel="Next"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onStepChange).toHaveBeenNthCalledWith(1, 0);
    expect(onStepChange).toHaveBeenNthCalledWith(2, 2);
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
