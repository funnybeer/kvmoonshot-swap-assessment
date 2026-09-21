'use client';

import { Globe, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const NAV = [
  { label: 'Exchange', href: '#swap', active: true },
  { label: 'How it works', href: '#how-it-works', active: false },
  { label: 'Security', href: '#security', active: false },
  { label: 'FAQ', href: '#faq', active: false },
  { label: 'Developers', href: 'https://kvmoonshot.cc/docs', active: false },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
        <a href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="KV MoonShot"
            width={160}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-surface-elevated text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white md:flex"
          >
            <Globe size={16} />
            EN
          </button>
          <button
            type="button"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white lg:block"
          >
            Log in
          </button>
          <a
            href="#swap"
            className="hidden rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:inline-block"
          >
            Launch App
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-400 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-surface-border bg-surface-card px-4 py-4 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
