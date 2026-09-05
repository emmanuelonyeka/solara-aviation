import PageWrapper from '../layout/PageWrapper';
import MetaTags from '../shared/MetaTags';
import Reveal from '../shared/Reveal';
import { Section, PageHero, CTABand } from '../section';
import type { LegalDocument as Doc } from '../../data/legal';
import { site } from '../../config/site';

interface LegalDocumentProps {
  doc: Doc;
  /** Background for the hero. Varied per document so they are not identical. */
  image: string;
}

/**
 * Renders any legal document from data/legal.ts.
 *
 * All five legal pages share this, so a buyer edits wording in one file and
 * never touches a component. The contents list is a real anchor navigation
 * rather than decoration — legal pages are scanned, not read start to finish.
 */
export default function LegalDocument({ doc, image }: LegalDocumentProps) {
  return (
    <PageWrapper>
      <MetaTags title={doc.title} description={doc.intro} canonical={`/${doc.slug}`} />

      <PageHero
        eyebrow={doc.eyebrow}
        title={doc.title.split(' ')}
        accent={[doc.title.split(' ').length - 1]}
        lead={doc.intro}
        image={image}
        imageAlt=""
        meta={[{ label: 'Last updated', value: doc.updated }]}
      />

      <Section>
        <div className="grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12 lg:gap-x-[6%]">
          {/* Sticky on desktop so the reader never loses their place in a long
              document; a plain list on narrow screens where sticky is a nuisance. */}
          <Reveal from="fade" className="lg:col-span-4">
            <nav aria-label="On this page" className="lg:sticky lg:top-[clamp(6rem,12vw,9rem)]">
              <p className="text-micro font-sans uppercase text-white/40">On this page</p>
              <ul className="mt-[clamp(1rem,2vw,1.5rem)] space-y-[clamp(0.5rem,1.2vw,0.8rem)]">
                {doc.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group inline-flex items-baseline gap-3 font-sans text-body text-white/45 transition-colors duration-400 active:opacity-60 hoverable:text-white"
                    >
                      <span className="text-micro tabular-nums text-beige/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <div className="lg:col-span-8">
            {doc.sections.map((section, i) => (
              <Reveal key={section.id} from="up" distance={22} delay={0.04 * i}>
                <section
                  id={section.id}
                  className="scroll-mt-[clamp(5rem,10vw,7rem)] border-t border-white/[0.09] pb-[clamp(2rem,4vw,3rem)] pt-[clamp(1.5rem,3vw,2.25rem)] first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-micro font-sans tabular-nums text-beige/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-serif text-white text-[clamp(1.25rem,1rem+1vw,1.75rem)]">
                      {section.heading}
                    </h2>
                  </div>

                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-[clamp(0.85rem,2vw,1.25rem)] max-w-measure font-sans text-white/55 text-[clamp(0.875rem,0.8588rem+0.0741vw,0.9375rem)] leading-[1.8]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="mt-[clamp(1rem,2.2vw,1.5rem)] space-y-[clamp(0.5rem,1.2vw,0.8rem)]">
                      {section.list.map((entry) => (
                        <li key={entry} className="flex items-baseline gap-3">
                          <span aria-hidden="true" className="mt-[0.45em] h-px w-3 flex-none bg-beige/60" />
                          <span className="max-w-measure font-sans text-body text-white/50">{entry}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CTABand
        eyebrow="Questions"
        title={['A person will', 'answer this,', 'not a form.']}
        accent={[2]}
        lead={`Anything on this page can be queried directly. Write to ${site.contact.email} or call the desk at any hour.`}
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'Common questions', to: '/faq' }}
        image="/images/hero_clouds_wing.jpg"
      />
    </PageWrapper>
  );
}
