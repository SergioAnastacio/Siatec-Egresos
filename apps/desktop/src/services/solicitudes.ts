import { httpGetJson } from '@/services/http';

// TODO(eg-022): migrar a @siatec-egresos/api-client cuando exista como package real.
export type SolicitudesListResponse = unknown;
export type SolicitudDetailResponse = unknown;

export async function getSolicitudes() {
  return httpGetJson<SolicitudesListResponse>('/api/v1/solicitudes');
}

export async function getSolicitudById(id: string) {
  return httpGetJson<SolicitudDetailResponse>(`/api/v1/solicitudes/${encodeURIComponent(id)}`);
}
