import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { useCameraPermissions } from 'expo-camera';
import { QrScanner } from '@qzl/react-native/expo/qr-scanner';

jest.mock('expo-camera', () => ({
  CameraView: () => null,
  useCameraPermissions: jest.fn()
}));

describe('React Native QR scanner', () => {
  it('requests camera permission only after a deliberate scan action', async () => {
    const requestPermission = jest.fn().mockResolvedValue({
      status: 'denied' as const,
      expires: 'never' as const,
      granted: false,
      canAskAgain: true
    });
    jest.mocked(useCameraPermissions).mockReturnValue([null, requestPermission, requestPermission]);

    render(<QrScanner onScan={() => {}} />);
    expect(requestPermission).not.toHaveBeenCalled();

    fireEvent.press(screen.getByRole('button', { name: 'Start camera scan' }));
    await waitFor(() => expect(requestPermission).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Camera access was not granted. You can still enter the code another way.')).toBeOnTheScreen();
  });
});
