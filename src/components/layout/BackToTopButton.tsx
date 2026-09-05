import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';

function shouldShowButton(pathname: string): boolean {
  if (pathname === '/') {
    const experience = document.getElementById('experience');
    return experience ? experience.getBoundingClientRect().top <= 1 : false;
  }

  return window.scrollY > Math.max(480, window.innerHeight * 0.65);
}

export default function BackToTopButton() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const nextVisible = shouldShowButton(pathname);
      setVisible(nextVisible);

      if (!nextVisible && document.activeElement === buttonRef.current) {
        buttonRef.current?.blur();
      }
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [pathname]);

  const scrollToTop = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = window.__lenis;

    if (lenis) lenis.scrollTo(0, prefersReducedMotion ? { immediate: true } : { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[90] flex h-11 w-11 cursor-pointer items-center justify-center border border-white/15 bg-charcoal/80 text-white/55 shadow-xl shadow-black/30 backdrop-blur-xl transition-[transform,opacity,border-color,color] duration-400 ease-lux active:opacity-60 hoverable:border-beige/45 hoverable:text-beige ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp size={15} aria-hidden="true" />
    </button>
  );
}