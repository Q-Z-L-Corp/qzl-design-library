import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const docsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('all exported public APIs meet the source JSDoc standard', async () => {
  const coverage = JSON.parse(await readFile(path.join(docsDirectory, 'app/generated/public-api-docs-coverage.json'), 'utf8'));
  const report = await readFile(path.join(docsDirectory, 'api-docs-coverage.md'), 'utf8');

  assert.ok(coverage.coverage.total > 0);
  assert.equal(coverage.coverage.failures.length, 0, coverage.coverage.failures.join('\n'));
  assert.equal(coverage.coverage.documented, coverage.coverage.total);
  assert.match(report, /No missing public API documentation was found/);
  for (const packageName of ['@qzl/react', '@qzl/react-native', '@qzl/core', '@qzl/tokens']) {
    assert.ok(coverage.packages.some((pkg) => pkg.packageName === packageName), `${packageName} is included in coverage`);
  }
  const publicApis = coverage.packages.flatMap((pkg) => pkg.publicApi);
  assert.ok(publicApis.some((api) => api.packageName === '@qzl/core' && api.name === 'clamp'));
  assert.ok(publicApis.some((api) => api.packageName === '@qzl/tokens' && api.name === 'ThemeCssVariables'));
});
