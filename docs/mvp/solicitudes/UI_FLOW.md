# UI Flow — MVP Solicitudes

## Flujo

1) Usuario entra a `/solicitudes`.
- Se muestra el catálogo.
- Acciones: crear / editar / cancelar.

2) Crear
- Click “Agregar” → `POST /api/v1/solicitudes` (tipo normal)
- Click “Préstamo” → `POST /api/v1/solicitudes` (tipo préstamo)
- Redirige a `/solicitudes/{id}`.

3) Editar
- Desde catálogo, seleccionar solicitud → `/solicitudes/{id}`.
- Carga detalle y permite editar campos generales.

4) Cancelar
- Desde catálogo, cancelar → `PATCH /api/v1/solicitudes/{id}/status`.

## Referencia WinDev
- Browse: `WIN_Browse_Solicitudes`
- Update: `WIN_UpdateSolicitudes`
