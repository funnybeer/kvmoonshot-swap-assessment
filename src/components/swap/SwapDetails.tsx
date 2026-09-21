'use client';

import { Info, ShieldCheck } from 'lucide-react';
import { getToken } from '@/lib/tokens';

interface SwapDetailsProps {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut?: string;
  priceImpact?: number;
  slippage: number;
  isLoading?: boolean;
}

export function SwapDetails({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  priceImpact,
  slippage,
  isLoading,
}: SwapDetailsProps) {
  if (!amountIn || parseFloat(amountIn) <= 0) return null;

  const rate =
    amountOut && parseFloat(amountIn) > 0
      ? (parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)
      : null;

  return (
    <div className="space-y-2.5 rounded-xl border border-surface-border bg-surface/50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">Exchange rate</span>
        <span className="font-medium text-zinc-300">
          {isLoading ? '…' : rate ? `1 ${tokenIn} ≈ ${rate} ${tokenOut}` : 'N/A'}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-zinc-500">
          Network fee
          <Info size={12} className="text-zinc-600" />
        </span>
        <span className="text-zinc-300">Included in rate</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">Slippage tolerance</span>
        <span className="text-zinc-300">{slippage}%</span>
      </div>

      {priceImpact !== undefined && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Price impact</span>
          <span className={priceImpact > 1 ? 'text-amber-400' : 'text-zinc-300'}>
            {priceImpact.toFixed(2)}%
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-surface-border pt-3 text-xs text-zinc-500">
        <ShieldCheck size={14} className="text-brand-500" />
        <span>
          Non-custodial. {getToken(tokenOut)?.network ?? 'Crypto'} sent directly to your wallet.
        </span>
      </div>
    </div>
  );
}
