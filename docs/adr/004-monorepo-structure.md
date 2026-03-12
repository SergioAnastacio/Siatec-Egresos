# ADR 004 - Estructura oficial del monorepo

## Estado

Aprobado

## Contexto

El repositorio necesita una estructura explicita para que desarrolladores y
agentes automaticos puedan ubicar codigo, documentacion y responsabilidades sin
ambiguedad.

La documentacion existente ya apunta a un monorepo con `apps`, `modules`,
`packages`, `services`, `database`, `docs` e `infrastructure`, pero esa
estructura debe quedar formalizada como decision de arquitectura.

El repositorio tambien necesita una ubicacion explicita para pruebas
transversales, herramientas de desarrollo y componentes de observabilidad.

Ademas, el proyecto debe permitir trabajo autonomo del agente sin ambiguedad
sobre donde vive cada responsabilidad.

## Decision

La estructura oficial del repositorio sera:

```text
apps/
  desktop/
  web/
  api/
  mobile/        # reservado para futuro

modules/
  <modulo-erp>/
    backend/
      commands/
      services/
      repositories/
      models/
    frontend/
      components/
      pages/
      hooks/
      services/
    types/
    README.md

packages/
  ui/
  config/
  logger/
  database/
  auth-client/
  observability/
  testing/

services/
  authentication/
  audit-log/
  notifications/
  report-engine/
  telemetry/

database/
  schema/
  migrations/
  procedures/
  views/
  functions/
  scripts/
  seeds/

docs/
  adr/
  api/
  architecture/
  modules/

infrastructure/
  ci/
  docker/
  kubernetes/
  monitoring/
    grafana/
    loki/

tests/
  e2e/

tools/
```

## Responsabilidad por carpeta

### apps/

Las carpetas en `apps/` son puntos de entrada y composicion.

Aqui viven:

- bootstrap de aplicaciones
- routing
- integracion de modulos
- configuracion de runtime por canal
- pantallas y componentes especificos del canal

Aqui no debe vivir:

- logica de negocio transversal
- acceso a datos reutilizable
- reglas de dominio que pertenezcan a un modulo ERP

### modules/

Las carpetas en `modules/` representan dominios funcionales del ERP.

Cada modulo debe encapsular:

- logica de negocio propia
- acceso a datos propio
- UI especifica del modulo
- tipos compartidos del modulo
- documentacion de alcance y reglas del modulo

Un modulo no puede importar otro modulo directamente.

### packages/

Las carpetas en `packages/` contienen reutilizacion tecnica compartida.

Ejemplos:

- componentes UI compartidos
- configuracion tipada
- logging
- acceso tecnico a base de datos
- autenticacion cliente
- observabilidad comun
- utilidades de testing

`packages/` no debe contener logica de negocio del ERP.

### services/

Las carpetas en `services/` contienen capacidades transversales reales que
pueden ser usadas por multiples apps o modulos.

Ejemplos:

- autenticacion
- auditoria
- notificaciones
- reportes
- telemetria centralizada

Si una capacidad pertenece solo a un modulo, no debe vivir en `services/`.

### database/

`database/` concentra la verdad tecnica del SQL Server existente.

Aqui viven:

- documentacion de tablas
- migraciones controladas
- stored procedures
- views
- functions
- scripts auxiliares
- seeds si son necesarios para entornos controlados

Ninguna consulta debe implementarse sin revisar primero `database/schema/`.

### docs/

`docs/` centraliza documentacion tecnica y funcional del repositorio.

Aqui viven:

- ADRs
- OpenAPI
- plantillas y artefactos de arquitectura
- documentacion por modulo

### infrastructure/

`infrastructure/` agrupa preocupaciones operativas y de despliegue.

Aqui viven:

- CI
- contenedores
- manifiestos de orquestacion
- observabilidad operativa
- infraestructura como codigo

### tests/

`tests/` en raiz existe solo para pruebas transversales del monorepo.

Aqui viven:

- pruebas end-to-end
- pruebas de contratos
- smoke tests
- fixtures compartidos

Las pruebas unitarias e integraciones locales deben vivir cerca del codigo que
validan, dentro de cada app, modulo, package o service.

### tools/

`tools/` contiene scripts y utilidades de soporte para desarrollo, automatizacion
o mantenimiento del repositorio.

## Reglas de dependencia

- `apps/` puede depender de `modules/`, `packages/` y `services/`
- `modules/` puede depender de `packages/` y de contratos aprobados en `services/`
- `services/` puede depender de `packages/`
- `packages/` no puede depender de `apps/` ni de `modules/`

## Reglas complementarias

- `database/` no es una libreria importable; es una fuente de verdad documental y operativa
- `docs/` no debe usarse para almacenar implementacion
- `infrastructure/` no debe contener logica de negocio
- `tests/` no sustituye pruebas cercanas al codigo
- `mobile/` queda reservado y no debe poblarse hasta un ADR o tarea especifica

## Estrategia de testing

El repositorio adopta una estrategia hibrida:

- tests unitarios cerca del codigo
- tests de integracion cerca del bounded context tecnico correspondiente
- tests transversales en `tests/`

Distribucion recomendada:

- `apps/*` para pruebas del canal y composicion
- `modules/*` para pruebas del dominio y repositorios del modulo
- `packages/*` para utilidades compartidas
- `services/*` para capacidades transversales
- `tests/e2e` para flujos criticos completos
- `tests/contracts` para contratos entre clientes y API o servicios
- `tests/smoke` para verificacion minima del sistema

## Estrategia de observabilidad

La observabilidad se divide en tres capas:

- `packages/logger/` para logging estructurado
- `packages/observability/` para contratos, wrappers y convenciones comunes
- `infrastructure/monitoring/` para despliegue y configuracion operativa

La carpeta `services/telemetry/` es opcional y se usa solo cuando exista una
capacidad transversal que requiera politicas, configuracion o integracion
centralizada de telemetria.

La integracion objetivo debe permitir usar herramientas como:

- OpenTelemetry para instrumentacion
- OTEL Collector para recoleccion y exportacion
- Grafana para visualizacion
- Prometheus para metricas
- Loki para logs
- Tempo para trazas

## Principios de ubicacion

Cuando se agregue codigo nuevo, la decision de ubicacion debe seguir este orden:

1. Si es especifico de una app, va en `apps/`
2. Si es logica de dominio de un area funcional, va en `modules/`
3. Si es reutilizacion tecnica sin dominio, va en `packages/`
4. Si es capacidad transversal real, va en `services/`
5. Si describe o modifica SQL Server, va en `database/`
6. Si documenta decisiones, contratos o arquitectura, va en `docs/`
7. Si despliega u opera la plataforma, va en `infrastructure/`
8. Si automatiza tareas de soporte, va en `tools/`

## Consecuencias

- Las aplicaciones quedan como puntos de entrada y composicion.
- Los modulos concentran logica de negocio por dominio.
- Los paquetes alojan reutilizacion tecnica sin mezclar dominio.
- Los servicios agrupan capacidades transversales reales.
- La estructura facilita automatizacion, mantenimiento y gobierno arquitectonico.
- La ubicacion de pruebas y telemetria queda definida desde la base.
- El agente puede tomar decisiones de ubicacion con menos ambiguedad.

## Notas

El contenido concreto de cada modulo o servicio se definira en tareas y ADRs
posteriores. Este ADR fija la taxonomia, limites y reglas operativas del
repositorio.
