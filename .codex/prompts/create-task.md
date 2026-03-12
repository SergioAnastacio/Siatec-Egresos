# Prompt: Crear Nueva Tarea

Usa este prompt para crear un archivo nuevo dentro de `.codex/tasks/queued/`.
El repositorio ya no usa un unico `current-task.md` como fuente principal.

Una buena tarea tiene:

- objetivo claro
- owner
- scope
- branch sugerida
- rutas de archivo exactas
- criterios de aceptacion verificables

---

## Instrucciones

1. Usa la plantilla base en `.codex/templates/task.md`.
2. Guarda una tarea por archivo en `.codex/tasks/queued/`.
3. Nombra el archivo con fecha e id corto:

```text
YYYYMMDD-id-corto.md
```

Ejemplo:

```text
20260310-baseline-monorepo.md
```

4. Define `Allowed Paths` para limitar el alcance.
5. Si la tarea depende de otra, registrala en `Dependencias`.
6. Si una tarea toca datos, auth o arquitectura, referencia las reglas o ADRs relevantes.

---

## Lista de control

- [ ] El objetivo es concreto
- [ ] Los archivos o carpetas permitidas estan definidos
- [ ] Los criterios de aceptacion son verificables
- [ ] El alcance no mezcla responsabilidades no relacionadas
- [ ] La tarea puede moverse a `in-progress/` sin ambiguedad

---

## Recomendaciones

### Una tarea, una responsabilidad

No mezcles configuracion del entorno con logica de negocio.
No mezcles frontend y backend si pueden separarse.

### Se especifico con rutas

```text
Malo:  "Configurar un servicio"
Bueno: "Crear `services/authentication/src/index.ts` y actualizar `services/authentication/package.json`"
```

### Criterios verificables

```text
Malo:  "La app debe funcionar"
Bueno: "`pnpm --filter @siatec/web build` termina sin errores"
Bueno: "`cargo check` pasa dentro de `apps/desktop/src-tauri`"
```

### Dependencia de base de datos

Si la tarea involucra queries o tablas:

- lista las tablas en `Allowed Paths` o en el objetivo
- confirma que esten documentadas en `database/schema/`
- si no lo estan, crea primero una tarea de documentacion del schema
