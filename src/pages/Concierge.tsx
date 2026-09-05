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
import { services } from '../data/concierge';

export default function Concierge() {
  return (
    <PageWrapper>
      <MetaTags
        title="Concierge"
        description="Everything arranged around the flight: ground transport, residences, reservations, security, visas and provisioning — handled before you land."
        canonical="/concierge"
      />

      <PageHero
        eyebrow="Concierge"
        title={['The half of', 'the journey', 'that is not', 'the flight']}
        accent={[3]}
        lead="A flight is three hours of a trip that lasts four days. This page is about the other ninety hours — and it is the part most operators hand back to you at the aircraft door."
        image="/images/journey_island.jpg"
        imageAlt="Coastal villa above a bay"
        meta={[
          { label: 'Desk', value: '24/7' },
          { label: 'Countries', value: '60+' },
          { label: 'Requests', value: 'No standing list' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'services', label: 'Services' },
          { id: 'proof', label: 'Coverage' },
          { id: 'coordination', label: 'Coordination' },
        ]}
      />

      <Section id="services">
        <SectionIntro
          index="01"
          eyebrow="Scope"
          title={['Six things we', 'are asked for', 'most often']}
          accent={[1]}
          lead="Not a menu. These are simply the requests that recur — anything outside them is handled the same way, which is to say it is handled."
        />

        <ProofGrid items={services} columns={3} />
      </Section>

      <Section id="proof" compact>
        <FigureStrip
          figures={[
            { value: 24, suffix: '/7', label: 'Desk staffed', note: 'Not an answering service' },
            { value: 60, suffix: '+', label: 'Countries covered' },
            { value: 1, label: 'Point of contact', note: 'Who already knows the trip' },
            { value: 2, suffix: ' hrs', label: 'Typical response', note: 'Faster when airborne' },
          ]}
        />
      </Section>

      <Section id="coordination" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="02"
            eyebrow="On the ground"
            title={['The car meets', 'the aircraft']}
            accent={[1]}
            body="Not the terminal, not the kerb. The vehicle is on the apron as the steps come down, bags go from hold to boot without passing through a building, and the driver already has the address. Where a destination warrants it, protection travels with the vehicle."
            points={[
              'Positioned airside at the aircraft steps',
              'Driver briefed on the route before you land',
              'Helicopter transfer where the road adds an hour',
            ]}
            image="/images/journey_city.jpg"
            imageAlt="Car waiting on an airport apron"
            cta={{ label: 'Destinations', to: '/destinations' }}
          />

          <EditorialSplit
            index="03"
            eyebrow="Access"
            title={['Doors that are', 'officially', 'closed']}
            accent={[2]}
            reverse
            body="A table at eight on a Friday, a private viewing before opening, seats at something that sold out in March. These come from relationships held over years rather than from a platform, which is also why we will tell you plainly when something genuinely cannot be done."
            points={[
              'Restaurants at short notice in every major city',
              'Private viewings and out-of-hours access',
              'Held allocations at events that publish none',
            ]}
            image="/images/journey_mountain.jpg"
            imageAlt="Mountain retreat at dusk"
            cta={{ label: 'Membership', to: '/membership' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="Discretion"
            title={['Nothing leaves', 'the team', 'handling it']}
            accent={[1]}
            body="Manifests are not shared, itineraries are not discussed outside the handful of people arranging them, and no aspect of your travel appears in a marketing case study. Private terminals mean you are never processed alongside anyone who might recognise you."
            points={[
              'Manifests never released to third parties',
              'Private terminal access at both ends',
              'Close protection arranged where required',
            ]}
            image="/images/safety_runway_hero.jpg"
            imageAlt="Aircraft on a runway at dusk"
            cta={{ label: 'Safety standards', to: '/safety' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Concierge"
        title={['Ask for', 'something', 'difficult.']}
        accent={[2]}
        lead="The desk is staffed at every hour, in every timezone we fly to. Tell us what the trip actually needs and we will tell you honestly whether it can be done."
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'Speak to the desk', to: '/contact' }}
        image="/images/journey_island.jpg"
      />
    </PageWrapper>
  );
}
