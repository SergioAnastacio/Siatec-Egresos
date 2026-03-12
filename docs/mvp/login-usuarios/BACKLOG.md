# Backlog E2E — MVP Login + Usuarios

> Fuente documental: `docs/windev/as-is/**`.
> 
> Meta: que Web + Desktop puedan **loguearse**, ver/editar **usuarios** (según permisos) y que la API Rust tenga endpoints trazables.

## Epic A — Autenticación (login) + sesión

### A1) Login (cambio de usuario) funcional
**Como** usuario del sistema
**quiero** ingresar con login/password
**para** acceder al shell/web con mi menú/permiso.

**Criterios de aceptación**
- Dado un login/password válidos, el sistema devuelve sesión/token y el usuario queda autenticado.
- Si las credenciales son inválidas, retorna error con mensaje genérico (sin filtrar si existe el usuario).
- El sistema limita intentos / respeta bloqueo (si aplica en as-is; al menos registrar el contador).

**API**
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

**UI**
- Web: `/login`
- Desktop: `apps/desktop/src/pages/login.tsx`

**Trazabilidad (base)**
- `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`

### A2) Menú/derechos efectivos por usuario
**Como** usuario autenticado
**quiero** que el sistema me regrese mis derechos/menú
**para** habilitar/deshabilitar opciones.

**Criterios de aceptación**
- `GET /auth/me` incluye `rights` y opcionalmente `menu`.
- `GET /menu` devuelve el menú calculado.

**API**
- `GET /api/v1/menu` (recomendado)

**Trazabilidad (base)**
- `PROC_WIN_CambiaUsuarioLUCCA_Prepara_Menu.json`
- `PROC_WIN_CambiaUsuarioLUCCA_Habilita_Menu.json`

## Epic B — Catálogo de usuarios

### B1) Listado de usuarios
**Como** admin (o usuario con permiso)
**quiero** ver el catálogo de usuarios
**para** administrar accesos.

**Criterios de aceptación**
- Lista paginada (o al menos limitada) de usuarios.
- Búsqueda por texto opcional.

**API**
- `GET /api/v1/users`

**UI**
- Web: `/usuarios`
- Desktop: (pantalla equivalente; en MVP puede ser el mismo flujo en web)

**Trazabilidad**
- `PROC_WIN_Catalogo_Usuarios_Carga_Tabla.json`

### B2) Ver detalle de usuario
**Como** admin
**quiero** ver detalle de un usuario
**para** editarlo.

**API**
- `GET /api/v1/users/{userId}`

**Trazabilidad**
- `PROC_WIN_Edita_Usuarios_INDEX.json`
- `PROC_WIN_Edita_Usuarios_WIN_Edita_Usuarios.json`

## Epic C — Registro/Edición de usuario

### C1) Crear usuario
**Como** admin
**quiero** crear un usuario
**para** dar acceso al sistema.

**API**
- `POST /api/v1/users`

**Trazabilidad**
- `PROC_WIN_RegistroUsuarioLUCCA_*.json`

### C2) Editar usuario
**Como** admin
**quiero** actualizar datos de un usuario
**para** mantener información correcta.

**API**
- `PATCH /api/v1/users/{userId}`

**Trazabilidad**
- `PROC_WIN_Edita_Usuarios_*`

## Epic D — Derechos/Permisos por usuario

### D1) Asignar/guardar derechos
**Como** admin
**quiero** asignar derechos
**para** controlar el acceso a módulos.

**API**
- `PUT /api/v1/users/{userId}/rights`

**Criterios de aceptación**
- Al guardar, el usuario recibe derechos persistidos.
- Al consultar `GET /menu` o `GET /auth/me`, se refleja.

**Trazabilidad**
- `PROC_WIN_Edita_Usuarios_AACarga_ZDerechos_*.json`
- `PROC_WIN_Edita_Usuarios_AACarga_ZZZGuarda410.json`

## Epic E — Datos/DB (apoyo)

### E1) Alinear tablas mínimas del módulo login/usuarios
**Como** dev
**quiero** tener claridad de tablas/columns/keys
**para** implementar contratos sin adivinar.

**Entrada**
- `docs/windev/db/inicio_login_usuarios/*`

**Salida**
- Documento de “modelo mínimo” (tablas + campos) para `users/auth/rights`.

---

## Definición de terminado (DoD) para este backlog
- Cada historia tiene:
  - Endpoint(s) definidos en `API_ENDPOINTS.md`
  - Pantalla(s)/rutas definidas (web/desktop)
  - Trazabilidad a JSON fuente (al menos 1 referencia)
