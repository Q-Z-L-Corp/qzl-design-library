# @qzlcorp/tokens

Shared design tokens and semantic light and dark theme values for QZL Design Library.

This package has not been published yet. Use the install command after the first release.

```sh
pnpm add @qzlcorp/tokens
```

```ts
import { getThemeCssVariables, qzlTokens, themes } from '@qzlcorp/tokens';

const brandBlue = qzlTokens.colors.brand[500];
const darkTheme = themes.dark;
const cssVariables = getThemeCssVariables('light');
```

The package exports immutable token objects and a typed helper that maps semantic theme values to CSS custom properties.

## License

MIT
