'use client';

import type { VenueSnapshot } from '@/hooks/useVenueQuotes';
import { CockpitPanel } from '@/components/cockpit/CockpitPanel';
import { VENUE_LINKS, kalshiMarketUrl, polymarketEventUrl } from '@/lib/venues/constants';

type Props = {
  data: VenueSnapshot | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
};

export function ArbMonitor({ data, isLoading, error, refresh }: Props) {
  return (
    <CockpitPanel
      title="Cross-venue arb monitor"
      action={
        <button
          type="button"
          onClick={() => refresh()}
          className="rounded-lg border border-surface-border px-2.5 py-1 text-xs text-zinc-400 hover:bg-zinc-800"
        >
          Refresh
        </button>
      }
    >
      {isLoading && !data && <p className="mt-3 text-xs text-zinc-500">Loading Gamma + Kalshi + CEX…</p>}
      {error && <p className="mt-3 text-xs text-amber-400">{error}</p>}
      {data && (
        <div className="mt-4 space-y-3 text-xs">
          <p className="font-mono text-zinc-500">Updated {data.ts}</p>
          {data.polymarket && (
            <p className="text-zinc-400">
              Polymarket ·{' '}
              <a
                href={polymarketEventUrl(data.polymarket.slug)}
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:underline"
              >
                {data.polymarket.slug}
              </a>
              {data.polymarket.outcomePrices && (
                <span className="ml-2 font-mono text-zinc-500">
                  up {data.polymarket.outcomePrices[0]?.toFixed(3)} / down{' '}
                  {data.polymarket.outcomePrices[1]?.toFixed(3)}
                </span>
              )}
            </p>
          )}
          {data.kalshi && (
            <p className="text-zinc-400">
              Kalshi ·{' '}
              <a
                href={kalshiMarketUrl(data.kalshi.ticker)}
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:underline"
              >
                {data.kalshi.ticker}
              </a>{' '}
              yes {(data.kalshi.yesBid / 100).toFixed(2)}–{(data.kalshi.yesAsk / 100).toFixed(2)}
            </p>
          )}
          {data.cex && (data.cex.binance || data.cex.hyperliquid) && (
            <div className="rounded-lg border border-zinc-800/80 bg-black/20 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">CEX reference</p>
              {data.cex.binance && (
                <p className="mt-1 text-zinc-400">
                  <a href={VENUE_LINKS.binance.app} target="_blank" rel="noreferrer" className="text-zinc-200 hover:underline">
                    Binance
                  </a>{' '}
                  {data.cex.binance.symbol}{' '}
                  <span className="font-mono">
                    {data.cex.binance.bid.toFixed(1)} / {data.cex.binance.ask.toFixed(1)}
                  </span>{' '}
                  <span className="text-zinc-600">({data.cex.binance.spreadBps.toFixed(2)} bps)</span>
                </p>
              )}
              {data.cex.hyperliquid && (
                <p className="mt-1 text-zinc-400">
                  <a href={VENUE_LINKS.hyperliquid.app} target="_blank" rel="noreferrer" className="text-zinc-200 hover:underline">
                    Hyperliquid
                  </a>{' '}
                  {data.cex.hyperliquid.symbol}{' '}
                  <span className="font-mono">
                    {data.cex.hyperliquid.bid.toFixed(1)} / {data.cex.hyperliquid.ask.toFixed(1)}
                  </span>
                </p>
              )}
            </div>
          )}
          <ul className="space-y-2">
            {data.arb.map((c) => (
              <li
                key={c.strategy}
                className={`rounded-lg border px-3 py-2 ${
                  c.isOpportunity ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-zinc-800'
                }`}
              >
                <span className="font-medium text-zinc-200">{c.strategy}</span>
                <span className="ml-2 font-mono text-zinc-400">cost {c.totalCost.toFixed(3)}</span>
                <span className="ml-2 font-mono text-emerald-400/90">margin {c.margin.toFixed(3)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CockpitPanel>
  );
}
