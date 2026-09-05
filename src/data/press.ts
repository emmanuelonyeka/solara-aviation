import { site } from '../config/site';

/**
 * Press releases and media resources.
 * Add a release at the top of the array — the page renders newest first.
 */

export interface Release {
    id: string;
    date: string;
    title: string;
    summary: string;
  }
  
  export const releases: Release[] = [
    {
      id: 'emissions-reporting',
      date: 'February 2026',
      title: 'Per-flight emissions reporting extended to every account',
      summary:
        'Emissions figures previously issued only to corporate accounts now accompany every invoice, calculated on a published methodology open to third-party challenge.',
    },
    {
      id: 'saf-agreement',
      date: 'November 2025',
      title: 'Sustainable aviation fuel agreement across four European bases',
      summary:
        'A supply agreement covering Farnborough, Geneva, Nice and Paris Le Bourget, with book-and-claim used at airports where physical supply is unavailable.',
    },
    {
      id: 'global-7500',
      date: 'July 2025',
      title: 'Global 7500 added to the managed fleet',
      summary:
        'An ultra-long-range aircraft enters service, extending non-stop capability to city pairs previously requiring a technical stop.',
    },
    {
      id: 'operations-desk',
      date: 'March 2025',
      title: 'Flight watch brought in house and staffed continuously',
      summary:
        'Out-of-hours calls no longer route to an answering service. A named dispatcher is assigned to every flight from pushback to shutdown.',
    },
  ];
  
  /** Figures a journalist will ask for. Keep these current. */
  export const pressFacts = [
    { label: 'Founded', value: `${site.founded}, by two former airline captains` },
    { label: 'Headquarters', value: 'Farnborough, United Kingdom' },
    { label: 'Operating model', value: 'Charter broker using independently audited operators only' },
    { label: 'Accreditations', value: 'ARGUS Platinum, Wyvern Wingman, IS-BAO Stage 3' },
    { label: 'Programmes', value: 'On demand, jet card, annual membership' },
    { label: 'Emissions', value: 'Every flight offset; reported per flight' },
  ];
  