import { useEffect, useState } from 'react';

export function useCountdown(initialSeconds: number = 0) {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const start = (seconds: number) => {
    setTimer(seconds);
  };

  const reset = () => {
    setTimer(0);
  };

  return { timer, start, reset };
}
