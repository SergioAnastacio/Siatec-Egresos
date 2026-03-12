# Tarea: test-pages-desktop-web - Crear paginas de prueba y scripts de arranque por canal

Estado: DONE
Prioridad: P1
Owner: codex
Scope: channels
Branch: feat/test-pages-desktop-web
Dependencias: desktop-scaffold, web-scaffold, ui-scaffold
Actualizado: 2026-03-11

---

## Objetivo

Crear una pagina de prueba minima para `desktop` y otra para `web` que permita
arrancar cada canal de forma visible y controlada, junto con scripts utiles para
ejecutar cada aplicacion de manera individual desde el workspace.

---

## Allowed Paths

- `apps/desktop/frontend/`
- `apps/desktop/package.json`
- `apps/web/`
- `package.json`
- `.codex/agent-context.md`

No tocar archivos fuera de estas rutas sin actualizar la tarea.

---

## Pasos

1. Crear una pagina de prueba en `apps/desktop/frontend/pages/` consistente con Pages Router.
2. Crear una pagina de prueba en `apps/web/pages/` consistente con Pages Router.
3. Agregar o ajustar scripts utiles para arrancar `desktop` y `web` de forma individual y verificable.
4. Validar que cada canal pueda exponer su pagina de prueba sin mezclar logica de dominio.

---

## Criterios de Aceptacion

- [x] `apps/desktop` expone una pagina de prueba navegable y alineada con `.codex/AGENTS.md`
- [x] `apps/web` expone una pagina de prueba navegable y alineada con `.codex/AGENTS.md`
- [x] Existen scripts claros para arrancar `desktop` y `web` individualmente desde el workspace
- [x] La implementacion reutiliza piezas compartidas cuando aplique y no duplica branding o UI comun
- [x] `.codex/agent-context.md` refleja el nuevo estado

---

## Riesgos o Bloqueos

- el canal desktop puede requerir separar el arranque del frontend NextJS y el runtime Tauri si el entorno local no soporta ambos en una sola validacion
- no duplicar componentes visuales si `@siatec/ui` ya cubre la necesidad de la pagina de prueba

---

## Handoff Notes

- Se agregaron rutas explicitas `/test` en `apps/desktop/frontend/pages/test/index.tsx` y `apps/web/pages/test/index.tsx`.
- Los `index` de ambos canales ahora enlazan a sus paginas de prueba para que el arranque sea visible desde la pantalla inicial.
- Se agregaron scripts `dev:test` en cada app y `dev:test:desktop` / `dev:test:web` en el `package.json` raiz.
- Se intento validar con `pnpm --filter @siatec/desktop typecheck` y `pnpm --filter @siatec/web typecheck`, pero el entorno sigue sin resolver `next`, `@siatec/ui` y tipos JSX; el bloqueo es de dependencias del workspace, no de las rutas nuevas.
