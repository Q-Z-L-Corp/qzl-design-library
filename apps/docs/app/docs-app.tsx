'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  Alert,
  Accordion,
  AreaChart,
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
  DonutChart,
  Dialog,
  DropdownMenu,
  FileUploadInput,
  HelperText,
  Indicator,
  IconButton,
  Input,
  LineChart,
  MetricCard,
  MarkdownEditor,
  NavigationMenu,
  Pagination,
  Popover,
  Progress,
  QrScanner,
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
} from '@qzlcorp/react';
import { getThemeCssVariables, qzlTokens, type ThemeName } from '@qzlcorp/tokens';
import type { ButtonSize, ButtonVariant } from '@qzlcorp/react';
import { componentRegistry } from './generated/component-registry';
import { ComponentDocumentationPage } from './component-documentation';
import { publicApiDocumentation } from './generated/public-api-docs';
import { PublicApiDocumentationPage } from './public-api-documentation';

type DocPage =
  | 'overview'
  | 'getting-started'
  | 'colors'
  | 'type-spacing'
  | 'buttons'
  | 'inputs'
  | 'selection'
  | 'feedback'
  | 'cards'
  | 'tabs'
  | 'overlays'
  | 'navigation'
  | 'data'
  | 'advanced'
  | 'catalog'
  | 'notifications'
  | 'playground'
  | 'api-reference'
  | 'dashboard'
  | 'safety';

const navigation: { label: string; items: { id: DocPage; label: string }[] }[] = [
  { label: 'Start here', items: [{ id: 'overview', label: 'Overview' }, { id: 'getting-started', label: 'Getting started' }] },
  { label: 'Foundations', items: [{ id: 'colors', label: 'Color system' }, { id: 'type-spacing', label: 'Type & spacing' }] },
  {
    label: 'Guided component examples',
    items: [
      { id: 'buttons', label: 'Button' },
      { id: 'inputs', label: 'Input & textarea' },
      { id: 'selection', label: 'Checkbox & switch' },
      { id: 'feedback', label: 'Feedback & loading' },
      { id: 'cards', label: 'Card & badge' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'overlays', label: 'Dialog & tooltip' },
      { id: 'navigation', label: 'Navigation & menus' },
      { id: 'data', label: 'Data display' },
      { id: 'advanced', label: 'Editors & QR scanning' },
      { id: 'catalog', label: 'More components' },
      { id: 'notifications', label: 'Notifications' }
    ]
  },
  { label: 'Patterns', items: [{ id: 'dashboard', label: 'Analytics dashboard' }, { id: 'safety', label: 'Safety preview' }] },
  { label: 'Explore', items: [{ id: 'playground', label: 'Playground' }, { id: 'api-reference', label: 'Public API reference' }] }
];

const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const buttonSizes: ButtonSize[] = ['sm', 'md', 'lg'];
const componentTabs = [
  { value: 'preview', label: 'Preview' },
  { value: 'usage', label: 'Usage' },
  { value: 'accessibility', label: 'Accessibility' }
];

