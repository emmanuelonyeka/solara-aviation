import { Component, type ErrorInfo, type ReactNode } from 'react';
import { site } from '../../config/site';

const CHUNK_ERROR_PATTERN = /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed/i;
const CHUNK_RECOVERY_KEY = 'solara-chunk-recovery';
const RECOVERY_RESET_DELAY = 5000;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function isChunkLoadError(error: Error): boolean {
  return CHUNK_ERROR_PATTERN.test(error.name) || CHUNK_ERROR_PATTERN.test(error.message);
}

function claimChunkRecovery(): boolean {
  try {
    if (window.sessionStorage.getItem(CHUNK_RECOVERY_KEY)) return false;
    window.sessionStorage.setItem(CHUNK_RECOVERY_KEY, 'attempted');
    return true;
  } catch {
    return false;
  }
}

function clearChunkRecovery() {
  try {
    window.sessionStorage.removeItem(CHUNK_RECOVERY_KEY);
  } catch {
    // Recovery still works manually when session storage is unavailable.
  }
}

function recoveryMessage(error: Error): string {
  if (!window.navigator.onLine) {
    return 'Your device appears to be offline. Reconnect to the internet, then refresh this page.';
  }

  if (isChunkLoadError(error)) {
    return 'A newer deployment may have replaced the page file your browser requested. Reload the latest version to continue.';
  }

  return 'The page encountered an unexpected interruption. Refresh it to try again, or return home and continue from there.';
}

/**
 * Last-resort protection for render and lazy-route failures.
 *
 * A stale deployment chunk receives one guarded automatic reload. The session
 * flag prevents a reload loop and clears only after the application remains
 * healthy long enough to prove that recovery succeeded.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };
  private recoveryTimer: number | null = null;

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidMount() {
    this.recoveryTimer = window.setTimeout(() => {
      clearChunkRecovery();
      this.recoveryTimer = null;
    }, RECOVERY_RESET_DELAY);
  }

  componentWillUnmount() {
    if (this.recoveryTimer !== null) window.clearTimeout(this.recoveryTimer);
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    document.title = `Something went wrong | ${site.name}`;

    console.error('[Solara] Unhandled render error', {
      error,
      componentStack: info.componentStack,
    });

    if (!isChunkLoadError(error)) return;

    if (this.recoveryTimer !== null) {
      window.clearTimeout(this.recoveryTimer);
      this.recoveryTimer = null;
    }

    if (claimChunkRecovery()) window.location.reload();
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const chunkFailure = isChunkLoadError(error);

    return (
      <main
        role="alert"
        aria-labelledby="fatal-error-title"
        aria-describedby="fatal-error-description"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal px-gutter py-section text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(243,240,230,0.09),transparent_34%),linear-gradient(145deg,#0B0C0F_0%,#121318_55%,#0B0C0F_100%)]"
        />

        <section className="relative mx-auto w-full max-w-prose">
          <div className="flex items-center gap-4">
            <span className="h-px w-[clamp(1.75rem,5vw,3.5rem)] bg-beige/60" aria-hidden="true" />
            <span className="text-micro font-sans uppercase text-beige">Service interruption</span>
          </div>

          <h1 id="fatal-error-title" className="mt-block max-w-[13ch] font-serif text-display text-white">
            This page could not be prepared
          </h1>

          <p id="fatal-error-description" className="mt-block max-w-measure font-sans text-lead text-white/60">
            {recoveryMessage(error)}
          </p>

          <div className="mt-stack flex flex-col items-start gap-block sm:flex-row sm:items-center">
            <button type="button" onClick={() => window.location.reload()} className="btn-beige-filled cursor-pointer">
              {chunkFailure ? 'Reload latest version' : 'Refresh page'}
            </button>

            <a href="/" className="link-underline font-sans text-body text-white/70">
              Return home
            </a>
          </div>

          <p className="mt-stack border-t border-white/10 pt-block font-sans text-body text-white/45">
            If the interruption continues, contact{' '}
            <a className="text-beige underline underline-offset-4" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>

          {import.meta.env.DEV && (
            <details className="mt-block border border-red-300/20 bg-red-300/[0.04] p-flow font-mono text-[0.75rem] leading-relaxed text-red-100/70">
              <summary className="cursor-pointer font-sans text-micro uppercase tracking-[0.12em]">
                Development details
              </summary>
              <pre className="mt-flow overflow-x-auto whitespace-pre-wrap">{error.message}</pre>
            </details>
          )}
        </section>
      </main>
    );
  }
}