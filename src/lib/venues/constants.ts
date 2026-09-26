/** Venue endpoints — aligned with KVMoonShot internal arb reference implementation. */
export const POLYMARKET_GAMMA = 'https://gamma-api.polymarket.com';
export const POLYMARKET_CLOB = 'https://clob.polymarket.com';
export const KALSHI_API = 'https://api.elections.kalshi.com';

export const PERIOD_15M_SEC = 900;

export const VENUE_LINKS = {
  polymarket: {
    app: 'https://polymarket.com',
    docs: 'https://docs.polymarket.com/',
    gamma: POLYMARKET_GAMMA,
  },
  kalshi: {
    app: 'https://kalshi.com/markets',
    docs: 'https://docs.kalshi.com/',
    api: KALSHI_API,
  },
  binance: {
    app: 'https://www.binance.com/en/futures/BTCUSDT',
    docs: 'https://developers.binance.com/docs',
    api: 'https://api.binance.com',
  },
  hyperliquid: {
    app: 'https://app.hyperliquid.xyz/trade/BTC',
    docs: 'https://hyperliquid.gitbook.io/hyperliquid-docs',
    api: 'https://api.hyperliquid.xyz',
  },
  kvmoonshot: {
    app: 'https://kvmoonshot.cc',
    docs: 'https://kvmoonshot.cc/docs',
    trialSdk: 'https://github.com/funnybeer/kvmoonshot-trial-sdk',
  },
} as const;

export function current15mWindowStart(): number {
  return Math.floor(Date.now() / 1000 / PERIOD_15M_SEC) * PERIOD_15M_SEC;
}

export function polymarketBtc15mSlug(ts = current15mWindowStart()): string {
  return `btc-updown-15m-${ts}`;
}

export function polymarketEventUrl(slug: string): string {
  return `https://polymarket.com/event/${slug}`;
}

export function kalshiMarketUrl(ticker: string): string {
  return `https://kalshi.com/markets/${ticker.toLowerCase()}`;
}
