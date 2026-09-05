/**
 * LEGAL DOCUMENTS — edit here, not in the page files.
 *
 * Each page renders one entry. `body` paragraphs support no markup; a section
 * with a `list` renders it beneath the paragraphs.
 *
 * IMPORTANT FOR WHOEVER SELLS OR BUYS THIS TEMPLATE: this is plain-English
 * placeholder wording written to be readable, not legal advice, and it has not
 * been reviewed by a lawyer. Have a solicitor check it against your jurisdiction
 * and your actual data handling before you publish.
 */

export interface LegalSection {
    id: string;
    heading: string;
    body: string[];
    list?: string[];
  }
  
  export interface LegalDocument {
    slug: string;
    title: string;
    /** Shown in the hero and the page title. */
    eyebrow: string;
    updated: string;
    intro: string;
    sections: LegalSection[];
  }
  
  const UPDATED = 'August 2026';
  
  export const privacy: LegalDocument = {
    slug: 'privacy',
    title: 'Privacy Policy',
    eyebrow: 'Privacy',
    updated: UPDATED,
    intro:
      'What we collect, why we hold it, and how to make us delete it. Written to be read rather than to be defensible.',
    sections: [
      {
        id: 'what-we-collect',
        heading: 'What we collect',
        body: [
          'Only what a flight actually requires, plus what you volunteer. We do not buy data about you from anyone, and we do not build a profile beyond what you have told us directly.',
        ],
        list: [
          'Contact details you give us: name, email, phone',
          'Trip details: routes, dates, party size, preferences',
          'Passenger information required for a specific flight, including documents where a border demands them',
          'Basic technical data from this website — pages viewed, and nothing that identifies you personally',
        ],
      },
      {
        id: 'why',
        heading: 'Why we hold it',
        body: [
          'To quote for a flight, to operate it, and to meet the record-keeping obligations that come with aviation. Preferences are kept so you do not have to repeat them on every booking.',
          'We do not use your information to advertise to you, and we do not sell or rent it to anyone under any circumstances.',
        ],
      },
      {
        id: 'sharing',
        heading: 'Who sees it',
        body: [
          'Only the parties who need it to make your flight happen: the operator flying you, the handling agents at each end, and border authorities where the law requires it.',
          'Every partner is bound by the same confidentiality terms we hold ourselves to. Manifests are never released to anyone else, including to press, and including after the fact.',
        ],
      },
      {
        id: 'retention',
        heading: 'How long we keep it',
        body: [
          'Flight records are retained for the period aviation regulation requires. Everything else is kept while you are a client and for a reasonable period afterwards, then deleted.',
          'You can ask us to delete anything not subject to a legal retention requirement, and we will do it rather than argue about it.',
        ],
      },
      {
        id: 'your-rights',
        heading: 'Your rights',
        body: [
          'You can ask for a copy of everything we hold about you, ask us to correct it, or ask us to delete it. Write to the address on the contact page and we will respond within one month, usually much sooner.',
        ],
      },
      {
        id: 'contact',
        heading: 'Questions',
        body: [
          'Any question about this policy can go to the general enquiries address on the contact page. A person answers it, not a form.',
        ],
      },
    ],
  };
  
  export const terms: LegalDocument = {
    slug: 'terms',
    title: 'Terms of Service',
    eyebrow: 'Terms',
    updated: UPDATED,
    intro:
      'The terms this website operates under, and how a booking becomes binding. Flight-specific terms are issued with each quote.',
    sections: [
      {
        id: 'about-us',
        heading: 'Who you are contracting with',
        body: [
          'We arrange flights operated by third-party air carriers holding their own operating certificates. We are not the operator of the aircraft, and the operator is identified to you before you commit to a flight.',
        ],
      },
      {
        id: 'quotes',
        heading: 'Quotes and bookings',
        body: [
          'A quote is an offer to arrange a flight at a stated price, valid for the period noted on it. Availability is not held until you confirm.',
          'A booking becomes binding when you confirm in writing and we acknowledge it. The written confirmation, together with the flight-specific terms issued with it, is the agreement between us.',
        ],
      },
      {
        id: 'pricing',
        heading: 'What the price includes',
        body: [
          'Positioning, handling, standard catering, crew and applicable taxes are included in the figure we quote. Anything not included is itemised on the quote itself rather than added later.',
          'The price changes only if you change the trip, or if a third-party charge outside our control changes — in which case we tell you before it is applied.',
        ],
      },
      {
        id: 'changes',
        heading: 'Changes and cancellation',
        body: [
          'Changes are accommodated wherever the operator can accommodate them. Cancellation charges depend on how close to departure you are and are set out in the flight-specific terms issued with your confirmation.',
          'We may cancel or reroute a flight for safety, weather, technical or regulatory reasons. Where we do, we offer an alternative or a refund, and safety is never traded against a commercial outcome.',
        ],
      },
      {
        id: 'your-obligations',
        heading: 'What we need from you',
        body: [
          'Accurate passenger details, valid travel documents, and prompt notice of anything that affects the flight — a change of party size, restricted items, or the presence of an animal.',
        ],
      },
      {
        id: 'liability',
        heading: 'Liability',
        body: [
          'Carriage is subject to the operator\'s conditions of carriage and to the international conventions that govern air travel. Nothing in these terms limits liability where the law does not permit it to be limited.',
        ],
      },
      {
        id: 'law',
        heading: 'Governing law',
        body: [
          'These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction over any dispute arising from them.',
        ],
      },
    ],
  };
  
  export const disclosures: LegalDocument = {
    slug: 'disclosures',
    title: 'Regulatory Disclosures',
    eyebrow: 'Disclosures',
    updated: UPDATED,
    intro:
      'What we are, what we are not, and what the figures on this website mean. Published because most operators do not.',
    sections: [
      {
        id: 'our-role',
        heading: 'Our role',
        body: [
          'We are a charter broker. We arrange flights operated by licensed third-party air carriers; we do not hold an air operator certificate and we do not operate aircraft ourselves.',
          'The operator for your flight is named before you commit, and their certificate and current audit status are available on request.',
        ],
      },
      {
        id: 'aircraft',
        heading: 'Aircraft availability',
        body: [
          'Aircraft shown on this website are representative of the types we arrange. Specific aircraft, registrations and configurations vary by operator and by date, and availability is confirmed per booking rather than held permanently.',
        ],
      },
      {
        id: 'figures',
        heading: 'Figures on this website',
        body: [
          'Range, speed, seating and cabin dimensions are manufacturer figures for the type and vary with configuration, load and conditions. Range figures assume still air and are not a guarantee of non-stop capability on a given day.',
          'Where a figure is a minimum or a best case, we say so alongside it rather than in a footnote.',
        ],
      },
      {
        id: 'pricing-disclosure',
        heading: 'Pricing',
        body: [
          'Indicative pricing is exactly that. Charter rates move with aircraft, route, season and demand, and a firm figure is only ever the one on a written quote issued for your specific trip.',
        ],
      },
      {
        id: 'environmental',
        heading: 'Environmental claims',
        body: [
          'We say every flight is offset. We do not say flying is carbon neutral, because offsetting reduces net impact rather than removing the emission. Emissions figures are calculated on a published methodology and issued per flight.',
        ],
      },
      {
        id: 'website-content',
        heading: 'Website content',
        body: [
          'Aircraft specifications, availability, destination information and indicative pricing are provided for general guidance and are subject to change without notice. Nothing on this website constitutes a binding offer or a guarantee of availability.',
        ],
      },
    ],
  };
  
  export const cookies: LegalDocument = {
    slug: 'cookies',
    title: 'Cookie Policy',
    eyebrow: 'Cookies',
    updated: UPDATED,
    intro:
      'Which cookies this site sets, what each one does, and how to change your mind at any point.',
    sections: [
      {
        id: 'what-they-are',
        heading: 'What a cookie is here',
        body: [
          'A small file this site stores in your browser. We use very few, and none of them identify you personally or follow you to other websites.',
        ],
      },
      {
        id: 'essential',
        heading: 'Essential cookies',
        body: [
          'These make the site work and cannot be switched off. They do not require consent because without them nothing functions.',
        ],
        list: [
          'Your cookie choice itself, so you are not asked on every page',
          'Your position on a page, so a reload returns you to where you were reading',
          'An in-progress quote, so a refresh does not lose what you have entered',
        ],
      },
      {
        id: 'analytics',
        heading: 'Analytics cookies',
        body: [
          'Optional, and only set if you accept them. They tell us which pages are read and where people give up, in aggregate. They do not record who you are.',
          'Declining them changes nothing about how the site behaves for you.',
        ],
      },
      {
        id: 'no-advertising',
        heading: 'What we do not use',
        body: [
          'No advertising cookies, no cross-site trackers, no third-party pixels, and no data sold or shared with advertising networks. There is nothing here to opt out of because we never set it in the first place.',
        ],
      },
      {
        id: 'changing',
        heading: 'Changing your mind',
        body: [
          'Clear this site\'s data in your browser settings and the notice will appear again on your next visit, letting you choose differently. You can also block cookies entirely in your browser — the site will still work.',
        ],
      },
    ],
  };
  
  export const accessibility: LegalDocument = {
    slug: 'accessibility',
    title: 'Accessibility',
    eyebrow: 'Accessibility',
    updated: UPDATED,
    intro:
      'What we have done, what we know is imperfect, and how to tell us when something blocks you.',
    sections: [
      {
        id: 'standard',
        heading: 'The standard we work to',
        body: [
          'We aim to meet WCAG 2.1 at Level AA. That is a target we work toward continuously rather than a certificate we claim once.',
        ],
      },
      {
        id: 'what-we-have-done',
        heading: 'What is in place',
        body: [
          'These are built in rather than added afterwards, and each is tested when a page changes.',
        ],
        list: [
          'Every animation respects the reduced-motion setting in your operating system',
          'Text scales fluidly, and the site remains usable when zoomed',
          'Form fields carry labels and error messages that screen readers announce',
          'Interactive elements are reachable and operable by keyboard alone',
          'Colour is never the only way information is conveyed',
          'Images that carry meaning have descriptions; decorative ones are hidden from assistive technology',
        ],
      },
      {
        id: 'known-gaps',
        heading: 'Where we know we fall short',
        body: [
          'Stating this openly is more useful than claiming full compliance.',
        ],
        list: [
          'The home page uses scroll-driven animation which, while it honours reduced-motion, is still an unconventional reading experience',
          'Some photographic contrast ratios in decorative areas sit below AA, though no text depends on them',
          'Third-party embeds, where used, are outside our direct control',
        ],
      },
      {
        id: 'tell-us',
        heading: 'If something blocks you',
        body: [
          'Write to the general enquiries address on the contact page and describe what happened. We treat access problems as faults rather than requests, and we will tell you when it is fixed.',
          'If you would rather not use this website at all, everything here can be done by telephone. The operations desk is staffed continuously.',
        ],
      },
    ],
  };
  
  export const legalDocuments = [privacy, terms, disclosures, cookies, accessibility];
  