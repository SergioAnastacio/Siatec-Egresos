# Tarea: eg-005 - Contratos Egresos + OpenAPI inicial

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: contracts
Branch: feat/eg-005-contracts-openapi
Dependencias: eg-004
Actualizado: 2026-03-12

---

## Objetivo

Definir el contrato mínimo del dominio **Egresos** (DTOs) y publicar OpenAPI inicial desde `services/api`.

## Allowed Paths

- modules/egresos/**
- packages/contracts/**
- services/api/**
- docs/api/**

## Pasos

1. Crear `modules/egresos` con tipos mínimos:
   - `Egreso`, `CreateEgresoRequest`, `EgresoStatus`
2. Decidir OpenAPI: generado (recomendado) o manual.
3. Exponer OpenAPI desde API (ej. `/openapi.json`) y/o guardar artifact en `packages/contracts`.

## Criterios de Aceptación

- [ ] Existe `modules/egresos` con tipos mínimos (sin lógica de IO)
- [ ] OpenAPI accesible (endpoint o archivo)
- [ ] Endpoints planeados bajo `/api/v1/egresos` aparecen en la spec

## Riesgos o Bloqueos

- Definición de campos obligatorios; mantener MVP mínimo y versionar.

## Handoff Notes

- N/A
