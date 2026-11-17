# Contributing

Thank you for helping improve QZL Design Library.

## Development setup

1. Use Node.js 24 and pnpm 10.15.
2. Run `pnpm install` from the repository root.
3. Run `pnpm dev` for the interactive docs or `pnpm start:native` for Expo.
4. Before submitting, run `pnpm build`, `pnpm test`, and `pnpm lint`.

## Change guidelines

- Keep tokens and data transformations platform-neutral; implement Web and React Native behavior in their respective packages.
- Use semantic theme values instead of introducing scattered colors or spacing values.
- Preserve keyboard, screen-reader, and touch interactions appropriate to Web and React Native.
- Keep camera access opt-in. Treat scanned codes as untrusted text; never open a scanned destination automatically.
- Add focused tests and update docs when a component API or behavior changes.
- Add a Changesets entry for each public package API change.
- Explain intentional differences between Web and React Native APIs.

## Public API documentation

Document public APIs in source with JSDoc so the docs site and published TypeScript declarations share the same source of truth. Every new or changed public component must satisfy this checklist:

- [ ] Describe the component in JSDoc.
- [ ] Document every public prop.
- [ ] Document complex types and callback parameters.
- [ ] Document accurate defaults with `@default` where applicable.
- [ ] Include at least one practical `@example`.
- [ ] Explain relevant Web and React Native differences.
- [ ] Regenerate and verify the API documentation.
- [ ] Pass the public API documentation coverage check.

Apply the same source-documentation standard to exported types, hooks, utilities, constants, and theme APIs. Keep comments accurate to the implementation; do not use generated metadata as a substitute for missing source documentation. JSDoc comments must remain in published `.d.ts` files and provide useful IntelliSense to package consumers.

Do not publish packages from a local machine. The release workflow publishes after Changesets version pull requests are merged; repository and npm setup details are in [PUBLISHING.md](./PUBLISHING.md).
