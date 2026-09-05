import { useEffect, useRef, useState } from 'react';
import { site } from '../../config/site';

interface SendingOverlayProps {
  active: boolean;
  /** Shown in sequence, one per equal share of the minimum hold. */
  statuses: string[];
}

function StatusSequence({
  statuses,
}: Pick<SendingOverlayProps, 'statuses'>) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (statuses.length < 2) return;

    const timer = window.setInterval(
      () =>
        setIndex((current) =>
          Math.min(current + 1, statuses.length - 1),
        ),
      620,
    );

    return () => window.clearInterval(timer);
  }, [statuses.length]);

  return (
    <>
      <span className="sr-only">
        {statuses[index] ?? 'Sending'}
      </span>

      {statuses.map((status, statusIndex) => (
        <span
          key={status}
          aria-hidden="true"
          className={`absolute whitespace-nowrap text-micro font-sans uppercase text-white/45 transition-all duration-500 ease-lux ${
            statusIndex === index
              ? 'translate-y-0 opacity-100'
              : 'translate-y-1 opacity-0'
          }`}
        >
          {status}
        </span>
      ))}
    </>
  );
}

/**
 * Shown while a form is being submitted, on any page.
 *
 * The hold is not decoration. Dispatch resolves immediately when the email
 * account is not configured, and a form that jumps from button to confirmation
 * in one frame reads as though nothing was submitted. Callers hold this open
 * for a minimum duration, and for longer if the real request takes longer.
 */
export default function SendingOverlay({
  active,
  statuses,
}: SendingOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousInert = new Map<HTMLElement, boolean>();

    const backgroundSelector =
      '#main > :not([data-sending-overlay]), header, footer, [data-skip-link], [data-cookie-consent]';

    const isolateOverlay = () => {
      document
        .querySelectorAll<HTMLElement>(backgroundSelector)
        .forEach((element) => {
          if (!previousInert.has(element)) {
            previousInert.set(element, element.inert);
          }

          element.inert = true;
        });
    };

    isolateOverlay();

    const observer = new MutationObserver(isolateOverlay);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const focusFrame = window.requestAnimationFrame(() => {
      overlay.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);

      previousInert.forEach((wasInert, element) => {
        element.inert = wasInert;
      });

      if (
        previousFocus &&
        document.contains(previousFocus)
      ) {
        previousFocus.focus();
      }
    };
  }, [active]);

  return (
    <div
      ref={overlayRef}
      data-sending-overlay
      tabIndex={-1}
      aria-hidden={!active}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-charcoal transition-opacity duration-700 ease-lux ${
        active
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex w-[clamp(13rem,60vw,22rem)] flex-col items-center px-gutter">
        <span className="font-serif text-beige animate-breathe text-[clamp(1.6rem,1.3rem+1.4vw,2.4rem)] tracking-[0.02em]">
          {site.shortName}
        </span>

        <span className="mt-block h-px w-full overflow-hidden bg-white/10">
          <span className="block h-full w-full bg-beige animate-line-sweep" />
        </span>

        <span className="relative mt-block flex h-6 items-center justify-center">
          {active && <StatusSequence statuses={statuses} />}
        </span>
      </div>
    </div>
  );
}