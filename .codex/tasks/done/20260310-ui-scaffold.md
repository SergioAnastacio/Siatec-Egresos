# Tarea: ui-scaffold - Crear scaffold funcional de UI compartida

Estado: DONE
Prioridad: P1
Owner: Codex
Scope: packages
Branch: feat/ui-scaffold
Dependencias: baseline-monorepo
Actualizado: 2026-03-10

---

## Objetivo

Crear el scaffold funcional de `@siatec/ui` con componentes reutilizables entre
desktop y web, y aplicarlos en ambos canales para evitar duplicacion.

---

## Allowed Paths

- `packages/ui/`
- `apps/desktop/`
- `apps/web/`
- `packages/README.md`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear componentes UI compartidos base.
2. Integrar esos componentes en desktop y web.
3. Documentar API publica y consumidores.

---

## Criterios de Aceptacion

- [x] `packages/ui` expone componentes reutilizables reales
- [x] desktop y web consumen al menos una pieza compartida
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- Next actualizo automaticamente los `tsconfig` locales de desktop y web con `isolatedModules`

---

## Handoff Notes

- validado con `pnpm --filter @siatec/ui typecheck`
- validado con `pnpm --filter @siatec/desktop typecheck`
- validado con `pnpm --filter @siatec/web typecheck`
- validado con `pnpm --filter @siatec/ui build`
- validado con `pnpm --filter @siatec/desktop build`
- validado con `pnpm --filter @siatec/web build`
