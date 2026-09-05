import { useCallback, useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react';
import { homeTestimonialsHeading } from '../../data/home';
import { homeTestimonials } from '../../data/homeTestimonials';

/** A continuous three-set rail: the outer copies make every loop seamless. */
export default function HomeTestimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const set = marquee?.querySelector<HTMLElement>('.home-testimonials-set');
    if (!marquee || !set) return;

    let previousWidth = 0;
    const centreOnMiddleSet = () => {
      const width = set.getBoundingClientRect().width;
      if (width <= 0) return;
      marquee.scrollLeft = previousWidth === 0 ? width : marquee.scrollLeft + width - previousWidth;
      previousWidth = width;
    };

    centreOnMiddleSet();
    const observer = new ResizeObserver(centreOnMiddleSet);
    observer.observe(set);
    return () => observer.disconnect();
  }, []);

  const normalisePosition = useCallback(() => {
    const marquee = marqueeRef.current;
    const set = marquee?.querySelector<HTMLElement>('.home-testimonials-set');
    const width = set?.getBoundingClientRect().width ?? 0;
    if (!marquee || width <= 0) return;

    let nextPosition = marquee.scrollLeft;
    while (nextPosition < width * 0.5) nextPosition += width;
    while (nextPosition > width * 1.5) nextPosition -= width;
    if (Math.abs(nextPosition - marquee.scrollLeft) > 0.5) marquee.scrollLeft = nextPosition;
  }, []);

  const handleTouchEnd = useCallback((event: ReactTouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) return;
    normalisePosition();
    setIsPaused(false);
  }, [normalisePosition]);

  const handleTouchCancel = useCallback(() => {
    normalisePosition();
    setIsPaused(false);
  }, [normalisePosition]);

  return (
    <section className="relative z-10 overflow-hidden bg-charcoal bg-[radial-gradient(circle_at_12%_18%,rgba(243,240,230,0.035),transparent_26rem)] px-[9vw] py-24 max-sm:py-16" id="testimonials">
      <header className="anim-section mb-11">
        <div className="mb-4 flex items-center gap-4">
          <span className="h-px w-8 bg-beige/40" aria-hidden="true" />
          <span className="micro-label text-white/50">{homeTestimonialsHeading.label}</span>
        </div>
        <h2 className="max-w-[18ch] text-balance font-serif text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.08] tracking-[-0.02em] text-white">{homeTestimonialsHeading.titleLead} <span className="text-beige">{homeTestimonialsHeading.titleAccent}</span></h2>
      </header>

      <div className="home-testimonials-marquee -ml-[15vw] w-[calc(100%+9vw)]" ref={marqueeRef} onTouchStart={() => setIsPaused(true)} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchCancel}>
        <div className={`home-testimonials-track ml-[6vw] flex w-max py-3.5 sm:ml-[9vw]${isPaused ? ' is-paused' : ''}`} id="testiTrack">
          {[0, 1, 2].map((copy) => (
            <div className="home-testimonials-set flex w-max shrink-0" key={copy} aria-hidden={copy === 1 ? undefined : 'true'}>
              {homeTestimonials.map((testimonial, index) => (
                <article className="group relative mr-[clamp(0.7rem,2vw,1.25rem)] flex w-[min(82vw,21rem)] shrink-0 flex-col border border-white/[0.09] bg-[linear-gradient(158deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] px-5 pb-5 pt-5 transition-[transform,border-color,background] duration-500 ease-lux hoverable:-translate-y-0.5 hoverable:border-beige/30 hoverable:bg-[linear-gradient(158deg,rgba(255,255,255,0.075),rgba(255,255,255,0.02))] sm:w-[clamp(196px,56vw,360px)] sm:px-[clamp(0.9rem,2.6vw,1.6rem)] sm:pb-[clamp(0.85rem,2.3vw,1.5rem)] sm:pt-[clamp(1.05rem,3.1vw,2rem)]" key={`${copy}-${index}`}>
                  <span className="pointer-events-none absolute inset-x-0 -top-px h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-beige to-transparent transition-transform duration-[700ms] ease-lux group-hoverable:scale-x-100" aria-hidden="true" />
                  <span className="mb-[clamp(0.4rem,1.5vw,0.75rem)] select-none font-serif text-[clamp(1.9rem,5.6vw,3.25rem)] leading-[0.55] text-beige/25" aria-hidden="true">&ldquo;</span>
                  <p className="mb-[clamp(0.9rem,2.6vw,1.5rem)] flex-1 font-serif text-[0.925rem] leading-[1.52] text-white/80 sm:text-[clamp(1rem,0.94rem+0.25vw,1.15rem)] sm:leading-[1.48]">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex h-[clamp(1.6rem,4.6vw,2rem)] w-[clamp(1.6rem,4.6vw,2rem)] shrink-0 items-center justify-center rounded-full border border-beige/20 bg-beige/[0.08] text-[clamp(0.62rem,1.7vw,0.75rem)] text-beige transition-[border-color,background] duration-500 group-hoverable:border-beige/50 group-hoverable:bg-beige/[0.14]" aria-hidden="true">{testimonial.name.charAt(0)}</span>
                    <div>
                      <p className="text-[0.8rem] text-white sm:text-[clamp(0.75rem,0.72rem+0.14vw,0.85rem)]">{testimonial.name}</p>
                      <p className="mt-0.5 text-[0.6875rem] text-white/40 sm:text-[clamp(0.62rem,1.7vw,0.75rem)]">{testimonial.role} &middot; {testimonial.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/30">
        <span className="home-testimonials-pointer-hint">{homeTestimonialsHeading.hintPointer}</span>
        <span className="home-testimonials-touch-hint">{homeTestimonialsHeading.hintTouch}</span>
      </p>
    </section>
  );
}