/**
 * Safety standards and accreditations.
 *
 * These are the claims a prospective client is most likely to verify, so keep
 * them accurate to your own operation. Where a figure is a minimum rather than
 * a fleet-wide fact, say so in the note.
 */

export interface SafetyPillar {
    title: string;
    body: string;
    points: string[];
  }
  
  export const pillars: SafetyPillar[] = [
    {
      title: 'Independent audit',
      body:
        'Being legal to fly and being audited are different things. Every operator in the network is assessed by an independent third party against a published standard, and we do not fly aircraft from operators who have not been.',
      points: [
        'ARGUS and Wyvern assessed operators only',
        'Audit status confirmed before every new operator is used',
        'Reports available to any client who asks to see them',
      ],
    },
    {
      title: 'Crew experience',
      body:
        'Two pilots on every flight regardless of aircraft size, both trained on type in a full-motion simulator, and both current on the route. Captains hold an Airline Transport Pilot Licence with a substantial minimum of total time.',
      points: [
        'Two type-rated pilots on every sector',
        'Recurrent simulator training twice a year',
        'Fatigue rules applied above the regulatory minimum',
      ],
    },
    {
      title: 'Maintenance',
      body:
        'Manufacturer programmes followed in full, at authorised service centres, with a second internal schedule layered on top. Records are held for the life of the airframe rather than the length of a contract.',
      points: [
        'Manufacturer-authorised facilities only',
        'Continuous airworthiness programme, not calendar-based',
        'Full history available on request',
      ],
    },
    {
      title: 'Operational control',
      body:
        'Every flight is watched from the ground for its whole duration. Weather, airspace and notices are reviewed before departure and again in the air, and a dispatcher is reachable by the crew at any point.',
      points: [
        'Flights monitored in real time, gate to gate',
        'Weather and airspace reviewed twice per sector',
        'Named dispatcher assigned to each flight',
      ],
    },
  ];
  
  /** Accreditations and the regulator each one answers to. */
  export const accreditations = [
    { label: 'ARGUS Platinum', value: 'Highest operator rating; on-site audit plus historical safety analysis' },
    { label: 'Wyvern Wingman', value: 'Independent audit against a published standard, renewed every two years' },
    { label: 'IS-BAO Stage 3', value: 'IBAC standard for a fully embedded safety management system' },
    { label: 'EASA AOC', value: 'European air operator certificate, audited by the national authority' },
    { label: 'FAA Part 135', value: 'US on-demand charter certification' },
    { label: 'Liability cover', value: 'Carried on every flight; certificates issued on request' },
  ];
  