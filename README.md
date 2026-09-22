# KVMoonShot Exchange

Official web interface for [KVMoonShot Chain](https://kvmoonshot.cc), a non-custodial cross-chain crypto exchange operated by **KVMoonShot Labs**.

This repository contains the Next.js frontend used in production and for engineering evaluations. The repo ships as a **starter branch** — `useSwapQuote` is stubbed and swap output shows `—` until you wire the hook.

## Quick start

```bash
cp .env.example .env.local
npm install    # requires Node >= 18.17
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Native WASM bindings

Production routing uses the private package **`@kvmoonshot/kvmswap-native`** (see `.npmrc`). After `npm install`, `config/platform-bindings.cjs` syncs the binding with your Node version; Next.js loads the same helper from `next.config.js` before `dev` / `build`. The assessment UI still uses **mock quotes** in `src/lib/swap-engine.ts` unless you wire WASM yourself.

## Stack

- **Next.js 14** · App Router · TypeScript
- **Tailwind CSS** · custom KVMoonShot design system
- **wagmi / viem** · wallet connectivity
- **vitest** · unit tests

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm test` | Run test suite |
| `npm run typecheck` | TypeScript validation |
| `npm run lint` | ESLint |

## Assessment

### Background

KVMoonShot Labs is building **KVMoonShot Chain**, a cross-chain DEX aggregator. This take-home mirrors the production codebase structure you'll work in if you join the team.

The marketing layout, token picker, and quote engine are provided. Your job is to wire the swap flow end-to-end.

### What's already done

- Next.js app shell, header/footer, landing sections
- `TokenSelect`, `SwapDetails`, `SwapConfirmModal`, `RateTimer`
- `getQuote()` in `src/lib/swap-engine.ts` (unit-tested)
- CI, ESLint, Prettier, TypeScript config

### Your tasks

#### 1. `src/hooks/useSwapQuote.ts` (primary)

Connect the form to `getQuote()`:

- Debounce input changes (~300ms)
- Loading and error states
- Return `{ quote, isLoading, error, refetch }`

The starter hook compiles but returns empty state — swap output stays `—` until you implement this.

#### 2. `src/components/SwapPanel.tsx`

Finish the swap form using your hook:

- Wallet **balance** display (mock `"12.4 ETH"` is fine until wallet SDK is wired)
- **Slippage** presets (0.1%, 0.5%, 1%) plus custom input in the settings panel
- **Review swap** → open `SwapConfirmModal` with live quote data
- Refresh quote when `RateTimer` expires (`refetch`)

#### 3. Tests — `src/__tests__/useSwapQuote.test.ts`

Replace the `it.todo(...)` stubs with real tests:

- Quote with slippage
- Validation (zero amount, same token)
- Error path when `getQuote()` throws

Run `npm test` before submitting.

### Scoring rubric

| Tier | Criteria |
|------|----------|
| **Pass** | Hook wired, modal flow works, tests pass, types clean |
| **Strong hire** | Polished UX, edge cases, clean abstractions |
| **No hire** | Hook still stubbed, no tests, type errors |

### FAQ

**Q: Can I use additional libraries?**  
A: Yes, but justify in `SOLUTION.md`. Prefer what's already in `package.json`.

**Q: The dev server shows a locale selector. Is i18n required?**  
A: No — scaffolding only. Focus on the swap flow.

**Q: Do I need a real wallet?**  
A: MetaMask on Sepolia is recommended; a mock balance string is acceptable for this exercise.

**Q: `npm run dev` works but I always see `—` for output. Is that a bug?**  
A: Expected until you implement `useSwapQuote`.
