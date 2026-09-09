import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import FormField from '../components/form/FormField';
import SendingOverlay from '../components/form/SendingOverlay';
import {
  Section,
  SectionIntro,
  PageHero,
  SpecTable,
  CTABand,
  PageChapterNav,
  ProofGrid,
} from '../components/section';
import { runtimeConfig } from '../config/runtime';
import { site } from '../config/site';
import { isValidBookingReference, normalizeBookingReference } from '../features/booking';
import {
  BOOKING_SUPPORT_ACTIONS,
  createBookingSupportEmailPayload,
  getBookingSupportAction,
  type BookingSupportAction,
  type BookingSupportSubmission,
} from '../features/submissions';
import { FORM_INPUT_CLASS, FORM_PRIVACY_CLASS, FORM_TEXTAREA_CLASS, focusFirstInvalid, isValidEmail } from '../lib/forms';
import { sendEmail, type EmailDeliveryResult } from '../services/email';

interface Draft {
  reference: string;
  email: string;
  name: string;
  phone: string;
  action: BookingSupportAction;
  details: string;
}

type Errors = Partial<Record<keyof Draft, string>>;

const EMPTY: Draft = {
  reference: '',
  email: '',
  name: '',
  phone: '',
  action: BOOKING_SUPPORT_ACTIONS[0].value,
  details: '',
};

const inputState = (invalid?: string) =>
  invalid
    ? 'border-red-400/55 bg-red-400/[0.03]'
    : 'border-white/15 focus:border-beige/60 focus:bg-white/[0.05]';

function createInitialDraft(params: URLSearchParams): Draft {
  const reference = normalizeBookingReference(params.get('reference') ?? '');
  return { ...EMPTY, reference: isValidBookingReference(reference) ? reference : '' };
}

function fieldIsValid(key: keyof Draft, draft: Draft): boolean {
  switch (key) {
    case 'reference':
      return isValidBookingReference(draft.reference);
    case 'email':
      return isValidEmail(draft.email);
    case 'name':
      return draft.name.trim().length > 0;
    case 'details':
      return draft.details.trim().length >= 10;
    default:
      return true;
  }
}

