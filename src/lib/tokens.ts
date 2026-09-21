export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  color: string;
  network?: string;
}

export const TOKENS: Token[] = [
  { symbol: 'BTC', name: 'Bitcoin', decimals: 8, color: '#F7931A', network: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', decimals: 18, color: '#627EEA', network: 'Ethereum' },
  { symbol: 'USDT', name: 'Tether', decimals: 6, color: '#26A17B', network: 'ERC20' },
  { symbol: 'USDC', name: 'USD Coin', decimals: 6, color: '#2775CA', network: 'ERC20' },
  { symbol: 'SOL', name: 'Solana', decimals: 9, color: '#9945FF', network: 'Solana' },
  { symbol: 'XMR', name: 'Monero', decimals: 12, color: '#FF6600', network: 'Monero' },
  { symbol: 'LTC', name: 'Litecoin', decimals: 8, color: '#345D9D', network: 'Litecoin' },
  { symbol: 'DAI', name: 'Dai', decimals: 18, color: '#F5AC37', network: 'ERC20' },
];

export function getToken(symbol: string): Token | undefined {
  return TOKENS.find((t) => t.symbol === symbol);
}

export const POPULAR_PAIRS = [
  { from: 'BTC', to: 'ETH' },
  { from: 'ETH', to: 'USDC' },
  { from: 'SOL', to: 'USDT' },
  { from: 'BTC', to: 'XMR' },
  { from: 'USDT', to: 'ETH' },
  { from: 'LTC', to: 'BTC' },
];
