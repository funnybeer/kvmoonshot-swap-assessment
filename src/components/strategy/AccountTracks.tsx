'use client';

import { useAccount, useBalance } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { VENUE_LINKS } from '@/lib/venues/constants';
import { useVenueConnections } from '@/hooks/useVenueConnections';
import { CockpitPanel } from '@/components/cockpit/CockpitPanel';

const ROWS = [
  { key: 'polymarket', venue: 'Polymarket', id: 'poly-main', href: VENUE_LINKS.polymarket.app },
  { key: 'kalshi', venue: 'Kalshi', id: 'kalshi-pro', href: VENUE_LINKS.kalshi.app },
  { key: 'binance', venue: 'Binance', id: 'binance-perp', href: VENUE_LINKS.binance.app },
  { key: 'kucoin', venue: 'KuCoin', id: 'kucoin-spot', href: 'https://www.kucoin.com/trade/BTC-USDT' },
  { key: 'hyperliquid', venue: 'Hyperliquid', id: 'hl-1', href: VENUE_LINKS.hyperliquid.app },
] as const;

export function AccountTracks() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address, chainId: sepolia.id });
  const { data: connections } = useVenueConnections();

  return (
    <CockpitPanel title="Account tracks">
      <p className="mb-4 text-xs text-zinc-500">
        Wallet:{' '}
        {isConnected && address ? (
          <span className="font-mono text-brand-400">
            {address.slice(0, 8)}…{address.slice(-6)}
            {balance ? ` · ${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : ''}
          </span>
        ) : (
          <span className="text-amber-400/90">Not connected — use Connect wallet above</span>
        )}
      </p>
      <div className="overflow-x-auto">
        <table className="cockpit-table w-full min-w-[640px] text-left text-xs">
          <thead>
            <tr>
              <th>Venue</th>
              <th>Account</th>
              <th>Status</th>
              <th>Credentials</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {ROWS.map((a) => {
              const configured = connections?.venues[a.key];
              return (
                <tr key={a.key}>
                  <td>
                    <a href={a.href} target="_blank" rel="noreferrer" className="hover:text-brand-400">
                      {a.venue}
                    </a>
                  </td>
                  <td className="font-mono text-zinc-400">{a.id}</td>
                  <td className="capitalize">{configured ? 'connected' : 'read-only'}</td>
                  <td>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        configured ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {configured ? 'env set' : 'add .env.local'}
                    </span>
                  </td>
                  <td className="text-zinc-500">{configured ? 'Live API ready' : 'Public feeds only'}</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <a href={VENUE_LINKS.kvmoonshot.app} className="hover:text-brand-400">
                  KVMoonShot DEX
                </a>
              </td>
              <td className="font-mono text-zinc-400">treasury</td>
              <td>{isConnected ? 'wallet linked' : 'disconnected'}</td>
              <td>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    isConnected ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isConnected ? 'wagmi' : 'connect'}
                </span>
              </td>
              <td className="text-zinc-500">Sepolia swap module</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CockpitPanel>
  );
}
