/**
 * Senpi-style agent skills — optional HTTP bridge when SENPI_API_KEY is set.
 * Falls back to structured desk copy for the trial SDK.
 */
export type SenpiSkillRequest = {
  skill: 'arb-digest' | 'risk-check' | 'venue-routing';
  context: string;
};

export async function runSenpiSkill(req: SenpiSkillRequest): Promise<{ text: string; live: boolean }> {
  const key = process.env.SENPI_API_KEY;
  const base = process.env.SENPI_API_BASE || 'https://api.senpi.ai/v1';

  if (key) {
    const res = await fetch(`${base}/skills/${req.skill}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: req.context }),
      cache: 'no-store',
    });
    if (res.ok) {
      const json = (await res.json()) as { output?: string; result?: string };
      const text = json.output || json.result || '';
      if (text) return { text, live: true };
    }
  }

  const canned: Record<SenpiSkillRequest['skill'], string> = {
    'arb-digest':
      'Senpi skill (demo): prioritize Poly Down + Kalshi Yes when combined cost < 0.98; hedge residual delta on Binance perp.',
    'risk-check':
      'Senpi skill (demo): cap single-window notional at 2% NAV; pause if Kalshi spread > 4¢ or Poly book depth < $5k.',
    'venue-routing':
      'Senpi skill (demo): route settlement through KVMoonShot DEX module on Sepolia for treasury rebalance legs.',
  };

  return {
    text: `${canned[req.skill]}\n\nContext: ${req.context.slice(0, 500)}`,
    live: false,
  };
}
