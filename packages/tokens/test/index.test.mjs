import assert from 'node:assert/strict';
import test from 'node:test';
import { getThemeCssVariables, themes } from '../dist/index.js';

test('semantic CSS variables match the selected light and dark themes', () => {
  assert.equal(getThemeCssVariables('light')['--qzl-primary'], themes.light.primary);
  assert.equal(getThemeCssVariables('dark')['--qzl-background'], themes.dark.background);
  assert.notEqual(getThemeCssVariables('light')['--qzl-text'], getThemeCssVariables('dark')['--qzl-text']);
});

test('semantic CSS variable overrides take precedence without dropping theme defaults', () => {
  const variables = getThemeCssVariables('light', {
    '--qzl-primary': '#123456',
    '--qzl-background': '#fafafa'
  });
  assert.equal(variables['--qzl-primary'], '#123456');
  assert.equal(variables['--qzl-background'], '#fafafa');
  assert.equal(variables['--qzl-text'], themes.light.text);
});
