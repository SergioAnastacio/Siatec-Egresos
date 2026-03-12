// DTOs compartidos para el módulo Solicitudes (MVP).
// Nota: por ahora están alineados con los DTOs in-memory del API (services/api).

export type SolicitudTipo = 'bienes' | 'servicios' | 'prestamo';

export type SolicitudStatus = 'draft' | 'sent' | 'canceled';

export type SolicitudDto = {
  id: string;
  tipo: SolicitudTipo;
  area_id?: string | null;
  notas?: string | null;
  status: SolicitudStatus;
  created_at?: string | null;
};

export type CreateSolicitudRequest = {
  tipo: SolicitudTipo;
  area_id?: string | null;
  notas?: string | null;
};

export type UpdateSolicitudRequest = {
  area_id?: string | null;
  notas?: string | null;
};

export type UpdateSolicitudStatusRequest = {
  status: SolicitudStatus;
  motivo?: string | null;
};
