import { describe, it } from 'vitest';

/**
 * Assessment tests — implement after wiring useSwapQuote to swap-engine.
 * See README.md — Assessment § Tests.
 */
describe('useSwapQuote (trial sdk)', () => {
  it.todo('debounces input (~300ms) and returns a quote for ETH → USDC');

  it.todo('clears quote when amount is zero or tokenIn === tokenOut');

  it.todo('sets isLoading while fetching and clears on success');

  it.todo('surfaces getQuote() errors in error state');
});
