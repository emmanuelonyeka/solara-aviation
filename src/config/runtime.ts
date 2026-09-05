export type FormMode = 'demo' | 'live';

const requestedFormMode = import.meta.env.VITE_FORM_MODE?.trim().toLowerCase();

export const runtimeConfig = {
  formMode: requestedFormMode === 'live' ? 'live' : 'demo',
} as const satisfies { formMode: FormMode };
