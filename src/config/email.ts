/** EmailJS transport identifiers. Operating modes live in runtime.ts. */

export const emailConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  /** Sent to the operations desk: the complete enquiry. */
  staffTemplateId: import.meta.env.VITE_EMAILJS_STAFF_TEMPLATE ?? '',
  /** Sent to the client only after the desk copy succeeds. */
  clientTemplateId: import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE ?? '',
} as const;

export function isEmailConfigured(): boolean {
  return Object.values(emailConfig).every((value) => value.trim().length > 0);
}