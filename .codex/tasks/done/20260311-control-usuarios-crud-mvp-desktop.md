# Tarea: Implementar modulo Control de Usuarios desktop

## Objetivo

Construir el modulo `Control de Usuarios` en `desktop` con flujo completo de catalogo y edicion, alineado al AS-IS de WinDev y a la metadata SQL disponible para `Usuarios`, `LUCCA182`, `LUCCA333`, `LUCCA410`, `UsuHist` y `BitMovs`.

## Alcance

- Reemplazar el catalogo MVP actual por un catalogo funcional de usuarios con comportamiento equivalente a `WIN_Catalogo_Usuarios`.
- Implementar pantalla de alta/edicion de usuario basada en `WIN_Edita_Usuarios`.
- Soportar alta de usuario base y posterior captura/edicion de datos.
- Soportar edicion de usuario existente.
- Mantener la regla legacy de no borrado fisico de usuarios.
- Persistir datos basicos de `Usuarios`.
- Persistir datos relacionados minimos requeridos en `LUCCA182`, `LUCCA333` y `LUCCA410`.
- Registrar auditoria en `BitMovs` para alta, modificacion, desbloqueo y cambio de contrasena segun evidencia.
- Respetar historial de contrasenas con `UsuHist` cuando aplique cambio de contrasena.
- Mantener frontend sin SQL directo y backend con comando Tauri delgado + servicio + repositorio.

## Evidencia principal

- `docs/windev/as-is/windows/WIN_WIN_Catalogo_Usuarios.json`
- `docs/windev/as-is/windows/WIN_WIN_Edita_Usuarios.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_BTN_Aceptar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_BTN_Ayuda_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_BTN_Cerrar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_BTN_Editar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_BTN_Eliminar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_BTN_Seleccionar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Catalogo_Usuarios_TABLE_Catalog_Cont_Initialization.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Edita_Usuarios_BTN_Aceptar1_Click.json`
- `docs/windev/db/inicio_login_usuarios/columns.json`
- `docs/windev/db/inicio_login_usuarios/DDL_LUCCA_INICIO_LOGIN_USUARIOS.sql`
- `docs/windev/db/inicio_login_usuarios/indexes.json`
- `docs/windev/db/inicio_login_usuarios/keys.json`
- `docs/windev/db/inicio_login_usuarios/tables.json`

## Flujo esperado

- Catalogo:
  - listar `Usuarios` con `Areax`
  - columnas: codigo, login/nombre de usuario, puesto, area de adscripcion, activo
  - buscar y ordenar
  - doble click: editar o seleccionar segun modo
- Alta:
  - crear usuario base
  - abrir editor
  - completar captura y guardar
- Edicion:
  - editar datos basicos
  - editar flags de estado relevantes
  - guardar permisos nuevos en `LUCCA410`
- Eliminacion:
  - no borrar; mostrar mensaje legacy equivalente

## Criterios de aceptacion

- Existe pagina funcional de catalogo de usuarios en desktop conectada a datos reales.
- Existe pagina/flujo de edicion de usuario conectada a persistencia real.
- Alta y edicion actualizan `Usuarios`, `LUCCA182`, `LUCCA333` y `LUCCA410` en el alcance sustentado.
- Si cambia la contrasena, se valida contra `UsuHist` y se cifra `Usuarios.FIRMA` con el mecanismo legacy actual.
- Si se desbloquea usuario, `ULTIMOREGISTRO` se actualiza con formato legacy `DateToInteger(gdFechaGral)-362`.
- Se registra `BitMovs` conforme al AS-IS disponible.
- El catalogo refleja `Activo` desde `Usuarios.ReceptorOficios`.
- La accion eliminar no realiza borrado fisico.
- `pnpm --filter @siatec/desktop typecheck` pasa.
- `cargo check` en `apps/desktop/src-tauri` pasa.
- `pnpm --filter @siatec/desktop build` pasa si el host no presenta bloqueo local de `.next`.

## Restricciones

- No usar borrado fisico de usuarios.
- No asumir FKs inexistentes; la metadata confirma ausencia de foreign keys formales en este subconjunto.
- Seguir Pages Router y reglas del repo.
- Reutilizar shell, tabla y piezas existentes antes de crear nuevas abstracciones.

## Riesgos y notas

- El AS-IS usa `MAX(Codigo)+1` para alta; eso debe tratarse como compatibilidad legacy y documentar el riesgo de concurrencia.
- `WIN_Edita_Usuarios` cubre mucho mas que el MVP; este slice debe priorizar lo necesario para cerrar control de usuarios sin replicar todas las tablas auxiliares no esenciales en una sola iteracion.
- La ruta correcta de metadata SQL en este repo es `docs/windev/db/inicio_login_usuarios/`, no `docs/windev/as-is/db/inicio_login_usuarios/`.

## Archivos probablemente involucrados

- `apps/desktop/frontend/pages/usuarios/index.tsx`
- `apps/desktop/frontend/components/DesktopUsersCatalog.tsx`
- `apps/desktop/frontend/components/DataTable.tsx`
- `apps/desktop/frontend/pages/usuarios/[codigo].tsx`
- `apps/desktop/frontend/components/*user*`
- `apps/desktop/frontend/services/users.service.ts`
- `apps/desktop/src-tauri/src/commands/users_commands.rs`
- `apps/desktop/src-tauri/src/services/users_service.rs`
- `apps/desktop/src-tauri/src/repositories/*users*`
- `apps/desktop/src-tauri/src/models/*users*`
- `.codex/agent-context.md`

## Resultado

- Se reemplazo el catalogo MVP por un catalogo operativo con accion `Nuevo usuario`, accion `Editar` y mensaje legacy de no borrado.
- Se implemento pagina de edicion en `desktop` para datos basicos, estado, area y el slice actual de permisos del dashboard.
- El backend Tauri ahora soporta:
  - lista de areas
  - creacion de usuario base con `MAX(Codigo)+1`
  - consulta de detalle
  - guardado de usuario
  - defaults para `LUCCA182`, `LUCCA333` y `LUCCA410`
  - validacion de `UsuHist`
  - cifrado legacy con `ENCRYPTBYPASSPHRASE`
  - auditoria `BitMovs`
- El guardado aplica `Agregar Usuario`, `Modificar Usuario`, `Modificar Contraseña` y `Desbloqueo del Usuario` segun el contexto operativo disponible.

## Validacion ejecutada

- `pnpm --filter @siatec/desktop typecheck` -- pasa
- `cargo check` en `apps/desktop/src-tauri` -- pasa
- `pnpm --filter @siatec/desktop build` -- no cerrable en este host por `spawn EPERM` de Next al iniciar `next build frontend`