function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="docs-page-title">
      <div className="docs-eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function CodeSample({ code, onCopy }: { code: string; onCopy: (value: string) => void }) {
  return (
    <div className="docs-code">
      <div className="docs-code__bar"><span>TypeScript</span><button type="button" onClick={() => onCopy(code)}>Copy</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function getPublicApiSearchText(api: (typeof publicApiDocumentation.packages)[number]['publicApi'][number]) {
  return [
    api.packageName,
    api.name,
    api.description,
    api.signature,
    ...api.parameters.flatMap((parameter) => [parameter.name, parameter.type, parameter.description]),
    ...api.members.flatMap((member) => [
      member.name,
      member.type,
      member.description,
      ...member.callbackParameters.flatMap((parameter) => [parameter.name, parameter.type, parameter.description])
    ])
  ].join(' ').toLowerCase();
}

function PreviewSection({ children, label = 'Interactive preview', overflowVisible = false }: { children: ReactNode; label?: string; overflowVisible?: boolean }) {
  return (
    <div className={overflowVisible ? 'docs-preview docs-preview--overflow-visible' : 'docs-preview'}>
      <div className="docs-preview__bar"><span>{label}</span><Badge variant="success">Live component</Badge></div>
      <div className="docs-preview__body">{children}</div>
    </div>
  );
}

export default function DocsApp() {
  const [activePage, setActivePage] = useState<DocPage>('overview');
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState<ThemeName>('light');
  const [themeReady, setThemeReady] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('qzl-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);
    setThemeReady(true);

    const syncHash = () => {
      const route = window.location.hash.slice(1);
      if (route.startsWith('component/')) {
        const slug = route.slice('component/'.length);
        if (componentRegistry.components.some((component) => component.slug === slug)) {
          setActiveComponent(slug);
          return;
        }
      }
      if (navigation.some((group) => group.items.some((item) => item.id === route))) {
        setActiveComponent(null);
        setActivePage(route as DocPage);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (window.matchMedia('(max-width: 760px)').matches) {
          setMobileNavOpen(true);
          window.setTimeout(() => searchRef.current?.focus(), 0);
        } else {
          searchRef.current?.focus();
        }
      }
      if (event.key === 'Escape') {
        setSearch('');
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    window.localStorage.setItem('qzl-theme', theme);
  }, [theme, themeReady]);

  const visibleNavigation = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return navigation;
    const filtered = navigation
      .map((group) => ({ ...group, items: group.items.filter((item) => item.label.toLowerCase().includes(normalized) || group.label.toLowerCase().includes(normalized)) }))
      .filter((group) => group.items.length > 0);
    const publicApiMatch = publicApiDocumentation.packages.some((pkg) =>
      pkg.publicApi.some((api) => api.kind !== 'component' && getPublicApiSearchText(api).includes(normalized))
    );
    if (publicApiMatch && !filtered.some((group) => group.items.some((item) => item.id === 'api-reference'))) {
      filtered.push({ label: 'Public API', items: [{ id: 'api-reference', label: 'Public API reference' }] });
    }
    return filtered;
  }, [search]);
  const visibleComponentGroups = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return componentRegistry.categories.map((category) => ({
      category,
      components: componentRegistry.components.filter((component) => {
        if (component.category !== category) return false;
        if (!normalized) return true;
        const props = Object.values(component.platforms).flatMap((api) => api?.props.map((property) => `${property.name} ${property.type}`) ?? []);
        return [component.name, component.description, component.category, ...props].join(' ').toLowerCase().includes(normalized);
      })
    })).filter((group) => group.components.length > 0);
  }, [search]);

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice('Copied to clipboard');
    } catch (error) {
      console.error('Unable to copy content:', error);
      setNotice('Clipboard access is unavailable in this browser.');
    }
  }

  function navigateTo(page: DocPage) {
    setActiveComponent(null);
    setActivePage(page);
    setMobileNavOpen(false);
    window.location.hash = page;
  }

  function navigateToComponent(slug: string) {
    setActiveComponent(slug);
    setMobileNavOpen(false);
    window.location.hash = `component/${slug}`;
  }

  function renderContent() {
    const component = componentRegistry.components.find((item) => item.slug === activeComponent);
    if (component) {
      return <ComponentDocumentationPage key={component.slug} component={component} onCopy={copyToClipboard} onNavigate={navigateToComponent} />;
    }

    switch (activePage) {
      case 'getting-started':
        return <GettingStarted onCopy={copyToClipboard} />;
      case 'colors':
        return <ColorsPage onCopy={copyToClipboard} />;
      case 'type-spacing':
        return <TypeSpacingPage />;
      case 'buttons':
        return <ButtonsPage onCopy={copyToClipboard} />;
      case 'inputs':
        return <InputsPage onCopy={copyToClipboard} />;
      case 'selection':
        return <SelectionPage onCopy={copyToClipboard} />;
      case 'feedback':
        return <FeedbackPage onCopy={copyToClipboard} />;
      case 'cards':
        return <CardsPage onCopy={copyToClipboard} />;
      case 'tabs':
        return <TabsPage onCopy={copyToClipboard} />;
      case 'overlays':
        return <OverlaysPage />;
      case 'navigation':
        return <NavigationPage />;
      case 'data':
        return <DataPage />;
      case 'advanced':
        return <AdvancedPage onCopy={copyToClipboard} />;
      case 'catalog':
        return <CatalogExtensionsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'playground':
        return <PlaygroundPage />;
      case 'api-reference':
        return <PublicApiDocumentationPage records={publicApiDocumentation.packages.flatMap((pkg) => pkg.publicApi)} query={search} />;
      case 'dashboard':
        return <DashboardExample />;
      case 'safety':
        return <SafetyExample />;
      default:
        return <OverviewPage onNavigate={navigateTo} />;
    }
  }

  const themeStyle = getThemeCssVariables(theme) as CSSProperties;

  return (
    <div className={`qzl-docs ${theme === 'dark' ? 'qzl-docs--dark' : ''}`} style={themeStyle}>
      <header className="docs-header">
        <button type="button" className="docs-brand" onClick={() => navigateTo('overview')} aria-label="QZL Design Library home">
          <span className="docs-brand__mark">qzl</span>
          <span className="docs-brand__text"><strong>QZL Design</strong><small>Design system</small></span>
        </button>
        <div className="docs-header__right">
          <span className="docs-version">v0.1 · 49 Web · 48 React Native</span>
          <button className="docs-theme-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} aria-pressed={theme === 'dark'}>
            <span aria-hidden="true">{theme === 'light' ? '◐' : '☼'}</span><span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          <button type="button" className="docs-mobile-menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-expanded={mobileNavOpen} aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}>
            {mobileNavOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div className="docs-layout">
        <aside className={`docs-sidebar ${mobileNavOpen ? 'docs-sidebar--open' : ''}`}>
          <label className="docs-search">
            <span aria-hidden="true">⌕</span>
            <input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search components & APIs" aria-label="Search documentation" />
            <kbd>⌘K / Ctrl+K</kbd>
          </label>
          <nav aria-label="Documentation navigation" className="docs-navigation">
            {visibleNavigation.length === 0 && visibleComponentGroups.length === 0 && <p className="docs-no-results">No matching pages or components.</p>}
            {visibleNavigation.map((group) => (
              <div className="docs-nav-group" key={group.label}>
                <h2>{group.label}</h2>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={activePage === item.id ? 'docs-nav-link docs-nav-link--active' : 'docs-nav-link'}
                    aria-current={activePage === item.id ? 'page' : undefined}
                    onClick={() => {
                      setActiveComponent(null);
                      setActivePage(item.id);
                      setMobileNavOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    {activePage === item.id && <span className="docs-nav-indicator" aria-hidden="true" />}
                  </a>
                ))}
              </div>
            ))}
            {visibleComponentGroups.length > 0 && (
              <div className="docs-nav-group docs-nav-components">
                <h2>Components</h2>
                {visibleComponentGroups.map((group) => (
                  <section className="docs-nav-category" key={group.category}>
                    <h3>{group.category}</h3>
                    {group.components.map((component) => (
                      <a
                        key={component.slug}
                        href={`#component/${component.slug}`}
                        className={activeComponent === component.slug ? 'docs-nav-link docs-nav-link--active' : 'docs-nav-link'}
                        aria-current={activeComponent === component.slug ? 'page' : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToComponent(component.slug);
                        }}
                      >
                        <span>{component.name}</span><span className={`docs-nav-status docs-nav-status--${component.status}`}>{component.status}</span>
                      </a>
                    ))}
                  </section>
                ))}
              </div>
            )}
          </nav>
          <div className="docs-sidebar-note">
            <span className="docs-sidebar-note__icon" aria-hidden="true">✦</span>
            <strong>One design system</strong>
            <p>Shared tokens and themes for Web and React Native.</p>
          </div>
          <div className="docs-sidebar-footer">Open source <span>•</span> MIT License</div>
        </aside>

        <main className="docs-main">
          <div className="docs-content">{renderContent()}</div>
          <footer className="docs-footer">
            <span>QZL Design</span>
            <span>Developed by Q.Z.L Corp. · MIT License</span>
          </footer>
        </main>
      </div>
      {notice && <div className="docs-toast" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
    </div>
  );
}

