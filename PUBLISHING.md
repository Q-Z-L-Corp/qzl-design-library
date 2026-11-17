# Publishing

The `@qzl/*` packages are configured for public npm publication, but have not been published. Publishing requires a real GitHub repository, an npm organization/scope with the required package permissions, and a configured `NPM_TOKEN`.

## Before the first release

1. Create or attach the project to its canonical GitHub repository and add its URL to each package's `repository` metadata.
2. Confirm that the `@qzl` npm scope is owned by the publisher and that all four package names are available.
3. Configure `NPM_TOKEN` as a GitHub Actions secret with publish permission for the `@qzl` scope.
4. Ensure the default branch is named `main`; the release workflow uses Changesets to open version pull requests and publishes after those changes merge.
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
