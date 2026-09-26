import { NextResponse } from 'next/server';
import { generateStrategyBrief, type AiProvider } from '@/lib/ai/providers';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      provider?: AiProvider;
      opportunities?: { strategy: string; margin: number; totalCost: number }[];
      venueSummary?: string;
    };
    const result = await generateStrategyBrief({
      provider: body.provider || (process.env.AI_PROVIDER as AiProvider) || 'openai',
      opportunities: body.opportunities || [],
      venueSummary: body.venueSummary || 'Polymarket + Kalshi 15m BTC',
    });
    return NextResponse.json({ ok: true, brief: result.brief, source: result.source });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI request failed';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