function OverviewPage({ onNavigate }: { onNavigate: (page: DocPage) => void }) {
  return (
    <>
      <div className="docs-breadcrumb">QZL Design Library <span>/</span> Overview</div>
      <section className="docs-home-hero">
        <div className="docs-home-hero__copy">
          <Badge variant="primary">Open-source design system</Badge>
          <h1>Shared foundations.<br /><span>Web and React Native.</span></h1>
          <p>QZL Design Library is an open-source design system for building consistent, accessible, and expressive interfaces with React for Web and React Native. It provides shared design tokens and themes, reusable components, accessibility guidance, security-conscious input patterns, customization examples, and API documentation.</p>
          <div className="docs-actions">
            <Button size="lg" onClick={() => onNavigate('getting-started')}>Start building <span aria-hidden="true">→</span></Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('buttons')}>Explore components</Button>
          </div>
          <div className="docs-platforms"><span className="docs-platform-dot" /> Web components <span className="docs-platform-separator">·</span> React Native components <span className="docs-platform-separator">·</span> Shared design tokens</div>
        </div>
        <div className="docs-home-hero__visual" aria-label="Preview of QZL Design Library components">
          <div className="docs-preview-orbit docs-preview-orbit--one" />
          <div className="docs-preview-orbit docs-preview-orbit--two" />
          <Card className="docs-hero-card docs-hero-card--main">
            <div className="docs-mini-window"><span /><span /><span /><small>qzl.design</small></div>
            <div className="docs-mini-heading"><span>Component library</span><Badge variant="success">API documented</Badge></div>
            <div className="docs-mini-stat"><strong>49</strong><span>Web components <b>48 React Native</b></span></div>
            <div className="docs-mini-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="docs-mini-footer"><span>Shared foundations</span><span>Tokens · Themes</span></div>
          </Card>
          <div className="docs-floating-tag docs-floating-tag--safe"><span>✓</span> API reference</div>
          <div className="docs-floating-tag docs-floating-tag--ai"><span>✦</span> Theme tokens</div>
        </div>
      </section>
      <section className="docs-overview-grid">
        <button className="docs-overview-card" onClick={() => onNavigate('colors')}>
          <span className="docs-overview-icon docs-overview-icon--colors" aria-hidden="true">◈</span>
          <span className="docs-overview-meta">FOUNDATIONS</span>
          <strong>Shared design foundations</strong>
          <p>Color, type, spacing, shape, and motion values for consistent interfaces.</p>
          <span className="docs-card-link">Explore foundations <b>→</b></span>
        </button>
        <button className="docs-overview-card" onClick={() => onNavigate('buttons')}>
          <span className="docs-overview-icon docs-overview-icon--components" aria-hidden="true">▦</span>
          <span className="docs-overview-meta">COMPONENTS</span>
          <strong>Components for both platforms</strong>
          <p>Web and React Native components with documented APIs and interactive Web previews.</p>
          <span className="docs-card-link">Browse components <b>→</b></span>
        </button>
        <button className="docs-overview-card" onClick={() => onNavigate('playground')}>
          <span className="docs-overview-icon docs-overview-icon--play" aria-hidden="true">✳</span>
          <span className="docs-overview-meta">PLAYGROUND</span>
          <strong>Learn by changing</strong>
          <p>Experiment with live component options and see changes immediately.</p>
          <span className="docs-card-link">Open playground <b>→</b></span>
        </button>
      </section>
      <section className="docs-section docs-why">
        <div><div className="docs-eyebrow">Design principles</div><h2>Clarity and user control.</h2></div>
        <p>Use understandable states, useful feedback, privacy-aware patterns, and interactions that leave decisions with the people using them.</p>
      </section>
    </>
  );
}

function GettingStarted({ onCopy }: { onCopy: (value: string) => void }) {
  const snippet = `import { Button, Card, Input } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Card>\n      <Input aria-label=\"Project name\" placeholder=\"Name your project\" />\n      <Button>Continue</Button>\n    </Card>\n  );\n}`;
  return (
    <>
      <PageTitle eyebrow="START HERE" title="Getting started" description="Choose a platform package, add its styles or peer dependencies, and build with shared design tokens and themes." />
      <div className="docs-callout"><span>i</span><p><strong>Packages are not published yet.</strong> The commands below are for use after the first release. For local development, clone the repository and use its workspace commands.</p></div>
      <div className="docs-section">
        <h2>Install for Web</h2>
        <p>Install the React package in an application using React 18.3.1 or 19 with a matching React DOM version. Its supporting packages are installed as dependencies; add <code>@qzlcorp/tokens</code> directly only if your application imports token APIs.</p>
        <CodeSample code="pnpm add @qzlcorp/react" onCopy={onCopy} />
      </div>
      <div className="docs-section">
        <h2>Use a Web component</h2>
        <p>Import the stylesheet once from your application entry point, then import components where you need them.</p>
        <CodeSample code={snippet} onCopy={onCopy} />
      </div>
      <div className="docs-section">
        <h2>Install for React Native</h2>
        <p>Install the package in an existing application using React 19 and React Native 0.78 or later. The slider and <code>react-native-svg</code> packages are required peer dependencies; <code>expo-camera</code> is needed only for the optional Expo QR scanner.</p>
        <CodeSample code="pnpm add @qzlcorp/react-native @react-native-community/slider react-native-svg" onCopy={onCopy} />
      </div>
      <div className="docs-section">
        <h2>Customize themes</h2>
        <p>Use <code>@qzlcorp/tokens</code> when you need shared values directly. Apply <code>getThemeCssVariables</code> to a Web ancestor; for React Native, use values from <code>themes</code> in component styles.</p>
        <h3>Web</h3>
        <CodeSample code={`import { getThemeCssVariables } from '@qzlcorp/tokens';\nimport type { CSSProperties } from 'react';\n\nconst darkThemeStyle = getThemeCssVariables('dark') as CSSProperties;\n\n<div style={darkThemeStyle}>Web content</div>`} onCopy={onCopy} />
        <h3>React Native</h3>
        <CodeSample code={`import { themes } from '@qzlcorp/tokens';\nimport { Text, View } from 'react-native';\n\nconst palette = themes.dark;\n\n<View style={{ backgroundColor: palette.surface }}>\n  <Text style={{ color: palette.text }}>React Native content</Text>\n</View>`} onCopy={onCopy} />
      </div>
      <div className="docs-section">
        <h2>Run the React Native example</h2>
        <p>From the repository root, start the Expo example to preview the React Native components on iOS or Android.</p>
        <CodeSample code="pnpm start:native" onCopy={onCopy} />
      </div>
      <div className="docs-section docs-platform-table">
        <h2>Package map</h2>
        <div className="docs-package-row"><strong>@qzlcorp/react</strong><span>49 Web components and the package stylesheet</span><Badge variant="success">Web</Badge></div>
        <div className="docs-package-row"><strong>@qzlcorp/react-native</strong><span>48 React Native components and an optional Expo QR scanner entry</span><Badge variant="success">React Native</Badge></div>
        <div className="docs-package-row"><strong>@qzlcorp/tokens</strong><span>Shared design tokens and light and dark theme values</span><Badge>Supporting package</Badge></div>
        <div className="docs-package-row"><strong>@qzlcorp/core</strong><span>Shared helpers used by the component packages</span><Badge>Supporting package</Badge></div>
      </div>
      <div className="docs-section">
        <h2>Platform differences</h2>
        <p>Forty-eight components are available for both Web and React Native, with platform-specific implementations and props. The React Native data visualization components use <code>react-native-svg</code>. The Web package also includes a browser QR scanner; React Native camera scanning is a separate optional Expo entry. Both request camera access only after a person starts a scan and return scanned content without opening it automatically. The React Native file-upload component delegates document-picker integration to the host app.</p>
      </div>
    </>
  );
}

