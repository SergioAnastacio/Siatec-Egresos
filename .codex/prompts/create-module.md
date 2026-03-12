# Prompt: Crear Módulo ERP

Usa esta plantilla para pedirle a Codex que cree un nuevo módulo ERP.

Rellena los marcadores de posición y envía el prompt directamente a Codex.

---

## Antes de Usar Este Prompt

Asegúrate de que lo siguiente esté listo:

1. Las tablas de la base de datos para este módulo están documentadas en `database/schema/`
2. El módulo está listado en `.codex/tasks/backlog.md`
3. No hay otra tarea EN PROGRESO en `current-task.md`

Si el schema no está documentado, Codex creará `blocked.md` y se detendrá.

---

## Plantilla del Prompt

```
Lee .codex/AGENTS.md, .codex/agent-context.md y todos los archivos en .codex/rules/ antes de comenzar.

Crea un nuevo módulo ERP para SIATEC.

Nombre del módulo: <nombre-del-modulo>
Descripción: <qué gestiona este módulo>

Tablas de la base de datos involucradas:
- <nombre_tabla_1>   ← documentada en database/schema/<nombre_tabla_1>.sql
- <nombre_tabla_2>   ← documentada en database/schema/<nombre_tabla_2>.sql

Operaciones requeridas:
- Listar todos los <entidades> (paginado)
- Obtener <entidad> por ID
- Crear <entidad>
- Actualizar <entidad>
- Desactivar <entidad> (eliminación lógica — nunca eliminar físicamente)

Acceso por rol:
- admin:    acceso completo (listar, obtener, crear, actualizar, desactivar)
- operador: <especificar — ej. solo listar y obtener>
- auditor:  solo lectura (solo listar y obtener)

Sigue la estructura de módulo en la sección 7 de AGENTS.md.

Crea:
1. Backend: modelos, trait de repositorio, implementación SQL Server, servicio, comandos
2. Frontend: servicio (llamadas invoke), hook, página de lista, página de detalle
3. Types: interfaces TypeScript compartidas en types/
4. Docs: docs/modules/<nombre-del-modulo>.md

Criterios de aceptación:
- Todas las operaciones funcionan a través de comandos Tauri
- Validación de entrada en frontend y backend
- RBAC aplicado en la capa de servicio — nunca en los comandos
- Log de auditoría escrito para: crear, actualizar, desactivar
- Sin errores de TypeScript
- Sin errores de compilación de Rust
- Módulo documentado en docs/modules/<nombre-del-modulo>.md
- agent-context.md actualizado
```

---

## Ejemplo — Módulo de Usuarios

```
Lee .codex/AGENTS.md, .codex/agent-context.md y todos los archivos en .codex/rules/ antes de comenzar.

Crea un nuevo módulo ERP para SIATEC.

Nombre del módulo: usuarios
Descripción: Gestiona los usuarios del sistema, sus roles y permisos de acceso.

Tablas de la base de datos involucradas:
- usuarios   ← documentada en database/schema/usuarios.sql
- roles      ← documentada en database/schema/roles.sql

Operaciones requeridas:
- Listar todos los usuarios (paginado, filtrable por rol)
- Obtener usuario por ID
- Obtener usuario por RFC (solo admin)
- Crear usuario
- Actualizar usuario
- Desactivar usuario (eliminación lógica — nunca eliminar físicamente)

Acceso por rol:
- admin:    acceso completo
- operador: solo listar y obtener
- auditor:  solo listar y obtener

Sigue la estructura de módulo en la sección 7 de AGENTS.md.

Crea:
1. Backend: modelos, trait de repositorio, implementación SQL Server, servicio, comandos
2. Frontend: servicio (llamadas invoke), hook useUsuarios, página UsuarioLista, página UsuarioDetalle
3. Types: interfaces TypeScript compartidas en types/
4. Docs: docs/modules/usuarios.md

Criterios de aceptación:
- Todas las operaciones funcionan a través de comandos Tauri
- Validación de entrada en frontend y backend
- RBAC aplicado en la capa de servicio — solo admin puede crear, actualizar, desactivar
- Log de auditoría escrito para: usuario creado, usuario actualizado, usuario desactivado
- El RFC nunca se devuelve en respuestas de lista — solo en vista de detalle para rol admin
- Sin errores de TypeScript
- Sin errores de compilación de Rust
- Módulo documentado en docs/modules/usuarios.md
- agent-context.md actualizado con el estado del módulo
```

---

## Notas

- Siempre especifica eliminación lógica (desactivar) — nunca eliminación física
- Siempre especifica qué roles pueden realizar qué operaciones
- Siempre especifica qué campos son sensibles y deben excluirse de las respuestas
- Cuanto más específico sea el prompt, menos bloqueos y ambigüedades encontrará Codex
- Si el schema no está en database/schema/, agrégalo antes de ejecutar este prompt
