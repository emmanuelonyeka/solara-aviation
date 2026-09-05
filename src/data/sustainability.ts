/**
 * Sustainability commitments and reporting.
 *
 * Aviation emissions claims are scrutinised harder than any other statement a
 * charter company makes. Keep every line here to what you can evidence, and
 * say "offset" where you mean offset rather than "neutral".
 */

export interface Commitment {
    title: string;
    body: string;
    points: string[];
  }
  
  export const commitments: Commitment[] = [
    {
      title: 'Sustainable aviation fuel',
      body:
        'SAF is made from waste feedstock rather than crude, and reduces lifecycle emissions substantially against conventional jet fuel. Availability is still limited to a minority of airports, so we book it where it exists and say so plainly where it does not.',
      points: [
        'Purchased at every departure airport that supplies it',
        'Book-and-claim used where physical supply is unavailable',
        'Volume reported per flight, not averaged across the year',
      ],
    },
    {
      title: 'Offsetting what remains',
      body:
        'Every flight we operate is offset through verified removal and avoidance projects. Offsetting is not the same as not emitting, and we would rather write that down than let the word "neutral" do work it has not earned.',
      points: [
        'Gold Standard and Verra registered projects only',
        'Retirement certificates issued with the invoice',
        'Split between removal and avoidance published quarterly',
      ],
    },
    {
      title: 'Flying fewer empty miles',
      body:
        'A repositioning flight burns the same fuel as a full one. Matching empty legs to real journeys is the single largest reduction available to a charter operator, and it costs a client less rather than more.',
      points: [
        'Empty legs published and sold rather than flown vacant',
        'Routings planned to minimise positioning between bookings',
        'Aircraft assigned by fit, not by whichever is nearest to sell',
      ],
    },
    {
      title: 'Reporting you can audit',
      body:
        'Corporate accounts receive emissions per flight and per quarter, broken down by cost centre, calculated on a published methodology rather than an internal one.',
      points: [
        'Per-flight figures issued with every invoice',
        'Quarterly summary for corporate accounts',
        'Methodology published and open to challenge',
      ],
    },
  ];
  
  /** What we will and will not claim. Stated plainly on purpose. */
  export const positions = [
    { label: 'We do not say', value: '"Carbon neutral flying." Offsetting reduces net impact; it does not remove the emission.' },
    { label: 'We do not say', value: '"Green private aviation." Private flight is carbon-intensive per passenger and always will be.' },
    { label: 'We do say', value: 'Every flight is offset, SAF is used where it can be sourced, and both are reported per flight.' },
    { label: 'We do say', value: 'Flying less is the largest reduction available. We will tell you when a trip does not need an aircraft.' },
  ];