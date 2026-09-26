'use client';

import { SwapPanel } from '@/components/SwapPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TrialBanner } from '@/components/layout/TrialBanner';
import { TrialBrief } from '@/components/home/TrialBrief';
import { ArbMonitor } from '@/components/strategy/ArbMonitor';
import { AccountTracks } from '@/components/strategy/AccountTracks';
import { StrategyCopilot } from '@/components/strategy/StrategyCopilot';
import { useVenueQuotes } from '@/hooks/useVenueQuotes';

export default function Home() {
  const { data, isLoading, error, refresh } = useVenueQuotes();

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0e17]">
      <TrialBanner />
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 lg:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <TrialBrief />
          <div id="swap">
            <SwapPanel />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ArbMonitor data={data} isLoading={isLoading} error={error} refresh={refresh} />
          <StrategyCopilot
            opportunities={data?.arb || []}
            venueSummary={
              data?.polymarket && data.kalshi
                ? `${data.polymarket.slug} vs ${data.kalshi.ticker}`
                : 'Polymarket + Kalshi 15m BTC'
            }
          />
        </div>

        <div className="mt-6">
          <AccountTracks />
        </div>
      </main>

      <Footer />
    </div>
  );
}
