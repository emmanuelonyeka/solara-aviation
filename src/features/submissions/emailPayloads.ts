import type { EmailPayload } from '../../services/email';

export const BOOKING_SUPPORT_ACTIONS = [
  {
    value: 'change',
    label: 'Request a change',
    description: 'Dates, times, passengers, aircraft or itinerary details.',
  },
  {
    value: 'cancel',
    label: 'Request cancellation',
    description: 'Ask the desk to review cancellation terms before confirming.',
  },
  {
    value: 'question',
    label: 'Ask about a booking',
    description: 'Catering, transport, baggage or anything else around the flight.',
  },
] as const;

export type BookingSupportAction = (typeof BOOKING_SUPPORT_ACTIONS)[number]['value'];

export interface ContactSubmission {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  enquiry: string;
  message: string;
}

export interface BookingSupportSubmission {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  action: BookingSupportAction;
  details: string;
}

export function getBookingSupportAction(action: BookingSupportAction) {
  return BOOKING_SUPPORT_ACTIONS.find((item) => item.value === action) ?? BOOKING_SUPPORT_ACTIONS[0];
}

export function createContactEmailPayload(submission: ContactSubmission): EmailPayload {
  return {
    reference: submission.reference,
    request_type: `Contact enquiry — ${submission.enquiry}`,
    status: 'New enquiry',
    route: 'Not applicable',
    depart_date: 'Not supplied',
    return_date: 'Not supplied',
    passengers: 'Not supplied',
    aircraft: 'Not supplied',
    client_name: submission.name,
    client_email: submission.email,
    client_phone: submission.phone ?? 'Not supplied',
    notes: submission.message,
  };
}

export function createBookingSupportEmailPayload(
  submission: BookingSupportSubmission,
): EmailPayload {
  const action = getBookingSupportAction(submission.action);

  return {
    reference: submission.reference,
    request_type: `Booking support — ${action.label}`,
    status: 'Awaiting desk confirmation',
    route: `Booking ${submission.reference}`,
    depart_date: 'See booking record',
    return_date: 'See booking record',
    passengers: 'See booking record',
    aircraft: 'See booking record',
    client_name: submission.name,
    client_email: submission.email,
    client_phone: submission.phone ?? 'Not supplied',
    notes: submission.details,
  };
}