function ColorsPage({ onCopy }: { onCopy: (value: string) => void }) {
  const colorGroups = Object.entries(qzlTokens.colors);
  return (
    <>
      <PageTitle eyebrow="FOUNDATIONS / COLOR" title="Color system" description="Shared color tokens define neutral surfaces, brand colors, and semantic feedback roles." />
      <div className="docs-callout"><span>↗</span><p>Choose colors for meaning and contrast—not decoration. Click a swatch to copy its token value.</p></div>
      {colorGroups.map(([group, value]) => {
        const colors = typeof value === 'string' ? [[group, value] as [string, string]] : Object.entries(value).map(([name, color]) => [name, String(color)] as [string, string]);
        return (
          <section className="docs-section docs-color-group" key={group}>
            <div className="docs-section-heading"><div><h2>{group === 'brand' ? 'Brand colors' : group[0].toUpperCase() + group.slice(1)}</h2><p>{group === 'neutral' ? 'Surface and text colors for interface hierarchy.' : 'Shared design token values for consistent use.'}</p></div><span>{colors.length} tokens</span></div>
            <div className="docs-swatches">
              {colors.map(([name, color]) => (
                <button className="docs-swatch" key={`${group}-${name}`} onClick={() => onCopy(color)} title={`Copy ${color}`} aria-label={`Copy ${group} ${name}, ${color}`}>
                  <span className="docs-swatch__color" style={{ backgroundColor: color }} />
                  <span className="docs-swatch__meta"><strong>{name}</strong><small>{color}</small></span>
                </button>
              ))}
            </div>
          </section>
        );
      })}
      <section className="docs-section">
        <h2>Semantic themes</h2>
        <div className="docs-theme-note"><div className="docs-theme-sample docs-theme-sample--light"><span>Aa</span><small>Light surface</small></div><div className="docs-theme-sample docs-theme-sample--dark"><span>◐</span><small>Dark surface</small></div><p>Use semantic roles such as <code>primary</code>, <code>border</code>, and <code>textMuted</code> so theme values can change without rewriting component logic.</p></div>
        <p>Use semantic roles for component styling and the exported theme values when configuring a Web ancestor or React Native styles.</p>
        <CodeSample code={`import { qzlTokens, themes } from '@qzlcorp/tokens';\n\nconst brandBlue = qzlTokens.colors.brand[500];\nconst sectionSpacing = qzlTokens.spacing.section;\nconst darkSurface = themes.dark.surface;`} onCopy={onCopy} />
      </section>
    </>
  );
}

function TypeSpacingPage() {
  return (
    <>
      <PageTitle eyebrow="FOUNDATIONS / TYPE & SPACE" title="Type & spacing" description="A clear typographic rhythm and a compact spacing scale keep products calm, readable, and consistent." />
      <section className="docs-section docs-type-samples">
        <h2>Typography scale</h2>
        {Object.entries(qzlTokens.typography.sizes).map(([size, value]) => (
          <div className="docs-type-row" key={size}><span>{size}<small>{value}</small></span><strong style={{ fontSize: value, lineHeight: 1.25 }}>Readable interfaces start with clear hierarchy.</strong></div>
        ))}
      </section>
      <section className="docs-section">
        <h2>Spacing scale</h2><p>Use the shared spacing names to create a predictable rhythm across layouts.</p>
        <div className="docs-spacing-list">
          {Object.entries(qzlTokens.spacing).map(([name, value]) => (
            <div className="docs-spacing-row" key={name}><span>{name}</span><div><i style={{ width: value }} /></div><small>{value}</small></div>
          ))}
        </div>
      </section>
      <section className="docs-section docs-shape-row">
        <div><h2>Shape & elevation</h2><p>Use rounded corners purposefully and reserve stronger shadows for surfaces that need separation.</p></div>
        <div className="docs-shape-samples">{Object.entries(qzlTokens.radius).filter(([name]) => name !== 'none').map(([name, value]) => <div key={name} style={{ borderRadius: value }}><span>{name}</span></div>)}</div>
      </section>
    </>
  );
}

function ButtonsPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [disabled, setDisabled] = useState(false);
  const [clicks, setClicks] = useState(0);
  const code = `<Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>\n  Continue\n</Button>`;
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / BUTTON" title="Button" description="Buttons make actions clear. Use the strongest style only for the most important action on a screen." />
      <div className="docs-component-meta"><Badge>Web</Badge><Badge variant="success">React Native</Badge><span>Button semantics · disabled state</span></div>
      <PreviewSection>
        <div className="docs-button-demo"><Button variant={variant} size={size} disabled={disabled} onClick={() => setClicks(clicks + 1)}>Continue</Button><span>Action activated {clicks} {clicks === 1 ? 'time' : 'times'}</span></div>
        <div className="docs-controls">
          <label>Variant<select value={variant} onChange={(event) => setVariant(event.target.value as ButtonVariant)}>{buttonVariants.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Size<select value={size} onChange={(event) => setSize(event.target.value as ButtonSize)}>{buttonSizes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="docs-control-check"><Checkbox checked={disabled} onChange={(event) => setDisabled(event.target.checked)} /> Disabled</label>
        </div>
      </PreviewSection>
      <section className="docs-section">
        <h2>Variants</h2><div className="docs-variant-row">{buttonVariants.map((item) => <div key={item}><Button variant={item}>{item[0].toUpperCase() + item.slice(1)}</Button><small>{item}</small></div>)}</div>
      </section>
      <section className="docs-section"><h2>Usage</h2><CodeSample code={code} onCopy={onCopy} /></section>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>Use an HTML button for actions, keep a visible focus indicator, and provide an explicit accessible name for icon-only buttons. Set <code>type="submit"</code> only inside a form when submission is intended.</p></section>
    </>
  );
}

function InputsPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [value, setValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [team, setTeam] = useState('product');
  const code = `<label htmlFor="project-name">Project name</label>\n<Input id="project-name" value={value} onChange={(event) => setValue(event.target.value)} />\n<label htmlFor="team">Team</label>\n<Select id="team" value={team} onChange={(event) => setTeam(event.target.value)} />\n<Textarea aria-label="Description" placeholder="Add a description" />`;
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / FORMS" title="Input & textarea" description="Form controls should explain what they need, preserve user input, and make errors easy to recover from." />
      <PreviewSection>
        <div className="docs-form-demo">
          <label htmlFor="demo-name">Project name</label>
          <Input id="demo-name" value={value} onChange={(event) => setValue(event.target.value)} placeholder="e.g. Product launch" error={showError} aria-invalid={showError} aria-describedby={showError ? 'demo-name-error' : undefined} />
          {showError && <small className="docs-error" id="demo-name-error">Enter a project name to continue.</small>}
          <label htmlFor="demo-team">Team</label>
          <Select id="demo-team" value={team} onChange={(event) => setTeam(event.target.value)}><option value="product">Product</option><option value="engineering">Engineering</option><option value="design">Design</option></Select>
          <label htmlFor="demo-description">Description <span>Optional</span></label>
          <Textarea id="demo-description" placeholder="What are you working on?" rows={3} />
          <label className="docs-control-check"><Checkbox checked={showError} onChange={(event) => setShowError(event.target.checked)} /> Preview error state</label>
          <div className="docs-field-note">Current value: <strong>{value || 'Nothing entered yet'}</strong></div>
        </div>
      </PreviewSection>
      <section className="docs-section"><h2>Usage</h2><CodeSample code={code} onCopy={onCopy} /></section>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>Associate each field with a visible label. When invalid, set <code>aria-invalid</code> and connect specific error text with <code>aria-describedby</code>.</p></section>
    </>
  );
}

function SelectionPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [remember, setRemember] = useState(false);
  const code = `<label>\n  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} />\n  Remember this device\n</label>\n<Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Enable notifications" />`;
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / SELECTION" title="Checkbox & switch" description="Use a checkbox for independent choices. Use a switch for a setting that takes effect immediately." />
      <PreviewSection>
        <div className="docs-selection-demo">
          <label className="docs-choice"><Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} /><span><strong>Require confirmation</strong><small>Ask before applying this change.</small></span></label>
          <div className="docs-choice docs-choice--switch"><span><strong>Email notifications</strong><small>{enabled ? 'You will receive product updates.' : 'Notifications are currently off.'}</small></span><Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Email notifications" /></div>
          <label className="docs-choice"><Checkbox checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span><strong>Remember this device</strong><small>Keep this device trusted for 30 days.</small></span></label>
        </div>
      </PreviewSection>
      <section className="docs-section"><h2>Usage</h2><CodeSample code={code} onCopy={onCopy} /></section>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>Keep controls associated with meaningful text. The switch exposes its state with <code>aria-checked</code>; its visible label should describe the setting, not the current state.</p></section>
    </>
  );
}

function FeedbackPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [showLoading, setShowLoading] = useState(true);
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / FEEDBACK" title="Feedback & loading" description="Make system status visible and understandable. Motion is subtle, purposeful, and respects reduced-motion preferences." />
      <PreviewSection>
        <div className="docs-feedback-stack">
          <Alert variant="success"><strong>Changes saved.</strong> Your workspace is up to date.</Alert>
          <Alert variant="warning"><strong>Review this link.</strong> We could not verify its destination yet.</Alert>
          <div className="docs-loading-controls"><label className="docs-control-check"><Checkbox checked={showLoading} onChange={(event) => setShowLoading(event.target.checked)} /> Show loading states</label></div>
          {showLoading ? <div className="docs-loading-row"><Spinner label="Loading preview" /><span>Preparing a safe preview…</span></div> : <div className="docs-loading-card"><Skeleton circle /><div><Skeleton style={{ width: '64%' }} /><Skeleton style={{ width: '92%' }} /></div></div>}
        </div>
      </PreviewSection>
      <section className="docs-section"><h2>Loading component usage</h2><CodeSample code={'<Spinner label="Loading preview" />\\n<Skeleton style={{ width: \"12rem\" }} />'} onCopy={onCopy} /></section>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>Announce meaningful progress with a status label, not a decorative spinner alone. Skeletons are hidden from assistive technology while the real content remains loading.</p></section>
    </>
  );
}

function CardsPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / SURFACES" title="Card & badge" description="Cards group related content. Badges communicate concise status or category—not long descriptions." />
      <PreviewSection>
        <div className="docs-card-demo">
          <Card className="docs-example-card">
            <div className="docs-example-card__head"><div><div className="docs-eyebrow">WORKSPACE</div><h3>Campaign links</h3></div><Badge variant="success">Active</Badge></div>
            <p>Organize and monitor the links your team shares with customers.</p>
            <div className="docs-example-card__foot"><span>12 links · Updated just now</span><Button variant="secondary" size="sm" onClick={() => setSaved(!saved)}>{saved ? 'Saved' : 'Save view'}</Button></div>
          </Card>
          <div className="docs-badge-list"><Badge variant="primary">Verified</Badge><Badge variant="success">Healthy</Badge><Badge variant="warning">Review</Badge><Badge variant="danger">Blocked</Badge><Badge variant="neutral">Draft</Badge></div>
        </div>
      </PreviewSection>
      <section className="docs-section"><h2>Usage</h2><CodeSample code={'<Card elevated>\\n  <h2>Campaign links</h2>\\n  <Badge variant=\"success\">Active</Badge>\\n</Card>'} onCopy={onCopy} /></section>
    </>
  );
}

function TabsPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [tab, setTab] = useState('preview');
  const tabContent: Record<string, string> = {
    preview: 'The preview shows the composed component in context.',
    usage: 'Use tabs to switch between peer views of related content.',
    accessibility: 'Keep labels concise and selection states visually clear.'
  };
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / NAVIGATION" title="Tabs" description="Tabs organize closely related views at the same level. Keep the number of choices small and their labels clear." />
      <PreviewSection>
        <div className="docs-tabs-demo">
          <Tabs items={componentTabs} value={tab} onValueChange={setTab} panelId="docs-component-tab-panel" />
          <div className="docs-tab-panel" id="docs-component-tab-panel" role="tabpanel" aria-label={`${tab} content`}>{tabContent[tab]}</div>
        </div>
      </PreviewSection>
      <section className="docs-section"><h2>Usage</h2><CodeSample code={'<Tabs items={items} value={activeTab} onValueChange={setActiveTab} />'} onCopy={onCopy} /></section>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>Provide a visible selected state and keep each tab’s content in a clearly identifiable panel. Prefer navigation links over tabs when the controls change routes.</p></section>
    </>
  );
}

