# SIATEC -- Manual de Operaciones del Agente

Proyecto: SIATEC (Sistema de Administracion Tributaria Estatal y Coordinada)
Tipo: Plataforma ERP Gubernamental
Agente Principal: Codex

---

## 1. Proposito de Este Archivo

Este archivo es el punto de entrada unico para cualquier agente de IA que
trabaje en SIATEC.

Lee este archivo primero. Siempre. Sin excepciones.

Despues de leer este archivo, sigue el flujo de trabajo de la seccion 6 para
ubicar el contexto, la tarea activa y las reglas correctas para tu cambio.

---

## 2. Que Es SIATEC

SIATEC es una plataforma ERP gubernamental que se esta migrando desde un
sistema legado.

La base de datos SQL Server existente no debe modificarse sin un archivo de
migracion en `database/migrations/`.

El objetivo es modernizar el sistema usando Rust, Tauri, NextJS y SQL Server
mientras se preservan reglas de negocio existentes y seguridad de nivel
gubernamental.

No inventes reglas de negocio. Si una regla no esta clara, deja un TODO y
documenta el bloqueo en `.codex/tasks/blocked/`.

---

## 3. Stack Tecnologico

| Capa            | Tecnologia                              |
|-----------------|-----------------------------------------|
| Desktop         | Tauri 2.x + NextJS 15+                  |
| Web             | NextJS 15+                              |
| Movil           | Futuro -- no implementar ahora          |
| Backend         | Rust (stable)                           |
| Frontend        | React 19+ + TypeScript + TailwindCSS 4+ |
| Base de Datos   | SQL Server 2019+                        |
| Estado (FE)     | Zustand                                 |
| Estado (BE)     | Tauri managed state                     |
| Monorepo        | TurboRepo 2.x + pnpm 10+                |
| Docs API        | OpenAPI 3 / Swagger                     |
| Gestor Paquetes | pnpm (workspaces)                       |

### Convencion de Enrutamiento

- Usar NextJS Pages Router en todas las aplicaciones.
- No usar App Router (`app/`).
- Las paginas van en `pages/`.
- Los layouts globales van en `pages/_app.tsx`.
- Las paginas de error van en `pages/_error.tsx` y `pages/404.tsx`.

---

## 4. Reglas No Negociables

Estas reglas aplican a cada archivo que crees o modifiques.
Los detalles completos con ejemplos de codigo estan en `.codex/rules/`.

### Arquitectura

- Capas de Arquitectura Limpia: Presentacion -> Aplicacion -> Dominio -> Infraestructura
- Los modulos nunca deben importar directamente de otros modulos
- Toda la logica compartida va en `packages/` o `services/`
- Cada nuevo modulo debe seguir la estructura de la seccion 7
- Antes de crear una carpeta nueva, confirma si ya esta contemplada por `docs/adr/004-monorepo-structure.md`
- No generar codigo espagueti: separar presentacion, estado, efectos, acceso a datos y reglas de negocio
- Si una pieza sera usada por 2 o mas pantallas, modulos o apps, extraela a un componente, hook o utilidad reutilizable
- Antes de crear un componente, hook o servicio nuevo, buscar primero si ya existe uno equivalente en `apps/`, `modules/`, `packages/ui/` o `services/`
- Si existe una pieza reutilizable adecuada, usarla en lugar de duplicarla
- Si no existe y el patron ya se repite o es claramente compartible, crear la abstraccion antes de copiar codigo

### Rust

- Nunca usar `unwrap()` o `expect()` en produccion
- La logica de negocio vive en `services/`, nunca en `commands/`
- Los comandos son puntos de entrada delgados
- Usar traits para abstracciones que requieran pruebas
- Usar logging estructurado con `tracing`, nunca `println!`

### TypeScript / React

- Solo componentes funcionales
- Hooks solo para estado y efectos secundarios
- TailwindCSS para estilos
- Los componentes deben tener una sola responsabilidad
- Nunca usar `any` sin justificacion fuerte
- Los componentes contenedores no deben mezclar UI compleja, fetch, transformaciones y reglas de negocio en un solo archivo
- Extraer subcomponentes, hooks o servicios antes de que un archivo se vuelva dificil de leer o reutilizar

### Base de Datos

- Solo consultas parametrizadas
- Todos los cambios de schema requieren migracion
- Las consultas complejas usan `database/procedures/`
- Toda la logica de base de datos se queda dentro de `repositories/`
- Solo eliminacion logica para entidades

