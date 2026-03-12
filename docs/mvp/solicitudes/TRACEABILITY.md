# Trazabilidad — Solicitudes (WinDev → UI → API → DB)

## Browse (Catálogo)
- WinDev: `docs/windev/as-is/windows/WIN_WIN_Browse_Solicitudes.json`
- UI: `/solicitudes`
- API:
  - `GET /api/v1/solicitudes`
  - `POST /api/v1/solicitudes` (crear)
  - `PATCH /api/v1/solicitudes/{id}/status` (cancelar)

## Update (Edición)
- WinDev: `docs/windev/as-is/windows/WIN_WIN_UpdateSolicitudes.json`
- UI: `/solicitudes/[id]`
- API:
  - `GET /api/v1/solicitudes/{id}`
  - `PATCH /api/v1/solicitudes/{id}`

## DB
- Fuente: `docs/windev/db/solicitudes/**`
- Tablas/llaves: (pendiente documentar en `DATA_MODEL.md`)
