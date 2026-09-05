/** Words a comfortable reader gets through in a minute of considered prose. */
const WORDS_PER_MINUTE = 225;

/**
 * Reading time derived from the text itself.
 *
 * Hardcoding it means the figure drifts the moment anyone edits a paragraph,
 * and a stated time that does not match the article is the kind of small
 * dishonesty a reader notices. Subheadings are counted — they are read too.
 */
export function readingTime(body: string[]): string {
  const words = body.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

export default readingTime;