# @qzlcorp/tokens

Shared design tokens and semantic light and dark theme values for QZL Design Library.

Official documentation: [design.qz-l.com](https://design.qz-l.com).

This package is published at stable version `0.2.0`.

```sh
pnpm add @qzlcorp/tokens
```

```ts
import { getThemeCssVariables, qzlTokens, themes } from '@qzlcorp/tokens';

const brandBlue = qzlTokens.colors.brand[500];
const darkTheme = themes.dark;
const cssVariables = getThemeCssVariables('light', {
  '--qzl-primary': '#1b61f2'
});
```

The package exports immutable token objects and a typed helper that maps semantic theme values to CSS custom properties. Optional variable overrides take precedence over the selected theme.

## License

MIT
