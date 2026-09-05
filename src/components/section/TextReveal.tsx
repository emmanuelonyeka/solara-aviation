import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  /** One entry per visual line. Line breaks are deliberate, not automatic. */
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Lines matching these indices render in beige rather than white. */
  accent?: number[];
  delay?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/**
 * Display headings that rise out of a mask, one line after the next.
 *
 * Lines are passed in rather than measured, so the break points are a
 * design decision instead of an accident of container width.
 */
export default function TextReveal({
  lines,
  as: Tag = 'h2',
  className = '',
  accent = [],
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const linesKey = lines.join('\u0000');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelectorAll<HTMLElement>('[data-line-inner]');
    if (!inner.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The hidden state is applied here, not in the markup. If this effect
    // never runs the heading simply stays readable — a heading must never
    // be able to fail into invisibility.
    gsap.set(inner, prefersReduced ? { opacity: 0 } : { yPercent: 115 });

    const play = () =>
      gsap.to(inner, {
        yPercent: 0,
        opacity: 1,
        duration: prefersReduced ? 0.4 : 1.1,
        delay,
        ease: 'power3.out',
        stagger: 0.09,
      });

    if (immediate) {
      play();
      return () => gsap.killTweensOf(inner);
    }

    // IntersectionObserver rather than ScrollTrigger: it reports elements
    // that are already on screen the moment it starts observing, so a
    // reload that restores scroll position still reveals the heading.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(inner);
    };
  }, [delay, immediate, linesKey]);

  return (
    <Tag ref={ref} className={`font-serif ${className}`}>
      {lines.map((line, i) => (
        <span
          key={i}
          /* The mask needs a line box taller than the glyphs or it clips the
             ascenders and descenders. Leading is opened to 1.2 for that, then
             each line after the first is pulled back up so the heading still
             sets as tightly as the display scale intends. */
          className={`block overflow-hidden leading-[1.2] ${i > 0 ? '-mt-[0.2em]' : ''}`}
        >
          <span
            data-line-inner
            className={`block ${accent.includes(i) ? 'text-beige' : 'text-white'}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}