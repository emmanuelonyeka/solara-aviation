import { Link } from 'react-router-dom';
import { homeExperience } from '../../data/home';

export default function HomeExperience() {
  return (
    <section className="section-pinned relative z-[2] h-screen w-full overflow-hidden" id="experience">
      <div className="bg-abs absolute inset-0 h-full w-full" id="expBg" style={{ opacity: 0.6 }}>
        <img className="h-full w-full object-cover" src={homeExperience.image} alt={homeExperience.imageAlt} />
        <div className="grad-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.55),rgba(11,12,15,0.75))]" />
      </div>

      <div className="exp-center absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-[clamp(42px,5vw,82px)] font-semibold leading-[0.95] tracking-[-0.02em] [perspective:800px]" id="expHeadline">
          <span className="exp-word inline-block text-white">{homeExperience.titleLead}</span><br />
          <span className="exp-word inline-block text-beige">{homeExperience.titleAccent}</span>
        </h2>
      </div>

      <p className="exp-body absolute bottom-[18vh] left-[9vw] z-10 min-w-[260px] max-w-[28vw] text-[clamp(0.875rem,0.667rem+0.521vw,1rem)] leading-[1.6] text-white/65 opacity-0" id="expBody">{homeExperience.description}</p>
      <div className="exp-cta absolute bottom-[12vh] right-[9vw] z-10 opacity-0" id="expCta">
        <Link to={homeExperience.cta.to} className="btn-beige-outline">{homeExperience.cta.label}</Link>
      </div>
      <span className="micro-corner micro-label absolute bottom-8 left-[9vw] z-20 text-white/50">{homeExperience.label}</span>
    </section>
  );
}