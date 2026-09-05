export function toAbsoluteUrl(value: string, baseUrl: string): string {
    if (/^https?:\/\//i.test(value)) return value;
    return `${baseUrl.replace(/\/+$/, '')}${value.startsWith('/') ? value : `/${value}`}`;
  }
  
  /** Prevents configured text from terminating the JSON-LD script element. */
  export function serializeJsonLd(value: unknown): string {
    return JSON.stringify(value).replace(/</g, '\\u003c');
  }