function OverlaysPage() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / OVERLAYS" title="Dialog & tooltip" description="Use a dialog for a focused task that needs attention. Use a tooltip to clarify a control without adding visual clutter." />
      <PreviewSection>
        <div className="docs-overlay-demo">
          <Button onClick={() => setOpen(true)}>Open dialog</Button>
          <Tooltip content="Learn how sharing permissions work">
            <IconButton label="Sharing help">?</IconButton>
          </Tooltip>
          {confirmed && <Badge variant="success">Settings updated</Badge>}
          <Dialog open={open} onOpenChange={setOpen} title="Change link access" description="Choose who can open this shared link.">
            <div className="docs-dialog-options">
              <label><input type="radio" name="access" defaultChecked /> <span><strong>Anyone with the link</strong><small>Anyone can view the destination.</small></span></label>
              <label><input type="radio" name="access" /> <span><strong>Only invited people</strong><small>Require an approved account.</small></span></label>
            </div>
            <div className="docs-dialog-actions"><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => { setOpen(false); setConfirmed(true); }}>Save changes</Button></div>
          </Dialog>
        </div>
      </PreviewSection>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>The dialog renders an HTML <code>&lt;dialog&gt;</code> element, associates it with its title and description, and closes on Escape. Browser behavior manages focus when the modal opens and closes. Tooltips are associated with their trigger and also appear when it receives keyboard focus.</p></section>
    </>
  );
}

function NavigationPage() {
  const [page, setPage] = useState(2);
  const [action, setAction] = useState('No action selected');
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / NAVIGATION" title="Navigation & menus" description="Give people a clear location, a compact set of actions, and predictable ways to move through content." />
      <div className="docs-section docs-component-meta"><Badge>Web</Badge><Badge variant="success">React Native</Badge><span>Links, disclosures, and touch-friendly navigation</span></div>
      <PreviewSection>
        <div className="docs-feedback-stack">
          <div className="docs-selection-demo"><Avatar name="Alex Chen" /><div><strong>Alex Chen</strong><small>Workspace owner</small></div></div>
          <Breadcrumbs items={[{ label: 'Workspace', href: '#workspace' }, { label: 'Links', href: '#links' }, { label: 'Overview' }]} />
          <NavigationMenu label="Workspace sections" items={[{ label: 'Overview', href: '#overview', current: true }, { label: 'Destinations', href: '#destinations' }, { label: 'Settings', href: '#settings' }]} />
          <DropdownMenu label="More actions" items={[{ label: 'Copy link', onSelect: () => setAction('Link copied') }, { label: 'Archive', onSelect: () => setAction('Archive selected') }]} />
          <div className="docs-field-note" role="status">{action}</div>
          <Accordion title="Why use disclosure menus?">They keep secondary actions available without taking permanent space away from the task.</Accordion>
          <Pagination page={page} pageCount={8} onPageChange={setPage} />
          <div className="docs-field-note">Showing page <strong>{page}</strong> of 8</div>
        </div>
      </PreviewSection>
      <section className="docs-section docs-guidance"><h2>Interaction guidance</h2><p>Use breadcrumbs for hierarchy, navigation links for destinations, and disclosure menus for actions. On Web, the menu uses an HTML disclosure; React Native presents a touch-friendly disclosure list.</p></section>
    </>
  );
}

function DataPage() {
  const [threshold, setThreshold] = useState(72);
  const rows = [
    { destination: 'example.com/spring', clicks: 1248, status: 'Healthy' },
    { destination: 'example.com/guide', clicks: 852, status: 'Review' },
    { destination: 'example.com/start', clicks: 2041, status: 'Healthy' }
  ];
  const columns = [
    { key: 'destination', header: 'Destination', render: (row: typeof rows[number]) => row.destination, sortValue: (row: typeof rows[number]) => row.destination },
    { key: 'clicks', header: 'Clicks', render: (row: typeof rows[number]) => row.clicks.toLocaleString(), sortValue: (row: typeof rows[number]) => row.clicks },
    { key: 'status', header: 'Status', render: (row: typeof rows[number]) => <Badge variant={row.status === 'Healthy' ? 'success' : 'warning'}>{row.status}</Badge> }
  ];
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / DATA DISPLAY" title="Tables, charts & metrics" description="Compare values, follow trends, and preserve the underlying data in clear, reusable components." />
      <div className="docs-callout"><span>i</span><p>The values in this preview are sample data; no live service is connected.</p></div>
      <PreviewSection>
        <div className="docs-data-dashboard">
          <div className="docs-data-metrics">
            <MetricCard label="Monthly visits" value="24,815" change="+8.2%" trend="positive" comparison="vs. previous 30 days" />
            <MetricCard label="New signups" value="1,284" change="+5.4%" trend="positive" comparison="vs. previous 30 days" />
            <MetricCard label="Conversion rate" value="3.8%" change="+0.6 pp" trend="positive" comparison="vs. previous 30 days" />
            <MetricCard label="Bounce rate" value="42.1%" change="-2.1 pp" trend="positive" comparison="vs. previous 30 days" />
          </div>
          <div className="docs-data-chart-grid">
            <Card className="docs-data-card">
              <BarChart
                title="Campaign clicks by channel"
                orientation="vertical"
                data={[
                  { label: 'Spring', values: { organic: 1248, referral: 852 } },
                  { label: 'Guide', values: { organic: 1004, referral: 612 } },
                  { label: 'Launch', values: { organic: 2041, referral: 1084 } }
                ]}
                series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]}
                formatValue={(value) => value.toLocaleString()}
              />
            </Card>
            <Card className="docs-data-card">
              <AreaChart
                title="Visits by source"
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                stacked
                series={[
                  { label: 'Direct', values: [180, 220, 205, 260, 242, 190, 215] },
                  { label: 'Organic', values: [240, 280, 310, 295, 340, 310, 365] },
                  { label: 'Referral', values: [90, 110, 125, 100, 145, 130, 155] }
                ]}
                formatValue={(value) => value.toLocaleString()}
              />
            </Card>
            <Card className="docs-data-card">
              <LineChart
                title="Visits and returning visits"
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                series={[
                  { label: 'Visits', values: [510, 610, 640, 655, 720, 630, 735] },
                  { label: 'Returning', values: [205, 244, 250, 278, 302, 260, 318] }
                ]}
                formatValue={(value) => value.toLocaleString()}
              />
            </Card>
            <Card className="docs-data-card">
              <DonutChart
                title="Visitors by device"
                centerLabel="Visitors"
                data={[
                  { label: 'Desktop', value: 1840 },
                  { label: 'Mobile', value: 2120 },
                  { label: 'Tablet', value: 355 }
                ]}
                formatValue={(value) => value.toLocaleString()}
              />
            </Card>
          </div>
          <Card className="docs-data-card">
            <DataTable caption="Shared link performance" columns={columns} rows={rows} getRowKey={(row) => row.destination} />
          </Card>
          <div className="docs-data-progress">
            <Slider label="Campaign completion" min={0} max={100} value={threshold} onValueChange={setThreshold} />
            <Progress label="Campaign completion progress" value={threshold} />
          </div>
        </div>
      </PreviewSection>
      <section className="docs-section docs-guidance"><h2>Accessibility</h2><p>Tables retain semantic headers and sort state. Charts include readable labels and values alongside their visual marks; color is not the only way to distinguish a series or category.</p></section>
    </>
  );
}

