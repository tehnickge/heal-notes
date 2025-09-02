import { breakpoints } from '@/style';
import { useState, useEffect, useRef } from 'react';


type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function useBreakpoint(): Breakpoint {
  const isClient = typeof window !== 'undefined';
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    isClient ? getBreakpoint(window.innerWidth) : 'xl' // или любое значение по умолчанию
  );

  const throttleTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      if (throttleTimeout.current !== null) {
        return;
      }

      throttleTimeout.current = window.setTimeout(() => {
        setBreakpoint(getBreakpoint(window.innerWidth));
        throttleTimeout.current = null;
      }, 200);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return breakpoint;
}

function getBreakpoint(width: number): Breakpoint {
  if (width < breakpoints.xs) return 'xs';
  if (width < breakpoints.sm) return 'sm';
  if (width < breakpoints.md) return 'md';
  if (width < breakpoints.lg) return 'lg';
  return 'xl';
}
