import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import useAnchorScroll from '../../hooks/useAnchorScroll';

gsap.registerPlugin(ScrollTrigger);

export default function AppShell() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lenis drives smooth scrolling for the whole app and feeds
    // ScrollTrigger on every frame.
    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const readyTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    lenis.on('scroll', onScroll);
    onScroll();

    return () => {
      clearTimeout(readyTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  /* Navigating to a new route starts at the top. A reload does not —
     that first run is skipped so the restore below can put the reader
     back where they were. */
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(refreshTimer);
  }, [location.pathname]);

  /* Recording and restoring the reading position, for every page. */
  useScrollRestoration(location.pathname);

  /* Same-page links glide rather than jump. */
  useAnchorScroll();


  /* iOS only applies :active styles once the document has a touch listener
     attached. Without this the press feedback on every button is silently
     dead on iPhone and iPad. */
  useEffect(() => {
    const noop = () => {};
    document.addEventListener('touchstart', noop, { passive: true });
    return () => document.removeEventListener('touchstart', noop);
  }, []);
  return (
    <div ref={progressRef} className="scroll-progress" style={{ width: '100%', transform: 'scaleX(0)' }} />
  );
}
