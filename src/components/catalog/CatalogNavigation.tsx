import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CatalogNavigationItem {
  to: string;
  label: string;
}

interface CatalogNavigationProps {
  ariaLabel: string;
  back: CatalogNavigationItem;
  previous: CatalogNavigationItem;
  next: CatalogNavigationItem;
}

/**
 * Previous, next, and index navigation shared by detail pages. Long aircraft
 * and destination names truncate safely on small screens instead of forcing
 * the two directional links beyond the viewport.
 */
export default function CatalogNavigation({
  ariaLabel,
  back,
  previous,
  next,
}: CatalogNavigationProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="grid gap-block sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center"
    >
      <Link
        to={back.to}
        className="btn-beige-outline justify-self-start uppercase !px-[clamp(0.9rem,1.6vw,1.35rem)] !py-[clamp(0.6rem,0.95vw,0.78rem)] !text-[clamp(0.62rem,0.58rem+0.12vw,0.7rem)] !tracking-[0.14em]"
      >
        {back.label}
      </Link>

      <div className="grid min-w-0 grid-cols-2 border-y border-white/[0.09] sm:w-full sm:max-w-[42rem] sm:justify-self-end">
        <Link
          to={previous.to}
          aria-label={`Previous: ${previous.label}`}
          className="group relative isolate min-w-0 overflow-hidden py-3 pr-[clamp(0.75rem,2vw,1.5rem)] transition-opacity duration-400 ease-lux active:opacity-70"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_left,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.025)_50%,transparent_100%)] opacity-0 transition-opacity duration-400 ease-lux group-hoverable:opacity-100" />
          <span className="block text-micro font-sans uppercase text-white/35">Previous</span>
          <span className="mt-1.5 flex min-w-0 items-center gap-2 font-serif text-title text-white/75 transition-colors duration-400 group-hoverable:text-beige">
            <ArrowLeft aria-hidden="true" className="h-4 w-4 flex-none" strokeWidth={1.5} />
            <span className="truncate">{previous.label}</span>
          </span>
        </Link>

        <Link
          to={next.to}
          aria-label={`Next: ${next.label}`}
          className="group relative isolate min-w-0 overflow-hidden border-l border-white/[0.09] py-3 pl-[clamp(0.75rem,2vw,1.5rem)] text-right transition-opacity duration-400 ease-lux active:opacity-70"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.025)_50%,transparent_100%)] opacity-0 transition-opacity duration-400 ease-lux group-hoverable:opacity-100" />
          <span className="block text-micro font-sans uppercase text-white/35">Next</span>
          <span className="mt-1.5 flex min-w-0 items-center justify-end gap-2 font-serif text-title text-white/75 transition-colors duration-400 group-hoverable:text-beige">
            <span className="truncate">{next.label}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 flex-none" strokeWidth={1.5} />
          </span>
        </Link>
      </div>
    </nav>
  );
}