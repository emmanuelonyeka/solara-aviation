const REFERENCE_PATTERN = /^SR-[A-HJ-NP-Z2-9]{6}$/;
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function normalizeBookingReference(value: string): string {
  return value.trim().toUpperCase();
}

export function isValidBookingReference(value: string): boolean {
  return REFERENCE_PATTERN.test(normalizeBookingReference(value));
}

/** SR-A7K3QP — readable aloud and excludes ambiguous I, O, 0 and 1. */
export function createReference(): string {
  const characters = Array.from(
    { length: 6 },
    () => REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)],
  ).join('');

  return `SR-${characters}`;
}