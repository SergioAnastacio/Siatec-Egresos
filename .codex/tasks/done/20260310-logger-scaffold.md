# Tarea: logger-scaffold - Crear scaffold funcional de logger compartido

Estado: DONE
Prioridad: P1
Owner: Codex
Scope: packages
Branch: feat/logger-scaffold
Dependencias: baseline-monorepo
Actualizado: 2026-03-10

---

## Objetivo

Crear el scaffold funcional de `@siatec/logger` para estandarizar logging
estructurado del lado TypeScript y documentar el punto de integracion futura con Rust.

---

## Allowed Paths

- `packages/logger/`
- `packages/README.md`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear estructura TypeScript real para logger.
2. Agregar sanitizacion minima de contexto sensible.
3. Documentar API publica y alcance.

---

## Criterios de Aceptacion

- [x] `packages/logger` expone API util de logging TypeScript
- [x] El logger evita propagar claves sensibles obvias en contexto
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- la parte Rust del logger queda documentada pero no implementada en esta tarea
- no se ejecuto compilacion real porque aun no se instalaron dependencias del scaffold

---

## Handoff Notes

- siguiente paso recomendado: scaffold de `packages/ui`
