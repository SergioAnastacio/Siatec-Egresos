# SIATEC -- Backlog de Tareas

Las tareas estan ordenadas por prioridad dentro de cada fase.
El backlog no es lock operativo. Las tareas activas viven en `.codex/tasks/`.

Para crear una nueva tarea, usar `.codex/templates/task.md`.

---

## Ya definido o completado

- [x] Formalizar estructura del monorepo
- [x] Definir ADRs base de arquitectura
- [x] Escribir reglas y prompts base del agente
- [x] Inicializar Git localmente
- [x] Reemplazar tarea unica por modelo concurrente
- [x] Agregar documentacion raiz de colaboracion
- [x] Definir baseline tecnica compartida
- [x] Configurar CI minima para GitHub y GitLab

---

## Fase 1 -- Fundacion operativa

- [ ] Configurar pipeline de TurboRepo para todas las apps
- [ ] Documentar schema de base de datos existente (`database/schema/`)
- [x] Scaffoldear `packages/config`
- [x] Scaffoldear `packages/database`
- [x] Scaffoldear `packages/ui`
- [x] Scaffoldear `packages/logger`
- [x] Scaffoldear `packages/observability`
- [x] Scaffoldear `packages/testing`

---

## Fase 2 -- Capacidades transversales

- [x] Scaffoldear `services/authentication/`
- [x] Scaffoldear `services/audit-log/`
- [x] Scaffoldear `services/notifications/`
- [x] Scaffoldear `services/report-engine/`
- [x] Definir contratos de `services/telemetry/`

---

## Fase 3 -- Canales

- [x] Configuracion ejecutable base de `apps/desktop` como app principal
- [x] Configuracion ejecutable base de `apps/web` como canal tambien soportado
- [ ] Definir estado real de `apps/api`
- [ ] Mantener `apps/mobile` fuera del alcance activo

---

## Fase 4 -- Autenticacion

- [ ] Servicio de autenticacion JWT (services/authentication/)
- [ ] Pagina de login -- desktop
- [ ] Pagina de login -- web
- [ ] Gestion de sesion (store Zustand)
- [ ] Middleware RBAC
- [ ] Log de auditoria para eventos de autenticacion

---

## Fase 5 -- Modulos ERP

- [ ] Modulo de usuarios (CRUD + RBAC)
- [ ] Modulo de solicitudes (CRUD)
- [ ] Modulo de reportes (solo lectura)
- [ ] Modulo de notificaciones

---

## Fase 6 -- Calidad

- [ ] Pruebas unitarias para todos los servicios
- [ ] Pruebas de integracion para todos los repositorios
- [ ] Pruebas E2E para flujos de usuario criticos
- [ ] Pruebas de rendimiento

---

## Icebox -- Futuro / Incierto

- App movil real (`apps/mobile`)
- Integracion con cola de mensajes
- Extraccion de microservicios para cargas pesadas
- Soporte multi-tenant
