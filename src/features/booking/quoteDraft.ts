import { airports } from '../../data/airports';
import { isValidEmail } from '../../lib/forms';

export const QUOTE_STEPS = ['Route', 'Schedule', 'Aircraft', 'Contact', 'Review'] as const;

export interface QuoteDraft {
  from: string;
  to: string;
  tripType: 'one-way' | 'return';
  departDate: string;
  returnDate: string;
  passengers: number;
  aircraftId: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteDraft, string>>;

const EMPTY_QUOTE: QuoteDraft = {
  from: '',
  to: '',
  tripType: 'one-way',
  departDate: '',
  returnDate: '',
  passengers: 2,
  aircraftId: '',
  name: '',
  email: '',
  phone: '',
  notes: '',
};

export const QUOTE_FIELD_IDS: Partial<Record<keyof QuoteDraft, string>> = {
  from: 'from-airport',
  to: 'to-airport',
  departDate: 'depart',
  returnDate: 'return',
  passengers: 'passengers',
  name: 'name',
  email: 'email',
};

export function createInitialQuoteDraft(params: URLSearchParams): QuoteDraft {
  const route = params.get('route');
  if (!route) return { ...EMPTY_QUOTE };

  const [fromCode = '', toCode = ''] = route.toUpperCase().split('-');
  const from = airports.find((airport) => airport.code === fromCode);
  const to = airports.find((airport) => airport.code === toCode);

  return {
    ...EMPTY_QUOTE,
    from: from ? `${from.city} (${from.code})` : '',
    to: to ? `${to.city} (${to.code})` : '',
  };
}

export function getTodayDateInputValue(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function getEarliestQuoteDateInputValue(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function getMaxQuoteDateInputValue(start = getTodayDateInputValue()): string {
  const [year, month, day] = start.split('-').map(Number);
  const targetMonth = month - 1 + 6;
  const lastDay = new Date(year, targetMonth + 1, 0).getDate();
  const date = new Date(year, targetMonth, Math.min(day, lastDay));
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function isQuoteFieldValid(key: keyof QuoteDraft, draft: QuoteDraft): boolean {
  const earliestDate = getEarliestQuoteDateInputValue();
  const latestDate = getMaxQuoteDateInputValue();
  switch (key) {
    case 'from':
      return draft.from.trim().length > 0;

    case 'to':
      return draft.to.trim().length > 0 && draft.to.trim().toLowerCase() !== draft.from.trim().toLowerCase();

    case 'departDate':
      return Boolean(
        draft.departDate &&
        draft.departDate >= earliestDate &&
        draft.departDate <= latestDate,
      );

    case 'returnDate':
      return draft.tripType === 'one-way' || Boolean(
        draft.returnDate &&
        draft.returnDate >= draft.departDate &&
        draft.returnDate <= latestDate,
      );

    case 'passengers':
      return draft.passengers >= 1 && draft.passengers <= 19;

    case 'name':
      return draft.name.trim().length > 0;

    case 'email':
      return isValidEmail(draft.email);

    default:
      return true;
  }
}

export function validateQuoteStep(step: number, draft: QuoteDraft): QuoteErrors {
  const errors: QuoteErrors = {};

  if (step === 0) {
    if (!draft.from.trim()) errors.from = 'Tell us which city you are flying from.';
    if (!draft.to.trim()) errors.to = 'Tell us where you are flying to.';
    else if (draft.from.trim() && draft.to.trim().toLowerCase() === draft.from.trim().toLowerCase()) {
      errors.to = 'Departure and arrival are the same place.';
    }
  }

  if (step === 1) {
    const earliestDate = getEarliestQuoteDateInputValue();
    const latestDate = getMaxQuoteDateInputValue();

    if (!draft.departDate) errors.departDate = 'Choose the date you want to fly out.';
    else if (draft.departDate < earliestDate) {
      errors.departDate = 'Online requests require at least one day of notice. Choose tomorrow or later.';
    } else if (draft.departDate > latestDate) {
      errors.departDate = 'Choose a departure date within the next six months.';
    }

    if (draft.tripType === 'return') {
      if (!draft.returnDate) errors.returnDate = 'Choose a return date, or switch to one way.';
      else if (draft.returnDate < draft.departDate) errors.returnDate = 'Your return is before you leave.';
      else if (draft.returnDate > latestDate) errors.returnDate = 'Choose a return date within the next six months.';
    }

    if (draft.passengers < 1) errors.passengers = 'There has to be at least one passenger.';
    if (draft.passengers > 19) {
      errors.passengers = 'Above 19 we split the party. Call us and we will arrange it.';
    }
  }

  if (step === 3) {
    if (!draft.name.trim()) errors.name = 'We need a name for the booking.';
    if (!draft.email.trim()) errors.email = 'We need an email address to send the quote to.';
    else if (!isValidEmail(draft.email)) errors.email = 'Check this for a typo.';
  }

  return errors;
}