import Reveal from '../shared/Reveal';

interface CatalogFilterProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  counts: Record<string, number>;
  controls: string;
  onChange: (value: T) => void;
  resultLabel: (count: number) => string;
}

/**
 * Shared filter bar for collection pages. The visible result count doubles as
 * a polite live region, so filtering is equally clear without looking at the
 * grid. Buttons retain a 44px target even though the typography stays quiet.
 */
export default function CatalogFilter<T extends string>({
  label,
  options,
  value,
  counts,
  controls,
  onChange,
  resultLabel,
}: CatalogFilterProps<T>) {
  const resultCount = counts[value] ?? 0;

  return (
    <Reveal
      from="fade"
      className="mb-stack border-y border-white/[0.09] py-[clamp(1rem,2vw,1.4rem)]"
    >
      <div className="flex flex-col gap-block lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-micro font-sans uppercase text-white/35">{label}</p>
          <div
            role="group"
            aria-label={label}
            className="mt-2 flex flex-wrap gap-x-[clamp(1rem,2.5vw,2rem)] gap-y-1"
          >
            {options.map((option) => {
              const isActive = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(option)}
                  aria-pressed={isActive}
                  aria-controls={controls}
                  className={`inline-flex min-h-11 items-center gap-2 border-b text-micro font-sans uppercase transition-[border-color,color,transform] duration-400 active:scale-[0.97] ${
                    isActive
                      ? 'border-beige text-beige'
                      : 'border-transparent text-white/45 hoverable:text-white'
                  }`}
                >
                  {option}
                  <span className="tabular-nums text-[0.85em] opacity-60">
                    {counts[option] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex flex-none items-baseline gap-2 font-sans text-white/40"
        >
          <span className="text-micro uppercase">Showing</span>
          <span className="font-serif text-title tabular-nums text-white">{resultCount}</span>
          <span className="text-micro uppercase">{resultLabel(resultCount)}</span>
        </p>
      </div>
    </Reveal>
  );
}