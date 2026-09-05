/**
 * Open positions. Delete a role to remove it from the page — the counts and
 * the department filter are both derived from this list.
 */

export interface Role {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    summary: string;
    requirements: string[];
  }
  
  export const roles: Role[] = [
    {
      id: 'captain-global',
      title: 'Captain — Global 7500',
      department: 'Flight Crew',
      location: 'Farnborough, UK',
      type: 'Full time',
      summary:
        'Command of ultra-long-range sectors across Europe, the Middle East and North America. Rostered with genuine rest, not the legal minimum.',
      requirements: [
        'ATPL with a current Global 7500 type rating',
        '5,000 hours total, 1,000 on type or comparable',
        'Unrestricted right to work in the UK or EU',
        'Willingness to refuse a sector, in writing, without hesitation',
      ],
    },
    {
      id: 'first-officer',
      title: 'First Officer — Midsize Fleet',
      department: 'Flight Crew',
      location: 'Farnborough, UK',
      type: 'Full time',
      summary:
        'Right seat across the midsize and super-midsize fleet, with a defined path to command and type ratings funded in full.',
      requirements: [
        'CPL/ATPL with a valid multi-engine IR',
        '1,500 hours total time',
        'Type rating funded by us if you do not hold one',
      ],
    },
    {
      id: 'cabin-attendant',
      title: 'Cabin Attendant',
      department: 'Flight Crew',
      location: 'Farnborough or Geneva',
      type: 'Full time',
      summary:
        'Sole cabin crew on long sectors. Service, safety and discretion in equal measure, with the same client often flying with you repeatedly.',
      requirements: [
        'Current cabin crew attestation',
        'Corporate or private aviation experience preferred',
        'A second language is valued, not required',
      ],
    },
    {
      id: 'flight-dispatcher',
      title: 'Flight Dispatcher',
      department: 'Operations',
      location: 'Farnborough, UK',
      type: 'Full time, shift',
      summary:
        'Own flights from planning to shutdown. You have the authority to stop one, and you will be supported when you use it.',
      requirements: [
        'Flight dispatch licence or equivalent operational experience',
        'Comfort making a call at three in the morning',
        'Shift pattern covering nights and weekends',
      ],
    },
    {
      id: 'account-manager',
      title: 'Client Account Manager',
      department: 'Client',
      location: 'London, UK',
      type: 'Full time',
      summary:
        'A named contact for around twenty members. Knowing their schedule before they send it, and telling them when a cheaper option exists.',
      requirements: [
        'Experience in private aviation, luxury hospitality or private banking',
        'Reachable outside office hours, genuinely',
        'Willing to talk a client out of a booking that does not serve them',
      ],
    },
  ];
  
  export const departments = ['All', ...Array.from(new Set(roles.map((r) => r.department)))];
  
  /** What we say about working here, rather than what a careers page usually says. */
  export const workingHere = [
    {
      title: 'Safety authority is real',
      body: 'Crew and dispatchers can stop a flight and face no commercial consequence for it. That is written down, and it is the first thing we test in an interview.',
    },
    {
      title: 'Small enough to be named',
      body: 'Clients know who handles their account. So does everyone internally. Nothing here is anonymous, in either direction.',
    },
    {
      title: 'Rest above the minimum',
      body: 'Rostering is built to fatigue rules we set ourselves, which are stricter than the regulation. It costs us availability and we accept that.',
    },
  ];
  