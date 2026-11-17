# Publishing

The consumer-facing UI packages are `@qzlcorp/react` and `@qzlcorp/react-native`. They depend on the supporting `@qzlcorp/core` and `@qzlcorp/tokens` packages. None of the four packages has been published yet. Publishing requires an npm organization/scope with the required package permissions and a configured `NPM_TOKEN`.

## Before the first release

1. Confirm that the `@qzlcorp` npm organization is owned by the publisher and that all four package names are available.
2. Verify each package's `repository` metadata points to `https://github.com/Q-Z-L-Corp/qzl-design-library`.
3. Configure `NPM_TOKEN` as a GitHub Actions secret with publish permission for the `@qzlcorp` scope.
4. Ensure the default branch is named `main`; the release workflow uses Changesets to open version pull requests and publishes after those changes merge with the `beta` dist-tag.
5. Review the pending `.changeset` entry, package README files, license, generated tarballs, and supported React/React Native versions.

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
