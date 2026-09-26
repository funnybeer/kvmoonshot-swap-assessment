const REPO = 'kvmoonshot-trial-sdk';

export function TrialBrief() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Trial SDK</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
        Multi-venue strategy stack
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
        Live Polymarket Gamma + Kalshi feeds, cross-venue arb math, optional OpenAI / Claude copilot, and DEX
        settlement — powered by our private native merge module.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-400">
        <li>• Perps & spot CEX hooks (read-only until keys added)</li>
        <li>• Senpi-style skills via copilot API route</li>
        <li>• Nansen label stubs under <code className="text-xs text-zinc-500">src/lib/intelligence</code></li>
      </ul>
      <a
        href={`https://github.com/funnybeer/${REPO}#trial-sdk`}
        className="mt-6 inline-flex text-sm font-medium text-brand-400 hover:text-brand-300"
      >
        Documentation on GitHub →
      </a>
    </div>
  );
}
