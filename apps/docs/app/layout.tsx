import './globals.css';
import '@qzlcorp/react/styles.css';
import React from 'react';

export const metadata = {
  title: 'QZL Design Library',
  description: 'An open-source design system with shared foundations and components for Web and React Native.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
