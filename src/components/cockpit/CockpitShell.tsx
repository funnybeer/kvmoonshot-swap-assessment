'use client';

type Props = {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

/** Trial SDK 12-column desk shell — main 8 / sidebar 4 on xl. */
export function CockpitShell({ sidebar, children }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-6">
      <div className="col-span-12 flex flex-col gap-4 lg:gap-6 xl:col-span-8">{children}</div>
      {sidebar && (
        <aside className="col-span-12 flex flex-col gap-4 lg:gap-6 xl:col-span-4 xl:sticky xl:top-28 xl:self-start">
          {sidebar}
        </aside>
      )}
    </div>
  );
}
