import type { MouseEvent } from 'react';

export default function SkipLink() {
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById('main');
    if (!main) return;

    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
    history.replaceState(null, '', '#main');
  };

  return (
    <a
      data-skip-link
      href="#main"
      onClick={skipToContent}
      className="fixed left-4 top-4 z-[11000] flex min-h-11 -translate-y-24 items-center bg-beige px-5 py-3 font-sans text-body font-medium text-charcoal shadow-2xl transition-transform duration-300 ease-lux focus-visible:translate-y-0"
    >
      Skip to main content
    </a>
  );
}