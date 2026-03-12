# Tarea: eg-009 - App Desktop scaffold (Tauri 2 + Next.js Pages Router)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: desktop
Branch: feat/eg-009-desktop-scaffold-tauri
Dependencias: eg-001, eg-003
Actualizado: 2026-03-12

---

## Objetivo

Scaffoldear `apps/desktop` con Tauri 2 + Next.js (Pages Router) y estructura:
- `src/` (frontend)
- `src-tauri/` (backend)
- convención FE: `features/`, `shared/`, `services/`

## Allowed Paths

- apps/desktop/**
- packages/ui/**
- packages/config/**

## Pasos

1. Generar Next.js frontend base.
2. Inicializar Tauri 2 apuntando al frontend existente.
3. Crear pantallas placeholder: `/login`, `/egresos`.

## Criterios de Aceptación

- [ ] `pnpm --filter @siatec-egresos/desktop dev:tauri` arranca
- [ ] Pantalla `/egresos` renderiza sin errores
- [ ] Estructura `features/shared/services` existe dentro de `src/`

## Riesgos o Bloqueos

- Setup local de Rust/Tauri.

## Handoff Notes

- N/A
