import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  BarChart,
  BottomSheet,
  Breadcrumbs,
  Button,
  Card,
  Carousel,
  Checkbox,
  DataTable,
  Divider,
  Dialog,
  DropdownMenu,
  FileUploadInput,
  HelperText,
  Indicator,
  IconButton,
  Input,
  MarkdownEditor,
  NavigationMenu,
  Pagination,
  Pips,
  Popover,
  Progress,
  RadioGroup,
  Select,
  SelectCard,
  SegmentedButtons,
  Skeleton,
  SideSheet,
  Slider,
  StarRating,
  SteppedProgressBar,
  Stepper,
  Spinner,
  Switch,
  Tag,
  Tabs,
  Textarea,
  Toast,
  Tooltip,
  Typography
} from '@qzl/react-native';

describe('React Native components', () => {
  it('exposes an accessible action and disabled state', () => {
    const onPress = jest.fn();
    render(<Button title="Continue" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    expect(onPress).toHaveBeenCalledTimes(1);

    render(<Button title="Unavailable" disabled />);
    expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  });

  it('announces and toggles an accordion', () => {
    const onPress = jest.fn();
    const onOpenChange = jest.fn();
    render(<Accordion title="Details" onPress={onPress} onOpenChange={onOpenChange}>Extra details</Accordion>);
    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger.props.accessibilityState).toEqual({ expanded: false });
    fireEvent.press(trigger);
    expect(screen.getByRole('button', { name: 'Details' }).props.accessibilityState).toEqual({ expanded: true });
    expect(screen.getByText('Extra details')).toBeOnTheScreen();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('updates controlled checkbox and switch values while preserving press callbacks', () => {
    const onCheckedChange = jest.fn();
    const onPress = jest.fn();
    const onSwitchChange = jest.fn();
    render(
      <>
        <Checkbox checked={false} label="Remember me" onCheckedChange={onCheckedChange} onPress={onPress} />
        <Switch checked={false} accessibilityLabel="Email alerts" onCheckedChange={onSwitchChange} />
      </>
    );

    fireEvent.press(screen.getByRole('checkbox', { name: 'Remember me' }));
    fireEvent(screen.getByRole('switch', { name: 'Email alerts' }), 'valueChange', true);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onSwitchChange).toHaveBeenCalledWith(true);
  });

  it('changes tab and select values using accessible controls', () => {
    const onTabChange = jest.fn();
    const onSelectChange = jest.fn();
    render(
      <>
        <Tabs
          items={[{ value: 'overview', label: 'Overview' }, { value: 'security', label: 'Security' }]}
          value="overview"
          onValueChange={onTabChange}
        />
        <Select
          label="Workspace role"
          options={[{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }]}
          value="viewer"
          onValueChange={onSelectChange}
        />
      </>
    );

    fireEvent.press(screen.getByRole('tab', { name: 'Security' }));
    fireEvent.press(screen.getByRole('combobox', { name: 'Workspace role' }));
    fireEvent.press(screen.getByRole('radio', { name: 'Editor' }));
    expect(onTabChange).toHaveBeenCalledWith('security');
    expect(onSelectChange).toHaveBeenCalledWith('editor');
  });

  it('updates a controlled radio group', () => {
    const onValueChange = jest.fn();
    render(
      <RadioGroup
        label="Link access"
        value="private"
        onValueChange={onValueChange}
        options={[{ value: 'private', label: 'Private' }, { value: 'public', label: 'Public' }]}
      />
    );
    fireEvent.press(screen.getByRole('radio', { name: 'Public' }));
    expect(onValueChange).toHaveBeenCalledWith('public');
  });

  it('sorts a table and keeps cell renderers single-pass', () => {
    const renderName = jest.fn((row: { name: string; count: number }) => row.name);
    const columns = [
      { key: 'name', header: 'Name', render: renderName },
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
    expect(renderName).toHaveBeenCalledTimes(2);
    fireEvent.press(screen.getByRole('button', { name: 'Sort by Count' }));
    expect(screen.getAllByText('Two').length).toBeGreaterThan(0);
  });

  it('supports touch-friendly navigation, menus, and pagination', () => {
    const onNavigate = jest.fn();
    const onSelect = jest.fn();
    const onPageChange = jest.fn();
    const onMore = jest.fn();
    render(
      <>
        <Breadcrumbs items={[{ label: 'Overview', onPress: onNavigate }, { label: 'Settings' }]} />
        <NavigationMenu
          label="Account navigation"
          items={[{ label: 'Dashboard', onPress: onNavigate, current: true }, { label: 'Billing', onPress: onNavigate }]}
        />
        <DropdownMenu label="Actions" items={[{ label: 'Export', onSelect }]} />
        <Pagination page={1} pageCount={3} onPageChange={onPageChange} />
        <IconButton label="More options" onPress={onMore}>•••</IconButton>
      </>
    );

    fireEvent.press(screen.getByRole('link', { name: 'Overview' }));
    fireEvent.press(screen.getByRole('button', { name: 'Billing' }));
    fireEvent.press(screen.getByRole('button', { name: /Actions/ }));
    fireEvent.press(screen.getByRole('button', { name: 'Export' }));
    fireEvent.press(screen.getByRole('button', { name: 'Next page' }));
    fireEvent.press(screen.getByRole('button', { name: 'More options' }));

    expect(onNavigate).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(onMore).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Dashboard' }).props.accessibilityState.selected).toBe(true);
  });

  it('renders labeled status, chart, progress, and loading components', () => {
    render(
      <>
        <Alert variant="danger">Payment failed</Alert>
        <Avatar name="Avery Stone" />
        <Badge variant="success">Verified</Badge>
        <BarChart title="Weekly visits" data={[{ label: 'Monday', value: 12 }]} formatValue={(value) => `${value} visits`} />
        <Card><Text>Workspace summary</Text></Card>
        <Progress value={65} label="Upload progress" />
        <Spinner label="Loading workspace" />
      </>
    );

    expect(screen.getByText('Payment failed')).toBeOnTheScreen();
    expect(screen.getByRole('image', { name: 'Avery Stone' })).toBeOnTheScreen();
    expect(screen.getByText('Verified')).toBeOnTheScreen();
    expect(screen.getByText('12 visits')).toBeOnTheScreen();
    expect(screen.getByText('Workspace summary')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeOnTheScreen();
    expect(screen.getByLabelText('Loading workspace')).toBeOnTheScreen();
  });

  it('hides skeleton placeholders from screen readers', () => {
    const { toJSON } = render(<Skeleton />);
    expect(toJSON()).toMatchObject({ props: { accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' } });
  });

  it('uses native modal, help, text entry, and slider interactions', () => {
    const onOpenChange = jest.fn();
    const onNameChange = jest.fn();
    const onNotesChange = jest.fn();
    const onValueChange = jest.fn();
    render(
      <>
        <Dialog open onOpenChange={onOpenChange} title="Delete workspace" description="This cannot be undone.">
          <Text>Confirm deletion</Text>
        </Dialog>
        <Tooltip content="A strong passphrase protects your workspace."><Text>Passphrase</Text></Tooltip>
        <Input accessibilityLabel="Workspace name" onChangeText={onNameChange} />
        <Textarea accessibilityLabel="Notes" onChangeText={onNotesChange} />
        <Slider label="Volume" value={50} onValueChange={onValueChange} min={0} max={100} />
      </>
    );

    fireEvent.press(screen.getByRole('button', { name: 'Close dialog' }));
    fireEvent.press(screen.getByRole('button', { name: 'Show help' }));
    fireEvent.changeText(screen.getByLabelText('Workspace name'), 'QZL');
    fireEvent.changeText(screen.getByLabelText('Notes'), 'Review before publishing');
    fireEvent(screen.getByLabelText('Volume'), 'valueChange', 70);

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByText('A strong passphrase protects your workspace.')).toBeOnTheScreen();
    expect(onNameChange).toHaveBeenCalledWith('QZL');
    expect(onNotesChange).toHaveBeenCalledWith('Review before publishing');
    expect(onValueChange).toHaveBeenCalledWith(70);
  });

  it('preserves avatar fallback when a custom image error handler is supplied', () => {
    const onError = jest.fn();
    render(<Avatar name="Taylor Swift" uri="https://example.test/avatar.png" testID="avatar-image" onError={onError} />);
    fireEvent(screen.getByTestId('avatar-image'), 'error', { nativeEvent: { error: 'unavailable' } });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByText('TS')).toBeOnTheScreen();
  });

  it('keeps Markdown preview content as text and exposes dismissible urgent notifications', () => {
    render(<MarkdownEditor label="Notes" value="<script>alert(1)</script>" onValueChange={() => {}} preview />);
    expect(screen.getByText('<script>alert(1)</script>')).toBeOnTheScreen();

    const onDismiss = jest.fn();
    render(<Toast title="Could not save" variant="danger" onDismiss={onDismiss} />);
    expect(screen.getByText('Could not save')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders semantic text, status, divider, helper, and removable tag primitives', () => {
    const onRemove = jest.fn();
    render(
      <>
        <Divider />
        <HelperText error>Choose a workspace name.</HelperText>
        <Indicator status="success" label="All systems operational" />
        <Tag onRemove={onRemove}>Draft</Tag>
        <Typography variant="heading-2">Account settings</Typography>
      </>
    );

    expect(screen.getByText('Choose a workspace name.')).toBeOnTheScreen();
    expect(screen.getByLabelText('All systems operational')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Remove tag' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Account settings')).toBeOnTheScreen();
  });

  it('supports carousel pips, segmented buttons, selectable cards, and star ratings', () => {
    const onCarouselChange = jest.fn();
    const onSegmentChange = jest.fn();
    const onCardChange = jest.fn();
    const onRatingChange = jest.fn();
    render(
      <>
        <Carousel slides={[<Text key="one">Slide one</Text>, <Text key="two">Slide two</Text>]} onIndexChange={onCarouselChange} />
        <Pips count={3} index={0} label="Choose page" onIndexChange={onCarouselChange} />
        <SegmentedButtons label="Display density" options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value="comfortable" onValueChange={onSegmentChange} />
        <SelectCard label="Workspace plan" options={[{ value: 'team', title: 'Team', description: 'For collaboration' }]} value="" onValueChange={onCardChange} />
        <StarRating label="Satisfaction" value={3} onValueChange={onRatingChange} />
      </>
    );

    fireEvent.press(screen.getByRole('button', { name: 'Next slide' }));
    fireEvent.press(screen.getByRole('button', { name: 'Choose page 3' }));
    fireEvent.press(screen.getByRole('radio', { name: 'Compact' }));
    fireEvent.press(screen.getByRole('radio', { name: 'Team. For collaboration' }));
    fireEvent.press(screen.getByRole('radio', { name: '5 of 5 stars' }));

    expect(screen.getByText('Slide two')).toBeOnTheScreen();
    expect(onCarouselChange).toHaveBeenCalledWith(1);
    expect(onCarouselChange).toHaveBeenCalledWith(2);
    expect(onSegmentChange).toHaveBeenCalledWith('compact');
    expect(onCardChange).toHaveBeenCalledWith('team');
    expect(onRatingChange).toHaveBeenCalledWith(5);
  });

  it('advances steps and exposes upload and popover actions', () => {
    const onStepChange = jest.fn();
    const onFilesPress = jest.fn();
    render(
      <>
        <SteppedProgressBar label="Setup progress" activeStep={1} steps={[{ label: 'Profile' }, { label: 'Security' }]} />
        <Stepper label="Setup" activeStep={1} steps={[{ label: 'Profile' }, { label: 'Security' }, { label: 'Review' }]} onStepChange={onStepChange} />
        <Popover trigger="Learn more"><Text>Details stay close to the control.</Text></Popover>
        <FileUploadInput label="Attach documents" onPress={onFilesPress} selectedFiles={['report.pdf']} helperText="Choose a file." />
      </>
    );

    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.press(screen.getByRole('button', { name: 'Learn more' }));
    fireEvent.press(screen.getByRole('button', { name: 'Attach documents' }));

    expect(onStepChange).toHaveBeenCalledWith(2);
    expect(screen.getByText('Details stay close to the control.')).toBeOnTheScreen();
    expect(onFilesPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('report.pdf')).toBeOnTheScreen();
  });

  it('renders bottom and side sheets as dismissible native modals', () => {
    const onBottomSheetChange = jest.fn();
    render(
      <>
        <BottomSheet open onOpenChange={onBottomSheetChange} title="Share link"><Text>Share options</Text></BottomSheet>
        <SideSheet open={false} onOpenChange={() => {}} title="Settings"><Text>Settings options</Text></SideSheet>
      </>
    );

    fireEvent.press(screen.getByRole('button', { name: 'Close Share link' }));
    expect(onBottomSheetChange).toHaveBeenCalledWith(false);
    expect(screen.getByText('Share options')).toBeOnTheScreen();
  });
});
