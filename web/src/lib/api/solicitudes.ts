import { apiFetch } from "./client";
import type { components } from "./schema";

export type ContactoCreate = components["schemas"]["ContactoCreate"];
export type ContactoResponse = components["schemas"]["ContactoResponse"];

export async function submitContacto(
  payload: ContactoCreate,
): Promise<ContactoResponse> {
  return apiFetch<ContactoResponse>("/solicitudes/contacto", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
}
