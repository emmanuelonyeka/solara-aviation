import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import {
  Section,
  SectionIntro,
  PageHero,
  EditorialSplit,
  SpecTable,
  FigureStrip,
  CTABand,
  PageChapterNav,
} from '../components/section';
import { partnerGroups, partnerStandards } from '../data/partners';

export default function Partners() {
  const totalPartners = partnerGroups.reduce((sum, g) => sum + g.partners.length, 0);

  return (
    <PageWrapper>
      <MetaTags
        title="Partners"
        description="The hotels, chauffeur fleets, yacht operators and security firms we work with, how they are vetted, and why we never take a commission for steering you to one."
        canonical="/partners"
      />

      <PageHero
        eyebrow="Partners"
        title={['The names', 'behind the', 'other ninety', 'hours']}
        accent={[2]}
        lead="A flight is a small part of a trip. These are the people who handle the rest of it, chosen the same way we choose an operator — and dropped the same way too."
        image="/images/journey_island.jpg"
        imageAlt="Coastal villa above a bay"
        meta={[
          { label: 'Partners', value: String(totalPartners) },
          { label: 'Categories', value: String(partnerGroups.length) },
          { label: 'Commission', value: 'None taken' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'standards', label: 'Standards' },
          { id: 'network', label: 'The network' },
          { id: 'proof', label: 'Network proof' },
          { id: 'selection', label: 'Selection' },
        ]}
      />

      <Section id="standards">
        <SectionIntro
          index="01"
          eyebrow="The standard"
          title={['Vetted like', 'an operator,', 'not a supplier']}
          accent={[1]}
          lead="A partner failing you is indistinguishable from us failing you. They are held to the same terms, checked on the same schedule, and removed on the same grounds."
        />

        <Reveal from="up" distance={26}>
          <SpecTable specs={partnerStandards} columns={1} />
        </Reveal>
      </Section>

      <Section id="network" divided>
        <SectionIntro
          index="02"
          eyebrow="The network"
          title={['Who we', 'actually', 'call']}
          accent={[2]}
          lead="Grouped by what they do for a trip rather than by contract type, because that is how anyone actually looks for them."
        />

        <div className="space-y-[clamp(2.5rem,5vw,4rem)]">
          {partnerGroups.map((group, gi) => (
            <Reveal key={group.category} from="up" distance={28} delay={gi * 0.05}>
              <div className="grid gap-[clamp(1.25rem,3vw,2.5rem)] border-t border-white/[0.14] pt-block lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="text-micro font-sans tabular-nums text-beige/70">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-flow font-serif text-white text-[clamp(1.25rem,1rem+1vw,1.7rem)]">
                    {group.category}
                  </h3>
                  <p className="mt-block max-w-measure font-sans text-body text-white/45">
                    {group.intro}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  {group.partners.map((p) => (
                    <div
                      key={p.name}
                      className="grid gap-1.5 border-b border-white/[0.09] py-[clamp(0.7rem,1.6vw,1.05rem)] first:border-t first:border-white/[0.09] min-[480px]:grid-cols-[clamp(7rem,28vw,13rem)_1fr] min-[480px]:items-baseline min-[480px]:gap-x-[clamp(0.75rem,2vw,1.5rem)]"
                    >
                      <p className="font-serif text-white text-[clamp(0.95rem,0.85rem+0.4vw,1.15rem)]">
                        {p.name}
                      </p>
                      <p className="font-sans text-body text-white/45">{p.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="proof" compact>
        <FigureStrip
          figures={[
            { value: totalPartners, label: 'Partners in the network' },
            { value: partnerGroups.length, label: 'Categories' },
            { value: 0, suffix: '%', label: 'Commission taken', note: 'On any recommendation' },
            { value: 0, label: 'Serious failures tolerated', note: 'The relationship ends immediately' },
          ]}
        />
      </Section>

      <Section id="selection" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="03"
            eyebrow="No commission"
            title={['We are not', 'paid to', 'recommend']}
            accent={[1]}
            body="Most travel businesses take a margin on what they book for you, which quietly decides which hotel you are shown first. We take nothing from any partner on this page. The recommendation you get is the one we would give a friend."
            points={[
              'No referral fee on any partner booking',
              'Rates negotiated for you, not shared with us',
              'We will name a partner we do not work with if they fit better',
            ]}
            image="/images/journey_city.jpg"
            imageAlt="City skyline at dusk"
            cta={{ label: 'Concierge services', to: '/concierge' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="Working with us"
            title={['If you would', 'like to be', 'on this page']}
            accent={[2]}
            reverse
            body="We add partners rarely and usually because a client asked for something we could not source well. If you operate at this level in a market we serve, the conversation starts with what you would do when something goes wrong at midnight."
            points={[
              'Insurance, licensing and history checked before first use',
              'Same confidentiality terms we hold ourselves to',
              'Reviewed annually, not signed and forgotten',
            ]}
            image="/images/journey_mountain.jpg"
            imageAlt="Mountain retreat at dusk"
            cta={{ label: 'Get in touch', to: '/contact' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Partners"
        title={['Tell us what', 'the trip', 'needs.']}
        accent={[2]}
        lead="The right partner depends on the destination, the dates and what the trip is for. Describe it and we will put the right names forward — including ones that are not on this page."
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'Speak to the desk', to: '/contact' }}
        image="/images/journey_island.jpg"
      />
    </PageWrapper>
  );
}