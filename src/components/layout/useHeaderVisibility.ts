import { useEffect, useState } from 'react';

const TOP_OFFSET = 24;
const HIDE_OFFSET = 160;
const DIRECTION_DISTANCE = 10;

interface HeaderVisibility {
  scrolled: boolean;
  hidden: boolean;
}

/** Keeps the header present at the top, hides it during deliberate downward travel and restores it on upward travel. */
export default function useHeaderVisibility(forceVisible = false): HeaderVisibility {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let previousY = Math.max(0, window.scrollY);
    let direction = 0;
    let travelled = 0;

    const update = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      const nextDirection = delta === 0 ? direction : delta > 0 ? 1 : -1;

      if (nextDirection !== direction) {
        direction = nextDirection;
        travelled = 0;
      }

      travelled += Math.abs(delta);

      const nextScrolled = currentY > TOP_OFFSET;
      setScrolled(nextScrolled);

      if (forceVisible || prefersReducedMotion || !nextScrolled) {
        setHidden(false);
        travelled = 0;
      } else if (travelled >= DIRECTION_DISTANCE) {
        if (direction > 0 && currentY > HIDE_OFFSET) setHidden(true);
        if (direction < 0) setHidden(false);
        travelled = 0;
      }

      previousY = currentY;
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [forceVisible]);

  return { scrolled, hidden };
}