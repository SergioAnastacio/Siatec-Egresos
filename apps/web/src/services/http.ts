import type { HttpError } from '@siatec-egresos/api-client';

import { env } from '@/shared/config/env';
import { getAuthToken } from '@/shared/auth/tokenStorage';

export type { HttpError };

function trimSlash(s: string) {
  return s.replace(/\/$/, '');
}

function joinUrl(baseUrl: string, path: string) {
  const base = trimSlash(baseUrl);
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

async function readErrorDetails(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }

  try {
    const text = await res.text();
    return text.length ? text : undefined;
  } catch {
    return undefined;
  }
}

async function httpRequestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = joinUrl(env.apiBaseUrl, path);

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };

  // Prefer token obtenido por login; fallback a dev token (NEXT_PUBLIC_API_DEV_TOKEN).
  const token = (getAuthToken() ?? env.apiDevToken)?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const details = await readErrorDetails(res);
    const err: HttpError = {
      message: `HTTP ${res.status} al llamar ${url}`,
      status: res.status,
      details,
    };
    throw err;
  }

  return (await res.json()) as T;
}

export async function httpGetJson<T>(path: string, init?: RequestInit): Promise<T> {
  return httpRequestJson<T>(path, {
    ...init,
    method: 'GET',
  });
}

export async function httpPostJson<TRes, TBody>(
  path: string,
  body: TBody,
  init?: RequestInit,
): Promise<TRes> {
  return httpRequestJson<TRes>(path, {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
    },
    body: JSON.stringify(body),
  });
}
