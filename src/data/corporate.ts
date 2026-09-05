/**
 * Corporate charter content. Benefits, the account model, and the figures
 * shown on the page. Edit here rather than in the page component.
 */

export interface CorporateBenefit {
    title: string;
    body: string;
    points: string[];
  }
  
  export const benefits: CorporateBenefit[] = [
    {
      title: 'A working day, not a travel day',
      body:
        'Three cities in a day is routine rather than ambitious. There is no check-in, no connection to make, and the aircraft waits for the meeting that overruns instead of the other way round.',
      points: [
        'Board fifteen minutes before departure',
        'Multiple stops on a single itinerary',
        'Schedule changed in flight if the day changes',
      ],
    },
    {
      title: 'The cabin is the meeting room',
      body:
        'Conversations that cannot be had in an airline seat happen normally at altitude. Documents stay on the table, the deal team stays together, and nothing is overheard.',
      points: [
        'Private cabin, no other passengers',
        'Connectivity across the fleet',
        'Catering timed around the agenda, not the galley',
      ],
    },
    {
      title: 'Duty of care you can evidence',
      body:
        'Boards increasingly ask how executive travel risk is managed. Every flight is operated to audited standards, tracked in real time, and documented afterwards.',
      points: [
        'Independently audited operations',
        'Real-time tracking shared with your security team',
        'Written incident and diversion protocols',
      ],
    },
  ];
  
  /** How a corporate account differs from ad-hoc charter. */
  export const accountFeatures = [
    {
      label: 'Volume agreement',
      value: 'Rates set annually against forecast hours, reviewed at renewal.',
    },
    {
      label: 'Consolidated billing',
      value: 'One monthly invoice with cost centre coding, not a receipt per flight.',
    },
    {
      label: 'Authorised bookers',
      value: 'Named assistants can book and change flights without further approval.',
    },
    {
      label: 'Travel policy alignment',
      value: 'Approval thresholds and cabin classes mapped to your existing policy.',
    },
    {
      label: 'Reporting',
      value: 'Quarterly spend, utilisation and emissions reporting per cost centre.',
    },
    {
      label: 'Account manager',
      value: 'One named contact, reachable directly, covering every booking.',
    },
  ];