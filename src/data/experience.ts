/**
 * The onboard experience — everything that happens between the aircraft door
 * closing and opening again. Anything arranged on the ground belongs in
 * data/concierge.ts instead.
 */

export interface ExperienceDetail {
    title: string;
    body: string;
    points: string[];
  }
  
  /** Smaller details, listed rather than given a section of their own. */
  export const details: ExperienceDetail[] = [
    {
      title: 'Pets travel in the cabin',
      body: 'Never in a hold. Water, bedding and a settled corner are prepared before boarding, and documentation is checked against the destination in advance.',
      points: ['No carrier requirement in the cabin', 'Import paperwork checked ahead of departure'],
    },
    {
      title: 'Cabin set before you board',
      body: 'Temperature, lighting, seating layout and the beds on longer sectors are configured during the turnaround, from preferences held on your account.',
      points: ['Preferences carried between flights', 'Beds made up on the ground, not in the air'],
    },
    {
      title: 'Quiet as a working requirement',
      body: 'Cabin sound levels are among the first things we assess when adding an aircraft. A call you can take without raising your voice is a specification, not a nicety.',
      points: ['Noise levels tested on acceptance', 'Headset-free conversation across the cabin'],
    },
  ];
  