import type { EmailPayload } from '../../services/email';
import { formatBookingDate } from './date';
import type { QuoteRequest } from './types';

export function createQuoteEmailPayload(booking: QuoteRequest): EmailPayload {
  return {
    reference: booking.reference,
    request_type: 'Private flight quote',
    status: 'Quote requested',
    route: `${booking.from} to ${booking.to}`,
    depart_date: formatBookingDate(booking.departDate),
    return_date: booking.returnDate ? formatBookingDate(booking.returnDate) : 'One way',
    passengers: String(booking.passengers),
    aircraft: booking.aircraft ?? 'Recommendation requested',
    client_name: booking.name,
    client_email: booking.email,
    client_phone: booking.phone ?? 'Not supplied',
    notes: booking.notes ?? 'None',
  };
}