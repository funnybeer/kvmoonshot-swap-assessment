import Image from 'next/image';

const FOOTER_SECTIONS = [
  {
    title: 'Products',
    links: [
      { label: 'Exchange', href: '#swap' },
      { label: 'KVMoonShot Pro', href: '#' },
      { label: 'Mobile App', href: '#' },
      { label: 'API & Widget', href: 'https://kvmoonshot.cc/docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: 'https://kvmoonshot.cc/about' },
      { label: 'Careers', href: 'https://kvmoonshot.cc/careers' },
      { label: 'Blog', href: 'https://kvmoonshot.cc/blog' },
      { label: 'Press', href: 'https://kvmoonshot.cc/press' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: 'https://kvmoonshot.cc/terms' },
      { label: 'Privacy Policy', href: 'https://kvmoonshot.cc/privacy' },
      { label: 'AML Policy', href: 'https://kvmoonshot.cc/aml' },
      { label: 'Risk Disclosure', href: 'https://kvmoonshot.cc/risk' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: 'https://kvmoonshot.cc/help' },
      { label: 'System Status', href: 'https://kvmoonshot.cc/status' },
      { label: 'Contact', href: 'mailto:support@kvmoonshot.cc' },
      { label: 'Partnerships', href: 'mailto:partners@kvmoonshot.cc' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="KV MoonShot"
                width={140}
                height={42}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-zinc-500">
              Cross-chain exchange infrastructure by KVMoonShot Labs. Fast, transparent, non-custodial.
            </p>
          </div>
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-surface-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} KVMoonShot Labs Ltd. ·{' '}
            <a href="https://kvmoonshot.cc" className="hover:text-zinc-400">
              kvmoonshot.cc
            </a>
          </p>
          <p className="max-w-md text-xs leading-relaxed text-zinc-600">
            KVMoonShot does not provide investment advice. Digital asset trading involves risk.
            Services may be restricted in certain jurisdictions.
          </p>
        </div>
      </div>
    </footer>
  );
}
