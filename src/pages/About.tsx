import { useState } from 'react';
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
  PageChapterNav,
  ProofGrid,
} from '../components/section';
import { site } from '../config/site';
import { leadership, milestones, principles, type TeamMember } from '../data/about';

/**
 * Falls back to the initials lockup if the photo is missing or its path is
 * wrong. A broken image icon on a leadership page is worse than no photo, and
 * a buyer swapping these out should not be able to break the layout.
 */
function TeamCard({ person }: { person: TeamMember }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(person.photo) && !photoFailed;

  return (
    <div className="h-full">
      {showPhoto ? (
        <div className="overflow-hidden">
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] w-full items-center justify-center border border-white/[0.12] bg-white/[0.02]">
          <span className="font-serif text-beige/70 text-[clamp(2rem,1.5rem+2vw,3rem)]">
            {person.initials}
          </span>
        </div>
      )}

      <h3 className="mt-[clamp(0.85rem,2vw,1.25rem)] font-serif text-white text-[clamp(1.05rem,0.9rem+0.7vw,1.35rem)]">
        {person.name}
      </h3>
      <p className="mt-1.5 text-micro font-sans uppercase text-beige/70">{person.role}</p>
      <p className="mt-flow font-sans text-body text-white/45">
        {person.bio}
      </p>
    </div>
  );
}

export default function About() {
  const yearsOperating = new Date().getFullYear() - site.founded;

  return (
    <PageWrapper>
      <MetaTags
        title="About Solara"
        description="Founded by pilots in 2009. How we choose operators, how we quote, and the four principles we will not trade away for a booking."
        canonical="/about"
      />

      <PageHero
        eyebrow="About"
        title={['Founded by', 'people who', 'flew the', 'aircraft']}
        accent={[3]}
        lead="Solara was started by two airline captains who had spent a decade watching charter sold by people who had never operated it. That is still the difference, and it shows up in what we refuse as much as in what we offer."
        image="/images/journey_mountain.jpg"
        imageAlt="Aircraft above a mountain range"
        meta={[
          { label: 'Founded', value: String(site.founded) },
          { label: 'Operating', value: `${yearsOperating} years` },
          { label: 'Operators', value: 'Audited only' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'principles', label: 'Principles' },
          { id: 'history', label: 'History' },
          { id: 'leadership', label: 'Leadership' },
          { id: 'approach', label: 'Our approach' },
        ]}
      />

      <Section id="principles">
        <SectionIntro
          index="01"
          eyebrow="Principles"
          title={['Four things', 'we will not', 'trade away']}
          accent={[1]}
          lead="Not values on a wall. Each of these has cost us a booking at some point, which is the only real test of whether a principle is one."
        />

        <ProofGrid items={principles} columns={2} />
      </Section>

      <Section compact>
        <FigureStrip
          figures={[
            { value: yearsOperating, label: 'Years operating' },
            { value: 12000, suffix: '+', label: 'Flights completed' },
            { value: 180, suffix: '+', label: 'Destinations served' },
            { value: 98, suffix: '%', label: 'Client retention', note: 'Rolling twelve months' },
          ]}
        />
      </Section>

      <Section id="history" divided>
        <SectionIntro
          index="02"
          eyebrow="History"
          title={[`${yearsOperating} years,`, 'five decisions']}
          accent={[1]}
          lead="The moments that changed how the company works, rather than a list of awards."
        />

        <div className="border-t border-white/[0.09]">
          {milestones.map((m, i) => (
            <Reveal key={m.year} from="up" distance={24} delay={i * 0.05}>
              <div className="grid gap-block border-b border-white/[0.09] py-stack lg:grid-cols-12">
                <span className="font-serif tabular-nums text-beige text-[clamp(1.25rem,1rem+1vw,1.75rem)] lg:col-span-2">
                  {m.year}
                </span>
                <h3 className="font-serif text-white text-[clamp(1.15rem,0.95rem+0.9vw,1.5rem)] lg:col-span-4">
                  {m.title}
                </h3>
                <p className="max-w-measure font-sans text-body text-white/50 lg:col-span-6">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="leadership" divided>
        <SectionIntro
          index="03"
          eyebrow="Leadership"
          title={['The people', 'who answer']}
          accent={[1]}
          lead="A small team by design. Every name here is reachable by a client, and three of the four have held a commercial licence."
        />

        <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person, i) => (
            <Reveal key={person.name} from="up" distance={28} delay={(i % 4) * 0.07}>
              <TeamCard person={person} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="approach" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="04"
            eyebrow="How we choose"
            title={['A third of', 'the fleet,', 'ruled out']}
            accent={[2]}
            body="In 2013 we moved to using only independently audited operators. It removed roughly a third of the aircraft we could offer and made us more expensive than several competitors overnight. It remains the single decision that most defines the company."
            points={[
              'Audit status confirmed before an operator is ever used',
              'Re-checked at every renewal, not once at onboarding',
              'Operators removed from the network when a finding stands',
            ]}
            image="/images/fleet_hangar_hero.jpg"
            imageAlt="Aircraft in a maintenance hangar"
            cta={{ label: 'Safety standards', to: '/safety' }}
          />

          <EditorialSplit
            index="05"
            eyebrow="How we quote"
            title={['One number,', 'before you', 'commit']}
            accent={[2]}
            reverse
            body="Positioning, handling, catering, crew, overnight costs and de-icing are all in the figure you receive. Charter is notorious for quotes that grow between signature and invoice. If ours moves, it is because you changed the trip."
            points={[
              'Positioning and handling included, not itemised later',
              'Peak-date surcharges disclosed at quote, never after',
              'Invoice matches the quote unless the itinerary changed',
            ]}
            image="/images/journey_city.jpg"
            imageAlt="City skyline at dusk"
            cta={{ label: 'Request a quote', to: '/quote' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="About"
        title={['Ask us', 'something', 'awkward.']}
        accent={[2]}
        lead="Which operator is flying you, what their last audit found, and how our quote is built. Every one of those has an answer, and you can have it before you book."
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'Speak to us', to: '/contact' }}
        image="/images/journey_mountain.jpg"
      />
    </PageWrapper>
  );
}
