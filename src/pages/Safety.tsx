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
import { pillars, accreditations } from '../data/safety';

export default function Safety() {
  return (
    <PageWrapper>
      <MetaTags
        title="Safety Standards"
        description="Independently audited operators, two type-rated pilots on every sector, manufacturer maintenance programmes, and flights watched from the ground gate to gate."
        canonical="/safety"
      />

      <PageHero
        eyebrow="Safety"
        title={['The part we', 'will not', 'compete on']}
        accent={[2]}
        lead="Price, aircraft and service are all open to discussion. What follows is not, and we would rather lose a booking than move on any of it."
        image="/images/safety_runway_hero.jpg"
        imageAlt="Aircraft on a runway at dusk"
        meta={[
          { label: 'Audits', value: 'Independent' },
          { label: 'Pilots', value: 'Two, type-rated' },
          { label: 'Monitoring', value: 'Gate to gate' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'standard', label: 'The standard' },
          { id: 'pillars', label: 'Four pillars' },
          { id: 'accreditation', label: 'Accreditation' },
          { id: 'operations', label: 'Operations' },
        ]}
      />

      <Section id="standard">
        <SectionIntro
          index="01"
          eyebrow="The standard"
          title={['Legal is the', 'floor, not', 'the target']}
          accent={[1]}
          lead="Every operator flying commercially holds a certificate. That is the minimum the law allows, not a standard worth advertising. What matters is what an independent auditor finds when they arrive unannounced."
        />

        <FigureStrip
          figures={[
            { value: 2, label: 'Pilots per sector', note: 'Whatever the aircraft size' },
            { value: 5000, suffix: '+', label: 'Captain flight hours', note: 'Minimum total time' },
            { value: 2, suffix: '×', label: 'Simulator training', note: 'Per pilot, per year' },
            { value: 24, suffix: '/7', label: 'Operations desk', note: 'Staffed, not on call' },
          ]}
        />
      </Section>

      <Section id="pillars" divided>
        <SectionIntro
          index="02"
          eyebrow="Four pillars"
          title={['What we', 'actually', 'check']}
          accent={[2]}
          lead="Safety language is easy to write and hard to verify. These are the four areas where a claim can be tested, and where we expect you to test ours."
        />

        <ProofGrid items={pillars} columns={2} />
      </Section>

      <Section id="accreditation" divided>
        <SectionIntro
          index="03"
          eyebrow="Accreditation"
          title={['Who checks', 'the checkers']}
          accent={[1]}
          lead="Each of these is issued by a body with no commercial interest in us, and each can be verified directly with the issuer rather than taken on our word."
        />

        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
          <Reveal from="fade" className="overflow-hidden lg:col-span-6">
            <img
              src="/images/fleet/challenger350.jpg"
              alt="Aircraft undergoing pre-flight checks"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          <Reveal from="up" distance={26} className="lg:col-span-6">
            <SpecTable specs={accreditations} columns={1} />
            <p className="mt-block max-w-measure font-sans text-body text-white/40">
              Certificates and current audit reports are issued on request, before
              you book rather than after.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="operations" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="04"
            eyebrow="In the air"
            title={['Watched from', 'the ground,', 'gate to gate']}
            accent={[2]}
            body="A dispatcher is assigned to every flight and stays with it from pushback to shutdown. Weather ahead, airspace closures and diversion options are reviewed continuously, and the crew can reach that person directly at any point in the sector."
            points={[
              'Named dispatcher per flight, not a shared queue',
              'Diversion airports identified before departure',
              'Position shared with your security team on request',
            ]}
            image="/images/hero_clouds_wing.jpg"
            imageAlt="Wing above a cloud layer"
            cta={{ label: 'See the fleet', to: '/fleet' }}
          />

          <EditorialSplit
            index="05"
            eyebrow="When to say no"
            title={['The flight', 'we decline']}
            accent={[1]}
            reverse
            body="Weather, crew hours and technical status occasionally make a flight inadvisable rather than impossible. In those cases we say so and offer an alternative. A client who is delayed will fly with us again; the alternative does not bear writing down."
            points={[
              'Crew have absolute authority to refuse a sector',
              'No commercial pressure applied to a go decision',
              'Alternatives offered before you have to ask',
            ]}
            image="/images/safety_runway_hero.jpg"
            imageAlt="Runway lights in poor visibility"
            cta={{ label: 'Speak to operations', to: '/contact' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Verification"
        title={['Ask us for', 'the audit', 'reports.']}
        accent={[2]}
        lead="Operator certificates, current audit findings and insurance certificates are sent on request. Most clients never ask. The ones who do tend to stay."
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'Speak to operations', to: '/contact' }}
        image="/images/fleet/challenger350.jpg"
      />
    </PageWrapper>
  );
}
