# Tarea: eg-007 - Auth MVP (modo dev) para proteger endpoints

Estado: QUEUED
Prioridad: P1
Owner: por-asignar
Scope: auth
Branch: feat/eg-007-auth-mvp-dev-mode
Dependencias: eg-004
Actualizado: 2026-03-12

---

## Objetivo

Agregar autenticación mínima para Week 1 (token estático por env) para simular sesión y preparar RBAC.

## Allowed Paths

- services/api/**
- packages/api-client/**
- apps/web/**
- apps/desktop/**
- docs/**

## Pasos

1. Definir `DEV_TOKEN` (o similar) y middleware en API.
2. Proteger al menos `POST /api/v1/egresos`.
3. Integrar token en cliente compartido.

## Criterios de Aceptación

- [ ] API rechaza requests sin token (401) en rutas protegidas
- [ ] Web y Desktop pueden consumir endpoints protegidos en modo dev
- [ ] `.env.example` documenta el token

## Riesgos o Bloqueos

- Definición posterior de auth real (OIDC/JWT). Mantener el MVP aislado.

## Handoff Notes

- N/A
