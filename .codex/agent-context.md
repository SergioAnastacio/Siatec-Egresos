# SIATEC -- Contexto del Agente

Este archivo describe el estado actual del proyecto.

Los agentes deben leer este archivo antes de iniciar cualquier tarea.
Los agentes deben actualizar este archivo al completar cualquier tarea.

---

## Estado del Proyecto

Fase: Fundacion operativa del monorepo
Sprint: 1
Inicio: 2026

---

## Que Se Ha Hecho

- [x] Se formalizo la estructura oficial del monorepo en `docs/adr/004-monorepo-structure.md`
- [x] Se crearon ADRs base para plataforma desktop, eliminacion logica y aislamiento de modulos
- [x] `docs/architecture/` quedo como conjunto de plantillas
- [x] Se definio la estrategia inicial de testing y observabilidad del repositorio
- [x] Se crearon manifests minimos para apps, packages y services del workspace
- [x] Se inicializo Git en el workspace local
- [x] Se agrego documentacion raiz para onboarding y colaboracion
- [x] Se reemplazo el flujo de tarea unica por un modelo concurrente en `.codex/tasks/`
- [x] Se agregaron ADRs base para branching y coordinacion multiagente
- [x] Se definio baseline tecnica raiz para workspaces, Turbo y TypeScript
- [x] Se agrego CI minima equivalente para GitHub y GitLab
- [x] Se formalizo la regla de reutilizacion obligatoria y control antiespageti
- [x] Se agrego `.env.example` base para la conexion Rust/Tauri a SQL Server
- [x] Se formalizo la verificacion de runtime para tareas que toquen canales ejecutables

## Que Esta En Progreso

- [ ] Ningun item operativo en progreso

## Que Esta Pendiente

Ver `.codex/tasks/backlog.md`

---

## Estado del Entorno

> Agentes: revisa esta tabla antes de cualquier tarea que involucre Rust o Tauri.
> Si una herramienta requerida muestra [ ] y la tarea depende de ella, bloquea la tarea.
> Desarrolladores: actualiza Estado y Ultima Verificacion tras instalar o actualizar herramientas.

| Herramienta | Requerida | Estado | Ultima Verificacion | Notas |
|-------------|-----------|--------|---------------------|-------|
| Git         | 2.x+      | [x]    | 2026-03-10          | `git version 2.49.0.windows.1` |
| Rust        | stable    | [x]    | 2026-03-10          | `cargo 1.94.0 (85eff7c80 2026-01-15)` |
| Node.js     | 18+       | [x]    | 2026-03-10          | `v20.16.0` |
| pnpm        | 10+       | [x]    | 2026-03-10          | `10.30.3` |
| Tauri CLI   | 2.x       | [x]    | 2026-03-10          | `tauri-cli 2.10.1` |
| SQL Server  | 2019+     | --     | --                  | No requerido hasta tareas de base de datos |

---

## Decisiones Tecnicas Clave

Todas las decisiones formales estan documentadas en `docs/adr/`.

### Tauri sobre Electron

Tauri usa el webview del SO. Binario mas pequeno, mejor rendimiento, backend en Rust.
ADR: `docs/adr/001-tauri-over-electron.md`

### Rust para el backend

Seguridad de memoria sin recolector de basura.
ADR: `docs/adr/001-tauri-over-electron.md`

### SQL Server existente

La base de datos ya existe y no debe migrarse sin control.
El schema debe documentarse en `database/schema/` antes de construir modulos.

### NextJS Pages Router

Pages Router es la convencion de SIATEC. No usar App Router.

### Eliminacion logica unicamente

Los registros de entidades no se eliminan fisicamente.
ADR: `docs/adr/002-logical-deletion.md`

### Aislamiento de modulos

Los modulos no deben importarse entre si.
ADR: `docs/adr/003-module-isolation.md`

### Estructura oficial del monorepo
El repositorio se organiza en `apps/`, `modules/`, `packages/`, `services/`,
`database/`, `docs/`, `infrastructure/`, `tests/` y `tools/`.
ADR: `docs/adr/004-monorepo-structure.md`

