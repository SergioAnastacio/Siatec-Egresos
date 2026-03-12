# ADR 011 - Verificacion de runtime para canales ejecutables

## Estado

Aprobado

## Contexto

En etapas tempranas, `lint`, `typecheck` y `test` alcanzan para proteger la
estructura. Pero cuando `desktop` y `web` empiecen a tener flujos reales, eso no
garantiza que la aplicacion arranque ni que el canal afectado siga operativo.

## Decision

Cuando una tarea modifique un canal ejecutable o una integracion visible, el
cierre ideal de la tarea debe incluir, ademas de la validacion base:

- build del workspace afectado
- smoke run del canal afectado

Orden objetivo de validacion local:

1. estructura
2. lint
3. typecheck
4. test
5. build
6. smoke run

Aplicacion por canal:

- `apps/desktop`: validar frontend, backend Rust y arranque del shell Tauri cuando sea viable
- `apps/web`: validar build de NextJS y arranque local del sitio

Si el entorno no permite el smoke run, el bloqueo debe quedar documentado.

## Consecuencias

- las tareas futuras tendran una definicion de terminado mas realista
- Codex podra validar cambios de canal con mayor confianza
- la CI podra endurecerse progresivamente hacia smoke tests reales
