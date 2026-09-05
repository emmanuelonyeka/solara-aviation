import { useEffect, useRef } from 'react';

interface StepProgressProps {
  steps: readonly string[];
  current: number;
  onSelect: (index: number) => void;
}

/** A swipeable mobile rail that keeps the active step comfortably in view. */
export default function StepProgress({ steps, current, onSelect }: StepProgressProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previousStepRef = useRef(current);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const alignCurrentStep = () => {
      if (window.matchMedia('(min-width: 640px)').matches) {
        scroller.scrollLeft = 0;
        previousStepRef.current = current;
        return;
      }

      const target = stepRefs.current[current];
      const last = stepRefs.current[steps.length - 1];
      if (!target || !last) return;

      const movingForward = current > previousStepRef.current;
      const scrollerBounds = scroller.getBoundingClientRect();
      const lastBounds = last.getBoundingClientRect();
      const lastFullyVisible = lastBounds.left >= scrollerBounds.left && lastBounds.right <= scrollerBounds.right + 1;
      previousStepRef.current = current;
      if (movingForward && lastFullyVisible) return;

      const maximum = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      const preferred = target.offsetLeft - scroller.clientWidth + target.offsetWidth * 2;
      const left = Math.min(maximum, Math.max(0, preferred));
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scroller.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    const scheduleAlignment = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(alignCurrentStep);
    };

    scheduleAlignment();
    window.addEventListener('resize', scheduleAlignment);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', scheduleAlignment);
    };
  }, [current, steps.length]);

  return (
    <nav aria-label="Quote progress" className="border-y border-white/[0.09] bg-white/[0.015] py-[clamp(1rem,2.5vw,1.5rem)]">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Step {current + 1} of {steps.length}: {steps[current]}</p>

      <div className="mb-[clamp(1rem,2vw,1.35rem)] flex items-center justify-between gap-4 px-[clamp(0.85rem,3.5vw,1.25rem)]">
        <p className="text-micro font-sans uppercase text-beige">Flight request</p>
        <p className="font-sans text-[0.625rem] tabular-nums text-white/35 sm:text-[0.6875rem]">Step {String(current + 1).padStart(2, '0')} of {String(steps.length).padStart(2, '0')}</p>
      </div>

      <div ref={scrollerRef} data-lenis-prevent className="relative overflow-x-auto overscroll-x-contain px-[clamp(0.85rem,3.5vw,1.25rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible">
        <div className="w-max min-w-full">
          <div className="flex">
            {steps.map((label, index) => {
              const done = index < current;
              const active = index === current;

              return (
                <button
                  ref={(element) => { stepRefs.current[index] = element; }}
                  key={label}
                  type="button"
                  disabled={index > current}
                  onClick={() => onSelect(index)}
                  aria-current={active ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${label}${active ? ', current step' : done ? ', completed' : ''}`}
                  className="group flex w-[clamp(6.75rem,30vw,7.5rem)] shrink-0 flex-col items-start gap-2 pb-[clamp(0.85rem,2vw,1.15rem)] pr-4 text-left transition-opacity duration-400 ease-lux active:opacity-60 disabled:cursor-default disabled:opacity-30 sm:w-auto sm:flex-1 sm:pr-2"
                >
                  <span className={`grid h-7 w-7 place-items-center border font-sans text-[0.625rem] tabular-nums transition-[background-color,border-color,color] duration-500 ease-lux ${active ? 'border-beige bg-beige text-charcoal' : done ? 'border-beige/45 text-beige/75 group-hoverable:border-beige/75' : 'border-white/10 text-white/25'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className={`whitespace-nowrap font-sans text-[0.625rem] uppercase tracking-[0.1em] transition-colors duration-500 ease-lux sm:text-[clamp(0.625rem,0.585rem+0.183vw,0.7rem)] ${active ? 'text-white' : done ? 'text-white/50 group-hoverable:text-white' : 'text-white/20'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative h-px w-full overflow-hidden bg-white/[0.09]">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 bg-beige transition-transform duration-900 ease-lux" style={{ width: `${100 / steps.length}%`, transform: `translateX(${current * 100}%)` }} />
          </div>
        </div>
      </div>
    </nav>
  );
}