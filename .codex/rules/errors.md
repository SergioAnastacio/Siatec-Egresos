# Manejo de Errores y Bloqueos -- SIATEC

Este archivo define dos cosas:

1. Como debe reportar Codex cuando esta bloqueado o encuentra un problema
2. Como el sistema maneja errores en el codigo en tiempo de ejecucion

---

## 1. Reportar Bloqueos (para Codex)

Cuando algo impide completar la tarea, no improvises.
No continues en silencio. No inventes informacion faltante.

### Cuando detenerse y reportar

Detenerse y crear blocked.md cuando:

- Una tabla o columna referenciada en la tarea no esta documentada en database/schema/
- Un paquete referenciado en la tarea no existe en packages/
- La tarea requiere modificar un archivo fuera de su alcance definido
- Hay una contradiccion entre la tarea y las reglas en .codex/rules/
- La tarea requiere una decision de arquitectura que no esta en docs/adr/
- Una dependencia requerida esta faltante o tiene una version incompatible
- Una regla de negocio es ambigua y no puede asumirse de forma segura
- Un comando, build, typecheck, test o integracion falla y la causa no puede
  corregirse de forma mecanica y obvia dentro del alcance de la tarea
- Resolver el error requiere inferir comportamiento no documentado
- Resolver el error requiere tocar archivos, contratos o decisiones fuera del
  alcance definido

### Formato de blocked.md

Crear el archivo en: `.codex/tasks/blocked.md`

```markdown
# Tarea Bloqueada

Tarea: <nombre de tarea de current-task.md>
Fecha: <YYYY-MM-DD>
Bloqueado en: <paso o seccion donde se detuvo>

## Problema

Descripcion clara de lo que esta impidiendo el progreso.

## Que se necesita para continuar

- [ ] Accion concreta que debe tomar un humano
- [ ] Otra accion concreta si aplica

## Que se completo antes del bloqueo

- Paso 1 -- hecho
- Paso 2 -- hecho
- Paso 3 -- bloqueado aqui

## Opciones consideradas

Si aplica: que alternativas se evaluaron y por que no se tomaron.
```

### Que NO hacer cuando se esta bloqueado

- No inventar nombres de tablas o columnas que no esten en database/schema/
- No crear paquetes que no esten listados en packages/README.md
- No tomar decisiones de arquitectura sin documentarlas en docs/adr/
- No marcar una tarea como HECHA si algun criterio de aceptacion no se cumple
- No modificar archivos fuera del alcance definido en la tarea
- No asumir una regla de negocio -- reportarla como bloqueo
- No inferir una solucion por cuenta propia cuando el error cambia el alcance o
  requiere una decision no documentada

---

## 2. Manejo de Errores en Codigo

### Rust -- propagar, nunca silenciar

Cada error debe propagarse. Nunca silenciarse.

```rust
// [ ] Silenciando un error
let result = operacion().unwrap_or_default();

// [ ] Descartando un error
let _ = operacion();

// [x] Propagar con ?
let result = operacion()?;

// [x] Convertir y propagar
let result = operacion()
    .map_err(|e| AppError::Database(e.to_string()))?;
```

### Rust -- errores con contexto

```rust
// [ ] Sin contexto -- inutil para depurar
conn.query_one(query, params).await?;

// [x] Con contexto -- indica exactamente que fallo y donde
conn.query_one(query, params)
    .await
    .map_err(|e| AppError::Database(
        format!("buscar_por_id fallo para id={}: {}", id, e)
    ))?;
```

### TypeScript -- nunca catch vacio

```typescript
// [ ] Error silenciado
try {
  await algunaOperacion()
} catch {}

// [ ] Logueado pero no manejado
try {
  await algunaOperacion()
} catch (err) {
  console.log(err)
}

// [x] Manejado y expuesto al usuario o propagado
try {
  await algunaOperacion()
} catch (err) {
  const mensaje = err instanceof Error ? err.message : 'Error desconocido'
  setError(mensaje)
}
```

### TypeScript -- narrowing de tipo en catch

```typescript
// [ ] any en catch -- inseguro
} catch (err: any) {
  setError(err.message)
}

// [x] Narrowing -- seguro
} catch (err) {
  if (err instanceof Error) {
    setError(err.message)
  } else {
    setError('Error desconocido')
  }
}
```

---

## 3. Estados de Error en Frontend

Cada componente que hace una llamada asincrona debe manejar tres estados:
cargando, error y datos. Sin excepciones.

```tsx
// [ ] Faltando estados de error y carga
function ListaRegistros() {
  const { registros } = useRegistros()
  return <ul>{registros.map(r => <li key={r.id}>{r.nombre}</li>)}</ul>
}

// [x] Los tres estados manejados
function ListaRegistros() {
  const { registros, cargando, error } = useRegistros()

  if (cargando) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!registros || registros.length === 0) return <EmptyState />

  return <ul>{registros.map(r => <li key={r.id}>{r.nombre}</li>)}</ul>
}
```

---

## 4. Reglas de Logging

### Que loguear

```rust
// Errores de infraestructura -- siempre loguear
error!(error = %e, registro_id = %id, "Consulta de base de datos fallo");

// Operaciones importantes -- loguear inicio y resultado
info!(registro_id = %id, "Obteniendo registro");
info!(registro_id = %id, encontrado = %result.is_some(), "Obtencion completada");

// Condiciones inusuales -- advertir
warn!(intentos = %count, ip = %ip, "Multiples intentos de login fallidos");
```

### Que nunca loguear

```rust
// [ ] Datos sensibles en logs
error!("Login fallo para usuario con rfc: {}", rfc);
error!("Valor de token: {}", jwt);
info!("Hash de contrasena: {}", hash);

// [x] Solo identificadores no sensibles
error!(usuario_id = %id, "Login fallo");
```
