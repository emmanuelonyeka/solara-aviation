import PageHero from '../section/PageHero';
import Section from '../section/Section';
import Reveal from '../shared/Reveal';
import { site } from '../../config/site';
import { formatBookingDate, type QuoteDraft, type QuoteProgress } from '../../features/booking';

interface QuoteEntryProps {
  mode: 'intro' | 'resume';
  draft: QuoteDraft;
  progress: QuoteProgress | null;
  onBegin: () => void;
  onResume: () => void;
  onStartOver: () => void;
}

function valueOrFallback(value: string, fallback = 'Not selected'): string {
  return value.trim() || fallback;
}

export default function QuoteEntry({ mode, draft, progress, onBegin, onResume, onStartOver }: QuoteEntryProps) {
  if (mode === 'intro') {
    return (
      <>
        <PageHero eyebrow="Request a quote" title={['Five questions.', 'One price.']} accent={[1]} lead="No account and no obligation. Positioning, handling, catering and crew are all inside the figure we send back." image="/images/fleet/global7500.jpg" imageAlt="Private jet on the apron at dusk" meta={[{ label: 'Response', value: 'Within 2 hrs' }, { label: 'Desk', value: site.contact.availability }, { label: 'Commitment', value: 'None' }]} />

        <Section id="quote-introduction" compact divided>
          <div className="grid items-end gap-stack lg:grid-cols-12 lg:gap-x-layout">
            <Reveal from="up" distance={22} className="lg:col-span-8">
              <p className="text-micro font-sans uppercase text-beige">Your flight brief</p>
              <h2 className="mt-flow max-w-[15ch] font-serif text-display text-white">Begin when you are ready.</h2>
              <p className="mt-flow max-w-measure font-sans text-lead text-white/55">Your route, schedule, aircraft preference and contact details stay in one guided flow. Nothing is sent until you review and confirm it.</p>
            </Reveal>

            <Reveal from="up" distance={18} delay={0.12} className="flex flex-col items-start lg:col-span-4 lg:items-end">
              <button type="button" onClick={onBegin} className="btn-beige-filled">Begin your request</button>
              <p className="mt-3 font-sans text-[0.72rem] text-white/35">Usually completed in under three minutes.</p>
            </Reveal>
          </div>
        </Section>
      </>
    );
  }

  return (
    <section className="min-h-svh px-gutter pb-section pt-[clamp(8.5rem,12vw,11rem)]">
      <Reveal immediate from="up" distance={24} className="mx-auto w-full max-w-content">
        <div className="flex items-center gap-4">
          <span className="h-px w-[clamp(1.5rem,4vw,3rem)] bg-beige/60" aria-hidden="true" />
          <p className="text-micro font-sans uppercase text-beige">Saved flight brief</p>
        </div>

        <div className="mt-block grid gap-stack lg:grid-cols-12 lg:items-end lg:gap-x-layout">
          <div className="lg:col-span-7">
            <h1 className="max-w-[13ch] font-serif text-display-xl text-white">Continue where you left off?</h1>
            <p className="mt-block max-w-measure font-sans text-lead text-white/55">This unfinished request was saved only in this browser. Continue from your previous step, or clear it and begin a new flight brief.</p>
          </div>

          <dl className="grid grid-cols-2 border-y border-white/10 lg:col-span-5">
            <div className="border-b border-r border-white/10 p-[clamp(1rem,2.5vw,1.5rem)]">
              <dt className="text-micro font-sans uppercase text-white/35">Route</dt>
              <dd className="mt-2 font-serif text-title text-white">{valueOrFallback(draft.from)} <span className="text-beige/60">to</span> {valueOrFallback(draft.to)}</dd>
            </div>
            <div className="border-b border-white/10 p-[clamp(1rem,2.5vw,1.5rem)]">
              <dt className="text-micro font-sans uppercase text-white/35">Passengers</dt>
              <dd className="mt-2 font-serif text-title tabular-nums text-white">{draft.passengers}</dd>
            </div>
            <div className="col-span-2 p-[clamp(1rem,2.5vw,1.5rem)]">
              <dt className="text-micro font-sans uppercase text-white/35">Schedule</dt>
              <dd className="mt-2 font-serif text-title text-white">{draft.departDate ? formatBookingDate(draft.departDate) : 'Not selected'}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-stack flex flex-wrap items-center gap-4">
          <button type="button" onClick={onResume} className="btn-beige-filled">Continue previous booking</button>
          <button type="button" onClick={onStartOver} className="btn-beige-outline">Start over</button>
        </div>

        {progress && <p className="mt-flow font-sans text-[0.6875rem] text-white/30">Saved {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(progress.updatedAt)} · Automatically removed after seven days or after submission.</p>}
      </Reveal>
    </section>
  );
}