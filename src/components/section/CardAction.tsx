import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface CardActionProps {
  label: string;
  /** `down` for actions that move you within the page, `go` for navigation. */
  direction?: 'go' | 'down';
  className?: string;
}

/**
 * The line that tells a reader a card opens something.
 *
 * An arrow rather than a rule: a hairline is decoration and reads as one, so a
 * card carrying it can be scrolled past without anyone realising it is
 * interactive. Sits inside a `group`, and never relies on hover alone — on a
 * touch device the arrow is the only signal there is.
 */
export default function CardAction({ label, direction = 'go', className = '' }: CardActionProps) {
  const Icon = direction === 'down' ? ArrowDown : ArrowUpRight;

  return (
    <span
      className={`inline-flex items-center gap-2 text-micro font-sans uppercase text-beige transition-colors duration-400 group-hoverable:text-white ${className}`}
    >
      {label}
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center border border-beige/40 transition-all duration-400 ease-lux group-hoverable:border-beige group-hoverable:bg-beige group-hoverable:text-charcoal"
      >
        <Icon size={12} strokeWidth={1.75} />
      </span>
    </span>
  );
}
