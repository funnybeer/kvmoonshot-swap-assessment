const REPO = 'kvmoonshot-markets-sdk';

export function AssessmentBrief() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Markets SDK trial</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
        Cross-venue strategy integration
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
        Wire Polymarket + Kalshi quote hooks, surface arb margins, and optionally connect the DEX swap module. Native
        routing is provided via <code className="text-zinc-300">@kvmoonshot/kvmswap-native</code>.
      </p>
      <ol className="mt-8 space-y-4 text-sm text-zinc-300">
        <li>
          <span className="font-semibold text-white">1.</span> Create{' '}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">useVenueQuotes.ts</code>
        </li>
        <li>
          <span className="font-semibold text-white">2.</span> Build{' '}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">ArbMonitor.tsx</code>
        </li>
        <li>
          <span className="font-semibold text-white">3.</span> Run <code className="text-xs">npm test</code> — see README
        </li>
      </ol>
      <p className="mt-8 text-xs text-zinc-500">
        Reference: 15m BTC windows · Gamma <span className="font-mono">gamma-api.polymarket.com</span> · Kalshi{' '}
        <span className="font-mono">api.elections.kalshi.com</span>
      </p>
      <a
        href={`https://github.com/funnybeer/${REPO}#assessment`}
        className="mt-6 inline-flex text-sm font-medium text-brand-400 hover:text-brand-300"
      >
        Full rubric on GitHub →
      </a>
    </div>
  );
}
