# Publishing

The published packages are `@qzlcorp/react`, `@qzlcorp/react-native`, `@qzlcorp/core`, and `@qzlcorp/tokens`. The current `0.2.0-beta.0` versions are prereleases; consumers should expect API changes before a stable release.

## Configure npm trusted publishing

Configure a GitHub Actions trusted publisher in the npm settings for each package. Use organization `Q-Z-L-Corp`, repository `qzl-design-library`, workflow filename `release.yml`, and no environment name unless one is added to the release job. Allow direct publishing. The release workflow requests the `id-token: write` permission and uses Node 24 (which provides the npm version required for OIDC); it does not need an `NPM_TOKEN` secret.

The packages and their npm trusted-publisher settings are configured separately, including the supporting `@qzlcorp/core` and `@qzlcorp/tokens` packages.

The repository is currently in Changesets prerelease mode for the `beta` dist-tag. The release workflow runs on pushes to `main`, opens version pull requests, and publishes selected packages after those changes merge. When the packages are ready for a stable release, exit prerelease mode with `pnpm changeset pre exit` and review the resulting version plan. Verify the default branch is named `main` and that the workflow filename remains `.github/workflows/release.yml`.

## Local release checks

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm lint
for package in tokens core react react-native; do
  (cd "packages/$package" && npm pack --dry-run)
done
```

Create a version pull request with `pnpm version-packages`. The release workflow publishes only packages selected by Changesets; it does not publish on pull requests.

Do not run `pnpm release:publish` locally unless you intend to publish and have reviewed the npm account and package versions.
