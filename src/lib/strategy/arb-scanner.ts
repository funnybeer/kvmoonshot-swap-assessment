/**
 * Cross-venue arb scanner (assessment stub).
 * Production uses @kvmoonshot/kvmswap-native for low-latency book merge.
 */

export type LegQuote = { venue: string; side: 'yes' | 'no' | 'up' | 'down'; mid: number };

export type ArbCheck = {
  strategy: 'poly_down_kalshi_yes' | 'poly_up_kalshi_no';
  totalCost: number;
  margin: number;
  isOpportunity: boolean;
};

export function evaluatePairCost(
  polyUp: number,
  polyDown: number,
  kalshiYes: number,
  kalshiNo: number,
  buffer = 0.02,
): ArbCheck[] {
  const threshold = 1 - buffer;
  const a = {
    strategy: 'poly_down_kalshi_yes' as const,
    totalCost: polyDown + kalshiYes,
    margin: 0,
    isOpportunity: false,
  };
  a.margin = 1 - a.totalCost;
  a.isOpportunity = a.totalCost < threshold;

  const b = {
    strategy: 'poly_up_kalshi_no' as const,
    totalCost: polyUp + kalshiNo,
    margin: 0,
    isOpportunity: false,
  };
  b.margin = 1 - b.totalCost;
  b.isOpportunity = b.totalCost < threshold;

  return [a, b];
}

/** Assessment: replace with live Gamma + Kalshi fetches in useVenueQuotes. */
export function mockScan(): ArbCheck[] {
  return evaluatePairCost(0.48, 0.47, 0.46, 0.45, 0.02);
}
