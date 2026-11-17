'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  Accordion,
  Alert,
  Avatar,
  BarChart,
  Badge,
  Breadcrumbs,
  Button,
  BottomSheet,
  Carousel,
  Card,
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
  QrScanner,
  RadioGroup,
  Skeleton,
  SegmentedButtons,
  Select,
  SelectCard,
  SideSheet,
  Slider,
  Spinner,
  StarRating,
  SteppedProgressBar,
  Stepper,
  Switch,
  Tag,
  Tabs,
  Textarea,
  Toast,
  Tooltip,
  Typography
} from '@qzl/react';
import { getThemeCssVariables, type ThemeName } from '@qzl/tokens';
import type { ButtonSize, ButtonVariant } from '@qzl/react';
import { componentRegistry } from './generated/component-registry';
import type { ApiProperty, ComponentRecord, PlatformApi } from './generated/component-registry';

const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const buttonSizes: ButtonSize[] = ['sm', 'md', 'lg'];
const statusVariants = ['info', 'success', 'warning', 'danger'] as const;
const indicatorStatuses = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
const badgeVariants = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
const tagVariants = ['neutral', 'primary', 'success', 'warning', 'danger'] as const;
const iconButtonVariants = ['neutral', 'primary', 'danger'] as const;
const spinnerSizes = ['sm', 'md', 'lg'] as const;
const avatarSizes = ['sm', 'md', 'lg'] as const;
const steps = [{ label: 'Profile' }, { label: 'Security' }, { label: 'Review' }];
const tableRows = [{ name: 'Design system' }, { name: 'Component docs' }];
const tableColumns = [{
  key: 'name',
  header: 'Project',
  render: (row: typeof tableRows[number]) => row.name,
  sortValue: (row: typeof tableRows[number]) => row.name
}];

type PreviewState = {
  buttonVariant: ButtonVariant;
  buttonSize: ButtonSize;
  statusVariant: typeof indicatorStatuses[number];
  badgeVariant: typeof badgeVariants[number];
  tagVariant: typeof tagVariants[number];
  iconButtonVariant: typeof iconButtonVariants[number];
  spinnerSize: typeof spinnerSizes[number];
  avatarSize: typeof avatarSizes[number];
  disabled: boolean;
  checked: boolean;
  error: boolean;
  value: number;
  rating: number;
  stepIndex: number;
  density: string;
  plan: string;
  selectedTab: string;
  selectedOption: string;
  open: boolean;
  theme: ThemeName;
};

function createInitialState(): PreviewState {
  return {
    buttonVariant: 'primary',
    buttonSize: 'md',
    statusVariant: 'info',
    badgeVariant: 'primary',
    tagVariant: 'neutral',
    iconButtonVariant: 'neutral',
    spinnerSize: 'md',
    avatarSize: 'md',
    disabled: false,
    checked: true,
    error: false,
    value: 64,
    rating: 4,
    stepIndex: 1,
    density: 'comfortable',
    plan: 'team',
    selectedTab: 'overview',
    selectedOption: 'team',
    open: false,
    theme: 'light'
  };
}

function ApiTable({ api }: { api: PlatformApi }) {
  return (
    <div className="component-api">
      {api.extends.length > 0 && (
        <div className="component-api__inheritance">
          <strong>Extends</strong>
          <span>{api.extends.join(', ')}</span>
          <small>Props inherited from the base type remain available but are not duplicated in this table.</small>
        </div>
      )}
      <div className="component-api__scroll">
        <table>
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            {api.props.map((property) => <ApiRow key={property.name} property={property} />)}
            {api.props.length === 0 && <tr><td colSpan={5}>This component declares no additional props.</td></tr>}
          </tbody>
        </table>
      </div>
      {api.examples.length > 0 && (
        <div className="component-api__source-examples">
          <strong>Usage examples</strong>
          {api.examples.map((example, index) => <pre key={index}><code>{example}</code></pre>)}
        </div>
      )}
    </div>
  );
}

