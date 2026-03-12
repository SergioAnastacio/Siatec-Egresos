# Tarea: desktop-tauri-runtime - Habilitar arranque real de la app desktop con Tauri

Estado: DONE
Prioridad: P1
Owner: codex
Scope: desktop
Branch: feat/desktop-tauri-runtime
Dependencias: desktop-scaffold, workspace-runtime-validation
Actualizado: 2026-03-11

---

## Objetivo

Conectar `apps/desktop` al runtime real de Tauri para que el canal desktop pueda
abrirse como aplicacion de escritorio y no solo como servidor NextJS, manteniendo
la separacion entre frontend y backend y dejando scripts claros para desarrollo.

---

## Allowed Paths

- `apps/desktop/`
- `package.json`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Ajustar scripts y configuracion de Tauri para arrancar el canal desktop como app real.
2. Conectar el frontend desktop con el comando Tauri `health_check` mediante `services/`.
3. Validar `typecheck`, `build` y arranque real de la app desktop con Tauri.

---

## Criterios de Aceptacion

- [x] Existe un script claro para arrancar `apps/desktop` con Tauri
- [x] `tauri.conf.json` queda alineado con el flujo real de frontend desktop
- [x] El frontend desktop consume el backend Tauri mediante `invoke` en `services/`
- [x] La app desktop arranca como aplicacion Tauri y no solo como servidor web
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- el build productivo de Tauri requiere que el frontend desktop exponga artefactos estaticos compatibles
- la validacion visual de la ventana Tauri depende del runtime grafico del entorno Windows

---

## Handoff Notes

- `apps/desktop/package.json` ahora separa `dev:frontend`, `dev:tauri`, `build:frontend` y `build:tauri`.
- El alias raiz `pnpm dev:desktop` ahora arranca Tauri real; `pnpm dev:desktop:frontend` conserva el arranque aislado del frontend.
- `apps/desktop/src-tauri/tauri.conf.json` ahora usa `devUrl` en `http://localhost:3100`, `frontendDist` en `../frontend/out` y comandos `pnpm dev:frontend` / `pnpm build:frontend`.
- `apps/desktop/frontend/services/system.service.ts` ahora usa `@tauri-apps/api/core` con `invoke("health_check")` y fallback cuando no existe runtime Tauri.
- Se agrego `apps/desktop/src-tauri/icons/icon.ico` reutilizando el branding compartido para satisfacer el build de Windows de Tauri.
- Validaciones reales ejecutadas el 2026-03-11:
- `pnpm install`
- `pnpm --filter @siatec/desktop typecheck`
- `pnpm --filter @siatec/desktop build:frontend`
- `pnpm --filter @siatec/desktop build:tauri`
- `cargo check` en `apps/desktop/src-tauri`
- `pnpm dev:desktop`
- Se confirmo proceso `siatec-desktop` con ventana `SIATEC Desktop` y frontend activo en `http://localhost:3100/` y `/test` durante el arranque Tauri.
- El build completo genero `apps/desktop/src-tauri/target/release/siatec-desktop.exe`.
