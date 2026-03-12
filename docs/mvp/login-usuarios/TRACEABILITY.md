# Trazabilidad — Login + Usuarios (WinDev → Web/Desktop → API)

> Este archivo amarra la base documental `windev/as-is` con el MVP.

## Login

- **WinDev Window**: `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`
  - **Web/Desktop**: `/login`
  - **API**:
    - `POST /api/v1/auth/login`
    - `GET /api/v1/auth/me`

- **Procedures**:
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Inicializa_Menu.json`
    - API: `GET /api/v1/menu` (init/reset) / `GET /api/v1/auth/me`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Prepara_Menu.json`
    - API: `GET /api/v1/menu`
  - `docs/windev/as-is/procedures/usuarios/PROC_WIN_CambiaUsuarioLUCCA_Habilita_Menu.json`
    - API: `GET /api/v1/menu`

## Catálogo de usuarios

- `docs/windev/as-is/procedures/usuarios/PROC_WIN_Catalogo_Usuarios_Carga_Tabla.json`
  - Web/Desktop: `/usuarios` (tabla)
  - API: `GET /api/v1/users`

## Edición de usuario

- `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_INDEX.json`
  - Web/Desktop: `/usuarios/{id}` (load)
  - API: `GET /api/v1/users/{id}`

- `docs/windev/as-is/procedures/usuarios/PROC_WIN_Edita_Usuarios_*`
  - Web/Desktop: `/usuarios/{id}` (save)
  - API:
    - `PATCH /api/v1/users/{id}`
    - `PUT /api/v1/users/{id}/rights`

## Registro de usuario

- `docs/windev/as-is/procedures/usuarios/PROC_WIN_RegistroUsuarioLUCCA_*.json`
  - Web/Desktop: `/usuarios/nuevo`
  - API: `POST /api/v1/users`

## DB (modelo mínimo)

- `docs/windev/db/inicio_login_usuarios/**`
  - API: define estructura de `users`, `rights`, etc.
  - Pendiente: extraer “tabla mínima” a un doc de modelo.
