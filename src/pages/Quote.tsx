import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import { Section, SpecTable, CTABand } from '../components/section';
import AirportField from '../components/quote/AirportField';
import QuoteEntry from '../components/quote/QuoteEntry';
import StepProgress from '../components/quote/StepProgress';
import SendingOverlay from '../components/form/SendingOverlay';
import FormField from '../components/form/FormField';
import DateField from '../components/form/DateField';
import PassengerField from '../components/form/PassengerField';
import QuoteConfirmation from '../components/quote/QuoteConfirmation';
import { aircraft } from '../data/aircraft';
import { runtimeConfig } from '../config/runtime';
import {
  clearQuoteProgress,
  createInitialQuoteDraft,
  createQuoteEmailPayload,
  createReference,
  formatBookingDate,
  getEarliestQuoteDateInputValue,
  getMaxQuoteDateInputValue,
  hasMeaningfulQuoteProgress,
  isQuoteFieldValid,
  loadQuoteProgress,
  QUOTE_FIELD_IDS,
  QUOTE_STEPS,
  saveQuoteProgress,
  validateQuoteStep,
  type QuoteRequest,
  type QuoteDraft,
  type QuoteErrors,
  type QuoteProgress,
} from '../features/booking';
import { FORM_INPUT_CLASS, FORM_PRIVACY_CLASS, FORM_TEXTAREA_CLASS, focusFirstInvalid } from '../lib/forms';
import { sendEmail, type EmailDeliveryResult } from '../services/email';

const inputState = (invalid?: string) =>
  invalid
    ? 'border-red-400/55 bg-red-400/[0.03]'
    : 'border-white/15 focus:border-beige/60 focus:bg-white/[0.05]';

type QuoteScreen = 'intro' | 'resume' | 'flow';

