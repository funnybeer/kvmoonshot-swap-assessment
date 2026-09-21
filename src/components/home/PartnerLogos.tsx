const PARTNERS = ['Ethereum', 'Solana', 'Arbitrum', 'Base', 'Polygon', 'BNB Chain'];

export function PartnerLogos() {
  return (
    <section className="border-y border-surface-border/60 bg-surface-card/20">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
          Integrated with leading networks
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-wide text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
