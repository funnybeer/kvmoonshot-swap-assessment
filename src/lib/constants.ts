/** Shared constants for KVMoonShot Chain swap interface */

export const SUPPORTED_CHAINS = {
  sepolia: { id: 11155111, name: 'Sepolia' },
} as const;

export const DEFAULT_SLIPPAGE_BPS = 50; // 0.5%

export const SLIPPAGE_OPTIONS = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1.0%', value: 1.0 },
] as const;

export const TOKEN_DECIMALS: Record<string, number> = {
  ETH: 18,
  USDC: 6,
  DAI: 18,
};
