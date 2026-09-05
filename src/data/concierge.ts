/**
 * Everything arranged around the flight rather than on it. Anything that
 * happens inside the cabin belongs in data/experience.ts instead.
 */

export interface ConciergeService {
    title: string;
    body: string;
  }
  
  export const services: ConciergeService[] = [
    {
      title: 'Ground transport',
      body: 'Chauffeured vehicles, armoured cars where the destination warrants it, and helicopter transfers. Positioned at the aircraft steps rather than the terminal door.',
    },
    {
      title: 'Hotels and residences',
      body: 'Preferred rates and held availability at properties that rarely publish either, including private villas and whole-house rentals.',
    },
    {
      title: 'Reservations and access',
      body: 'Restaurants at short notice, private viewings, and seats at events that are officially sold out. Relationships rather than a booking engine.',
    },
    {
      title: 'Security and privacy',
      body: 'Close protection, route assessment and private terminal access. Manifests are never shared and no itinerary is discussed outside the team handling it.',
    },
    {
      title: 'Visas and customs',
      body: 'Diplomatic clearances, expedited processing and documentation checked before departure rather than discovered on arrival.',
    },
    {
      title: 'Gifts and provisioning',
      body: 'Flowers, welcome gifts, a specific vintage, a particular newspaper. Sourced locally at the destination and aboard before you are.',
    },
  ];
  