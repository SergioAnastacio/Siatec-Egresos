# Tarea: auth-login-desktop-mvp - Implementar slice inicial de autenticacion y login desktop

Estado: DONE
Prioridad: P1
Owner: codex
Scope: auth
Branch: feat/auth-login-desktop-mvp
Dependencias: desktop-tauri-runtime
Actualizado: 2026-03-11

---

## Objetivo

Implementar el primer slice funcional de autenticacion para el canal desktop:
vista de login, comando Tauri, servicio Rust y acceso a SQL Server para validar
credenciales legacy de `Usuarios`, cargar estado basico del usuario y abrir la
sesion sin mezclar logica de negocio en el frontend.

---

## Evidencia Base

- `docs/windev/as-is/windows/WIN_WIN_CambiaUsuarioLUCCA.json`
- `docs/windev/as-is/windows/WIN_WIN_Catalogo_Usuarios.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Edita_Usuarios_BTN_Aceptar1_Click.json`
- `docs/windev/db/inicio_login_usuarios/`
- `docs/windev/manifest.json`

`docs/windev/architecture_summary.md` solo se usa como contexto auxiliar; las
reglas obligatorias del repositorio en `.codex/AGENTS.md` y `.codex/rules/`
prevalecen sobre ese documento.

---

## Allowed Paths

- `apps/desktop/frontend/`
- `apps/desktop/src-tauri/`
- `packages/auth-client/`
- `services/authentication/`
- `packages/config/`
- `packages/database/`
- `.env.example`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Definir el flujo MVP de autenticacion desktop usando solo evidencia confirmada del legado.
2. Implementar la vista de login en desktop con Pages Router y estado de `loading/error/data`.
3. Implementar comando Tauri delgado y servicio Rust para autenticacion.
4. Implementar repositorio SQL Server parametrizado para consultar `Usuarios`, `DatosGrales`, `LUCCA182`, `LUCCA333` y tablas estrictamente necesarias del slice.
5. Resolver compatibilidad legacy de contrasena usando la evidencia actual y dejar TODOs donde falte soporte para migracion Argon2.
6. Validar typecheck, build y arranque real del canal desktop con login visible.

---

## Criterios de Aceptacion

- [x] Existe una vista de login en `desktop` alineada con las reglas del repositorio
- [x] El frontend no contiene SQL ni logica de negocio de autenticacion
- [x] Existe un comando Tauri delgado para login
- [x] La autenticacion consulta SQL Server con queries parametrizadas
- [x] El slice valida al menos login, contrasena legacy, bloqueo y estado basico del usuario con evidencia documentada
- [x] Los datos sensibles no se guardan en `localStorage`
- [x] Cualquier regla faltante queda marcada con TODO y evidencia faltante documentada
- [x] `pnpm --filter @siatec/desktop typecheck` pasa
- [x] `pnpm --filter @siatec/desktop build:tauri` pasa
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- la conexion real a SQL Server requiere variables `SIATEC_SQLSERVER_*` disponibles en el entorno del runtime
- la validacion exacta de bloqueo por login inexistente y autocreacion de `ADMIN` sigue pendiente porque no se implemento sin evidencia operacional adicional
- la transicion de `DECRYPTBYPASSPHRASE` a `argon2id` queda como compatibilidad backend inicial con TODO posterior
- el mapeo completo de permisos/menu sigue pendiente; en este slice solo se resuelve presencia de `LUCCA410`
- se requirio reparar el entorno Windows local para desktop: instalar workload C++/Windows SDK de Visual Studio y ejecutar Tauri dentro de `VsDevCmd.bat`

---

## Handoff Notes

- alcance seguro del MVP: login desktop, sesion en memoria, validacion de usuario y carga basica de contexto
- no implementar aun catalogo/edicion de usuarios ni autorizacion completa de menu salvo lo estrictamente necesario para abrir la sesion
- si falta evidencia para una regla de negocio, bloquear o dejar TODO documentado; no inferir comportamiento legacy
- implementado: `/` como login, `/inicio` como shell autenticado, comandos `auth_login/auth_current_session/auth_logout`, repositorio SQL Server con `tiberius`, auditoria `BitMovs`, bloqueo por inactividad y por password fallido para usuario conocido
- implementado: wrapper `apps/desktop/scripts/run-tauri.cmd` para ejecutar `dev:tauri` y `build:tauri` dentro de `VsDevCmd.bat`, evitando dependencias de una shell manualmente preparada
- validado: `pnpm install`, `pnpm --filter @siatec/desktop typecheck`, `pnpm --filter @siatec/desktop build`, `cargo check`, `pnpm --filter @siatec/desktop build:tauri`
