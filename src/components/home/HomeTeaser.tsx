import { Link } from 'react-router-dom';

interface HomeTeaserProps {
  label: string;
  to: string;
  className?: string;
}

function TeaserArrow() {
  return (
    <svg className="h-3.5 w-3.5 transition-transform duration-400 ease-lux group-hoverable:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/** A quiet bridge between two full-screen homepage chapters. */
export default function HomeTeaser({ label, to, className = '' }: HomeTeaserProps) {
  return (
    <div className={`relative flex min-h-[clamp(5rem,8vw,7rem)] items-center justify-center border-y border-white/[0.065] bg-[linear-gradient(90deg,#0B0C0F,#101116_50%,#0B0C0F)] px-gutter py-8 ${className}`}>
      <Link to={to} className="group inline-flex items-center gap-2 text-[clamp(0.7rem,0.65rem+0.2vw,0.8rem)] font-medium uppercase tracking-[0.1em] text-beige transition-colors duration-200 hoverable:text-white active:opacity-[0.55]">
        {label}
        <TeaserArrow />
      </Link>
    </div>
  );
}