import './globals.css';
import '@qzl/react/styles.css';
import React from 'react';

export const metadata = {
  title: 'QZL Design Library',
  description: 'Original design system for Q.Z.L Corp.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
