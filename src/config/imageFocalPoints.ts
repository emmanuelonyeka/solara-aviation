/**
 * Editorial focal points for images whose subjects sit away from centre.
 *
 * The first percentage controls the horizontal crop. Raising it reveals more
 * of the image's right side (so the image appears to move left); lowering it
 * reveals more of the left. The second percentage controls the vertical crop.
 */
const imageFocalPoints: Readonly<Record<string, string>> = {
    '/images/about/founders-hangar.webp': '80% 50%',
    '/images/about/question-cta.webp': '80% 50%',
    '/images/about/quote-review.webp': '58% 50%',
    '/images/blog/editorial-desk.webp': '64% 50%',
    '/images/blog/reader-question.webp': '64% 50%',
    '/images/careers/crew-briefing.webp': '75% 50%',
    '/images/careers/interview.webp': '55% 50%',
    '/images/concierge/airside-transfer.webp': '80% 50%',
    '/images/concierge/concierge-desk.webp': '68% 50%',
    '/images/concierge/private-access.webp': '58% 50%',
    '/images/concierge/private-terminal.webp': '58% 50%',
    '/images/contact/operations-desk.webp': '85% 50%',
    '/images/corporate/executive-travel.webp': '69% 50%',
    '/images/corporate/reporting.webp': '55% 50%',
    '/images/faq/client-consultation.webp': '85% 50%',
    '/images/faq/support-desk.webp': '72% 50%',
    '/images/legal/accessibility-terminal.webp': '72% 50%',
    '/images/manage-booking/support.webp': '72% 50%',
    '/images/membership/advisor.webp': '80% 50%',
    '/images/membership/jet-card.webp': '56% 50%',
    '/images/membership_window_hero.jpg': '62% 50%',
    '/images/partners/hospitality-network.webp': '80% 50%',
    '/images/partners/vetting.webp': '56% 50%',
    '/images/press/briefing.webp': '85% 50%',
    '/images/press/desk.webp': '70% 50%',
    '/images/safety/audit-documents.webp': '72% 50%',
    '/images/safety/flight-watch.webp': '58% 50%',
    '/images/safety/weather-decision.webp': '58% 50%',
    '/images/sustainability/efficient-repositioning.webp': '55% 50%',
    '/images/sustainability/emissions-report.webp': '55% 50%',
  };
  
  export function getImageFocalPoint(image: string): string {
    return imageFocalPoints[image] ?? '50% 50%';
  }