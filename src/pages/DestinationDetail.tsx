import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import CatalogNavigation from '../components/catalog/CatalogNavigation';
import {
  Section,
  SectionIntro,
  PageHero,
  EditorialSplit,
  SpecTable,
  CTABand,
  CardAction,
} from '../components/section';

import { destinations, getDestinationBySlug, type Destination } from '../data/destinations';

function NotFound() {
  return (
    <PageWrapper>
      <MetaTags title="Destination not found" description="This destination is no longer listed." canonical={null} noIndex />
      <Section className="min-h-[60vh] !pt-[clamp(8rem,14vw,10rem)]">
        <p className="text-micro font-sans uppercase text-beige">Not on the list</p>
        <h1 className="mb-stack font-serif text-display text-white">
          We could not find that destination
        </h1>
        <p className="mb-stack max-w-measure text-lead font-sans text-white/60">
          The link may be out of date. Our most requested destinations are listed
          in full — and if yours is not among them, we almost certainly still fly there.
        </p>
        <div className="mb-stack flex flex-wrap gap-4">
          <Link to="/destinations" className="btn-beige-filled">
            All destinations
          </Link>
          <Link to="/quote" className="btn-beige-outline">
            Ask about a route
          </Link>
        </div>
      </Section>
    </PageWrapper>
  );
}

function RelatedCard({ item }: { item: Destination }) {
  return (
    <Link to={`/destinations/${item.slug}`} className="group block">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={`${item.city}, ${item.country}`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-1200 ease-lux group-hoverable:scale-[1.05]"
        />
      </div>
      <p className="mt-block text-micro font-sans uppercase text-white/40">
        {item.region}
      </p>
      <h3 className="mt-1.5 font-serif text-white text-[clamp(1.05rem,0.9rem+0.7vw,1.4rem)] transition-colors duration-400 group-hoverable:text-beige">
        {item.city}
      </h3>
      <p className="mt-1.5 font-sans text-body text-white/45">{item.fboName}</p>
      <span className="mt-block block">
        <CardAction label="View destination" />
      </span>
    </Link>
  );
}

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = getDestinationBySlug(slug || '');

  const position = useMemo(() => destinations.findIndex((d) => d.slug === slug), [slug]);

  /* Same region first: the realistic alternative to a trip is usually a
     neighbouring one, not whatever sits next in the array. */
  const related = useMemo(() => {
    if (!item) return [];
    const sameRegion = destinations.filter((d) => d.slug !== item.slug && d.region === item.region);
    const others = destinations.filter((d) => d.slug !== item.slug && d.region !== item.region);
    return [...sameRegion, ...others].slice(0, 3);
  }, [item]);

  if (!item) return <NotFound />;

  const previous = position > 0 ? destinations[position - 1] : destinations[destinations.length - 1];
  const next = position < destinations.length - 1 ? destinations[position + 1] : destinations[0];

  const facts = [
    { label: 'Country', value: item.country },
    { label: 'Region', value: item.region },
    { label: 'Primary airport', value: item.fboName },
    { label: 'Terminal', value: 'Private FBO' },
    { label: 'Customs', value: 'Cleared in terminal' },
    { label: 'Ground transport', value: 'To the aircraft steps' },
  ];

  return (
    <PageWrapper>
      <MetaTags
        title={`${item.city} — Private Jet Charter`}
        description={`Private jet charter to ${item.city}, ${item.country}. ${item.fboName}, private terminal arrivals, and the routes we fly most often.`}
        canonical={`/destinations/${item.slug}`}
        image={item.image}
        imageAlt={`Private aviation destination in ${item.city}, ${item.country}`}
      />

      <PageHero
        eyebrow={item.country}
        title={[item.city]}
        lead={item.description}
        image={item.image}
        imageAlt={`${item.city}, ${item.country}`}
        meta={[
          { label: 'Region', value: item.region },
          { label: 'Arrives at', value: item.fboName.replace(/\s*\(.*\)$/, '') },
          { label: 'Flown from', value: `${item.popularFrom.length} cities` },
        ]}
      />

      <Section compact divided>
        <CatalogNavigation
          ariaLabel="Destination navigation"
          back={{ label: 'All destinations', to: '/destinations' }}
          previous={{ label: previous.city, to: `/destinations/${previous.slug}` }}
          next={{ label: next.city, to: `/destinations/${next.slug}` }}
        />
      </Section>

      <Section>
        <SectionIntro
          index="01"
          eyebrow="Why fly private here"
          title={['What changes', 'when you skip', 'the terminal']}
          accent={[2]}
          lead={item.whyFly}
        />

        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
          <Reveal from="fade" className="overflow-hidden lg:col-span-7">
            <img
              src={item.gallery[0] ?? item.image}
              alt={`Arriving in ${item.city}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          <Reveal from="up" distance={26} className="lg:col-span-5">
            <p className="mb-[clamp(1rem,2vw,1.5rem)] text-micro font-sans uppercase text-white/40">
              At a glance
            </p>
            <SpecTable specs={facts} columns={1} />
          </Reveal>
        </div>
      </Section>

      <Section divided>
        <EditorialSplit
          index="02"
          eyebrow="The airport"
          title={['Where you', 'actually land']}
          accent={[1]}
          body={item.fboInfo}
          points={[
            'Dedicated private terminal, separate from the main airport',
            'Arrive shortly before departure rather than hours ahead',
            'Baggage handled at the aircraft, never on a carousel',
          ]}
          image={item.gallery[1] ?? item.image}
          imageAlt={`${item.fboName}`}
          cta={{ label: 'Request this route', to: '/quote' }}
        />
      </Section>

      <Section divided>
        <SectionIntro
          index="03"
          eyebrow="Routes"
          title={['Most often', `flown from`]}
          accent={[1]}
          lead={`These are the departure cities we fly to ${item.city} most frequently. Any other origin is equally possible — these simply come up most.`}
        />

        <div className="border-t border-white/[0.09]">
          {item.popularFrom.map((origin, i) => (
            <Reveal key={origin} from="up" distance={20} delay={i * 0.06}>
              <div className="flex items-baseline justify-between gap-6 border-b border-white/[0.09] py-[clamp(1rem,2.4vw,1.6rem)]">
                <div className="flex items-baseline gap-[clamp(0.75rem,2vw,1.5rem)]">
                  <span className="text-micro font-sans tabular-nums text-beige/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-white text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)]">
                    {origin}
                  </span>
                </div>

                <div className="flex items-baseline gap-[clamp(0.75rem,2vw,1.5rem)]">
                  <span aria-hidden="true" className="h-px w-[clamp(1.5rem,6vw,5rem)] bg-white/20" />
                  <span className="font-serif text-white/60 text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)]">
                    {item.city}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section divided>
          <SectionIntro
            index="04"
            eyebrow="Nearby"
            title={['Often booked', 'alongside']}
            accent={[1]}
            lead="Destinations in the same region first, then the next closest alternatives."
          />

          <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} from="up" distance={28} delay={i * 0.08}>
                <RelatedCard item={r} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        eyebrow="This destination"
        title={['Fly to', item.city]}
        accent={[1]}
        lead={`Send your dates and departure city. We will confirm aircraft, airport and pricing for ${item.city} within two hours.`}
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'All destinations', to: '/destinations' }}
        image="/images/concierge/airside-transfer.webp"
      />
    </PageWrapper>
  );
}
