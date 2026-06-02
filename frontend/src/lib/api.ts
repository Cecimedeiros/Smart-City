export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? 'http://localhost:3001';

export const DEMAND_API_URL =
  process.env.NEXT_PUBLIC_DEMAND_API_URL ?? 'http://localhost:3002';

export const METRICS_API_URL =
  process.env.NEXT_PUBLIC_METRICS_API_URL ?? 'http://localhost:3003';

export const API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? 'http://localhost:8080';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface ApiFetchOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(
  baseUrl: string,
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(body.error ?? 'Erro na requisição', response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
