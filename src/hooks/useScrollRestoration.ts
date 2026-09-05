import { useEffect, useLayoutEffect } from 'react';
import { rememberScroll, readSavedScroll } from '../lib/scrollMemory';

/** Give up after this long, however tall the page has become. */
const SETTLE_TIMEOUT = 2500;
/** Treat the position as held once it has stuck for this many frames. */
const STABLE_FRAMES = 8;

/**
 * Returns the reader to where they were after a reload, on every page.
 *
 * This asserts the position repeatedly across a short window rather than once,
 * because several things move it after a layout effect has run: the lazy route
 * chunk arrives and changes the document height, Lenis initialises in a passive
 * effect and takes over scrolling, and images settle. A single attempt races
 * all three and usually loses. The loop stops as soon as the position holds for
 * a few consecutive frames, so it is not a fixed delay.
 *
 * Any genuine input — wheel, touch, key — cancels it immediately, so the page
 * can never pull the reader away from something they have already started.
 */
export function useScrollRestoration(pathname: string) {
  useEffect(() => {
    const save = () => rememberScroll(pathname);
    const saveIfHidden = () => {
      if (document.visibilityState === 'hidden') save();
    };

    // No single event is reliable across browsers: desktop fires beforeunload,
    // mobile Safari usually only fires pagehide, visibilitychange covers being
    // backgrounded and then killed.
    window.addEventListener('beforeunload', save);
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', saveIfHidden);
    return () => {
      window.removeEventListener('beforeunload', save);
      window.removeEventListener('pagehide', save);
      document.removeEventListener('visibilitychange', saveIfHidden);
    };
  }, [pathname]);

  /* Hold the page back until it is in the right place.
     Runs before the first paint, because the document is not yet tall enough
     to scroll into position — without this the top of the page shows for a
     few frames and then jumps. The background colour set in index.html stays
     visible throughout. */
  useLayoutEffect(() => {
    if (readSavedScroll(window.location.pathname) <= 0) return;
    document.documentElement.style.setProperty('--restore-veil', '1');
  }, []);

  // Restoration is a page-load concern, not a route concern: this runs once for
  // the life of the app. Route changes are handled separately and start at top.
  useEffect(() => {
    const reveal = () => document.documentElement.style.removeProperty('--restore-veil');
    const target = readSavedScroll(window.location.pathname);
    if (target <= 0) {
      reveal();
      return;
    }

    let done = false;
    let frame = 0;
    let held = 0;
    const deadline = performance.now() + SETTLE_TIMEOUT;

    const cancelIfLanded = () => {
      if (held > 0) stop();
    };

    const stop = () => {
      if (done) return;
      done = true;
      reveal();
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', cancelIfLanded);
      window.removeEventListener('touchstart', cancelIfLanded);
      window.removeEventListener('keydown', cancelIfLanded);
    };

    const tick = () => {
      if (done) return;

      const reachable = document.documentElement.scrollHeight - window.innerHeight;
      const settled = Math.abs(window.scrollY - target) <= 2;

      if (settled) {
        // Only stop once it has stayed put — Lenis can still reset it a frame
        // or two after it first looks correct.
        held += 1;
        if (held >= STABLE_FRAMES) return stop();
      } else if (reachable >= target - 2) {
        held = 0;
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(target, { immediate: true });
        else window.scrollTo(0, target);
      }

      if (performance.now() > deadline) return stop();
      frame = requestAnimationFrame(tick);
    };

    /* Input is only honoured once the position has been reached. Until then
       the smooth-scroll library still holds an internal target of zero, so
       obeying a stray wheel event would scroll from the top of the page. */
    window.addEventListener('wheel', cancelIfLanded, { passive: true });
    window.addEventListener('touchstart', cancelIfLanded, { passive: true });
    window.addEventListener('keydown', cancelIfLanded);

    frame = requestAnimationFrame(tick);
    return stop;
  }, []);
}

export default useScrollRestoration;
