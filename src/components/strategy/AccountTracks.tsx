'use client';

import { VENUE_LINKS } from '@/lib/venues/constants';

const ACCOUNTS = [
  {
    venue: 'Polymarket',
    id: 'poly-main',
    status: 'connected',
    pnl24h: '+$1,240',
    exposure: '$12.4k',
    href: VENUE_LINKS.polymarket.app,
  },
  {
    venue: 'Kalshi',
    id: 'kalshi-pro',
    status: 'connected',
    pnl24h: '+$380',
    exposure: '$4.1k',
    href: VENUE_LINKS.kalshi.app,
  },
  {
    venue: 'Binance',
    id: 'binance-perp',
    status: 'read-only',
    pnl24h: '—',
    exposure: '$28k notional',
    href: VENUE_LINKS.binance.app,
  },
  {
    venue: 'Hyperliquid',
    id: 'hl-1',
    status: 'read-only',
    pnl24h: '—',
    exposure: '$9.2k notional',
    href: VENUE_LINKS.hyperliquid.app,
  },
  {
    venue: 'KVMoonShot DEX',
    id: 'treasury',
    status: 'simulation',
    pnl24h: '—',
    exposure: 'Sepolia',
    href: VENUE_LINKS.kvmoonshot.app,
  },
];

export function AccountTracks() {
  return (
    <section className="rounded-xl border border-surface-border bg-surface-card/30 p-5">
      <h2 className="text-sm font-semibold text-zinc-200">Account tracks</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Unified ledger — add venue API keys in <code className="text-zinc-400">.env.local</code> for live balances.{' '}
        <a href={VENUE_LINKS.kvmoonshot.trialSdk} className="text-brand-400 hover:underline" target="_blank" rel="noreferrer">
          Trial SDK docs
        </a>
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-zinc-500">
            <tr>
              <th className="pb-2 pr-4 font-medium">Venue</th>
              <th className="pb-2 pr-4 font-medium">Account</th>
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 pr-4 font-medium">24h PnL</th>
              <th className="pb-2 font-medium">Exposure</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {ACCOUNTS.map((a) => (
              <tr key={a.id} className="border-t border-zinc-800/80">
                <td className="py-2.5 pr-4">
                  <a href={a.href} target="_blank" rel="noreferrer" className="hover:text-brand-400">
                    {a.venue}
                  </a>
                </td>
                <td className="py-2.5 pr-4 font-mono text-zinc-400">{a.id}</td>
                <td className="py-2.5 pr-4 capitalize">{a.status}</td>
                <td className="py-2.5 pr-4">{a.pnl24h}</td>
                <td className="py-2.5">{a.exposure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
