import assert from 'node:assert/strict';
import test from 'node:test';
import { getThemeCssVariables, qzlTokens, themes } from '../dist/index.js';

function luminance(color) {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(color.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((channel) => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

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

test('semantic status text colors contrast with their theme surfaces', () => {
  for (const [mode, theme] of Object.entries(themes)) {
    const textPairs = [
      ['primary', theme.primary, theme.primarySubtle],
      ['success', theme.success, theme.successSubtle],
      ['warning', theme.warning, theme.warningSubtle],
      ['danger', theme.danger, theme.dangerSubtle]
    ];

    for (const [name, foreground, background] of textPairs) {
      assert.ok(
        contrastRatio(foreground, background) >= 4.5,
        `${mode} ${name} text must have at least 4.5:1 contrast on its subtle surface`
      );
    }

    assert.ok(
      contrastRatio(theme.primaryForeground, theme.primary) >= 4.5,
      `${mode} primary button text must have at least 4.5:1 contrast`
    );
    assert.ok(
      contrastRatio(theme.dangerForeground, theme.danger) >= 4.5,
      `${mode} danger button text must have at least 4.5:1 contrast`
    );
  }

  assert.equal(qzlTokens.colors.brand[600], themes.light.primary);
  assert.equal(qzlTokens.colors.success, themes.light.success);
  assert.equal(qzlTokens.colors.warning, themes.light.warning);
  assert.equal(qzlTokens.colors.danger, themes.light.danger);
  assert.equal(qzlTokens.colors.info, themes.light.primary);
});