### Testing hibrido
Las pruebas unitarias e integraciones locales viven cerca del codigo.
La carpeta `tests/` queda reservada para E2E, contratos, smoke y fixtures.
ADR: `docs/adr/004-monorepo-structure.md`

### Observabilidad desde la base
La observabilidad se divide en `packages/logger/`, `packages/observability/`
e `infrastructure/monitoring/`, con opcion de `services/telemetry/`.
ADR: `docs/adr/004-monorepo-structure.md`

### Branching y coordinacion multiagente

Cada cambio debe estar ligado a una tarea y a una rama corta.
ADRs:

- `docs/adr/006-branching-and-collaboration.md`
- `docs/adr/007-multi-agent-task-coordination.md`

### Baseline tecnica y quality gates duales

La raiz del monorepo define una unica superficie de validacion para GitHub y GitLab.
ADRs:

- `docs/adr/008-architectural-boundary-enforcement.md`
- `docs/adr/009-ci-quality-gates.md`

### Reutilizacion y control de complejidad

El repositorio obliga a reutilizar piezas existentes y a extraer abstracciones
antes de duplicar logica o UI.
ADR:

- `docs/adr/010-reuse-and-anti-spaghetti.md`

### Verificacion de runtime por canal

Cuando una tarea toque `desktop` o `web`, el cierre objetivo debe escalar desde
validacion base hasta build y smoke run cuando el entorno lo permita.
ADR:

- `docs/adr/011-runtime-verification-for-runnable-channels.md`

---

## Restricciones Conocidas

- El schema de la base de datos existente debe respetarse
- `database/schema/` aun no esta documentado
- No implementar logica de negocio real hasta cerrar el scaffolding funcional minimo
- La app movil es alcance futuro
- Las reglas de seguridad gubernamental aplican desde el dia uno

---

## Modulos Implementados

Ninguno. El schema de la base de datos debe documentarse antes de construir cualquier modulo.

---

## Paquetes Implementados

- `packages/config` cuenta con scaffold TypeScript para variables de entorno tipadas
- `packages/database` cuenta con scaffold TypeScript para contratos de conexion SQL Server
- `packages/logger` cuenta con scaffold TypeScript para logging estructurado
- `packages/ui` cuenta con componentes compartidos reutilizados por desktop y web
- `packages/observability` cuenta con contratos tecnicos base para telemetria
- `packages/testing` cuenta con utilidades base de fixtures y entorno de prueba

---

## Apps Implementadas

- `apps/desktop` ya cuenta con scaffold base de frontend NextJS Pages Router y backend Tauri
- `apps/web` ya cuenta con scaffold base de NextJS Pages Router

---

## TODOs Activos

- [ ] Documentar tablas existentes de la base de datos en `database/schema/`
- [ ] Configurar observabilidad operativa en `infrastructure/monitoring/`

---

## Notas del Agente

> Formato: [YYYY-MM-DD] [nombre-tarea] -- [resumen] -- [problemas o decisiones]

