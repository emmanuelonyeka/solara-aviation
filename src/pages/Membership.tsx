import { Check, Minus } from 'lucide-react';
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
  PageChapterNav,
  ProofGrid,
} from '../components/section';
import { tiers, comparison, joiningSteps } from '../data/membership';

export default function Membership() {
  return (
    <PageWrapper>
      <MetaTags
        title="Membership & Jet Card"
        description="Three ways to fly with Solara: on demand, a jet card with rates fixed for the term, or annual membership with reduced rates and guaranteed availability."
        canonical="/membership"
      />

      <PageHero
        eyebrow="Membership"
        title={['Three ways', 'to fly']}
        accent={[1]}
        lead="How often you fly should decide how you buy. Between twenty-five and fifty hours, a card usually makes more sense than membership; below that, on demand may be the better fit."
        image="/images/membership_window_hero.jpg"
        imageAlt="View through a cabin window at altitude"
        meta={[
          { label: 'Programmes', value: String(tiers.length) },
          { label: 'Shortest notice', value: '24 hrs' },
          { label: 'Commitment', value: 'From none' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'programmes', label: 'Programmes' },
          { id: 'comparison', label: 'Comparison' },
          { id: 'assurance', label: 'Rate and availability' },
          { id: 'joining', label: 'Joining' },
        ]}
      />

      <Section id="programmes">
        <SectionIntro
          index="01"
          eyebrow="The programmes"
          title={['Priced by how', 'often you fly,', 'nothing else']}
          accent={[2]}
          lead="No tier buys a better aircraft or a better crew. What changes is the rate, the notice you need to give, and how much is handled for you."
        />

        <div className="grid gap-stack lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.id} from="up" distance={30} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col border p-[clamp(1.5rem,3vw,2.25rem)] ${
                  tier.featured ? 'border-beige/45 bg-beige/[0.045]' : 'border-white/[0.11] bg-white/[0.015]'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-white text-[clamp(1.4rem,1.15rem+1.1vw,1.9rem)]">
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <span className="text-micro font-sans uppercase text-beige">Most chosen</span>
                  )}
                </div>

                <p className="mt-block font-serif tabular-nums text-beige text-[clamp(1.2rem,1rem+0.9vw,1.6rem)]">
                  {tier.price}
                </p>
                <p className="mt-1.5 text-micro font-sans uppercase text-white/40">{tier.priceNote}</p>

                <p className="mt-block font-sans text-body text-white/55">
                  {tier.description}
                </p>

                <ul className="mt-block space-y-flow">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="mt-[0.45em] h-px w-3 flex-none bg-beige/60" />
                      <span className="font-sans text-body text-white/55">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Pushed to the foot so all three cards align regardless of
                    how many features each programme lists. */}
                <div className="mt-auto pt-[clamp(1.5rem,3vw,2.25rem)]">
                  <p className="text-micro font-sans uppercase text-white/35">Best for</p>
                  <p className="mt-1.5 font-sans text-body text-white/70">{tier.bestFor}</p>
                  <Link
                    to="/quote"
                    className={`mt-block inline-flex w-full justify-center ${
                      tier.featured ? 'btn-beige-filled' : 'btn-beige-outline'
                    }`}
                  >
                    Discuss {tier.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="comparison" divided>
        <SectionIntro
          index="02"
          eyebrow="Side by side"
          title={['What actually', 'differs']}
          accent={[1]}
          lead="The same fleet, the same crews, the same standards. These are the only lines that change between programmes."
        />

        {/* Horizontally scrollable below lg: a comparison table squeezed onto a
            phone becomes unreadable, so it keeps its width and scrolls. */}
        <Reveal from="up" distance={26}>
          <p className="mb-flow flex items-center gap-2 text-micro font-sans uppercase text-white/35 sm:hidden">
            Swipe to compare <span aria-hidden="true">→</span>
          </p>
          <div
            role="region"
            aria-label="Programme comparison"
            tabIndex={0}
            className="overflow-x-auto overscroll-x-contain focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-beige/70"
          >
            <table className="w-full min-w-[44rem] border-collapse">
            <caption className="sr-only">Comparison of Solara flight programmes</caption>
            <thead>
              <tr className="border-b border-white/[0.14]">
                  <th scope="col" className="sticky left-0 z-10 w-1/3 bg-charcoal py-[clamp(0.8rem,1.8vw,1.15rem)] text-left text-micro font-sans uppercase text-white/40">
                  Feature
                </th>
                {tiers.map((t) => (
                  <th
                    key={t.id}
                    scope="col"
                    className={`py-[clamp(0.8rem,1.8vw,1.15rem)] text-left font-serif text-[clamp(0.95rem,0.85rem+0.5vw,1.2rem)] ${
                      t.featured ? 'text-beige' : 'text-white'
                    }`}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-white/[0.09]">
                    <th scope="row" className="sticky left-0 z-10 bg-charcoal py-[clamp(0.8rem,1.8vw,1.15rem)] pr-6 text-left text-micro font-sans uppercase text-white/40">
                    {row.label}
                  </th>
                  {tiers.map((t) => {
                    const value = row.values[t.id];
                    return (
                      <td key={t.id} className="py-[clamp(0.8rem,1.8vw,1.15rem)] pr-6 align-middle">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <>
                              <Check size={16} className="text-beige" aria-hidden="true" />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            <>
                              <Minus size={16} className="text-white/20" aria-hidden="true" />
                              <span className="sr-only">Not included</span>
                            </>
                          )
                        ) : (
                          <span className="font-sans text-body text-white/70">{value}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section compact>
        <FigureStrip
          figures={[
            { value: 24, suffix: ' hrs', label: 'Shortest notice', note: 'On membership' },
            { value: 25, label: 'Card hours', note: 'Minimum purchase' },
            { value: 0, label: 'Positioning fees', note: 'Within the core region' },
            { value: 100, suffix: '%', label: 'Rate held', note: 'For the card term' },
          ]}
        />
      </Section>

      <Section id="assurance" divided>
        <div className="space-y-[clamp(4rem,8vw,7rem)]">
          <EditorialSplit
            index="03"
            eyebrow="Rate certainty"
            title={['A price that', 'does not move']}
            accent={[1]}
            body="Charter pricing rises with fuel, season and demand. A jet card fixes your rate for the whole term, so the flight you budget in January is the flight you pay for in August. It is the single reason most clients move off on-demand."
            points={[
              'Rate fixed at signing for the full term',
              'No surcharges for peak dates',
              'One invoice, drawn down flight by flight',
            ]}
            image="/images/fleet/challenger350.jpg"
            imageAlt="Private jet on the apron"
            cta={{ label: 'See the fleet', to: '/fleet' }}
          />

          <EditorialSplit
            index="04"
            eyebrow="Availability"
            title={['Held, not', 'hoped for']}
            accent={[1]}
            reverse
            body="Guaranteed availability means an aircraft in your cabin class is contractually held for you at the agreed notice — not that we will try. On the busiest weekends of the year, that difference is the whole product."
            points={[
              'Confirmed at 24 hours on membership, 48 on a card',
              'Cabin class guaranteed, aircraft assigned to the route',
              'Alternatives offered before you have to ask',
            ]}
            image="/images/fleet/g650.jpg"
            imageAlt="Private jet cabin interior"
            cta={{ label: 'Safety standards', to: '/safety' }}
          />
        </div>
      </Section>

      <Section id="joining" divided>
        <SectionIntro
          index="05"
          eyebrow="Joining"
          title={['Three steps,', 'about a week']}
          accent={[1]}
          lead="No application forms and no assessment. A conversation, a written proposal, and then you fly."
        />

        <ProofGrid items={joiningSteps} columns={3} />
      </Section>

      <CTABand
        eyebrow="Membership"
        title={['Tell us how', 'often you fly.', 'We will do', 'the maths.']}
        accent={[3]}
        lead="If a card works out cheaper than a membership for your pattern, we will tell you that first. Send us a typical year and we will put the numbers side by side."
        primary={{ label: 'Request a proposal', to: '/quote' }}
        secondary={{ label: 'Speak to us', to: '/contact' }}
        image="/images/membership_window_hero.jpg"
      />
    </PageWrapper>
  );
}
