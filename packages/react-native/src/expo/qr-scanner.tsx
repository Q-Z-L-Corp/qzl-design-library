import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for the Expo Camera QR scanner subpath export. */
export interface QrScannerProps {
  /**
   * Called once a QR barcode is read; the scanner is stopped before invocation.
   * @param value Decoded QR data returned by Expo Camera.
   */
  onScan: (value: string) => void;
  /** Accessible label for the camera preview. @default 'QR code scanner' */
  label?: string;
  /** Palette used for the scanner controls and status text. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the scanner wrapper. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Starts Expo Camera only after the user presses the scan button, requesting permission when needed.
 * The React Native camera preview is restricted to QR codes; decoded content is passed to the app without opening it.
 *
 * @example
 * <QrScanner onScan={(value) => setScannedCode(value)} />
 */
export function QrScanner({ onScan, label = 'QR code scanner', theme = 'light', style }: QrScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('Camera starts only when you choose to scan.');
  const colors = themes[theme];

  async function beginScan() {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        setMessage('Camera access was not granted. You can still enter the code another way.');
        return;
      }
    }
    setMessage('Point the camera at a QR code.');
    setScanning(true);
  }

  return (
    <View style={[{ gap: 10 }, style]}>
      {scanning && permission?.granted && (
        <CameraView
          style={{ width: '100%', height: 260, overflow: 'hidden', borderRadius: 16 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data }) => {
            setScanning(false);
            setMessage('QR code detected. Review its contents before continuing.');
            onScan(data);
          }}
          accessibilityLabel={label}
        />
      )}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          accessibilityRole="button"
          onPress={beginScan}
          disabled={scanning}
          style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, borderRadius: 12, backgroundColor: colors.primary, opacity: scanning ? 0.6 : 1 }}
        >
          <Text style={{ color: colors.primaryForeground, fontWeight: '600' }}>{scanning ? 'Scanning…' : 'Start camera scan'}</Text>
        </Pressable>
        {scanning && (
          <Pressable accessibilityRole="button" onPress={() => setScanning(false)} style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 14 }}>
            <Text style={{ color: colors.primary }}>Stop scanning</Text>
          </Pressable>
        )}
      </View>
      <Text accessibilityLiveRegion="polite" style={{ color: colors.textMuted }}>{message}</Text>
      <Text style={{ color: colors.textSoft, fontSize: 12 }}>Scanned content is returned to your app only. Review it before opening links.</Text>
    </View>
  );
}