### Seguridad

- Todas las entradas validadas en frontend y backend
- JWT en memoria, nunca en `localStorage`
- RBAC en la capa de servicio
- Toda operacion sensible debe escribir en auditoria
- Nunca loguear contrasenas, tokens, RFCs o datos financieros

### API

- Endpoints versionados: `/api/v1/...`
- Cada endpoint debe estar documentado en `docs/api/openapi.yaml`
- Desktop usa comandos Tauri; REST es para web y movil

---

## 5. Estructura del Repositorio

```text
apps/
  desktop/
  web/
  mobile/
  api/

modules/

packages/
  ui/
  database/
  logger/
  config/
  auth-client/
  observability/
  testing/

services/
  authentication/
  notifications/
  report-engine/
  audit-log/
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
  api/
  architecture/
  modules/
  adr/

infrastructure/
  ci/
  docker/
  kubernetes/
  monitoring/

tests/
  e2e/
  contracts/
  smoke/
  fixtures/

tools/
```

---

## 6. Flujo de Trabajo del Agente -- Seguir Esto Siempre

```text
Paso 1  -- Leer .codex/AGENTS.md
Paso 2  -- Leer .codex/agent-context.md
Paso 3  -- Revisar .codex/tasks/README.md
Paso 4  -- Tomar una tarea de .codex/tasks/queued/ y moverla a in-progress/
Paso 5  -- Leer reglas relevantes (ver seccion 6a)
Paso 6  -- Revisar database/schema/ para las tablas involucradas
Paso 7  -- Revisar packages/ README para codigo compartido disponible
Paso 8  -- Planificar los cambios antes de escribir codigo
Paso 9  -- Implementar cambios minimos y enfocados
Paso 10 -- Verificar cada criterio de aceptacion de la tarea
Paso 11 -- Si la tarea toca un canal ejecutable, correr build y smoke run del canal cuando el entorno lo permita
Paso 12 -- Actualizar .codex/agent-context.md
Paso 13 -- Mover la tarea a done/ o blocked/
```

### Reglas operativas de tareas

- `queued/` contiene tareas listas para ser tomadas
- `in-progress/` contiene tareas con owner activo
- `done/` contiene tareas completadas
- `blocked/` contiene tareas detenidas por dependencias o conflictos

Toda tarea debe declarar:

- `Owner`
- `Scope`
- `Branch`
- `Allowed Paths`
- `Criterios de Aceptacion`

### Regla de ejecucion real

Cuando una tarea modifica una app o flujo ejecutable, el agente debe intentar
verificarla en este orden cuando el entorno y las dependencias ya esten listas:

1. estructura
2. lint
3. typecheck
4. test
5. build
6. smoke run del canal afectado

Ejemplos:

- cambios en `apps/desktop/`: build del frontend, chequeo del backend Rust y arranque de smoke del canal desktop
- cambios en `apps/web/`: build de NextJS y smoke run del canal web

Si no puede ejecutar un paso real por falta de dependencias, tooling o servicios
externos, debe documentarlo explicitamente en la tarea y en el cierre.

### Regla de instalacion de dependencias

El agente puede instalar dependencias del repositorio cuando sean necesarias
para:

- validar typecheck, test o build reales
- levantar el canal afectado por la tarea
- habilitar tooling requerido por el stack ya aprobado del proyecto

No debe instalar paquetes por conveniencia o exploracion sin una necesidad
directa de la tarea actual.

### Compatibilidad con `current-task.md`

`current-task.md` no es la fuente principal del trabajo. Se conserva solo por
compatibilidad y como puntero para tooling antiguo.

### Manejo de bloqueos

Si estas bloqueado:

1. actualiza la tarea con el motivo
2. mueve el archivo a `.codex/tasks/blocked/`
3. sigue el formato de errores de `.codex/rules/errors.md`

No improvises una solucion fuera del alcance de la tarea.

### Regla anti-inferencia ante errores o bloqueos

Si aparece un error, una incompatibilidad, un faltante o una condicion no
prevista por la tarea:

- no inferir una solucion de arquitectura, negocio o datos por cuenta propia
- no "arreglar de paso" algo no pedido para destrabar la tarea
- no continuar como si el problema fuera menor sin dejar evidencia

