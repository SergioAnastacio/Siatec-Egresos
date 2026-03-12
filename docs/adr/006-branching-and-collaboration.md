# ADR 006 - Branching y colaboracion del repositorio

## Estado

Aprobado

## Contexto

El repositorio debe soportar trabajo concurrente entre multiples desarrolladores
y agentes. La estructura por si sola no evita colisiones, cambios mezclados o
merges sin trazabilidad.

## Decision

Se adopta un flujo de colaboracion con estas reglas:

- `main` es la rama protegida objetivo
- todo cambio vive en una rama corta por tarea
- cada rama referencia una tarea unica dentro de `.codex/tasks/`
- no se permite mezclar multiples tareas no relacionadas en la misma rama
- todo cambio relevante pasa por PR

Prefijos recomendados de rama:

- `docs/`
- `chore/`
- `feat/`
- `fix/`
- `infra/`

## Consecuencias

- cada cambio queda trazable a una tarea
- se reduce el riesgo de colisiones entre agentes
- la revision puede enfocarse por area y alcance
