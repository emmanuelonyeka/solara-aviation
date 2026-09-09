/**
 * Company story, principles and leadership.
 *
 * Team members render as an initial in a ring until `photo` is supplied —
 * a consistent lockup is better than a mix of photographed and unphotographed
 * people. Add the optional `photo` field when you have the final portraits.
 */

export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: 'Say the inconvenient thing',
    body: 'If a card costs you less than a membership, we say so before you ask. If weather makes a sector unwise, we say that too. Advice that only ever agrees with you is not advice.',
  },
  {
    title: 'Quote what it costs',
    body: 'One number, arrived at before you commit, covering positioning, handling, catering and crew. Charter is full of quotes that grow after signature. Ours does not.',
  },
  {
    title: 'Answer as a person',
    body: 'One named contact who already knows the trip, reachable directly at any hour. Not a queue, not a ticket, and not somebody reading your history back to you.',
  },
  {
    title: 'Keep it to ourselves',
    body: 'Manifests are never shared, itineraries are never discussed outside the team arranging them, and no client appears in our marketing. Discretion is not a service tier.',
  },
];

export interface Milestone {
  year: string;
  title: string;
  body: string;
}

export const milestones: Milestone[] = [
  {
    year: '2009',
    title: 'Founded',
    body: 'Started with two aircraft and a single operator relationship, brokering flights for clients the founders had flown as airline captains.',
  },
  {
    year: '2013',
    title: 'First audited network',
    body: 'Moved to using only independently audited operators, at the cost of roughly a third of the available fleet at the time.',
  },
  {
    year: '2017',
    title: 'Membership introduced',
    body: 'Added jet cards and annual membership after clients asked for rate certainty rather than a quote per trip.',
  },
  {
    year: '2021',
    title: 'Operations desk staffed continuously',
    body: 'Brought flight watch in-house and staffed it around the clock rather than routing out-of-hours calls to an answering service.',
  },
  {
    year: '2024',
    title: 'Emissions reporting',
    body: 'Began issuing per-flight and per-quarter emissions reporting to every corporate account as standard.',
  },
];

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  /** Optional. Falls back to the initials lockup when absent. */
  photo?: string;
}

export const leadership: TeamMember[] = [
  {
    initials: 'MC',
    name: 'Marcus Chen',
    role: 'Chief Executive',
    bio: 'Twenty-five years in aviation, previously an airline captain and then a fleet director. Still holds a current type rating.',
    photo: '/images/team/marcus-chen.jpg',
  },
  {
    initials: 'SR',
    name: 'Sophia Reynolds',
    role: 'Operations',
    bio: 'Runs flight watch, dispatch and operator relationships. Has the final say on whether a sector goes.',
    photo: '/images/team/sophia-reynolds.jpg',
  },
  {
    initials: 'DA',
    name: 'David Andersson',
    role: 'Safety',
    bio: 'Former military pilot with over eight thousand hours. Owns the audit programme and reports outside the commercial line.',
    photo: '/images/team/david-andersson.jpg',
  },
  {
    initials: 'EL',
    name: 'Elena Laurent',
    role: 'Membership',
    bio: 'Works with members on the shape of their year, and is the one who will tell you a card is cheaper than a membership.',
    photo: '/images/team/elena-laurent.jpg',
  },
];
