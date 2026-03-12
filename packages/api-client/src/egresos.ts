import type { Egreso } from '@siatec-egresos/contracts';

import type { ApiClientOptions } from './http';
import { createApiClient } from './http';

export type GetEgresosResponse = Egreso[];

export function createEgresosApi(opts: ApiClientOptions) {
  const http = createApiClient(opts);

  return {
    /** GET /api/v1/egresos */
    getEgresos(): Promise<GetEgresosResponse> {
      return http.getJson<GetEgresosResponse>('/api/v1/egresos');
    },
  };
}
