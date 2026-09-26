import { NextResponse } from 'next/server';
import { fetchBinanceBtcUsdt, fetchHyperliquidBtcMid } from '@/lib/venues/cex-public';
import { fetchKalshiBtc15m } from '@/lib/venues/kalshi-client';
import { fetchPolymarket15mBtc } from '@/lib/venues/polymarket-client';
import { evaluatePairCost } from '@/lib/strategy/arb-scanner';

export const dynamic = 'force-dynamic';

function kalshiMid(bid: number, ask: number): number {
  if (!bid && !ask) return 0;
  return (bid + ask) / 2 / 100;
}

export async function GET() {
  const [poly, kalshi, binance, hyperliquid] = await Promise.all([
    fetchPolymarket15mBtc(),
    fetchKalshiBtc15m(),
    fetchBinanceBtcUsdt(),
    fetchHyperliquidBtcMid(),
  ]);
  let arb = evaluatePairCost(0.48, 0.47, 0.46, 0.45, 0.02);
  if (poly?.outcomePrices && poly.outcomePrices.length >= 2 && kalshi) {
    const up = poly.outcomePrices[0] ?? 0.5;
    const down = poly.outcomePrices[1] ?? 0.5;
    const yes = kalshiMid(kalshi.yesBid, kalshi.yesAsk);
    const no = kalshiMid(kalshi.noBid, kalshi.noAsk);
    arb = evaluatePairCost(up, down, yes, no, 0.02);
  }
  return NextResponse.json({
    ts: new Date().toISOString(),
    polymarket: poly,
    kalshi,
    cex: { binance, hyperliquid },
    arb,
  });
}
