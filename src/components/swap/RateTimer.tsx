'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface RateTimerProps {
  seconds?: number;
  onExpire?: () => void;
}

export function RateTimer({ seconds = 30, onExpire }: RateTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          onExpire?.();
          return seconds;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
      <Clock size={12} className="text-brand-500" />
      <span>
        Rate updates in{' '}
        <span className="font-mono font-medium text-zinc-400">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </span>
    </div>
  );
}
