# Tarea: usuarios-catalogo-dashboard-shell - Dashboard shell branded y catalogo de usuarios desktop

Estado: DONE
Prioridad: P1
Owner: codex
Scope: desktop
Branch: feat/usuarios-catalogo-dashboard-shell
Dependencias: auth-login-desktop-mvp
Actualizado: 2026-03-11

---

## Objetivo

Implementar el siguiente slice funcional del canal desktop:
un dashboard shell reutilizable con branding SIATEC, modo claro/oscuro persistente,
sidebar colapsable, navbar y footer; y sobre esa estructura montar un MVP del
catalogo de usuarios basado en la evidencia WinDev disponible.

---

## Evidencia Base

- `docs/windev/as-is/windows/WIN_WIN_Catalogo_Usuarios.json`
- `docs/windev/as-is/windows/CTRL_WIN_WIN_Edita_Usuarios_BTN_Aceptar1_Click.json`
- `docs/windev/db/inicio_login_usuarios/`
- `docs/architecture/branding.md`
- `packages/ui/assets/branding/`
- `packages/ui/tokens/brand.css`

---

## Allowed Paths

- `apps/desktop/frontend/`
- `apps/desktop/src-tauri/`
- `packages/ui/`
- `.codex/agent-context.md`

---

## Pasos

1. Crear shell dashboard reutilizable con sidebar colapsable, navbar, footer y persistencia de tema.
2. Alinear el shell a los tokens y assets oficiales del branding compartido.
3. Implementar comando Tauri y repositorio Rust para listar usuarios desde `Usuarios` + `Areax`.
4. Implementar la pagina `/usuarios` en desktop sobre el shell compartido.
5. Validar compilacion del frontend y backend.

---

## Criterios de Aceptacion

- [x] El dashboard desktop usa branding oficial y no estilos ad hoc fuera de tokens compartidos
- [x] Existe modo claro/oscuro persistente en desktop
- [x] El sidebar es colapsable
- [x] Existen navbar y footer integrados al shell
- [x] `/inicio` usa el shell nuevo
- [x] Existe una vista `/usuarios` con catalogo MVP
- [x] El frontend del catalogo no contiene SQL
- [x] Existe comando Tauri delgado para listar usuarios
- [x] La consulta del catalogo usa query parametrizada
- [x] `pnpm --filter @siatec/desktop typecheck` pasa
- [x] `pnpm --filter @siatec/desktop build` pasa
- [x] `cargo check` pasa

---

## Riesgos o Bloqueos

- la semantica exacta de la columna `Activo` en el catalogo legacy requiere cuidado porque la evidencia la asocia al checkbox legado
- los permisos completos de usuarios siguen fuera de alcance mientras no se cierre el mapeo de `LUCCA410`
- la paginacion/filtros avanzados del catalogo quedan fuera del MVP inicial

---

## Cierre

Se implemento un shell dashboard reutilizable para desktop con sidebar colapsable,
navbar, footer y modo claro/oscuro persistente via store local.

`/inicio` migro al shell nuevo y `/usuarios` quedo operativo con un catalogo MVP
alimentado por un comando Tauri delgado y una consulta backend sobre `Usuarios`
mas `Areax`, sin mezclar SQL en frontend.

Validacion ejecutada el 2026-03-11:

- `pnpm --filter @siatec/desktop typecheck`
- `pnpm --filter @siatec/desktop build`
- `cargo check`
