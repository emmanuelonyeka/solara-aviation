/**
 * Membership programmes and the comparison matrix.
 * All commercial terms live here — no figures are written into the page.
 *
 * `price` deliberately describes the commercial model rather than naming a
 * figure. Charter rates move with aircraft, region and season, so a published
 * number dates quickly and invites a comparison you have not agreed to. If you
 * do publish rates, replace these strings — nothing else needs to change.
 */

export interface Tier {
    id: string;
    name: string;
    price: string;
    /** Sits under the price. One line. */
    priceNote: string;
    description: string;
    bestFor: string;
    features: string[];
    /** Draws the eye to the programme you most want to sell. */
    featured?: boolean;
  }
  
  export const tiers: Tier[] = [
    {
      id: 'on-demand',
      name: 'On Demand',
      price: 'Quoted per flight',
      priceNote: 'No commitment, no account',
      description:
        'Charter flight by flight. You are quoted for the trip in front of you, with no membership and nothing held on account.',
      bestFor: 'Fewer than 10 hours a year',
      features: [
        'No upfront commitment',
        'Access to the full fleet',
        'Quoted per trip, priced to the route',
        'Premium catering on request',
      ],
    },
    {
      id: 'jet-card',
      name: 'Jet Card',
      price: 'Hours bought upfront',
      priceNote: 'From 25 hours, rate fixed at signing',
      description:
        'Buy hours in advance at a rate fixed for the term. The rate does not move with fuel, season or demand, so a flight in August costs what a flight in February costs.',
      bestFor: '25 to 50 hours a year',
      features: [
        'Fixed hourly rate for the full term',
        'Confirmed availability at 48 hours',
        'One invoice, drawn down per flight',
        'Unused hours roll into a renewal',
        'No positioning fees within the core region',
      ],
      featured: true,
    },
    {
      id: 'membership',
      name: 'Membership',
      price: 'Annual fee, reduced rates',
      priceNote: 'Set against your flying pattern',
      description:
        'An annual arrangement for regular flyers. Lower hourly rates, a shorter booking window, and an account manager who knows your schedule before you send it.',
      bestFor: 'More than 50 hours a year',
      features: [
        'Reduced hourly rates across the fleet',
        'Confirmed availability at 24 hours',
        'Dedicated account manager',
        'Priority aircraft selection',
        'Ground transport included both ends',
        'Empty leg notifications before release',
      ],
    },
  ];
  
  export interface ComparisonRow {
    label: string;
    /** Keyed by tier id. `true` renders a mark, `false` a dash. */
    values: Record<string, string | boolean>;
  }
  
  export const comparison: ComparisonRow[] = [
    {
      label: 'Booking window',
      values: { 'on-demand': 'Subject to availability', 'jet-card': '48 hours', membership: '24 hours' },
    },
    {
      label: 'Rate certainty',
      values: { 'on-demand': 'Quoted per trip', 'jet-card': 'Fixed for the term', membership: 'Reduced, reviewed annually' },
    },
    {
      label: 'Upfront commitment',
      values: { 'on-demand': 'None', 'jet-card': '25 hours', membership: 'Annual fee' },
    },
    {
      label: 'Dedicated account manager',
      values: { 'on-demand': false, 'jet-card': true, membership: true },
    },
    {
      label: 'Ground transport included',
      values: { 'on-demand': false, 'jet-card': false, membership: true },
    },
    {
      label: 'Empty leg notifications',
      values: { 'on-demand': false, 'jet-card': true, membership: true },
    },
    {
      label: 'Guaranteed availability',
      values: { 'on-demand': false, 'jet-card': true, membership: true },
    },
  ];
  
  /** The three steps between an enquiry and a first flight. */
  export const joiningSteps = [
    {
      title: 'A conversation',
      body: 'Fifteen minutes on how often you fly, which routes, and how much notice you usually have. No aircraft is discussed yet.',
    },
    {
      title: 'A written proposal',
      body: 'The programme that fits, with the rate, the terms and the aircraft it covers. One document, no annexes.',
    },
    {
      title: 'Your first flight',
      body: 'Accounts opened, preferences recorded, crew briefed. Most members fly within a week of signing.',
    },
  ];
  