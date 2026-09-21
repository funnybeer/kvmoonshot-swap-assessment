'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  {
    q: 'Do I need to create an account?',
    a: 'No. KVMoonShot is non-custodial. Connect your wallet or paste a receiving address to swap. Accounts are optional for API access.',
  },
  {
    q: 'Which networks does KVMoonShot Chain support?',
    a: 'We route across Ethereum, Solana, Arbitrum, Base, Polygon, BNB Chain, and 40+ additional networks. New integrations ship weekly.',
  },
  {
    q: 'How are exchange rates determined?',
    a: 'Quotes aggregate liquidity from connected DEXs and market makers. Network and platform fees are included in the rate shown.',
  },
  {
    q: 'Is KVMoonShot available in my country?',
    a: 'We serve users in 175+ countries. Some jurisdictions require additional verification for large transactions. See our Terms of Service for details.',
  },
  {
    q: 'How do I contact support?',
    a: 'Reach our team 24/7 at support@kvmoonshot.cc or via the in-app help widget. Average first response time is under 4 minutes.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-surface-border bg-surface-card/20">
      <div className="mx-auto max-w-3xl px-4 py-20 lg:px-6">
        <h2 className="mb-2 text-center text-3xl font-bold text-white">Frequently asked questions</h2>
        <p className="mb-10 text-center text-zinc-500">
          Everything you need to know about swapping on KVMoonShot Chain.
        </p>
        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={q}
              className="overflow-hidden rounded-xl border border-surface-border bg-surface-card"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-white">{q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-zinc-500 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="border-t border-surface-border px-5 py-4 text-sm leading-relaxed text-zinc-400">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
