'use client';

import { Globe, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const NAV = [
  { label: 'Swap', href: '#swap', active: true },
  { label: 'README', href: 'https://github.com/funnybeer/kvmoonshot-swap-assessment#assessment', active: false },
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
          <span className="hidden rounded-md border border-surface-border px-2.5 py-1 font-mono text-[11px] text-zinc-500 sm:inline">
            starter/v0.5.0
          </span>
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
