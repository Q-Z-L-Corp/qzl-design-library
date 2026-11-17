# @qzl/react

Accessible React components for web applications using the QZL design system.

```sh
pnpm add @qzl/react @qzl/tokens
```

Import the stylesheet once from your application root:

```ts
import '@qzl/react/styles.css';
```

Then compose components:

```tsx
import { Button, Card, DataTable } from '@qzl/react';

export function ProjectCard() {
  return <Card><Button>Open project</Button></Card>;
}
```

The 45-component catalog includes actions, form controls, navigation, overlays, notifications, data tables/charts, progress/loading, and the reference-matched patterns `BottomSheet`, `Carousel`, `Divider`, `FileUploadInput`, `HelperText`, `Indicator`, `Pips`, `Popover`, `SegmentedButtons`, `SelectCard`, `SideSheet`, `StarRating`, `SteppedProgressBar`, `Stepper`, `Tag`, and `Typography`. It also includes Markdown editing and an opt-in browser QR scanner. The QR scanner requires a secure browser context, camera access granted by the user, and `BarcodeDetector` support. It returns scanned content to the caller and never navigates automatically.

## Styling and themes

The stylesheet uses semantic CSS variables (`--qzl-*`). Define those variables on an ancestor or use the matching values from `@qzl/tokens` with `getThemeCssVariables`.

## License

MIT
