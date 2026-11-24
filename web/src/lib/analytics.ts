declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push a conversion/event to GTM dataLayer when available. */
export function trackEvent(
  event: string,
  payload: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