El agente solo puede continuar sin bloquearse si el siguiente paso es una
correccion mecanica y obvia que cumple todas estas condiciones:

- esta dentro de `Allowed Paths`
- no cambia el alcance funcional de la tarea
- no introduce una decision nueva de arquitectura
- no depende de adivinar reglas de negocio, tablas, columnas o contratos

Si cualquiera de esas condiciones no se cumple, la tarea debe bloquearse y
reportarse.

---

## 6a. Referencia de Reglas

| La tarea involucra...                     | Lee este archivo              |
|-------------------------------------------|-------------------------------|
| Cualquier codigo Rust                     | `.codex/rules/rust.md`        |
| Cualquier frontend o codigo React         | `.codex/rules/frontend.md`    |
| Cualquier query o schema de base de datos | `.codex/rules/database.md`    |
| Cualquier endpoint REST u OpenAPI         | `.codex/rules/api.md`         |
| Cualquier auth, tokens o datos sensibles  | `.codex/rules/security.md`    |
| Cualquier manejo de errores               | `.codex/rules/errors.md`      |
| Cuando este bloqueado                     | `.codex/rules/errors.md`      |

En caso de duda, lee todos. Son cortos.

---

## 7. Estructura de Modulo ERP

Cada modulo ERP debe seguir exactamente esta estructura:

```text
modules/<nombre-modulo>/
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
```

Los modulos nunca deben importar de otros modulos.
Si un tipo o utilidad es necesario por multiples modulos, va en `packages/`.
Las pruebas unitarias e integraciones del modulo deben vivir cerca del codigo.
Las pruebas transversales viven en `tests/`.

---

## 8. Estructura de la App Desktop

```text
apps/desktop/
  frontend/
    pages/
    components/
    hooks/
    services/
    store/
  src-tauri/
    src/
      commands/
      services/
      state/
      main.rs
    Cargo.toml
    tauri.conf.json
    build.rs
```

La app desktop puede consumir `packages/` y `services/`, pero no debe absorber
logica de dominio que pertenezca a un modulo ERP.

---

## 8a. Testing y Observabilidad

### Testing

- `tests/` en raiz es solo para pruebas transversales
- Las pruebas unitarias deben vivir cerca del codigo que validan
- Las pruebas de integracion locales deben vivir dentro del app, module, package o service correspondiente
- `tests/e2e/` es para flujos criticos completos
- `tests/contracts/` es para contratos entre clientes y APIs o servicios
- `tests/smoke/` es para verificacion minima del sistema
- `tests/fixtures/` es para datos y recursos compartidos de prueba

### Observabilidad

- `packages/logger/` contiene logging estructurado
- `packages/observability/` contiene contratos y wrappers de instrumentacion
- `services/telemetry/` es opcional
- `infrastructure/monitoring/` contiene la configuracion operativa

La instrumentacion debe permitir integracion con OpenTelemetry.

---

## 9. Requisitos de Documentacion

| Tipo                       | Ubicacion                            |
|----------------------------|--------------------------------------|
| Endpoints REST API         | `docs/api/openapi.yaml`              |
| Documentacion de modulo    | `docs/modules/<nombre-modulo>.md`    |
| Decisiones de arquitectura | `docs/adr/NNN-nombre-decision.md`    |
| Estado del proyecto        | `.codex/agent-context.md`            |
| Tablas de base de datos    | `database/schema/<nombre-tabla>.sql` |

Al completar una tarea, actualiza `agent-context.md` con:

- lo que se implemento
- cualquier decision tomada que no este ya en `docs/adr/`
- cualquier problema conocido o TODO pendiente

---

## 10. Lo Que Nunca Debes Hacer

- Nunca usar `unwrap()` o `expect()` en Rust de produccion
- Nunca concatenar strings SQL
- Nunca modificar schema sin migracion
- Nunca implementar logica de negocio dentro de comandos Tauri
- Nunca importar un modulo directamente desde otro modulo
- Nunca almacenar tokens, RFCs o contrasenas en el estado del frontend
- Nunca omitir manejo de errores
- Nunca crear archivos fuera de la estructura definida en este manual
- Nunca marcar una tarea como `DONE` si algun criterio no se cumple
- Nunca inventar nombres de tablas o columnas
- Nunca usar `localStorage` para tokens o datos sensibles de sesion
- Nunca usar App Router
- Nunca usar caracteres Unicode especiales en archivos `.codex/`
