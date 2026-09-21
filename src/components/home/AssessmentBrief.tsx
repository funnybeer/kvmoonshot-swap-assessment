export function AssessmentBrief() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Take-home exercise</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Wire the swap form to the quote engine
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          This branch ships with layout, token picker, and a tested <code className="text-zinc-300">getQuote()</code>{' '}
          helper. Your task is to connect <code className="text-zinc-300">useSwapQuote</code>, finish slippage UI, and
          open the confirm modal with live data. See README for the rubric.
        </p>
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-card/40 p-4">
        <p className="text-xs font-medium text-zinc-400">Checklist (expected before submit)</p>
        <ul className="mt-3 space-y-2 text-sm text-zinc-500">
          <li className="flex gap-2">
            <span className="text-amber-500/80">○</span>
            Debounced quote fetch in <code className="text-zinc-400">useSwapQuote.ts</code>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500/80">○</span>
            Slippage presets + custom input in settings panel
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500/80">○</span>
            Review swap modal populated from hook state
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500/80">○</span>
            Tests in <code className="text-zinc-400">useSwapQuote.test.ts</code> (currently todo stubs)
          </li>
        </ul>
      </div>

      <p className="text-xs text-zinc-600">
        Production marketing site lives at kvmoonshot.cc. This repo is the engineering starter only.
      </p>
    </div>
  );
}
