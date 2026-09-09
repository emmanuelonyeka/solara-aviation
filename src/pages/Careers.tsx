import { useMemo, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import CatalogFilter from '../components/catalog/CatalogFilter';
import { Section, SectionIntro, PageHero, EditorialSplit, FigureStrip, CTABand, PageChapterNav, ProofGrid } from '../components/section';
import useCatalogFilter from '../hooks/useCatalogFilter';
import { roles, departments, workingHere } from '../data/careers';
import { site } from '../config/site';

export default function Careers() {
  const [department, setDepartment] = useCatalogFilter(departments, 'department', 'All');
  const [openRole, setOpenRole] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: roles.length };
    roles.forEach((r) => {
      map[r.department] = (map[r.department] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(
    () => (department === 'All' ? roles : roles.filter((r) => r.department === department)),
    [department],
  );

  return (
    <PageWrapper>
      <MetaTags
        title="Careers"
        description="Flight crew, dispatch and client roles at Solara. Rest above the regulatory minimum, real safety authority, and a team small enough that everyone is named."
        canonical="/careers"
      />

      <PageHero
        eyebrow="Careers"
        title={['Where saying', 'no costs you', 'nothing']}
        accent={[2]}
        lead="Every operator claims crew can refuse a sector. Here it is written down, it has happened, and nobody's position changed afterwards. That is the job advert."
        image="/images/careers/crew-briefing.webp"
        imageAlt="Solara flight crew briefing beside a private jet"
        meta={[
          { label: 'Open roles', value: String(roles.length) },
          { label: 'Based', value: 'Farnborough' },
          { label: 'Applications', value: 'Answered in 5 days' },
        ]}
      />

      <PageChapterNav
        items={[
          { id: 'working-here', label: 'Working here' },
          { id: 'roles', label: 'Open roles' },
          { id: 'hiring', label: 'How we hire' },
        ]}
      />

      <Section id="working-here">
        <SectionIntro
          index="01"
          eyebrow="Working here"
          title={['Three things', 'that are', 'actually true']}
          accent={[2]}
          lead="Not values. Three specific arrangements you can hold us to in an interview, and which we expect you to ask about."
        />

        <ProofGrid items={workingHere} columns={3} />
      </Section>

      <Section compact>
        <FigureStrip
          figures={[
            { value: roles.length, label: 'Open positions' },
            { value: 2, suffix: '×', label: 'Simulator training', note: 'Per pilot, per year' },
            { value: 5, label: 'Working days', note: 'To hear back on an application' },
            { value: 100, suffix: '%', label: 'Type ratings funded', note: 'For first officers' },
          ]}
        />
      </Section>

      <Section id="roles" divided>
        <SectionIntro
          index="02"
          eyebrow="Open roles"
          title={['What we are', 'hiring for', 'right now']}
          accent={[2]}
          lead="If nothing here fits but you fly or dispatch at this level, write anyway. We have made roles for people before."
        />

        <CatalogFilter
          label="Filter by department"
          options={departments}
          value={department}
          counts={counts}
          controls="career-results"
          onChange={(value) => {
            setDepartment(value);
            setOpenRole(null);
          }}
          resultLabel={(count) => (count === 1 ? 'position' : 'positions')}
        />

        <div id="career-results" key={department} className="border-t border-white/[0.09]">
          {filtered.map((role, i) => {
            const isOpen = openRole === role.id;
            const panelId = `role-${role.id}-panel`;
            return (
              <Reveal key={role.id} from="up" distance={22} delay={i * 0.05}>
                <div className="border-b border-white/[0.09]">
                  <button
                    type="button"
                    onClick={() => setOpenRole(isOpen ? null : role.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="grid w-full gap-[clamp(0.5rem,2vw,2rem)] py-[clamp(1.25rem,3vw,2rem)] text-left transition-opacity duration-400 active:opacity-70 lg:grid-cols-12 lg:items-baseline"
                  >
                    <span className="text-micro font-sans tabular-nums text-beige/70 lg:col-span-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif text-[clamp(1.15rem,0.95rem+0.9vw,1.6rem)] transition-colors duration-400 lg:col-span-5 ${
                        isOpen ? 'text-beige' : 'text-white'
                      }`}
                    >
                      {role.title}
                    </span>
                    <span className="text-micro font-sans uppercase text-white/40 lg:col-span-3">
                      {role.location}
                    </span>
                    <span className="text-micro font-sans uppercase text-white/40 lg:col-span-2">
                      {role.type}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-block h-2 w-2 border-b border-r border-beige/70 transition-transform ease-lux duration-400 lg:col-span-1 lg:justify-self-end ${
                        isOpen ? 'rotate-[225deg]' : 'rotate-45'
                      }`}
                    />
                  </button>

                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`grid transition-all ease-lux duration-600 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-[clamp(1.5rem,3vw,2.5rem)] lg:pl-[8.333%]">
                        <p className="max-w-measure font-sans text-body text-white/60">{role.summary}</p>

                        <p className="mt-block text-micro font-sans uppercase text-white/40">
                          What we need
                        </p>
                        <ul className="mt-flow space-y-flow">
                          {role.requirements.map((r) => (
                            <li key={r} className="flex items-baseline gap-3">
                              <span aria-hidden="true" className="mt-[0.45em] h-px w-3 flex-none bg-beige/60" />
                              <span className="font-sans text-body text-white/50">{r}</span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href={`mailto:${site.contact.careersEmail}?subject=${encodeURIComponent(role.title)}`}
                          className="btn-beige-outline mt-[clamp(1.5rem,3vw,2.25rem)]"
                        >
                          Apply for this role
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="hiring" divided>
        <EditorialSplit
          index="03"
          eyebrow="How we hire"
          title={['One question', 'decides most', 'interviews']}
          accent={[2]}
          body="We ask every candidate to describe a time they stopped something, or wished they had. The answer tells us more than any licence, and it is the reason some very qualified people do not get an offer here."
          points={[
            'Three conversations, no panels or presentations',
            'A decision within five working days, either way',
            'Feedback given whether you ask for it or not',
          ]}
          image="/images/careers/interview.webp"
          imageAlt="Pilot candidate speaking with the Solara hiring team"
          cta={{ label: 'Our safety standards', to: '/safety' }}
        />
      </Section>

      <CTABand
        eyebrow="Nothing fits"
        title={['Write to us', 'anyway.']}
        accent={[1]}
        lead={`If you fly, dispatch or look after clients at this level, send us something. Applications reach ${site.contact.careersEmail} and are answered by a person within five working days.`}
        primary={{ label: 'Contact the team', to: '/contact' }}
        secondary={{ label: 'About Solara', to: '/about' }}
        image="/images/fleet_hangar_hero.jpg"
      />
    </PageWrapper>
  );
}
