/**
 * Typed API client. All data access from the frontend goes through here.
 * Endpoints will be added as the backend grows.
 */

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function getApiBaseUrl(): string {
  return apiBaseUrl;
}
