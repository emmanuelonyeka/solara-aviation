export interface Destination {
  slug: string;
  city: string;
  country: string;
  region: string;
  image: string;
  description: string;
  whyFly: string;
  fboName: string;
  fboInfo: string;
  popularFrom: string[];
}

export const destinations: Destination[] = [
  {
    slug: 'new-york',
    city: 'New York',
    country: 'United States',
    region: 'North America',
    image: '/images/destinations/newyork.jpg',
    description: 'The city that never sleeps — global finance, world-class dining, and iconic culture await.',
    whyFly: 'With multiple dedicated FBOs across Teterboro, Westchester, and Republic Airport, private aviation bypasses the congestion of JFK and LaGuardia entirely. Land minutes from Manhattan and step directly into a waiting vehicle.',
    fboName: 'Teterboro Airport (KTEB)',
    fboInfo: 'The preferred gateway for private jets serving New York, with 12 FBOs offering white-glove service just 12 miles from Midtown Manhattan.',
    popularFrom: ['London', 'Paris', 'Dubai', 'Los Angeles'],
  },
  {
    slug: 'london',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    image: '/images/destinations/london.jpg',
    description: 'A global capital of finance, fashion, and culture — where tradition meets innovation.',
    whyFly: 'London offers unparalleled FBO infrastructure with Farnborough, Biggin Hill, and Luton providing dedicated private terminals. Clear customs in minutes and be in central London within 45 minutes of landing.',
    fboName: 'Farnborough Airport (EGLF)',
    fboInfo: 'Exclusively dedicated to business aviation, Farnborough offers the fastest immigration and customs clearance in the UK with helicopter transfers to central London.',
    popularFrom: ['New York', 'Geneva', 'Dubai', 'Monaco'],
  },
  {
    slug: 'paris',
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    image: '/images/destinations/paris.jpg',
    description: 'The City of Light — haute couture, Michelin dining, and timeless romance.',
    whyFly: 'Le Bourget, the world\'s oldest dedicated business aviation airport, sits just 7 miles from the Champs-Elysees. Private terminals ensure seamless arrivals with dedicated customs and limousine service.',
    fboName: 'Paris-Le Bourget (LFPB)',
    fboInfo: 'Europe\'s busiest business aviation airport with seven premium FBOs, offering direct helicopter transfers to Paris heliports in under 15 minutes.',
    popularFrom: ['London', 'Geneva', 'New York', 'Monaco'],
  },
  {
    slug: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    image: '/images/destinations/dubai.jpg',
    description: 'Where ambition meets luxury — a futuristic oasis in the heart of the desert.',
    whyFly: 'Dubai International\'s Executive Flight Terminal and DWC\'s VIP Terminal offer the most luxurious FBO experience in the Middle East. From arrival to Burj Al Arab in under 30 minutes.',
    fboName: 'Dubai Executive Flight Terminal',
    fboInfo: 'A dedicated terminal for private aviation with direct tarmac access, private lounges, and expedited customs and immigration processing.',
    popularFrom: ['London', 'Maldives', 'Geneva', 'New York'],
  },
  {
    slug: 'maldives',
    city: 'Maldives',
    country: 'Maldives',
    region: 'Asia Pacific',
    image: '/images/destinations/maldives.jpg',
    description: 'Pristine atolls, crystal waters, and the ultimate escape from the everyday.',
    whyFly: 'Private jets land at Velana International, where seaplane transfers whisk you directly to your overwater villa. Many resorts have their own private islands accessible only by charter seaplane.',
    fboName: 'Velana International (VRMM)',
    fboInfo: 'Dedicated VIP terminal with private lounge, direct seaplane lounge connection, and exclusive resort transfer coordination.',
    popularFrom: ['Dubai', 'London', 'Sydney', 'Paris'],
  },
  {
    slug: 'aspen',
    city: 'Aspen',
    country: 'United States',
    region: 'North America',
    image: '/images/destinations/aspen.jpg',
    description: 'America\'s premier mountain playground — world-class skiing and Rocky Mountain luxury.',
    whyFly: 'Aspen/Pitkin County Airport sits at 7,820 feet with stunning mountain approaches. The airport\'s two FBOs offer ski valet, equipment handling, and direct shuttle service to luxury resorts.',
    fboName: 'Aspen/Pitkin County (KASE)',
    fboInfo: 'Mountain airport with full FBO services, de-icing capabilities, and ski valet. Open to aircraft up to GV/G550 size.',
    popularFrom: ['New York', 'Los Angeles', 'Dallas', 'Miami'],
  },
  {
    slug: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia Pacific',
    image: '/images/destinations/tokyo.jpg',
    description: 'Ancient temples and neon skyscrapers — Japan\'s capital is a study in beautiful contrasts.',
    whyFly: 'Haneda Airport\'s dedicated private terminal offers the smoothest entry into Japan with private immigration lanes. Helicopter transfers to central Tokyo are available in under 20 minutes.',
    fboName: 'Tokyo Haneda (RJTT)',
    fboInfo: 'Private aviation terminal with dedicated customs, VIP lounges, and helicopter transfer services to Tokyo heliports.',
    popularFrom: ['Sydney', 'London', 'New York', 'Singapore'],
  },
  {
    slug: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    region: 'Asia Pacific',
    image: '/images/destinations/sydney.jpg',
    description: 'Harbour sunsets, world-famous beaches, and effortless Australian sophistication.',
    whyFly: 'Sydney Airport\'s General Aviation terminal provides private check-in and customs processing. Seaplane and helicopter transfers offer spectacular harbour arrivals directly to waterfront hotels.',
    fboName: 'Sydney Kingsford Smith (YSSY)',
    fboInfo: 'Dedicated GA terminal with private customs processing and direct connections to Sydney Seaplanes for harbour transfers.',
    popularFrom: ['Tokyo', 'Dubai', 'London', 'Singapore'],
  },
  {
    slug: 'geneva',
    city: 'Geneva',
    country: 'Switzerland',
    region: 'Europe',
    image: '/images/destinations/geneva.jpg',
    description: 'Alpine elegance meets international diplomacy on the shores of Lake Geneva.',
    whyFly: 'Geneva Airport\'s dedicated business aviation terminal processes arrivals in minutes. The airport\'s location at the intersection of France and Switzerland offers unique flexibility for onward travel.',
    fboName: 'Geneva Cointrin (LSGG)',
    fboInfo: 'Premium business aviation terminal with dual-border access, helicopter transfers to alpine resorts, and dedicated diplomatic handling.',
    popularFrom: ['London', 'Paris', 'Dubai', 'Monaco'],
  },
  {
    slug: 'monaco',
    city: 'Monaco',
    country: 'Monaco',
    region: 'Europe',
    image: '/images/destinations/monaco.jpg',
    description: 'The world\'s most glamorous city-state — yachting, Grand Prix, and Mediterranean luxury.',
    whyFly: 'Nice Cote d\'Azur Airport is the gateway to the Principality, with helicopter transfers to Monaco Heliport taking just 7 minutes — offering one of the world\'s most spectacular arrival experiences.',
    fboName: 'Nice Cote d\'Azur (LFMN)',
    fboInfo: 'Multiple premium FBOs with dedicated helicopter lounges offering 7-minute transfers to Monaco with Mediterranean coastline views.',
    popularFrom: ['London', 'Geneva', 'Paris', 'New York'],
  },
];

export const regions = ['All', 'North America', 'Europe', 'Middle East', 'Asia Pacific'] as const;

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByRegion(region: string): Destination[] {
  if (region === 'All') return destinations;
  return destinations.filter((d) => d.region === region);
}
