# Solara Jets — Luxury Aviation Frontend

Solara Jets is a production-ready frontend template for a private aviation brand. It is built with React 19, TypeScript, Vite, Tailwind CSS, GSAP and Lenis.

The project demonstrates a complete luxury digital experience: a scroll-driven homepage, fleet and aircraft pages, destination guides, membership and corporate pages, editorial content, accessible legal pages, a five-step quote flow, EmailJS notifications and a structured booking-support request flow.

## Project scope

This repository is intentionally frontend-only.

- Email delivery is demonstrated with EmailJS.
- Quote, contact and booking-support forms default to a safe non-sending demo mode.
- No booking data is stored, retrieved, changed or cancelled in the browser.
- No database, authentication service, serverless function or backend API is included.
- Booking support sends a structured request for a real operations team to verify; it never claims that an EmailJS form changed a booking.

Real booking lookup, authenticated changes, cancellations, payment adjustments and persistent records belong to the buyer's backend integration.

## Getting started

```bash
npm ci
npm run dev
```

Node.js 20.19 or newer is required.

## Quality commands

```bash
npm run lint       # ESLint with zero warnings allowed
npm run typecheck  # strict TypeScript validation
npm run build      # type-check and create the production bundle
npm run verify:release # verify generated SEO files, local assets and bundle budgets
npm run audit:production # audit production dependencies for high-severity issues
npm run check      # lint, type-check, build and verify the release
npm run preview    # preview the production bundle
```

## Configuration

Content and brand information are intentionally separated from page components.

| Change | File |
|---|---|
| Company name, production URL, metadata, contact details and social links | `src/config/site.ts` |
| Primary, footer and legal navigation | `src/config/navigation.ts` |
| Demo/live form mode | `src/config/runtime.ts` and `.env` |
| EmailJS identifiers | `src/config/email.ts` and `.env` |
| Aircraft and specifications | `src/data/aircraft.ts` |
| Destinations and airports | `src/data/destinations.ts`, `src/data/airports.ts` |
| Membership tiers | `src/data/membership.ts` |
| Empty-leg examples | `src/data/emptyLegs.ts` |
| Journal content | `src/data/articles.ts` |
| Careers and press content | `src/data/careers.ts`, `src/data/press.ts` |
| Leadership profiles and portrait paths | `src/data/about.ts` |
| Legal documents | `src/data/legal.ts` |
| Homepage copy | `src/data/home.ts` |
| Colours, typography and spacing | `tailwind.config.js` |

## Image library

Production imagery lives in `public/images/` and is grouped by page or subject. Use truthful file extensions: a `.webp` file must contain WebP data, and a `.jpg` file must contain JPEG data. This prevents silent browser failures and keeps the fallback UI reserved for genuinely missing assets.

Leadership portraits belong in `public/images/team/`. Their public paths are assigned to the `photo` fields in `src/data/about.ts`. Portraits use a 3:4 crop; page and editorial imagery use a 3:2 landscape crop. Keep replacement files close to the existing dimensions and run `npm run verify:release` after changing any filename.

Aircraft and destination detail galleries are data-driven:

- `src/data/aircraft.ts` uses the main `image` for the hero and three ordered `gallery` images for cabin, mission and detail sections.
- `src/data/destinations.ts` uses the main `image` for the hero and two ordered `gallery` images for arrival and FBO sections.
- `src/data/articles.ts` owns every journal cover, so index cards and article pages cannot drift apart.

## EmailJS setup

The safe default is `demo` mode. Forms validate, animate and show their success states without sending email.

To enable EmailJS:

1. Create an EmailJS service.
2. Create one operations template and one client-confirmation template.
3. Copy `.env.example` to `.env`.
4. Add the four EmailJS identifiers.
5. Set `VITE_FORM_MODE=live`.

```env
VITE_FORM_MODE=live
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_STAFF_TEMPLATE=
VITE_EMAILJS_CLIENT_TEMPLATE=
```

Available template variables:

```text
reference
request_type
status
route
depart_date
return_date
passengers
aircraft
client_name
client_email
client_phone
notes
```

The operations email is attempted first. The client confirmation is sent only after the operations copy succeeds. A failed client copy can be retried without repeating the successful operations copy during the current browser session.

EmailJS public identifiers are browser-visible by design. Restrict the EmailJS account to approved domains and apply appropriate provider limits before publishing a live demo.

## Forms and backend integration seam

The frontend form architecture is intentionally divided by responsibility:

```text
src/services/email.ts                    Shared EmailJS transport and retry handling
src/features/booking/quoteDraft.ts       Quote draft, dates and validation rules
src/features/booking/emailPayload.ts     Quote-to-EmailJS field mapping
src/features/booking/reference.ts        Reference generation and format validation
src/features/submissions/emailPayloads.ts Contact and booking-support field mapping
```

## Deployment

The production output is generated in `dist/`.

- Netlify configuration: `netlify.toml` and `public/_redirects`
- Vercel configuration: `vercel.json`

Both configurations support React Router deep links by serving application routes from `index.html`.

Before publishing:

1. Set the final HTTPS domain once in `src/config/site.ts`.
2. Copy `.env.example` to `.env` and choose demo or live EmailJS mode.
3. Run `npm ci` and `npm run check`.
4. Run `npm run audit:production`.
5. Preview `dist/` with `npm run preview`, including at least one direct visit to a nested route.

The Vite production build generates `sitemap.xml`, `robots.txt` and `site.webmanifest` from the central site configuration and the aircraft, destination and article datasets. Do not hand-edit their copies in `dist/`.

## Source structure

```text
src/
  components/   Reusable layout, form, section and system components
  config/       Public brand, runtime and EmailJS configuration
  data/         Editable website content and datasets
  features/     Isolated frontend feature logic and integration contracts
  hooks/        Scroll and navigation behaviour
  lib/          Small framework-independent helpers
  pages/        Route-level page components
  services/     Third-party frontend services such as EmailJS
  styles/       Homepage, navigation and accessibility styles
  types/        Browser-level TypeScript declarations
scripts/        Dependency-free production release verification
```

The homepage pinned-scroll choreography is protected across these coordinated files:

```text
src/pages/Home.tsx
src/hooks/useHomeScroll.ts
src/styles/home-motion.css
src/components/home/*
src/data/home.ts
```

Do not change their scroll geometry, DOM order or animation timing without testing the complete pinned sequence.

## Accessibility and discoverability

- Reduced-motion preferences are respected.
- Form controls have labels and announced validation errors.
- Interactive elements are keyboard operable.
- Route changes are announced.
- Skip navigation and focus-visible behaviour are included.
- Every indexable route receives a canonical URL, crawler directives and complete social-sharing metadata.
- Missing and private booking-support routes are marked `noindex`.
- Organisation, website and page JSON-LD are emitted without adding visible page content.
- Sitemap entries are generated from the same datasets that render the site, preventing stale detail-page URLs.

## Template notes

- Aircraft specifications vary by real-world configuration.
- Team members, testimonials, articles and press content are demonstration data.
- Legal copy is placeholder content and should be reviewed for the buyer's jurisdiction.
- Buyers should replace all imagery and business details before commercial deployment.

## Licence

Licensed for use by the purchaser. Redistribution or resale of the unmodified source template is not permitted.
