# Tarea: services-remaining - Scaffolding de notifications, report-engine y telemetry

Estado: DONE
Prioridad: P1
Owner: Codex
Scope: services
Branch: feat/services-remaining
Dependencias: baseline-monorepo
Actualizado: 2026-03-10

---

## Objetivo

Crear scaffolds funcionales de `services/notifications`, `services/report-engine`
y `services/telemetry` como capacidades transversales base del monorepo.

---

## Allowed Paths

- `services/notifications/`
- `services/report-engine/`
- `services/telemetry/`
- `services/README.md`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear contratos y adaptador inicial para notificaciones.
2. Crear contratos y helper base para reportes.
3. Crear contratos y helper base para telemetria.

---

## Criterios de Aceptacion

- [x] `services/notifications` expone contratos y adaptador util
- [x] `services/report-engine` expone contratos y helper util
- [x] `services/telemetry` expone contratos y helper util
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- no integrar todavia canales reales de correo, PDF ni exporters externos

---

## Handoff Notes

- validado con `pnpm --filter @siatec/notifications typecheck`
- validado con `pnpm --filter @siatec/notifications build`
- validado con `pnpm --filter @siatec/report-engine typecheck`
- validado con `pnpm --filter @siatec/report-engine build`
- validado con `pnpm --filter @siatec/telemetry typecheck`
- validado con `pnpm --filter @siatec/telemetry build`
