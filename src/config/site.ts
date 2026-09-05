/**
 * EDIT THIS FILE FIRST.
 *
 * Everything here appears across the whole site — navigation, footer,
 * contact pages, legal pages, structured data. Changing a value here
 * changes it everywhere; nothing below is duplicated in a page file.
 */

export const site = {
  name: 'Solara Jets',
  /** used where the name must be short, e.g. the wordmark */
  shortName: 'Solara',
  legalName: 'Solara Jets Ltd.',
  founded: 2009,

  tagline: 'Private jet charter and membership',
  description:
    'Private jet charter and membership — designed around your time, your schedule, and the way you travel.',

  url: 'https://solara-aviation.netlify.app',
  language: 'en',
  locale: 'en_GB',
  themeColor: '#0B0C0F',
  socialImage: {
    src: '/images/hero_clouds_wing.jpg',
    alt: 'A private aircraft wing above a blanket of clouds',
  },

  contact: {
    phone: '+1 (888) 555-0147',
    /** digits only, for tel: links */
    phoneHref: '+18885550147',
    email: 'fly@solarajets.com',
    opsEmail: 'ops@solarajets.com',
    pressEmail: 'press@solarajets.com',
    careersEmail: 'careers@solarajets.com',
    /** shown in the footer and on Contact */
    address: ['Hangar 7, Executive Aviation Terminal', 'Farnborough Airport', 'Hampshire GU14 6XA'],
    /** free text — appears next to the phone number */
    availability: '24/7 operations desk',
    responseTime: 'Quotes returned within 2 hours',
  },

  social: {
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    x: 'https://x.com/',
  },

  /** Certifications shown on Safety and in the footer trust row. */
  accreditations: ['ARGUS Platinum', 'Wyvern Wingman', 'IS-BAO Stage 3', 'EASA AOC'],
} as const;

/**
 * Wording for the two actions that repeat across every page.
 * Kept here so a buyer can change "Request a quote" once.
 */
export const cta = {
  primary: { label: 'Request a quote', to: '/quote' },
  secondary: { label: 'Explore membership', to: '/membership' },
} as const;