function ApiRow({ property }: { property: ApiProperty }) {
  return (
    <tr>
      <th scope="row"><code>{property.name}</code>{property.optional && <span className="component-api__optional">optional</span>}</th>
      <td>
        <code>{property.type}</code>
        {property.allowedValues.length > 0 && <small className="component-api__values">Values: {property.allowedValues.map(String).join(' · ')}</small>}
        {property.relatedTypes.map((relatedType) => (
          <details className="component-api__type" key={`${relatedType.sourcePath}:${relatedType.name}`}>
            <summary>{relatedType.name} definition</summary>
            {relatedType.description && <p>{relatedType.description}</p>}
            {relatedType.examples.map((example, index) => <pre key={`example-${index}`}><code>{example}</code></pre>)}
            <pre><code>{relatedType.definition}</code></pre>
          </details>
        ))}
      </td>
      <td><code>{property.defaultValue ?? property.documentedDefault ?? 'Not specified'}</code></td>
      <td>{property.required ? 'Yes' : 'No'}</td>
      <td>{property.description || 'No prop-specific description is available.'}</td>
    </tr>
  );
}

function WebPreview({ component, state, update }: {
  component: ComponentRecord;
  state: PreviewState;
  update: (key: keyof PreviewState, value: PreviewState[keyof PreviewState]) => void;
}) {
  switch (component.name) {
    case 'Accordion':
      return <Accordion title="Workspace details" defaultOpen><p>Review the settings before you continue.</p></Accordion>;
    case 'Alert':
      return <Alert variant={state.statusVariant === 'neutral' ? 'info' : state.statusVariant}>Your changes are ready to review.</Alert>;
    case 'Avatar':
      return <Avatar name="Alex Morgan" size={state.avatarSize} />;
    case 'BarChart':
      return <BarChart title="Weekly activity" data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }, { label: 'Wed', value: 15 }]} />;
    case 'Badge':
      return <Badge variant={state.badgeVariant}>In progress</Badge>;
    case 'Breadcrumbs':
      return <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Button' }]} />;
    case 'Button':
      return <Button variant={state.buttonVariant} size={state.buttonSize} disabled={state.disabled}>Save changes</Button>;
    case 'BottomSheet':
      return <div className="component-preview-stack"><Button variant="secondary" onClick={() => update('open', true)}>Open bottom sheet</Button><BottomSheet open={state.open} onOpenChange={(open) => update('open', open)} title="Share link"><p>Choose how you would like to share this link.</p></BottomSheet></div>;
    case 'Carousel':
      return <Carousel slides={[<Card key="overview" className="component-slide"><strong>Overview</strong><span>Review your workspace.</span></Card>, <Card key="details" className="component-slide"><strong>Details</strong><span>Update your preferences.</span></Card>]} />;
    case 'Card':
      return <Card className="component-preview-card"><strong>Workspace settings</strong><p>Manage your account preferences.</p></Card>;
    case 'Checkbox':
      return <Checkbox checked={state.checked} onChange={(event) => update('checked', event.currentTarget.checked)} aria-label="Remember this choice" />;
    case 'DataTable':
      return <DataTable caption="Projects" rows={tableRows} columns={tableColumns} getRowKey={(row) => row.name} />;
    case 'Divider':
      return <div className="component-preview-stack"><span>Account</span><Divider /><span>Preferences</span></div>;
    case 'Dialog':
      return <div className="component-preview-stack"><Button variant="secondary" onClick={() => update('open', true)}>Open dialog</Button><Dialog open={state.open} onOpenChange={(open) => update('open', open)} title="Confirm changes"><p>Save your updated preferences?</p><Button onClick={() => update('open', false)}>Confirm</Button></Dialog></div>;
    case 'DropdownMenu':
      return <DropdownMenu label="Project actions" items={[{ label: 'Edit project', onSelect: () => {} }, { label: 'Duplicate project', onSelect: () => {} }]} />;
    case 'FileUploadInput':
      return <FileUploadInput label="Choose a file" onFilesSelected={() => {}} accept=".pdf,.png" helperText="PDF or PNG files" />;
    case 'HelperText':
      return <HelperText error={state.error}>{state.error ? 'Enter a valid email address.' : 'We will only use this for account updates.'}</HelperText>;
    case 'Indicator':
      return <Indicator label="All systems operational" status={state.statusVariant} />;
    case 'IconButton':
      return <IconButton label="Search" variant={state.iconButtonVariant}><span aria-hidden="true">⌕</span></IconButton>;
    case 'Input':
      return <div className="component-preview-stack"><label htmlFor="component-example-input">Project name</label><Input id="component-example-input" placeholder="Name your project" disabled={state.disabled} error={state.error} /></div>;
    case 'MarkdownEditor':
      return <MarkdownEditor label="Release notes" value="# Improvements\n\n- Faster setup" onValueChange={() => {}} preview />;
    case 'NavigationMenu':
      return <NavigationMenu label="Project navigation" items={[{ label: 'Overview', href: '#overview', current: true }, { label: 'Settings', href: '#settings' }]} />;
    case 'Pagination':
      return <Pagination page={2} pageCount={5} onPageChange={() => {}} />;
    case 'Pips':
      return <Pips count={4} index={state.stepIndex} onIndexChange={(index) => update('stepIndex', index)} label="Choose slide" />;
    case 'Popover':
      return <Popover trigger="What is this?"><p>Contextual details stay close to their trigger.</p></Popover>;
    case 'Progress':
      return <Progress label="Upload progress" value={state.value} />;
    case 'QrScanner':
      return <QrScanner onScan={() => {}} />;
    case 'RadioGroup':
      return <RadioGroup label="Workspace plan" name="component-plan" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value={state.plan} onValueChange={(plan) => update('plan', plan)} />;
    case 'Skeleton':
      return <div className="component-preview-stack"><Skeleton /><Skeleton circle /></div>;
    case 'SegmentedButtons':
      return <SegmentedButtons label="Display density" value={state.density} onValueChange={(density) => update('density', density)} options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} />;
    case 'Select':
      return <div className="component-preview-stack"><label htmlFor="component-example-select">Workspace plan</label><Select id="component-example-select" value={state.plan} onChange={(event) => update('plan', event.currentTarget.value)}><option value="team">Team</option><option value="individual">Individual</option></Select></div>;
    case 'SelectCard':
      return <SelectCard label="Workspace plan" value={state.plan} onValueChange={(plan) => update('plan', plan)} options={[{ value: 'team', title: 'Team', description: 'For collaboration' }, { value: 'individual', title: 'Individual', description: 'For personal work' }]} />;
    case 'SideSheet':
      return <div className="component-preview-stack"><Button variant="secondary" onClick={() => update('open', true)}>Open side sheet</Button><SideSheet open={state.open} onOpenChange={(open) => update('open', open)} title="Workspace settings"><p>Manage your workspace preferences.</p></SideSheet></div>;
    case 'Slider':
      return <Slider label="Completion" min={0} max={100} value={state.value} onValueChange={(value) => update('value', value)} />;
    case 'Spinner':
      return <Spinner label="Saving changes" size={state.spinnerSize} />;
    case 'StarRating':
      return <StarRating label="Satisfaction" value={state.rating} max={5} onValueChange={(value) => update('rating', value)} />;
    case 'SteppedProgressBar':
      return <SteppedProgressBar label="Setup progress" steps={steps} activeStep={state.stepIndex} />;
    case 'Stepper':
      return <Stepper label="Setup steps" steps={steps} activeStep={state.stepIndex} onStepChange={(index) => update('stepIndex', index)} />;
    case 'Switch':
      return <Switch checked={state.checked} onCheckedChange={(checked) => update('checked', checked)} aria-label="Email updates" />;
    case 'Tag':
      return <Tag variant={state.tagVariant}>Team workspace</Tag>;
    case 'Tabs':
      return <Tabs items={[{ value: 'overview', label: 'Overview' }, { value: 'activity', label: 'Activity' }]} value={state.selectedTab} onValueChange={(value) => update('selectedTab', value)} panelId="component-tab-panel" />;
    case 'Textarea':
      return <div className="component-preview-stack"><label htmlFor="component-example-textarea">Project notes</label><Textarea id="component-example-textarea" placeholder="Add a note" disabled={state.disabled} error={state.error} rows={3} /></div>;
    case 'Toast':
      return <Toast title="Preferences saved" description="Your workspace settings are up to date." variant={state.statusVariant === 'neutral' ? 'info' : state.statusVariant} />;
    case 'Tooltip':
      return <Tooltip content="A short explanation of this action."><Button variant="secondary">Hover or focus me</Button></Tooltip>;
    case 'Typography':
      return <div className="component-preview-stack"><Typography variant="heading-2">A clear heading</Typography><Typography variant="body">Readable text with a consistent type scale.</Typography></div>;
    default:
      return <p>This component is exported by the package, but no live preview has been configured yet.</p>;
  }
}

