# Web/Desktop Pages — MVP Login + Usuarios

> Nota: este documento mezcla (1) **estado actual** en el repo y (2) **target MVP** (pendiente) para Login + Usuarios.

## Estado actual (implementación en repo)

### Web (apps/web — Next.js Pages Router)

Rutas existentes:

- `/` → `apps/web/src/pages/index.tsx`
- `/login` → `apps/web/src/pages/login.tsx`
  - Estado: **stub** (botón `Entrar` con `TODO: implementar login`)
- `/egresos` → `apps/web/src/pages/egresos.tsx`

No existen aún páginas de usuarios (`/usuarios`, `/usuarios/[id]`).

### Desktop (apps/desktop — Next.js + Tauri)

Rutas existentes:

- `/` → `apps/desktop/src/pages/index.tsx`
- `/login` → `apps/desktop/src/pages/login.tsx`
  - Estado: **stub** (botón `Entrar` con `TODO: login`)
- `/egresos` → `apps/desktop/src/pages/egresos.tsx`

No existen aún páginas de usuarios.

## Target MVP (pendiente de implementar)

### Web

#### `/login`
- **Objetivo:** capturar credenciales y autenticar.
- **Eventos (propuesto):**
  - submit form → `POST /api/v1/auth/login`
  - on success → navegar a home/dashboard
- **Fuente WinDev:**
  - `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`

#### `/usuarios` (catálogo)
- **Objetivo:** listar usuarios.
- **Eventos (propuesto):**
  - load → `GET /api/v1/users`
  - search → `GET /api/v1/users?q=...`
  - click row → navegar a `/usuarios/{id}`
- **Fuente WinDev:**
  - procedures: `PROC_WIN_Catalogo_Usuarios_Carga_Tabla.json`
  - windows: `docs/windev/as-is/windows/usuarios/WIN_WIN_Catalogo_Usuarios.json` (si aplica)

#### `/usuarios/{id}` (edición)
- **Objetivo:** editar usuario + derechos.
- **Eventos (propuesto):**
  - load → `GET /api/v1/users/{id}`
  - save profile → `PATCH /api/v1/users/{id}`
  - save rights → `PUT /api/v1/users/{id}/rights`
- **Fuente WinDev:**
  - `PROC_WIN_Edita_Usuarios_*`

### Desktop

- Mantener el mismo flujo que web (idealmente compartir componentes/servicios).

## Componentes compartidos sugeridos

- `features/auth/*` (form, hooks)
- `features/users/*` (list/detail)
- `services/auth.ts` + `services/users.ts` (consumo API)

## Notas

- Prioridad: reproducir **comportamiento** (flujo y reglas), no pixel-perfect.
- Reglas de visibilidad/habilitado deben venir de `rights/menu`.
