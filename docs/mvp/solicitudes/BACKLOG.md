# Backlog E2E — MVP Solicitudes

## Epic S1 — Catálogo de Solicitudes

### S1.1 Listado de solicitudes (Browse)
**Como** usuario
**quiero** ver mi catálogo de solicitudes
**para** crear/editar/cancelar.

**Criterios de aceptación**
- La tabla muestra columnas: Código, Fecha, Área, Solicitante, Estado.
- Soporta búsqueda/filtrado básico.

**API**
- `GET /api/v1/solicitudes`

**UI**
- Web: `/solicitudes`
- Desktop: `/solicitudes`

**Trazabilidad**
- `WIN_WIN_Browse_Solicitudes.json` → `TABLE_Catalogo_Solicitudes`

## Epic S2 — Crear Solicitud

### S2.1 Crear solicitud normal
**Como** usuario
**quiero** crear una solicitud
**para** capturar bienes/servicios.

**API**
- `POST /api/v1/solicitudes`

**UI**
- `/solicitudes/nueva` o flow “crear y abrir detalle”

**Trazabilidad**
- Browse `BTN_Agregar` → abre Update

### S2.2 Crear solicitud préstamo (solo bienes)
**Como** usuario
**quiero** crear una solicitud tipo préstamo
**para** solicitar bienes en préstamo.

**API**
- `POST /api/v1/solicitudes` con `tipo='prestamo'`

**Trazabilidad**
- Browse `BTN_Prestamos`

## Epic S3 — Editar Solicitud

### S3.1 Abrir/editar solicitud
**Como** usuario
**quiero** editar una solicitud
**para** completar datos.

**API**
- `GET /api/v1/solicitudes/{id}`
- `PATCH /api/v1/solicitudes/{id}`

**Trazabilidad**
- Browse `BTN_Editar` → `WIN_UpdateSolicitudes`

## Epic S4 — Cancelar Solicitud

### S4.1 Cancelación
**Como** usuario
**quiero** cancelar una solicitud no procesada
**para** detener el flujo.

**API**
- `PATCH /api/v1/solicitudes/{id}/status` (status=cancelada + motivo)

**Trazabilidad**
- Browse `BTN_Cancelar`

## Epic S5 — DB/Modelo

### S5.1 Alinear tablas mínimas
Usar `docs/windev/db/solicitudes/**` para definir:
- tablas principales
- llaves
- constraints recomendados

**Salida:** agregar doc `DATA_MODEL.md` con el modelo mínimo del MVP.
