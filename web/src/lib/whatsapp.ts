import { site } from "./site";

/** Builds a wa.me link with a prefilled message. */
export function whatsappUrl(message: string): string {
  return `${site.whatsappHref}?text=${encodeURIComponent(message)}`;
}