function ComponentPlayground({ component, state, update }: {
  component: ComponentRecord;
  state: PreviewState;
  update: (key: keyof PreviewState, value: PreviewState[keyof PreviewState]) => void;
}) {
  const webProps = component.platforms.web;
  const nativeApi = component.platforms.native ?? component.platforms.nativeOptional;
  const declaredProps = webProps?.props ?? nativeApi?.props ?? [];
  const available = (name: string) => declaredProps.some((prop) => prop.name === name);
  return (
    <div className="component-playground">
      <div className="component-playground__controls">
        <strong>Controls</strong>
        {component.name === 'Button' && <>
          <label>Variant<select value={state.buttonVariant} onChange={(event) => update('buttonVariant', event.target.value as ButtonVariant)}>{buttonVariants.map((variant) => <option key={variant}>{variant}</option>)}</select></label>
          <label>Size<select value={state.buttonSize} onChange={(event) => update('buttonSize', event.target.value as ButtonSize)}>{buttonSizes.map((size) => <option key={size}>{size}</option>)}</select></label>
          <label className="component-playground__check"><input type="checkbox" checked={state.disabled} onChange={(event) => update('disabled', event.target.checked)} /> Disabled</label>
        </>}
        {['Alert', 'Indicator', 'Toast'].includes(component.name) && available(component.name === 'Indicator' ? 'status' : 'variant') && (
          <label>{component.name === 'Indicator' ? 'Status' : 'Variant'}<select value={state.statusVariant} onChange={(event) => update('statusVariant', event.target.value as PreviewState['statusVariant'])}>{(component.name === 'Indicator' ? indicatorStatuses : statusVariants).map((variant) => <option key={variant}>{variant}</option>)}</select></label>
        )}
        {component.name === 'Badge' && <label>Variant<select value={state.badgeVariant} onChange={(event) => update('badgeVariant', event.target.value as PreviewState['badgeVariant'])}>{badgeVariants.map((variant) => <option key={variant}>{variant}</option>)}</select></label>}
        {component.name === 'Tag' && <label>Variant<select value={state.tagVariant} onChange={(event) => update('tagVariant', event.target.value as PreviewState['tagVariant'])}>{tagVariants.map((variant) => <option key={variant}>{variant}</option>)}</select></label>}
        {component.name === 'IconButton' && <label>Variant<select value={state.iconButtonVariant} onChange={(event) => update('iconButtonVariant', event.target.value as PreviewState['iconButtonVariant'])}>{iconButtonVariants.map((variant) => <option key={variant}>{variant}</option>)}</select></label>}
        {component.name === 'Avatar' && <label>Size<select value={state.avatarSize} onChange={(event) => update('avatarSize', event.target.value as PreviewState['avatarSize'])}>{avatarSizes.map((size) => <option key={size}>{size}</option>)}</select></label>}
        {component.name === 'Spinner' && <label>Size<select value={state.spinnerSize} onChange={(event) => update('spinnerSize', event.target.value as PreviewState['spinnerSize'])}>{spinnerSizes.map((size) => <option key={size}>{size}</option>)}</select></label>}
        {component.name === 'Progress' && <label>Value<input type="range" min="0" max="100" value={state.value} onChange={(event) => update('value', Number(event.target.value))} /></label>}
        {['Input', 'Textarea'].includes(component.name) && <>
          <label className="component-playground__check"><input type="checkbox" checked={state.disabled} onChange={(event) => update('disabled', event.target.checked)} /> Disabled</label>
          <label className="component-playground__check"><input type="checkbox" checked={state.error} onChange={(event) => update('error', event.target.checked)} /> Error</label>
        </>}
        {component.name === 'HelperText' && <label className="component-playground__check"><input type="checkbox" checked={state.error} onChange={(event) => update('error', event.target.checked)} /> Error</label>}
        {!['Button', 'Alert', 'Indicator', 'Toast', 'Badge', 'Tag', 'IconButton', 'Avatar', 'Spinner', 'Progress', 'Input', 'Textarea', 'HelperText'].includes(component.name) && <span>Use the live component controls in the preview.</span>}
      </div>
      <div className={`component-playground__preview qzl-docs--${state.theme}`} style={getThemeCssVariables(state.theme) as CSSProperties}>
        <WebPreview component={component} state={state} update={update} />
      </div>
    </div>
  );
}

