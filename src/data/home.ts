/**
 * HOMEPAGE CONTENT
 *
 * Marketing copy is kept outside page layout so a buyer can safely tailor the
 * template without entering animation or component code. Animation timing and
 * selector contracts remain in useHomeScroll.ts.
 */

export const homeHero = {
  label: 'Private Aviation',
  title: [
    { text: 'Above', accent: true },
    { text: 'the', accent: false },
    { text: 'Clouds', accent: false },
  ],
  subtitle: 'Private jet charter and membership designed around your time, your schedule, and the way you travel.',
  primary: { label: 'Request a quote', to: '/quote' },
  secondary: { label: 'Explore membership', to: '/membership' },
  image: '/images/hero_clouds_wing.jpg',
  imageAlt: 'Above the clouds',
  thumbnails: [
    '/images/destinations_island_hero.jpg',
    '/images/fleet_hangar_hero.jpg',
    '/images/journey_mountain.jpg',
    '/images/safety_runway_hero.jpg',
  ],
} as const;

export const homeExperience = {
  label: 'Experience',
  titleLead: 'Experience',
  titleAccent: 'Above the Clouds',
  description: 'From takeoff to touchdown, every detail is tuned for calm, with quiet cabins, personalized service and seamless logistics.',
  cta: { label: 'See how we fly', to: '/fleet' },
  image: '/images/experience_clouds.jpg',
  imageAlt: 'Experience above the clouds',
} as const;

export const homeFleet = {
  label: 'Fleet',
  title: [
    { text: 'Discover', accent: true },
    { text: 'Your', accent: false },
    { text: 'Journey', accent: false },
  ],
  description: 'From light jets to long range aircraft, choose the cabin, range and schedule that fit your trip.',
  cta: { label: 'Explore the fleet', to: '/quote' },
  image: '/images/fleet_hangar_hero.jpg',
  imageAlt: 'Private jet fleet',
  thumbnails: [
    '/images/safety_runway_hero.jpg',
    '/images/destinations_island_hero.jpg',
    '/images/journey_island.jpg',
    '/images/hero_clouds_wing.jpg',
  ],
} as const;

export const homeDestinations = {
  label: 'Destinations',
  titleAccent: 'Discover',
  titleRest: 'the World',
  description: 'Access remote coastlines, mountain resorts and key cities, often landing closer than commercial routes allow.',
  cta: { label: 'View destinations', to: '/quote' },
  image: '/images/destinations_island_hero.jpg',
  imageAlt: 'Tropical destination',
  thumbnails: [
    '/images/journey_island.jpg',
    '/images/journey_city.jpg',
    '/images/closing_island_aerial.jpg',
    '/images/experience_clouds.jpg',
  ],
} as const;

export const homeSafety = {
  label: 'Safety',
  title: [
    { text: 'Safety', accent: true },
    { text: '& Service', accent: false },
  ],
  description: 'ARGUS and Wyvern aligned operations, experienced crews and 24/7 support mean you are never flying without a plan.',
  cta: { label: 'See safety standards', to: '/safety' },
  image: '/images/safety_runway_hero.jpg',
  imageAlt: 'Safety and service',
  thumbnails: [
    '/images/fleet_hangar_hero.jpg',
    '/images/hero_clouds_wing.jpg',
    '/images/membership_window_hero.jpg',
    '/images/destinations_island_hero.jpg',
  ],
} as const;

export const homeMembership = {
  label: 'Membership',
  titleAccent: 'Join',
  titleRest: 'the Experience',
  description: 'Membership is the easiest way to lock in preferred rates, guaranteed availability, and a crew that knows your preferences.',
  cta: { label: 'Explore membership', to: '/membership' },
  image: '/images/membership_window_hero.jpg',
  imageAlt: 'Membership experience',
  quote: {
    text: 'Once you have tasted flight, you will forever walk the earth with your eyes turned skyward.',
    author: 'Leonardo da Vinci',
  },
  thumbnails: [
    '/images/journey_mountain.jpg',
    '/images/membership_window_hero.jpg',
    '/images/experience_clouds.jpg',
    '/images/closing_island_aerial.jpg',
  ],
} as const;

export const homeTeasers = {
  fleet: { label: 'View the full fleet', to: '/fleet' },
  destinations: { label: 'Explore all destinations', to: '/destinations' },
  membership: { label: 'See full membership details', to: '/membership' },
} as const;

export const homeJourney = {
  intro: 'We build complete journeys, not just flights. From ground transport to dining on board, every step is coordinated so you can focus on the destination.',
  quote: {
    text: 'Traveling—it leaves you speechless, then turns you into a storyteller.',
    author: 'Ibn Battuta',
  },
  cards: [
    { title: 'Mountain Retreats', description: 'Ski, hike, unwind.', image: '/images/journey_mountain.jpg' },
    { title: 'Island Escapes', description: 'Remote beaches, direct arrivals.', image: '/images/journey_island.jpg' },
    { title: 'City Connections', description: 'Multiple meetings, one day.', image: '/images/journey_city.jpg' },
  ],
} as const;

export const homeMembershipTiers = {
  title: 'Memberships + Jet Cards',
  intro: 'Fly when you want and pay the way that works for you. No lengthy contracts and no hidden fees.',
  options: [
    {
      id: 'tierA',
      title: 'Jet Card',
      description: 'Purchase hours in advance, lock in pricing and book on short notice with guaranteed availability.',
      cta: { label: 'Request Jet Card details', to: '/quote' },
    },
    {
      id: 'tierB',
      title: 'Membership',
      description: 'Lower hourly rates, dedicated account manager, and priority scheduling across the fleet.',
      cta: { label: 'Explore membership tiers', to: '/quote' },
    },
  ],
  features: ['Guaranteed availability', '24/7 support', 'Catering + ground transport'],
} as const;

export const homeTrust = [
  { icon: 'shield', value: 100, suffix: '%', label: 'Safety Audited' },
  { icon: 'award', value: 5000, suffix: '+', label: 'Hr Pilots' },
  { icon: 'globe', value: 180, suffix: '+', label: 'Destinations' },
  { icon: 'clock', value: 24, suffix: '/7', label: 'Operations' },
  { icon: 'users', value: 98, suffix: '%', label: 'Retention' },
] as const;

export type TrustIcon = (typeof homeTrust)[number]['icon'];

export const homeTestimonialsHeading = {
  label: 'Testimonials',
  titleLead: 'In their',
  titleAccent: 'own words',
  hintPointer: 'Hover to pause',
  hintTouch: 'Hold to pause · swipe to explore',
} as const;

export const homeBooking = {
  titleAccent: 'Book',
  titleRest: 'Your Next Flight',
  subtitle: "Tell us where you're headed. We'll handle aircraft selection, scheduling, and every detail.",
  primary: { label: 'Request a quote', to: '/quote' },
  secondary: { label: 'Call us' },
  asideLabel: 'Also available',
  asideLinks: [
    { label: 'Empty leg flights', to: '/empty-legs' },
    { label: 'Corporate charter', to: '/corporate' },
  ],
  asideNote: 'Quotes returned within 2 hours. Operations desk staffed 24/7.',
} as const;