# Prompt: Crear Paquete Compartido

Usa esta plantilla para crear un nuevo paquete compartido en `packages/`.

Un paquete se crea cuando dos o más módulos o apps necesitan el mismo código.

---

## Paquete vs Módulo vs Servicio

| Si el código...                                          | Va en...         |
|----------------------------------------------------------|------------------|
| Es lógica de negocio para un dominio ERP específico      | `modules/`       |
| Es una utilidad reutilizable sin lógica de negocio       | `packages/`      |
| Es un servicio con estado que cruza dominios             | `services/`      |

Ejemplos correctos de paquetes:
- Componentes React genéricos de UI (botón, tabla, modal)
- Wrapper de logging
- Configuración tipada de variables de entorno
- Pool de conexiones SQL Server
- Tipos utilitarios TypeScript compartidos

Ejemplos incorrectos de paquetes (estos pertenecen a otro lugar):
- Lógica de autenticación → `services/authentication/`
- Componente UserCard con datos específicos de usuario → `modules/usuarios/frontend/`

---

## Plantilla del Prompt

```
Lee .codex/AGENTS.md y .codex/agent-context.md antes de comenzar.

Crea un nuevo paquete compartido para SIATEC.

Nombre del paquete: <nombre>
Ubicación: packages/<nombre>
Lenguaje: TypeScript | Rust | Ambos
Descripción: <qué hace este paquete -- un párrafo>

Consumidores (quién usará este paquete):
- <app o módulo 1>
- <app o módulo 2>

API pública (qué debe exportar):
- <función o componente 1>: <descripción>
- <función o componente 2>: <descripción>

Reglas:
- Sin lógica de negocio dentro de este paquete
- Sin importaciones directas de modules/
- Sin importaciones directas de apps/
- Exportar solo lo listado en la API pública de arriba

Crea:
1. packages/<nombre>/package.json con nombre "@siatec/<nombre>"
2. packages/<nombre>/src/index.ts (o lib.rs para Rust)
3. packages/<nombre>/README.md documentando cada exportación con ejemplos de uso
4. Actualizar packages/README.md para marcar este paquete como implementado

Criterios de aceptación:
- El paquete compila sin errores
- Todas las exportaciones de la API pública están disponibles desde index.ts (o lib.rs)
- Sin importaciones de modules/ o apps/
- README documenta todas las exportaciones con ejemplos de uso
- packages/README.md actualizado
- agent-context.md actualizado
```

---

## Ejemplo -- Paquete UI

```
Lee .codex/AGENTS.md y .codex/agent-context.md antes de comenzar.

Crea un nuevo paquete compartido para SIATEC.

Nombre del paquete: ui
Ubicación: packages/ui
Lenguaje: TypeScript
Descripción: Componentes React reutilizables compartidos entre las apps de escritorio y web.
             Sin lógica de negocio. Solo componentes visuales y estructurales.

Consumidores:
- apps/desktop/frontend
- apps/web
- Todos los frontends de módulos ERP

API pública:
- Button: variantes (primario, secundario, peligro) con estado de carga y deshabilitado
- Table: componente de tabla genérico que acepta configuración de columnas y datos de filas
- Modal: modal controlado con título, slot de cuerpo y slot de pie de página
- LoadingSpinner: spinner centrado para estados de carga asíncrona
- ErrorMessage: muestra un string de error con un ícono
- EmptyState: mostrado cuando una lista no tiene elementos

Reglas:
- Sin lógica de negocio dentro de este paquete
- Sin importaciones de Tauri (invoke, etc.) -- este paquete debe funcionar en la app web también
- Sin importaciones directas de modules/ o apps/
- Solo TailwindCSS para estilos

Crea:
1. packages/ui/package.json con nombre "@siatec/ui"
2. packages/ui/src/index.ts exportando todos los componentes
3. packages/ui/src/components/ con un archivo por componente
4. packages/ui/README.md con un ejemplo de uso para cada componente
5. Actualizar packages/README.md

Criterios de aceptación:
- El paquete compila sin errores
- Los 6 componentes exportados desde index.ts
- Sin importaciones de Tauri en ningún lugar del paquete
- Sin importaciones de modules/ o apps/
- Cada componente tiene una interfaz TypeScript para sus props
- README tiene un ejemplo de uso para cada componente
- packages/README.md actualizado
- agent-context.md actualizado
```

---

## Ejemplo -- Paquete Logger

```
Lee .codex/AGENTS.md y .codex/agent-context.md antes de comenzar.

Crea un nuevo paquete compartido para SIATEC.

Nombre del paquete: logger
Ubicación: packages/logger
Lenguaje: Ambos (librería Rust + paquete TypeScript)
Descripción: Logging centralizado para todo el sistema.
             El lado Rust inicializa y configura el suscriptor de tracing.
             El lado TypeScript envuelve console con salida estructurada y niveles de log.

Consumidores:
- apps/desktop/src-tauri (Rust)
- Todas las apps y módulos TypeScript

API pública -- Rust:
- init_logger(): inicializa tracing con el formato y nivel correctos
- enum LogLevel: Debug, Info, Warn, Error

API pública -- TypeScript:
- logger.info(mensaje, contexto?): log informativo estructurado
- logger.warn(mensaje, contexto?): advertencia estructurada
- logger.error(mensaje, contexto?): error estructurado
- logger.debug(mensaje, contexto?): debug -- no-op fuera de desarrollo

Reglas:
- Nunca loguear: contraseñas, tokens, RFCs, datos financieros
- El logger TypeScript es no-op en entorno de pruebas
- El logger Rust lee LOG_LEVEL desde variable de entorno

Crea:
1. packages/logger/rust/src/lib.rs
2. packages/logger/rust/Cargo.toml
3. packages/logger/ts/src/index.ts
4. packages/logger/ts/package.json con nombre "@siatec/logger"
5. packages/logger/README.md con configuración y uso para ambos lados
6. Actualizar packages/README.md

Criterios de aceptación:
- La librería Rust compila sin advertencias
- El paquete TypeScript compila sin errores
- Las cuatro exportaciones TypeScript disponibles (info, warn, error, debug)
- init_logger() y LogLevel exportados desde Rust
- README documenta configuración y uso para ambos lenguajes
- packages/README.md actualizado
- agent-context.md actualizado
```
