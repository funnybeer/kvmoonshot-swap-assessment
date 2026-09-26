/** Read-only public CEX endpoints (no API keys). */
export type CexTicker = {
  venue: string;
  symbol: string;
  bid: number;
  ask: number;
  spreadBps: number;
};

export async function fetchBinanceBtcUsdt(): Promise<CexTicker | null> {
  const res = await fetch('https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT', {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { bidPrice?: string; askPrice?: string };
  const bid = parseFloat(j.bidPrice || '0');
  const ask = parseFloat(j.askPrice || '0');
  if (!bid || !ask) return null;
  const mid = (bid + ask) / 2;
  const spreadBps = mid ? ((ask - bid) / mid) * 10_000 : 0;
  return { venue: 'Binance', symbol: 'BTCUSDT', bid, ask, spreadBps };
}

export async function fetchHyperliquidBtcMid(): Promise<CexTicker | null> {
  const res = await fetch('https://api.hyperliquid.xyz/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'allMids' }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const mids = (await res.json()) as Record<string, string>;
  const mid = parseFloat(mids.BTC || '0');
  if (!mid) return null;
  return {
    venue: 'Hyperliquid',
    symbol: 'BTC-PERP',
    bid: mid * 0.9999,
    ask: mid * 1.0001,
    spreadBps: 2,
  };
}
