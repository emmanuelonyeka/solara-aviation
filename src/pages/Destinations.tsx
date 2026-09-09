import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import CatalogFilter from '../components/catalog/CatalogFilter';
import useCatalogFilter from '../hooks/useCatalogFilter';
import {
  Section,
  SectionIntro,
  PageHero,
  EditorialSplit,
  FigureStrip,
  CTABand,
  CardAction,
} from '../components/section';

import { destinations, regions, type Destination } from '../data/destinations';

function DestinationCard({ item }: { item: Destination }) {
  return (
    <article className="group relative">
      <Link to={`/destinations/${item.slug}`} aria-label={`View ${item.city}, ${item.country}`} className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-beige" />
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={`${item.city}, ${item.country}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-1200 ease-lux group-hoverable:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent"
        />
        <span className="absolute inset-x-0 bottom-0 p-[clamp(1rem,2.5vw,1.5rem)]">
          <span className="block text-micro font-sans uppercase text-beige/80">{item.country}</span>
          <span className="mt-1.5 block font-serif text-white text-[clamp(1.35rem,1.1rem+1.1vw,1.9rem)] transition-colors duration-400 group-hoverable:text-beige">
            {item.city}
          </span>
        </span>
      </div>

      <p className="mt-block font-sans text-body text-white/45">
        {item.fboName}
      </p>

      <Link to={`/destinations/${item.slug}`} className="relative z-20 mt-block inline-flex transition-opacity duration-300 active:opacity-50">
        <CardAction label="View destination" />
      </Link>
    </article>
  );
}

export default function Destinations() {
  const [activeRegion, setActiveRegion] = useCatalogFilter(regions, 'region', 'All');

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: destinations.length };
    destinations.forEach((d) => {
      map[d.region] = (map[d.region] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(
    () => (activeRegion === 'All' ? destinations : destinations.filter((d) => d.region === activeRegion)),
    [activeRegion]
  );

  const figures = useMemo(
    () => [
      { value: destinations.length, label: 'Featured destinations' },
      { value: regions.length - 1, label: 'Regions served' },
      {
        value: new Set(destinations.map((d) => d.country)).size,
        label: 'Countries',
      },
      { value: 2, suffix: ' hrs', label: 'Quote turnaround', note: 'Any route, any day' },
    ],
    []
  );

  return (
    <PageWrapper>
      <MetaTags
        title="Destinations"
        description="Private terminals from New York to Tokyo. Where we fly, which airport we use, and why it puts you closer than a scheduled airline can."
        canonical="/destinations"
      />

      <PageHero
        eyebrow="Destinations"
        title={['Closer than', 'the airline', 'can land you']}
        accent={[2]}
        lead="Private aviation reaches thousands of airports scheduled carriers cannot use. The destination is rarely the constraint — the runway near it is."
        image="/images/destinations_island_hero.jpg"
        imageAlt="Private island coastline reached by private aviation"
        meta={[
          { label: 'Destinations', value: String(destinations.length) },
          { label: 'Regions', value: String(regions.length - 1) },
          { label: 'Arrivals', value: 'Direct' },
        ]}
      />

      <Section>
        <SectionIntro
          index="01"
          eyebrow="Why it matters"
          title={['The airport', 'decides the', 'journey']}
          accent={[2]}
          lead="A scheduled airline lands where its network allows. We land at the field nearest to where you are actually going — which is usually a smaller, quieter one much closer to it."
        />

        <FigureStrip figures={figures} />
      </Section>

      <Section id="destinations" divided>
        <div className="scroll-mt-[clamp(5rem,10vw,7rem)]">
          <SectionIntro
            index="02"
            eyebrow="The index"
            title={['Where we fly', 'most often']}
            accent={[1]}
            lead="A selection, not a limit. If your destination is not listed, ask — the answer is almost always yes."
          />

          <CatalogFilter
            label="Filter by region"
            options={regions}
            value={activeRegion}
            counts={counts}
            controls="destination-results"
            onChange={setActiveRegion}
            resultLabel={(count) => (count === 1 ? 'destination' : 'destinations')}
          />

          {/* keyed on the filter so the cards re-run their reveal after a change */}
          <div
            id="destination-results"
            key={activeRegion}
            className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <Reveal key={item.slug} from="up" distance={30} delay={(i % 3) * 0.08}>
                <DestinationCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="03"
            eyebrow="Access"
            title={['Runways the', 'airlines cannot', 'use']}
            accent={[2]}
            body="Scheduled services need long runways, terminal capacity and slots. A private aircraft needs none of that, which opens up thousands of regional fields — the ones that sit near ski resorts, coastlines and estates rather than an hour's drive from them."
            points={[
              'Arrive at the field nearest your destination, not the nearest hub',
              'Private terminals, so no queues at either end',
              'Customs cleared in the terminal, often in minutes',
            ]}
            image="/images/destinations/aspen.jpg"
            imageAlt="Mountain airfield surrounded by peaks"
            cta={{ label: 'See the fleet', to: '/fleet' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="On the ground"
            title={['Handled before', 'you land']}
            accent={[1]}
            reverse
            body="Ground transport, catering, crew and customs are arranged while you are still in the air. By the time the door opens, the car is on the apron and your bags go straight into it."
            points={[
              'Vehicle waiting at the aircraft steps',
              'Local handling agents briefed in advance',
              'Onward connections held where schedules are tight',
            ]}
            image="/images/destinations/monaco.jpg"
            imageAlt="Coastal city harbour at dusk"
            cta={{ label: 'Concierge services', to: '/concierge' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Any route"
        title={['Tell us where.', 'We will find', 'the runway.']}
        accent={[2]}
        lead="Send your route and dates and you will have aircraft options, airport recommendations and pricing within two hours."
        image="/images/destinations/tokyo.jpg"
      />
    </PageWrapper>
  );
}
