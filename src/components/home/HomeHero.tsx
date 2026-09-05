import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { homeHero } from '../../data/home';
import HomeThumbnailStrip from './HomeThumbnailStrip';

const HERO_VIDEO = import.meta.env.VITE_HERO_VIDEO_URL?.trim() || null;

/** Opening chapter. Inline opacity values are part of the protected GSAP handoff. */
export default function HomeHero() {
  const [videoEnabled] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return !connection?.saveData;
  });
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="section-pinned hero relative z-[1] h-screen w-full overflow-hidden" id="hero">
      <div className="bg-abs absolute inset-0 h-full w-full" id="heroBg" style={{ opacity: 0 }}>
        <img className="h-full w-full object-cover" src={homeHero.image} alt={homeHero.imageAlt} fetchPriority="high" />
        {videoEnabled && HERO_VIDEO && (
          <video className={`hero-video pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1600ms] ease-soft${videoReady ? ' is-ready opacity-100' : ''}`} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} onPlaying={() => setVideoReady(true)} onError={() => setVideoReady(false)}>
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        <div className="grad-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.55),rgba(11,12,15,0.75))]" />
      </div>

      <div className="hero-content absolute inset-0 z-10 flex flex-col justify-center px-6 sm:pl-10 sm:pr-6 lg:pl-[9vw] lg:pr-[12vw]">
        <h1 className="text-[clamp(50px,calc(31.8519px+5.1852vw),120px)] max-[372px]:text-[46px] leading-[0.92] tracking-[-0.02em] text-white [perspective:800px]" id="heroHeadline">
          {homeHero.title.map((word, index) => (
            <Fragment key={word.text}>
              <span className={`hero-word mr-[0.01em] inline-block font-[599] tracking-[-0.05em] [transform-style:preserve-3d] ${word.accent ? 'text-beige' : 'text-white'}`} style={{ opacity: 0 }}>{word.text}</span>
              {index < homeHero.title.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>
        <p className="hero-sub mt-6 w-full max-w-[70vw] text-[clamp(0.9rem,0.779rem+0.554vw,1.125rem)] leading-[1.6] text-white/65 opacity-0 max-[480px]:leading-[1.55] sm:mt-8 sm:max-w-[420px] lg:max-w-[34vw]" id="heroSub" style={{ opacity: 0 }}>{homeHero.subtitle}</p>
        <div className="hero-cta mt-8 flex flex-wrap items-center gap-4 opacity-0 sm:mt-10 sm:gap-6" id="heroCta" style={{ opacity: 0 }}>
          <Link to={homeHero.primary.to} className="btn-beige-filled">{homeHero.primary.label}</Link>
          <Link to={homeHero.secondary.to} className="link-underline text-[clamp(0.875rem,0.84rem+0.15vw,1rem)] text-white/80 active:opacity-[0.55] max-[365px]:ml-[5px]">{homeHero.secondary.label}</Link>
        </div>
      </div>

      <HomeThumbnailStrip id="heroStrip" images={homeHero.thumbnails} />
      <span className="micro-corner micro-label absolute bottom-8 left-[9vw] z-20 text-white/50">{homeHero.label}</span>
    </section>
  );
}