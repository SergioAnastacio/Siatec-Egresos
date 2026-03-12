import { env } from '@/shared/config/env';

export type HttpError = {
  message: string;
  status?: number;
  details?: unknown;
};

export async function httpGetJson<T>(path: string, init?: RequestInit): Promise<T> {
  const base = env.apiBaseUrl.replace(/\/$/, '');
  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;

  const res = await fetch(url, {
    ...init,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
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