function AdvancedPage({ onCopy }: { onCopy: (value: string) => void }) {
  const [markdown, setMarkdown] = useState('# Campaign notes\n\n- Use clear destinations\n- Review before sharing');
  const [scannedValue, setScannedValue] = useState('');
  const [scanMessage, setScanMessage] = useState('Start a scan when you are ready.');
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / ADVANCED INPUT" title="Editors & QR scanning" description="Support structured writing and camera-based input while keeping content under the user's control." />
      <div className="docs-callout"><span>i</span><p>Markdown preview renders a deliberately small, safe block syntax as text nodes. The QR scanner requires a secure context, browser camera permission, and BarcodeDetector support.</p></div>
      <PreviewSection>
        <div className="docs-feedback-stack">
          <MarkdownEditor label="Campaign notes" value={markdown} onValueChange={setMarkdown} preview rows={7} />
          <QrScanner onScan={setScannedValue} onScanError={(error) => setScanMessage(error.message)} />
          <Alert variant="info">{scannedValue ? `Scanned value (not opened): ${scannedValue}` : scanMessage}</Alert>
        </div>
      </PreviewSection>
      <section className="docs-section">
        <h2>React Native QR scanning</h2>
        <p>Expo camera support is an optional package entry so non-Expo React Native apps do not load a camera dependency.</p>
        <CodeSample code={`import { QrScanner } from '@qzlcorp/react-native/expo/qr-scanner';\n\n<QrScanner onScan={(value) => setScannedValue(value)} />`} onCopy={onCopy} />
      </section>
      <section className="docs-section docs-guidance"><h2>Safety & permissions</h2><p>Camera access is requested only after an explicit scan action. Treat scanned strings as untrusted input: show them for review, validate them for your use case, and never navigate automatically.</p></section>
    </>
  );
}

function CatalogExtensionsPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [density, setDensity] = useState('comfortable');
  const [plan, setPlan] = useState('team');
  const [rating, setRating] = useState(4);
  const [activeStep, setActiveStep] = useState(1);
  const [tagVisible, setTagVisible] = useState(true);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const steps = [{ label: 'Profile' }, { label: 'Security' }, { label: 'Review' }];

  return (
    <>
      <PageTitle eyebrow="COMPONENTS / CATALOG" title="More components" description="Explore additional interaction and content components available for Web and React Native." />
      <PreviewSection label="Content & status">
        <div className="docs-catalog-stack">
          <Typography variant="heading-2">A clear section heading</Typography>
          <Typography variant="body">Typography variants keep hierarchy consistent while adapting to the content around them.</Typography>
          <Divider />
          <HelperText>Helper text gives people useful context close to an input or action.</HelperText>
          <div className="docs-catalog-actions">
            <Indicator status="success" label="All systems operational" />
            {tagVisible ? <Tag variant="primary" onRemove={() => setTagVisible(false)}>Team workspace</Tag> : <Button variant="secondary" onClick={() => setTagVisible(true)}>Restore tag</Button>}
          </div>
        </div>
      </PreviewSection>
      <PreviewSection label="Navigation & selection">
        <div className="docs-catalog-stack">
          <Carousel
            index={slideIndex}
            onIndexChange={setSlideIndex}
            slides={[
              <Card key="overview" className="docs-catalog-slide-card"><strong>Plan overview</strong><p>Choose the option that fits your workspace.</p></Card>,
              <Card key="collaboration" className="docs-catalog-slide-card"><strong>Team collaboration</strong><p>Invite people and work together.</p></Card>,
              <Card key="security" className="docs-catalog-slide-card"><strong>Security settings</strong><p>Keep your account protected.</p></Card>
            ]}
          />
          <SegmentedButtons label="Display density" value={density} onValueChange={setDensity} options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} />
          <SelectCard
            label="Workspace plan"
            value={plan}
            onValueChange={setPlan}
            options={[
              { value: 'individual', title: 'Individual', description: 'For personal projects' },
              { value: 'team', title: 'Team', description: 'For collaboration' }
            ]}
          />
          <StarRating label="Satisfaction" value={rating} onValueChange={setRating} />
          <SteppedProgressBar label="Project setup progress" steps={steps} activeStep={activeStep} />
          <Stepper label="Setup steps" steps={steps} activeStep={activeStep} onStepChange={setActiveStep} />
        </div>
      </PreviewSection>
      <PreviewSection label="Files & overlays" overflowVisible>
        <div className="docs-catalog-stack">
          <FileUploadInput
            label="Attach documents"
            accept=".pdf,.png"
            multiple
            helperText="PDF or PNG files"
            onFilesSelected={(files) => setFileNames(Array.from(files, (file) => file.name))}
          />
          {fileNames.length > 0 && <HelperText>{fileNames.join(', ')}</HelperText>}
          <div className="docs-catalog-actions">
            <Button variant="secondary" onClick={() => setBottomSheetOpen(true)}>Open bottom sheet</Button>
            <Button variant="secondary" onClick={() => setSideSheetOpen(true)}>Open side sheet</Button>
            <Popover trigger="What is this?"><p>Popover content stays near the control that explains it.</p></Popover>
          </div>
          <BottomSheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen} title="Share link">
            <p>Choose how you would like to share this link.</p>
          </BottomSheet>
          <SideSheet open={sideSheetOpen} onOpenChange={setSideSheetOpen} title="Workspace settings">
            <p>Manage preferences for this workspace.</p>
          </SideSheet>
        </div>
      </PreviewSection>
      <section className="docs-section docs-guidance">
        <h2>React Native integration</h2>
        <p>The React Native file-upload component shares the Web component’s selection state and interaction intent, but delegates document-picker access to your application through its callback. This keeps picker dependencies optional and lets each app choose its platform integration.</p>
      </section>
    </>
  );
}

