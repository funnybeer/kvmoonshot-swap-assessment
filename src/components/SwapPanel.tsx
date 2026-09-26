'use client';

import { useState } from 'react';
import { ArrowDownUp, Settings2, Zap } from 'lucide-react';
import { useSwapQuote } from '@/hooks/useSwapQuote';
import { TokenSelect } from '@/components/swap/TokenSelect';
import { RateTimer } from '@/components/swap/RateTimer';
import { SwapDetails } from '@/components/swap/SwapDetails';
import { SwapConfirmModal } from '@/components/swap/SwapConfirmModal';
import { getToken } from '@/lib/tokens';

type RateType = 'fixed' | 'float';

export function SwapPanel() {
  const [tokenIn, setTokenIn] = useState('ETH');
  const [tokenOut, setTokenOut] = useState('USDC');
  const [amountIn, setAmountIn] = useState('');
  // TODO: slippage selector (0.1%, 0.5%, 1%, custom input)
  const [slippage] = useState(0.5);
  const [rateType, setRateType] = useState<RateType>('fixed');
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { quote, isLoading, error } = useSwapQuote({
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
  });

  const flipTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn('');
  };

  const handleSwap = () => {
    // TODO: validate quote + open confirmation modal
    if (!quote || !amountIn) return;
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // TODO: wallet execution hook (trial SDK stops at confirmation UI)
    setShowConfirm(false);
  };

  const tokenInMeta = getToken(tokenIn);

  return (
    <div id="swap" className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-brand-500/20 to-transparent opacity-60 blur-sm" />
      <div className="relative rounded-3xl border border-surface-border bg-surface-card p-5 shadow-swap sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Exchange</h2>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-surface p-0.5">
              {(['fixed', 'float'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRateType(type)}
                  className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-all ${
                    rateType === type
                      ? 'bg-surface-elevated text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-surface-elevated hover:text-zinc-300"
              aria-label="Slippage settings"
            >
              <Settings2 size={18} />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mb-4 rounded-xl border border-dashed border-brand-500/30 bg-surface p-3 text-xs text-zinc-500">
            <p className="font-medium text-zinc-400">Slippage settings</p>
            <p className="mt-1">
              TODO: preset buttons (0.1%, 0.5%, 1%) and custom input. Wire selected value into{' '}
              <code className="text-brand-400">useSwapQuote</code>.
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-surface-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500">You send</span>
            <span className="text-xs text-zinc-600">
              Balance: <span className="text-zinc-500">—</span>
              {/* TODO: show wallet balance when connected */}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <TokenSelect value={tokenIn} onChange={setTokenIn} exclude={tokenOut} />
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value.replace(/[^0-9.]/g, ''))}
              className="min-w-0 flex-1 bg-transparent text-right text-2xl font-semibold text-white placeholder:text-zinc-700 focus:outline-none"
            />
          </div>
          {tokenInMeta?.network && (
            <p className="mt-2 text-xs text-zinc-600">Network: {tokenInMeta.network}</p>
          )}
        </div>

        <div className="relative z-20 -my-3 flex justify-center">
          <button
            type="button"
            onClick={flipTokens}
            className="rounded-xl border-4 border-surface-card bg-surface-elevated p-2.5 text-zinc-400 transition-all hover:border-brand-500/30 hover:text-brand-400"
          >
            <ArrowDownUp size={18} />
          </button>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500">You get</span>
            <RateTimer onExpire={() => undefined} />
            {/* TODO: refresh quote when timer expires (pass refetch from useSwapQuote) */}
          </div>
          <div className="flex items-center gap-3">
            <TokenSelect value={tokenOut} onChange={setTokenOut} exclude={tokenIn} />
            <div className="min-w-0 flex-1 text-right text-2xl font-semibold text-zinc-600">
              {isLoading ? '…' : (quote?.amountOut ?? '—')}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <SwapDetails
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            amountIn={amountIn}
            amountOut={quote?.amountOut}
            priceImpact={quote?.priceImpact}
            slippage={slippage}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
        )}

        <button
          type="button"
          onClick={handleSwap}
          disabled={!quote || isLoading || !amountIn}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <Zap size={18} />
          Review swap
        </button>

        {!quote && amountIn && (
          <p className="mt-2 text-center text-xs text-zinc-600">
            Complete <code className="text-brand-400/80">useSwapQuote</code> to fetch live rates.
          </p>
        )}

        <p className="mt-3 text-center text-xs text-zinc-600">
          No hidden fees · All fees included in the rate you see
        </p>
      </div>

      <SwapConfirmModal
        open={showConfirm}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        amountIn={amountIn}
        amountOut={quote?.amountOut}
        slippage={slippage}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
