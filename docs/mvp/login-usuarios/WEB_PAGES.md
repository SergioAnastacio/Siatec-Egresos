# Web/Desktop Pages — MVP Login + Usuarios

## Web (Next.js Pages Router)

### `/login`
- **Objetivo:** capturar credenciales y autenticar.
- **Eventos:**
  - submit form → `POST /api/v1/auth/login`
  - on success → navegar a home/dashboard
- **Fuente WinDev:**
  - `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`

### `/usuarios` (catálogo)
- **Objetivo:** listar usuarios.
- **Eventos:**
  - load → `GET /api/v1/users`
  - search → `GET /api/v1/users?q=...`
  - click row → navegar a `/usuarios/{id}`
- **Fuente WinDev:**
  - procedures: `PROC_WIN_Catalogo_Usuarios_Carga_Tabla.json`
  - windows: `docs/windev/as-is/windows/usuarios/WIN_WIN_Catalogo_Usuarios.json` (si aplica)

### `/usuarios/{id}` (edición)
- **Objetivo:** editar usuario + derechos.
- **Eventos:**
  - load → `GET /api/v1/users/{id}`
  - save profile → `PATCH /api/v1/users/{id}`
  - save rights → `PUT /api/v1/users/{id}/rights`
- **Fuente WinDev:**
  - `PROC_WIN_Edita_Usuarios_*`

## Desktop (Tauri + Next Pages)

### `apps/desktop/src/pages/login.tsx`
- Mantener el mismo flujo que web.

### `apps/desktop/src/pages/usuarios.tsx` (pendiente crear)
- MVP: puede reutilizar la misma UI/flujo.

## Componentes compartidos sugeridos
- `features/auth/*` (form, hooks)
- `features/users/*` (list/detail)
- `services/auth.ts` + `services/users.ts` (consumo API)

## Notas
- Prioridad: reproducir **comportamiento** (flujo y reglas), no pixel-perfect.
- Reglas de visibilidad/habilitado deben venir de `rights/menu`.
