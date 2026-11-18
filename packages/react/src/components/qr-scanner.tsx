"use client";

import React, { useEffect, useRef, useState } from 'react';
import { mergeClasses } from '@qzlcorp/core';

interface DetectedCode {
  rawValue?: string;
}

interface BarcodeDetectorInstance {
  detect(source: HTMLVideoElement): Promise<DetectedCode[]>;
}

interface BarcodeDetectorConstructor {
  new(options: { formats: string[] }): BarcodeDetectorInstance;
}

type BarcodeWindow = typeof globalThis & {
  BarcodeDetector?: BarcodeDetectorConstructor;
};

/** Props for {@link QrScanner}, in addition to div attributes. */
export interface QrScannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Called once a QR code value is detected.
   * @param value Decoded raw value from the QR code.
   */
  onScan: (value: string) => void;
  /**
   * Called when camera setup or QR detection fails.
   * @param error Error describing the failure.
   */
  onScanError?: (error: Error) => void;
  /**
   * Accessible name used for the camera preview.
   * @default 'QR code scanner'
   */
  label?: string;
}

/**
 * Renders an opt-in camera scanner using the browser BarcodeDetector API for QR codes.
 * Camera access begins only after the user activates the start control.
 *
 * @example
 * ```tsx
 * <QrScanner onScan={(value) => setScannedValue(value)} onScanError={reportError} />
 * ```
 */
export function QrScanner({ onScan, onScanError, label = 'QR code scanner', className, ...props }: QrScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanCallbackRef = useRef(onScan);
  const errorCallbackRef = useRef(onScanError);

  useEffect(() => {
    scanCallbackRef.current = onScan;
    errorCallbackRef.current = onScanError;
  }, [onScan, onScanError]);

  useEffect(() => {
    if (!scanning) return;

    let active = true;
    let stream: MediaStream | undefined;
    let animationFrame = 0;
    const preview = videoRef.current;
    const detectorConstructor = (globalThis as BarcodeWindow).BarcodeDetector;

    function fail(error: Error) {
      if (!active) return;
      setMessage(error.message);
      setScanning(false);
      errorCallbackRef.current?.(error);
    }

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        fail(new Error('Camera access is not available in this browser.'));
        return;
      }
      if (!detectorConstructor) {
        fail(new Error('QR scanning is not supported in this browser.'));
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (!preview) throw new Error('The camera preview could not be initialized.');
        const activePreview = preview;
        activePreview.srcObject = stream;
        await activePreview.play();
        const detector = new detectorConstructor({ formats: ['qr_code'] });

        async function detectFrame() {
          if (!active) return;
          let codes: DetectedCode[];
          try {
            codes = await detector.detect(activePreview);
          } catch (error) {
            fail(error instanceof Error ? error : new Error('Unable to read a QR code from the camera.'));
            return;
          }
          const value = codes.find((code) => code.rawValue)?.rawValue;
          if (value) {
            setMessage('QR code detected. Review its contents before continuing.');
            setScanning(false);
            scanCallbackRef.current(value);
            return;
          }
          animationFrame = requestAnimationFrame(detectFrame);
        }

        animationFrame = requestAnimationFrame(detectFrame);
      } catch (error) {
        fail(error instanceof Error ? error : new Error('Camera permission was denied or unavailable.'));
      }
    }

    void start();
    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      stream?.getTracks().forEach((track) => track.stop());
      if (preview) preview.srcObject = null;
    };
  }, [scanning]);

  function beginScan() {
    setMessage('');
    setScanning(true);
  }

  return (
    <div className={mergeClasses('qzl-qr-scanner', className)} {...props}>
      <video ref={videoRef} className="qzl-qr-scanner__video" muted playsInline aria-label={`${label} camera preview`} />
      <div className="qzl-qr-scanner__actions">
        <button type="button" onClick={beginScan} disabled={scanning}>{scanning ? 'Scanning…' : 'Start camera scan'}</button>
        {scanning && <button type="button" onClick={() => setScanning(false)}>Stop scanning</button>}
      </div>
      <p role="status" aria-live="polite">{message || (scanning ? 'Point the camera at a QR code.' : 'Camera starts only when you choose to scan.')}</p>
    </div>
  );
}
