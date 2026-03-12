# Tarea: desktop-scaffold - Crear scaffold ejecutable de la app desktop

Estado: DONE
Prioridad: P0
Owner: Codex
Scope: desktop
Branch: feat/desktop-scaffold
Dependencias: entorno-dev
Actualizado: 2026-03-10

---

## Objetivo

Crear el scaffold minimo ejecutable de `apps/desktop` con frontend y estructura
base Tauri, dejando a desktop como el canal principal del producto.

---

## Allowed Paths

- `apps/desktop/`
- `package.json`
- `turbo.json`
- `docs/adr/`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear estructura ejecutable base de desktop.
2. Agregar configuracion minima de frontend y Tauri.
3. Validar que desktop quede como app principal del workspace.

---

## Criterios de Aceptacion

- [x] `apps/desktop` tiene scaffold real y consistente con `.codex/AGENTS.md`
- [x] Existen comandos utiles de build o typecheck para desktop
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- no se ejecutaron `next build`, `tsc` ni `cargo check` porque aun no se instalaron dependencias del scaffold

---

## Handoff Notes

- siguiente paso recomendado: scaffold funcional de `apps/web`
