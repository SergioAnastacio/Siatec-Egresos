import { httpGetJson } from '@/services/http';

export type EgresosResponse = unknown;

export async function getEgresos() {
  return httpGetJson<EgresosResponse>('/api/v1/egresos');
}
