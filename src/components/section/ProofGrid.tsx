import Reveal from '../shared/Reveal';

export interface ProofItem {
  title: string;
  body: string;
  points?: readonly string[];
}

interface ProofGridProps {
  items: readonly ProofItem[];
  columns?: 2 | 3;
}

/**
 * Numbered evidence cards shared by service pages. The structure keeps long
 * copy aligned without making a non-interactive card look clickable.
 */
export default function ProofGrid({ items, columns = 3 }: ProofGridProps) {
  return (
    <div className={`grid gap-stack ${columns === 2 ? 'sm:grid-cols-2' : 'lg:grid-cols-3'}`}>
      {items.map((item, index) => (
        <Reveal key={item.title} from="up" distance={28} delay={(index % columns) * 0.08}>
          <article className="relative h-full overflow-hidden border border-white/[0.1] bg-white/[0.015] p-[clamp(1.35rem,3vw,2rem)]">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-beige/55 to-transparent"
            />
            <span className="text-micro font-sans tabular-nums text-beige/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-flow font-serif text-title text-white">{item.title}</h3>
            <p className="mt-block max-w-measure font-sans text-body text-white/55">{item.body}</p>

            {item.points && item.points.length > 0 && (
              <ul className="mt-block space-y-flow">
                {item.points.map((point) => (
                  <li key={point} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="mt-[0.45em] h-px w-3 flex-none bg-beige/60" />
                    <span className="font-sans text-body text-white/45">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}