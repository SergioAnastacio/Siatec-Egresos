# Tarea: baseline-monorepo - Definir baseline tecnica compartida

Estado: DONE
Prioridad: P0
Owner: Codex
Scope: monorepo
Branch: chore/baseline-monorepo
Dependencias: ninguna
Actualizado: 2026-03-10

---

## Objetivo

Crear la configuracion tecnica comun del monorepo para TypeScript, formato,
lint y scripts compartidos.

---

## Allowed Paths

- `package.json`
- `turbo.json`
- `pnpm-workspace.yaml`
- `apps/`
- `packages/`
- `services/`
- `docs/adr/`
- `.editorconfig`
- `.npmrc`
- `tsconfig.base.json`
- `tsconfig.json`
- `tools/`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Definir configuracion raiz compartida.
2. Estandarizar scripts minimos por workspace.
3. Documentar la decision tecnica si cambia la gobernanza del repo.

---

## Criterios de Aceptacion

- [x] Existe baseline tecnica compartida en raiz
- [x] Los workspaces exponen scripts consistentes
- [x] La documentacion refleja la nueva baseline

---

## Riesgos o Bloqueos

- la baseline usa placeholders de scripts hasta que exista scaffolding real

---

## Handoff Notes

- siguiente paso recomendado: scaffold ejecutable de `apps/desktop`
