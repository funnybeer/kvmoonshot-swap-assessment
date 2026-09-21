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

        <section className="mt-14 rounded-xl border border-dashed border-surface-border/80 bg-surface-card/20 p-6">
          <h2 className="text-sm font-medium text-zinc-400">Landing sections (not in scope)</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Stats, partner logos, FAQ, and security blocks from the public site were omitted here on purpose. Focus on
            the swap flow; do not spend time polishing marketing copy.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
