import { Link } from 'react-router-dom';
import Reveal from '../shared/Reveal';
import TextReveal from './TextReveal';
import { cta as defaultCta } from '../../config/site';

interface CTABandProps {
  eyebrow?: string;
  /** One entry per visual line. */
  title: string[];
  accent?: number[];
  lead?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  image?: string;
}

/**
 * The closing invitation. Every page ends on one, so a reader always has
 * somewhere to go rather than running out of page.
 *
 * Defaults come from config/site.ts, so changing the site-wide call to
 * action is a one-line edit.
 */
export default function CTABand({
  eyebrow = 'Next step',
  title,
  accent = [],
  lead,
  primary = defaultCta.primary,
  secondary = defaultCta.secondary,
  image = '/images/closing_island_aerial.jpg',
}: CTABandProps) {
  return (
    <section className="relative overflow-hidden px-gutter py-[clamp(5rem,10vw,10rem)]">
      <div className="absolute inset-0">
        <img src={image} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
        {/* Two layers: a flat wash for contrast, and a vertical gradient that
            darkens top and bottom so the copy never sits on a bright band. */}
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/35 to-charcoal" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-prose flex-col items-center text-center">
        <Reveal from="fade" className="mb-block flex items-center gap-4">
          <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-beige/60" aria-hidden="true" />
          <span className="text-micro font-sans uppercase text-beige">{eyebrow}</span>
          <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-beige/60" aria-hidden="true" />
        </Reveal>

        <TextReveal lines={title} accent={accent} className="text-display" />

        {lead && (
          <Reveal from="up" distance={22} delay={0.15}>
            <p className="mt-block max-w-measure text-lead font-sans text-white/60">{lead}</p>
          </Reveal>
        )}

        <Reveal
          from="up"
          distance={20}
          delay={0.25}
          /* Stacked below 568px with a wider gap, side by side above it. A
             column rather than flex-wrap so the break point is exact and the
             spacing when stacked can differ from the spacing when inline. */
          className="mt-10 flex flex-col items-center gap-[clamp(1.45rem,0.79rem+1.85vw,1.95rem)] min-[568px]:flex-row min-[568px]:justify-center min-[568px]:gap-[1.5rem]"
        >
          {/* Sized fluidly between 350px and 1700px. The overrides are needed
              because the base button rules load after Tailwind's utilities. */}
          <Link
            to={primary.to}
            className="btn-beige-filled !px-[clamp(18px,0.563vw+16.03px,25.6px)] !py-[clamp(9.5px,0.244vw+8.65px,12.8px)] !text-[clamp(0.875rem,0.86rem+0.07vw,0.9375rem)]"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              to={secondary.to}
              className="link-underline !text-[clamp(0.875rem,0.86rem+0.07vw,0.9375rem)]"
            >
              {secondary.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}