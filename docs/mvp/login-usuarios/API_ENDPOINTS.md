# API Endpoints — MVP Login + Usuarios

> Fuente de verdad: `docs/windev/as-is/**`.
> 
> Objetivo: convertir procedimientos WinDev en un set **pequeño y trazable** de endpoints REST bajo `/api/v1`.

## Convenciones

- Responses de error: usar el formato estándar del API (`{ code, message }`).
- Todos los endpoints deben tener **trazabilidad** a JSONs de `docs/windev/as-is/...`.

### Auth (estado actual en la implementación)

Actualmente el API (Rust) usa un esquema **dev-mode** para proteger endpoints de escritura:

- Header: `Authorization: Bearer <token>`
- Variables de entorno (API): `API_DEV_TOKEN` o `DEV_TOKEN`
- Comportamiento:
  - Si **NO** hay token configurado → auth deshabilitado (útil para dev local)
  - Si hay token configurado → se requiere `Authorization: Bearer ...` en los endpoints protegidos

> Referencias: `services/api/src/auth.rs`, `services/api/src/config.rs`.

### Auth (target MVP)

El target para el MVP de Login/Usuarios es implementar un **login real** (session/JWT/etc.). Mientras eso no exista, los endpoints de `auth/login` y `auth/me` se consideran **propuestos** (no implementados aún).

## Endpoints propuestos (mínimo MVP; **no implementados aún**)

### Auth

#### 1) POST `/api/v1/auth/login`
- **Propósito:** Validar credenciales y establecer sesión/token.
- **Auth:** público
- **Request (shape):**
  - `login: string`
  - `password: string`
- **Response (shape):**
  - `token?: string` (si usamos bearer)
  - `user: { id, login, nombre?, roles?, ... }`
  - `rights?: object` (derechos/menú efectivo) o se obtiene por endpoint separado
- **Trazabilidad:**
  - Window: `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`
  - Procedures:
    - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Inicializa_Menu.json`
    - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Prepara_Menu.json`
    - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Habilita_Menu.json`

#### 2) GET `/api/v1/auth/me`
- **Propósito:** Identidad actual + derechos/menú.
- **Auth:** requerido
- **Response:**
  - `user: { ... }`
  - `rights: object`
  - `menu: object` (opcional)
- **Trazabilidad:**
  - Window: `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`
  - Procedures: mismos de Prepara/Habilita/Inicializa

#### 3) POST `/api/v1/auth/logout` (opcional)
- **Propósito:** cerrar sesión (si aplica).
- **Auth:** requerido

### Usuarios

#### 4) GET `/api/v1/users`
- **Propósito:** catálogo/listado de usuarios.
- **Auth:** requerido (admin/permiso)
- **Query (opcional):** `q`, `status`, `page`, `pageSize`
- **Response:** `items: UserSummary[]`
- **Trazabilidad:**
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Catalogo_Usuarios_Carga_Tabla.json`
  - Window (catálogo): `docs/windev/as-is/windows/usuarios/WIN_WIN_Catalogo_Usuarios.json` (si existe; si no, ligar a WIN correspondiente en `windows/*.json`)

#### 5) GET `/api/v1/users/{userId}`
- **Propósito:** detalle para editar.
- **Auth:** requerido
- **Response:** `UserDetail`
- **Trazabilidad:**
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_INDEX.json`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_WIN_Edita_Usuarios.json`

#### 6) POST `/api/v1/users`
- **Propósito:** registrar usuario.
- **Auth:** requerido (admin)
- **Request:** campos mínimos (definir desde JSON + DB docs)
- **Response:** `UserDetail`
- **Trazabilidad:**
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_RegistroUsuarioLUCCA_Prepara_Menu.json`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_RegistroUsuarioLUCCA_Habilita_Menu.json`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_RegistroUsuarioLUCCA_Prepara_Menu1.json`

#### 7) PATCH `/api/v1/users/{userId}`
- **Propósito:** editar usuario.
- **Auth:** requerido
- **Request:** patch parcial.
- **Trazabilidad:**
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_*`

#### 8) PUT `/api/v1/users/{userId}/rights`
- **Propósito:** actualizar derechos/permisos.
- **Auth:** requerido (admin)
- **Request (shape):** objeto con flags/roles/areas.
- **Response:** derechos persistidos + menú efectivo.
- **Trazabilidad:**
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_AACarga_ZDerechos_*.json`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_AACarga_ZZZGuarda410.json`

#### 9) GET `/api/v1/menu` (recomendado)
- **Propósito:** menú calculado para el usuario logueado.
- **Auth:** requerido
- **Trazabilidad:**
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Prepara_Menu.json`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_Verifica_Menu_*.json`

## Notas MVP

- En MVP podemos tratar `rights` como un JSON “sin tipar” (objeto) para avanzar rápido, pero documentarlo desde `as-is`.
- La migración de contraseña (AS-IS usa `DECRYPTBYPASSPHRASE`) se manejará como **transición gradual**; por ahora solo documentado.
