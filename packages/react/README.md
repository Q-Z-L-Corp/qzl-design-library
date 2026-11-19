# @qzlcorp/react

Reusable React components for Web applications, with documented APIs and accessibility semantics.

Official documentation: [design.qz-l.com](https://design.qz-l.com).

This package is published on npm in the [@qzlcorp organization](https://www.npmjs.com/org/qzlcorp). The install command below resolves the latest stable release.
The host application must provide React and React DOM 18.3.1 or 19.

```sh
pnpm add @qzlcorp/react
```

Import the stylesheet once from your application root:

```ts
import '@qzlcorp/react/styles.css';
```

Then compose components:

```tsx
import { Button, Card, DataTable, LinkButton } from '@qzlcorp/react';

export function ProjectCard() {
  return (
    <Card variant="featured">
      <Button>Save project</Button>
      <LinkButton href="/projects">Open project</LinkButton>
    </Card>
  );
}
```

Use `Button` for actions and `LinkButton` for navigation; `LinkButton` renders an anchor and accepts standard anchor attributes such as `href` and `target`.

### Next.js and router integration

To integrate with Next.js `Link` or framework routers without manually maintaining button CSS class strings, pass the router link component to `renderAs`:

`LinkButton` is server-compatible, so the Next.js example can be used directly in an App Router Server Component. Passing `next/link` preserves its client-side navigation and prefetch behavior.

```tsx
import Link from 'next/link';
import { LinkButton } from '@qzlcorp/react';

export function NavigationBar() {
  return (
    <nav aria-label="Main navigation">
      <LinkButton href="/dashboard" renderAs={Link} variant="primary">
        Dashboard
      </LinkButton>
      <LinkButton href="/settings" renderAs={Link} variant="ghost">
        Settings
      </LinkButton>
    </nav>
  );
}
```

When rendering framework components directly, use `getButtonClassName` to produce the identical class name string without duplicating styling logic:

```tsx
import Link from 'next/link';
import { getButtonClassName } from '@qzlcorp/react';

<Link href="/projects" className={getButtonClassName('custom-nav', 'secondary', 'md', false)}>
  Projects
</Link>
```

The 51-component catalog includes actions, form controls, navigation, overlays, notifications, data tables and charts, metric cards, progress and loading states, and content components such as `BottomSheet`, `Carousel`, `FileUploadInput`, `SelectCard`, `Stepper`, and `Typography`. It also includes Markdown editing and an opt-in browser QR scanner. The QR scanner requires a secure browser context, camera access granted by the user, and `BarcodeDetector` support. It returns scanned content to the caller and never navigates automatically.

Data display includes `DataTable`, `MetricCard`, `BarChart`, `LineChart`, `AreaChart`, and `DonutChart`. `BarChart` supports horizontal or vertical, grouped or stacked series; charts retain readable labels and values alongside their visual marks.

### Accessible tabs and panels

Assign stable IDs to tab items when panels need to reference them. `panelId` adds `aria-controls` to the tabs, while the active panel's `aria-labelledby` points back to its tab:

```tsx
import { useState } from 'react';
import { Tabs } from '@qzlcorp/react';

const tabs = [
  { value: 'account', label: 'Account', id: 'settings-account-tab' },
  { value: 'notifications', label: 'Notifications', id: 'settings-notifications-tab' }
];

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState('account');
  const activeTabId = tabs.find((tab) => tab.value === activeTab)?.id;

  return (
    <div>
      <Tabs
        items={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
        panelId="settings-panel"
      />
      <div
        id="settings-panel"
        role="tabpanel"
        aria-labelledby={activeTabId}
      >
        {activeTab === 'account' ? <p>Manage your account settings.</p> : <p>Configure your notification preferences.</p>}
      </div>
    </div>
  );
}
```

`getTabId` is also available when you need the component-generated IDs; collect them in a ref rather than triggering state updates while tabs render.

### Responsive data table patterns

`DataTable` supports client-side sorting, empty state messaging, skeleton loading states, and mobile column stacking:

```tsx
import { DataTable, type DataTableColumn } from '@qzlcorp/react';

type Member = { id: string; name: string; role: string; email: string };

const columns: DataTableColumn<Member>[] = [
  { key: 'name', header: 'Name', mobileLabel: 'Name', render: (m) => m.name, sortValue: (m) => m.name },
  { key: 'role', header: 'Role', mobileLabel: 'Role', render: (m) => m.role },
  { key: 'email', header: 'Email', mobileLabel: 'Email', render: (m) => m.email }
];

export function TeamTable({ members, loading }: { members: Member[]; loading?: boolean }) {
  return (
    <DataTable
      caption="Team members"
      columns={columns}
      rows={members}
      getRowKey={(member) => member.id}
      loading={loading}
      loadingRowCount={3}
      responsive
      emptyMessage="No team members found."
    />
  );
}
```

When `responsive` is enabled, the table headers hide on mobile viewports (≤ 600px), rows display as vertical card grids, and each cell displays its `mobileLabel` before the cell content. While `loading` is true, skeleton placeholder rows are rendered and the table is marked with `aria-busy="true"`.

### Feature card pattern

Compose a reusable feature card from the library's surface, status, and navigation components. Keep the content and action generic so the pattern works across products:

```tsx
import type { ReactNode } from 'react';
import { Badge, Card, LinkButton } from '@qzlcorp/react';

type FeatureCardProps = {
  media: ReactNode;
  title: string;
  status: string;
  description: string;
  metadata: ReactNode;
  href: string;
  actionLabel: string;
};

function FeatureCard({ media, title, status, description, metadata, href, actionLabel }: FeatureCardProps) {
  return (
    <Card variant="featured" className="feature-card">
      <div className="feature-card__media" aria-hidden="true">{media}</div>
      <div className="feature-card__body">
        <div className="feature-card__title-row">
          <h2>{title}</h2>
          <Badge variant="neutral">{status}</Badge>
        </div>
        <p className="feature-card__description">{description}</p>
        <div className="feature-card__metadata">{metadata}</div>
        <LinkButton href={href} variant="secondary" size="sm">{actionLabel}</LinkButton>
      </div>
    </Card>
  );
}

export function FeatureGrid() {
  return (
    <div className="feature-grid">
      <FeatureCard
        media={<span aria-hidden="true">✦</span>}
        title="Usage insights"
        status="Available"
        description="Understand activity with a clear summary of the latest trends."
        metadata={<>Analytics <span aria-hidden="true">·</span> Updated weekly</>}
        href="/features/usage"
        actionLabel="Explore feature"
      />
    </div>
  );
}
```

```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}

.feature-card {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 1rem;
  padding: 1.25rem;
}

.feature-card__media {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 0.75rem;
  color: var(--qzl-primary);
  background: var(--qzl-primary-subtle);
}

.feature-card__body { display: flex; min-width: 0; flex-direction: column; align-items: flex-start; gap: 0.75rem; }
.feature-card__title-row { display: flex; width: 100%; align-items: flex-start; justify-content: space-between; gap: 0.75rem; }
.feature-card__title-row h2 { margin: 0; font-size: 1rem; }
.feature-card__description { margin: 0; color: var(--qzl-text-muted); line-height: 1.5; }
.feature-card__metadata { color: var(--qzl-text-soft); font-size: 0.875rem; }

@media (max-width: 36rem) {
  .feature-card { grid-template-columns: 1fr; padding: 1rem; }
}
```

The grid automatically adds columns when space permits and collapses to one column on narrow screens. Keep the title, status, short description, metadata, and primary action visible; place optional, longer details in an `Accordion` or native `<details>` disclosure to reduce card density without hiding essential information.

### Marketing card pattern

Compose marketing and hero announcement cards by combining `Card`, `Badge`, `Typography` (or native headings), and `LinkButton`:

```tsx
import type { ReactNode } from 'react';
import { Badge, Card, LinkButton } from '@qzlcorp/react';

type MarketingCardProps = {
  media?: ReactNode;
  badge?: string;
  headline: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  featured?: boolean;
};

export function MarketingCard({
  media,
  badge,
  headline,
  description,
  primaryAction,
  secondaryAction,
  featured = false
}: MarketingCardProps) {
  return (
    <Card variant={featured ? 'featured' : 'default'} className="marketing-card">
      {media && <div className="marketing-card__media">{media}</div>}
      <div className="marketing-card__body">
        {badge && <Badge variant="primary">{badge}</Badge>}
        <h2 className="marketing-card__headline">{headline}</h2>
        <p className="marketing-card__description">{description}</p>
        <div className="marketing-card__actions">
          <LinkButton href={primaryAction.href} variant="primary">
            {primaryAction.label}
          </LinkButton>
          {secondaryAction && (
            <LinkButton href={secondaryAction.href} variant="ghost">
              {secondaryAction.label}
            </LinkButton>
          )}
        </div>
      </div>
    </Card>
  );
}

export function MarketingHero() {
  return (
    <MarketingCard
      featured
      badge="What's new"
      headline="Next-generation component architecture"
      description="Ship accessible, high-performance web applications faster with unified tokens, accessible primitives, and responsive patterns."
      primaryAction={{ label: 'Get started', href: '/get-started' }}
      secondaryAction={{ label: 'View documentation', href: '/docs' }}
    />
  );
}
```

```css
.marketing-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.25rem;
}

.marketing-card__media {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--qzl-surface-muted);
}

.marketing-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.marketing-card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.5rem;
}

.marketing-card__headline {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.marketing-card__description {
  margin: 0;
  color: var(--qzl-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.marketing-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
```

## Styling and themes

The stylesheet uses semantic CSS variables (`--qzl-*`). Define those variables on an ancestor or use `getThemeCssVariables` from `@qzlcorp/tokens` to obtain theme values. Install `@qzlcorp/tokens` directly when your application imports its APIs.

### Form fields

`FormField` links a label, optional hint, and optional error message to a control. It supplies the control ID and accessibility attributes:

```tsx
<FormField
  label="Email"
  required
  hint="Use your work address"
  error={emailError}
  control={<Input type="email" />}
/>
```

### Next.js App Router

Import the stylesheet from `app/layout.tsx`. Interactive components ship with explicit client boundaries; static components can still be rendered from Server Components. See the repository README for a complete theme setup example.

## License

MIT
