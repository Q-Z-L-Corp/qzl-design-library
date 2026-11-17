# @qzl/react-native

Native React Native components sharing QZL design tokens and interaction intent.

The 44-component catalog includes matching implementations for the web library's reference patterns, including sheets, carousel, divider, helper text, indicators, pips, popovers, segmented buttons, selectable cards, ratings, stepped progress, stepper, tags, and typography.

```sh
pnpm add @qzl/react-native @qzl/tokens @react-native-community/slider
```

Components use native `View`, `Text`, `Pressable`, `TextInput`, and platform accessibility APIs. Platform-specific APIs intentionally differ from the web package where needed.

`FileUploadInput` delegates opening a document picker to the host app through `onPress`; provide the platform picker and pass selected names with `selectedFiles`. This avoids requiring a specific picker library.

For the Expo QR scanner only, add `expo-camera` and import its separate entry:

```sh
npx expo install expo-camera
```

```tsx
import { QrScanner } from '@qzl/react-native/expo/qr-scanner';
```

The camera permission is requested after an explicit scan action. Scanned strings are returned to the caller; validate and display them before acting on them.

## License

MIT
