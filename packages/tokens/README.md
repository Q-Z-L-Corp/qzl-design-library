# @qzl/tokens

Platform-neutral design tokens and semantic light/dark theme values for QZL interfaces.

```sh
pnpm add @qzl/tokens
```

```ts
import { getThemeCssVariables, qzlTokens, themes } from '@qzl/tokens';

const brandBlue = qzlTokens.colors.brand[500];
const darkTheme = themes.dark;
const cssVariables = getThemeCssVariables('light');
```

The package exports immutable token objects and a typed helper that maps semantic theme values to CSS custom properties.

## License

MIT
