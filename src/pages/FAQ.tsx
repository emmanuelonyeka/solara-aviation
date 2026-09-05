import { useMemo, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import { Section, SectionIntro, PageHero, CTABand, PageChapterNav } from '../components/section';
import { faqItems, type FAQ as FAQItem } from '../data/faq';
import { site } from '../config/site';

/**
 * Grouping is done here rather than in the data file so a buyer can move a
 * question between groups without touching the answer text.
 */
const GROUPS: { heading: string; blurb: string; match: (q: FAQItem) => boolean }[] = [
  {
    heading: 'Booking and notice',
    blurb: 'How far ahead, what changes, and what happens if plans move.',
    match: (q) => /book|notice|advance|cancel|change/i.test(q.question),
  },
  {
    heading: 'Cost and programmes',
    blurb: 'What is included, what is not, and which programme suits which pattern.',
    match: (q) => /fee|cost|price|card|membership|surcharge/i.test(q.question),
  },
  {
    heading: 'Aboard and on the ground',
    blurb: 'Aircraft, catering, pets, baggage and everything either side of the flight.',
    match: () => true,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  /* Each question lands in the first group that claims it, so nothing is
     listed twice and nothing is silently dropped. */
  const grouped = useMemo(() => {
    const remaining = [...faqItems];
    return GROUPS.map((group) => {
      const taken = remaining.filter(group.match);
      taken.forEach((q) => remaining.splice(remaining.indexOf(q), 1));
      return { ...group, items: taken };
    }).filter((g) => g.items.length > 0);
  }, []);

  return (
    <PageWrapper>
      <MetaTags
        title="Common Questions"
        description="Booking notice, what a quote includes, changes and cancellations, pets, baggage and the questions clients ask most before their first flight."
        canonical="/faq"
      />

      <PageHero
        eyebrow="Common questions"
        title={['The answers', 'we give on', 'the phone']}
        accent={[2]}
        lead="Written the way we would say them, not the way a legal team would. If your question is not here, the desk will answer it directly."
        image="/images/fleet/challenger350.jpg"
        imageAlt="Private jet on the apron"
        meta={[
          { label: 'Questions', value: String(faqItems.length) },
          { label: 'Desk', value: site.contact.availability },
          { label: 'Response', value: 'Within 2 hrs' },
        ]}
      />

      <PageChapterNav
        items={grouped.map((group, index) => ({ id: `faq-group-${index + 1}`, label: group.heading }))}
      />

      {grouped.map((group, gi) => (
        <Section id={`faq-group-${gi + 1}`} key={group.heading} divided={gi > 0}>
          <SectionIntro
            index={String(gi + 1).padStart(2, '0')}
            eyebrow={group.heading}
            title={group.heading.split(' and ')}
            accent={[1]}
            lead={group.blurb}
          />

          <div className="border-t border-white/[0.09]">
            {group.items.map((item, i) => {
              const id = `${gi}-${i}`;
              const isOpen = open === id;
              const triggerId = `faq-${gi}-${i}-trigger`;
              const panelId = `faq-${gi}-${i}-panel`;
              return (
                <Reveal key={item.question} from="up" distance={20} delay={i * 0.04}>
                  <div className="border-b border-white/[0.09]">
                    <button
                      id={triggerId}
                      type="button"
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-start justify-between gap-[clamp(1rem,3vw,2rem)] py-[clamp(1.15rem,2.8vw,1.75rem)] text-left transition-opacity duration-400 active:opacity-70"
                    >
                      <span
                        className={`font-serif text-[clamp(1.05rem,0.9rem+0.8vw,1.45rem)] transition-colors duration-400 ${
                          isOpen ? 'text-beige' : 'text-white'
                        }`}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-[0.45em] inline-block h-2 w-2 flex-none border-b border-r border-beige/70 transition-transform ease-lux duration-400 ${
                          isOpen ? 'rotate-[225deg]' : 'rotate-45'
                        }`}
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      aria-hidden={!isOpen}
                      className={`grid transition-all ease-lux duration-600 ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-measure pb-[clamp(1.15rem,2.8vw,1.75rem)] font-sans text-body text-white/55">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ))}

      <CTABand
        eyebrow="Still unanswered"
        title={['Ask us the', 'thing you', 'actually', 'want to know.']}
        accent={[3]}
        lead={`The desk is staffed continuously and answers directly. ${site.contact.responseTime}.`}
        primary={{ label: 'Contact the desk', to: '/contact' }}
        secondary={{ label: 'Read the journal', to: '/blog' }}
        image="/images/journey_mountain.jpg"
      />
    </PageWrapper>
  );
}
