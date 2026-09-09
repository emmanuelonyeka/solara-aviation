import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import {
  Section,
  SectionIntro,
  PageHero,
  EditorialSplit,
  FigureStrip,
  CTABand,
  CardAction,
  PageChapterNav,
} from '../components/section';

import { emptyLegs, type EmptyLeg } from '../data/emptyLegs';

function LegRow({ leg, index }: { leg: EmptyLeg; index: number }) {
  return (
    <Reveal from="up" distance={26}>
      <Link
        to={`/quote?route=${leg.fromCode}-${leg.toCode}`}
        className="group grid gap-[clamp(1rem,2.5vw,2rem)] border-b border-white/[0.09] py-[clamp(1.5rem,3.5vw,2.5rem)] lg:grid-cols-12 lg:items-center"
      >
        <span className="text-micro font-sans tabular-nums text-beige/70 lg:col-span-1">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-[clamp(1rem,3vw,2rem)] lg:col-span-5">
          <div>
            <p className="font-serif text-white text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)]">
              {leg.fromCity}
            </p>
            <p className="mt-1 text-micro font-sans tabular-nums text-white/35">{leg.fromCode}</p>
          </div>

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-white/20 transition-colors duration-400 group-hoverable:bg-beige/60"
          />

          <div>
            <p className="font-serif text-white text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)]">
              {leg.toCity}
            </p>
            <p className="mt-1 text-micro font-sans tabular-nums text-white/35">{leg.toCode}</p>
          </div>
        </div>

        <dl className="grid min-w-0 grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)] sm:grid-cols-3 lg:col-span-4">
          <div>
            <dt className="text-micro font-sans uppercase text-white/35">Window</dt>
            <dd className="mt-1 font-sans text-body text-white/75">{leg.window}</dd>
          </div>
          <div>
            <dt className="text-micro font-sans uppercase text-white/35">Aircraft</dt>
            <dd className="mt-1 font-sans text-body text-white/75">{leg.aircraft}</dd>
          </div>
          <div>
            <dt className="text-micro font-sans uppercase text-white/35">Seats</dt>
            <dd className="mt-1 font-sans tabular-nums text-body text-white/75">{leg.seats}</dd>
          </div>
        </dl>

        <div className="lg:col-span-2 lg:text-right">
          <p className="font-serif tabular-nums text-beige text-[clamp(1.3rem,1.05rem+1.1vw,1.85rem)]">
            −{leg.saving}%
          </p>
          <span className="mt-2 block lg:flex lg:justify-end">
            <CardAction label="Enquire" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function EmptyLegPage() {
  const bestSaving = Math.max(...emptyLegs.map((l) => l.saving));
  const mostSeats = Math.max(...emptyLegs.map((l) => l.seats));

  return (
    <PageWrapper>
      <MetaTags
        title="Empty Leg Flights"
        description="Repositioning flights at a fraction of the charter rate. Current availability, the aircraft flying it, and what flexibility each one asks of you."
        canonical="/empty-legs"
      />

      <PageHero
        eyebrow="Empty Legs"
        title={['The same', 'aircraft, for', 'far less']}
        accent={[2]}
        lead="An aircraft repositioning for its next booking flies the route anyway. If your journey happens to match it, you fly a private jet for a fraction of what chartering it would cost."
        image="/images/empty-legs/repositioning.webp"
        imageAlt="Private jet repositioning at sunset"
        meta={[
          { label: 'Available now', value: String(emptyLegs.length) },
          { label: 'Best saving', value: `${bestSaving}%` },
          { label: 'Largest cabin', value: `${mostSeats} seats` },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'how-it-works', label: 'How it works' },
          { id: 'available', label: 'Available legs' },
          { id: 'terms', label: 'The trade-off' },
        ]}
      />

      <Section id="how-it-works">
        <SectionIntro
          index="01"
          eyebrow="What this is"
          title={['A flight that', 'is happening', 'either way']}
          accent={[2]}
          lead="Aircraft rarely finish where they started. After dropping passengers, one has to return to base or move on to its next booking — and on that leg it flies empty. Selling those seats costs us nothing we were not already spending."
        />

        <FigureStrip
          figures={[
            { value: bestSaving, suffix: '%', label: 'Largest current saving' },
            { value: emptyLegs.length, label: 'Legs available now' },
            { value: mostSeats, label: 'Largest cabin' },
            { value: 2, suffix: ' hrs', label: 'Confirmation', note: 'From enquiry to hold' },
          ]}
        />
      </Section>

      <Section id="available" divided>
        <SectionIntro
          index="02"
          eyebrow="Available now"
          title={['Current', 'repositioning', 'flights']}
          accent={[2]}
          lead="Availability moves daily and legs are released as soon as they are known. If nothing here matches, tell us your route and we will alert you when one does."
        />

        <div className="border-t border-white/[0.09]">
          {emptyLegs.map((leg, i) => (
            <LegRow key={leg.id} leg={leg} index={i} />
          ))}
        </div>

        <Reveal from="up" distance={22} className="mb-stack">
          <p className="max-w-measure font-sans text-body text-white/45">
            Legs are shown as windows rather than fixed departures because the
            aircraft moves when its next booking requires it. The narrower your
            own window, the fewer legs will match.
          </p>
        </Reveal>
      </Section>

      <Section id="terms" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="03"
            eyebrow="The trade"
            title={['Flexibility is', 'the price']}
            accent={[1]}
            body="An empty leg is cheap because it is not yours to schedule. The aircraft departs when its next booking dictates, and if that booking changes, so does your flight. For a trip that must leave at nine on Thursday, charter it properly."
            points={[
              'Departure window, not a departure time',
              'Route is fixed — neither end can move',
              'Can be withdrawn if the owning booking changes',
            ]}
            image="/images/fleet/latitude.jpg"
            imageAlt="Private jet taxiing at dusk"
            cta={{ label: 'Charter instead', to: '/quote' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="First refusal"
            title={['Members see', 'them first']}
            accent={[1]}
            reverse
            body="Empty legs are offered to card holders and members before they are published here. On popular routes that is often the difference between taking one and reading about it."
            points={[
              'Notified the moment a leg is confirmed',
              'Held for 12 hours before public release',
              'Matched automatically against your usual routes',
            ]}
            image="/images/membership_window_hero.jpg"
            imageAlt="View from a private jet cabin window"
            cta={{ label: 'Compare programmes', to: '/membership' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="No match today"
        title={['Tell us your', 'route. We will', 'watch for it.']}
        accent={[2]}
        lead="Send the route and the window you could travel in, and we will contact you the moment a repositioning flight matches it."
        primary={{ label: 'Register a route', to: '/quote' }}
        secondary={{ label: 'Membership', to: '/membership' }}
        image="/images/closing_island_aerial.jpg"
      />
    </PageWrapper>
  );
}
