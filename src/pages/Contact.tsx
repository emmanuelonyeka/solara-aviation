import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import MetaTags from '../components/shared/MetaTags';
import Reveal from '../components/shared/Reveal';
import FormField from '../components/form/FormField';
import SendingOverlay from '../components/form/SendingOverlay';
import { Section, SectionIntro, PageHero, SpecTable, CTABand, PageChapterNav } from '../components/section';
import { runtimeConfig } from '../config/runtime';
import { site } from '../config/site';
import { createReference } from '../features/booking';
import { createContactEmailPayload, type ContactSubmission } from '../features/submissions';
import { FORM_INPUT_CLASS, FORM_PRIVACY_CLASS, FORM_TEXTAREA_CLASS, focusFirstInvalid, isValidEmail } from '../lib/forms';
import { sendEmail, type EmailDeliveryResult } from '../services/email';

const ENQUIRY_TYPES = ['A flight', 'Membership', 'Corporate account', 'Press', 'Something else'] as const;

interface Draft {
  name: string;
  email: string;
  phone: string;
  enquiry: string;
  message: string;
}

const EMPTY: Draft = { name: '', email: '', phone: '', enquiry: ENQUIRY_TYPES[0], message: '' };

const inputState = (invalid?: string) =>
  invalid ? 'border-red-400/55 bg-red-400/[0.03]' : 'border-white/15 focus:border-beige/60 focus:bg-white/[0.05]';

function fieldIsValid(key: keyof Draft, draft: Draft): boolean {
  switch (key) {
    case 'name':
      return draft.name.trim().length > 0;
    case 'email':
      return isValidEmail(draft.email);
    case 'message':
      return draft.message.trim().length >= 10;
    default:
      return true;
  }
}

