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
  FigureStrip,
  CTABand,
  CardAction,
} from '../components/section';

import { aircraft, getAircraftById, type Aircraft } from '../data/aircraft';

/** Splits a model name at its last space so the hero can set it over two lines. */
function titleLines(model: string): string[] {
  const cut = model.lastIndexOf(' ');
  return cut === -1 ? [model] : [model.slice(0, cut), model.slice(cut + 1)];
}

/** Leading integer of a value such as "77 cu ft", for the counting figures. */
function leadingNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

function NotFound() {
  return (
    <PageWrapper>
      <MetaTags title="Aircraft not found" description="This aircraft is no longer listed." canonical={null} noIndex />
      <Section className="min-h-[60vh] !pt-[clamp(8rem,14vw,10rem)]">
        <p className="text-micro font-sans uppercase text-beige">Not in the fleet</p>
        <h1 className="mb-stack font-serif text-display text-white">
          We could not find that aircraft
        </h1>
        <p className="mb-stack max-w-measure text-lead font-sans text-white/60">
          It may have left the fleet, or the link may be out of date. The current
          fleet is listed in full.
        </p>
        <div className="mb-stack">
          <Link to="/fleet" className="btn-beige-filled">
            View the fleet
          </Link>
        </div>
      </Section>
    </PageWrapper>
  );
}

