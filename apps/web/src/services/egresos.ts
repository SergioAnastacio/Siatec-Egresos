import { createEgresosApi } from '@siatec-egresos/api-client';
import type { GetEgresosResponse } from '@siatec-egresos/api-client';

import { env } from '@/shared/config/env';

const egresosApi = createEgresosApi({
  baseUrl: env.apiBaseUrl,
  devToken: env.apiDevToken,
});

export type EgresosResponse = GetEgresosResponse;

export async function getEgresos() {
  return egresosApi.getEgresos();
}
