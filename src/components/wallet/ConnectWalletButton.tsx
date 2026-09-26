'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function ConnectWalletButton() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden rounded-lg border border-surface-border bg-surface-elevated px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 sm:inline">
          {chain?.name || 'Sepolia'} · {address.slice(0, 6)}…{address.slice(-4)}
        </span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-surface-elevated"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const injected = connectors.find((c) => c.id === 'injected' || c.type === 'injected') || connectors[0];

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={!injected || isPending}
        onClick={() => injected && connect({ connector: injected })}
        className="rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 disabled:opacity-50"
      >
        {isPending ? 'Connecting…' : 'Connect wallet'}
      </button>
      {error && <p className="max-w-[200px] text-right text-[10px] text-amber-400">{error.message}</p>}
    </div>
  );
}
