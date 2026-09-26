'use client';

import { useCallback, useEffect, useState } from 'react';

export type ConnectionFlags = {
  ts: string;
  venues: Record<string, boolean>;
  ai: Record<string, boolean>;
  chain: { walletConnect: boolean; rpc: string; chainId: number };
};

export function useVenueConnections(pollMs = 30_000) {
  const [data, setData] = useState<ConnectionFlags | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/account/connections');
      if (!res.ok) throw new Error(String(res.status));
      setData((await res.json()) as ConnectionFlags);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [pollMs, refresh]);

  return { data, error, refresh };
}