export default function ManageBooking() {
  const [params] = useSearchParams();
  const [draft, setDraft] = useState<Draft>(() => createInitialDraft(params));
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [sending, setSending] = useState(false);
  const [delivery, setDelivery] = useState<EmailDeliveryResult | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<BookingSupportSubmission | null>(null);
  const [deliveryIssue, setDeliveryIssue] = useState<'failed' | 'staff-only' | null>(null);
  const dispatchLockRef = useRef(false);
  const pendingSubmissionRef = useRef<BookingSupportSubmission | null>(null);
  const deliveryErrorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!delivery) return;
    const anchor = document.getElementById('booking-support');
    if (!anchor) return;
    const lenis = window.__lenis;
    const top = anchor.getBoundingClientRect().top + window.scrollY - 120;
    if (lenis) lenis.scrollTo(top, { duration: 0.9 });
    else window.scrollTo({ top, behavior: 'smooth' });
  }, [delivery]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    const nextDraft: Draft = { ...draft, [key]: value };
    setDraft(nextDraft);
    pendingSubmissionRef.current = null;
    setDeliveryIssue(null);
    setErrors((current) => {
      const nextErrors = { ...current };
      (Object.keys(nextErrors) as (keyof Draft)[]).forEach((field) => {
        if (nextErrors[field] && fieldIsValid(field, nextDraft)) delete nextErrors[field];
      });
      return nextErrors;
    });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dispatchLockRef.current) return;

    const next: Errors = {};

    if (!draft.reference.trim()) next.reference = 'Enter the reference from your confirmation email.';
    else if (!isValidBookingReference(draft.reference)) next.reference = 'Use the format SR-A7K3QP shown in your confirmation.';

    if (!draft.email.trim()) next.email = 'Enter the email address used for the request.';
    else if (!isValidEmail(draft.email)) next.email = 'Check this email address for a typo.';

    if (!draft.name.trim()) next.name = 'Enter the lead passenger or requester name.';
    if (!draft.details.trim()) next.details = 'Tell the desk what you need changed or confirmed.';
    else if (draft.details.trim().length < 10) next.details = 'Add a little more detail so the desk can act without guessing.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setAttempt((current) => current + 1);
      focusFirstInvalid(next);
      return;
    }

    dispatchLockRef.current = true;
    setDeliveryIssue(null);
    setSending(true);

    const submission = pendingSubmissionRef.current ?? {
      reference: normalizeBookingReference(draft.reference),
      email: draft.email.trim().toLowerCase(),
      name: draft.name.trim(),
      phone: draft.phone.trim() || undefined,
      action: draft.action,
      details: draft.details.trim(),
    } satisfies BookingSupportSubmission;
    pendingSubmissionRef.current = submission;

    const [result] = await Promise.all([
      sendEmail(createBookingSupportEmailPayload(submission)),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);

    setSending(false);
    dispatchLockRef.current = false;

    if (result.outcome === 'failed' || result.outcome === 'staff-only') {
      setDeliveryIssue(result.outcome);
      window.requestAnimationFrame(() => deliveryErrorRef.current?.focus());
      return;
    }

    setSubmittedRequest(submission);
    setDelivery(result);
  };

  const reset = () => {
    setDelivery(null);
    setSubmittedRequest(null);
    setDeliveryIssue(null);
    setErrors({});
    setDraft((current) => ({
      ...EMPTY,
      reference: current.reference,
      email: current.email,
      name: current.name,
      phone: current.phone,
    }));
    pendingSubmissionRef.current = null;
    window.requestAnimationFrame(() => document.getElementById('booking-action-change')?.focus());
  };

  const isDemo = delivery?.outcome === 'demo';
  const selectedAction = getBookingSupportAction(draft.action);

  return (
    <PageWrapper>
      <SendingOverlay
        active={sending}
        statuses={
          runtimeConfig.formMode === 'demo'
            ? ['Preparing your preview', 'Checking the request', 'Finalising the demo']
            : ['Preparing the request', 'Reaching operations', 'Sending confirmation']
        }
      />

      <MetaTags
        title="Booking Support"
        description="Send a booking change, cancellation or service request directly to the Solara operations desk for verification and confirmation."
        canonical="/manage-booking"
        noIndex
      />

      <PageHero
        eyebrow="Booking support"
        title={['Plans change.', 'The handover', 'stays simple.']}
        accent={[2]}
        lead="Send the reference and the exact action you need. The operations desk verifies the booking and confirms every change directly with you."
        image="/images/manage-booking/support.webp"
        imageAlt="Operations specialist reviewing a client booking request"
        meta={[
          { label: 'Desk', value: site.contact.availability },
          { label: 'Response', value: 'Within 2 hrs' },
          { label: 'Changes', value: 'Confirmed by the desk' },
        ]}
      />

      <PageChapterNav items={[
        { id: 'booking-support', label: 'Send a request' },
        { id: 'what-happens-next', label: 'What happens next' },
      ]} />

      <Section id="booking-support">
        {delivery ? (
          <Reveal immediate from="up" distance={26} className="max-w-prose">
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {isDemo ? 'Booking-support preview completed.' : 'Booking-support request sent.'}
            </p>

            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-[clamp(1.75rem,5vw,3.5rem)] bg-beige/60" />
              <span className="text-micro font-sans uppercase text-beige">
                {isDemo ? 'Preview complete' : 'Request received'}
              </span>
            </div>

            <h1 className="mt-block font-serif text-display text-white">
              {isDemo ? 'The support request is ready' : 'It is with the operations desk'}
            </h1>

            <p className="mt-block max-w-measure font-sans text-lead text-white/55">
              {isDemo
                ? 'Demo mode is active, so no email was sent and no booking was changed.'
                : 'The desk will verify the reference and contact details before confirming anything. Submitting this form does not change or cancel a flight automatically.'}
            </p>

            <SpecTable
              className="mt-stack"
              specs={[
                { label: 'Reference', value: submittedRequest?.reference ?? draft.reference },
                { label: 'Request', value: getBookingSupportAction(submittedRequest?.action ?? draft.action).label },
                { label: 'Reply to', value: submittedRequest?.email ?? draft.email },
              ]}
              columns={1}
            />

            <div className="mt-stack flex flex-col gap-[clamp(1.35rem,4vw,1.85rem)] min-[568px]:flex-row min-[568px]:items-center min-[568px]:gap-[clamp(1rem,2vw,1.5rem)]">
              <button type="button" onClick={reset} className="btn-beige-outline">
                Submit another request
              </button>
              <a href={`tel:${site.contact.phoneHref}`} className="link-underline">
                Or call {site.contact.phone}
              </a>
            </div>
          </Reveal>
        ) : (
          <>
            <SectionIntro
              index="01"
              eyebrow="Send a request"
              title={['One clear brief,', 'straight to', 'operations']}
              accent={[2]}
              lead="This frontend does not pretend to alter a booking without a secure booking service. It sends a structured request for the desk to verify and confirm."
            />

            <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
              <Reveal from="up" distance={26} className="lg:col-span-8">
                <form
                  onSubmit={submit}
                  noValidate
                  aria-label="Booking support request"
                  aria-busy={sending}
                  aria-describedby={deliveryIssue ? 'booking-delivery-error booking-privacy-note' : 'booking-privacy-note'}
                  inert={sending}
                >
                  <fieldset className="border-0 p-0">
                    <legend className="text-micro font-sans uppercase text-white/50">What do you need?</legend>

                    <div className="mt-block grid gap-flow sm:grid-cols-3">
                      {BOOKING_SUPPORT_ACTIONS.map((action) => {
                        const active = draft.action === action.value;
                        return (
                          <button
                            key={action.value}
                            id={`booking-action-${action.value}`}
                            type="button"
                            onClick={() => set('action', action.value)}
                            aria-pressed={active}
                            className={`min-h-full border p-[clamp(1rem,2.4vw,1.35rem)] text-left transition-[border-color,background-color,transform] duration-500 ease-lux active:scale-[0.99] ${
                              active
                                ? 'border-beige/70 bg-beige/[0.07]'
                                : 'border-white/12 bg-white/[0.015] hoverable:border-beige/40 hoverable:bg-white/[0.03]'
                            }`}
                          >
                            <span className={`block font-serif text-title ${active ? 'text-beige' : 'text-white'}`}>
                              {action.label}
                            </span>
                            <span className="mt-flow block font-sans text-body text-white/40">
                              {action.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-stack grid gap-block sm:grid-cols-2">
                    <FormField
                      id="reference"
                      label="Booking reference"
                      error={errors.reference}
                      attempt={attempt}
                      hint="The SR- reference in your confirmation email"
                    >
                      <input
                        id="reference"
                        name="reference"
                        value={draft.reference}
                        onChange={(event) => set('reference', normalizeBookingReference(event.target.value))}
                        placeholder="SR-A7K3QP"
                        maxLength={9}
                        required
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        aria-invalid={Boolean(errors.reference)}
                        aria-describedby={errors.reference ? 'reference-error' : 'reference-hint'}
                        className={`${FORM_INPUT_CLASS} ${inputState(errors.reference)} uppercase tracking-[0.08em]`}
                      />
                    </FormField>

                    <FormField id="email" label="Booking email" error={errors.email} attempt={attempt}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        required
                        value={draft.email}
                        onChange={(event) => set('email', event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`${FORM_INPUT_CLASS} ${inputState(errors.email)}`}
                      />
                    </FormField>

                    <FormField id="name" label="Lead passenger or requester" error={errors.name} attempt={attempt}>
                      <input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        value={draft.name}
                        onChange={(event) => set('name', event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`${FORM_INPUT_CLASS} ${inputState(errors.name)}`}
                      />
                    </FormField>

                    <FormField id="phone" label="Phone" optional attempt={attempt} hint="Useful when timing is urgent">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={draft.phone}
                        onChange={(event) => set('phone', event.target.value)}
                        aria-describedby="phone-hint"
                        className={`${FORM_INPUT_CLASS} ${inputState()}`}
                      />
                    </FormField>

                    <FormField
                      id="details"
                      label={`${selectedAction.label} — details`}
                      error={errors.details}
                      attempt={attempt}
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="details"
                        name="details"
                        rows={6}
                        required
                        value={draft.details}
                        onChange={(event) => set('details', event.target.value)}
                        placeholder="Tell us exactly what should change, any dates or times involved, and how flexible the request is"
                        aria-invalid={Boolean(errors.details)}
                        aria-describedby={errors.details ? 'details-error' : undefined}
                        className={`${FORM_TEXTAREA_CLASS} ${inputState(errors.details)}`}
                      />
                    </FormField>
                  </div>

                  {deliveryIssue && (
                    <p
                      ref={deliveryErrorRef}
                      id="booking-delivery-error"
                      role="alert"
                      tabIndex={-1}
                      className="mt-stack border-l-2 border-red-400/60 pl-4 font-sans text-body text-red-300/90"
                    >
                      {deliveryIssue === 'staff-only'
                        ? 'The operations desk received the request, but your confirmation email could not be delivered. Try again — only the confirmation will be retried.'
                        : 'We could not deliver the request. Your details are still here; check your connection and try again, or call the desk for immediate help.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className={`btn-beige-filled inline-flex items-center gap-3 disabled:cursor-wait disabled:opacity-80 ${deliveryIssue ? 'mt-block' : 'mt-stack'}`}
                  >
                    {sending && (
                      <span aria-hidden="true" className="h-3 w-3 flex-none animate-spin rounded-full border border-current border-t-transparent" />
                    )}
                    {sending
                      ? 'Sending request'
                      : deliveryIssue === 'staff-only'
                        ? 'Retry confirmation email'
                        : deliveryIssue === 'failed'
                          ? 'Try sending again'
                          : 'Send to operations'}
                  </button>

                  <p id="booking-privacy-note" className={FORM_PRIVACY_CLASS}>
                    Nothing is changed automatically. The desk verifies this request against the booking record before acting. Read our{' '}
                    <Link to="/privacy" className="text-white/60 underline decoration-white/25 underline-offset-4 transition-colors duration-400 hoverable:text-beige">
                      privacy notice
                    </Link>
                    .
                  </p>
                </form>
              </Reveal>

              <Reveal from="fade" className="lg:col-span-4">
                <aside className="border border-white/[0.1] bg-white/[0.015] p-[clamp(1.35rem,3vw,2rem)]">
                  <p className="text-micro font-sans uppercase text-beige/70">Before you send</p>
                  <h2 className="mt-flow font-serif text-title text-white">The desk confirms the final action</h2>
                  <ul className="mt-block space-y-block">
                    {[
                      'Submitting a cancellation request does not release the aircraft automatically.',
                      'Any applicable charges are explained before the cancellation is confirmed.',
                      'For a flight departing soon, call instead of relying on email.',
                    ].map((item) => (
                      <li key={item} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="mt-[0.45em] h-px w-3 flex-none bg-beige/60" />
                        <span className="font-sans text-body text-white/50">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`tel:${site.contact.phoneHref}`} className="btn-beige-outline mt-stack">
                    Call {site.contact.phone}
                  </a>
                </aside>
              </Reveal>
            </div>
          </>
        )}
      </Section>

      <Section id="what-happens-next" divided>
        <SectionIntro
          index="02"
          eyebrow="What happens next"
          title={['Verified first.', 'Confirmed', 'personally.']}
          accent={[2]}
          lead="A booking change has operational and sometimes financial consequences. The handover stays human at the point that matters."
        />

        <ProofGrid
          items={[
            {
              title: 'Request received',
              body: 'The structured brief reaches the operations desk with your reference and contact details together.',
            },
            {
              title: 'Record verified',
              body: 'The desk checks the real booking system, aircraft position and applicable terms before proposing an action.',
            },
            {
              title: 'Change confirmed',
              body: 'Nothing is final until the desk confirms it directly and issues updated documentation where required.',
            },
          ]}
          columns={3}
        />
      </Section>

      <CTABand
        eyebrow="Any hour"
        title={['Rather just', 'speak to', 'someone?']}
        accent={[2]}
        lead={`The operations desk is staffed continuously. Call ${site.contact.phone} when the flight is close or the change cannot wait.`}
        primary={{ label: 'Contact the desk', to: '/contact' }}
        secondary={{ label: 'Request a quote', to: '/quote' }}
        image="/images/safety_runway_hero.jpg"
      />
    </PageWrapper>
  );
}
