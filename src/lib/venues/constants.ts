/** Venue endpoints — aligned with KVMoonShot internal arb reference implementation. */
export const POLYMARKET_GAMMA = 'https://gamma-api.polymarket.com';
export const POLYMARKET_CLOB = 'https://clob.polymarket.com';
export const KALSHI_API = 'https://api.elections.kalshi.com';

export const PERIOD_15M_SEC = 900;

export function current15mWindowStart(): number {
  return Math.floor(Date.now() / 1000 / PERIOD_15M_SEC) * PERIOD_15M_SEC;
}

export function polymarketBtc15mSlug(ts = current15mWindowStart()): string {
  return `btc-updown-15m-${ts}`;
}
