import { describe, expect, it } from 'vitest';
import { evaluatePairCost, mockScan } from '@/lib/strategy/arb-scanner';

describe('arb-scanner', () => {
  it('flags opportunity when pair cost below threshold', () => {
    const checks = evaluatePairCost(0.5, 0.4, 0.45, 0.5, 0.02);
    const hit = checks.find((c) => c.strategy === 'poly_down_kalshi_yes');
    expect(hit?.isOpportunity).toBe(true);
  });

  it('mockScan returns two strategies', () => {
    expect(mockScan()).toHaveLength(2);
  });
});
