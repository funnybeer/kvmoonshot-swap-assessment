import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** Which venue credentials are configured (flags only — never returns secrets). */
export async function GET() {
  return NextResponse.json({
    ts: new Date().toISOString(),
    venues: {
      polymarket: Boolean(process.env.POLYMARKET_PRIVATE_KEY || process.env.POLYMARKET_API_KEY),
      kalshi: Boolean(process.env.KALSHI_API_KEY || process.env.KALSHI_API_SECRET),
      binance: Boolean(process.env.BINANCE_API_KEY),
      kucoin: Boolean(process.env.KUCOIN_API_KEY),
      hyperliquid: Boolean(process.env.HYPERLIQUID_PRIVATE_KEY),
      nansen: Boolean(process.env.NANSEN_API_KEY),
      senpi: Boolean(process.env.SENPI_API_KEY),
    },
    ai: {
      openai: Boolean(process.env.OPENAI_API_KEY),
      anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    },
    chain: {
      walletConnect: Boolean(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID),
      rpc: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.sepolia.org',
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 11155111),
    },
  });
}
