import { NextResponse } from 'next/server';
import { runSenpiSkill, type SenpiSkillRequest } from '@/lib/intelligence/senpi-skills';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SenpiSkillRequest>;
    const skill = body.skill || 'arb-digest';
    const context = body.context || 'Polymarket + Kalshi 15m BTC window';
    const result = await runSenpiSkill({ skill, context });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Senpi skill failed';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
