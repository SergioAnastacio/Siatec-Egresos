# Sistema de tareas de Codex

Este repositorio usa un modelo concurrente de tareas. Ya no se usa un unico
flujo operativo con `current-task.md` como fuente principal.

## Estados

- `queued/` tarea lista para ser tomada
- `in-progress/` tarea con owner activo
- `done/` tarea completada
- `blocked/` tarea detenida por dependencia, conflicto o restriccion

## Reglas

- un archivo representa una tarea
- un solo owner activo por tarea
- toda tarea debe declarar `scope` y `allowed_paths`
- si una tarea cambia de owner, deja handoff claro
- no trabajar sin mover la tarea a `in-progress/`

## Compatibilidad

`current-task.md` se conserva solo como puntero y para compatibilidad con
herramientas o prompts antiguos. No debe usarse como lock de trabajo.
