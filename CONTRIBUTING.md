# Contributing

Thank you for helping improve QZL Design Library.

## Development setup

1. Use Node.js 24 and pnpm 10.15.
2. Run `pnpm install` from the repository root.
3. Run `pnpm dev` for the interactive docs or `pnpm start:native` for Expo.
4. Before submitting, run `pnpm build`, `pnpm test`, and `pnpm lint`.

## Change guidelines

- Keep tokens and data transformations platform-neutral; implement browser and native behavior in their respective packages.
- Use semantic theme values instead of introducing scattered colors or spacing values.
- Preserve native keyboard, screen-reader, and touch behavior.
- Keep camera access opt-in. Treat scanned codes as untrusted text; never open a scanned destination automatically.
- Add focused tests and update docs when a component API or behavior changes.
- Add a Changesets entry for each public package API change.
- Explain intentional differences between web and native APIs.

Do not publish packages from a local machine. The release workflow publishes after Changesets version pull requests are merged; repository and npm setup details are in [PUBLISHING.md](./PUBLISHING.md).
