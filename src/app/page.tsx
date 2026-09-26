'use client';

import { SwapPanel } from '@/components/SwapPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TrialBanner } from '@/components/layout/TrialBanner';
import { TrialBrief } from '@/components/home/TrialBrief';
import { ArbMonitor } from '@/components/strategy/ArbMonitor';
import { AccountTracks } from '@/components/strategy/AccountTracks';
import { StrategyCopilot } from '@/components/strategy/StrategyCopilot';
import { CockpitShell } from '@/components/cockpit/CockpitShell';
import { CockpitPanel } from '@/components/cockpit/CockpitPanel';
import { useVenueQuotes } from '@/hooks/useVenueQuotes';

export default function Home() {
  const { data, isLoading, error, refresh } = useVenueQuotes();

  const venueSummary =
    data?.polymarket && data.kalshi
      ? `${data.polymarket.slug} vs ${data.kalshi.ticker}`
      : 'Polymarket + Kalshi 15m BTC';

  return (
    <div className="flex min-h-screen flex-col bg-[#06080f]">
      <TrialBanner />
      <Header />

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <CockpitShell
          sidebar={
            <>
              <StrategyCopilot opportunities={data?.arb || []} venueSummary={venueSummary} />
              <CockpitPanel title="DEX settlement">
                <SwapPanel />
              </CockpitPanel>
            </>
          }
        >
          <CockpitPanel title="Trial overview">
            <TrialBrief />
          </CockpitPanel>
          <ArbMonitor data={data} isLoading={isLoading} error={error} refresh={refresh} />
          <AccountTracks />
        </CockpitShell>
      </main>

      <Footer />
    </div>
  );
}
