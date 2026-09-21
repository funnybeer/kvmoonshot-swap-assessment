const STEPS = [
  {
    step: '1',
    title: 'Choose a pair',
    desc: 'Select the crypto you want to swap and the one you want to receive.',
  },
  {
    step: '2',
    title: 'Enter address',
    desc: 'Paste your wallet address. Funds are sent directly. No account needed.',
  },
  {
    step: '3',
    title: 'Send deposit',
    desc: 'Transfer the indicated amount to the generated deposit address.',
  },
  {
    step: '4',
    title: 'Receive crypto',
    desc: 'Your exchanged crypto arrives in your wallet, usually within minutes.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <h2 className="mb-10 text-center text-2xl font-bold text-white">How it works</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ step, title, desc }) => (
          <div key={step} className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-lg font-bold text-brand-500">
              {step}
            </div>
            <h3 className="mb-2 font-semibold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-zinc-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
