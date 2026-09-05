/**
 * Remembers where the reader was, so a reload puts them back.
 *
 * Keyed by pathname: navigating to another route and reloading there
 * must not inherit the previous page's offset.
 *
 * Written only when the page is being left or hidden — never on every
 * scroll frame, which would hammer sessionStorage for no benefit.
 */

const KEY = 'solara-scroll';

interface SavedScroll {
  path: string;
  y: number;
}

export function rememberScroll(path: string): void {
  try {
    const payload: SavedScroll = { path, y: Math.round(window.scrollY) };
    sessionStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // private browsing can refuse the write; losing the position is fine
  }
}

/** Offset saved for this exact path, or 0 if there isn't one. */
export function readSavedScroll(path: string): number {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return 0;
    const saved = JSON.parse(raw) as SavedScroll;
    return saved && saved.path === path && saved.y > 0 ? saved.y : 0;
  } catch {
    return 0;
  }
}