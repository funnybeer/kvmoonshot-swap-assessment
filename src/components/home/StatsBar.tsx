const STATS = [
  { value: '$4.2B+', label: 'Total volume exchanged' },
  { value: '2.4M+', label: 'Registered users' },
  { value: '<45s', label: 'Median swap time' },
  { value: '175+', label: 'Countries served' },
];

export function StatsBar() {
  return (
    <section className="border-y border-surface-border bg-surface-card/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4 lg:px-6">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold text-white lg:text-3xl">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
