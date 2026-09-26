'use client';

import { useState } from 'react';
import type { ArbCheck } from '@/lib/strategy/arb-scanner';

type Props = { opportunities: ArbCheck[]; venueSummary: string };

export function StrategyCopilot({ opportunities, venueSummary }: Props) {
  const [provider, setProvider] = useState<'openai' | 'anthropic'>('openai');
  const [brief, setBrief] = useState('');
  const [source, setSource] = useState<string | null>(null);
  const [senpiOut, setSenpiOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch('/api/ai/strategy-brief/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          opportunities: opportunities.map((o) => ({
            strategy: o.strategy,
            margin: o.margin,
            totalCost: o.totalCost,
          })),
          venueSummary,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; brief?: string; error?: string; source?: string };
      if (!json.ok) throw new Error(json.error || 'Failed');
      setBrief(json.brief || '');
      setSource(json.source || null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Copilot error');
    } finally {
      setLoading(false);
    }
  }

  async function runSenpi() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch('/api/ai/senpi-skill/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: 'arb-digest',
          context: `${venueSummary} · ${JSON.stringify(opportunities)}`,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; text?: string; live?: boolean; error?: string };
      if (!json.ok) throw new Error(json.error || 'Senpi failed');
      setSenpiOut(json.text || '');
      setSource(json.live ? 'senpi-live' : 'senpi-demo');
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Senpi error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-surface-border bg-surface-card/30 p-5">
      <h2 className="text-sm font-semibold text-zinc-200">Strategy copilot</h2>
      <p className="mt-1 text-xs text-zinc-500">
        OpenAI / Claude / Senpi skills — keys in <code className="text-zinc-400">.env.local</code> (
        <code className="text-zinc-400">OPENAI_API_KEY</code>, <code className="text-zinc-400">ANTHROPIC_API_KEY</code>,{' '}
        <code className="text-zinc-400">SENPI_API_KEY</code>)
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as 'openai' | 'anthropic')}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-200"
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Claude</option>
        </select>
        <button
          type="button"
          disabled={loading}
          onClick={run}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
        >
          {loading ? 'Thinking…' : 'Generate brief'}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={runSenpi}
          className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 disabled:opacity-50"
        >
          Senpi arb skill
        </button>
      </div>
      {source && (
        <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-500">
          Source: {source.replace('-', ' ')}
        </p>
      )}
      {err && <p className="mt-3 text-xs text-amber-400">{err}</p>}
      {brief && (
        <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-xs leading-relaxed text-zinc-300">
          {brief}
        </pre>
      )}
      {senpiOut && (
        <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-violet-500/20 bg-violet-500/5 p-3 text-xs leading-relaxed text-zinc-300">
          {senpiOut}
        </pre>
      )}
    </section>
  );
}
