# API Endpoints — MVP Solicitudes

Namespace: `/api/v1/solicitudes`

## Fuentes (WinDev)
- Catálogo: `docs/windev/as-is/windows/WIN_WIN_Browse_Solicitudes.json`
- Edición: `docs/windev/as-is/windows/WIN_WIN_UpdateSolicitudes.json`
- DB: `docs/windev/db/solicitudes/**`

## Endpoints mínimos (E2E MVP)

### 1) GET `/api/v1/solicitudes`
- **Propósito:** listado/catálogo de solicitudes del usuario.
- **Auth:** requerido (dev token por ahora).
- **Query sugerida:** `q`, `estado`, `tipo` (bienes/servicios/prestamo), `page`, `pageSize`.
- **Trazabilidad:**
  - UI tabla `TABLE_Catalogo_Solicitudes` (Browse)

### 2) POST `/api/v1/solicitudes`
- **Propósito:** crear solicitud base (normal o préstamo).
- **Auth:** requerido.
- **Request (shape preliminar):**
  - `tipo: 'bienes' | 'servicios' | 'prestamo'`
  - `areaId?: string`
  - `notas?: string`
- **Response:** `SolicitudDto`.
- **Trazabilidad:**
  - `BTN_Agregar` / `BTN_Prestamos` (Browse) abre Update

### 3) GET `/api/v1/solicitudes/{id}`
- **Propósito:** obtener detalle para edición.
- **Auth:** requerido.
- **Trazabilidad:**
  - `BTN_Editar` (Browse) → abre Update

### 4) PATCH `/api/v1/solicitudes/{id}`
- **Propósito:** editar campos generales.
- **Auth:** requerido.
- **Trazabilidad:**
  - UpdateSolicitudes (captura/edición)

### 5) PATCH `/api/v1/solicitudes/{id}/status`
- **Propósito:** transición de estado (ej. borrador → enviada → cancelada).
- **Auth:** requerido.
- **Request:** `status: string` (+ motivo si cancela).
- **Trazabilidad:**
  - `BTN_Cancelar` (Browse)

## Endpoints “fase 2” (según WinDev)
- Adjuntos: `/api/v1/solicitudes/{id}/attachments`
- Artículos/Servicios: `/api/v1/solicitudes/{id}/items`
- Impresión: `/api/v1/solicitudes/{id}/print`
- Recepción bienes: depende de ventana `WIN_Browse_RecepCompUsu`
