import { Link } from 'react-router-dom';
import { homeSafety } from '../../data/home';
import HomeThumbnailStrip from './HomeThumbnailStrip';

export default function HomeSafety() {
  return (
    <section className="section-pinned relative z-[6] h-screen w-full overflow-hidden" id="safety">
      <div className="bg-abs bg-charcoal absolute inset-0 h-full w-full" id="safetyBg" />

      <div className="left-head safety-head absolute left-[9vw] top-[28vh] z-[5] [perspective:800px]" id="safetyHead">
        <h2 className="text-[clamp(42px,5vw,82px)] font-semibold leading-[0.95] tracking-[-0.02em]">
          {homeSafety.title.map((line) => <span className={`safety-line block ${line.accent ? 'text-beige' : 'text-white'}`} key={line.text}>{line.text}</span>)}
        </h2>
      </div>

      <p className="left-body safety-body absolute left-[9vw] top-[54vh] z-[5] min-w-[260px] max-w-[32vw] text-[clamp(0.875rem,0.667rem+0.521vw,1rem)] leading-[1.6] text-white/70 opacity-0 max-[768px]:min-w-0 max-[768px]:max-w-[min(64vw,330px)] max-[640px]:max-w-[62vw] max-[640px]:[text-shadow:0_1px_10px_rgba(0,0,0,0.55)]" id="safetyBody">{homeSafety.description}</p>
      <div className="left-cta safety-cta absolute left-[9vw] top-[68vh] z-[5] opacity-0" id="safetyCta">
        <Link to={homeSafety.cta.to} className="btn-beige-outline">{homeSafety.cta.label}</Link>
      </div>

      <div className="hero-img absolute bottom-0 right-[6vw] z-[4] h-[56vh] w-[44vw] overflow-hidden" id="safetyImg">
        <img className="home-pinned-media h-full w-full object-cover" src={homeSafety.image} alt={homeSafety.imageAlt} />
        <div className="pointer-events-none absolute inset-0 z-[2] hidden bg-[linear-gradient(90deg,rgba(11,12,15,0.94)_0%,rgba(11,12,15,0.88)_45%,rgba(11,12,15,0.50)_72%,rgba(11,12,15,0)_100%)] max-[768px]:block" aria-hidden="true" />
      </div>

      <HomeThumbnailStrip id="safetyStrip" images={homeSafety.thumbnails} />
      <span className="micro-corner micro-label absolute bottom-8 left-[9vw] z-20 text-white/50">{homeSafety.label}</span>
    </section>
  );
}