# Web/Desktop Pages — MVP Solicitudes

## Rutas Web (Next Pages)

### `/solicitudes`
- Tabla catálogo (Browse).
- Carga: `GET /api/v1/solicitudes`
- Acciones:
  - Nueva (normal) → crea y abre
  - Nuevo préstamo → crea y abre
  - Editar → abre detalle
  - Cancelar → cambia status

### `/solicitudes/nueva` (opcional)
- Alternativa: pantalla explícita de alta.

### `/solicitudes/[id]`
- Detalle/edición (Update).
- Carga: `GET /api/v1/solicitudes/{id}`
- Guardar: `PATCH /api/v1/solicitudes/{id}`
- Cambiar estado: `PATCH /api/v1/solicitudes/{id}/status`

## Desktop (Tauri + Next Pages)

Replicar las mismas rutas (behavior-first):
- `/solicitudes`
- `/solicitudes/[id]`

## Trazabilidad WinDev
- `WIN_WIN_Browse_Solicitudes.json` → `/solicitudes`
- `WIN_WIN_UpdateSolicitudes.json` → `/solicitudes/[id]`
