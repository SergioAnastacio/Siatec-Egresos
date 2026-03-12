import { httpGetJson } from '@/services/http';

export type EgresosResponse = unknown;

// TODO(eg-010): migrar a @siatec-egresos/api-client cuando exista como package real.
export async function getEgresos() {
  return httpGetJson<EgresosResponse>('/api/v1/egresos');
}