function CodeExample({ code, importCode, onCopy }: { code: string; importCode: string; onCopy: (value: string) => void }) {
  return (
    <div className="component-code">
      <div className="component-code__bar"><span>TypeScript / TSX</span><div><button type="button" onClick={() => onCopy(importCode)}>Copy import</button><button type="button" onClick={() => onCopy(code)}>Copy example</button></div></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function getAccessibilityProps(api: PlatformApi) {
  return api.props.filter((property) =>
    /^(aria-|accessibility|role$|label$|name$|disabled$)/i.test(property.name)
  );
}

function getCustomizationNotes(component: ComponentRecord) {
  const webApi = component.platforms.web;
  const nativeApi = component.platforms.native ?? component.platforms.nativeOptional;
  const notes = [];
  if (webApi?.props.some((property) => property.name === 'className') || webApi?.extends.some((type) => /HTMLAttributes/.test(type))) {
    notes.push('Web: the component accepts `className` or inherits standard HTML attributes; use the package stylesheet and semantic CSS variables for visual customization.');
  }
  if (nativeApi?.props.some((property) => property.name === 'style') || nativeApi?.extends.some((type) => /Props/.test(type))) {
    notes.push('React Native: use the documented `style` or platform base props when present. The React Native package does not use Web CSS classes.');
  }
  if (!notes.length) notes.push('No component-specific styling prop is declared. Use the documented theme and compose the component with its surrounding layout.');
  return notes;
}

export function ComponentDocumentationPage({ component, onCopy, onNavigate }: {
  component: ComponentRecord;
  onCopy: (value: string) => void;
  onNavigate: (slug: string) => void;
}) {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [apiPlatform, setApiPlatform] = useState<'web' | 'native'>('web');
  const [usagePlatform, setUsagePlatform] = useState<'web' | 'native'>('web');
  const [customizationPlatform, setCustomizationPlatform] = useState<'web' | 'native'>('web');
  const [state, setState] = useState<PreviewState>(createInitialState);
  const currentApi = apiPlatform === 'web'
    ? component.platforms.web
    : component.platforms.native ?? component.platforms.nativeOptional;
  const usageCode = usagePlatform === 'web' ? component.examples.web : component.examples.native;
  const usageApi = usagePlatform === 'web'
    ? component.platforms.web
    : component.platforms.native ?? component.platforms.nativeOptional;
  const customizationCode = component.examples.customization?.[customizationPlatform];
  const customizationApi = customizationPlatform === 'web'
    ? component.platforms.web
    : component.platforms.native ?? component.platforms.nativeOptional;
  const accessibilityProps = currentApi ? getAccessibilityProps(currentApi) : [];
  const customizationNotes = getCustomizationNotes(component);
  const update = (key: keyof PreviewState, value: PreviewState[keyof PreviewState]) => {
    setState((current) => ({ ...current, [key]: value }));
  };
  const sortedComponents = componentRegistry.components;
  const componentIndex = sortedComponents.findIndex((item) => item.slug === component.slug);
  const previous = sortedComponents[componentIndex - 1];
  const next = sortedComponents[componentIndex + 1];
  const webApi = component.platforms.web;
  const nativeApi = component.platforms.native ?? component.platforms.nativeOptional;
  const nativeAvailability = component.platforms.native ? 'React Native' : component.platforms.nativeOptional ? 'React Native (optional Expo entry)' : null;

  return (
    <article className="component-doc-page">
      <div className="component-doc-page__breadcrumb">Components <span>/</span> {component.category} <span>/</span> {component.name}</div>
      <header className="component-doc-header">
        <div>
          <div className="component-doc-header__eyebrow">{component.category}</div>
          <h1>{component.name}</h1>
          <p>{component.description}</p>
        </div>
        <span className={`component-status component-status--${component.status}`}>{component.status}</span>
      </header>
      <div className="component-doc-meta">
        {webApi && <span className="component-doc-meta__platform"><span>Web</span><code>{webApi.packageName}</code></span>}
        {nativeAvailability && nativeApi && <span className="component-doc-meta__platform"><span>{nativeAvailability}</span><code>{nativeApi.packageName}</code></span>}
      </div>

      <section className="component-doc-section" id="overview">
        <h2>Overview</h2>
        <p>{component.description}</p>
        <p>Use this component when its interaction and visual purpose fit the surrounding flow. Review each platform’s API below; similarly named implementations may have different props and behavior.</p>
      </section>

      <section className="component-doc-section" id="playground">
        <div className="component-doc-section__heading">
          <div><h2>Interactive playground</h2><p>Preview the actual Web component and adjust supported controls.</p></div>
          <label className="component-theme-control">Preview theme
            <select value={theme} onChange={(event) => {
              const nextTheme = event.target.value as ThemeName;
              setTheme(nextTheme);
              update('theme', nextTheme);
            }}>
              <option value="light">Light</option><option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <ComponentPlayground component={component} state={{ ...state, theme }} update={update} />
        <button className="component-reset" type="button" onClick={() => {
          setState(createInitialState());
          setTheme('light');
        }}>Reset preview</button>
      </section>

      <section className="component-doc-section" id="examples">
        <div className="component-doc-section__heading">
          <div><h2>Web and React Native examples</h2><p>Each snippet uses the package-specific public import path and props.</p></div>
          <div className="component-platform-tabs" role="group" aria-label="Example platform">
            {(['web', 'native'] as const).filter((platform) => platform === 'web' ? component.platforms.web : component.platforms.native || component.platforms.nativeOptional).map((platform) => (
              <button key={platform} type="button" aria-pressed={usagePlatform === platform} onClick={() => setUsagePlatform(platform)}>{platform === 'web' ? 'Web' : 'React Native'}</button>
            ))}
          </div>
        </div>
        <p className="component-doc-note">
          {usagePlatform === 'web'
            ? 'Import the stylesheet once in the application entry point.'
            : component.platforms.nativeOptional?.dependencies
              ? `Optional React Native entry; install ${component.platforms.nativeOptional.dependencies.join(', ')} in the Expo application.`
              : 'Use the React Native implementation and props shown in its API reference.'}
        </p>
        {usageCode && usageApi ? <CodeExample code={usageCode} importCode={`import { ${component.name} } from '${usageApi.importPath}';${usagePlatform === 'web' ? "\nimport '@qzl/react/styles.css';" : ''}`} onCopy={onCopy} /> : <p>This component is not available on the selected platform.</p>}
      </section>

      <section className="component-doc-section" id="api">
        <div className="component-doc-section__heading">
          <div><h2>API reference</h2><p>Extracted from the exported TypeScript declarations and their source JSDoc.</p></div>
          <div className="component-platform-tabs" role="group" aria-label="API platform">
            {(['web', 'native'] as const).filter((platform) => platform === 'web' ? component.platforms.web : component.platforms.native || component.platforms.nativeOptional).map((platform) => (
              <button key={platform} type="button" aria-pressed={apiPlatform === platform} onClick={() => setApiPlatform(platform)}>{platform === 'web' ? 'Web' : 'React Native'}</button>
            ))}
          </div>
        </div>
        {currentApi ? (
          <>
            <p className="component-doc-note"><code>{currentApi.importPath}</code> · version {currentApi.version}{currentApi.dependencies ? ` · optional: ${currentApi.dependencies.join(', ')}` : ''}</p>
            <ApiTable api={currentApi} />
          </>
        ) : <p>This component is not available on the selected platform.</p>}
      </section>

      <section className="component-doc-section" id="customization">
        <div className="component-doc-section__heading">
          <div><h2>Customization examples</h2><p>Examples use valid, platform-specific component props.</p></div>
          <div className="component-platform-tabs" role="group" aria-label="Customization platform">
            {(['web', 'native'] as const).filter((platform) => platform === 'web' ? component.platforms.web : component.platforms.native || component.platforms.nativeOptional).map((platform) => (
              <button key={platform} type="button" aria-pressed={customizationPlatform === platform} onClick={() => setCustomizationPlatform(platform)}>{platform === 'web' ? 'Web' : 'React Native'}</button>
            ))}
          </div>
        </div>
        {customizationCode && customizationApi
          ? <CodeExample code={customizationCode} importCode={`import { ${component.name} } from '${customizationApi.importPath}';${customizationPlatform === 'web' ? "\nimport '@qzl/react/styles.css';" : ''}`} onCopy={onCopy} />
          : <p>A verified customization example is not yet available for this platform.</p>}
        <ul className="component-doc-list">{customizationNotes.map((note) => <li key={note}>{note}</li>)}</ul>
        <p>For a Web example using <code>className</code>, define the custom class in your application stylesheet. The <code>@qzl/react</code> stylesheet does not provide app-specific classes.</p>
        <p>Shared design values come from <code>@qzl/tokens</code>. Use the component’s declared props and platform API above; unsupported styling mechanisms are not assumed.</p>
      </section>

      <section className="component-doc-section" id="accessibility">
        <h2>Accessibility</h2>
        <p>Accessibility-related component props are extracted from the selected platform API. Inherited Web or React Native props are identified in the API table and remain available according to the base type.</p>
        {accessibilityProps.length > 0 ? (
          <ul className="component-doc-list">{accessibilityProps.map((property) => <li key={property.name}><code>{property.name}</code> — <code>{property.type}</code></li>)}</ul>
        ) : <p>No component-specific accessibility props are declared for this platform. Inspect the base props and the rendered semantics before use.</p>}
      </section>

      <nav className="component-doc-pagination" aria-label="Component pages">
        {previous ? <button type="button" onClick={() => onNavigate(previous.slug)}>← {previous.name}</button> : <span />}
        {next ? <button type="button" onClick={() => onNavigate(next.slug)}>{next.name} →</button> : <span />}
      </nav>
    </article>
  );
}

export type { ComponentRecord };
