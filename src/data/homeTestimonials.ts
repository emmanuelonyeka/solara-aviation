/** Client testimonials shown in the home page marquee. */
export interface HomeTestimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
}

export const homeTestimonials: HomeTestimonial[] = [
  {
    quote: 'A commercial travel day became three quiet hours door to door. By our second flight, the crew already knew the cabin temperature, catering and ground transfer details we preferred.',
    name: 'Private Client',
    role: 'Family Office Principal',
    location: 'Geneva',
  },
  {
    quote: 'Our executives move between London, New York, and Dubai with little margin for delay. Solara gives us one accountable team for aircraft, catering, and ground coordination.',
    name: 'Corporate Client',
    role: 'CFO, Global Investment Firm',
    location: 'London',
  },
  {
    quote: 'We moved from fractional ownership because we wanted flexibility without managing an asset. Availability is consistent, the aircraft are well matched, and every quotation is clear.',
    name: 'Private Client',
    role: 'Technology Entrepreneur',
    location: 'Palo Alto',
  },
  {
    quote: 'We can travel as a family on short notice without rebuilding the brief each time. Even the arrangements for our dog are handled before we reach the terminal.',
    name: 'Private Client',
    role: 'Philanthropist & Board Director',
    location: 'New York',
  },
  {
    quote: 'The value is not only the aircraft. Drivers, catering, and arrival details are coordinated as one itinerary, so the journey feels considered from beginning to end.',
    name: 'Private Client',
    role: 'Real Estate Developer',
    location: 'Dubai',
  },
  {
    quote: 'Discretion and operational certainty are essential for our firm. Schedule changes are acknowledged quickly, alternatives are explained clearly and nothing is left for our team to chase.',
    name: 'Corporate Client',
    role: 'Managing Partner, Law Firm',
    location: 'Monaco',
  },
];