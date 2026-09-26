import { SwapPanel } from '@/components/SwapPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AssessmentBanner } from '@/components/layout/AssessmentBanner';
import { AssessmentBrief } from '@/components/home/AssessmentBrief';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0e17]">
      <AssessmentBanner />
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 lg:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <AssessmentBrief />
          <SwapPanel />
        </div>

        <section className="mt-14 rounded-xl border border-surface-border/80 bg-surface-card/30 p-6">
          <h2 className="text-sm font-semibold text-zinc-300">Strategy module (your work)</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Implement <code className="text-zinc-400">ArbMonitor</code> here after{' '}
            <code className="text-zinc-400">useVenueQuotes</code>. Mock scan margin today:{' '}
            <span className="font-mono text-emerald-500/90">see arb-scanner.test.ts</span>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
