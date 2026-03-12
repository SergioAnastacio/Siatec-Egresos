import { getDevToken } from '@/shared/auth/token';
import { env } from '@/shared/config/env';

export type HttpError = {
  message: string;
  status?: number;
  details?: unknown;
};

function buildUrl(path: string) {
  const base = env.apiBaseUrl.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

function buildHeaders(init?: RequestInit) {
  const token = getDevToken();

  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init?.headers ?? {}),
  };
}

export async function httpGetJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = buildUrl(path);

  const res = await fetch(url, {
    ...init,
    method: 'GET',
    headers: buildHeaders(init),
  });

  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = await res.json();
    } catch {
      // ignore
    }

    const err: HttpError = {
      message: `HTTP ${res.status} al llamar ${url}`,
      status: res.status,
      details,
    };
    throw err;
  }

  return (await res.json()) as T;
}
