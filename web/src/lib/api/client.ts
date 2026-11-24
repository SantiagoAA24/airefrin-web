const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function getApiBaseUrl(): string {
  return apiBaseUrl;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiFetchOptions = {
  searchParams?: Record<string, string | number | boolean | null | undefined>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrl(
  path: string,
  searchParams?: ApiFetchOptions["searchParams"],
): string {
  const url = new URL(path, getApiBaseUrl());
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, options.searchParams), {
    cache: options.cache,
    next: options.next,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    let message = "No pudimos cargar la información. Intenta de nuevo.";
    try {
      const body = (await response.json()) as { detail?: unknown };
      if (typeof body.detail === "string") {
        message = body.detail;
      }
    } catch {
      // keep default message
    }
    throw new ApiError(response.status, message);
  }

  return (await response.json()) as T;
}
