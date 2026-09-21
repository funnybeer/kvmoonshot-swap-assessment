import { Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="border-b border-brand-500/10 bg-brand-500/5">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <Sparkles size={14} className="shrink-0 text-brand-400" />
        <p className="text-zinc-300">
          <span className="font-medium text-brand-300">KVMoonShot Chain v2</span> is live with lower
          fees on cross-chain routes.{' '}
          <a href="#swap" className="font-medium text-white underline-offset-2 hover:underline">
            Swap now
          </a>
        </p>
      </div>
    </div>
  );
}
