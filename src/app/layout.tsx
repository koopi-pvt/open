import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Koopi.LK - Own Your Online Store',
  description: 'Complete e-commerce solution for Sri Lankan sellers. Sell on Instagram, TikTok, Facebook, and WhatsApp.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}