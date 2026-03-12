# Tarea: Sidebar runtime desktop basado en LUCCA410

## Objetivo

Reemplazar el sidebar provisional de `desktop` por un menu runtime alimentado por permisos legacy de `LUCCA410`, usando como evidencia principal `Habilita_Menu`, `Prepara_Menu`, `Prepara_Menu1` y el bloque de edicion de usuarios `WIN_Edita_Usuarios`.

## Alcance

- Exponer en la sesion desktop los permisos nuevos de `LUCCA410`.
- Construir el sidebar desktop desde una configuracion declarativa ligada a esos permisos.
- Aplicar el primer slice real del menu legacy para `Parametros Generales > Control de Usuarios`.
- Proteger la ruta `/usuarios` para que no dependa solo de ocultar el item del sidebar.
- Mantener el shell actual, reemplazando solo la fuente de verdad del menu.

## Evidencia principal

- `docs/windev/as-is/procedures/PROC_WIN_RegistroUsuarioLUCCA_Habilita_Menu.json`
- `docs/windev/as-is/procedures/PROC_WIN_RegistroUsuarioLUCCA_Prepara_Menu.json`
- `docs/windev/as-is/procedures/PROC_WIN_RegistroUsuarioLUCCA_Prepara_Menu1.json`
- `docs/windev/as-is/procedures/PROC_WIN_Edita_Usuarios_Menu_ParGen.json`
- `docs/windev/as-is/procedures/PROC_WIN_Edita_Usuarios_Verifica_Menu_ParGen.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Edita_Usuarios_BTN_Aceptar1_Click.json`
- `docs/windev/as-is/windows/WIN_WIN_Edita_Usuarios.json`

## Resultado

- `DesktopAuthSession` ahora serializa `menuPermissions` desde `LUCCA410`.
- El backend consulta `LUCCA410` completo y transforma columnas `1..360` en ids de permisos habilitados.
- El sidebar desktop deja de estar hardcodeado y se resuelve desde la sesion.
- `Parametros Generales` se mapea a `269` y `Control de Usuarios` a `271`, con base en `Menu_ParGen`/`Verifica_Menu_ParGen` y en `Prepara_Menu`.
- `/usuarios` redirige a `/inicio` si el usuario no cuenta con el permiso correspondiente.

## Validacion

- `pnpm --filter @siatec/desktop typecheck` paso.
- `cargo check` en `apps/desktop/src-tauri` paso.
- `pnpm --filter @siatec/desktop build` no pudo cerrarse de forma confiable en este host:
  - una corrida fallo por `EPERM` sobre `apps/desktop/frontend/.next/trace`
  - dos reintentos posteriores quedaron colgados hasta timeout tras limpiar `.next`

## Restricciones

- Este slice solo aterriza el submenu ya implementado en la app.
- El resto del arbol legacy de `Prepara_Menu` sigue pendiente de mapear a rutas reales.
