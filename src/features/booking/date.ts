const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function formatBookingDate(
  value: string,
): string {
  if (!ISO_DATE_PATTERN.test(value)) {
    return value;
  }

  return new Date(
    `${value}T00:00:00`,
  ).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}