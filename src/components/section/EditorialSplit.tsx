import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import Reveal from '../shared/Reveal';
import TextReveal from './TextReveal';

interface EditorialSplitProps {
  index: string;
  eyebrow?: string;
  /** One entry per visual line. */
  title: string[];
  accent?: number[];
  body: ReactNode;
  /** Short supporting facts. Four at most, or it stops being a list and becomes a paragraph. */
  points?: string[];
  image: string;
  imageAlt: string;
  cta?: { label: string; to: string };
  /** Places the image on the left. Alternate down the page. */
  reverse?: boolean;
}

/**
 * Image and copy in an asymmetric pair, with the image running off the
 * outer edge of the viewport.
 *
 * This is the workhorse that replaces card grids. Alternating `reverse`
 * down a page gives it a rhythm no grid can, and the edge bleed is what
 * separates an editorial layout from a boxed one.
 */
export default function EditorialSplit({
  index,
  eyebrow,
  title,
  accent = [],
  body,
  points,
  image,
  imageAlt,
  cta,
  reverse = false,
}: EditorialSplitProps) {
  return (
    <div className="grid items-center gap-y-stack lg:grid-cols-12 lg:gap-x-layout">
      <Reveal
        from="fade"
        className={[
          'relative overflow-hidden lg:col-span-7',
          reverse
            ? 'lg:order-1 ml-[calc(var(--gutter)*-1)]'
            : 'lg:order-2 mr-[calc(var(--gutter)*-1)]',
        ].join(' ')}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-1200 ease-lux lg:aspect-[16/11] hoverable:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent" />
      </Reveal>

      <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <Reveal from="fade" className="mb-block flex items-center gap-4">
          <span className="text-micro font-sans tabular-nums text-beige/70">{index}</span>
          <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-white/25" aria-hidden="true" />
          {eyebrow && <span className="text-micro font-sans uppercase text-white/50">{eyebrow}</span>}
        </Reveal>

        <TextReveal lines={title} accent={accent} as="h3" className="text-display" />

        <Reveal from="up" distance={22} delay={0.12}>
          <div className="mt-flow max-w-measure text-body font-sans text-white/60">
            {body}
          </div>
        </Reveal>

        {points && points.length > 0 && (
          <Reveal from="up" distance={20} delay={0.2} stagger className="mt-block space-y-flow">
            {points.map((p) => (
              <div key={p} className="flex items-baseline gap-3">
                <span className="mt-[0.45em] h-px w-3 flex-none bg-beige/60" aria-hidden="true" />
                <span className="text-body font-sans text-white/55">{p}</span>
              </div>
            ))}
          </Reveal>
        )}

        {cta && (
          <Reveal from="up" distance={18} delay={0.28} className="mt-block">
            <Link to={cta.to} className="btn-beige-outline">
              {cta.label}
            </Link>
          </Reveal>
        )}
      </div>
    </div>
  );
}