export default function Quote() {
  const [params] = useSearchParams();
  const earliestQuoteDate = getEarliestQuoteDateInputValue();
  const latestQuoteDate = getMaxQuoteDateInputValue();
  const [initialProgress] = useState<QuoteProgress | null>(() => loadQuoteProgress());
  const [screen, setScreen] = useState<QuoteScreen>(() => initialProgress ? 'resume' : 'intro');
  const [step, setStep] = useState(() => initialProgress?.step ?? 0);
  const [draft, setDraft] = useState<QuoteDraft>(() => initialProgress?.draft ?? createInitialQuoteDraft(params));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState<QuoteRequest | null>(null);
  const [delivery, setDelivery] = useState<EmailDeliveryResult | null>(null);
  const [deliveryIssue, setDeliveryIssue] = useState<'failed' | 'staff-only' | null>(null);
  const dispatchLockRef = useRef(false);
  const pendingBookingRef = useRef<QuoteRequest | null>(null);
  const completedDeliveryRef = useRef<EmailDeliveryResult | null>(null);
  const deliveryErrorRef = useRef<HTMLParagraphElement>(null);

  /* Every step change returns to the top of the flow. Without this a step with
     fewer fields than the last leaves the reader looking at the footer. */
  useEffect(() => {
    if (screen !== 'flow') return;
    const anchor = document.getElementById('quote-flow');
    if (!anchor) return;
    const lenis = window.__lenis;
    const top = anchor.getBoundingClientRect().top + window.scrollY - 120;
    if (lenis) lenis.scrollTo(top, { duration: 0.9 });
    else window.scrollTo({ top, behavior: 'smooth' });
  }, [screen, step]);

  useEffect(() => {
    if (screen !== 'flow' || booking) return;
    if (hasMeaningfulQuoteProgress(draft)) saveQuoteProgress(draft, step);
    else clearQuoteProgress();
  }, [booking, draft, screen, step]);

  /* The confirmation replaces the whole page, so it starts at the top. */
  useEffect(() => {
    if (!booking) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [booking]);

  const set = <K extends keyof QuoteDraft>(
    key: K,
    value: QuoteDraft[K],
  ) => {
    const nextDraft: QuoteDraft = { ...draft, [key]: value };

    if (key === 'departDate' && nextDraft.returnDate && nextDraft.returnDate < nextDraft.departDate) {
      nextDraft.returnDate = '';
    }

    if (key === 'passengers' && nextDraft.aircraftId) {
      const selectedAircraft = aircraft.find((item) => item.id === nextDraft.aircraftId);
      if (selectedAircraft && selectedAircraft.passengers < nextDraft.passengers) {
        nextDraft.aircraftId = '';
      }
    }

    setDraft(nextDraft);
    pendingBookingRef.current = null;
    completedDeliveryRef.current = null;
    setDelivery(null);
    setDeliveryIssue(null);
    setErrors((current) => {
      const nextErrors = { ...current };

      (
        Object.keys(nextErrors) as (keyof QuoteDraft)[]
      ).forEach((field) => {
        if (
          nextErrors[field] &&
          isQuoteFieldValid(field, nextDraft)
        ) {
          delete nextErrors[field];
        }
      });

      return nextErrors;
    });
  };

  const chosenAircraft = useMemo(
    () => aircraft.find((a) => a.id === draft.aircraftId), [draft.aircraftId],
  );

  const suitable = useMemo(
    () => aircraft.filter((a) => a.passengers >= draft.passengers), [draft.passengers],
  );

  const validate = (which: number): boolean => {
    const next = validateQuoteStep(which, draft);

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setAttempt((current) => current + 1);
      focusFirstInvalid(next, QUOTE_FIELD_IDS);
      return false;
    }

    return true;
  };

  const advance = () => {
    if (!validate(step)) return;

    setStep((current) => Math.min(current + 1, QUOTE_STEPS.length - 1));
  };

  const startFreshQuote = () => {
    clearQuoteProgress();
    setDraft(createInitialQuoteDraft(params));
    setStep(0);
    setErrors({});
    setAttempt(0);
    setDeliveryIssue(null);
    pendingBookingRef.current = null;
    completedDeliveryRef.current = null;
    setScreen('flow');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < QUOTE_STEPS.length - 1) {
      advance();
      return;
    }

    void submit();
  };

  const submit = async () => {
    if (dispatchLockRef.current) return;
    if (!validate(3)) { setStep(3); return; }

    dispatchLockRef.current = true;
    setDeliveryIssue(null);
    setSending(true);

    const record = pendingBookingRef.current ?? {
      reference: createReference(),
      createdAt: new Date().toISOString(),
      from: draft.from.trim(),
      to: draft.to.trim(),
      departDate: draft.departDate,
      returnDate:
        draft.tripType === 'return'
          ? draft.returnDate
          : undefined,
      passengers: draft.passengers,
      aircraft: chosenAircraft?.model,
      name: draft.name.trim(),
      email: draft.email.trim().toLowerCase(),
      phone: draft.phone.trim() || undefined,
      notes: draft.notes.trim() || undefined,
    } satisfies QuoteRequest;
    pendingBookingRef.current = record;

    const dispatchStartedAt = performance.now();
    let result = completedDeliveryRef.current;

    if (!result) {
      /* Keeps an instant demo response from reading like a missed click. */
      const MINIMUM_DISPATCH = 2000;

      const remainingHold = Math.max(
        0,
        MINIMUM_DISPATCH -
          (
            performance.now() -
            dispatchStartedAt
          ),
      );

      [result] = await Promise.all([
        sendEmail(createQuoteEmailPayload(record)),
        new Promise((resolve) => setTimeout(resolve, remainingHold)),
      ]);
    }

    if (
      result.outcome === 'failed' ||
      result.outcome === 'staff-only'
    ) {
      setSending(false);
      dispatchLockRef.current = false;
      setDeliveryIssue(result.outcome);

      window.requestAnimationFrame(
        () =>
          deliveryErrorRef.current?.focus(),
      );

      return;
    }

    completedDeliveryRef.current = result;
    clearQuoteProgress();
    setDelivery(result);
    setSending(false);
    dispatchLockRef.current = false;
    setBooking(record);
  };

  if (booking) return <QuoteConfirmation booking={booking} delivery={delivery} />;

  if (screen !== 'flow') {
    return (
      <PageWrapper>
        <MetaTags
          title="Request a Quote"
          description="Tell us the route, the dates and the party. Aircraft options and a single all-in price within two hours."
          canonical="/quote"
        />
        <QuoteEntry mode={screen} draft={draft} progress={initialProgress} onBegin={startFreshQuote} onResume={() => setScreen('flow')} onStartOver={startFreshQuote} />
      </PageWrapper>
    );
  }

  /* -------------------------------- the flow ------------------------------- */
  return (
    <PageWrapper>
      <SendingOverlay
        active={sending}
        statuses={
          runtimeConfig.formMode === 'demo'
            ? [
                'Preparing your preview',
                'Creating a reference',
                'Finalising the demo',
              ]
            : [
                'Checking aircraft availability',
                'Reaching the operations desk',
                'Confirming your reference',
              ]
        }
      />
      <MetaTags
        title="Request a Quote"
        description="Tell us the route, the dates and the party. Aircraft options and a single all-in price within two hours."
        canonical="/quote"
      />

      <Section id="quote-flow" className="min-h-screen !pt-[clamp(9.75rem,13vw,11.5rem)]">
        <div className="scroll-mt-[clamp(6rem,12vw,8rem)]">
          <StepProgress steps={QUOTE_STEPS} current={step} onSelect={setStep} />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Private flight quote request"
          aria-busy={sending}
          aria-describedby={
            step === 4
              ? deliveryIssue
                ? 'quote-delivery-error quote-privacy-note'
                : 'quote-privacy-note'
              : undefined
          }
          inert={sending}
          className="mt-stack max-w-prose"
        >
          {step === 0 && (
            <Reveal key="route" from="up" distance={22} className="relative z-20">
              <h2 className="font-serif text-display text-white">Where are you flying?</h2>
              <p className="mt-flow max-w-measure font-sans text-lead text-white/50">
                Start typing a city or an airport code. We fly to thousands of fields
                beyond the ones listed.
              </p>

              <div className="mt-stack grid gap-block sm:grid-cols-2">
                <AirportField
                  id="from-airport"
                  label="Flying from"
                  value={draft.from}
                  onChange={(value) => set('from', value)}
                  error={errors.from}
                  required
                />

                <AirportField
                  id="to-airport"
                  label="Flying to"
                  value={draft.to}
                  onChange={(value) => set('to', value)}
                  error={errors.to}
                  exclude={draft.from}
                  required
                />
              </div>
            </Reveal>
          )}

          {step === 1 && (
            <Reveal key="schedule" from="up" distance={22}>
              <h2 className="font-serif text-display text-white">When, and how many?</h2>
              <p className="mt-flow max-w-measure font-sans text-lead text-white/50">
                Approximate dates are fine at this stage. Nothing is held until you confirm.
              </p>

              <fieldset className="mt-stack border-0 p-0">
                <legend className="text-micro font-sans uppercase text-white/50">
                  Trip type
                </legend>

                <div className="relative mt-3 inline-grid grid-cols-2 border border-white/15">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/2 bg-beige/[0.12] transition-transform duration-700 ease-lux"
                    style={{ transform: `translateX(${draft.tripType === 'return' ? '100%' : '0%'})` }}
                  />
                  {(['one-way', 'return'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => set('tripType', type)}
                      aria-pressed={draft.tripType === type}
                      className={`relative z-10 px-[clamp(1.25rem,4vw,2rem)] py-[clamp(0.65rem,1.6vw,0.9rem)] text-micro font-sans uppercase transition-[color,opacity] duration-500 ease-lux active:opacity-60 ${
                        draft.tripType === type ? 'text-beige' : 'text-white/45 hoverable:text-white'
                      }`}
                    >
                      {type === 'one-way' ? 'One way' : 'Return'}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-stack grid gap-block sm:grid-cols-2">
                <FormField id="depart" label="Departing" error={errors.departDate} attempt={attempt}>
                  <DateField
                    id="depart"
                    value={draft.departDate}
                    min={earliestQuoteDate}
                    max={latestQuoteDate}
                    required
                    onChange={(value) =>
                      set('departDate', value)
                    }
                    invalid={Boolean(errors.departDate)}
                    describedBy={
                      errors.departDate
                        ? 'depart-error'
                        : undefined
                    }
                    className={`${FORM_INPUT_CLASS} ${inputState(errors.departDate)}`}
                  />
                </FormField>

                {draft.tripType === 'return' && (
                  <FormField id="return" label="Returning" error={errors.returnDate} attempt={attempt}>
                    <DateField
                      id="return"
                      value={draft.returnDate}
                      min={draft.departDate || earliestQuoteDate}
                      max={latestQuoteDate}
                      required
                      onChange={(value) =>
                        set('returnDate', value)
                      }
                      invalid={Boolean(errors.returnDate)}
                      describedBy={
                        errors.returnDate
                          ? 'return-error'
                          : undefined
                      }
                      className={`${FORM_INPUT_CLASS} ${inputState(errors.returnDate)}`}
                    />
                  </FormField>
                )}

                <FormField id="passengers" label="Passengers" error={errors.passengers} attempt={attempt} hint="Including anyone joining at a stop">
                  <PassengerField id="passengers" value={draft.passengers} min={1} max={19} onChange={(value) => set('passengers', value)} invalid={Boolean(errors.passengers)} describedBy={errors.passengers ? 'passengers-error' : 'passengers-hint'} className={`${FORM_INPUT_CLASS} ${inputState(errors.passengers)}`} />
                </FormField>
              </div>
            </Reveal>
          )}

          {step === 2 && (
            <Reveal key="aircraft" from="up" distance={22}>
              <h2 className="font-serif text-display text-white">Any preference on aircraft?</h2>
              <p className="mt-flow max-w-measure font-sans text-lead text-white/50">
                Optional. Only cabins that seat {draft.passengers} are shown. Skip it and
                we will put forward the right one for the distance.
              </p>

              <div
                role="group"
                aria-label="Aircraft preference"
                className="mt-stack grid gap-block sm:grid-cols-2"
              >
                <button
                  type="button"
                  onClick={() => set('aircraftId', '')}
                  aria-pressed={draft.aircraftId === ''}
                  className={`group flex flex-col justify-between border p-[clamp(1.15rem,2.8vw,1.6rem)] text-left transition-all duration-500 ease-lux active:scale-[0.99] ${
                    draft.aircraftId === ''
                      ? 'border-beige bg-beige/[0.06]'
                      : 'border-white/12 hoverable:border-beige/45 hoverable:bg-white/[0.03]'
                  }`}
                >
                  <span className="flex aspect-[16/10] w-full items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                    <span className="text-micro font-sans uppercase text-white/30">Our recommendation</span>
                  </span>
                  <span className="mt-block block font-serif text-title text-white transition-colors duration-500 ease-lux group-hoverable:text-beige">
                    Recommend for me
                  </span>
                  <span className="mt-2 block font-sans text-body text-white/45">
                    Chosen against the distance and the party
                  </span>
                </button>

                {suitable.map((a) => {
                  const selected = draft.aircraftId === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => set('aircraftId', a.id)}
                      aria-pressed={selected}
                      className={`group flex flex-col justify-between border p-[clamp(1.15rem,2.8vw,1.6rem)] text-left transition-all duration-500 ease-lux active:scale-[0.99] ${
                        selected
                          ? 'border-beige bg-beige/[0.06]'
                          : 'border-white/12 hoverable:border-beige/45 hoverable:bg-white/[0.03]'
                      }`}
                    >
                      <span className="block overflow-hidden">
                        <img
                          src={a.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className={`aspect-[16/10] w-full object-cover transition-transform duration-1200 ease-lux ${
                            selected ? 'scale-[1.04]' : 'group-hoverable:scale-[1.04]'
                          }`}
                        />
                      </span>

                      <span className="mt-block flex items-baseline justify-between gap-3">
                        <span className={`font-serif text-title transition-colors duration-500 ease-lux ${selected ? 'text-beige' : 'text-white group-hoverable:text-beige'}`}>
                          {a.model}
                        </span>
                        <span className="text-micro font-sans uppercase text-white/35">{a.category}</span>
                      </span>

                      <span className="mt-2 block font-sans tabular-nums text-body text-white/45">
                        {a.passengers} seats · {a.rangeNm.toLocaleString()} nm · {a.speed}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          )}

          {step === 3 && (
            <Reveal key="contact" from="up" distance={22}>
              <h2 className="font-serif text-display text-white">Where do we send it?</h2>
              <p className="mt-flow max-w-measure font-sans text-lead text-white/50">
                One reply, from a named person, with the price and the aircraft.
              </p>

              <div className="mt-stack grid gap-block sm:grid-cols-2">
                <FormField id="name" label="Full name" error={errors.name} attempt={attempt}>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={draft.name}
                    onChange={(event) =>
                      set('name', event.target.value)
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? 'name-error' : undefined
                    }
                    className={`${FORM_INPUT_CLASS} ${inputState(
                      errors.name,
                    )}`}
                  />
                </FormField>

                <FormField id="email" label="Email" error={errors.email} attempt={attempt}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={draft.email}
                    onChange={(event) =>
                      set('email', event.target.value)
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'email-error' : undefined
                    }
                    className={`${FORM_INPUT_CLASS} ${inputState(
                      errors.email,
                    )}`}
                  />
                </FormField>

                <FormField id="phone" label="Phone" optional attempt={attempt} hint="Only used if something on the day changes">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={draft.phone}
                    onChange={(event) =>
                      set('phone', event.target.value)
                    }
                    aria-describedby="phone-hint"
                    className={`${FORM_INPUT_CLASS} ${inputState()}`}
                  />
                </FormField>

                <FormField id="notes" label="Anything we should know" optional attempt={attempt} className="sm:col-span-2">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={draft.notes}
                    onChange={(event) =>
                      set('notes', event.target.value)
                    }
                    placeholder="Catering, pets, ground transport, timing that cannot move"
                    className={`${FORM_TEXTAREA_CLASS} ${inputState()}`}
                  />
                </FormField>
              </div>
            </Reveal>
          )}

          {step === 4 && (
            <Reveal key="review" from="up" distance={22}>
              <h2 className="font-serif text-display text-white">Check this over</h2>
              <p className="mt-flow max-w-measure font-sans text-lead text-white/50">
                Nothing is sent until you confirm. Any line can be changed from the
                rail above.
              </p>

              <div className="mt-stack">
                <SpecTable
                  specs={[
                    { label: 'Flying from', value: draft.from },
                    { label: 'Flying to', value: draft.to },
                    { label: 'Departing', value: formatBookingDate(draft.departDate) },
                    {
                      label: 'Returning',
                      value: draft.tripType === 'return' ? formatBookingDate(draft.returnDate) : 'One way',
                    },
                    { label: 'Passengers', value: String(draft.passengers) },
                    { label: 'Aircraft', value: chosenAircraft?.model ?? 'Recommend for me' },
                    { label: 'Name', value: draft.name },
                    { label: 'Email', value: draft.email },
                    { label: 'Phone', value: draft.phone || 'Not supplied' },
                    { label: 'Notes', value: draft.notes || 'None' },
                  ]}
                  columns={1}
                />
              </div>
            </Reveal>
          )}

          {step === 4 && deliveryIssue && (
            <p
              ref={deliveryErrorRef}
              id="quote-delivery-error"
              role="alert"
              tabIndex={-1}
              className="mt-stack border-l-2 border-red-400/60 pl-4 font-sans text-body text-red-300/90"
            >
              {deliveryIssue === 'staff-only'
                ? 'The operations desk received your request, but the confirmation email could not be delivered. Try again — only your confirmation will be retried, so the desk will not receive a duplicate.'
                : 'We could not reach the operations desk. Your details are still here; check your connection and try again, or call us for immediate help.'}
            </p>
          )}

          <div className={`relative z-0 flex w-full items-center justify-between gap-[clamp(1rem,3vw,1.5rem)] ${step === 4 && deliveryIssue ? 'mt-block' : 'mt-stack'}`}>
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="text-micro font-sans uppercase text-white/45 transition-colors duration-500 ease-lux active:opacity-60 hoverable:text-white">Back</button>
            ) : <span aria-hidden="true" />}

            {step < QUOTE_STEPS.length - 1 ? (
              <button type="submit" className="btn-beige-filled">
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={sending}
                className="btn-beige-filled inline-flex items-center gap-3 disabled:cursor-wait disabled:opacity-80"
              >
                {sending && (
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 flex-none animate-spin rounded-full border border-current border-t-transparent"
                  />
                )}
                {sending
                  ? 'Sending your request'
                  : deliveryIssue === 'staff-only'
                    ? 'Retry confirmation email'
                    : deliveryIssue === 'failed'
                      ? 'Try sending again'
                      : 'Confirm and send'}
              </button>
            )}
          </div>

          {step === QUOTE_STEPS.length - 1 && (
            <p id="quote-privacy-note" className={FORM_PRIVACY_CLASS}>
              Your details are used only to prepare and respond to this request. Read our{' '}
              <Link to="/privacy" className="text-white/60 underline decoration-white/25 underline-offset-4 transition-colors duration-400 hoverable:text-beige">
                privacy notice
              </Link>
              .
            </p>
          )}
        </form>
      </Section>

      <CTABand
        eyebrow="Rather talk?"
        title={['Some trips are', 'easier to', 'explain aloud.']}
        accent={[2]}
        lead="Call and we will build the itinerary with you, then send the same written quote afterwards."
        primary={{ label: 'Contact the desk', to: '/contact' }}
        secondary={{ label: 'Empty legs', to: '/empty-legs' }}
        image="/images/closing_island_aerial.jpg"
      />
    </PageWrapper>
  );
}
