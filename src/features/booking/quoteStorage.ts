import { getEarliestQuoteDateInputValue, getMaxQuoteDateInputValue, QUOTE_STEPS, validateQuoteStep, type QuoteDraft } from './quoteDraft';

const QUOTE_PROGRESS_KEY = 'solara.quote-progress.v1';
const QUOTE_PROGRESS_TTL = 7 * 24 * 60 * 60 * 1000;

export interface QuoteProgress {
  draft: QuoteDraft;
  step: number;
  updatedAt: number;
}

function isQuoteDraft(value: unknown): value is QuoteDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as Record<string, unknown>;
  return typeof draft.from === 'string' && typeof draft.to === 'string' && (draft.tripType === 'one-way' || draft.tripType === 'return') && typeof draft.departDate === 'string' && typeof draft.returnDate === 'string' && Number.isInteger(draft.passengers) && Number(draft.passengers) >= 1 && Number(draft.passengers) <= 19 && typeof draft.aircraftId === 'string' && typeof draft.name === 'string' && typeof draft.email === 'string' && typeof draft.phone === 'string' && typeof draft.notes === 'string';
}

function safeStep(draft: QuoteDraft, requestedStep: number): number {
  const target = Math.min(Math.max(Math.trunc(requestedStep), 0), QUOTE_STEPS.length - 1);
  for (let step = 0; step < target; step += 1) {
    if (Object.keys(validateQuoteStep(step, draft)).length > 0) return step;
  }
  return target;
}

function sanitiseDates(draft: QuoteDraft): QuoteDraft {
  const earliest = getEarliestQuoteDateInputValue();
  const latest = getMaxQuoteDateInputValue();
  const next = { ...draft };

  if (next.departDate && (next.departDate < earliest || next.departDate > latest)) {
    next.departDate = '';
    next.returnDate = '';
  }

  if (next.returnDate && (!next.departDate || next.returnDate < next.departDate || next.returnDate > latest)) next.returnDate = '';
  return next;
}

export function loadQuoteProgress(): QuoteProgress | null {
  try {
    const raw = window.localStorage.getItem(QUOTE_PROGRESS_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<QuoteProgress>;

    if (!isQuoteDraft(stored.draft) || typeof stored.step !== 'number' || !Number.isInteger(stored.step) || typeof stored.updatedAt !== 'number' || !Number.isFinite(stored.updatedAt) || Date.now() - stored.updatedAt > QUOTE_PROGRESS_TTL) {
      window.localStorage.removeItem(QUOTE_PROGRESS_KEY);
      return null;
    }

    const draft = sanitiseDates(stored.draft);
    return { draft, step: safeStep(draft, stored.step), updatedAt: stored.updatedAt };
  } catch {
    return null;
  }
}

export function saveQuoteProgress(draft: QuoteDraft, step: number): void {
  try {
    const progress: QuoteProgress = { draft, step, updatedAt: Date.now() };
    window.localStorage.setItem(QUOTE_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    /* Storage can be unavailable in private browsing; the live form still works. */
  }
}

export function clearQuoteProgress(): void {
  try {
    window.localStorage.removeItem(QUOTE_PROGRESS_KEY);
  } catch {
    /* Nothing to clear when storage is unavailable. */
  }
}

export function hasMeaningfulQuoteProgress(draft: QuoteDraft): boolean {
  return Boolean(draft.from.trim() || draft.to.trim() || draft.departDate || draft.returnDate || draft.passengers !== 2 || draft.aircraftId || draft.name.trim() || draft.email.trim() || draft.phone.trim() || draft.notes.trim());
}