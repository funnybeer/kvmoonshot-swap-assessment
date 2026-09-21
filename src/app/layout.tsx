import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KV MoonShot | Cross-Chain Crypto Exchange',
  description:
    'Swap crypto on KVMoonShot Chain. Non-custodial exchange with fixed and floating rates.',
  keywords: [
    'kvmoonshot',
    'crypto exchange',
    'cross-chain swap',
    'bitcoin exchange',
    'defi',
    'non-custodial',
  ],
  metadataBase: new URL('https://kvmoonshot.cc'),
  openGraph: {
    title: 'KV MoonShot | Cross-Chain Crypto Exchange',
    description: 'Cross-chain swaps with fixed and floating rates.',
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
