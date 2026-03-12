# Tarea: eg-010 - Cliente API compartido (web + desktop)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: packages
Branch: feat/eg-010-shared-api-client
Dependencias: eg-006
Actualizado: 2026-03-12

---

## Objetivo

Crear `packages/api-client` para consumir la API de egresos desde web y desktop con tipos compartidos.

## Allowed Paths

- packages/api-client/**
- modules/egresos/**
- apps/web/**
- apps/desktop/**
- services/api/**

## Pasos

1. Crear wrapper HTTP tipado con baseUrl por env.
2. Implementar funciones: `listEgresos()`, `createEgreso(req)`.
3. Integrar en pantallas `/egresos` (web y desktop).

## Criterios de Aceptación

- [ ] Web lista egresos desde API
- [ ] Desktop lista egresos desde API
- [ ] Crear egreso desde UI (form mínimo) y refrescar lista
- [ ] Tipos vienen de `modules/egresos` (sin duplicación)

## Riesgos o Bloqueos

- CORS en web (resolver con CORS dev en API o proxy dev).

## Handoff Notes

- N/A
