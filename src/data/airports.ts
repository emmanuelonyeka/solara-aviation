export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const airports: Airport[] = [
  { code: 'KTEB', city: 'Teterboro, NJ', country: 'USA', name: 'Teterboro Airport' },
  { code: 'KASE', city: 'Aspen, CO', country: 'USA', name: 'Aspen-Pitkin County' },
  { code: 'KVNY', city: 'Los Angeles, CA', country: 'USA', name: 'Van Nuys Airport' },
  { code: 'KOPF', city: 'Miami, FL', country: 'USA', name: 'Miami-Opa Locka Executive Airport' },
  { code: 'EGLF', city: 'Farnborough', country: 'UK', name: 'Farnborough Airport' },
  { code: 'LFPB', city: 'Paris', country: 'France', name: 'Paris-Le Bourget' },
  { code: 'LFMN', city: 'Nice', country: 'France', name: 'Nice Cote d\'Azur' },
  { code: 'LSGG', city: 'Geneva', country: 'Switzerland', name: 'Geneva Cointrin' },
  { code: 'OMDB', city: 'Dubai', country: 'UAE', name: 'Dubai Executive Terminal' },
  { code: 'RJTT', city: 'Tokyo', country: 'Japan', name: 'Tokyo Haneda' },
  { code: 'YSSY', city: 'Sydney', country: 'Australia', name: 'Sydney Kingsford Smith' },
  { code: 'VRMM', city: 'Male', country: 'Maldives', name: 'Velana International' },
  { code: 'LSZH', city: 'Zurich', country: 'Switzerland', name: 'Zurich Airport' },
  { code: 'EGGW', city: 'London Luton', country: 'UK', name: 'London Luton' },
  { code: 'KBOS', city: 'Boston, MA', country: 'USA', name: 'Boston Logan' },
  { code: 'KMDW', city: 'Chicago, IL', country: 'USA', name: 'Chicago Midway' },
  { code: 'KDAL', city: 'Dallas, TX', country: 'USA', name: 'Dallas Love Field' },
  { code: 'KSFO', city: 'San Francisco, CA', country: 'USA', name: 'San Francisco Intl' },
  { code: 'KPDK', city: 'Atlanta, GA', country: 'USA', name: 'Dekalb-Peachtree' },
  { code: 'KDCA', city: 'Washington, DC', country: 'USA', name: 'Washington National' },
  { code: 'EDDM', city: 'Munich', country: 'Germany', name: 'Munich Airport' },
  { code: 'LOWW', city: 'Vienna', country: 'Austria', name: 'Vienna International' },
  { code: 'LIMC', city: 'Milan', country: 'Italy', name: 'Milan Malpensa' },
  { code: 'LEBL', city: 'Barcelona', country: 'Spain', name: 'Barcelona-El Prat' },
  { code: 'VHHH', city: 'Hong Kong', country: 'China', name: 'Hong Kong International' },
  { code: 'WSSS', city: 'Singapore', country: 'Singapore', name: 'Singapore Changi' },
  { code: 'RKSI', city: 'Seoul', country: 'South Korea', name: 'Seoul Incheon' },
  { code: 'NZZC', city: 'Auckland', country: 'New Zealand', name: 'Auckland Airport' },
  { code: 'SABE', city: 'Buenos Aires', country: 'Argentina', name: 'Aeroparque Jorge Newbery' },
  { code: 'SBRJ', city: 'Rio de Janeiro', country: 'Brazil', name: 'Rio de Janeiro-Santos Dumont' },
];

export function searchAirports(query: string): Airport[] {
  const q = query.toLowerCase();
  return airports.filter(
    (a) =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
  );
}