- [2026-03-09] arquitectura-monorepo -- Se formalizo la estructura del monorepo, testing y observabilidad. -- Se alineo el workspace base; falta scaffolding funcional y pipeline real
- [2026-03-10] colaboracion-base -- Se inicializo Git, se agrego documentacion raiz y se migro `.codex/tasks/` a un modelo concurrente. -- Falta enforcement tecnico, CI y ownership real por equipo
- [2026-03-10] baseline-y-ci -- Se agregaron scripts comunes, validacion estructural y pipelines equivalentes para GitHub y GitLab. -- Desktop queda como foco principal y web queda integrada en la misma baseline
- [2026-03-10] verificacion-entorno -- Se verificaron Git, Node, pnpm, Rust y Tauri CLI y el validador estructural base paso localmente. -- Falta primer scaffold funcional para que lint, typecheck y test validen implementacion real
- [2026-03-10] anti-spaghetti -- Se agregaron reglas explicitas para reutilizacion obligatoria, extraccion de componentes y separacion de responsabilidades. -- La disciplina ya aplica a desktop, web y codigo compartido
- [2026-03-10] desktop-scaffold -- Se creo el scaffold base de `apps/desktop` con NextJS Pages Router, Tailwind base y backend Tauri con health check. -- Falta instalar dependencias y ejecutar build/typecheck reales del canal
- [2026-03-10] rust-env-example -- Se agrego `.env.example` para la futura conexion de Rust/Tauri a SQL Server. -- Aun falta implementar el package/config o el cargado real de variables
- [2026-03-10] web-scaffold -- Se creo el scaffold base de `apps/web` con NextJS Pages Router, Tailwind base y separacion entre pagina, componente, hook y servicio. -- Falta instalar dependencias y ejecutar build/typecheck reales del canal
- [2026-03-10] packages-foundation -- Se crearon los scaffolds iniciales de `@siatec/config` y `@siatec/database` para entorno tipado y contratos de SQL Server. -- Falta instalar dependencias y validar compilacion real de estos packages
- [2026-03-10] runtime-verification -- Se definio que las tareas sobre canales ejecutables deben aspirar a build y smoke run, no solo validacion estatica. -- La CI aun valida la base comun; los smoke runs se endureceran con el workspace real
- [2026-03-10] logger-scaffold -- Se creo el scaffold TypeScript de `@siatec/logger` con niveles comunes y sanitizacion de contexto sensible. -- La integracion Rust con tracing queda como tarea posterior
- [2026-03-10] ui-scaffold -- Se crearon componentes compartidos en `@siatec/ui`, se integraron en desktop y web, y se valido typecheck/build real de ambos canales. -- Next agrego `isolatedModules` a los tsconfig locales durante build
- [2026-03-10] observability-testing -- Se crearon los scaffolds funcionales de `@siatec/observability` y `@siatec/testing` y se validaron con typecheck/build reales. -- Falta integracion futura con OpenTelemetry y con un runner de pruebas concreto
- [2026-03-10] services-core -- Se crearon los scaffolds funcionales de `@siatec/authentication` y `@siatec/audit-log` con contratos base y adaptadores en memoria. -- Falta implementacion productiva real con JWT, persistencia y almacenamiento de auditoria
- [2026-03-10] services-remaining -- Se completaron los scaffolds funcionales de `@siatec/notifications`, `@siatec/report-engine` y `@siatec/telemetry` con validacion real de compilacion. -- Falta integracion futura con canales reales de entrega, generacion de documentos y exporters externos
- [2026-03-11] cierre-web-scaffold -- Se cerro formalmente la tarea `web-scaffold` tras verificar que el scaffold de `apps/web` y sus scripts existen y siguen la estructura definida. -- La revalidacion local de `typecheck/build` no pudo repetirse porque `pnpm install` fallo con `EPERM` al recrear `node_modules`
- [2026-03-11] test-pages-desktop-web -- Se agregaron paginas `/test` para desktop y web, enlaces desde los `index` y scripts `dev:test` por app con aliases en raiz para arrancar cada canal de forma individual. -- La validacion con `typecheck` sigue bloqueada por resolucion incompleta de dependencias del workspace (`next`, `@siatec/ui` y tipos JSX)
- [2026-03-11] workspace-runtime-validation -- Se valido fuera del sandbox que `desktop` y `web` compilan y arrancan correctamente, incluyendo `/` y `/test` en `localhost:3100` y `localhost:3000`. -- Los errores observados dentro del sandbox eran artefactos del entorno virtual y no un problema real del workspace
- [2026-03-11] desktop-tauri-runtime -- Se conecto `apps/desktop` al runtime real de Tauri con scripts dedicados, `devUrl/frontendDist` correctos, `invoke("health_check")` desde frontend y arranque validado como app `siatec-desktop`; tambien paso `build:tauri` y genero el ejecutable release. -- Fue necesario reutilizar `packages/ui/assets/branding/favicon.ico` como `src-tauri/icons/icon.ico` y usar `cargo tauri` porque no habia binario `tauri` directo en PATH
- [2026-03-11] auth-login-desktop-mvp -- Se implemento el login desktop con UI dedicada, store en memoria, comandos Tauri, servicio Rust y repositorio SQL Server parametrizado compatible con `Usuarios`, `DatosGrales`, `LUCCA333`, `LUCCA410` y auditoria `BitMovs`; tambien quedaron bloqueo por inactividad y por password fallido para usuario conocido. -- El canal desktop ahora compila tambien en release con `pnpm --filter @siatec/desktop build:tauri` despues de reparar Visual Studio/Windows SDK y envolver Tauri en `VsDevCmd.bat`
- [2026-03-11] usuarios-catalogo-dashboard-shell -- Se implemento un shell desktop reutilizable con branding SIATEC, modo claro/oscuro persistente, sidebar colapsable, navbar y footer; `/inicio` migro a ese shell y `/usuarios` quedo operativo con un catalogo MVP alimentado por Tauri desde `Usuarios` y `Areax`. -- La gestion avanzada de usuarios, permisos y semantica completa de `Activo` siguen como alcance posterior
- [2026-03-11] auth-device-gate-lucca466 -- El login desktop ahora obtiene la MAC local del equipo, crea/consulta `LUCCA466`, rechaza dispositivos bloqueados, actualiza usuarios recientes por MAC y replica el bloqueo de MAC para `ADMIN` tras intentos fallidos, manteniendo la bitacora en `BitMovs`. -- La compuerta se aplica al intentar login y aun queda pendiente el flujo legacy completo de reset de `ADMIN` y el pre-gate visual al abrir la ventana
- [2026-03-11] sidebar-runtime-lucca410 -- La sesion desktop ahora expone permisos de `LUCCA410` y el sidebar consume ese vector para mostrar `Parametros Generales > Control de Usuarios`, incluyendo guard de ruta en `/usuarios`. -- El resto del arbol legacy de `Prepara_Menu` sigue pendiente y el `build` de Next no pudo cerrarse de forma confiable en este host por bloqueo/timeout sobre `.next`
- [2026-03-11] control-usuarios-crud-mvp-desktop -- `Control de Usuarios` ahora permite listar, crear usuario base, editar datos basicos, asignar area, activar/bloquear y guardar el slice actual de permisos de dashboard; el backend persiste `Usuarios`, asegura defaults en `LUCCA182/LUCCA333/LUCCA410`, valida `UsuHist`, cifra con `ENCRYPTBYPASSPHRASE` y registra `BitMovs`. -- `typecheck` y `cargo check` pasan; `build` sigue condicionado por un `spawn EPERM` del host al ejecutar `next build frontend`
- [2026-03-11] control-usuarios-acciones-operativas -- El catalogo de usuarios ahora permite bloquear/desbloquear y resetear contraseña desde acciones directas, con actualizacion de `Usuarios.BLOQUEADO`, desbloqueo que recompone `ULTIMOREGISTRO` legacy, escritura de `UsuHist`, cifrado `ENCRYPTBYPASSPHRASE` y auditoria en `BitMovs`; el frontend agrega modal simple de reset y recarga del catalogo. -- `typecheck` y `cargo check` pasan; falta ampliar el editor para cubrir mas permisos legacy de `LUCCA410`
- [2026-03-11] desktop-ui-polish -- El frontend desktop migro a `lucide-react` para iconografia, el catalogo elimino copy tecnico visible, y el dropdown de acciones de la tabla ahora se renderiza como overlay `fixed` para no quedar recortado por `overflow`. -- `pnpm --filter @siatec/desktop typecheck` pasa; el siguiente paso pendiente es ampliar el editor de usuarios para cubrir mas grupos reales de permisos de `LUCCA410`
