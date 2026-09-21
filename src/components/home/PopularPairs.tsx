'use client';

import { TrendingUp } from 'lucide-react';
import { POPULAR_PAIRS } from '@/lib/tokens';
import { TokenIcon } from '@/components/ui/TokenIcon';

export function PopularPairs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-brand-500" />
        <h2 className="text-xl font-semibold text-white">Popular pairs</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_PAIRS.map(({ from, to }) => (
          <a
            key={`${from}-${to}`}
            href="#swap"
            className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card/30 px-4 py-3.5 transition-all hover:border-brand-500/30 hover:bg-surface-card"
          >
            <div className="flex -space-x-2">
              <TokenIcon symbol={from} size={28} />
              <TokenIcon symbol={to} size={28} />
            </div>
            <span className="text-sm font-medium text-zinc-300">
              {from} → {to}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
