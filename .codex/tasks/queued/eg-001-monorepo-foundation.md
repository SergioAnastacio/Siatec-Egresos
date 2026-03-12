# Tarea: eg-001 - Fundación monorepo Siatec-Egresos (pnpm + turbo)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: foundation
Branch: chore/eg-001-monorepo-foundation
Dependencias: ninguna
Actualizado: 2026-03-12

---

## Objetivo

Inicializar la base del monorepo para Siatec-Egresos con pnpm workspaces y TurboRepo, replicando el estilo operativo del repo de referencia.

## Allowed Paths

- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml
- turbo.json
- tsconfig.base.json
- tsconfig.json
- .editorconfig
- .npmrc
- .gitignore
- README.md
- CONTRIBUTING.md

## Pasos

1. Asegurar scripts raíz: dev/build/lint/typecheck/test/validate.
2. Validar `pnpm install` con `--frozen-lockfile` en CI.
3. Dejar README con estructura y comandos.

## Criterios de Aceptación

- [ ] Node 22 LTS y pnpm (via corepack) documentados en README
- [ ] `pnpm install` funciona sin errores
- [ ] Scripts raíz existen: `dev`, `build`, `lint`, `typecheck`, `test`, `validate`
- [ ] `pnpm validate:structure` existe y falla si falta estructura

## Riesgos o Bloqueos

- Versiones Node/pnpm inconsistentes en máquinas del equipo.

## Handoff Notes

- N/A
