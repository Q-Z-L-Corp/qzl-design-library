# @qzlcorp/react

Reusable React components for Web applications, with documented APIs and accessibility semantics.

This package is published as a beta. APIs may change before a stable release.
The host application must provide React and React DOM 18.3.1 or 19.

```sh
pnpm add @qzlcorp/react@beta
```

Import the stylesheet once from your application root:

```ts
import '@qzlcorp/react/styles.css';
```

Then compose components:

```tsx
import { Button, Card, DataTable } from '@qzlcorp/react';

export function ProjectCard() {
  return <Card><Button>Open project</Button></Card>;
}
```

The 50-component catalog includes actions, form controls, navigation, overlays, notifications, data tables and charts, metric cards, progress and loading states, and content components such as `BottomSheet`, `Carousel`, `FileUploadInput`, `SelectCard`, `Stepper`, and `Typography`. It also includes Markdown editing and an opt-in browser QR scanner. The QR scanner requires a secure browser context, camera access granted by the user, and `BarcodeDetector` support. It returns scanned content to the caller and never navigates automatically.

Data display includes `DataTable`, `MetricCard`, `BarChart`, `LineChart`, `AreaChart`, and `DonutChart`. `BarChart` supports horizontal or vertical, grouped or stacked series; charts retain readable labels and values alongside their visual marks.

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
