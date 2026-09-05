/** Shared form rules keep validation and focus behaviour consistent. */

export const FORM_INPUT_CLASS = 'mt-3 w-full border bg-white/[0.03] px-[clamp(0.9rem,2vw,1.2rem)] py-[clamp(0.625rem,1.15vw,0.8125rem)] font-sans text-[16px] text-white placeholder:text-white/25 transition-[border-color,background-color] duration-400 ease-lux focus:outline-none';
export const FORM_TEXTAREA_CLASS = 'mt-3 w-full resize-y border bg-white/[0.03] px-[clamp(0.9rem,2vw,1.2rem)] py-[clamp(0.75rem,1.7vw,1rem)] font-sans text-[16px] text-white placeholder:text-white/25 transition-[border-color,background-color] duration-400 ease-lux focus:outline-none';
export const FORM_PRIVACY_CLASS = 'mt-block max-w-measure font-sans text-[clamp(0.6875rem,0.66rem+0.12vw,0.75rem)] leading-[1.65] text-white/35';

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function focusFirstInvalid<Field extends string>(
  errors: Partial<Record<Field, string>>,
  fieldIds: Partial<Record<Field, string>> = {},
): void {
  const firstInvalid = (Object.keys(errors) as Field[]).find((field) =>
    Boolean(errors[field]),
  );

  if (!firstInvalid) return;

  const id = fieldIds[firstInvalid] ?? firstInvalid;

  window.requestAnimationFrame(() => {
    document.getElementById(id)?.focus();
  });
}