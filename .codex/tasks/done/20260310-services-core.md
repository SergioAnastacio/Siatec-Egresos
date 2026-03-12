# Tarea: services-core - Scaffolding inicial de authentication y audit-log

Estado: DONE
Prioridad: P1
Owner: Codex
Scope: services
Branch: feat/services-core
Dependencias: baseline-monorepo
Actualizado: 2026-03-10

---

## Objetivo

Crear el scaffold inicial de `services/authentication` y `services/audit-log`
como capacidades transversales reales para bootstrap y desarrollo local.

---

## Allowed Paths

- `services/authentication/`
- `services/audit-log/`
- `services/README.md`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear contratos y adaptadores en memoria para autenticacion.
2. Crear contratos y adaptadores en memoria para auditoria.
3. Documentar API publica y limitaciones.

---

## Criterios de Aceptacion

- [x] `services/authentication` expone contratos y adaptador local util
- [x] `services/audit-log` expone contratos y adaptador local util
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- no implementar JWT real, persistencia ni repositorios todavia

---

## Handoff Notes

- validado con `pnpm --filter @siatec/authentication typecheck`
- validado con `pnpm --filter @siatec/authentication build`
- validado con `pnpm --filter @siatec/audit-log typecheck`
- validado con `pnpm --filter @siatec/audit-log build`
