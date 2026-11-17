# QZL Design Library

An original, accessible design system for Q.Z.L Corp. Shared semantic tokens and platform-specific components support React on the web and React Native on iOS and Android.

## Monorepo

- `packages/tokens` — cross-platform design tokens and light/dark themes
- `packages/core` — platform-neutral helpers and safe Markdown block parsing
- `packages/react` — 45 web components and `@qzl/react/styles.css`
- `packages/react-native` — 44 corresponding native components
- `apps/docs` — interactive documentation and component playground
- `examples/react-native` — Expo example for iOS and Android

The catalogs cover the reference library's 36 core component patterns, plus QZL-specific components for actions, input, selection, navigation, overlays, notifications, content surfaces, progress, tables/charts, and Markdown editing. The React Native file-upload control delegates document-picker integration to the host app. QR scanning is an optional browser component and a separate Expo entry. The scanner requests camera access only after a deliberate start action and never opens scanned content automatically.

## Local development

Requirements: Node.js 24 and pnpm 10.15.

```sh
pnpm install
pnpm dev
```

`pnpm dev` builds the public package outputs before starting the docs server at `http://localhost:3000`. To run the native example:

```sh
pnpm start:native
```

The Expo example includes `expo-camera` with camera-only permission configuration. Review platform permissions and test on target devices before production use.

## Build, tests, and lint

```sh
pnpm build
pnpm test
pnpm lint
```

Tests use Node's test runner for core/token utilities, Vitest and Testing Library for web behavior, and Jest/React Native Testing Library for native components.

## Package use

After publication:

```sh
pnpm add @qzl/react @qzl/tokens
```

Import `@qzl/react/styles.css` once in the application root. The React Native package uses native controls and does not import web CSS. Expo-only camera scanning is available from `@qzl/react-native/expo/qr-scanner` and requires `expo-camera`; all other native components do not depend on Expo.

All packages emit ESM JavaScript and TypeScript declarations to `dist/`. Package tarballs include their runtime files, styles where applicable, README, and MIT license.

## Publishing

Packages are prepared for public npm releases but have not been published. The Changesets release workflow needs the canonical GitHub repository, npm scope ownership, and an `NPM_TOKEN` secret. Follow [PUBLISHING.md](./PUBLISHING.md) to review and configure those final account/repository details.

## License

MIT
