export type SolicitudTipo = 'bienes' | 'servicios' | 'prestamo' | (string & {});
export type SolicitudStatus =
  | 'borrador'
  | 'enviada'
  | 'autorizada'
  | 'rechazada'
  | 'cancelada'
  | (string & {});

// MVP: el backend puede evolucionar; mantenemos el DTO flexible.
export type SolicitudDto = {
  id: string;
  folio?: string;
  tipo?: SolicitudTipo;
  status?: SolicitudStatus;
  areaId?: string;
  notas?: string;
  createdAt?: string;
  updatedAt?: string;
  [k: string]: unknown;
};

export type SolicitudesListResponse = SolicitudDto[] | { items: SolicitudDto[] };

export type CreateSolicitudRequest = {
  tipo: SolicitudTipo;
  areaId?: string;
  notas?: string;
};

export type PatchSolicitudRequest = Partial<Pick<SolicitudDto, 'tipo' | 'areaId' | 'notas'>> & {
  [k: string]: unknown;
};

export type PatchSolicitudStatusRequest = {
  status: SolicitudStatus;
  motivo?: string;
};
