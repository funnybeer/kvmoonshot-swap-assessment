'use client';

interface SwapConfirmModalProps {
  open: boolean;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut?: string;
  slippage: number;
  onClose: () => void;
  onConfirm: () => void;
}

export function SwapConfirmModal({
  open,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
  onClose,
  onConfirm,
}: SwapConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-surface-border bg-surface-card p-5 shadow-swap">
        <h3 className="mb-4 text-lg font-semibold text-white">Review swap</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">You send</span>
            <span className="font-medium text-white">
              {amountIn} {tokenIn}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">You get</span>
            <span className="font-medium text-white">
              {amountOut ?? '0.00'} {tokenOut}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Slippage</span>
            <span className="text-zinc-300">{slippage}%</span>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-surface-border py-2.5 text-sm font-medium text-zinc-300 hover:bg-surface-elevated"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
