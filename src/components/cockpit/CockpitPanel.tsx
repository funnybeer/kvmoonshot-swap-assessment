import { clsx } from 'clsx';

type Props = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function CockpitPanel({ title, action, children, className }: Props) {
  return (
    <section
      className={clsx(
        'rounded-xl border border-surface-border bg-surface-card shadow-cockpit transition-shadow hover:shadow-cockpit-hover',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-surface-border/80 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</h2>
        {action}
      </div>
      <div className="p-4 lg:p-5">{children}</div>
    </section>
  );
}
