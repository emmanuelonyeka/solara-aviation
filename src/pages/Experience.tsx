import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import {
  Section,
  SectionIntro,
  PageHero,
  EditorialSplit,
  FigureStrip,
  CTABand,
  PageChapterNav,
  ProofGrid,
} from '../components/section';
import { details } from '../data/experience';

export default function Experience() {
  return (
    <PageWrapper>
      <MetaTags
        title="The Onboard Experience"
        description="What the flight itself is like: cabin altitude and quiet, catering built around the sector, connectivity, and a cabin configured before you board."
        canonical="/experience"
      />

      <PageHero
        eyebrow="Onboard"
        title={['What the', 'flight is', 'actually like']}
        accent={[2]}
        lead="Everything on this page happens between the door closing and opening again. What we arrange on the ground is a separate discipline, and it has its own page."
        image="/images/experience/cabin.jpg"
        imageAlt="Private jet cabin interior in warm light"
        meta={[
          { label: 'Cabin altitude', value: 'From 6,000 ft' },
          { label: 'Connectivity', value: 'Fleet-wide' },
          { label: 'Crew', value: 'Two minimum' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'measure', label: 'The measure' },
          { id: 'cabin-service', label: 'Cabin and service' },
          { id: 'details', label: 'Small details' },
        ]}
      />

      <Section id="measure">
        <SectionIntro
          index="01"
          eyebrow="The measure"
          title={['Comfort is a', 'specification,', 'not a mood']}
          accent={[1]}
          lead="Most of what makes a long flight bearable can be measured — cabin pressure, sound level, humidity, how flat the bed actually goes. We publish the numbers because they are the part that does the work."
        />

        <FigureStrip
          figures={[
            { value: 6000, suffix: ' ft', label: 'Lowest cabin altitude', note: 'Long-range cabins; higher on light jets' },
            { value: 100, suffix: '%', label: 'Fleet with connectivity' },
            { value: 4, suffix: ' hrs', label: 'Catering notice', note: 'For a bespoke menu' },
            { value: 2, label: 'Crew minimum', note: 'Every cabin, every sector' },
          ]}
        />
      </Section>

      <Section id="cabin-service" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="02"
            eyebrow="The cabin"
            title={['A room that', 'happens to be', 'in the air']}
            accent={[2]}
            body="Seating is arranged for what you are doing, not for how many people can be fitted in. A facing four for a working sector, a divan for a night flight, and a table that documents can stay open on through the descent."
            points={[
              'Configured on the ground from your preferences',
              'Full berthing on heavy and ultra-long-range cabins',
              'Lighting shifted through the flight on long sectors',
            ]}
            image="/images/experience/cabin.jpg"
            imageAlt="Cabin seating configured around a table"
            cta={{ label: 'Compare cabins', to: '/fleet' }}
          />

          <EditorialSplit
            index="03"
            eyebrow="Catering"
            title={['Built for the', 'sector, not', 'the galley']}
            accent={[2]}
            reverse
            body="A ninety-minute hop and a ten-hour crossing are not the same meal problem. Menus are set against the sector length, the departure time and what you are doing when you land — then sourced from restaurants at the departure city rather than an airline kitchen."
            points={[
              'Sourced locally at the departure airport',
              'Any dietary requirement, without a surcharge',
              'Service timed around sleep on overnight sectors',
            ]}
            image="/images/fleet/g650.jpg"
            imageAlt="Cabin table set for dining"
            cta={{ label: 'Ground arrangements', to: '/concierge' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="Connectivity"
            title={['Reachable, or', 'entirely not']}
            accent={[1]}
            body="High-speed connectivity across the whole fleet, with power at every seat and a satellite phone as a fallback over open water. The point is not that you must work — it is that going quiet is a decision rather than a limitation."
            points={[
              'Video calls held reliably above the weather',
              'Power at every seat, no adaptors needed',
              'Satellite voice where data cannot reach',
            ]}
            image="/images/hero_clouds_wing.jpg"
            imageAlt="Wing above a cloud layer at altitude"
            cta={{ label: 'See the fleet', to: '/fleet' }}
          />
        </div>
      </Section>

      <Section id="details" divided>
        <SectionIntro
          index="05"
          eyebrow="Detail"
          title={['The things', 'nobody', 'advertises']}
          accent={[2]}
          lead="Small decisions that make a disproportionate difference, and that most operators leave you to discover for yourself."
        />

        <ProofGrid items={details} columns={3} />
      </Section>

      <CTABand
        eyebrow="Onboard"
        title={['Tell us how', 'you want to', 'arrive.']}
        accent={[2]}
        lead="Rested, fed, and ready for the meeting — or left completely alone for nine hours. Both are configurations, and both are set before you board."
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'Ground arrangements', to: '/concierge' }}
        image="/images/experience/cabin.jpg"
      />
    </PageWrapper>
  );
}
