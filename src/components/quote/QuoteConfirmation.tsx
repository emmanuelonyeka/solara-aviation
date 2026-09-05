import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { formatBookingDate, type QuoteRequest } from '../../features/booking';
import type { EmailDeliveryResult } from '../../services/email';
import PageWrapper from '../layout/PageWrapper';
import MetaTags from '../shared/MetaTags';
import Reveal from '../shared/Reveal';
import { SpecTable } from '../section';

interface QuoteConfirmationProps {
  booking: QuoteRequest;
  delivery: EmailDeliveryResult | null;
}

export default function QuoteConfirmation({ booking, delivery }: QuoteConfirmationProps) {
  const isDemo = delivery?.outcome === 'demo';

  return (
    <PageWrapper>
      <MetaTags
        title={isDemo ? 'Request Preview' : 'Request Received'}
        description={
          isDemo
            ? 'Preview a completed private-flight request without sending email.'
            : 'Your flight request has reached the operations desk.'
        }
        canonical="/quote"
      />

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isDemo ? 'Preview saved' : 'Request received'}. Your booking reference is {booking.reference}.
      </p>

      <header className="relative min-h-[100svh] overflow-hidden px-gutter pb-section pt-[clamp(8rem,14vw,10rem)]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero_clouds_wing.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/88" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/60 to-charcoal" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-prose">
          <Reveal immediate from="fade" className="flex items-center gap-4">
            <span className="h-px w-[clamp(1.75rem,5vw,3.5rem)] bg-beige/60" aria-hidden="true" />
            <span className="text-micro font-sans uppercase text-beige">
              {isDemo ? 'Preview complete' : 'Request received'}
            </span>
          </Reveal>

          <Reveal immediate from="up" distance={24} delay={0.12}>
            <h1 className="mt-block font-serif text-display text-white">
              {isDemo ? 'Your request is ready to review' : 'It is with the operations desk'}
            </h1>
          </Reveal>

          <Reveal immediate from="up" distance={22} delay={0.24}>
            <div className="mt-block border-y border-white/[0.12] py-block">
              <p className="text-micro font-sans uppercase text-white/40">Your reference</p>
              <p className="mt-flow font-serif tabular-nums text-beige text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] tracking-[0.06em]">
                {booking.reference}
              </p>
              <p className="mt-flow max-w-measure font-sans text-body text-white/50">
                {isDemo
                  ? 'Demo mode is active. No email was sent and this illustrative reference is not stored as a real booking.'
                  : 'Keep this reference. Include it whenever you ask the operations desk to change or cancel the request.'}
              </p>
            </div>
          </Reveal>

          <Reveal immediate from="up" distance={22} delay={0.36} className="mt-stack">
            <p className="mb-block text-micro font-sans uppercase text-white/40">What you asked for</p>
            <SpecTable
              specs={[
                { label: 'Route', value: `${booking.from} to ${booking.to}` },
                { label: 'Departing', value: formatBookingDate(booking.departDate) },
                {
                  label: 'Returning',
                  value: booking.returnDate ? formatBookingDate(booking.returnDate) : 'One way',
                },
                { label: 'Passengers', value: String(booking.passengers) },
                { label: 'Aircraft', value: booking.aircraft || 'We will recommend one' },
                { label: isDemo ? 'Email entered' : 'Sent to', value: booking.email },
              ]}
              columns={1}
            />
          </Reveal>

          <Reveal immediate from="up" distance={20} delay={0.5} className="mt-stack">
            <p className="max-w-measure font-sans text-body text-white/45">
              {isDemo
                ? 'No operations team was contacted. Switch the form to live mode only after EmailJS has been configured for the deployment.'
                : `${site.contact.responseTime}, with aircraft options and a single all-in price.`}
            </p>
            <div className="mt-block flex flex-col gap-[clamp(1.35rem,4vw,1.85rem)] min-[568px]:flex-row min-[568px]:items-center min-[568px]:gap-[clamp(1rem,2vw,1.5rem)]">
              <Link to={`/manage-booking?reference=${booking.reference}`} className="btn-beige-filled">
                {isDemo ? 'Preview booking support' : 'Manage this request'}
              </Link>
              <span>
                Or call 
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline">
                  {site.contact.phone}
                </a>
              </span>
            </div>
          </Reveal>
        </div>
      </header>
    </PageWrapper>
  );
}