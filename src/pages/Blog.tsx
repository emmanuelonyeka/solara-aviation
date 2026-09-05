import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import CatalogFilter from '../components/catalog/CatalogFilter';
import { Section, SectionIntro, PageHero, CTABand, CardAction } from '../components/section';
import { articles, articleCategories, type Article } from '../data/articles';
import useCatalogFilter from '../hooks/useCatalogFilter';
import { readingTime } from '../lib/readingTime';

function Meta({ item }: { item: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="text-micro font-sans uppercase text-beige/80">{item.category}</span>
      <span aria-hidden="true" className="h-px w-4 bg-white/20" />
      <span className="text-micro font-sans text-white/35">{item.date}</span>
      <span aria-hidden="true" className="h-px w-4 bg-white/20" />
      <span className="text-micro font-sans text-white/35">{readingTime(item.body)}</span>
    </div>
  );
}

/** The opening piece: image and copy side by side, given real width. */
function FeatureCard({ item }: { item: Article }) {
  return (
    <Link to={`/blog/${item.slug}`} className="group grid gap-block lg:grid-cols-12 lg:items-center lg:gap-x-[6%]">
      <div className="overflow-hidden lg:col-span-7">
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          className="aspect-[16/10] w-full object-cover transition-transform duration-1200 ease-lux group-hoverable:scale-[1.04]"
        />
      </div>

      <div className="lg:col-span-5">
        <Meta item={item} />
        <h3 className="mt-flow font-serif text-white text-[clamp(1.5rem,1.2rem+1.5vw,2.35rem)] transition-colors duration-500 ease-lux group-hoverable:text-beige">
          {item.title}
        </h3>
        <p className="mt-flow max-w-measure font-sans text-body text-white/50">{item.excerpt}</p>
        <span className="mt-block block">
          <CardAction label="Read the piece" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Remaining pieces as an index rather than a card grid.
 *
 * A grid of equal tiles reads as a content farm. A numbered index with the
 * image held small gives the writing the weight, which is the point of a
 * journal that exists to be useful rather than to fill a page.
 */
function IndexRow({ item, index }: { item: Article; index: number }) {
  return (
    <Link
      to={`/blog/${item.slug}`}
      className="group grid gap-block border-b border-white/[0.09] py-stack lg:grid-cols-12 lg:items-center lg:gap-x-[4%]"
    >
      <span className="text-micro font-sans tabular-nums text-beige/70 lg:col-span-1">
        {String(index).padStart(2, '0')}
      </span>

      <div className="lg:col-span-6">
        <Meta item={item} />
        <h3 className="mt-flow font-serif text-white text-[clamp(1.2rem,1rem+1vw,1.7rem)] transition-colors duration-500 ease-lux group-hoverable:text-beige">
          {item.title}
        </h3>
        <p className="mt-flow max-w-measure font-sans text-body text-white/45">{item.excerpt}</p>
        <span className="mt-block block lg:hidden">
          <CardAction label="Read" />
        </span>
      </div>

      <div className="hidden overflow-hidden lg:col-span-4 lg:block">
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="aspect-[16/10] w-full object-cover opacity-70 transition-all duration-1200 ease-lux group-hoverable:scale-[1.05] group-hoverable:opacity-100"
        />
      </div>

      <span className="hidden lg:col-span-1 lg:flex lg:justify-end">
        <CardAction label="" />
      </span>
    </Link>
  );
}

export default function Blog() {
  const [category, setCategory] = useCatalogFilter(articleCategories, 'category', 'All');

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: articles.length };
    articles.forEach((a) => {
      map[a.category] = (map[a.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(
    () => (category === 'All' ? articles : articles.filter((a) => a.category === category)),
    [category],
  );

  const [lead, ...rest] = filtered;

  return (
    <PageWrapper>
      <MetaTags
        title="Journal"
        description="Guides and arguments about private aviation, written to be useful rather than promotional — including the parts that do not favour us."
        canonical="/blog"
      />

      <PageHero
        eyebrow="Journal"
        title={['Written to be', 'useful, not', 'flattering']}
        accent={[2]}
        lead="Most charter writing exists to sell charter. These are the answers we give clients on the phone, including the ones that talk them out of flying."
        image="/images/journey_city.jpg"
        imageAlt="City skyline at dusk"
        meta={[
          { label: 'Articles', value: String(articles.length) },
          { label: 'Subjects', value: String(articleCategories.length - 1) },
          { label: 'Sponsored', value: 'None' },
        ]}
      />

      <Section>
        <SectionIntro
          index="01"
          eyebrow="The journal"
          title={['Everything we', 'get asked', 'twice']}
          accent={[1]}
          lead="If a question comes up in two separate conversations it ends up here. Filter by subject, or read the lot."
        />

        <CatalogFilter
          label="Filter by subject"
          options={articleCategories}
          value={category}
          counts={counts}
          controls="journal-results"
          onChange={setCategory}
          resultLabel={(count) => (count === 1 ? 'article' : 'articles')}
        />

        {/* keyed on the filter so the entries re-run their reveal after a change */}
        <div id="journal-results" key={category} className="mt-stack">
          {lead && (
            <Reveal from="up" distance={30}>
              <FeatureCard item={lead} />
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-stack border-t border-white/[0.09]">
              {rest.map((item, i) => (
                <Reveal key={item.slug} from="up" distance={24} delay={i * 0.05}>
                  <IndexRow item={item} index={i + 2} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Section>

      <CTABand
        eyebrow="A question we have not answered"
        title={['Ask it and we', 'will answer', 'properly.']}
        accent={[2]}
        lead="If it comes up twice it becomes an article. Either way you get a straight answer rather than a brochure."
        primary={{ label: 'Ask the desk', to: '/contact' }}
        secondary={{ label: 'Common questions', to: '/faq' }}
        image="/images/journey_mountain.jpg"
      />
    </PageWrapper>
  );
}