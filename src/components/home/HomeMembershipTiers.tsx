import { Link } from 'react-router-dom';
import { homeMembershipTiers } from '../../data/home';

/** Product comparison kept separate from the pinned membership invitation. */
export default function HomeMembershipTiers() {
  return (
    <section className="relative z-[8] w-full overflow-hidden bg-charcoal bg-[radial-gradient(circle_at_82%_18%,rgba(243,240,230,0.045),transparent_28rem)] px-[max(9vw,calc((100vw-90rem)/2))] py-[clamp(5rem,9vw,8rem)]" id="tiers">
      <header className="mb-[clamp(3rem,6vw,5.5rem)] flex flex-col gap-[clamp(1.5rem,4vw,4rem)] md:flex-row md:items-start md:justify-between">
        <h2 className="max-w-[13ch] text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.02] text-white opacity-0" id="tiersHead">{homeMembershipTiers.title}</h2>
        <p className="max-w-[34rem] text-lead text-white/60 opacity-0 md:text-right" id="tiersIntro">{homeMembershipTiers.intro}</p>
      </header>

      <div className="grid grid-cols-1 gap-[clamp(1rem,2.5vw,2rem)] [perspective:1000px] md:grid-cols-2">
        {homeMembershipTiers.options.map((option) => (
          <article className="group relative isolate overflow-hidden border border-white/[0.11] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-[clamp(1.5rem,3.5vw,2.5rem)] opacity-0 transition-[border-color,background] duration-400 ease-lux hoverable:border-beige/30 hoverable:bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] focus-within:border-beige/30" id={option.id} key={option.id}>
            <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-beige/60 to-transparent opacity-50" aria-hidden="true" />
            <h3 className="mb-[clamp(0.75rem,1.5vw,1rem)] font-serif text-[clamp(1.75rem,2.4vw,2.35rem)] leading-[1.1] text-beige">{option.title}</h3>
            <p className="mb-[clamp(1.5rem,3vw,2rem)] max-w-[55ch] text-lead text-white/60">{option.description}</p>
            <Link to={option.cta.to} className="btn-beige-outline text-xs">{option.cta.label}</Link>
          </article>
        ))}
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-1 gap-[clamp(1rem,3vw,2rem)] border-t border-white/10 pt-[clamp(2rem,4vw,3.5rem)] md:grid-cols-3" id="tiersFeatures">
        {homeMembershipTiers.features.map((feature) => (
          <div className="feature-item flex min-w-0 items-center gap-4 opacity-0" key={feature}>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-beige/60" aria-hidden="true" />
            <span className="text-body text-white/60">{feature}</span>
          </div>
        ))}
      </div>

      <span className="micro-label absolute bottom-8 left-[9vw] text-white/50">Tiers</span>
    </section>
  );
}