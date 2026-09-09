import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import Reveal from '../shared/Reveal';
import { getImageFocalPoint } from '../../config/imageFocalPoints';

gsap.registerPlugin(ScrollTrigger);

export interface HeroMeta {
  label: string;
  value: string;
}

interface PageHeroProps {
  eyebrow: string;
  /** One entry per visual line. */
  title: string[];
  accent?: number[];
  lead?: string;
  image: string;
  imageAlt: string;
  /** Facts along the bottom edge — three or four, never more. */
  meta?: HeroMeta[];
}

/**
 * The opening frame of an inner page.
 *
 * Deliberately not a full viewport: it holds the top three quarters so
 * the first section is already breaking the bottom edge, which invites
 * the scroll instead of demanding it. The image drifts upward at a
 * fraction of scroll speed to separate it from the content plane.
 */
export default function PageHero({
  eyebrow,
  title,
  accent = [],
  lead,
  image,
  imageAlt,
  meta,
}: PageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.to('[data-hero-image]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={rootRef}
      /* Bottom-aligned by design. The minimum height is kept close to what
         the content actually occupies on a narrow screen, otherwise the block
         is pinned to the bottom of a tall box and leaves a dead band above it. */
      className="relative flex min-h-[clamp(25rem,62vh,44rem)] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          data-hero-image
          src={image}
          alt={imageAlt}
          style={{ objectPosition: getImageFocalPoint(image) }}
          /* Overhangs the frame by 15% at the top and 15% at the bottom, while
             the parallax only travels 13% of the image height. No edge can be
             exposed even if the tween is holding a stale value — which happens
             on navigation, because this effect runs before the scroll resets. */
          className="absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-frame px-gutter pb-[clamp(2.25rem,5vw,4.5rem)] pt-[clamp(8rem,6.67rem+6.1vw,12rem)]">
        <Reveal immediate from="fade" className="mb-[clamp(1rem,2vw,1.75rem)] flex items-center gap-4">
          <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-beige/60" aria-hidden="true" />
          <span className="text-micro font-sans uppercase text-beige">{eyebrow}</span>
        </Reveal>

        <TextReveal immediate lines={title} accent={accent} as="h1" className="text-display-xl max-w-[16ch]" />

        {lead && (
          <Reveal immediate from="up" distance={24} delay={0.25}>
            <p className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-measure font-sans text-lead text-white/60">
              {lead}
            </p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal
            immediate
            from="up"
            distance={20}
            delay={0.4}
            className="mt-[clamp(2rem,4vw,3.5rem)] flex flex-wrap gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-[clamp(1rem,2vw,1.5rem)] border-t border-white/[0.12] pt-[clamp(1.25rem,2.5vw,2rem)]"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <p className="text-micro font-sans uppercase text-white/40">{m.label}</p>
                <p className="mt-1.5 font-serif tabular-nums text-title text-white">
                  {m.value}
                </p>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </header>
  );
}
