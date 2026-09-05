/**
 * Empty leg availability.
 *
 * These are repositioning flights — an aircraft returning to base or moving
 * to its next booking with no passengers aboard. Replace this list from your
 * operations feed; the page renders whatever is here.
 */

export interface EmptyLeg {
    id: string;
    fromCity: string;
    fromCode: string;
    toCity: string;
    toCode: string;
    /** Free text: availability is rarely a single fixed date. */
    window: string;
    aircraft: string;
    seats: number;
    /** Percentage below the standard charter rate for the same route. */
    saving: number;
  }
  
  export const emptyLegs: EmptyLeg[] = [
    { id: 'teb-opf', fromCity: 'New York', fromCode: 'KTEB', toCity: 'Miami', toCode: 'KOPF', window: 'Flexible ±2 days', aircraft: 'Citation CJ4', seats: 8, saving: 60 },
    { id: 'eglf-lsgg', fromCity: 'London', fromCode: 'EGLF', toCity: 'Geneva', toCode: 'LSGG', window: 'This week', aircraft: 'Challenger 350', seats: 10, saving: 55 },
    { id: 'omdb-lfpb', fromCity: 'Dubai', fromCode: 'OMDB', toCity: 'Paris', toCode: 'LFPB', window: 'Next 5 days', aircraft: 'Global 7500', seats: 14, saving: 65 },
    { id: 'kvny-kase', fromCity: 'Los Angeles', fromCode: 'KVNY', toCity: 'Aspen', toCode: 'KASE', window: 'Weekend', aircraft: 'Gulfstream G280', seats: 10, saving: 50 },
    { id: 'lfmn-eglf', fromCity: 'Monaco', fromCode: 'LFMN', toCity: 'London', toCode: 'EGLF', window: 'Flexible ±3 days', aircraft: 'Phenom 300E', seats: 7, saving: 58 },
    { id: 'rjtt-yssy', fromCity: 'Tokyo', fromCode: 'RJTT', toCity: 'Sydney', toCode: 'YSSY', window: 'Next 7 days', aircraft: 'Global 7500', seats: 14, saving: 62 },
  ];
  