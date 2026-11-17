# @qzl/react-native

React Native components that use shared design tokens and follow the same interaction intent where platform conventions allow.

The catalog provides React Native counterparts for the 44 components also available on Web.

This package has not been published yet. Use the install command after the first release. Your application must provide React 19 and React Native 0.78 or later.

```sh
pnpm add @qzl/react-native @react-native-community/slider
```

Components use React Native `View`, `Text`, `Pressable`, `TextInput`, and accessibility APIs. Props and behavior intentionally differ from the Web package where platform conventions require it. Install `@qzl/tokens` directly when your application imports its APIs.

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
