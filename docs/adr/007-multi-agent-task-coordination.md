# ADR 007 - Coordinacion de tareas multiagente

## Estado

Aprobado

## Contexto

El modelo anterior con un solo archivo `current-task.md` solo soporta un agente
activo. SIATEC necesita trabajo concurrente sin sobrescrituras ni ambiguedad de
ownership.

## Decision

La coordinacion de tareas se organiza con un archivo por tarea y cuatro estados:

- `.codex/tasks/queued/`
- `.codex/tasks/in-progress/`
- `.codex/tasks/done/`
- `.codex/tasks/blocked/`

Cada tarea debe declarar como minimo:

- id
- titulo
- estado
- prioridad
- owner
- scope
- branch
- dependencias
- archivos permitidos
- criterio de aceptacion

Reglas operativas:

- una tarea solo puede tener un owner activo
- mover un archivo a `in-progress/` equivale a tomar el lock operativo
- si una tarea toca el mismo scope que otra tarea activa, debe bloquearse o
  redefinirse antes de implementar
- todo handoff debe quedar escrito en la tarea o en un archivo de handoff

## Consecuencias

- el estado del trabajo deja de depender de memoria compartida
- los agentes pueden operar en paralelo con menor riesgo
- el repositorio gana trazabilidad de bloqueos y handoffs