/** Compact row used by "Also consider" at the foot of the page. */
function RelatedCard({ item }: { item: Aircraft }) {
  return (
    <Link to={`/fleet/${item.id}`} className="group block">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={`${item.model} exterior`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-1200 ease-lux group-hoverable:scale-[1.05]"
        />
      </div>
      <p className="mt-block text-micro font-sans uppercase text-white/40">
        {item.category}
      </p>
      <h3 className="mt-1.5 font-serif text-white text-[clamp(1.05rem,0.9rem+0.7vw,1.4rem)] transition-colors duration-400 group-hoverable:text-beige">
        {item.model}
      </h3>
      <p className="mt-1.5 font-sans tabular-nums text-body text-white/45">
        {item.passengers} passengers · {item.rangeNm.toLocaleString()} nm
      </p>
      <span className="mt-block block">
        <CardAction label="View aircraft" />
      </span>
    </Link>
  );
}

export default function AircraftDetail() {
  const { aircraftId } = useParams<{ aircraftId: string }>();
  const item = getAircraftById(aircraftId || '');

  const position = useMemo(() => aircraft.findIndex((a) => a.id === aircraftId), [aircraftId]);

  /* Same cabin class first, then anything else, so the suggestion is a real
     alternative rather than whatever happens to sit next in the array. */
  const related = useMemo(() => {
    if (!item) return [];
    const sameClass = aircraft.filter((a) => a.id !== item.id && a.category === item.category);
    const others = aircraft.filter((a) => a.id !== item.id && a.category !== item.category);
    return [...sameClass, ...others].slice(0, 3);
  }, [item]);

  if (!item) return <NotFound />;

  const previous = position > 0 ? aircraft[position - 1] : aircraft[aircraft.length - 1];
  const next = position < aircraft.length - 1 ? aircraft[position + 1] : aircraft[0];

  const specs = [
    { label: 'Cabin class', value: item.category },
    { label: 'Passengers', value: `${item.passengers}` },
    { label: 'Crew', value: `${item.crew}` },
    { label: 'Range', value: `${item.rangeNm.toLocaleString()} nm` },
    { label: 'Endurance', value: item.rangeHours },
    { label: 'Cruise speed', value: item.speed },
    { label: 'Cabin height', value: item.cabinHeight },
    { label: 'Cabin width', value: item.cabinWidth },
    { label: 'Cabin length', value: item.cabinLength },
    { label: 'Baggage', value: item.baggage },
    { label: 'Year', value: item.year },
  ];

  const figures = [
    { value: item.passengers, label: 'Passengers' },
    { value: item.rangeNm, suffix: ' nm', label: 'Range', note: 'Non-stop, still air' },
    { value: leadingNumber(item.baggage), suffix: ' cu ft', label: 'Baggage' },
    { value: item.crew, label: 'Crew' },
  ];

  return (
    <PageWrapper>
      <MetaTags
        title={item.model}
        description={`${item.model} — ${item.category} cabin, ${item.passengers} passengers, ${item.rangeNm.toLocaleString()} nm range. Specification, cabin and typical missions.`}
        canonical={`/fleet/${item.id}`}
        image={item.image}
        imageAlt={`${item.model} private aircraft`}
      />

      <PageHero
        eyebrow={`${item.category} cabin`}
        title={titleLines(item.model)}
        accent={[1]}
        lead={item.missions.join(' · ')}
        image={item.image}
        imageAlt={`${item.model} on the apron`}
        meta={[
          { label: 'Passengers', value: String(item.passengers) },
          { label: 'Range', value: `${item.rangeNm.toLocaleString()} nm` },
          { label: 'Cruise', value: item.speed },
        ]}
      />

      <Section compact divided>
        <CatalogNavigation
          ariaLabel="Aircraft navigation"
          back={{ label: 'All aircraft', to: '/fleet' }}
          previous={{ label: previous.model, to: `/fleet/${previous.id}` }}
          next={{ label: next.model, to: `/fleet/${next.id}` }}
        />
      </Section>

      <Section>
        <SectionIntro
          index="01"
          eyebrow="The aircraft"
          title={['Built for a', 'particular kind', 'of flight']}
          accent={[2]}
          lead={item.description}
        />

        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
          <Reveal from="fade" className="overflow-hidden lg:col-span-7">
            <img
              src={item.gallery[0] ?? item.image}
              alt={`${item.model} cabin interior`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          <Reveal from="up" distance={26} className="lg:col-span-5">
            <p className="mb-[clamp(1rem,2vw,1.5rem)] text-micro font-sans uppercase text-white/40">
              Full specification
            </p>
            <SpecTable specs={specs} columns={1} variant="numeric" />
          </Reveal>
        </div>
      </Section>

      <Section compact>
        <FigureStrip figures={figures} />
      </Section>

      <Section divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="02"
            eyebrow="Typical missions"
            title={['Where this', 'aircraft earns', 'its place']}
            accent={[2]}
            body={`Cabin class is decided by distance and by what you need to do on the way. The ${item.model} is the aircraft we put forward for these journeys.`}
            points={item.missions}
            image={item.gallery[1] ?? item.image}
            imageAlt={`${item.model} in flight`}
            cta={{ label: 'Check availability', to: '/quote' }}
          />

          <EditorialSplit
            index="03"
            eyebrow="The cabin"
            title={['Measured, not', 'described']}
            accent={[1]}
            reverse
            body="Cabin dimensions decide whether you can stand, work at a table, or sleep flat. They are published here in full rather than summarised, because they are the numbers that actually change a long flight."
            points={[
              `${item.cabinHeight} standing height`,
              `${item.cabinWidth} across at the widest point`,
              `${item.cabinLength} of cabin length`,
              `${item.baggage} of baggage, loaded from outside`,
            ]}
            image={item.gallery[2] ?? item.gallery[0] ?? item.image}
            imageAlt={`${item.model} cabin detail`}
            cta={{ label: 'Onboard experience', to: '/experience' }}
          />
        </div>
      </Section>

      {related.length > 0 && (
        <Section divided>
          <SectionIntro
            index="04"
            eyebrow="Also consider"
            title={['Comparable', 'aircraft']}
            accent={[1]}
            lead="Aircraft in the same cabin class first, then the nearest alternatives either side of it."
          />

          <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.id} from="up" distance={28} delay={i * 0.08}>
                <RelatedCard item={r} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        eyebrow="This aircraft"
        title={['Fly the', item.model]}
        accent={[1]}
        lead={`Send us your route and dates. We will confirm ${item.model} availability, or put forward the closest alternative, within two hours.`}
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'Back to the fleet', to: '/fleet' }}
        image="/images/hero_clouds_wing.jpg"
      />
    </PageWrapper>
  );
}
