import { useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import { Section, SectionIntro, CTABand, CardAction } from '../components/section';
import { articles, getArticleBySlug, type Article as ArticleType } from '../data/articles';
import { readingTime } from '../lib/readingTime';
import { site } from '../config/site';

function NotFound() {
  return (
    <PageWrapper>
      <MetaTags title="Article not found" description="This article is no longer published." canonical={null} noIndex />
      <Section className="min-h-[60vh] !pt-[clamp(8rem,14vw,10rem)]">
        <p className="text-micro font-sans uppercase text-beige">Not published</p>
        <h1 className="mt-block font-serif text-display text-white">
          We could not find that article
        </h1>
        <p className="mt-flow max-w-measure font-sans text-lead text-white/60">
          The link may be out of date. Everything we have published is listed in the journal.
        </p>
        <div className="mt-stack">
          <Link to="/blog" className="btn-beige-filled">Read the journal</Link>
        </div>
      </Section>
    </PageWrapper>
  );
}

function RelatedCard({ item }: { item: ArticleType }) {
  return (
    <Link to={`/blog/${item.slug}`} className="group block">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="aspect-[16/10] w-full object-cover opacity-80 transition-all duration-1200 ease-lux group-hoverable:scale-[1.05] group-hoverable:opacity-100"
        />
      </div>
      <p className="mt-block text-micro font-sans uppercase text-beige/70">{item.category}</p>
      <h3 className="mt-flow font-serif text-white text-[clamp(1.05rem,0.9rem+0.7vw,1.4rem)] transition-colors duration-500 ease-lux group-hoverable:text-beige">
        {item.title}
      </h3>
      <p className="mt-flow font-sans text-body text-white/40">{readingTime(item.body)}</p>
      <span className="mt-block block">
        <CardAction label="Read" />
      </span>
    </Link>
  );
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const item = getArticleBySlug(slug || '');
  const bodyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const related = useMemo(() => {
    if (!item) return [];
    const same = articles.filter((a) => a.slug !== item.slug && a.category === item.category);
    const others = articles.filter((a) => a.slug !== item.slug && a.category !== item.category);
    return [...same, ...others].slice(0, 3);
  }, [item]);

  /* How far through the article body the reader is — not the whole document,
     which would sit at 60% before the first paragraph on a page with a hero. */
  useEffect(() => {
    if (!item) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = bodyRef.current;
        if (!el) return;
        const start = el.getBoundingClientRect().top + window.scrollY;
        const distance = el.offsetHeight - window.innerHeight * 0.6;
        const travelled = window.scrollY - start + window.innerHeight * 0.4;
        const nextProgress = Math.min(1, Math.max(0, travelled / Math.max(distance, 1)));
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${nextProgress})`;
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [item]);

  if (!item) return <NotFound />;

  const readTime = readingTime(item.body);
  const [opening, ...remaining] = item.body;

  return (
    <PageWrapper>
      <MetaTags
        title={item.title}
        description={item.excerpt}
        canonical={`/blog/${item.slug}`}
        image={item.image}
        imageAlt={item.title}
        type="article"
      />

      {/* Reading progress. Sits under the header, tied to the body only. */}
      <div className="fixed inset-x-0 top-0 z-[95] h-px bg-transparent" aria-hidden="true">
        <span
          ref={progressRef}
          className="block h-full origin-left bg-beige/70 transition-transform duration-150 ease-out"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Title first, image after: the writing is the product on this page. */}
      <header className="px-gutter pb-stack pt-[clamp(8rem,16vw,12rem)]">
        <div className="max-w-prose">
          <Reveal immediate from="fade" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-micro font-sans uppercase text-beige">{item.category}</span>
            <span aria-hidden="true" className="h-px w-5 bg-white/25" />
            <span className="text-micro font-sans text-white/40">{item.date}</span>
            <span aria-hidden="true" className="h-px w-5 bg-white/25" />
            <span className="text-micro font-sans text-white/40">{readTime}</span>
          </Reveal>

          <Reveal immediate from="up" distance={24} delay={0.1}>
            <h1 className="mt-block font-serif text-display text-white">{item.title}</h1>
          </Reveal>

          <Reveal immediate from="up" distance={22} delay={0.2}>
            <p className="mt-block max-w-measure font-sans text-lead text-white/55">{item.excerpt}</p>
          </Reveal>
        </div>
      </header>

      <Reveal immediate from="fade" delay={0.3} className="overflow-hidden">
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          className="aspect-[21/9] w-full object-cover"
        />
      </Reveal>

      <Section>
        <div ref={bodyRef} className="max-w-prose">
          {/* The opening paragraph is set larger, the way a magazine standfirst
              is, so the eye has somewhere obvious to begin. */}
          <Reveal from="up" distance={20}>
            <p className="font-sans text-white/75 text-lead leading-[1.85]">
              {opening}
            </p>
          </Reveal>

          {remaining.map((block, i) =>
            block.startsWith('## ') ? (
              <Reveal key={i} from="up" distance={20}>
                <h2 className="mt-stack flex items-baseline gap-4 font-serif text-white text-[clamp(1.3rem,1.1rem+1vw,1.8rem)]">
                  <span aria-hidden="true" className="mt-[0.55em] h-px w-[clamp(1rem,3vw,2rem)] flex-none bg-beige/60" />
                  {block.replace('## ', '')}
                </h2>
              </Reveal>
            ) : (
              <Reveal key={i} from="up" distance={18}>
                <p className="mt-block font-sans text-white/60 text-[clamp(0.9rem,0.86rem+0.18vw,1rem)] leading-[1.9]">
                  {block}
                </p>
              </Reveal>
            ),
          )}

          <Reveal from="up" distance={20} className="mt-stack border-t border-white/[0.09] pt-block">
            <p className="font-sans text-body text-white/40">
              Written by the {site.shortName} operations team. If this raised a question we did
              not answer, the desk will answer it directly.
            </p>
            <div className="mt-block flex flex-col gap-[clamp(1.35rem,4vw,1.85rem)] min-[568px]:flex-row min-[568px]:items-center min-[568px]:gap-[clamp(1rem,2vw,1.5rem)]">
              <Link to="/contact" className="btn-beige-outline">Ask the desk</Link>
              <Link to="/blog" className="link-underline">All articles</Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section divided>
          <SectionIntro
            index="02"
            eyebrow="Next"
            title={['Related', 'reading']}
            accent={[1]}
            lead="Articles on the same subject first, then whatever else is worth your time."
          />

          <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} from="up" distance={28} delay={i * 0.08}>
                <RelatedCard item={r} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        eyebrow="Put it to use"
        title={['Tell us the', 'trip. We will', 'be straight', 'with you.']}
        accent={[3]}
        lead="Including when the answer is that you do not need a private aircraft for it."
        primary={{ label: 'Request a quote', to: '/quote' }}
        secondary={{ label: 'More articles', to: '/blog' }}
        image="/images/closing_island_aerial.jpg"
      />
    </PageWrapper>
  );
}