import { homeJourney } from '../../data/home';

/** The first normal-flow chapter. Animation hooks are owned by useHomeScroll. */
export default function HomeJourney() {
  return (
    <section className="relative z-[4] w-full overflow-hidden bg-charcoal bg-[radial-gradient(circle_at_74%_18%,rgba(243,240,230,0.04),transparent_30rem)] px-[max(9vw,calc((100vw-90rem)/2))] py-[clamp(5rem,9vw,8rem)]" id="journey">
      <p className="max-w-[54ch] text-lead text-white/60 opacity-0" id="journeyPara">{homeJourney.intro}</p>

      <figure className="mx-auto my-[clamp(3.5rem,7vw,6rem)] flex max-w-[80rem] flex-col items-center justify-center border-y border-white/[0.08] py-[clamp(2.5rem,5vw,4rem)] text-center opacity-0" id="journeyQuote">
        <blockquote className="max-w-[22ch] text-balance font-serif text-[clamp(1.75rem,3vw,2.75rem)] italic leading-[1.12] text-white/90">&ldquo;{homeJourney.quote.text}&rdquo;</blockquote>
        <figcaption className="mt-[clamp(1.25rem,2vw,1.75rem)] flex items-center gap-3">
          <span className="h-px w-[clamp(1.5rem,4vw,2.5rem)] bg-beige/30" aria-hidden="true" />
          <span className="micro-label text-white">{homeJourney.quote.author}</span>
          <span className="h-px w-[clamp(1.5rem,4vw,2.5rem)] bg-beige/30" aria-hidden="true" />
        </figcaption>
      </figure>

      <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] md:grid-cols-3" id="journeyCards">
        {homeJourney.cards.map((card) => (
          <article className="journey-card group relative cursor-default overflow-hidden opacity-0 [perspective:600px]" key={card.title}>
            <div className="relative aspect-[3/2] overflow-hidden bg-[#14151A]">
              <img className="h-full w-full object-cover saturate-[0.88] contrast-[1.03] transition-[transform,filter] duration-[700ms] ease-lux group-hoverable:scale-[1.035] group-hoverable:saturate-[0.98] group-hoverable:contrast-[1.04]" src={card.image} alt={card.title} loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,12,15,0.64),transparent_58%)]" aria-hidden="true" />
            </div>
            <div className="min-h-[6.5rem] border-b border-white/[0.08] py-5 pb-6">
              <h3 className="mb-2.5 max-w-[16ch] text-balance font-serif text-[clamp(1.45rem,2vw,1.8rem)] leading-[1.1] text-white">{card.title}</h3>
              <p className="text-body leading-[1.6] text-white/50">{card.description}</p>
            </div>
          </article>
        ))}
      </div>

      <span className="micro-label absolute bottom-8 left-[9vw] text-white/50">Journey</span>
    </section>
  );
}