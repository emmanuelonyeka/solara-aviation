import { Cookie, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'solara-cookie-consent';
const CONSENT_EVENT = 'solara:consent-change';
const APPEAR_DELAY = 1800;
const EXIT_DURATION = 450;

type ConsentChoice = 'accept' | 'decline';

function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'accept' || value === 'decline' ? value : null;
  } catch {
    return null;
  }
}

function publishConsent(choice: ConsentChoice) {
  document.documentElement.dataset.cookieConsent = choice;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // The in-memory event still makes the choice available when storage is blocked.
  }

  publishConsent(choice);
}

/**
 * Non-modal consent notice. It remembers the choice when storage is available
 * and publishes a frontend event that a future analytics integration can use.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const storedChoice = readConsent();

    if (storedChoice) {
      publishConsent(storedChoice);
      return;
    }

    const appearTimer = window.setTimeout(() => setShow(true), APPEAR_DELAY);

    return () => window.clearTimeout(appearTimer);
  }, []);

  useEffect(() => {
    if (!show) return;

    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, [show]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    };
  }, []);

  const choose = (choice: ConsentChoice) => {
    if (leaving) return;

    saveConsent(choice);
    setLeaving(true);

    exitTimerRef.current = window.setTimeout(() => {
      setShow(false);
      exitTimerRef.current = null;
    }, EXIT_DURATION);
  };

  if (!show) return null;

  const visible = entered && !leaving;

  return (
    <aside
      data-cookie-consent
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-[500] transition-[transform,opacity] duration-500 ease-lux md:left-auto md:right-6 md:w-full md:max-w-[26rem] ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <div className="relative overflow-hidden border border-white/12 bg-charcoal p-[clamp(1.25rem,4vw,1.5rem)] shadow-2xl shadow-black/60">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-beige/40 to-transparent" />

        <div className="mb-flow flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center border border-beige/20">
              <Cookie size={16} className="text-beige" aria-hidden="true" />
            </div>
            <div>
              <h2 id="cookie-consent-title" className="font-serif text-title text-white">Your privacy</h2>
              <p className="mt-0.5 font-sans text-micro text-white/40">Your choice stays yours</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => choose('decline')}
            aria-label="Decline optional cookies and close"
            className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center text-white/40 transition-opacity duration-400 active:opacity-60 hoverable:text-white"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <p id="cookie-consent-description" className="mb-block font-sans text-body text-white/60">
          Essential storage remembers your preferences. Optional analytics, when configured by the
          site owner, only runs with consent. Read the{' '}
          <Link to="/privacy" className="text-beige/80 underline underline-offset-4 transition-colors duration-400 hoverable:text-beige">
            privacy policy
          </Link>
          .
        </p>

        <div className="flex gap-3">
          <button type="button" onClick={() => choose('accept')} disabled={leaving} className="btn-beige-filled flex-1 cursor-pointer text-xs !py-2.5 disabled:cursor-wait disabled:opacity-60">
            Accept optional
          </button>
          <button
            type="button"
            onClick={() => choose('decline')}
            disabled={leaving}
            className="flex-1 cursor-pointer border border-white/15 px-4 py-2.5 font-sans text-xs text-white/60 transition-[border-color,color,transform] duration-300 active:scale-[0.97] disabled:cursor-wait disabled:opacity-60 hoverable:border-white/30 hoverable:text-white"
          >
            Essential only
          </button>
        </div>
      </div>
    </aside>
  );
}