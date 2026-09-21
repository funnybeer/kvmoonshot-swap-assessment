export function CTABanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-surface-card to-indigo-500/5 p-10 text-center sm:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <h2 className="relative mb-3 text-2xl font-bold text-white sm:text-3xl">
          Ready to swap on KVMoonShot Chain?
        </h2>
        <p className="relative mx-auto mb-8 max-w-lg text-zinc-400">
          Swap supported assets with fixed or floating rates on KVMoonShot Chain.
        </p>
        <a
          href="#swap"
          className="relative inline-flex rounded-xl bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600"
        >
          Start exchanging
        </a>
      </div>
    </section>
  );
}
