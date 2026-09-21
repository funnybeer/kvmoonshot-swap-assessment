import { BadgeCheck, Eye, FileCheck, ShieldCheck } from 'lucide-react';

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Non-custodial by design',
    desc: 'We never hold your assets. Every swap settles directly to your wallet address.',
  },
  {
    icon: FileCheck,
    title: 'Transparent routing',
    desc: 'Real-time quotes from aggregated DEX liquidity with full fee breakdown before you confirm.',
  },
  {
    icon: Eye,
    title: 'Privacy-first',
    desc: 'No account required for standard swaps. Optional KYC only for high-volume institutional routes.',
  },
  {
    icon: BadgeCheck,
    title: 'Operational security',
    desc: '24/7 monitoring, rate-limit protection, and incident response aligned with industry best practices.',
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-400">
            Security & compliance
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Security and compliance
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">
            KVMoonShot Labs operates KVMoonShot Chain infrastructure for production and API clients.
            Your keys stay in your wallet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['SOC 2 Type II', 'ISO 27001', 'GDPR-ready'].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-surface-border bg-surface-card px-4 py-1.5 text-xs font-medium text-zinc-400"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-surface-border bg-surface-card/50 p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Icon size={20} />
              </div>
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
