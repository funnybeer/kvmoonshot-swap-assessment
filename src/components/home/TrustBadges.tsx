import { Headphones, Lock, Shield, Zap } from 'lucide-react';

const BADGES = [
  {
    icon: Shield,
    title: 'Non-custodial',
    desc: 'Funds go straight to your wallet. KVMoonShot never takes custody of your assets.',
  },
  {
    icon: Zap,
    title: 'Best execution',
    desc: 'Smart routing across DEX liquidity sources delivers competitive rates on every swap.',
  },
  {
    icon: Lock,
    title: 'No sign-up',
    desc: 'Start swapping in under 30 seconds. No email, no password, no friction.',
  },
  {
    icon: Headphones,
    title: '24/7 human support',
    desc: 'Support team available by email. Contact support@kvmoonshot.cc.',
  },
];

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white">Why traders choose KVMoonShot</h2>
        <p className="mt-2 text-zinc-500">Built for speed, transparency, and control.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-surface-border bg-surface-card/50 p-6 transition-colors hover:border-brand-500/20 hover:bg-surface-card"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/15">
              <Icon size={22} />
            </div>
            <h3 className="mb-2 font-semibold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-zinc-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
