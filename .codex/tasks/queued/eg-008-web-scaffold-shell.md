# Tarea: eg-008 - App Web scaffold + shell (Next.js Pages Router)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: web
Branch: feat/eg-008-web-scaffold-shell
Dependencias: eg-001, eg-003
Actualizado: 2026-03-12

---

## Objetivo

Scaffoldear `apps/web` (Next.js Pages Router) con:
- `src/`
- alias `@/*`
- convención de carpetas: `features/`, `shared/`, `services/`
- páginas: `/login` (placeholder), `/egresos` (placeholder)

## Allowed Paths

- apps/web/**
- packages/ui/**
- packages/config/**

## Pasos

1. Generar Next.js con TS + Tailwind + ESLint + src-dir + no app router.
2. Crear layout base y rutas.
3. Consumir al menos 1 componente de `packages/ui`.

## Criterios de Aceptación

- [ ] `pnpm --filter @siatec-egresos/web dev` levanta
- [ ] Navegación a `/egresos` funciona
- [ ] Estructura `features/shared/services` existe dentro de `src/`

## Riesgos o Bloqueos

- N/A

## Handoff Notes

- N/A
