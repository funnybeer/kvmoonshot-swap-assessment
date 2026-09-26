import { POLYMARKET_GAMMA, polymarketBtc15mSlug } from './constants';

export type PolyMarketSummary = {
  slug: string;
  question: string;
  outcomePrices?: number[];
};

export async function fetchPolymarket15mBtc(): Promise<PolyMarketSummary | null> {
  const slug = polymarketBtc15mSlug();
  const url = `${POLYMARKET_GAMMA}/markets/slug/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    slug?: string;
    question?: string;
    outcomePrices?: string | string[];
  };
  let prices: number[] | undefined;
  const raw = data.outcomePrices;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as string[];
      prices = parsed.map((p) => parseFloat(p)).filter((n) => !Number.isNaN(n));
    } catch {
      prices = undefined;
    }
  } else if (Array.isArray(raw)) {
    prices = raw.map((p) => parseFloat(p)).filter((n) => !Number.isNaN(n));
  }
  return {
    slug: data.slug || slug,
    question: data.question || 'BTC 15m',
    outcomePrices: prices,
  };
}
