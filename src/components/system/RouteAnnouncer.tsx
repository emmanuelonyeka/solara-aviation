import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Moves keyboard focus into newly rendered route content and announces it. */
export default function RouteAnnouncer() {
  const location = useLocation();
  const firstRoute = useRef(true);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }

    let observer: MutationObserver | undefined;
    let timeout = 0;

    const focusAndAnnounce = () => {
      const main = document.getElementById('main');
      if (!main) return false;

      main.focus({ preventScroll: true });
      setAnnouncement(`Navigated to ${document.title}`);
      return true;
    };

    const frame = window.requestAnimationFrame(() => {
      if (focusAndAnnounce()) return;

      const root = document.getElementById('root');
      if (!root) return;

      observer = new MutationObserver(() => {
        if (focusAndAnnounce()) observer?.disconnect();
      });

      observer.observe(root, {
        childList: true,
        subtree: true,
      });

      timeout = window.setTimeout(() => observer?.disconnect(), 5000);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [location.key]);

  return (
    <span className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </span>
  );
}