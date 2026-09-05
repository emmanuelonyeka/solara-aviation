import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** direction the element travels FROM */
  from?: Direction;
  delay?: number;
  /** distance in px */
  distance?: number;
  /** stagger immediate children instead of the wrapper */
  stagger?: boolean;
  once?: boolean;
  /** Play on mount instead of on scroll. Use for anything above the fold. */
  immediate?: boolean;
}

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case 'up': return { y: d };
    case 'down': return { y: -d };
    case 'left': return { x: d };
    case 'right': return { x: -d };
    default: return {};
  }
};

export default function Reveal({
  children,
  className = '',
  from = 'up',
  delay = 0,
  distance = 40,
  stagger = false,
  once = true,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const d = prefersReduced ? Math.min(distance, 12) : distance;
    const targets = stagger ? Array.from(el.children) : el;

    const anim = gsap.fromTo(
      targets,
      { opacity: 0, ...offset(prefersReduced ? 'fade' : from, d) },
      {
        opacity: 1, x: 0, y: 0,
        duration: prefersReduced ? 0.4 : 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start: 'top 86%',
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [from, delay, distance, stagger, once, immediate]);

  return (
    <div ref={ref} className={className} style={{ opacity: stagger ? 1 : 0 }}>
      {children}
    </div>
  );
}
