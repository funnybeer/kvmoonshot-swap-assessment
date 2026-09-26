import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KVMoonShot Trial SDK | Cross-venue strategy desk',
  description:
    'Trial SDK — live Polymarket, Kalshi, CEX feeds, arb monitor, OpenAI/Claude copilot, DEX settlement.',
  keywords: [
    'kvmoonshot',
    'trial sdk',
    'polymarket',
    'kalshi',
    'arbitrage',
    'perps',
    'trading',
  ],
  metadataBase: new URL('https://kvmoonshot.cc'),
  openGraph: {
    title: 'KVMoonShot Trial SDK | Cross-venue strategy desk',
    description: 'Professional trial package for multi-venue prediction market and CEX strategy integration.',
    url: 'https://kvmoonshot.cc',
    siteName: 'KV MoonShot',
    type: 'website',
    images: [{ url: '/banner.png', width: 1920, height: 640, alt: 'KV MoonShot' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/banner.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
