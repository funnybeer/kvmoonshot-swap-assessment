export type AiProvider = 'openai' | 'anthropic';

export type StrategyBriefRequest = {
  provider: AiProvider;
  opportunities: { strategy: string; margin: number; totalCost: number }[];
  venueSummary: string;
};

export function generateDemoBrief(req: StrategyBriefRequest): string {
  const lines = req.opportunities.map(
    (o) =>
      `• ${o.strategy}: total cost ${o.totalCost.toFixed(3)}, margin ${o.margin.toFixed(3)}${o.margin > 0.02 ? ' — actionable' : ''}`,
  );
  return [
    `KVMoonShot Trial SDK — ${req.venueSummary}`,
    '',
    ...(lines.length ? lines : ['• No live checks supplied; connect venue snapshot first.']),
    '',
    'Add OPENAI_API_KEY or ANTHROPIC_API_KEY in .env.local for LLM-generated desk notes.',
  ].join('\n');
}

export type StrategyBriefResult = {
  brief: string;
  source: 'openai' | 'anthropic' | 'demo';
};

export async function generateStrategyBrief(req: StrategyBriefRequest): Promise<StrategyBriefResult> {
  const provider = req.provider;
  if (provider === 'openai') {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return { brief: generateDemoBrief(req), source: 'demo' };
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are KVMoonShot strategy copilot. Summarize arb margins in 3 bullet points for a prop desk.',
          },
          { role: 'user', content: buildPrompt(req) },
        ],
        max_tokens: 400,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { brief: json.choices?.[0]?.message?.content?.trim() || '', source: 'openai' };
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { brief: generateDemoBrief(req), source: 'demo' };
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022',
      max_tokens: 400,
      system: 'You are KVMoonShot strategy copilot. Summarize cross-venue arb in 3 concise bullets.',
      messages: [{ role: 'user', content: buildPrompt(req) }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const json = (await res.json()) as { content?: { text?: string }[] };
  return { brief: json.content?.[0]?.text?.trim() || '', source: 'anthropic' };
}

function buildPrompt(req: StrategyBriefRequest): string {
  return `Venues: ${req.venueSummary}\nChecks: ${JSON.stringify(req.opportunities)}`;
}
