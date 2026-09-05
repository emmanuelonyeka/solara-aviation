import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import { Section, SectionIntro, PageHero, SpecTable, CTABand, PageChapterNav } from '../components/section';
import { releases, pressFacts } from '../data/press';
import { site } from '../config/site';

export default function Press() {
  return (
    <PageWrapper>
      <MetaTags
        title="Press"
        description="Announcements, company facts and media contacts for Solara Jets. Interview requests answered the same calendar day."
        canonical="/press"
      />

      <PageHero
        eyebrow="Press"
        title={['Facts, dated', 'and on the', 'record']}
        accent={[2]}
        lead="Everything below can be quoted without checking back with us. Anything not on this page, ask — we would rather answer than have it guessed at."
        image="/images/journey_mountain.jpg"
        imageAlt="Aircraft above a mountain range"
        meta={[
          { label: 'Announcements', value: String(releases.length) },
          { label: 'Press desk', value: 'Same calendar day' },
          { label: 'Interviews', value: 'On request' },
        ]}
      />

      <PageChapterNav items={[
        { id: 'announcements', label: 'Announcements' },
        { id: 'facts', label: 'Company facts' },
        { id: 'resources', label: 'Media resources' },
      ]} />

      <Section id="announcements">
        <SectionIntro
          index="01"
          eyebrow="Announcements"
          title={['What we have', 'said publicly']}
          accent={[1]}
          lead="Newest first. Each of these was issued in full and none of it has been revised since."
        />

        <div className="border-t border-white/[0.09]">
          {releases.map((release, i) => (
            <Reveal key={release.id} from="up" distance={22} delay={i * 0.05}>
              <article className="grid gap-block border-b border-white/[0.09] py-stack lg:grid-cols-12">
                <p className="text-micro font-sans uppercase text-beige/70 lg:col-span-2">
                  {release.date}
                </p>
                <h3 className="font-serif text-white text-[clamp(1.15rem,0.95rem+0.9vw,1.55rem)] lg:col-span-5">
                  {release.title}
                </h3>
                <p className="max-w-measure font-sans text-body text-white/50 lg:col-span-5">
                  {release.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="facts" divided>
        <SectionIntro
          index="02"
          eyebrow="Company facts"
          title={['The details', 'journalists', 'ask for']}
          accent={[2]}
          lead="Kept current rather than written once. If a figure here is out of date, that is our error and we would like to know."
        />

        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
          <Reveal from="up" distance={26} className="lg:col-span-7">
            <SpecTable specs={pressFacts} columns={1} />
          </Reveal>

          <Reveal from="fade" className="overflow-hidden lg:col-span-5">
            <img
              src="/images/fleet/global7500.jpg"
              alt="Private jet on the apron at dusk"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="resources" divided>
        <SectionIntro
          index="03"
          eyebrow="Media resources"
          title={['Images and', 'interviews']}
          accent={[1]}
          lead="Photography is available at print resolution on request, with usage terms attached. We do not require copy approval."
        />

        <Reveal from="up" distance={26} className="max-w-prose">
          <SpecTable
            specs={[
              { label: 'Press contact', value: site.contact.pressEmail },
              { label: 'Response time', value: 'Same calendar day' },
              { label: 'Imagery', value: 'Print-resolution files supplied on request' },
              { label: 'Interviews', value: 'Leadership available; no copy approval required' },
              { label: 'Client details', value: 'Never disclosed, on or off the record' },
            ]}
            columns={1}
          />

          <p className="mt-[clamp(1.5rem,3vw,2.25rem)] max-w-measure font-sans text-body text-white/40">
            One thing we will always decline: anything identifying a client, an
            itinerary or an aircraft movement. That holds regardless of who is
            asking or what has already been published elsewhere.
          </p>
        </Reveal>
      </Section>

      <CTABand
        eyebrow="Press desk"
        title={['Ask us', 'directly.']}
        accent={[1]}
        lead={`Deadlines are respected. Write to ${site.contact.pressEmail} and you will have an answer the same calendar day.`}
        primary={{ label: 'Contact the press desk', to: '/contact' }}
        secondary={{ label: 'About Solara', to: '/about' }}
        image="/images/journey_mountain.jpg"
      />
    </PageWrapper>
  );
}