export default function Contact() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [attempt, setAttempt] = useState(0);
  const [sending, setSending] = useState(false);
  const [delivery, setDelivery] = useState<EmailDeliveryResult | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<ContactSubmission | null>(null);
  const [deliveryIssue, setDeliveryIssue] = useState<'failed' | 'staff-only' | null>(null);
  const dispatchLockRef = useRef(false);
  const pendingMessageRef = useRef<ContactSubmission | null>(null);
  const deliveryErrorRef = useRef<HTMLParagraphElement>(null);

  /* Keep the confirmation in view without replaying the hero. */
  useEffect(() => {
    if (!delivery) return;
    const anchor = document.getElementById('write-to-us');
    if (!anchor) return;
    const lenis = window.__lenis;
    const top = anchor.getBoundingClientRect().top + window.scrollY - 120;
    if (lenis) lenis.scrollTo(top, { duration: 0.9 });
    else window.scrollTo({ top, behavior: 'smooth' });
  }, [delivery]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    const nextDraft: Draft = { ...draft, [key]: value };
    setDraft(nextDraft);
    pendingMessageRef.current = null;
    setDeliveryIssue(null);
    setErrors((current) => {
      const nextErrors = { ...current };
      (Object.keys(nextErrors) as (keyof Draft)[]).forEach((field) => {
        if (nextErrors[field] && fieldIsValid(field, nextDraft)) delete nextErrors[field];
      });
      return nextErrors;
    });
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (dispatchLockRef.current) return;

    const next: Partial<Record<keyof Draft, string>> = {};

    if (!draft.name.trim()) next.name = 'We need a name so we know who we are replying to.';
    if (!draft.email.trim()) next.email = 'We need an email address to reply to.';
    else if (!isValidEmail(draft.email)) next.email = 'Check this for a typo.';
    if (!draft.message.trim()) next.message = 'Tell us what you need, even in one line.';
    else if (draft.message.trim().length < 10) next.message = 'A little more detail gets you a better answer.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setAttempt((a) => a + 1);
      focusFirstInvalid(next);
      return;
    }

    dispatchLockRef.current = true;
    setDeliveryIssue(null);
    setSending(true);

    const message = pendingMessageRef.current ?? {
      reference: createReference(),
      name: draft.name.trim(),
      email: draft.email.trim().toLowerCase(),
      phone: draft.phone.trim() || undefined,
      enquiry: draft.enquiry,
      message: draft.message.trim(),
    } satisfies ContactSubmission;
    pendingMessageRef.current = message;

    /* Minimum hold so the transition is legible — dispatch is often instant. */
    const [result] = await Promise.all([
      sendEmail(createContactEmailPayload(message)),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);

    setSending(false);
    dispatchLockRef.current = false;

    if (result.outcome === 'failed' || result.outcome === 'staff-only') {
      setDeliveryIssue(result.outcome);
      window.requestAnimationFrame(() => deliveryErrorRef.current?.focus());
      return;
    }

    setSubmittedMessage(message);
    setDelivery(result);
  };

  const isDemo = delivery?.outcome === 'demo';

  return (
    <PageWrapper>
      <SendingOverlay
        active={sending}
        statuses={
          runtimeConfig.formMode === 'demo'
            ? [
                'Preparing your preview',
                'Checking your message',
                'Finalising the demo',
              ]
            : [
                'Sending your message',
                'Reaching the desk',
                'Almost there',
              ]
        }
      />

      <MetaTags
        title="Contact"
        description="Reach the operations desk directly, at any hour. Phone, email, or a written enquiry answered within two hours."
        canonical="/contact"
      />

      <PageHero
        eyebrow="Contact"
        title={['A person', 'answers,', 'at any hour']}
        accent={[2]}
        lead="Not a ticket queue and not a chatbot. The desk is staffed continuously, and whoever picks up can route or answer the request directly."
        image="/images/contact/operations-desk.webp"
        imageAlt="Solara operations desk staffed beside the airfield at night"
        meta={[
          { label: 'Desk', value: site.contact.availability },
          { label: 'Written reply', value: 'Within 2 hrs' },
          { label: 'Phone', value: 'Answered directly' },
        ]}
      />

      <PageChapterNav items={[
        { id: 'direct-lines', label: 'Direct lines' },
        { id: 'write-to-us', label: 'Write to us' },
      ]} />

      <Section id="direct-lines">
        <SectionIntro
          index="01"
          eyebrow="Direct lines"
          title={['Pick whichever', 'is quickest', 'for you']}
          accent={[1]}
          lead="Anything urgent should be a phone call. Anything that needs a paper trail should be an email. Both reach the same team."
        />

        <div className="grid gap-stack lg:grid-cols-12 lg:gap-x-[6%]">
          <Reveal from="up" distance={26} className="lg:col-span-5">
            <SpecTable
              specs={[
                {
                  label: 'Flights and quotes',
                  value: <a href={`tel:${site.contact.phoneHref}`} className="transition-colors duration-400 hoverable:text-beige">{site.contact.phone}</a>,
                },
                {
                  label: 'General',
                  value: <a href={`mailto:${site.contact.email}`} className="transition-colors duration-400 hoverable:text-beige">{site.contact.email}</a>,
                },
                {
                  label: 'Operations desk',
                  value: <a href={`mailto:${site.contact.opsEmail}`} className="transition-colors duration-400 hoverable:text-beige">{site.contact.opsEmail}</a>,
                },
                {
                  label: 'Press',
                  value: <a href={`mailto:${site.contact.pressEmail}`} className="transition-colors duration-400 hoverable:text-beige">{site.contact.pressEmail}</a>,
                },
                {
                  label: 'Careers',
                  value: <a href={`mailto:${site.contact.careersEmail}`} className="transition-colors duration-400 hoverable:text-beige">{site.contact.careersEmail}</a>,
                },
                { label: 'Address', value: site.contact.address.join(', ') },
              ]}
              columns={1}
            />
          </Reveal>

          <Reveal from="fade" className="overflow-hidden lg:col-span-7">
            <img
              src="/images/contact/direct-lines.webp"
              alt="Solara advisers answering direct client calls"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="write-to-us" divided>
        {delivery ? (
          <Reveal immediate from="up" distance={26} className="max-w-prose">
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {isDemo ? 'Preview completed. No message was sent.' : 'Message sent successfully.'}
            </p>

            <div className="flex items-center gap-4">
              <span className="h-px w-[clamp(1.75rem,5vw,3.5rem)] bg-beige/60" aria-hidden="true" />
              <span className="text-micro font-sans uppercase text-beige">
                {isDemo ? 'Preview complete' : 'Message sent'}
              </span>
            </div>

            <h2 className="mt-block font-serif text-display text-white">
              {isDemo ? 'Your message is ready' : 'Thank you — it is with the desk'}
            </h2>

            <p className="mt-block max-w-measure font-sans text-lead text-white/55">
              {isDemo
                ? 'Demo mode is active, so no email was sent and the operations desk was not contacted. For immediate assistance, call'
                : `${site.contact.responseTime}. If it is urgent, call`}{' '}
              <a href={`tel:${site.contact.phoneHref}`} className="text-beige/80 underline underline-offset-4">
                {site.contact.phone}
              </a>{' '}
              and someone will pick up.
            </p>

            <SpecTable
              className="mt-stack"
              specs={[
                { label: 'Reference', value: submittedMessage?.reference ?? 'Preview only' },
                { label: 'Enquiry', value: submittedMessage?.enquiry ?? 'General' },
                { label: 'Reply to', value: submittedMessage?.email ?? 'Not supplied' },
              ]}
              columns={1}
            />

            <button
              type="button"
              onClick={() => {
                setDelivery(null);
                setSubmittedMessage(null);
                setDeliveryIssue(null);
                setDraft(EMPTY);
                pendingMessageRef.current = null;
              }}
              className="mt-stack text-micro font-sans uppercase text-white/45 transition-colors duration-500 ease-lux active:opacity-60 hoverable:text-white"
            >
              Send another message
            </button>
          </Reveal>
        ) : (
          <>
            <SectionIntro
              index="02"
              eyebrow="Write to us"
              title={['Or put it', 'in writing']}
              accent={[1]}
              lead="Tell us what you actually need rather than filling in categories. Every message is read by a person before it is routed anywhere."
            />

            <Reveal from="up" distance={26} className="max-w-prose">
              <form
                onSubmit={submit}
                noValidate
                aria-busy={sending}
                aria-describedby={deliveryIssue ? 'contact-delivery-error contact-privacy-note' : 'contact-privacy-note'}
                inert={sending}
              >
                <fieldset className="border-0 p-0">
                  <legend className="text-micro font-sans uppercase text-white/50">
                    What is this about
                  </legend>

                  {/* Generous clearance from the legend, and an underline that
                      slides rather than snapping between options. */}
                  <div className="mt-block flex flex-wrap gap-x-block gap-y-flow">
                    {ENQUIRY_TYPES.map((type) => {
                      const active = draft.enquiry === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => set('enquiry', type)}
                          aria-pressed={active}
                          className="group relative pb-2 text-micro font-sans uppercase transition-[color,opacity] duration-500 ease-lux active:opacity-60"
                        >
                          <span className={active ? 'text-beige' : 'text-white/45 group-hoverable:text-white'}>
                            {type}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-beige transition-transform duration-500 ease-lux ${
                              active ? 'scale-x-100' : 'scale-x-0'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-stack grid gap-block sm:grid-cols-2">
                  <FormField id="name" label="Full name" error={errors.name} attempt={attempt}>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      value={draft.name}
                      onChange={(e) => set('name', e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`${FORM_INPUT_CLASS} ${inputState(errors.name)}`}
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
                      onChange={(e) => set('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`${FORM_INPUT_CLASS} ${inputState(errors.email)}`}
                    />
                  </FormField>

                  <FormField id="phone" label="Phone" optional attempt={attempt} hint="Only if you would rather we called">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={draft.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      aria-describedby="phone-hint"
                      className={`${FORM_INPUT_CLASS} ${inputState()}`}
                    />
                  </FormField>

                  <FormField
                    id="message"
                    label="Message"
                    error={errors.message}
                    attempt={attempt}
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={draft.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Route and dates, or the question you want answered"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${FORM_TEXTAREA_CLASS} ${inputState(errors.message)}`}
                    />
                  </FormField>
                </div>

                {deliveryIssue && (
                  <p
                    ref={deliveryErrorRef}
                    id="contact-delivery-error"
                    role="alert"
                    tabIndex={-1}
                    className="mt-stack border-l-2 border-red-400/60 pl-4 font-sans text-body text-red-300/90"
                  >
                    {deliveryIssue === 'staff-only'
                      ? 'The desk received your message, but your confirmation email could not be delivered. Try again — only the confirmation will be retried.'
                      : 'We could not deliver your message. Your details are still here; check your connection and try again, or call us for immediate help.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className={`btn-beige-filled inline-flex items-center gap-3 disabled:cursor-wait disabled:opacity-80 ${deliveryIssue ? 'mt-block' : 'mt-stack'}`}
                >
                  {sending && (
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 flex-none animate-spin rounded-full border border-current border-t-transparent"
                    />
                  )}
                  {sending
                    ? 'Sending'
                    : deliveryIssue === 'staff-only'
                      ? 'Retry confirmation email'
                      : deliveryIssue === 'failed'
                        ? 'Try sending again'
                        : 'Send message'}
                </button>

                <p id="contact-privacy-note" className={FORM_PRIVACY_CLASS}>
                  Your details are used only to respond to this enquiry. Read our{' '}
                  <Link to="/privacy" className="text-white/60 underline decoration-white/25 underline-offset-4 transition-colors duration-400 hoverable:text-beige">
                    privacy notice
                  </Link>
                  .
                </p>
              </form>
            </Reveal>
          </>
        )}
      </Section>

      <CTABand
        eyebrow="Already have a reference"
        title={['Send the change', 'straight to', 'operations.']}
        accent={[2]}
        lead="Submit the reference and requested action in one brief. Nothing changes until the operations desk verifies and confirms it with you."
        primary={{ label: 'Request booking support', to: '/manage-booking' }}
        secondary={{ label: 'Request a quote', to: '/quote' }}
        image="/images/hero_clouds_wing.jpg"
      />
    </PageWrapper>
  );
}
