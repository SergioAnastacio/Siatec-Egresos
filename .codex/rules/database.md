# Reglas de Base de Datos -- SIATEC

Estas reglas aplican a todo el acceso a base de datos en el proyecto.

> IMPORTANTE: El schema de la base de datos SQL Server existente aun no ha sido documentado.
> Todos los nombres de tablas, columnas y tipos en este archivo son solo ejemplos estructurales.
> Antes de escribir cualquier implementacion de repositorio, leer database/schema/ para obtener
> los nombres reales de tablas y columnas. Nunca inventar o asumir detalles del schema.

---

## Reglas Principales

1. Solo consultas parametrizadas -- nunca concatenar strings SQL
2. Nunca modificar el schema sin un archivo de migracion en database/migrations/
3. Toda la logica de base de datos se queda dentro de repositories/
4. Las consultas complejas usan stored procedures en database/procedures/
5. Solo eliminacion logica -- nunca DELETE fisico en tablas de entidades
6. Siempre revisar database/schema/ antes de escribir cualquier consulta

---

## Consultas Parametrizadas

La inyeccion SQL no es aceptable en un sistema gubernamental.
Usar siempre consultas parametrizadas.

### Incorrecto -- riesgo de inyeccion SQL
```rust
// [ ] Nunca hacer esto
let query = format!("SELECT * FROM tabla WHERE campo = '{}'", valor);
conn.execute(&query, &[]).await?;
```

### Correcto
```rust
// [x] Parametrizado -- seguro
// NOTA: Reemplazar nombres de tabla y columna con valores reales de database/schema/
let result = conn
    .query_one(
        "SELECT id, nombre FROM tu_tabla WHERE campo = @P1 AND activo = 1",
        &[&valor],
    )
    .await
    .map_err(|e| AppError::Database(
        format!("consulta fallo para valor={}: {}", valor, e)
    ))?;
```

---

## Migraciones

Cada cambio de schema requiere un archivo de migracion.
Nunca alterar la base de datos directamente sin un archivo.

Ubicacion: `database/migrations/`

Convencion de nombres:
```
YYYYMMDD_HHMMSS_descripcion.sql
```

Ejemplos:
```
20250101_120000_agregar_columna_estado.sql
20250202_090000_crear_tabla_auditoria.sql
```

Formato del archivo de migracion:
```sql
-- Migracion: agregar_columna_estado
-- Fecha: 2025-01-01
-- Autor: [desarrollador o agente]

-- UP
ALTER TABLE tu_tabla
ADD estado NVARCHAR(50) NOT NULL DEFAULT 'activo';

-- DOWN
ALTER TABLE tu_tabla
DROP COLUMN estado;
```

---

## Stored Procedures

Usar stored procedures para consultas complejas que involucren joins, agregaciones
o logica de filtrado especifica del negocio.

Ubicacion: `database/procedures/`
Convencion de nombres: `sp_<modulo>_<accion>`

```sql
-- database/procedures/sp_modulo_listar_activos.sql
-- NOTA: Este es un ejemplo estructural. Reemplazar tabla/columnas con schema real.
CREATE PROCEDURE sp_modulo_listar_activos
    @tamano_pagina INT = 20,
    @offset_pagina INT = 0
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        t.id,
        t.nombre,
        t.creado_en
    FROM tu_tabla t
    WHERE t.activo = 1
    ORDER BY t.nombre
    OFFSET @offset_pagina ROWS
    FETCH NEXT @tamano_pagina ROWS ONLY;
END;
```

Llamada desde Rust:
```rust
// NOTA: Ejemplo estructural -- usar nombre real del procedure
conn.execute(
    "EXEC sp_modulo_listar_activos @P1, @P2",
    &[&tamano_pagina, &offset],
).await?;
```

---

## Patron Repositorio

Cada modulo tiene su propio repositorio.
Los repositorios implementan un trait para permitir implementaciones mock en pruebas.

```rust
// repositories/registro_repository.rs
// NOTA: Reemplazar Registro, CrearRegistroInput, ActualizarRegistroInput con
// tipos de dominio reales una vez que database/schema/ este documentado.

#[async_trait]
pub trait RegistroRepository: Send + Sync {
    async fn buscar_por_id(&self, id: i32) -> Result<Registro, AppError>;
    async fn buscar_todos(&self, pagina: i32, limite: i32) -> Result<Vec<Registro>, AppError>;
    async fn crear(&self, input: CrearRegistroInput) -> Result<Registro, AppError>;
    async fn actualizar(&self, id: i32, input: ActualizarRegistroInput) -> Result<Registro, AppError>;
    async fn desactivar(&self, id: i32) -> Result<(), AppError>;
    // Nota: sin metodo eliminar() -- solo eliminacion logica
}

pub struct SqlRegistroRepository {
    pool: DbPool,
}

#[async_trait]
impl RegistroRepository for SqlRegistroRepository {
    async fn desactivar(&self, id: i32) -> Result<(), AppError> {
        // NOTA: Reemplazar tabla/columnas con valores reales de database/schema/
        conn.execute(
            "UPDATE tu_tabla SET activo = 0 WHERE id = @P1",
            &[&id],
        )
        .await
        .map_err(|e| AppError::Database(
            format!("desactivar fallo para id={}: {}", id, e)
        ))?;
        Ok(())
    }
}
```

---

## Modelos de Respuesta -- Nunca Exponer Campos Internos

Los modelos de base de datos y los modelos de respuesta API/comando deben ser tipos separados.
Nunca devolver structs crudos de base de datos al frontend.

```rust
// Modelo interno de base de datos -- nunca enviar al frontend
pub struct Registro {
    pub id: i32,
    pub nombre: String,
    pub rfc: String,             // sensible -- nunca exponer
    pub hash_contrasena: String, // sensible -- nunca exponer
    pub activo: bool,            // interno -- excluir de respuestas
}

// Modelo de respuesta seguro -- lo que se envia al frontend
pub struct RegistroResponse {
    pub id: i32,
    pub nombre: String,
    // rfc excluido
    // hash_contrasena excluido
    // activo excluido
}

impl From<Registro> for RegistroResponse {
    fn from(r: Registro) -> Self {
        Self {
            id: r.id,
            nombre: r.nombre,
        }
    }
}
```

---

## Antes de Escribir Cualquier Consulta

Revisar database/schema/ para la tabla que necesitas.
Si la tabla no esta documentada ahi, detenerse y agregarla a blocked.md.

```
database/schema/
  README.md          <- instrucciones para documentar tablas
  <nombre-tabla>.sql <- un archivo por tabla (por agregar)
```

Los archivos de schema son documentacion, no scripts ejecutables.
Describen lo que ya existe en la base de datos SQL Server en produccion.
