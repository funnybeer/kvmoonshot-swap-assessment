import { KALSHI_API } from './constants';

export type KalshiMarketSummary = {
  ticker: string;
  title: string;
  yesBid: number;
  yesAsk: number;
  noBid: number;
  noAsk: number;
};

const SERIES = 'KXBTC15M';

export async function fetchKalshiBtc15m(): Promise<KalshiMarketSummary | null> {
  const url = new URL(`${KALSHI_API}/trade-api/v2/markets`);
  url.searchParams.set('series_ticker', SERIES);
  url.searchParams.set('status', 'open');
  url.searchParams.set('limit', '1');
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) return null;
  const data = (await res.json()) as { markets?: Array<Record<string, unknown>> };
  const m = data.markets?.[0];
  if (!m) return null;
  return {
    ticker: String(m.ticker || ''),
    title: String(m.title || SERIES),
    yesBid: Number(m.yes_bid) || 0,
    yesAsk: Number(m.yes_ask) || 0,
    noBid: Number(m.no_bid) || 0,
    noAsk: Number(m.no_ask) || 0,
  };
}
