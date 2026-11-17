# @qzl/react

Reusable React components for Web applications, with documented APIs and accessibility semantics.

This package has not been published yet. Use the install command after the first release.
The host application must provide React and React DOM 18.3.1 or 19.

```sh
pnpm add @qzl/react
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

The 45-component catalog includes actions, form controls, navigation, overlays, notifications, data tables and charts, progress and loading states, and content components such as `BottomSheet`, `Carousel`, `FileUploadInput`, `SelectCard`, `Stepper`, and `Typography`. It also includes Markdown editing and an opt-in browser QR scanner. The QR scanner requires a secure browser context, camera access granted by the user, and `BarcodeDetector` support. It returns scanned content to the caller and never navigates automatically.

## Styling and themes

The stylesheet uses semantic CSS variables (`--qzl-*`). Define those variables on an ancestor or use `getThemeCssVariables` from `@qzl/tokens` to obtain theme values. Install `@qzl/tokens` directly when your application imports its APIs.

## License

MIT
