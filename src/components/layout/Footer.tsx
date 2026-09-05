import { Mail, MapPin, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { footerNavigation, isPathActive, legalNavigation } from '../../config/navigation';
import { site } from '../../config/site';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: site.social.instagram },
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'X', href: site.social.x },
];

export default function Footer() {
  const location = useLocation();
  const isCurrent = (to: string) => isPathActive(location.pathname, to);

  return (
    <footer className="border-t border-white/[0.09] bg-charcoal px-gutter pb-[clamp(1.75rem,3vw,2.5rem)] pt-[clamp(3.5rem,7vw,6rem)]">
      <div className="mx-auto w-full max-w-content">
        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-layout">
          <div className="lg:col-span-5">
            <Link
              to="/"
              aria-label={`${site.name} — home`}
              className="font-serif text-white transition-colors duration-400 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] hoverable:text-beige"
            >
              {site.shortName}
            </Link>

            <p className="mt-flow max-w-[34ch] font-sans text-body text-white/45">
              {site.description}
            </p>

            <address className="mt-block space-y-3 not-italic">
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-3 font-sans text-body text-white/60 transition-colors duration-400 active:opacity-60 hoverable:text-white"
              >
                <Phone size={14} className="flex-none text-beige/70" aria-hidden="true" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 font-sans text-body text-white/60 transition-colors duration-400 active:opacity-60 hoverable:text-white"
              >
                <Mail size={14} className="flex-none text-beige/70" aria-hidden="true" />
                {site.contact.email}
              </a>
              <p className="flex items-start gap-3 font-sans text-body text-white/40">
                <MapPin size={14} className="mt-[0.35em] flex-none text-beige/70" aria-hidden="true" />
                <span>{site.contact.address.join(', ')}</span>
              </p>
            </address>
          </div>

          <nav className="grid grid-cols-2 gap-block sm:grid-cols-3 lg:col-span-7" aria-label="Footer">
            {footerNavigation.map((group) => (
              <div key={group.heading}>
                <h2 className="text-micro font-sans uppercase text-white/85">{group.heading}</h2>
                <ul className="mt-flow space-y-[clamp(0.6rem,1.4vw,0.9rem)]">
                  {group.links.map((link) => {
                    const active = isCurrent(link.to);

                    return (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          aria-current={active ? 'page' : undefined}
                          className={`font-sans text-body transition-colors duration-400 active:opacity-60 ${
                            active ? 'text-beige' : 'text-white/45 hoverable:text-white'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-stack border-t border-white/[0.09] pt-block">
          <p className="text-micro font-sans uppercase text-white/55">Operating standards</p>
          <ul className="mt-flow flex flex-wrap gap-x-layout gap-y-2" aria-label="Accreditations">
            {site.accreditations.map((item) => (
              <li key={item} className="text-micro font-sans uppercase text-white/30">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-block flex flex-col gap-flow border-t border-white/[0.09] pt-block md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-white/30 text-[clamp(0.68rem,0.62rem+0.2vw,0.75rem)]">
            &copy; {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-[clamp(1rem,2.5vw,1.75rem)] gap-y-2">
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-[clamp(1rem,2.5vw,1.75rem)] gap-y-2">
                {legalNavigation.map((link) => {
                  const active = isCurrent(link.to);

                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        aria-current={active ? 'page' : undefined}
                        className={`font-sans transition-colors duration-400 text-[clamp(0.68rem,0.62rem+0.2vw,0.75rem)] active:opacity-60 ${
                          active ? 'text-beige' : 'text-white/30 hoverable:text-white/70'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <span className="hidden h-3 w-px bg-white/15 md:block" aria-hidden="true" />

            <nav aria-label="Social media">
              <ul className="flex flex-wrap items-center gap-x-[clamp(1rem,2.5vw,1.75rem)] gap-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (opens in a new tab)`}
                      className="font-sans text-white/30 transition-colors duration-400 text-[clamp(0.68rem,0.62rem+0.2vw,0.75rem)] active:opacity-60 hoverable:text-white/70"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
