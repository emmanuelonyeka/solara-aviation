import { useEffect } from 'react';

/**
 * Makes same-page anchor links glide instead of jumping.
 *
 * The browser's native smooth scrolling does not apply while Lenis is driving
 * the page, and `scroll-behavior: smooth` in CSS is ignored for the same
 * reason. This intercepts clicks on in-page links and hands the target to
 * Lenis, falling back to the native API when Lenis is not running.
 */
export function useAnchorScroll(headerOffset = 96) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      const href = anchor?.getAttribute('href');
      if (!anchor || !href || !href.startsWith('#') || href === '#') return;

      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;

      event.preventDefault();

      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY, {
          duration: 1.1,
          offset: -headerOffset,
        });
      } else {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - headerOffset,
          behavior: 'smooth',
        });
      }

      history.replaceState(null, '', href);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [headerOffset]);
}

export default useAnchorScroll;
