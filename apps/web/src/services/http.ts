import { createApiClient, type HttpError } from '@siatec-egresos/api-client';

import { env } from '@/shared/config/env';

// Mantener API local (apps/web) pero delegar implementación al package compartido.
export type { HttpError };

const http = createApiClient({
  baseUrl: env.apiBaseUrl,
  devToken: env.apiDevToken,
});

export async function httpGetJson<T>(path: string, init?: RequestInit): Promise<T> {
  return http.getJson<T>(path, init);
}
