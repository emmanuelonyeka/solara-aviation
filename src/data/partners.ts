/**
 * Partner network. Grouped by what the partner does for a client rather than
 * by contract type, since that is how a reader looks for them.
 */

export interface PartnerGroup {
    category: string;
    intro: string;
    partners: { name: string; note: string }[];
  }
  
  export const partnerGroups: PartnerGroup[] = [
    {
      category: 'Hotels and residences',
      intro: 'Held availability and rates that are not published, including whole-house rentals.',
      partners: [
        { name: 'Alpine Residences', note: 'Chalets across Verbier, Courchevel and Aspen' },
        { name: 'Meridian Hotels', note: 'City properties in 40 countries' },
        { name: 'Coast & Island Collection', note: 'Private villas with staff' },
      ],
    },
    {
      category: 'Ground and marine',
      intro: 'Vehicles positioned airside, and yachts where the last leg is by water.',
      partners: [
        { name: 'Meridian Chauffeur', note: 'Armoured and standard fleets, 60 countries' },
        { name: 'Adriatic Yachting', note: 'Crewed charter, Mediterranean and Caribbean' },
        { name: 'Alpine Heli', note: 'Onward transfer where the road adds an hour' },
      ],
    },
    {
      category: 'Access and experience',
      intro: 'Reservations, viewings and allocations at things that do not sell tickets openly.',
      partners: [
        { name: 'Aperture Cultural', note: 'Private viewings and out-of-hours access' },
        { name: 'Meridian Sport', note: 'Held allocations at major fixtures' },
        { name: 'Cellar & Table', note: 'Restaurant reservations at short notice' },
      ],
    },
    {
      category: 'Security and risk',
      intro: 'Route assessment and close protection where a destination requires it.',
      partners: [
        { name: 'Sentinel Risk', note: 'Executive protection and route assessment' },
        { name: 'Northgate Advisory', note: 'Country risk briefings before departure' },
      ],
    },
  ];
  
  /** What a partnership has to satisfy before we will use it. */
  export const partnerStandards = [
    { label: 'Audited', value: 'Insurance, licensing and operating history checked before first use, then annually.' },
    { label: 'No commission steering', value: 'We recommend the right partner for the trip, not the one that pays us most.' },
    { label: 'Discretion binding', value: 'Every partner signs the same confidentiality terms we hold ourselves to.' },
    { label: 'Removed on failure', value: 'One serious service failure ends the relationship. There is no probation period.' },
  ];