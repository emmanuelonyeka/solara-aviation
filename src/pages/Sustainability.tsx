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
import { commitments, positions } from '../data/sustainability';
import { emptyLegs } from '../data/emptyLegs';

export default function Sustainability() {
  return (
    <PageWrapper>
      <MetaTags
        title="Sustainability"
        description="Sustainable aviation fuel where it can be sourced, verified offsetting on every flight, fewer empty miles, and emissions reported per flight rather than averaged."
        canonical="/sustainability"
      />

      <PageHero
        eyebrow="Sustainability"
        title={['Private flight', 'is carbon', 'intensive.', 'So is the', 'honesty.']}
        accent={[4]}
        lead="Nothing on this page will claim otherwise. What follows is what we actually do about it, what it does and does not achieve, and how you can check the numbers."
        image="/images/sustainability/saf-refuelling.webp"
        imageAlt="Private jet being refuelled with sustainable aviation fuel"
        meta={[
          { label: 'Offsetting', value: 'Every flight' },
          { label: 'SAF', value: 'Where sourced' },
          { label: 'Reporting', value: 'Per flight' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'position', label: 'Our position' },
          { id: 'commitments', label: 'Commitments' },
          { id: 'impact', label: 'Measured impact' },
          { id: 'reporting', label: 'Reporting' },
        ]}
      />

      <Section id="position">
        <SectionIntro
          index="01"
          eyebrow="The position"
          title={['What we will', 'and will not', 'claim']}
          accent={[2]}
          lead="Aviation environmental language is unusually loose. These four lines are the ones we hold to, and the first two are as important as the second two."
        />

        <Reveal from="up" distance={26}>
          <SpecTable specs={positions} columns={1} />
        </Reveal>
      </Section>

      <Section id="commitments" divided>
        <SectionIntro
          index="02"
          eyebrow="What we do"
          title={['Four things', 'that measurably', 'reduce it']}
          accent={[2]}
          lead="Ordered by how much difference each actually makes, rather than by how well it reads in a brochure."
        />

        <ProofGrid items={commitments} columns={2} /> 
      </Section>

      <Section id="impact" compact>
        <FigureStrip
          figures={[
            { value: 100, suffix: '%', label: 'Flights offset', note: 'Verified registries only' },
            { value: 4, label: 'Reports per year', note: 'Corporate accounts' },
            { value: emptyLegs.length, label: 'Empty legs published', note: 'Currently available to book' },
            { value: 0, label: 'Neutrality claimed', note: 'Because it would not be true' },
          ]}
        />
      </Section>

      <Section id="reporting" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="03"
            eyebrow="Empty legs"
            title={['The reduction', 'that costs you', 'less, not more']}
            accent={[2]}
            body="A repositioning flight burns the same fuel whether anyone is aboard or not. Filling those legs is the largest single reduction available to a charter operator, and unusually it is one where the environmental interest and the client's interest point the same way."
            points={[
              'Every known leg published rather than flown empty',
              'Routings planned to reduce positioning between bookings',
              'Aircraft matched to the trip, not to whichever is nearest',
            ]}
            image="/images/sustainability/efficient-repositioning.webp"
            imageAlt="Operations team planning an efficient aircraft repositioning route"
            cta={{ label: 'See available legs', to: '/empty-legs' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="Reporting"
            title={['Numbers open', 'to challenge']}
            accent={[1]}
            reverse
            body="Emissions are calculated per flight on a published methodology and issued with the invoice, not compiled once a year into a summary nobody can check. Corporate accounts receive a quarterly breakdown by cost centre."
            points={[
              'Per-flight figure on every invoice',
              'Quarterly breakdown by cost centre',
              'Methodology published, and we will defend it',
            ]}
            image="/images/sustainability/emissions-report.webp"
            imageAlt="Client reviewing a per-flight emissions report"
            cta={{ label: 'Corporate accounts', to: '/corporate' }}
          />
        </div>
      </Section>

      <CTABand
        eyebrow="Sustainability"
        title={['Ask us for', 'the numbers', 'on your', 'own flying.']}
        accent={[3]}
        lead="Send us a year of your travel and we will return the emissions figure, the offset cost, and where SAF could have been sourced on those routes."
        primary={{ label: 'Request a report', to: '/contact' }}
        secondary={{ label: 'Empty legs', to: '/empty-legs' }}
        image="/images/hero_clouds_wing.jpg"
      />
    </PageWrapper>
  );
}