function NotificationsPage() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <PageTitle eyebrow="COMPONENTS / FEEDBACK" title="Notifications" description="Communicate outcomes in place, announce urgent changes clearly, and give people control over dismissible messages." />
      <PreviewSection>
        <div className="docs-feedback-stack">
          {visible ? <Toast title="Preferences saved" description="Your workspace settings are up to date." variant="success" onDismiss={() => setVisible(false)} /> : <Button variant="secondary" onClick={() => setVisible(true)}>Show notification</Button>}
          <Toast title="Connection interrupted" description="Your unsaved changes are still on this device." variant="danger" />
          <Toast title="Review recommended" description="Check the destination before sharing." variant="warning" />
        </div>
      </PreviewSection>
      <section className="docs-section docs-guidance"><h2>Announcements</h2><p>Routine updates use a polite status announcement. Urgent errors use an assertive alert. Avoid announcing frequent, non-actionable updates.</p></section>
    </>
  );
}

function PlaygroundPage() {
  const [label, setLabel] = useState('Create a workspace');
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [radius, setRadius] = useState('12px');
  const [showCard, setShowCard] = useState(true);
  return (
    <>
      <PageTitle eyebrow="EXPLORE / PLAYGROUND" title="Playground" description="Change component props and see the preview update in real time." />
      <div className="docs-playground">
        <section className="docs-playground__controls">
          <div className="docs-eyebrow">CONTROLS</div>
          <label>Button label<Input value={label} onChange={(event) => setLabel(event.target.value)} /></label>
          <label>Button variant<select value={variant} onChange={(event) => setVariant(event.target.value as ButtonVariant)}>{buttonVariants.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Surface radius<select value={radius} onChange={(event) => setRadius(event.target.value)}><option value="12px">Compact · 12px</option><option value="20px">Relaxed · 20px</option><option value="28px">Soft · 28px</option></select></label>
          <label className="docs-control-check"><Checkbox checked={showCard} onChange={(event) => setShowCard(event.target.checked)} /> Show card surface</label>
        </section>
        <section className="docs-playground__canvas">
          <div className="docs-preview__bar"><span>CANVAS</span><Badge variant="neutral">Live</Badge></div>
          {showCard ? <Card className="docs-playground-card" style={{ borderRadius: radius }}><Badge variant="primary">GET STARTED</Badge><h2>Your next idea starts here.</h2><p>Use QZL Design to create clear, useful interfaces.</p><Button variant={variant}>{label || 'Button label'}</Button></Card> : <div className="docs-playground-card docs-playground-card--bare"><Badge variant="primary">GET STARTED</Badge><h2>Your next idea starts here.</h2><p>Card surface hidden.</p><Button variant={variant}>{label || 'Button label'}</Button></div>}
        </section>
      </div>
    </>
  );
}

function DashboardExample() {
  const [range, setRange] = useState('7 days');
  return (
    <>
      <PageTitle eyebrow="PATTERNS / ANALYTICS" title="Analytics dashboard" description="An illustrative composition using sample data to demonstrate hierarchy, context, and controls." />
      <PreviewSection label="Product pattern · analytics overview">
        <div className="docs-dashboard">
          <div className="docs-dashboard__top"><div><span className="docs-eyebrow">LINK PERFORMANCE</span><h2>Good morning, Alex</h2><p>A clear view of how your shared links are doing.</p></div><select aria-label="Date range" value={range} onChange={(event) => setRange(event.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select></div>
          <div className="docs-metric-grid"><Card><small>CLICKS</small><strong>24,819</strong><span>↗ 12.8% vs prior period</span></Card><Card><small>LINKS CREATED</small><strong>148</strong><span>↗ 8.2% vs prior period</span></Card><Card><small>SAFE DESTINATIONS</small><strong>99.6%</strong><span>2 links need a review</span></Card></div>
          <Card className="docs-dashboard-chart"><div className="docs-chart-heading"><div><strong>Engagement over time</strong><small>Daily link activity · {range}</small></div><Badge variant="success">Healthy</Badge></div><div className="docs-chart-bars" aria-label="Sample link activity chart">{[40, 58, 49, 76, 62, 89, 72, 55, 96, 68, 82, 61, 93, 73].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div><div className="docs-chart-axis"><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div></Card>
        </div>
      </PreviewSection>
    </>
  );
}

function SafetyExample() {
  const [url, setUrl] = useState('https://example.com/safe-example');
  const parsedUrl = useMemo(() => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
      return parsed;
    } catch {
      return null;
    }
  }, [url]);
  return (
    <>
      <PageTitle eyebrow="PATTERNS / TRANSPARENCY" title="Safety preview" description="Show people where a link leads before they visit. This pattern is a design example, not a live link-checking service." />
      <div className="docs-callout"><span>i</span><p>Destination information below is derived locally from the URL field. No network request or safety analysis is performed.</p></div>
      <PreviewSection label="Product pattern · link destination preview">
        <div className="docs-safety-demo">
          <div className="docs-safety-brand"><span className="docs-safety-icon">↗</span><div><strong>Link destination</strong><small>Check the destination before continuing</small></div></div>
          <label htmlFor="safety-url">Short link<input id="safety-url" className="qzl-input" value={url} onChange={(event) => setUrl(event.target.value)} /></label>
          {parsedUrl ? <Card className="docs-destination-card"><div className="docs-destination-icon">◎</div><div><span>THIS LINK LEADS TO</span><strong>{parsedUrl.hostname}</strong><small>{parsedUrl.pathname || '/'}</small></div><Badge variant="success">HTTPS</Badge></Card> : <Alert variant="danger">Enter a valid HTTP or HTTPS address to preview its destination.</Alert>}
          <Alert variant="info">Always check that the displayed destination matches what you expect before opening a link.</Alert>
          <Button variant="secondary" disabled={!parsedUrl} onClick={() => setUrl('https://example.com/safe-example')}>Reset example</Button>
        </div>
      </PreviewSection>
    </>
  );
}
