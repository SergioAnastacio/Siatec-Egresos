# Tarea: workspace-runtime-validation - Recuperar dependencias y validar arranque real de desktop y web

Estado: DONE
Prioridad: P1
Owner: codex
Scope: workspace
Branch: feat/workspace-runtime-validation
Dependencias: test-pages-desktop-web
Actualizado: 2026-03-11

---

## Objetivo

Recuperar la resolucion de dependencias del workspace para que `desktop` y `web`
puedan volver a compilar y arrancar localmente, y validar con ejecucion real que
ambos canales levantan correctamente sus rutas base y de prueba.

---

## Allowed Paths

- `package.json`
- `pnpm-lock.yaml`
- `apps/desktop/`
- `apps/web/`
- `packages/ui/`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Diagnosticar por que `next`, `typescript` y `@siatec/ui` no resuelven correctamente en `desktop` y `web`.
2. Reparar la instalacion del workspace o la configuracion minima necesaria dentro de los paths permitidos.
3. Validar `typecheck` y `build` de `desktop` y `web`.
4. Arrancar ambos canales y comprobar que responden en sus rutas base y `/test`.

---

## Criterios de Aceptacion

- [x] `pnpm --filter @siatec/desktop typecheck` y `build` completan correctamente
- [x] `pnpm --filter @siatec/web typecheck` y `build` completan correctamente
- [x] `desktop` arranca localmente y responde en `/` y `/test`
- [x] `web` arranca localmente y responde en `/` y `/test`
- [x] `.codex/agent-context.md` refleja el resultado y cualquier limitacion residual

---

## Riesgos o Bloqueos

- la recuperacion puede requerir reconstruir `node_modules` del workspace si la instalacion quedo inconsistente
- el runtime desktop puede depender de separar frontend NextJS y Tauri para una validacion local realista

---

## Handoff Notes

- Dentro del sandbox aparecian errores falsos por resolucion de `tsconfig.base.json` y `spawn EPERM`, pero la validacion real fuera del sandbox paso correctamente.
- Validaciones reales ejecutadas el 2026-03-11:
- `pnpm --filter @siatec/web typecheck`
- `pnpm --filter @siatec/web build`
- `pnpm --filter @siatec/desktop typecheck`
- `pnpm --filter @siatec/desktop build`
- Arranque real verificado con `pnpm --filter @siatec/web dev:test` en `http://localhost:3000` y `pnpm --filter @siatec/desktop dev:test` en `http://localhost:3100`.
- Se confirmo respuesta HTTP correcta en `/` y `/test` para ambos canales y luego se detuvieron los procesos temporales.
