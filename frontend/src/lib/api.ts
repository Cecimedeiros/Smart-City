export const API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? 'https://smart-city-production-16f9.up.railway.app';

export const AUTH_API_URL = `${API_GATEWAY_URL}/auth`;
export const DEMAND_API_URL = `${API_GATEWAY_URL}/demands`;
export const METRICS_API_URL = `${API_GATEWAY_URL}/metrics`;

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
  let { token, headers, ...rest } = options;

  if (!token && typeof window !== 'undefined') {
    try {
      const storageJson = localStorage.getItem('smart-city-storage-v2');
      if (storageJson) {
        
        const parsed = JSON.parse(storageJson);
        token = parsed?.state?.token || undefined;
      }
    } catch (e) {
      console.error("Erro ao ler token do Zustand:", e);
    }
  }

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