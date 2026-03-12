# Tarea: eg-006 - Endpoints Egresos MVP (in-memory)

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: api
Branch: feat/eg-006-api-egresos-inmemory
Dependencias: eg-005
Actualizado: 2026-03-12

---

## Objetivo

Implementar vertical slice mínimo del dominio:
- `GET /api/v1/egresos`
- `POST /api/v1/egresos`
Con almacenamiento in-memory para desbloquear UI en Week 1.

## Allowed Paths

- services/api/**
- modules/egresos/**
- packages/contracts/**

## Pasos

1. Agregar rutas v1 para egresos.
2. Implementar store in-memory (Vec/HashMap) con IDs.
3. Validar payload y regresar errores consistentes.

## Criterios de Aceptación

- [ ] `POST /api/v1/egresos` devuelve 201 + objeto creado
- [ ] `GET /api/v1/egresos` devuelve lista incluyendo el creado
- [ ] Validación: campos requeridos -> 400 con payload claro
- [ ] La OpenAPI se actualiza con request/response reales

## Riesgos o Bloqueos

- N/A (in-memory es intencional para Week 1).

## Handoff Notes

- N/A
