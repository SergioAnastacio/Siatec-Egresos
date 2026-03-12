# UI Flow — MVP Login + Usuarios

## Estados

1. **No autenticado**
2. **Autenticado** (con `user` + `rights/menu` cargados)
3. **Admin usuarios** (navegación habilitada si el derecho lo permite)

## Flujo principal

### 1) Login
- Usuario entra a `/login`.
- Ingresa `login` + `password`.
- Submit → `POST /api/v1/auth/login`.
- En success:
  - Guardar token/sesión.
  - Llamar `GET /api/v1/auth/me` (o usar response del login) para cargar `rights/menu`.
  - Redirigir a Home.

### 2) Home (shell)
- Mostrar navegación según `menu`.
- Si tiene permiso de usuarios, mostrar link a `/usuarios`.

### 3) Catálogo de usuarios
- `/usuarios`
- Load → `GET /api/v1/users`.
- Selección de usuario → `/usuarios/{id}`.
- Acción “Nuevo usuario” → `/usuarios/nuevo`.

### 4) Edición de usuario
- `/usuarios/{id}`
- Load → `GET /api/v1/users/{id}`.
- Tabs/sections:
  - Datos generales
  - Derechos/menú
- Guardar datos generales → `PATCH /api/v1/users/{id}`
- Guardar derechos → `PUT /api/v1/users/{id}/rights`

### 5) Registro de usuario
- `/usuarios/nuevo`
- Submit → `POST /api/v1/users`
- Redirigir a detalle.

## Referencia WinDev
- `WIN_WIN_CambiaUsuarioLUCCA` (login/cambio usuario)
- `WIN_WIN_Catalogo_Usuarios` (listado)
- `WIN_WIN_Edita_Usuarios` (edición)
- `WIN_WIN_RegistroUsuarioLUCCA` (registro)

> Nota: En MVP, los nombres de páginas/rutas pueden ajustarse, pero el **comportamiento** debe reflejar WinDev.
