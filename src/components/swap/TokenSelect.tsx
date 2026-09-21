'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { TOKENS, getToken } from '@/lib/tokens';
import { TokenIcon } from '@/components/ui/TokenIcon';

interface TokenSelectProps {
  value: string;
  onChange: (symbol: string) => void;
  exclude?: string;
}

export function TokenSelect({ value, onChange, exclude }: TokenSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const token = getToken(value);

  const options = TOKENS.filter((t) => {
    if (t.symbol === exclude) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectToken = (symbol: string) => {
    onChange(symbol);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-xl border border-transparent bg-surface-elevated px-3 py-2.5 transition-colors hover:border-brand-500/20 hover:bg-surface-card"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <TokenIcon symbol={value} size={28} />
        <div className="min-w-0 text-left">
          <p className="text-sm font-semibold text-white">{value}</p>
          <p className="max-w-[5.5rem] truncate text-xs text-zinc-500">{token?.name}</p>
        </div>
        <ChevronDown
          size={16}
          className={`ml-0.5 shrink-0 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-swap">
          <div className="border-b border-surface-border p-3">
            <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2">
              <Search size={16} className="shrink-0 text-zinc-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search token"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          <ul className="max-h-64 overflow-y-auto p-1.5" role="listbox">
            {options.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-zinc-500">No tokens found</li>
            ) : (
              options.map((t) => {
                const selected = t.symbol === value;
                return (
                  <li key={t.symbol}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => selectToken(t.symbol)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        selected
                          ? 'bg-brand-500/15 text-white'
                          : 'text-zinc-300 hover:bg-surface-elevated hover:text-white'
                      }`}
                    >
                      <TokenIcon symbol={t.symbol} size={32} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{t.symbol}</span>
                          {t.network && (
                            <span className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                              {t.network}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-zinc-500">{t.name}</p>
                      </div>
                      {selected && <Check size={16} className="shrink-0 text-brand-400" />}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
