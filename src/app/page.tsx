import Image from 'next/image';
import { SwapPanel } from '@/components/SwapPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { TrustBadges } from '@/components/home/TrustBadges';
import { PopularPairs } from '@/components/home/PopularPairs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { StatsBar } from '@/components/home/StatsBar';
import { PartnerLogos } from '@/components/home/PartnerLogos';
import { SecuritySection } from '@/components/home/SecuritySection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';

export default function Home() {
  return (
    <div className="gradient-mesh flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />

      <section className="relative px-4 pb-12 pt-8 lg:pb-16 lg:pt-10">
        <div className="pointer-events-none absolute inset-0 shadow-glow" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 overflow-hidden rounded-2xl border border-brand-500/20 shadow-glow">
            <Image
              src="/banner.png"
              alt="KV MoonShot global cross-chain exchange network"
              width={1920}
              height={640}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="mb-4 inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-400">
                KVMoonShot Chain v2
              </p>
              <h1 className="text-gradient mb-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
                Cross-chain exchange
              </h1>
              <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0">
                Route swaps across supported networks. No registration required. Fees are shown in
                the quote before you confirm.
              </p>
              <ul className="mx-auto hidden max-w-md space-y-3 text-left lg:mx-0 lg:block">
                {[
                  'Fixed and floating rates with live countdown',
                  '1,000+ assets across major L1s and L2s',
                  'Enterprise API trusted by fintech partners',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <SwapPanel />
          </div>
        </div>
      </section>

      <StatsBar />
      <PartnerLogos />
      <TrustBadges />
      <PopularPairs />
      <HowItWorks />
      <SecuritySection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
