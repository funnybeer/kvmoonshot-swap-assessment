/**
 * Mock exchange rate engine. Simulates aggregated DEX liquidity.
 * Production KVMoonShot uses @kvmoonshot/kvmswap-native WASM bindings when present.
 */

const MOCK_RATES: Record<string, number> = {
  'BTC/ETH': 26.8,
  'ETH/BTC': 1 / 26.8,
  'ETH/USDC': 3245.18,
  'USDC/ETH': 1 / 3245.18,
  'ETH/USDT': 3244.5,
  'USDT/ETH': 1 / 3244.5,
  'ETH/DAI': 3240.0,
  'DAI/ETH': 1 / 3240.0,
  'BTC/USDT': 87000,
  'USDT/BTC': 1 / 87000,
  'BTC/USDC': 86950,
  'USDC/BTC': 1 / 86950,
  'SOL/USDT': 148.2,
  'USDT/SOL': 1 / 148.2,
  'SOL/ETH': 0.0456,
  'ETH/SOL': 1 / 0.0456,
  'XMR/BTC': 0.0048,
  'BTC/XMR': 1 / 0.0048,
  'LTC/BTC': 0.00104,
  'BTC/LTC': 1 / 0.00104,
  'USDC/DAI': 1.0002,
  'DAI/USDC': 1 / 1.0002,
};

interface QuoteParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippage: number;
}

interface QuoteResult {
  amountOut: string;
  priceImpact: number;
  route: string[];
}

export async function getQuote(params: QuoteParams): Promise<QuoteResult> {
  await delay(120 + Math.random() * 180);

  const { tokenIn, tokenOut, amountIn, slippage } = params;
  const pair = `${tokenIn}/${tokenOut}`;
  const rate = MOCK_RATES[pair];

  if (!rate) throw new Error(`No route available for ${pair}`);

  const raw = parseFloat(amountIn) * rate;
  const minOut = raw * (1 - slippage / 100);
  const decimals = tokenOut === 'USDC' || tokenOut === 'USDT' ? 2 : 6;

  return {
    amountOut: minOut.toFixed(decimals),
    priceImpact: Math.random() * 0.45,
    route: [tokenIn, tokenOut],
  };
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
