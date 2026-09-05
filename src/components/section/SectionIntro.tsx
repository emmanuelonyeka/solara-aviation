import type { ReactNode } from 'react';
import Reveal from '../shared/Reveal';
import TextReveal from './TextReveal';

interface SectionIntroProps {
  /** Two-digit index, e.g. "02". Renders as a quiet editorial marker. */
  index?: string;
  eyebrow?: string;
  /** One entry per visual line of the heading. */
  title: string[];
  /** Indices of title lines to render in beige. */
  accent?: number[];
  lead?: ReactNode;
  /** Sits under the lead — usually a link or button. */
  action?: ReactNode;
  align?: 'split' | 'center';
  className?: string;
}

/**
 * The heading block that opens a section.
 *
 * `split` places the heading and the supporting paragraph on opposite
 * sides of a twelve-column grid rather than stacking them centred, which
 * is what keeps the page reading as editorial rather than as a brochure.
 * Below `lg` it stacks.
 */
export default function SectionIntro({
  index,
  eyebrow,
  title,
  accent = [],
  lead,
  action,
  align = 'split',
  className = '',
}: SectionIntroProps) {
  const centred = align === 'center';

  return (
    <div
      className={[
        'mb-stack',
        centred ? 'flex flex-col items-center text-center' : 'lg:grid lg:grid-cols-12 lg:gap-x-layout',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={centred ? 'max-w-prose' : 'lg:col-span-7'}>
        {(index || eyebrow) && (
          <Reveal from="fade" className={`mb-block flex items-center gap-4 ${centred ? 'justify-center' : ''}`}>
            {index && (
              <span className="text-micro font-sans tabular-nums text-beige/70">{index}</span>
            )}
            <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-white/25" aria-hidden="true" />
            {eyebrow && (
              <span className="text-micro font-sans uppercase text-white/50">{eyebrow}</span>
            )}
          </Reveal>
        )}

        <TextReveal lines={title} accent={accent} className="text-display" />
      </div>

      {(lead || action) && (
        <div
          className={
            centred
              ? 'mt-block max-w-measure'
              : 'lg:col-span-5 lg:self-end mt-block lg:mt-0'
          }
        >
          {lead && (
            <Reveal from="up" distance={24} delay={0.15}>
              <p className="text-lead font-sans text-white/55 max-w-measure">{lead}</p>
            </Reveal>
          )}
          {action && (
            <Reveal from="up" distance={20} delay={0.25} className="mt-10">
              {action}
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
