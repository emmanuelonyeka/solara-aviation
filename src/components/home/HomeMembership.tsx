import { Link } from 'react-router-dom';
import { homeMembership } from '../../data/home';
import HomeThumbnailStrip from './HomeThumbnailStrip';

export default function HomeMembership() {
  return (
    <section className="section-pinned relative z-[7] h-screen w-full overflow-hidden" id="membership">
      <div className="bg-abs bg-charcoal absolute inset-0 h-full w-full" id="memBg" />

      <h2 className="right-head absolute left-[9vw] top-1/2 z-[5] -translate-y-1/2 text-[clamp(42px,5vw,82px)] leading-[0.95] tracking-[-0.02em] [perspective:800px]" id="memHead">
        <span className="block"><span className="word inline-block font-semibold text-beige [text-shadow:6px_5px_5px_rgb(0,0,0)]">{homeMembership.titleAccent}</span></span>
        <span className="block"><span className="word inline-block font-semibold text-white [text-shadow:6px_5px_5px_rgb(0,0,0)]">{homeMembership.titleRest}</span></span>
      </h2>

      <p className="right-body absolute right-[9vw] top-[16vh] z-[6] min-w-[220px] max-w-[26vw] text-right text-[clamp(0.875rem,0.667rem+0.521vw,1rem)] leading-[1.6] text-white/70 opacity-0" id="memBody">{homeMembership.description}</p>
      <div className="right-cta absolute right-[9vw] top-[30vh] z-[6] opacity-0" id="memCta">
        <Link to={homeMembership.cta.to} className="btn-beige-outline">{homeMembership.cta.label}</Link>
      </div>

      <div className="right-img absolute bottom-0 right-[6vw] z-[4] h-[56vh] w-[44vw] overflow-hidden" id="memImg">
        <img className="home-pinned-media h-full w-full object-cover" src={homeMembership.image} alt={homeMembership.imageAlt} />
      </div>

      <figure className="mem-quote absolute bottom-[10vh] left-[9vw] z-[7] min-w-[300px] w-[36vw] bg-beige p-6 opacity-0 [perspective:600px] max-[640px]:min-w-0 max-[640px]:w-[min(72vw,340px)] max-[640px]:px-[clamp(0.85rem,3.4vw,1.5rem)] max-[640px]:py-[clamp(1.5rem,1.37rem+0.59vw,2rem)] md:p-8" id="memQuote">
        <blockquote className="mb-4 font-serif text-[clamp(0.82rem,0.55rem+1.1vw,1.25rem)] italic leading-[1.5] text-charcoal max-[640px]:text-base max-[640px]:leading-[1.45]">&ldquo;{homeMembership.quote.text}&rdquo;</blockquote>
        <figcaption className="flex items-center gap-3 max-[640px]:gap-[clamp(0.5rem,2vw,0.75rem)]">
          <span className="h-px w-6 bg-charcoal/40 max-[640px]:w-[clamp(1rem,4vw,1.5rem)]" aria-hidden="true" />
          <span className="micro-label text-charcoal/70 max-[640px]:text-[clamp(9.5px,2.5vw,12px)]">{homeMembership.quote.author}</span>
        </figcaption>
      </figure>

      <HomeThumbnailStrip id="memStrip" images={homeMembership.thumbnails} />
      <span className="micro-corner micro-label absolute bottom-8 left-[9vw] z-20 text-white/50">{homeMembership.label}</span>
    </section>
  );
}