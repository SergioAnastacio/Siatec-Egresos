# Tarea: eg-012 - CI mínimo (Node 22 LTS) + PRs affected-only

Estado: QUEUED
Prioridad: P1
Owner: por-asignar
Scope: devops
Branch: chore/eg-012-ci-minimo
Dependencias: eg-001
Actualizado: 2026-03-12

---

## Objetivo

Configurar CI para monorepo pnpm+turbo:
- PR: ejecutar validate **affected-only**
- Push main/develop: validate full

## Allowed Paths

- .github/workflows/**
- package.json
- turbo.json
- tools/**
- docs/**

## Pasos

1. Agregar workflow CI.
2. Usar Node 22 LTS.
3. Cache de turbo/pnpm.

## Criterios de Aceptación

- [ ] PR ejecuta `pnpm validate -- --filter=...[origin/main]`
- [ ] Push ejecuta `pnpm validate`
- [ ] `pnpm install --frozen-lockfile` en CI

## Riesgos o Bloqueos

- Si la rama principal no es `main`, ajustar `origin/main`.

## Handoff Notes

- N/A
