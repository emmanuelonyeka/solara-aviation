import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { homeBooking } from '../../data/home';

/** Final homepage conversion frame; the full site footer remains independent. */
export default function HomeBooking() {
  return (
    <section className="relative z-[9] min-h-svh w-full overflow-hidden" id="contact">
      <div className="absolute inset-0">
        <img className="h-full w-full scale-[1.02] object-cover saturate-[0.82] contrast-[1.04]" src="/images/closing_island_aerial.jpg" alt="Book your next flight" loading="lazy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(11,12,15,0.08),rgba(11,12,15,0.48)_48%,rgba(11,12,15,0.78)_100%),linear-gradient(180deg,rgba(11,12,15,0.48),rgba(11,12,15,0.9))]" aria-hidden="true" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-start px-[max(1.25rem,9vw)] pb-60 pt-[clamp(7rem,18vh,10rem)] text-center min-[901px]:justify-center min-[901px]:py-[12vh]">
        <h2 className="max-w-[12ch] text-balance text-[clamp(2.25rem,4.2vw,4.25rem)] leading-none text-white opacity-0" id="bookHead"><span className="text-beige">{homeBooking.titleAccent}</span> {homeBooking.titleRest}</h2>
        <p className="mt-6 max-w-[38rem] text-[clamp(0.875rem,0.84rem+0.15vw,0.975rem)] leading-[1.72] text-white/65 opacity-0" id="bookSub">{homeBooking.subtitle}</p>
        <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-col items-center gap-4 opacity-0 min-[481px]:flex-row min-[481px]:gap-6" id="bookCta">
          <Link to={homeBooking.primary.to} className="btn-beige-filled">{homeBooking.primary.label}</Link>
          <a href={`tel:${site.contact.phoneHref}`} className="link-underline !text-[clamp(0.875rem,0.86rem+0.07vw,0.9375rem)] text-white/80 active:opacity-[0.55]">{homeBooking.secondary.label}</a>
        </div>
      </div>

      <aside className="anim-section absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,6vw)] right-[max(1rem,6vw)] z-20 border-t border-beige/20 bg-charcoal/30 px-[1.1rem] py-4 text-center backdrop-blur-[10px] min-[901px]:bottom-10 min-[901px]:left-[9vw] min-[901px]:right-auto min-[901px]:max-w-[280px] min-[901px]:border-l min-[901px]:border-t-0 min-[901px]:text-left">
        <span className="micro-label mb-3.5 block text-white/45">{homeBooking.asideLabel}</span>
        <ul className="flex list-none flex-col items-center gap-2 min-[901px]:items-start">
          {homeBooking.asideLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="group inline-flex items-center gap-2 text-[0.82rem] text-white/80 transition-colors duration-300 hoverable:text-white active:opacity-[0.55]">
                <span className="h-px w-2.5 bg-beige/60 transition-[width,opacity] duration-400 ease-lux group-hoverable:w-5 group-hoverable:opacity-100" aria-hidden="true" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-white/10 pt-3.5 text-[0.72rem] leading-normal text-white/45">{homeBooking.asideNote}</p>
      </aside>
    </section>
  );
}