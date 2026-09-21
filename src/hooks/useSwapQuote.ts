import { useCallback, useState } from 'react';
// import { getQuote } from '@/lib/swap-engine';

interface SwapQuoteParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippage: number;
  refreshKey?: number;
}

interface QuoteResult {
  amountOut: string;
  priceImpact: number;
  route: string[];
}

/**
 * Assessment task — connect the swap form to `getQuote()` in `src/lib/swap-engine.ts`.
 *
 * Requirements (see README.md — Assessment):
 * - Debounce input changes (~300ms)
 * - Loading + error states
 * - Return `{ quote, isLoading, error, refetch }`
 */
export function useSwapQuote(_params: SwapQuoteParams) {
  const [quote] = useState<QuoteResult | null>(null);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const refetch = useCallback(() => {
    // TODO: fetch quote via getQuote()
  }, []);

  return { quote, isLoading, error, refetch };
}
