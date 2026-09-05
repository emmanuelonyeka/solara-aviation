export interface Aircraft {
  id: string;
  model: string;
  category: 'Light' | 'Midsize' | 'Super-Midsize' | 'Heavy' | 'Ultra-Long-Range';
  passengers: number;
  rangeNm: number;
  rangeHours: string;
  speed: string;
  cabinHeight: string;
  cabinWidth: string;
  cabinLength: string;
  baggage: string;
  crew: number;
  image: string;
  gallery: string[];
  description: string;
  missions: string[];
  year: string;
}

export const aircraft: Aircraft[] = [
  {
    id: 'citation-cj4',
    model: 'Citation CJ4',
    category: 'Light',
    passengers: 9,
    rangeNm: 2165,
    rangeHours: '4h 15m',
    speed: '451 ktas',
    cabinHeight: '4\'9"',
    cabinWidth: '4\'10"',
    cabinLength: '17\'4"',
    baggage: '77 cu ft',
    crew: 2,
    image: '/images/fleet/cj4.jpg',
    gallery: ['/images/fleet/cj4.jpg'],
    description: 'The Citation CJ4 delivers the efficiency and agility of a light jet with the cabin comfort and range typically found in larger aircraft. Its spacious stand-up cabin, fully equipped galley, and generous baggage capacity make it the preferred choice for regional business travel and quick getaways.',
    missions: ['Regional business hops', 'Weekend escapes', 'Multi-city day trips'],
    year: '2021',
  },
  {
    id: 'phenom-300e',
    model: 'Phenom 300E',
    category: 'Light',
    passengers: 10,
    rangeNm: 2320,
    rangeHours: '4h 30m',
    speed: '464 ktas',
    cabinHeight: '4\'11"',
    cabinWidth: '5\'1"',
    cabinLength: '17\'2"',
    baggage: '85 cu ft',
    crew: 2,
    image: '/images/fleet/phenom300.jpg',
    gallery: ['/images/fleet/phenom300.jpg'],
    description: 'The best-selling light jet in the world, the Phenom 300E offers an unmatched blend of performance, technology, and cabin sophistication. With runway performance that opens up smaller airports and a cabin designed by BMW Designworks, every flight feels first-class.',
    missions: ['Coast-to-coast connections', 'Ski resort access', 'Island hopping'],
    year: '2022',
  },
  {
    id: 'citation-latitude',
    model: 'Citation Latitude',
    category: 'Midsize',
    passengers: 9,
    rangeNm: 2850,
    rangeHours: '5h 30m',
    speed: '446 ktas',
    cabinHeight: '6\'0"',
    cabinWidth: '6\'5"',
    cabinLength: '21\'9"',
    baggage: '127 cu ft',
    crew: 2,
    image: '/images/fleet/latitude.jpg',
    gallery: ['/images/fleet/latitude.jpg'],
    description: 'The Citation Latitude redefined the midsize category with its flat-floor cabin, best-in-class pressurization, and class-leading baggage compartment. Its 2,850-nautical-mile range connects New York to Los Angeles non-stop, while the whisper-quiet cabin ensures you arrive refreshed.',
    missions: ['Transcontinental flights', 'Family vacations', 'Executive travel'],
    year: '2020',
  },
  {
    id: 'gulfstream-g280',
    model: 'Gulfstream G280',
    category: 'Super-Midsize',
    passengers: 10,
    rangeNm: 3600,
    rangeHours: '6h 45m',
    speed: '482 ktas',
    cabinHeight: '6\'3"',
    cabinWidth: '7\'2"',
    cabinLength: '25\'10"',
    baggage: '154 cu ft',
    crew: 2,
    image: '/images/fleet/g280.jpg',
    gallery: ['/images/fleet/g280.jpg'],
    description: 'The super-midsize benchmark, the Gulfstream G280 combines transatlantic capability with a cabin engineered for productivity and rest. Gulfstream\'s legendary build quality, ultra-low cabin altitude, and 19 panoramic windows create an environment where work and relaxation coexist seamlessly.',
    missions: ['Transatlantic crossings', 'International meetings', 'Extended family trips'],
    year: '2021',
  },
  {
    id: 'challenger-350',
    model: 'Challenger 350',
    category: 'Super-Midsize',
    passengers: 10,
    rangeNm: 3200,
    rangeHours: '6h 15m',
    speed: '470 ktas',
    cabinHeight: '6\'0"',
    cabinWidth: '7\'2"',
    cabinLength: '25\'2"',
    baggage: '106 cu ft',
    crew: 2,
    image: '/images/fleet/challenger350.jpg',
    gallery: ['/images/fleet/challenger350.jpg'],
    description: 'The Challenger 350 has earned its reputation as the most delivered super-midsize jet for good reason. Its flat-floor cabin, zero-gravity seats, and class-leading connectivity make it the aircraft of choice for executives who refuse to compromise on comfort or capability.',
    missions: ['Continental crossings', 'Boardroom in the sky', 'Leisure travel'],
    year: '2022',
  },
  {
    id: 'gulfstream-g650',
    model: 'Gulfstream G650ER',
    category: 'Heavy',
    passengers: 16,
    rangeNm: 7500,
    rangeHours: '14h 30m',
    speed: '516 ktas',
    cabinHeight: '6\'5"',
    cabinWidth: '8\'6"',
    cabinLength: '46\'10"',
    baggage: '195 cu ft',
    crew: 4,
    image: '/images/fleet/g650.jpg',
    gallery: ['/images/fleet/g650.jpg'],
    description: 'The icon of ultra-long-range aviation. The G650ER can fly farther, faster, and higher than virtually any business aircraft — connecting virtually any two points on Earth non-stop. Its handcrafted interior, whisper-quiet cabin, and 100% fresh air system redefine what private travel can be.',
    missions: ['Global travel', 'Ultra-long-range missions', 'Heads of state transport'],
    year: '2023',
  },
  {
    id: 'global-7500',
    model: 'Global 7500',
    category: 'Ultra-Long-Range',
    passengers: 19,
    rangeNm: 7700,
    rangeHours: '15h 00m',
    speed: '516 ktas',
    cabinHeight: '6\'2"',
    cabinWidth: '8\'0"',
    cabinLength: '54\'5"',
    baggage: '195 cu ft',
    crew: 4,
    image: '/images/fleet/global7500.jpg',
    gallery: ['/images/fleet/global7500.jpg'],
    description: 'The Global 7500 is the largest and longest-range purpose-built business jet ever created. Its four true living spaces — including a dedicated master suite with en-suite shower — deliver an experience closer to a flying penthouse than a traditional aircraft cabin.',
    missions: ['Around-the-world missions', 'Ultra-long-range travel', 'Flying residence'],
    year: '2023',
  },
  {
    id: 'falcon-8x',
    model: 'Falcon 8X',
    category: 'Heavy',
    passengers: 14,
    rangeNm: 6450,
    rangeHours: '12h 30m',
    speed: '488 ktas',
    cabinHeight: '6\'2"',
    cabinWidth: '7\'8"',
    cabinLength: '42\'8"',
    baggage: '140 cu ft',
    crew: 3,
    image: '/images/fleet/challenger350.jpg',
    gallery: ['/images/fleet/challenger350.jpg'],
    description: 'The Falcon 8X combines extraordinary range with the versatility of Dassault\'s legendary trijet design. Its ability to access short and challenging runways opens destinations that twinjets simply cannot reach, while the whisper-quiet cabin and bespoke interior ensure absolute comfort.',
    missions: ['Intercontinental travel', 'Mountain airport access', 'Bespoke charter'],
    year: '2022',
  },
];

export const categories = ['All', 'Light', 'Midsize', 'Super-Midsize', 'Heavy', 'Ultra-Long-Range'] as const;

export function getAircraftById(id: string): Aircraft | undefined {
  return aircraft.find((a) => a.id === id);
}

export function getAircraftByCategory(category: string): Aircraft[] {
  if (category === 'All') return aircraft;
  return aircraft.filter((a) => a.category === category);
}
