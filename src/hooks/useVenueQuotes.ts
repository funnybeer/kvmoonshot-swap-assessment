'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ArbCheck } from '@/lib/strategy/arb-scanner';

export type VenueSnapshot = {
  ts: string;
  polymarket: { slug: string; question: string; outcomePrices?: number[] } | null;
  kalshi: {
    ticker: string;
    title: string;
    yesBid: number;
    yesAsk: number;
    noBid: number;
    noAsk: number;
  } | null;
  arb: ArbCheck[];
  cex?: {
    binance: { venue: string; symbol: string; bid: number; ask: number; spreadBps: number } | null;
    hyperliquid: { venue: string; symbol: string; bid: number; ask: number; spreadBps: number } | null;
  };
};

export function useVenueQuotes(pollMs = 20_000) {
  const [data, setData] = useState<VenueSnapshot | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/venues/snapshot/');
      if (!res.ok) throw new Error(`Snapshot ${res.status}`);
      setData((await res.json()) as VenueSnapshot);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Snapshot failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [pollMs, refresh]);

  return { data, isLoading, error, refresh };
}
