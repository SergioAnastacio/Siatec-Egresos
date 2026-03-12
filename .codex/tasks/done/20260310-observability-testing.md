# Tarea: observability-testing - Scaffolding de observability y testing

Estado: DONE
Prioridad: P1
Owner: Codex
Scope: packages
Branch: feat/observability-testing
Dependencias: baseline-monorepo
Actualizado: 2026-03-10

---

## Objetivo

Crear scaffolds funcionales de `@siatec/observability` y `@siatec/testing`
para contratos tecnicos de telemetria y utilidades compartidas de prueba.

---

## Allowed Paths

- `packages/observability/`
- `packages/testing/`
- `packages/README.md`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear contratos base de observabilidad.
2. Crear utilidades base de testing sin acoplarlas a un runner concreto.
3. Documentar exports y alcance.

---

## Criterios de Aceptacion

- [x] `packages/observability` expone contratos y helpers reutilizables
- [x] `packages/testing` expone utilidades reutilizables de prueba
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- no integrar aun SDK real de OpenTelemetry ni framework de pruebas especifico

---

## Handoff Notes

- validado con `pnpm --filter @siatec/observability typecheck`
- validado con `pnpm --filter @siatec/observability build`
- validado con `pnpm --filter @siatec/testing typecheck`
- validado con `pnpm --filter @siatec/testing build`
