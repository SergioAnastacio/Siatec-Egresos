# Tarea: packages-foundation - Scaffolding inicial de config y database

Estado: DONE
Prioridad: P1
Owner: Codex
Scope: packages
Branch: feat/packages-foundation
Dependencias: baseline-monorepo
Actualizado: 2026-03-10

---

## Objetivo

Crear el scaffold inicial de `packages/config` y `packages/database` para
centralizar configuracion y contratos de conexion a SQL Server sin introducir
logica de negocio.

---

## Allowed Paths

- `packages/config/`
- `packages/database/`
- `packages/README.md`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear estructura TypeScript real para `config`.
2. Crear estructura TypeScript real para `database`.
3. Documentar exports y consumidores esperados.

---

## Criterios de Aceptacion

- [x] `packages/config` expone utilidades tipadas de entorno
- [x] `packages/database` expone tipos y helpers de conexion
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- no se implemento cliente SQL real ni driver
- no se ejecuto compilacion real porque aun no se instalaron dependencias del scaffold

---

## Handoff Notes

- siguiente paso recomendado: scaffold de `packages/logger` y `packages/ui`
