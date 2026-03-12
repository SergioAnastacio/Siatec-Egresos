# Tarea: Completar gate de dispositivo y control de acceso legado con LUCCA466

## Objetivo

Cerrar el siguiente bloque del modulo de autenticacion `desktop` replicando la validacion legacy de equipo/dispositivo observada en WinDev, con base en `LUCCA466` y los flujos de registro/cambio de usuario.

## Alcance

- Implementar validacion de equipo/dispositivo para login desktop usando evidencia de `LUCCA466`.
- Resolver el flujo de instancia existente para:
  - equipo permitido
  - equipo bloqueado
  - equipo sin registro previo
- Persistir o sincronizar informacion minima necesaria en `LUCCA466` conforme al AS-IS documentado.
- Completar bitacora/registro complementario de acceso si la evidencia del flujo lo exige.
- Mantener el frontend sin SQL directo y el backend con comando Tauri delgado + servicio + repositorio.

## Evidencia principal

- `docs/windev/as-is/windows/WIN_WIN_RegistroUsuarioLUCCA.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_RegistroUsuarioLUCCA_BTN_Agregar_Click.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_RegistroUsuarioLUCCA_EDT_LOGIN_Exit.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_CambiaUsuarioLUCCA_BTN_Agregar_Click.json`
- `docs/windev/manifest.json`

## Criterios de aceptacion

- El login desktop valida el acceso del usuario considerando el estado del equipo/dispositivo segun la evidencia legacy disponible.
- Si el equipo esta bloqueado o no autorizado, el acceso se rechaza con mensaje consistente.
- Si el flujo legacy exige alta/sincronizacion de registro en `LUCCA466`, esta se ejecuta de forma segura y parametrizada.
- La implementacion no rompe el login ya operativo ni el catalogo de usuarios.
- `pnpm --filter @siatec/desktop typecheck` pasa.
- `cargo check` en `apps/desktop/src-tauri` pasa.
- `pnpm --filter @siatec/desktop build` pasa.

## Restricciones

- Respetar las reglas del repo en `.codex/AGENTS.md` y `.codex/rules/`.
- No asumir comportamiento no sustentado; cuando la evidencia no alcance, documentar explicitamente la inferencia.
- No mover logica SQL al frontend.

## Archivos probablemente involucrados

- `apps/desktop/src-tauri/src/commands/auth_commands.rs`
- `apps/desktop/src-tauri/src/services/auth_service.rs`
- `apps/desktop/src-tauri/src/repositories/auth_repository.rs`
- `apps/desktop/src-tauri/src/models/auth.rs`
- `apps/desktop/frontend/services/auth.service.ts`
- `.codex/agent-context.md`
