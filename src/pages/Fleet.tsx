import { useMemo, useRef } from 'react';
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

import { aircraft, categories, type Aircraft } from '../data/aircraft';

/**
 * Guidance shown above the fleet index.
 *
 * Each entry pre-filters the list, so a visitor who knows their journey
 * but not their aircraft is never asked to choose from specifications.
 * Edit the copy here; the category must match one in data/aircraft.ts.
 */
const MISSION_GUIDES = [
  {
    duration: 'Up to 3 hours',
    title: 'Regional and short haul',
    body: 'City pairs within a single region — a morning meeting and an evening return.',
    category: 'Light' as const,
  },
  {
    duration: '3 to 6 hours',
    title: 'Transcontinental',
    body: 'Coast to coast without a fuel stop, with a cabin you can work or sleep in.',
    category: 'Super-Midsize' as const,
  },
  {
    duration: '6 hours and beyond',
    title: 'Intercontinental',
    body: 'Ocean crossings non-stop, with full berthing and a dedicated cabin attendant.',
    category: 'Ultra-Long-Range' as const,
  },
];

function AircraftRow({ item, index }: { item: Aircraft; index: number }) {
  const specs = [
    { label: 'Passengers', value: String(item.passengers) },
    { label: 'Range', value: `${item.rangeNm.toLocaleString()} nm` },
    { label: 'Cruise', value: item.speed },
    { label: 'Baggage', value: item.baggage },
  ];

  return (
    <Reveal from="up" distance={32}>
      <article className="group relative border-t border-white/[0.09] py-[clamp(1.75rem,4vw,3rem)]">
        <Link to={`/fleet/${item.id}`} aria-label={`View ${item.model} specification`} className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-beige" />
        <div className="grid gap-[clamp(1.25rem,3vw,2.5rem)] lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-1">
            <span className="text-micro font-sans tabular-nums text-beige/70">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="overflow-hidden lg:col-span-5">
            <img
              src={item.image}
              alt={`${item.model} exterior`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-1200 ease-lux group-hoverable:scale-[1.04]"
            />
          </div>

          <div className="lg:col-span-3">
            <p className="text-micro font-sans uppercase text-white/40">{item.category}</p>
            <h3 className="mt-2 font-serif text-title text-white transition-colors duration-400 group-hoverable:text-beige">
              {item.model}
            </h3>
            <p className="mt-[clamp(0.6rem,1.5vw,1rem)] max-w-measure font-sans text-body text-white/50">
              {item.missions[0]}
            </p>

            {/* A standing affordance rather than a hover one: on touch there is
                no hover, so without this the row gives no sign it opens. */}
            <Link to={`/fleet/${item.id}`} className="relative z-20 mt-flow inline-flex transition-opacity duration-300 active:opacity-50">
              <CardAction label="View specification" />
            </Link>
          </div>


          <dl className="grid grid-cols-2 gap-x-[clamp(1rem,2vw,1.5rem)] gap-y-[clamp(0.6rem,1.5vw,0.9rem)] lg:col-span-3">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="text-micro font-sans uppercase text-white/35">{s.label}</dt>
                <dd className="mt-1 font-sans tabular-nums text-white/85 text-[clamp(0.8rem,0.72rem+0.35vw,0.95rem)]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </Reveal>
  );
}

export default function Fleet() {
  const indexRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useCatalogFilter(categories, 'category', 'All');

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: aircraft.length };
    aircraft.forEach((a) => {
      map[a.category] = (map[a.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? aircraft : aircraft.filter((a) => a.category === activeCategory)),
    [activeCategory]
  );

  const figures = useMemo(
    () => [
      { value: aircraft.length, label: 'Aircraft in fleet' },
      { value: categories.length - 1, label: 'Cabin classes' },
      { value: Math.max(...aircraft.map((a) => a.passengers)), label: 'Maximum seats' },
      {
        value: Math.max(...aircraft.map((a) => a.rangeNm)),
        suffix: ' nm',
        label: 'Longest range',
        note: 'Non-stop, still air',
      },
    ],
    []
  );

  const chooseCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    const target = indexRef.current;
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = window.__lenis;

    if (lenis) lenis.scrollTo(top, reducedMotion ? { immediate: true } : { duration: 0.9 });
    else window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <PageWrapper>
      <MetaTags
        title="Aircraft Fleet"
        description="Light jets through ultra-long-range aircraft, each maintained to a single standard. Compare cabins, range and seating across the Solara fleet."
        canonical="/fleet"
      />

      <PageHero
        eyebrow="The Fleet"
        title={['Aircraft chosen', 'for the journey']}
        accent={[1]}
        lead="Every aircraft we operate is selected for one reason: it is the right one for a particular kind of flight. Nothing in the fleet exists to fill a gap in a brochure."
        image="/images/fleet/global7500.jpg"
        imageAlt="Private jet on the apron at dusk"
        meta={[
          { label: 'Aircraft', value: String(aircraft.length) },
          { label: 'Cabin classes', value: String(categories.length - 1) },
          { label: 'Availability', value: '24/7' },
        ]}
        
      />

      <Section>
        <SectionIntro
          index="01"
          eyebrow="How to choose"
          title={['Start with the', 'journey, not the', 'aircraft']}
          accent={[2]}
          lead="Cabin class is a consequence of distance, not a matter of taste. Tell us how far you are going and the shortlist writes itself."
        />

        <div className="grid gap-stack md:grid-cols-3">
          {MISSION_GUIDES.map((g, i) => (
            <Reveal key={g.category} from="up" distance={28} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => chooseCategory(g.category)}
                aria-pressed={activeCategory === g.category}
                aria-controls="fleet-results"
                className={`group flex h-full w-full flex-col border p-[clamp(1.25rem,2.5vw,1.75rem)] text-left transition-[border-color,background-color,transform] duration-400 active:scale-[0.99] ${
                  activeCategory === g.category
                    ? 'border-beige/50 bg-white/[0.055]'
                    : 'border-white/[0.12] bg-white/[0.02] hoverable:border-beige/45 hoverable:bg-white/[0.045]'
                }`}
              >
                <p className="text-micro font-sans uppercase text-beige/80">{g.duration}</p>
                <h3 className="mt-[clamp(0.6rem,1.5vw,1rem)] font-serif text-white text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)] transition-colors duration-400 group-hoverable:text-beige">
                  {g.title}
                </h3>
                <p className="mt-[clamp(0.5rem,1.2vw,0.85rem)] font-sans text-body text-white/50">{g.body}</p>
                <span className="mt-auto pt-[clamp(1.25rem,2.5vw,1.75rem)]">
                  <CardAction
                    label={activeCategory === g.category ? `${g.category} selected` : `Show ${g.category}`}
                    direction="down"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="fleet" divided>
        <div ref={indexRef} className="scroll-mt-[clamp(5rem,10vw,7rem)]">
          <SectionIntro
            index="02"
            eyebrow="The index"
            title={['Eight aircraft,', 'one standard']}
            accent={[1]}
            lead="Filter by cabin class, or read the whole list. Every aircraft is maintained, crewed and inspected to the same specification regardless of size."
          />

          <CatalogFilter
            label="Filter by cabin class"
            options={categories}
            value={activeCategory}
            counts={counts}
            controls="fleet-results"
            onChange={setActiveCategory}
            resultLabel={() => 'aircraft'}
          />

          {/* keyed on the filter so the rows re-run their reveal after a change */}
          <div id="fleet-results" key={activeCategory} className="border-b border-white/[0.09]">
            {filtered.map((item, i) => (
              <AircraftRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <Section compact>
        <FigureStrip figures={figures} />
      </Section>

      <Section divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="03"
            eyebrow="Maintenance"
            title={['Inspected beyond', 'the requirement']}
            accent={[1]}
            body="Every airframe follows the manufacturer's programme in full, then a second internal schedule on top of it. Records are held for the life of the aircraft and are available to any client who asks to see them."
            points={[
              'Manufacturer-authorised service centres only',
              'Two independent safety audits per year',
              'Full maintenance history available on request',
            ]}
            image="/images/fleet/challenger350.jpg"
            imageAlt="Aircraft undergoing maintenance in a hangar"
            cta={{ label: 'Safety standards', to: '/safety' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="Cabins"
            title={['Configured for', 'how you travel']}
            accent={[1]}
            reverse
            body="Seating, catering, connectivity and cabin temperature are set before you board, from preferences held on your account. On aircraft with berthing, beds are made up during the turnaround rather than in flight."
            points={[
              'Preferences carried across every booking',
              'High-speed connectivity fleet-wide',
              'Full berthing on heavy and ultra-long-range cabins',
            ]}
            image="/images/fleet/g650.jpg"
            imageAlt="Private jet cabin interior"
            cta={{ label: 'The onboard experience', to: '/experience' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Availability"
        title={['Tell us the route.', 'We will name', 'the aircraft.']}
        accent={[2]}
        lead="Send us where you are going and when. You will have aircraft options, with pricing, within two hours."
        image="/images/fleet/latitude.jpg"
      />
    </PageWrapper>
  );
}
