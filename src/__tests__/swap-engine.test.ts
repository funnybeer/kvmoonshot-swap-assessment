import { describe, it, expect } from 'vitest';
import { getQuote } from '@/lib/swap-engine';

describe('swap-engine', () => {
  it('returns a quote for ETH → USDC', async () => {
    const quote = await getQuote({
      tokenIn: 'ETH',
      tokenOut: 'USDC',
      amountIn: '1',
      slippage: 0.5,
    });
    expect(parseFloat(quote.amountOut)).toBeGreaterThan(3000);
    expect(quote.route).toEqual(['ETH', 'USDC']);
  });

  it('throws for unknown pair', async () => {
    await expect(
      getQuote({ tokenIn: 'ETH', tokenOut: 'DOGE', amountIn: '1', slippage: 0.5 })
    ).rejects.toThrow('No route available');
  });
});
