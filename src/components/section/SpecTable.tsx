import type { ReactNode } from 'react';

export interface Spec {
  label: string;
  value: ReactNode;
}

interface SpecTableProps {
  specs: Spec[];
  /** Single column reads better inside a narrow card. */
  columns?: 1 | 2;
  /**
   * `prose` for sentence-length values — labels take a fixed column so every
   * description starts on the same line. `numeric` for short figures, which
   * read better ranged right against the row edge.
   */
  variant?: 'prose' | 'numeric';
  className?: string;
}

/**
 * Key figures as a rule-separated list rather than a bordered table.
 *
 * Values use tabular figures so numbers align down the column — the detail a
 * buyer comparing two aircraft will notice without naming.
 */
export default function SpecTable({
  specs,
  columns = 2,
  variant = 'prose',
  className = '',
}: SpecTableProps) {
  const isProse = variant === 'prose';

  return (
    <dl
      className={[
        'grid gap-x-[clamp(1.5rem,4vw,4rem)]',
        columns === 2 ? 'sm:grid-cols-2' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {specs.map((s) => (
        <div
          key={s.label}
          className={[
            'border-b border-white/[0.09] py-[clamp(0.7rem,1.6vw,1.05rem)]',
            isProse
              ? 'grid grid-cols-[clamp(6rem,24vw,10rem)_1fr] items-baseline gap-x-[clamp(0.75rem,2vw,1.5rem)]'
              : 'flex items-baseline justify-between gap-4',
          ].join(' ')}
        >
          <dt className="text-micro font-sans uppercase text-white/40">{s.label}</dt>
          <dd
            className={`font-sans tabular-nums text-white/80 text-[clamp(0.8rem,0.72rem+0.35vw,0.95rem)] ${
              isProse ? '' : 'text-right'
            }`}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}