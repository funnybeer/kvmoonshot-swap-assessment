import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KVMoonShot Markets SDK | Integration trial',
  description:
    'Engineer trial package — Polymarket, Kalshi, CEX/DEX strategy hooks and native routing module.',
  keywords: [
    'kvmoonshot',
    'markets sdk',
    'polymarket',
    'kalshi',
    'arbitrage',
    'trading',
  ],
  metadataBase: new URL('https://kvmoonshot.cc'),
  openGraph: {
    title: 'KVMoonShot Markets SDK | Integration trial',
    description: 'Cross-venue strategy SDK starter for engineer assessment.',
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
