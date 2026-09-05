import CountUp from '../shared/CountUp';
import Reveal from '../shared/Reveal';

export interface Figure {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** One short clarifying line. Omit rather than pad. */
  note?: string;
}

interface FigureStripProps {
  figures: Figure[];
  className?: string;
}

/**
 * Operating figures that count up as they arrive.
 *
 * Separated by space and two hairlines rather than boxes or dividers —
 * restraint reads as confidence, and it avoids the row-edge artefacts a
 * divided grid produces when it wraps.
 */
export default function FigureStrip({ figures, className = '' }: FigureStripProps) {
  return (
    <Reveal
      from="up"
      distance={28}
      className={`border-y border-white/[0.09] py-[clamp(1.5rem,3vw,2.25rem)] ${className}`}
    >
      <div className="grid grid-cols-2 gap-x-layout gap-y-block md:grid-cols-4">
        {figures.map((f) => (
          <div key={f.label}>
            <div className="font-serif leading-none text-white text-[clamp(1.75rem,1rem+3.2vw,3rem)] [font-variant-numeric:lining-nums_tabular-nums]">
              {f.prefix}
              <CountUp end={f.value} suffix={f.suffix} />
            </div>
            <p className="mt-[clamp(0.5rem,1.2vw,0.9rem)] text-micro font-sans uppercase text-white/45">
              {f.label}
            </p>
            {f.note && (
              <p className="mt-1.5 font-sans leading-snug text-white/30 text-[clamp(0.62rem,0.55rem+0.2vw,0.75rem)]">
                {f.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </Reveal>
  );
}