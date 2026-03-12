# Tarea: web-scaffold - Crear scaffold ejecutable de la app web

Estado: DONE
Prioridad: P1
Owner: codex
Scope: web
Branch: feat/web-scaffold
Dependencias: baseline-monorepo
Actualizado: 2026-03-11

---

## Objetivo

Crear el scaffold minimo ejecutable de `apps/web` para que el canal web avance
en paralelo sin competir con la prioridad principal de desktop.

---

## Allowed Paths

- `apps/web/`
- `package.json`
- `turbo.json`
- `docs/adr/`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear estructura ejecutable base de web.
2. Alinear la configuracion con Pages Router y el baseline comun.
3. Validar integracion con scripts raiz del monorepo.

---

## Criterios de Aceptacion

- [x] `apps/web` tiene scaffold real y consistente con `.codex/AGENTS.md`
- [x] Existen comandos utiles de build o typecheck para web
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- debe mantenerse alineado con desktop sin duplicar decisiones de arquitectura

---

## Handoff Notes

- Validado el 2026-03-11 que `apps/web` contiene scaffold Pages Router con separacion `pages/components/hooks/services` y reutilizacion desde `@siatec/ui`.
- Confirmado que existen scripts de `build` y `typecheck` en `apps/web/package.json` y exposicion del canal en `package.json` raiz.
- Se intento revalidacion ejecutable local con `pnpm --filter @siatec/web typecheck` y `pnpm --filter @siatec/web build`, pero el entorno tenia dependencias incompletas (`next` y `typescript` no resolvian en `apps/web/node_modules`).
- Se intento normalizar con `CI=true pnpm install`, pero `pnpm` fallo por `EPERM` al recrear `node_modules` en `packages/logger/node_modules/.bin/tsserver.ps1`.
