# QZL Design Library

QZL Design Library is an open-source design system for building consistent, accessible, and expressive interfaces across Web and React Native. It provides shared design tokens, themes, reusable components, and API documentation. Developed by Q.Z.L Corp.

Official documentation: [design.qz-l.com](https://design.qz-l.com).

## Monorepo

- `packages/tokens` — cross-platform design tokens and light/dark themes
- `packages/core` — platform-neutral helpers and safe Markdown block parsing
- `packages/react` — 51 Web components and `@qzlcorp/react/styles.css`
- `packages/react-native` — 48 corresponding React Native components
- `apps/docs` — interactive documentation and component playground
- `examples/react-native` — Expo example for iOS and Android

Forty-eight components are available for both Web and React Native. The Web catalog also includes `FormField` and a QR scanner, with a separate optional Expo camera entry for React Native. The React Native file-upload component delegates document-picker integration to the host app. Both scanners request camera access only after a deliberate start action and return scanned content without opening it automatically.

## Local development

Requirements: Node.js 24 and pnpm 10.15.

```sh
pnpm install
pnpm dev
```

`pnpm dev` builds the package outputs before starting the docs server at `http://localhost:3000`. To run the React Native example:

```sh
pnpm start:native
```

The Expo example includes `expo-camera` with camera-only permission configuration. Review platform permissions and test on target devices before production use.

## Component documentation engine

The docs app discovers components from the Web and React Native package entry points and extracts their TypeScript props, local type definitions, defaults, and literal choices. Each component page includes platform-specific examples, an interactive Web preview, API tables, a status badge, and customization examples. Search covers component APIs and guides (`⌘K`/`Ctrl+K`; `Escape` clears search), and generated examples are type-checked against both packages in the docs test suite.

Regenerate the registry after changing package exports or component APIs:

```sh
pnpm --filter docs generate:component-registry
```

The JSON and TypeScript registry live in `apps/docs/app/generated/`; the generated coverage report is `apps/docs/docs-coverage.md`. Treat these as generated files. Component summaries, categories, and preview availability are maintained in `apps/docs/scripts/generate-component-registry.mjs`. Component status badges describe individual component maturity, not the package release channel; some components remain marked Beta. Accessibility and related-component guidance remain marked incomplete in the report until verified.

## Build, tests, and lint

```sh
pnpm build
pnpm test
pnpm lint
```

Tests use Node's test runner for core and token utilities, Vitest and Testing Library for Web behavior, and Jest with React Native Testing Library for React Native components.

## Package use

All four packages are published on npm. Install the latest release for your platform:

```sh
pnpm add @qzlcorp/react
# or, in a React Native application:
pnpm add @qzlcorp/react-native @react-native-community/slider react-native-svg
```

For Web, `@qzlcorp/react` supports React 18.3.1 or 19 with a matching React DOM version; import `@qzlcorp/react/styles.css` once in the application entry point (for Next.js, `app/layout.tsx` is a suitable place). Interactive exports declare their client boundaries; static components remain usable from Server Components. `@qzlcorp/react-native` supports React 19 and React Native 0.78 or later, and requires `@react-native-community/slider` and `react-native-svg`. React Native components use platform controls and do not import Web styles. Expo camera scanning is available from `@qzlcorp/react-native/expo/qr-scanner` and requires `expo-camera`; the other React Native components do not depend on Expo. Install `@qzlcorp/tokens` directly only when your application imports its token APIs.

For a Next.js theme, define variables on the root element using the token helper; per-app overrides can be passed as its second argument:

```tsx
// app/layout.tsx
import '@qzlcorp/react/styles.css';
import type { CSSProperties, ReactNode } from 'react';
import { getThemeCssVariables } from '@qzlcorp/tokens';

const themeStyle = getThemeCssVariables('light', {
  '--qzl-primary': '#1b61f2'
}) as CSSProperties;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body style={themeStyle}>{children}</body></html>;
}
```

`FormField` provides a label and linked hint/error IDs to its `control` element, supplying `id`, `required`, `aria-describedby`, and `aria-invalid` together. The consumer example in the React package README shows the complete usage.

All packages emit ESM JavaScript and TypeScript declarations to `dist/`. Package tarballs include their runtime files, styles where applicable, README, and MIT license.

## Publishing

The GitHub Actions release workflow uses npm trusted publishing with OIDC. Configure the trusted publisher for each package in npm before relying on automated releases; see [PUBLISHING.md](./PUBLISHING.md).

## License

MIT
