import { getToken } from '@/lib/tokens';

interface TokenIconProps {
  symbol: string;
  size?: number;
}

export function TokenIcon({ symbol, size = 32 }: TokenIconProps) {
  const token = getToken(symbol);
  const color = token?.color ?? '#71717a';

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.32,
      }}
    >
      {symbol.slice(0, 1)}
    </div>
  );
}
