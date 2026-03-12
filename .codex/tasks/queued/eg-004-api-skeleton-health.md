# Tarea: eg-004 - API skeleton (Rust + Axum) + health/version

Estado: QUEUED
Prioridad: P0
Owner: por-asignar
Scope: api
Branch: feat/eg-004-api-skeleton
Dependencias: eg-001
Actualizado: 2026-03-12

---

## Objetivo

Levantar `services/api` funcional en Rust + Axum con:
- `GET /health`
- `GET /version` (opcional pero recomendado)
- logging estructurado con `tracing`
- configuración por env

## Allowed Paths

- services/api/**
- packages/contracts/**
- docs/**

## Pasos

1. Inicializar crate Rust en `services/api`.
2. Crear router base + middlewares (request-id + logging mínimo).
3. Exponer endpoints de sistema.

## Criterios de Aceptación

- [ ] `GET /health` responde 200 JSON
- [ ] `GET /version` responde versión/commit (si se implementa)
- [ ] Logs muestran request_id o trace_id
- [ ] Existe `.env.example` para `services/api`

## Riesgos o Bloqueos

- Instalación local de toolchain Rust en máquinas del equipo.

## Handoff Notes

- N/A
