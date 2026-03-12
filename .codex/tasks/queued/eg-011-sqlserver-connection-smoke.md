# Tarea: eg-011 - Smoke test conexión SQL Server (sin persistencia)

Estado: QUEUED
Prioridad: P1
Owner: por-asignar
Scope: database
Branch: chore/eg-011-sqlserver-connection-smoke
Dependencias: eg-004
Actualizado: 2026-03-12

---

## Objetivo

Validar conectividad a SQL Server desde `services/api` (solo smoke), manteniendo Week 1 sin ORM ni migraciones.

## Allowed Paths

- services/api/**
- packages/database/**
- docs/**
- .env.example (si aplica)

## Pasos

1. Definir variables en `.env.example` (host, user, password, db, encrypt, trustServerCertificate, etc.).
2. Implementar check best-effort (endpoint `GET /db/health` o comando interno).
3. Documentar requisitos locales.

## Criterios de Aceptación

- [ ] Existe configuración documentada para SQL Server
- [ ] Existe smoke check que falla con error claro si no conecta
- [ ] No se hace persistencia ni migraciones todavía

## Riesgos o Bloqueos

- Acceso de red/VPN/firewall a SQL Server.

## Handoff Notes

- N/A
