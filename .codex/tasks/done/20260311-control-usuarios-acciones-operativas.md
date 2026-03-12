# Tarea: Implementar acciones operativas de Control de Usuarios desktop

## Objetivo

Extender `Control de Usuarios` en `desktop` con acciones operativas desde el catalogo para bloquear/desbloquear usuarios y resetear contraseña, alineadas al AS-IS disponible y a las reglas legacy ya implementadas en autenticacion.

## Alcance

- Agregar acciones de catalogo para bloquear/desbloquear usuario.
- Agregar accion de reset/cambio de contraseña desde catalogo o flujo equivalente simple.
- Persistir `Usuarios.BLOQUEADO` y `Usuarios.ULTIMOREGISTRO` segun corresponda.
- Registrar `BitMovs` para bloqueo, desbloqueo y modificacion de contraseña.
- Mantener la regla de no borrado fisico.
- Mantener guards por permisos del modulo actual.

## Evidencia principal

- `docs/windev/as-is/windows/CTRL_WIN_WIN_Edita_Usuarios_BTN_Aceptar1_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_CambiaUsuarioLUCCA_BTN_Agregar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_CambiaUsuarioLUCCA_EDT_LOGIN_Exit.json`
- `docs/windev/as-is/windows/WIN_WIN_Catalogo_Usuarios.json`
- `docs/windev/db/inicio_login_usuarios/DDL_LUCCA_INICIO_LOGIN_USUARIOS.sql`

## Criterios de aceptacion

- El catalogo ofrece accion de bloquear/desbloquear.
- El catalogo ofrece accion de reset/cambio de contraseña con validacion minima.
- Se actualiza `Usuarios.BLOQUEADO`.
- Al desbloquear se actualiza `ULTIMOREGISTRO` en formato legacy.
- Si cambia contraseña se cifra `FIRMA` con `ENCRYPTBYPASSPHRASE` y se registra `UsuHist`.
- Se registra `BitMovs`.
- `pnpm --filter @siatec/desktop typecheck` pasa.
- `cargo check` pasa.

## Resultado

- El catalogo de usuarios ahora agrega acciones `Bloquear/Desbloquear` y `Reset contraseña`.
- El backend Tauri expone comandos dedicados para:
  - alternar `Usuarios.BLOQUEADO`
  - recomponer `ULTIMOREGISTRO` al desbloquear
  - resetear contraseña
  - registrar `UsuHist`
  - volver a cifrar `FIRMA`
  - auditar en `BitMovs`
- El frontend agrega modal simple para reset de contraseña y toast de resultado para operaciones del catalogo.

## Validacion ejecutada

- `pnpm --filter @siatec/desktop typecheck` -- pasa
- `cargo check` -- pasa
