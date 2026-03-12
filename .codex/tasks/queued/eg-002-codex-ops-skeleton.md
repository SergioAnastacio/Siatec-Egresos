# Tarea: eg-002 - Sistema operativo .codex (reglas + templates + tareas)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: ops
Branch: chore/eg-002-codex-ops-skeleton
Dependencias: eg-001
Actualizado: 2026-03-12

---

## Objetivo

Asegurar `.codex/` con el modelo concurrente de tareas (queued/in-progress/done/blocked) y reglas de operación para agentes.

## Allowed Paths

- .codex/**
- AGENTS.md

## Pasos

1. Verificar que existan carpetas `.codex/tasks/*`.
2. Ajustar `.codex/AGENTS.md` al proyecto Siatec-Egresos (stack y reglas).
3. Crear/actualizar `.codex/agent-context.md` (comandos reales: pnpm/turbo/tauri/rust).

## Criterios de Aceptación

- [ ] Existe `.codex/tasks/{queued,in-progress,done,blocked}`
- [ ] Existe `.codex/templates/task.md` (o plantilla equivalente)
- [ ] Existe `.codex/agent-context.md` con stack, scripts y flujo

## Riesgos o Bloqueos

- N/A

## Handoff Notes

- N/A
