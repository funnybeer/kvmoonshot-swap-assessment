/**
 * Nansen-style label stub — candidates wire real API keys in .env.local (NANSEN_API_KEY).
 * @see https://docs.nansen.ai/
 */

export type WalletLabel = {
  address: string;
  labels: string[];
  tier: 'smart_money' | 'exchange' | 'fund' | 'unknown';
};

export function mockSmartMoneyLabels(): WalletLabel[] {
  return [
    {
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      labels: ['Smart Trader', 'Early Polymarket'],
      tier: 'smart_money',
    },
  ];
}
