import { Link } from 'react-router-dom';
import { homeDestinations } from '../../data/home';
import HomeThumbnailStrip from './HomeThumbnailStrip';

export default function HomeDestinations() {
  return (
    <section className="section-pinned relative z-[5] h-screen w-full overflow-hidden" id="destinations">
      <div className="bg-abs bg-charcoal absolute inset-0 h-full w-full" id="destBg" />

      <h2 className="right-head absolute left-[9vw] top-1/2 z-[5] -translate-y-1/2 text-[clamp(42px,5vw,82px)] leading-[0.95] tracking-[-0.02em] [perspective:800px]" id="destHead">
        <span className="block"><span className="word inline-block font-semibold text-beige [text-shadow:6px_5px_5px_rgb(0,0,0)]">{homeDestinations.titleAccent}</span></span>
        <span className="block"><span className="word inline-block font-semibold text-white [text-shadow:6px_5px_5px_rgb(0,0,0)]">{homeDestinations.titleRest}</span></span>
      </h2>

      <p className="right-body absolute right-[9vw] top-[16vh] z-[6] min-w-[220px] max-w-[26vw] text-right text-[clamp(0.875rem,0.667rem+0.521vw,1rem)] leading-[1.6] text-white/70 opacity-0" id="destBody">{homeDestinations.description}</p>
      <div className="right-cta absolute right-[9vw] top-[30vh] z-[6] opacity-0" id="destCta">
        <Link to={homeDestinations.cta.to} className="btn-beige-outline">{homeDestinations.cta.label}</Link>
      </div>

      <div className="right-img absolute bottom-0 right-[6vw] z-[4] h-[56vh] w-[44vw] overflow-hidden" id="destImg">
        <img className="home-pinned-media h-full w-full object-cover" src={homeDestinations.image} alt={homeDestinations.imageAlt} />
      </div>

      <HomeThumbnailStrip id="destStrip" images={homeDestinations.thumbnails} />
      <span className="micro-corner micro-label absolute bottom-8 left-[9vw] z-20 text-white/50">{homeDestinations.label}</span>
    </section>
  );
}