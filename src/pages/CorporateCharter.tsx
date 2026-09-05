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
  ProofGrid,
} from '../components/section';
import { benefits, accountFeatures } from '../data/corporate';

export default function CorporateCharter() {
  return (
    <PageWrapper>
      <MetaTags
        title="Corporate Charter"
        description="Private aviation for companies: volume agreements, consolidated billing, authorised bookers and evidenced duty of care for executive travel."
        canonical="/corporate"
      />

      <PageHero
        eyebrow="Corporate"
        title={['Travel that', 'returns the', 'day to you']}
        accent={[2]}
        lead="For a team of four, the argument is rarely about comfort. It is about how many working hours a scheduled itinerary quietly removes from the week."
        image="/images/journey_city.jpg"
        imageAlt="City skyline at dusk"
        meta={[
          { label: 'Billing', value: 'Monthly, consolidated' },
          { label: 'Booking', value: 'Authorised staff' },
          { label: 'Reporting', value: 'Quarterly' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'business-case', label: 'Business case' },
          { id: 'benefits', label: 'What changes' },
          { id: 'account', label: 'The account' },
          { id: 'operations', label: 'Operations' },
        ]}
      />

      <Section id="business-case">
        <SectionIntro
          index="01"
          eyebrow="The case"
          title={['Count the hours,', 'not the fare']}
          accent={[1]}
          lead="A commercial return between two European cities costs a senior team most of two days once transfers, security and connections are counted. The comparison that matters is against those hours, not against a seat price."
        />

        <FigureStrip
          figures={[
            { value: 15, suffix: ' min', label: 'Boarding window', note: 'From arrival at the terminal' },
            { value: 3, label: 'Cities in a day', note: 'A routine itinerary' },
            { value: 5000, suffix: '+', label: 'Airports reachable', note: 'Worldwide' },
            { value: 1, label: 'Named account manager', note: 'Reachable directly' },
          ]}
        />
      </Section>

      <Section id="benefits" divided>
        <SectionIntro
          index="02"
          eyebrow="What changes"
          title={['Three things', 'a finance', 'director asks']}
          accent={[2]}
          lead="Not comfort, not prestige. Time recovered, work done in transit, and whether the risk is documented."
        />

        <ProofGrid items={benefits} columns={3} />
      </Section>

      <Section id="account" divided>
        <SectionIntro
          index="03"
          eyebrow="The account"
          title={['Built for a', 'finance team,', 'not a traveller']}
          accent={[2]}
          lead="An ad-hoc charter is a purchase. A corporate account is a supplier relationship, and it has to survive contact with procurement, expenses and audit."
        />

        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
          <Reveal from="fade" className="overflow-hidden lg:col-span-7">
            <img
              src="/images/fleet/challenger350.jpg"
              alt="Executive aircraft on the apron"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          <Reveal from="up" distance={26} className="lg:col-span-5">
            <p className="mb-[clamp(1rem,2vw,1.5rem)] text-micro font-sans uppercase text-white/40">
              What an account includes
            </p>
            <SpecTable specs={accountFeatures} columns={1} />
          </Reveal>
        </div>
      </Section>

      <Section id="operations" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="04"
            eyebrow="Group travel"
            title={['The whole team,', 'one aircraft']}
            accent={[1]}
            body="Moving a deal team, a board or a roadshow together removes the coordination problem entirely. Everyone arrives at the same time, briefed on the way, and leaves when the last meeting finishes rather than when the last seat was available."
            points={[
              'Cabins from 7 to 19 seats',
              'Single manifest, single arrival',
              'Itinerary changed in the air if the schedule slips',
            ]}
            image="/images/fleet/g650.jpg"
            imageAlt="Private jet cabin configured for a group"
            cta={{ label: 'See the fleet', to: '/fleet' }}
          />

          <EditorialSplit
            index="05"
            eyebrow="Reporting"
            title={['Numbers your', 'board will', 'ask for']}
            accent={[2]}
            reverse
            body="Spend, utilisation and emissions, broken down by cost centre and delivered quarterly without being requested. Most corporate accounts are renewed on the strength of that report rather than on the flying itself."
            points={[
              'Spend and utilisation per cost centre',
              'Emissions per flight and per quarter',
              'Booking patterns, with rate recommendations at renewal',
            ]}
            image="/images/journey_mountain.jpg"
            imageAlt="Aircraft above a mountain range"
            cta={{ label: 'Compare programmes', to: '/membership' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Corporate"
        title={['Send us a', 'quarter of', 'your travel.']}
        accent={[2]}
        lead="Give us one quarter of your existing itineraries and we will show you what the same schedule costs privately, and how many working hours it returns. No obligation and no account required."
        primary={{ label: 'Request a proposal', to: '/quote' }}
        secondary={{ label: 'Speak to the corporate team', to: '/contact' }}
        image="/images/journey_city.jpg"
      />
    </PageWrapper>
  );
}