import { emailConfig, isEmailConfigured } from '../config/email';
import { runtimeConfig } from '../config/runtime';

export const EMAIL_TEMPLATE_FIELDS = [
  'reference',
  'request_type',
  'status',
  'route',
  'depart_date',
  'return_date',
  'passengers',
  'aircraft',
  'client_name',
  'client_email',
  'client_phone',
  'notes',
] as const;

export type EmailPayload = Record<(typeof EMAIL_TEMPLATE_FIELDS)[number], string>;

export type EmailDeliveryResult =
  | { outcome: 'sent' }
  | { outcome: 'demo' }
  | { outcome: 'staff-only' }
  | { outcome: 'failed' };

const deliveryProgress = new Map<string, { staff: boolean; client: boolean }>();
const inFlightDeliveries = new Map<string, Promise<EmailDeliveryResult>>();

function getDeliveryKey(payload: EmailPayload): string {
  return `${payload.request_type}:${payload.reference}:${payload.client_email}`;
}

async function dispatchLiveEmail(
  payload: EmailPayload,
  key: string,
): Promise<EmailDeliveryResult> {
  const progress = deliveryProgress.get(key) ?? { staff: false, client: false };

  try {
    const { default: emailjs } = await import('@emailjs/browser');

    if (!progress.staff) {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.staffTemplateId,
        payload,
        emailConfig.publicKey,
      );
      progress.staff = true;
      deliveryProgress.set(key, progress);
    }

    if (!progress.client) {
      try {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.clientTemplateId,
          payload,
          emailConfig.publicKey,
        );
        progress.client = true;
      } catch {
        deliveryProgress.set(key, progress);
        return { outcome: 'staff-only' };
      }
    }
  } catch {
    if (progress.staff) {
      deliveryProgress.set(key, progress);
      return { outcome: 'staff-only' };
    }

    deliveryProgress.delete(key);
    return { outcome: 'failed' };
  }

  deliveryProgress.delete(key);
  return { outcome: 'sent' };
}

/**
 * Frontend-only EmailJS transport. It sends the desk copy first, then the
 * client confirmation, and retries only the copy that has not succeeded.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailDeliveryResult> {
  if (runtimeConfig.formMode === 'demo') return { outcome: 'demo' };
  if (!isEmailConfigured()) return { outcome: 'failed' };

  const key = getDeliveryKey(payload);
  const existing = inFlightDeliveries.get(key);
  if (existing) return existing;

  const delivery = dispatchLiveEmail(payload, key);
  inFlightDeliveries.set(key, delivery);

  try {
    return await delivery;
  } finally {
    inFlightDeliveries.delete(key);
  }
}