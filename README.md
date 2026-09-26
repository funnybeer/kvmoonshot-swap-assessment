# KVMoonShot Markets SDK — integration trial

Official **TypeScript starter** for [KVMoonShot Labs](https://kvmoonshot.cc) cross-venue trading infrastructure: Polymarket, Kalshi, CEX perps, DEX settlement, and optional **Nansen / Senpi** intelligence hooks.

This public repo is the **first engineer trial package** — clone, install, implement the assessment tasks, and submit a PR or zip per your recruiter.

## Quick start

```bash
cp .env.example .env.local
npm install    # requires Node >= 18.17
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Native performance module

Production routing uses the private package **`@kvmoonshot/kvmswap-native`** (see `.npmrc`). After `npm install`, `config/platform-bindings.cjs` syncs native bindings with your Node ABI; Next.js loads the same helper from `next.config.js`. The trial UI uses **mock quotes** until you wire live venue feeds.

## Stack

- **Next.js 14** · App Router · TypeScript
- **Markets SDK** layout under `src/lib/venues`, `src/lib/strategy`
- **wagmi / viem** · wallet module (DEX leg)
- **vitest** · unit tests

## Assessment

<a id="assessment"></a>

### Background

KVMoonShot operates strategies across **Polymarket** (Gamma + CLOB), **Kalshi** event contracts, centralized perps, and **KVMoonShot Chain** swaps. Internal reference logic for 15-minute crypto windows lives in our arb detector (Poly Down + Kalshi Yes / Poly Up + Kalshi No).

Your trial: connect the starter hooks to mock/real public APIs and pass CI.

### What's provided

- Venue constants (`src/lib/venues/constants.ts`) — Gamma, CLOB, Kalshi base URLs
- `evaluatePairCost()` + `mockScan()` in `src/lib/strategy/arb-scanner.ts`
- `mockSmartMoneyLabels()` Nansen-style stub in `src/lib/intelligence/nansen-stub.ts`
- Swap UI module (`SwapPanel`) for on-chain settlement exercises
- CI: typecheck, vitest, eslint (`npm install --ignore-scripts` in GitHub Actions only)

### Your tasks

#### 1. `src/hooks/useVenueQuotes.ts` (create)

- Fetch or mock top-of-book for a Polymarket 15m slug + Kalshi `KXBTC15M` series
- Expose `{ quotes, isLoading, error, refresh }`
- Call `evaluatePairCost()` when both legs update

#### 2. `src/components/strategy/ArbMonitor.tsx` (create)

- Display both arb strategies, total cost, margin, highlight when `isOpportunity`
- Refresh on an interval (15–30s)

#### 3. `src/hooks/useSwapQuote.ts` (existing stub)

- Wire swap form to `getQuote()` for the DEX leg (optional bonus)

#### 4. Tests

- Extend `src/__tests__/arb-scanner.test.ts` (provided) with edge cases
- Add at least one test for your hook logic

Run `npm test` before submitting.

### Scoring

| Tier | Criteria |
|------|----------|
| **Pass** | Arb monitor works with mock or live public APIs, tests pass |
| **Strong hire** | Clean abstractions, error handling, Senpi/Nansen env integration documented in `SOLUTION.md` |
| **No hire** | Empty hooks, failing CI |

### FAQ

**Q: Do I need API keys?**  
Public Polymarket Gamma/CLOB and Kalshi market endpoints work for read-only trials. Keys go in `.env.local` for trading features (not required).

**Q: What is `@kvmoonshot/kvmswap-native`?**  
Internal WASM/native merge for order books — installed automatically from `pkg.kvmoonshot.cc`.

**Q: Why is there a swap UI?**  
Treasury rebalancing leg for cross-venue strategies — same stack as production.

## Links

- Platform: [kvmoonshot.cc](https://kvmoonshot.cc)
- Venues: [Polymarket docs](https://docs.polymarket.com/) · [Kalshi docs](https://docs.kalshi.com/)
