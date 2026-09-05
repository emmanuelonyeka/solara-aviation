import { Link, useLocation } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import { Section, CardAction } from '../components/section';
import { site } from '../config/site';

/**
 * Somewhere useful to go, rather than an apology.
 *
 * A 404 is a navigation failure, so the fix is navigation: the five
 * destinations a lost visitor most likely wanted, and a phone number for the
 * ones who would rather stop clicking.
 */
const SUGGESTIONS = [
  { label: 'The fleet', to: '/fleet', note: 'Aircraft, cabins and range' },
  { label: 'Destinations', to: '/destinations', note: 'Where we fly and from which airport' },
  { label: 'Request a quote', to: '/quote', note: 'Route and dates, priced in two hours' },
  { label: 'Membership', to: '/membership', note: 'Card, membership or on demand' },
  { label: 'Booking support', to: '/manage-booking', note: 'Send a change or cancellation request' },
];

export default function NotFound() {
  const location = useLocation();

  return (
    <PageWrapper>
      <MetaTags
        title="Page not found"
        description="That page does not exist. Here is where most people were trying to go."
        canonical={null}
        noIndex
      />

      <Section className="min-h-[85vh] !pt-[clamp(8rem,14vw,10rem)]">
        <Reveal immediate from="fade" className="flex items-center gap-4">
          <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-beige/60" aria-hidden="true" />
          <span className="text-micro font-sans uppercase text-beige">Error 404</span>
        </Reveal>

        <Reveal immediate from="up" distance={26}>
          <h1 className="mt-block font-serif text-display-xl text-white">
            This page does not exist
          </h1>

          <p className="mt-block max-w-measure text-lead font-sans text-white/60">
            Nothing is wrong with your connection. The address{' '}
            <span className="break-all font-sans text-beige/80">{location.pathname}</span> is not a
            page on this site — it may have moved, or the link that brought you here may be old.
          </p>
        </Reveal>

        <Reveal
          immediate
          from="up"
          distance={24}
          delay={0.15}
          className="mt-stack border-t border-white/[0.09]"
        >
          <p className="pt-block text-micro font-sans uppercase text-white/40">
            Most people arriving here wanted one of these
          </p>

          <div className="mt-block grid gap-block sm:grid-cols-2 lg:grid-cols-3">
            {SUGGESTIONS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group border border-white/[0.12] bg-white/[0.02] p-block transition-all duration-500 ease-lux active:scale-[0.99] hoverable:border-beige/45 hoverable:bg-white/[0.045]"
              >
                <span className="block font-serif text-white text-[clamp(1.05rem,0.9rem+0.7vw,1.35rem)] transition-colors duration-400 group-hoverable:text-beige">
                  {item.label}
                </span>
                <span className="mt-flow block font-sans text-body text-white/45">{item.note}</span>
                <span className="mt-block block">
                  <CardAction label="Go" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal
          immediate
          from="up"
          distance={20}
          delay={0.3}
          className="mt-stack flex flex-col gap-[clamp(1.35rem,4vw,1.85rem)] min-[568px]:flex-row min-[568px]:items-center min-[568px]:gap-[clamp(1rem,2vw,1.5rem)]"
        >
          <Link to="/" className="btn-beige-filled">
            Back to the home page
          </Link>
          <a href={`tel:${site.contact.phoneHref}`} className="link-underline">
            Or call {site.contact.phone}
          </a>
        </Reveal>
      </Section>
    </PageWrapper>
  );
}
