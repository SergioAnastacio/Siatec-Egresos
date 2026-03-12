import { httpGetJson, httpPatchJson, httpPostJson } from '@/services/http';

import type {
  CreateSolicitudRequest,
  PatchSolicitudRequest,
  PatchSolicitudStatusRequest,
  SolicitudDto,
  SolicitudesListResponse,
} from './solicitudes.types';

function normalizeList(res: SolicitudesListResponse): SolicitudDto[] {
  if (Array.isArray(res)) return res;

  if (res && typeof res === 'object' && 'items' in res) {
    const items = (res as { items?: unknown }).items;
    if (Array.isArray(items)) return items as SolicitudDto[];
  }

  return [];
}

export const solicitudesApi = {
  async list(): Promise<SolicitudDto[]> {
    const res = await httpGetJson<SolicitudesListResponse>('/api/v1/solicitudes');
    return normalizeList(res);
  },

  create(req: CreateSolicitudRequest) {
    return httpPostJson<SolicitudDto, CreateSolicitudRequest>('/api/v1/solicitudes', req);
  },

  getById(id: string) {
    return httpGetJson<SolicitudDto>(`/api/v1/solicitudes/${encodeURIComponent(id)}`);
  },

  patch(id: string, req: PatchSolicitudRequest) {
    return httpPatchJson<SolicitudDto, PatchSolicitudRequest>(
      `/api/v1/solicitudes/${encodeURIComponent(id)}`,
      req,
    );
  },

  patchStatus(id: string, req: PatchSolicitudStatusRequest) {
    return httpPatchJson<SolicitudDto, PatchSolicitudStatusRequest>(
      `/api/v1/solicitudes/${encodeURIComponent(id)}/status`,
      req,
    );
  },
};
