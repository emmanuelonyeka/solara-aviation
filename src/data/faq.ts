export interface FAQ {
  question: string;
  answer: string;
}

export const faqItems: FAQ[] = [
  {
    question: 'What is the difference between a Jet Card and Membership?',
    answer: 'A Jet Card starts at 25 hours bought upfront, with the hourly rate fixed for the term and availability confirmed at 48 hours\' notice. Membership is designed for clients flying more than 50 hours a year; it combines reduced rates, a dedicated account manager, priority aircraft selection, and confirmed availability at 24 hours\' notice.',
  },
  {
    question: 'How far in advance do I need to book?',
    answer: 'Jet Card holders can book with 48 hours\' notice. Members have confirmed availability at 24 hours\' notice. For on-demand charter, we recommend booking 48–72 hours ahead to secure the best aircraft selection.',
  },
  {
    question: 'Are there any hidden fees or fuel surcharges?',
    answer: 'No. Your written quote is all-in: it includes positioning, crew, fuel, landing and handling fees, agreed catering, and known seasonal costs such as de-icing. The figure changes only if you change the itinerary or add a request after acceptance.',
  },
  {
    question: 'Can I choose my preferred aircraft?',
    answer: 'Absolutely. Members have priority access to their preferred aircraft category and specific models whenever possible. Jet Card holders can request a specific aircraft type, and we will confirm availability. On-demand charter clients can select from available options at the time of booking.',
  },
  {
    question: 'What happens if my aircraft has a mechanical issue?',
    answer: 'Solara maintains a backup aircraft protocol. If your scheduled aircraft becomes unavailable due to maintenance, we will source a replacement of equal or greater capability at no additional cost. Our 24/7 operations team monitors every flight proactively.',
  },
  {
    question: 'Is catering included? What dietary requirements can you accommodate?',
    answer: 'Premium catering is included on every flight. We accommodate all dietary requirements — vegan, kosher, halal, gluten-free, and any allergies. Simply let us know your preferences when booking, and our concierge team will curate a menu tailored to your tastes.',
  },
  {
    question: 'Can I bring pets on board?',
    answer: 'Yes, Solara is pet-friendly. Your pets travel in the cabin with you, not in cargo. We can arrange pet-friendly ground transport, recommend pet-welcoming destinations, and even coordinate with your veterinarian for any travel documentation requirements.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Jet Card and Member flights cancelled more than 48 hours before departure incur no penalty. Cancellations within 24-48 hours may incur a 50% charge. On-demand charter cancellations are evaluated on a case-by-case basis depending on aircraft positioning and crew scheduling.',
  },
];
