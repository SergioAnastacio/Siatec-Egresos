# Tarea: eg-003 - Scaffolding packages compartidos (config/ui/logger/contracts/api-client)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: packages
Branch: chore/eg-003-shared-packages
Dependencias: eg-001
Actualizado: 2026-03-12

---

## Objetivo

Crear paquetes base reutilizables para web/desktop/api (replicando disciplina de SIATEC):
- `packages/config` (tsconfig/eslint/base env helpers)
- `packages/logger`
- `packages/contracts` (DTOs/OpenAPI artifacts)
- `packages/ui` (UI primitives)
- `packages/api-client` (cliente HTTP tipado)

## Allowed Paths

- packages/**
- apps/web/**
- apps/desktop/**
- services/api/**

## Pasos

1. Crear estructura por paquete: `src/` + `package.json` + `tsconfig`.
2. Definir convención de imports: alias `@/*` dentro de cada app y exports claros en packages.
3. Asegurar que web/desktop puedan importar un componente base desde `packages/ui`.

## Criterios de Aceptación

- [ ] Cada paquete tiene `package.json`, `src/index.ts`
- [ ] `pnpm -r typecheck` (o turbo typecheck) no falla por paths
- [ ] `packages/ui` expone al menos `Button` placeholder

## Riesgos o Bloqueos

- Decisiones de lint/format aún por fijar (resolver con eg-012).

## Handoff Notes

- N/A
