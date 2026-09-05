import { useEffect, useState } from 'react';
import { site } from '../../config/site';

const FALLBACK_DELAY = 240;

/** Remains invisible for fast cached routes, then fades in only for a genuine wait. */
export default function RouteFallback() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let frame = 0;

    const timer = window.setTimeout(() => {
      setVisible(true);
      frame = window.requestAnimationFrame(() => setEntered(true));
    }, FALLBACK_DELAY);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Loading page"
      className={`flex min-h-[100svh] items-center justify-center bg-charcoal px-gutter transition-opacity duration-600 ease-lux ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex w-full max-w-[15rem] flex-col items-center" aria-hidden="true">
        <span className="text-micro font-sans uppercase text-white/40">Preparing your journey</span>
        <span className="mt-flow font-serif text-title tracking-[0.02em] text-beige">{site.shortName}</span>
        <span className="mt-flow h-px w-full overflow-hidden bg-white/10">
          <span className="block h-full w-full bg-beige animate-line-sweep" />
        </span>
      </div>
    </div>
  );
}